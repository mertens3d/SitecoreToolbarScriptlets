import { DocumentJacket } from '../../DOMJacket/DocumentJacket';
import { HindSiteScUiAPI } from "../../HindSiteScUiProxy/scripts/HindSiteScUiAPI";
import { ScUiManager } from '../../HindSiteScUiProxy/scripts/Managers/SitecoreUiManager/SitecoreUiManager';
import { ErrorHandlerAgent } from "../../Shared/scripts/Agents/Agents/LoggerAgent/ErrorHandlerAgent";
import { LoggerAgent } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent';
import { LoggerConsoleWriter } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter';
import { LoggerStorageWriter } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter';
import { TaskMonitor } from "../../Shared/scripts/Agents/Agents/LoggerAgent/TaskMonitor";
import { RepositoryAgent } from '../../Shared/scripts/Agents/Agents/RepositoryAgent/RepositoryAgent';
import { SettingsAgent } from '../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent';
import { ToastAgent } from '../../Shared/scripts/Agents/Agents/ToastAgent/ToastAgent';
import { RollingLogIdDrone } from '../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone';
import { MsgFlag } from '../../Shared/scripts/Enums/1xxx-MessageFlag';
import { SettingKey } from '../../Shared/scripts/Enums/3xxx-SettingKey';
import { QueryStrKey } from '../../Shared/scripts/Enums/QueryStrKey';
import { Discriminator } from "../../Shared/scripts/Interfaces/Agents/Discriminator";
import { IHindSiteScUiAPI } from '../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi';
import { IContentAtticAgent } from '../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent';
import { IContentBrowserFacade } from '../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy';
import { IMessageBroker_Content } from '../../Shared/scripts/Interfaces/Agents/IContentMessageBroker';
import { IHindSiteSetting } from '../../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { IHindeCore } from "../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ILoggerAgent } from '../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IRepositoryAgent } from '../../Shared/scripts/Interfaces/Agents/IRepositoryAgent';
import { ISettingsAgent } from '../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { ICommandRouterParams } from "../../Shared/scripts/Interfaces/ICommandRouterParams";
import { SharedConst } from '../../Shared/scripts/SharedConst';
import { AutoSnapShotAgent } from './Agents/AutoSnapShotAgent';
import { ContentAtticAgent } from './Agents/ContentAtticAgent';
import { ContentMessageManager } from './Managers/ContentMessageManager';
import { CommandRouter } from "./Proxies/CommandRouter";
import { ContentBrowserFacade } from './Proxies/ContentBrowserProxy';
import { MessageBroker_Content } from './Proxies/ContentMessageBroker';

class ContentEntry {
  private RepoAgent: IRepositoryAgent;
  private ScUiAPI: IHindSiteScUiAPI;
  private ToastAgent: ToastAgent;
  private SettingsAgent: ISettingsAgent;
  private AtticAgent: IContentAtticAgent;
  //ScUrlAgent: ScUrlAgent;
  ContentBrowserProxy: IContentBrowserFacade;
  AutoSnapShotAgent: AutoSnapShotAgent;

  CommandRouter: CommandRouter;
  HindeCore: IHindeCore;
  ErrorHand: ErrorHandlerAgent;
  TaskMonitor: TaskMonitor;
  TopDocumentJacket: DocumentJacket;

  async StartUpContent() {
    this.Instantiate_HindeCore();
    this.InstantiateAgents_Content();
    await this.InstantiateDocumentJacket()
    await this.InstantiateAndInit_Managers()
      .then(() => {
        this.AtticAgent.CleanOutOldAutoSavedData();
      })

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
      this.ToastAgent.Instantiate();

      this.AtticAgent.InitContentAtticManager(this.SettingsAgent.GetByKey(SettingKey.AutoSaveRetainDays).ValueAsInt());
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.InstantiateAgents_Content.name, err)
    }
  }

  private async InstantiateDocumentJacket(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.TopDocumentJacket = new DocumentJacket(this.HindeCore, document);

      await this.TopDocumentJacket.WaitForCompleteNAB_DocumentJacket(this.InstantiateDocumentJacket.name)
        .then(() => resolve())
        .catch((err) => reject(this.InstantiateDocumentJacket.name + ' | ' + err));
    })
  }

  private async InstantiateAndInit_Managers(): Promise<void> {
    try {
      this.HindeCore.Logger.SectionMarker('Instantiate and Initialize Managers');

      let scUiMan: ScUiManager;
      let contentMessageMan: ContentMessageManager;

      scUiMan = new ScUiManager(this.HindeCore);

      this.ScUiAPI = new HindSiteScUiAPI(this.HindeCore, scUiMan, this.TopDocumentJacket);

      this.AutoSnapShotAgent = new AutoSnapShotAgent(this.HindeCore, this.SettingsAgent, this.AtticAgent, this.ScUiAPI);

      this.ContentBrowserProxy = new ContentBrowserFacade(this.HindeCore)

      this.CommandRouter = new CommandRouter(this.HindeCore, this.ScUiAPI, this.ToastAgent, scUiMan, this.AtticAgent, this.SettingsAgent, this.AutoSnapShotAgent, this.TopDocumentJacket);

      let contentMessageBroker: IMessageBroker_Content = new MessageBroker_Content(this.HindeCore, this.SettingsAgent,
        this.ScUiAPI, this.AtticAgent, this.ContentBrowserProxy, this.AutoSnapShotAgent, this.CommandRouter);

      contentMessageMan = new ContentMessageManager(this.HindeCore, contentMessageBroker);

      await scUiMan.InitSitecoreUiManager()
        .then(() => contentMessageMan.InitContentMessageManager())
        .then(() => this.ScUiAPI.InstantiateHindSiteScUiProxy())
        .then(() => {
          this.AutoSnapShotAgent.ScheduleIntervalTasks();
        })
        .then(() => this.StartUp())
        .then(() => this.HindeCore.Logger.Log('Init success'))
        .catch((err) => this.ErrorHand.ErrorAndThrow('Content Entry Point', err));

      this.HindeCore.Logger.SectionMarker('e) Instantiate and Initialize Managers');
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.InstantiateAndInit_Managers.name, err);
    }
  }


  private TriggerStartupCommands() {
    let setStateFromX: ICommandRouterParams = {
      MsgFlag: MsgFlag.SetStateFromQueryString,
      NewNickName: null,
      SelectSnapShotId: null,
    }

    if (this.TopDocumentJacket.UrlJacket.QueryStringHasKey(QueryStrKey.hsTargetSs)) {
      setStateFromX.MsgFlag = MsgFlag.SetStateFromQueryString,
        this.CommandRouter.RouteCommand(setStateFromX);
    } else if ((this.SettingsAgent.GetByKey(SettingKey.AutoRestoreState)).ValueAsBool()) {
      this.HindeCore.Logger.Log('yup...has the setting');
      setStateFromX.MsgFlag = MsgFlag.SetStateFromMostRecent;
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

  private Instantiate_HindeCore(): void {
    let logger: ILoggerAgent = new LoggerAgent();
    logger.Instantiate();
    
    this.TaskMonitor = new TaskMonitor(logger);

    this.ErrorHand = new ErrorHandlerAgent(this.TaskMonitor);
    this.ErrorHand.Instantiate();


    this.TaskMonitor.IntroduceErrorHand(this.ErrorHand);
    this.TaskMonitor.Instantiate();

    this.HindeCore = {
      Logger: logger,
      ErrorHand: this.ErrorHand,
      TaskMonitor: this.TaskMonitor,
      Discriminator: Discriminator.IHindeCore,
    }
  }
}

let contentEntry: ContentEntry = new ContentEntry();
contentEntry.StartUpContent();