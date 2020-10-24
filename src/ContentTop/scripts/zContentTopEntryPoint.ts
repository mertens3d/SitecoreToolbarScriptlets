import { DocumentJacket } from '../../DOMJacket/scripts/Document/DocumentJacket';
import { UrlJacket } from '../../DOMJacket/scripts/UrlJacket';
import { HindSiteScUiProxy } from "../../HindSiteScUiProxy/scripts/HindSiteScUiProxy";
import { RollingLogIdDrone } from '../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone';
import { ErrorHandlerAgent } from "../../Shared/scripts/Agents/ErrorHandler/ErrorHandlerAgent";
import { LoggerConsoleWriter } from '../../Shared/scripts/Agents/LoggerAgent/LoggerConsoleWriter';
import { LoggerStorageWriter } from '../../Shared/scripts/Agents/LoggerAgent/LoggerStorageWriter';
import { RepositoryAgent } from '../../Shared/scripts/Agents/RepositoryAgent/RepositoryAgent';
import { SettingsAgent } from '../../Shared/scripts/Agents/SettingsAgent/SettingsAgent';
import { TaskMonitor } from "../../Shared/scripts/Agents/TaskMonitor/TaskMonitor";
import { ToastAgent } from '../../Shared/scripts/Agents/ToastAgent/ToastAgent';
import { CoreFactory } from '../../Shared/scripts/Classes/CoreFactory';
import { SettingKey } from '../../Shared/scripts/Enums/30 - SettingKey';
import { HindeCore } from '../../Shared/scripts/HindeCore';
import { ICommonCore } from '../../Shared/scripts/Interfaces/Agents/ICommonCore';
import { IHindSiteScUiProxy } from "../../Shared/scripts/Interfaces/Agents/IContentApi/IHindSiteScUiProxy";
import { IHindSiteScUiProxyRunTimeOptions } from "../../Shared/scripts/Interfaces/Agents/IContentApi/IHindSiteScUiProxyRunTimeOptions";
import { IContentAtticAgent } from '../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent';
import { IContentBrowserProxy } from '../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy';
import { IMessageBroker_Content } from '../../Shared/scripts/Interfaces/Agents/IContentMessageBroker';
import { IHindSiteSetting } from '../../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { IHindeCore } from "../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IRepositoryAgent } from '../../Shared/scripts/Interfaces/Agents/IRepositoryAgent';
import { ISettingsAgent } from '../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IUrlJacket } from '../../Shared/scripts/Interfaces/IUrlAgent';
import { SharedConst } from '../../Shared/scripts/SharedConst';
import { ContentAtticAgent } from './Agents/ContentAtticAgent';
import { SolicitorForScheduledAutoSnapShot } from './CommandSolicitors/CommandSolicitorForAutoSnapShot';
import { CommandSolicitorForEventQueryString, CommandSolicitorForEventRestoreMostRecent } from "./CommandSolicitors/CommandSolicitorForQueryString";
import { CommandSolicitorForHotKeys } from './CommandSolicitors/CommandSolicitorHotKeys';
import { ContentMessageManager } from './Managers/ContentMessageManager';
import { BrowserMessageBroker_Content } from './Proxies/BrowserMessageBroker_Content';
import { CommandRouter } from './Proxies/CommandRouter';
import { ContentBrowserProxy } from './Proxies/ContentBrowserProxy';

class ContentEntry {
  private RepoAgent: IRepositoryAgent;
  private ScUiAPI: IHindSiteScUiProxy;
  private ToastAgent: ToastAgent;
  private SettingsAgent: ISettingsAgent;
  private AtticAgent: IContentAtticAgent;
  //ScUrlAgent: ScUrlAgent;
  contentBrowserProxy: IContentBrowserProxy;
  AutoSnapShotAgent: SolicitorForScheduledAutoSnapShot;

  CommandRouter: CommandRouter;
  HindeCore: IHindeCore;
  ErrorHand: ErrorHandlerAgent;
  TaskMonitor: TaskMonitor;
  TopDocumentJacket: DocumentJacket;
  CommandSolicitorHotKeys: CommandSolicitorForHotKeys;
  CommandSolicitorForEventQueryString: CommandSolicitorForEventQueryString;
  CommandSolicitorForEventStartup: CommandSolicitorForEventRestoreMostRecent;

  async StartUpContent(): Promise<void> {
    try {
      let commonCore: ICommonCore = CoreFactory.BuildCommonCore();
      this.HindeCore = new HindeCore(commonCore);

      this.InstantiateAgents_Content();

      await await DocumentJacket.FactoryMakeDocumentJacket(this.HindeCore, document)
        .then((documentJacket: DocumentJacket) => this.TopDocumentJacket = documentJacket)
        .then(() => this.InstantiateAndInit_Managers())
        .then(() => this.AtticAgent.CleanOutOldAutoSavedData())
        .catch((err: any) => commonCore.ErrorHand.HandleFatalError(this.StartUpContent.name, err));

      this.HindeCore.Logger.SectionMarker('e) ' + this.StartUpContent.name);
      this.HindeCore.Logger.Log('standing by');
    } catch (err) {
      if (this.ErrorHand) {
        this.ErrorHand.HandleFatalError([ContentEntry.name, this.StartUpContent.name], err);
      }
      console.log('top level try catch');
    }
  }

  private InstantiateAgents_Content(): void {
    try {
      this.HindeCore.Logger.SectionMarker('Instantiate Agents');

      this.RepoAgent = new RepositoryAgent(this.HindeCore);
      this.SettingsAgent = new SettingsAgent(this.HindeCore, this.RepoAgent);
      this.SettingsAgent.Init_SettingsAgent();
      this.InitLogger();
      this.AtticAgent = new ContentAtticAgent(this.RepoAgent, this.HindeCore);
      this.ToastAgent = new ToastAgent(this.HindeCore, document);
      this.ToastAgent.WireEvents();

      this.AtticAgent.InitContentAtticManager(this.SettingsAgent.GetByKey(SettingKey.AutoSaveRetainDays).ValueAsInt());
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.InstantiateAgents_Content.name, err)
    }
  }

  private async InstantiateAndInit_Managers(): Promise<void> {
    try {
      this.HindeCore.Logger.SectionMarker('Instantiate and Initialize Managers');

      let contentMessageMan: ContentMessageManager;

      let runTimeOptions: IHindSiteScUiProxyRunTimeOptions = {
        EnableDesktopStartBarButtonRename: this.SettingsAgent.GetByKey(SettingKey.AutoRenameCeButton).ValueAsBool(),
      }

      this.ScUiAPI = new HindSiteScUiProxy(this.HindeCore.Logger, this.HindeCore.ErrorHand, this.HindeCore.TaskMonitor, this.TopDocumentJacket, runTimeOptions);

      this.AutoSnapShotAgent = new SolicitorForScheduledAutoSnapShot(this.HindeCore, this.SettingsAgent, this.AtticAgent, this.ScUiAPI, this.CommandRouter, this.TopDocumentJacket);

      this.contentBrowserProxy = new ContentBrowserProxy(this.HindeCore)

      let urlJacket: IUrlJacket = new UrlJacket(this.HindeCore, window.URL.toString());

      this.CommandRouter = new CommandRouter(this.HindeCore, this.ScUiAPI, this.AtticAgent, this.AutoSnapShotAgent, this.TopDocumentJacket);

      this.ToastAgent.ObserveRouter(this.CommandRouter);

      this.CommandSolicitorHotKeys = new CommandSolicitorForHotKeys(this.HindeCore, this.CommandRouter, this.TopDocumentJacket);

      this.CommandSolicitorForEventQueryString = new CommandSolicitorForEventQueryString(this.HindeCore, this.CommandRouter, this.TopDocumentJacket, this.SettingsAgent, this.AtticAgent)
      this.CommandSolicitorForEventStartup = new CommandSolicitorForEventRestoreMostRecent(this.HindeCore, this.CommandRouter, this.TopDocumentJacket, this.SettingsAgent, this.AtticAgent)

      let contentMessageBroker: IMessageBroker_Content = new BrowserMessageBroker_Content(this.HindeCore, this.SettingsAgent,
        this.ScUiAPI, this.AtticAgent, this.contentBrowserProxy, this.AutoSnapShotAgent, this.CommandRouter);

      contentMessageMan = new ContentMessageManager(this.HindeCore, contentMessageBroker);

      contentMessageMan.InitContentMessageManager()
      this.AutoSnapShotAgent.ScheduleIntervalTasks();

      this.StartUp()
      this.HindeCore.Logger.Log('Init success')
      //.catch((err: any) => this.ErrorHand.HandleFatalError('Content Entry Point', err));

      this.HindeCore.Logger.SectionMarker('e) Instantiate and Initialize Managers');
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.InstantiateAndInit_Managers.name, err);
    }
  }

  private async StartUp() {
    this.HindeCore.Logger.FuncStart([ContentEntry.name, this.StartUp.name]);

    await this.ScUiAPI.StartUp()
      .then(() => {
        this.CommandSolicitorForEventQueryString.StartUp();
        this.CommandSolicitorForEventStartup.StartUp();
      })
      .catch((err) => this.ErrorHand.HandleFatalError([ContentEntry.name, this.StartUp.name], err));

    this.HindeCore.Logger.FuncEnd([ContentEntry.name, this.StartUp.name]);
  }

  private InitLogger() {
    this.HindeCore.Logger.FuncStart(this.InitLogger.name);

    let enableLogger: IHindSiteSetting = this.SettingsAgent.GetByKey(SettingKey.EnableDebugging);

    if (enableLogger.ValueAsBool() || SharedConst.Const.Debug.ForceLoggingEnabled) {
      let consoleLogWrite = new LoggerConsoleWriter();

      var RollingLogId = new RollingLogIdDrone(this.SettingsAgent, this.HindeCore);
      let storageLogWriter = new LoggerStorageWriter();
      var nextLogId = RollingLogId.GetNextLogId();
      storageLogWriter.SetLogToStorageKey(nextLogId);

      this.HindeCore.Logger.AddWriter(consoleLogWrite);
      this.HindeCore.Logger.AddWriter(storageLogWriter);
    }

    this.HindeCore.Logger.FlushBuffer();
    this.HindeCore.Logger.FuncEnd(this.InitLogger.name);
  }
}

let contentEntry: ContentEntry = new ContentEntry();
contentEntry.StartUpContent();