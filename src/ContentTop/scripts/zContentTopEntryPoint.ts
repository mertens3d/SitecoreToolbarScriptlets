import { DocumentJacket } from '../../DOMJacket/scripts/Document/DocumentJacket';
import { UrlJacket } from '../../DOMJacket/scripts/UrlJacket';
import { HindSiteScUiProxy } from "../../HindSiteScUiProxy/scripts/HindSiteScUiProxy";
import { ErrorHandlerAgent } from "../../Shared/scripts/Agents/ErrorHandler/ErrorHandlerAgent";
import { LoggerConsoleWriter } from '../../Shared/scripts/Agents/LoggerAgent/LoggerConsoleWriter';
import { LoggerStorageWriter } from '../../Shared/scripts/Agents/LoggerAgent/LoggerStorageWriter';
import { TaskMonitor } from "../../Shared/scripts/Agents/TaskMonitor/TaskMonitor";
import { RepositoryAgent } from '../../Shared/scripts/Agents/RepositoryAgent/RepositoryAgent';
import { SettingsAgent } from '../../Shared/scripts/Agents/SettingsAgent/SettingsAgent';
import { ToastAgent } from '../../Shared/scripts/Agents/ToastAgent/ToastAgent';
import { RollingLogIdDrone } from '../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone';
import { CoreFactory } from '../../Shared/scripts/Classes/CoreFactory';
import { ReqCommandMsgFlag } from '../../Shared/scripts/Enums/10 - MessageFlag';
import { SettingKey } from '../../Shared/scripts/Enums/30 - SettingKey';
import { QueryStrKey } from '../../Shared/scripts/Enums/QueryStrKey';
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
import { ICommandRouterParams } from "../../Shared/scripts/Interfaces/ICommandRouterParams";
import { IUrlJacket } from '../../Shared/scripts/Interfaces/IUrlAgent';
import { SharedConst } from '../../Shared/scripts/SharedConst';
import { AutoSnapShotAgent } from './Agents/AutoSnapShotAgent';
import { ContentAtticAgent } from './Agents/ContentAtticAgent';
import { ContentMessageManager } from './Managers/ContentMessageManager';
import { BrowserMessageBroker_Content } from "./Proxies/BrowserMessageBroker_Content";
import { CommandRouter } from "./Proxies/CommandRouter";
import { ContentBrowserProxy } from './Proxies/ContentBrowserProxy';
import { DeepHotKeyAgent } from "../../Shared/scripts/Agents/DeepHotKey/DeepHotKeyAgent";

class ContentEntry {
  private RepoAgent: IRepositoryAgent;
  private ScUiAPI: IHindSiteScUiProxy;
  private ToastAgent: ToastAgent;
  private SettingsAgent: ISettingsAgent;
  private AtticAgent: IContentAtticAgent;
  //ScUrlAgent: ScUrlAgent;
  ContentBrowserProxy: IContentBrowserProxy;
  AutoSnapShotAgent: AutoSnapShotAgent;

  CommandRouter: CommandRouter;
  HindeCore: IHindeCore;
  ErrorHand: ErrorHandlerAgent;
  TaskMonitor: TaskMonitor;
  TopDocumentJacket: DocumentJacket;

  async StartUpContent() :Promise<void>{

    let commonCore: ICommonCore = CoreFactory.BuildCommonCore();
    this.HindeCore = new HindeCore(commonCore);

    this.InstantiateAgents_Content();

    await await DocumentJacket.FactoryMakeDocumentJacket(this.HindeCore, document)
      .then((documentJacket: DocumentJacket) => this.TopDocumentJacket = documentJacket)
      .then(() => this.InstantiateAndInit_Managers())
      .then(() => this.AtticAgent.CleanOutOldAutoSavedData())
      .catch((err) => commonCore.ErrorHand.HandleFatalError(this.StartUpContent.name, err));

    this.HindeCore.Logger.SectionMarker('e) ' + this.StartUpContent.name);
    this.HindeCore.Logger.Log('standing by');
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
    } catch (err) {
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

      this.AutoSnapShotAgent = new AutoSnapShotAgent(this.HindeCore, this.SettingsAgent, this.AtticAgent, this.ScUiAPI);

      this.ContentBrowserProxy = new ContentBrowserProxy(this.HindeCore)

      let urlJacket: IUrlJacket = new UrlJacket(this.HindeCore, window.URL.toString());
      let deepHotKeyAgent: DeepHotKeyAgent = new DeepHotKeyAgent(this.HindeCore, urlJacket);
      this.CommandRouter = new CommandRouter(this.HindeCore, this.ScUiAPI, this.ToastAgent, this.AtticAgent, this.SettingsAgent, this.AutoSnapShotAgent, this.TopDocumentJacket, deepHotKeyAgent);

      let contentMessageBroker: IMessageBroker_Content = new BrowserMessageBroker_Content(this.HindeCore, this.SettingsAgent,
        this.ScUiAPI, this.AtticAgent, this.ContentBrowserProxy, this.AutoSnapShotAgent, this.CommandRouter);

      contentMessageMan = new ContentMessageManager(this.HindeCore, contentMessageBroker);

      await this.ScUiAPI.InstantiateHindSiteScUiProxy()
        .then(() => contentMessageMan.InitContentMessageManager())
        .then(() => {
          this.AutoSnapShotAgent.ScheduleIntervalTasks();
        })
        .then(() => this.StartUp())
        .then(() => this.HindeCore.Logger.Log('Init success'))
        .catch((err) => this.ErrorHand.HandleFatalError('Content Entry Point', err));

      this.HindeCore.Logger.SectionMarker('e) Instantiate and Initialize Managers');
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.InstantiateAndInit_Managers.name, err);
    }
  }

  private TriggerStartupCommands() {
    let setStateFromX: ICommandRouterParams = {
      MsgFlag: ReqCommandMsgFlag.SetStateFromQueryString,
      NewNickName: null,
      SelectSnapShotId: null,
      SelectText: null,
    }

    if (this.TopDocumentJacket.UrlJacket.QueryStringHasKey(QueryStrKey.hsTargetSs)) {
      setStateFromX.MsgFlag = ReqCommandMsgFlag.SetStateFromQueryString,
        this.CommandRouter.RouteCommand(setStateFromX);
    } else if ((this.SettingsAgent.GetByKey(SettingKey.AutoRestoreState)).ValueAsBool()) {
      this.HindeCore.Logger.Log('yup...has the setting');
      setStateFromX.MsgFlag = ReqCommandMsgFlag.SetStateFromMostRecent;
      this.CommandRouter.RouteCommand(setStateFromX);
    }
  }

  private StartUp() {
    this.HindeCore.Logger.FuncStart(this.StartUp.name);

    this.TriggerStartupCommands();

    this.HindeCore.Logger.FuncEnd(this.StartUp.name);
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


console.log('addddddddddddddddddddddddd');