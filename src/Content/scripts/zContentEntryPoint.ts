import { HindSiteScUiProxy } from '../../HindSiteScUiProxy/scripts/HindSiteScUiProxy';
import { ScUiManager } from '../../HindSiteScUiProxy/scripts/Managers/SitecoreUiManager/SitecoreUiManager';
import { LoggerAgent } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent';
import { LoggerConsoleWriter } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter';
import { LoggerStorageWriter } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter';
import { RepositoryAgent } from '../../Shared/scripts/Agents/Agents/RepositoryAgent/RepositoryAgent';
import { SettingsAgent } from '../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent';
import { ToastAgent } from '../../Shared/scripts/Agents/Agents/ToastAgent/ToastAgent';
import { ScUrlAgent } from '../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent';
import { RollingLogIdDrone } from '../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone';
import { SettingKey } from '../../Shared/scripts/Enums/3xxx-SettingKey';
import { IHindSiteScUiProxy } from '../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi';
import { IContentAtticAgent } from '../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent';
import { IContentBrowserProxy } from '../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy';
import { IMessageBroker_Content } from '../../Shared/scripts/Interfaces/Agents/IContentMessageBroker';
import { IHindSiteSetting } from '../../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { InitReportScWindowManager } from "../../Shared/scripts/Interfaces/Agents/InitResultsScWindowManager";
import { IRepositoryAgent } from '../../Shared/scripts/Interfaces/Agents/IRepositoryAgent';
import { ISettingsAgent } from '../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { SharedConst } from '../../Shared/scripts/SharedConst';
import { AutoSnapShotAgent } from './Agents/AutoSnapShotAgent';
import { ContentAtticAgent } from './Agents/ContentAtticAgent';
import { MiscAgent } from './Agents/MiscAgent';
import { ContentMessageManager } from './Managers/ContentMessageManager';
import { CommandRouter } from "./Proxies/CommandRouter";
import { ContentBrowserProxy } from './Proxies/ContentBrowserProxy';
import { MessageBroker_Content } from './Proxies/ContentMessageBroker';
import { InternalCommandRunner } from "./Proxies/InternalCommandRunner";
import { MsgFlag } from '../../Shared/scripts/Enums/1xxx-MessageFlag';
import { IMessageControllerToContent } from "../../Shared/scripts/Interfaces/IMessageControllerToContent";
import { ICommandRouterParams } from "../../Shared/scripts/Interfaces/ICommandRouterParams";
import { QueryStrKey } from '../../Shared/scripts/Enums/QueryStrKey';
import { _HindeCoreBase } from '../../Shared/scripts/LoggableBase';
import { IHindeCore } from '../../Shared/scripts/Interfaces/Agents/ILoggerAgent';

class ContentEntry {
  private RepoAgent: IRepositoryAgent;
  private Logger: LoggerAgent;
  private ScUiProxy: IHindSiteScUiProxy;
  private ToastAgent: ToastAgent;
  private MiscAgent: MiscAgent;
  private SettingsAgent: ISettingsAgent;
  private AtticAgent: IContentAtticAgent;
  ScUrlAgent: ScUrlAgent;
  ContentBrowserProxy: IContentBrowserProxy;
  AutoSnapShotAgent: AutoSnapShotAgent;

  CommandRouter: CommandRouter;
  HindeCore: IHindeCore;

  async Main() {
    this.InstantiateAndInit_LoggerAndSettings();
    this.InstantiateAndInitAgents_Content();
    await this.InstantiateAndInit_Managers()
      .then(() => {
        this.AtticAgent.CleanOutOldAutoSavedData();
      })

    this.Logger.SectionMarker('e) ' + this.Main.name);
    this.Logger.Log('standing by');
  }

  private InstantiateAndInitAgents_Content(): void {
    try {
      this.Logger.SectionMarker('Instantiate Agents');

      this.AtticAgent = new ContentAtticAgent(this.RepoAgent, this.HindeCore);
      this.MiscAgent = new MiscAgent(this.HindeCore);
      this.ToastAgent = new ToastAgent(this.HindeCore, document);

      this.ScUrlAgent = new ScUrlAgent(this.HindeCore, null);
      this.ScUrlAgent.Init_ScUrlAgent()
      this.AtticAgent.InitContentAtticManager(this.SettingsAgent.GetByKey(SettingKey.AutoSaveRetainDays).ValueAsInt());
    } catch (err) {
      this.Logger.ErrorAndThrow(this.InstantiateAndInitAgents_Content.name, err)
    }
  }

  private async InstantiateAndInit_Managers(): Promise<void> {
    try {
      this.Logger.SectionMarker('Instantiate and Initialize Managers');

      let scUiMan: ScUiManager;
      let contentMessageMan: ContentMessageManager;

      scUiMan = new ScUiManager(this.HindeCore);

      let topLevelDoc: IDataOneDoc = {
        ContentDoc: document,
        DocId: null,
        Nickname: 'TopLevelDoc'
      };

      this.ScUiProxy = new HindSiteScUiProxy(this.HindeCore, scUiMan, this.ScUrlAgent, topLevelDoc, this.ToastAgent);

      this.AutoSnapShotAgent = new AutoSnapShotAgent(this.HindeCore, this.SettingsAgent, this.AtticAgent, this.ScUiProxy);

      this.ContentBrowserProxy = new ContentBrowserProxy(this.HindeCore)

      this.CommandRouter = new CommandRouter(this.HindeCore, this.ScUiProxy, this.ToastAgent, scUiMan, this.AtticAgent, this.SettingsAgent, this.AutoSnapShotAgent, this.ScUrlAgent);

      let contentMessageBroker: IMessageBroker_Content = new MessageBroker_Content(this.HindeCore, this.SettingsAgent,
        this.ScUiProxy, this.AtticAgent, this.ContentBrowserProxy, this.AutoSnapShotAgent, this.CommandRouter, this.ScUrlAgent);

      contentMessageMan = new ContentMessageManager(this.HindeCore, contentMessageBroker);

      await scUiMan.InitSitecoreUiManager()
        .then(() => contentMessageMan.InitContentMessageManager())
        .then(() => this.ScUiProxy.OnReady_InstantiateHindSiteScUiProxy())
        .then((result: InitReportScWindowManager) => this.Logger.LogAsJsonPretty('InitResultsScWindowManager', result))
        .then(() => {
          this.AutoSnapShotAgent.ScheduleIntervalTasks();
        })
        .then(() => this.StartUp())
        .then(() => this.Logger.Log('Init success'))
        .catch((err) => this.Logger.ErrorAndThrow('Content Entry Point', err));

      this.Logger.SectionMarker('e) Instantiate and Initialize Managers');
    } catch (err) {
      this.Logger.ErrorAndThrow(this.InstantiateAndInit_Managers.name, err);
    }
  }

  private StartUp() {
    this.Logger.FuncStart(this.StartUp.name);
    //priorities are (first highest)
    // query string
    // settings
    let setStateFromX: ICommandRouterParams = {
      MsgFlag: MsgFlag.SetStateFromQueryString,
      NewNickName: null,
      SelectSnapShotId: null,
    }

    if (this.ScUrlAgent.QueryStringHasKey(QueryStrKey.hsTargetSs)) {
      setStateFromX.MsgFlag = MsgFlag.SetStateFromQueryString,
        this.CommandRouter.RouteCommand(setStateFromX);
    } else if ((this.SettingsAgent.GetByKey(SettingKey.AutoRestoreState)).ValueAsBool()) {
      this.Logger.Log('yup...has the setting');
      setStateFromX.MsgFlag = MsgFlag.SetStateFromMostRecent;
      this.CommandRouter.RouteCommand(setStateFromX);
    }
    this.Logger.FuncEnd(this.StartUp.name);
  }

  private InitLogging() {
    this.Logger.FuncStart(this.InitLogging.name);

    let enableLogger: IHindSiteSetting = this.SettingsAgent.GetByKey(SettingKey.EnableDebugging);

    if (enableLogger.ValueAsBool() || SharedConst.Const.Debug.ForceLoggingEnabled) {
      let consoleLogWrite = new LoggerConsoleWriter();

      var RollingLogId = new RollingLogIdDrone(this.SettingsAgent, this.HindeCore);
      let storageLogWriter = new LoggerStorageWriter();
      var nextLogId = RollingLogId.GetNextLogId();
      storageLogWriter.SetLogToStorageKey(nextLogId);

      this.Logger.AddWriter(consoleLogWrite);
      this.Logger.AddWriter(storageLogWriter);
    }

    this.Logger.FlushBuffer();
    this.Logger.FuncEnd(this.InitLogging.name);
  }

  private InstantiateAndInit_LoggerAndSettings(): void {
    this.Logger = new LoggerAgent();
    this.HindeCore = {
      Logger: this.Logger
    }

    this.RepoAgent = new RepositoryAgent(this.HindeCore);

    this.SettingsAgent = new SettingsAgent(this.HindeCore, this.RepoAgent);

    this.SettingsAgent.Init_SettingsAgent();

    this.InitLogging();
  }
}

let contentEntry: ContentEntry = new ContentEntry();
contentEntry.Main();