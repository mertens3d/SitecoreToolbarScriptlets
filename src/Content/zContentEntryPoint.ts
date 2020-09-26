import { LoggerAgent } from '../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent';
import { LoggerConsoleWriter } from '../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter';
import { LoggerStorageWriter } from '../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter';
import { RepositoryAgent } from '../Shared/scripts/Agents/Agents/RepositoryAgent/RepositoryAgent';
import { SettingsAgent } from '../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent';
import { ToastAgent } from '../Shared/scripts/Agents/Agents/ToastAgent/ToastAgent';
import { ScUrlAgent } from '../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent';
import { RollingLogIdDrone } from '../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone';
import { SettingKey } from '../Shared/scripts/Enums/3xxx-SettingKey';
import { IHindSiteScWindowApi, ISnapShotsAgent } from '../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi';
import { IContentAtticAgent } from '../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent';
import { IContentMessageBroker } from '../Shared/scripts/Interfaces/Agents/IContentMessageBroker';
import { IHindSiteSetting } from '../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { InitResultsScWindowManager } from "../Shared/scripts/Interfaces/Agents/InitResultsScWindowManager";
import { IRepositoryAgent } from '../Shared/scripts/Interfaces/Agents/IRepositoryAgent';
import { IScWindowManager } from '../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { ISettingsAgent } from '../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { SharedConst } from '../Shared/scripts/SharedConst';
import { AutoSnapShotAgent } from './scripts/Agents/AutoSnapShotAgent';
import { ContentAtticAgent } from './scripts/Agents/ContentAtticAgent';
import { ContentMessageBroker, ContentInternalCommandRunner } from './scripts/Proxies/ContentMessageBroker';
import { HindSiteScUiProxy } from '../HindSiteScUiProxy/scripts/HindSiteScUiProxy';
import { ContentMessageManager } from './scripts/Managers/ContentMessageManager';
import { ContentBrowserProxy } from './scripts/Proxies/ContentBrowserProxy';
import { IContentBrowserProxy } from '../Shared/scripts/Interfaces/Agents/IContentBrowserProxy';
import { MiscAgent } from './scripts/Agents/MiscAgent';
import { ScUiManager } from '../HindSiteScUiProxy/scripts/Managers/SitecoreUiManager/SitecoreUiManager';
import { ScWindowManager } from '../HindSiteScUiProxy/scripts/Managers/ScWindowManager/ScWindowManager';
import { SnapShotsAgent } from './scripts/Agents/SnapShotsAgent';

class ContentEntry {
  private RepoAgent: IRepositoryAgent;
  private Logger: LoggerAgent;
  private ScUiProxy: IHindSiteScWindowApi;
  private ToastAgent: ToastAgent;
  private MiscAgent: MiscAgent;
  private SettingsAgent: ISettingsAgent;
  private AtticAgent: IContentAtticAgent;
  ScUrlAgent: ScUrlAgent;
  ContentBrowserProxy: IContentBrowserProxy;
  AutoSnapShotAgent: AutoSnapShotAgent;
  SnapShotsAgent: ISnapShotsAgent;
    ContentInternalCommandRunner: ContentInternalCommandRunner;

  async Main() {
    this.InstantiateAndInit_LoggerAndSettings();
    this.InstantiateAndInitAgents_Content();
    this.InstantiateAndInit_Managers();

    this.Logger.SectionMarker('Initialize Managers');
  }

  private InstantiateAndInitAgents_Content(): void {
    try {
      this.Logger.SectionMarker('Instantiate Agents');

      this.AtticAgent = new ContentAtticAgent(this.RepoAgent, this.Logger);
      this.MiscAgent = new MiscAgent(this.Logger);
      this.ToastAgent = new ToastAgent(this.Logger);

      this.ScUrlAgent = new ScUrlAgent(this.Logger, null);
      this.ScUrlAgent.Init_ScUrlAgent()
      this.AtticAgent.InitContentAtticManager(this.SettingsAgent.GetByKey(SettingKey.AutoSaveRetainDays).ValueAsInt());
    } catch (err) {
      this.Logger.ErrorAndThrow(this.InstantiateAndInitAgents_Content.name, err)
    }
  }

  private async InstantiateAndInit_Managers(): Promise<void> {
    this.Logger.SectionMarker('Instantiate and Initialize Managers');

    let scUiMan: ScUiManager;
    let contentMessageMan: ContentMessageManager;
    let scWinMan: IScWindowManager;

    scWinMan = new ScWindowManager(this.Logger, scUiMan, this.MiscAgent, this.ToastAgent, this.AtticAgent, this.ScUrlAgent, this.SettingsAgent);
    scUiMan = new ScUiManager(this.Logger);

    this.AutoSnapShotAgent = new AutoSnapShotAgent(this.Logger, this.SettingsAgent, scWinMan, this.AtticAgent);

    this.ScUiProxy = new HindSiteScUiProxy(this.Logger, this.ToastAgent, scUiMan, scWinMan, this.AtticAgent, this.AutoSnapShotAgent);
    this.ContentBrowserProxy = new ContentBrowserProxy(this.Logger)

    this.SnapShotsAgent = new SnapShotsAgent(this.Logger);

    this.ContentInternalCommandRunner = new ContentInternalCommandRunner(this.Logger, this.AtticAgent, this.ScUiProxy);



    let contentMessageBroker: IContentMessageBroker = new ContentMessageBroker(this.Logger, this.SettingsAgent,
      this.ScUiProxy, this.AtticAgent, this.ToastAgent, scUiMan, scWinMan, this.ContentBrowserProxy, this.AutoSnapShotAgent, this.SnapShotsAgent, this.ContentInternalCommandRunner);

    contentMessageMan = new ContentMessageManager(this.Logger, scWinMan, contentMessageBroker);

    await scUiMan.InitSitecoreUiManager()
      .then(() => contentMessageMan.InitContentMessageManager())
      .then(() => scWinMan.OnReadyInitScWindowManager())
      .then((result: InitResultsScWindowManager) => this.Logger.LogAsJsonPretty('InitResultsScWindowManager', result))
      .then(() => {
        this.AutoSnapShotAgent.ScheduleIntervalTasks();
      })
      .then(() => this.Logger.Log('Init success'))
      .catch((err) => this.Logger.ErrorAndThrow('Content Entry Point', err));
  }

  private InitLogging() {
    this.Logger.FuncStart(this.InitLogging.name);

    let enableLogger: IHindSiteSetting = this.SettingsAgent.GetByKey(SettingKey.EnableLogging);

    if (enableLogger.ValueAsBool() || SharedConst.Const.Debug.ForceLoggingEnabled) {
      let consoleLogWrite = new LoggerConsoleWriter();

      var RollingLogId = new RollingLogIdDrone(this.SettingsAgent, this.Logger);
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

    this.RepoAgent = new RepositoryAgent(this.Logger);

    this.SettingsAgent = new SettingsAgent(this.Logger, this.RepoAgent);

    this.SettingsAgent.Init_SettingsAgent();

    this.InitLogging();
  }
}

let contentEntry: ContentEntry = new ContentEntry();
contentEntry.Main();