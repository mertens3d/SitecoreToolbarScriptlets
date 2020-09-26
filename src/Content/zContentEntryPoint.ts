import { HindSiteScUiProxy } from '../HindSiteScUiProxy/scripts/HindSiteScUiProxy';
import { ScUiManager } from '../HindSiteScUiProxy/scripts/Managers/SitecoreUiManager/SitecoreUiManager';
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
import { IContentBrowserProxy } from '../Shared/scripts/Interfaces/Agents/IContentBrowserProxy';
import { IContentMessageBroker } from '../Shared/scripts/Interfaces/Agents/IContentMessageBroker';
import { IHindSiteSetting } from '../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { InitResultsScWindowManager } from "../Shared/scripts/Interfaces/Agents/InitResultsScWindowManager";
import { IRepositoryAgent } from '../Shared/scripts/Interfaces/Agents/IRepositoryAgent';
import { ISettingsAgent } from '../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { SharedConst } from '../Shared/scripts/SharedConst';
import { AutoSnapShotAgent } from './scripts/Agents/AutoSnapShotAgent';
import { ContentAtticAgent } from './scripts/Agents/ContentAtticAgent';
import { MiscAgent } from './scripts/Agents/MiscAgent';
import { SnapShotsAgent } from './scripts/Agents/SnapShotsAgent';
import { ContentMessageManager } from './scripts/Managers/ContentMessageManager';
import { ContentBrowserProxy } from './scripts/Proxies/ContentBrowserProxy';
import { ContentMessageBroker, InternalCommandRunner } from './scripts/Proxies/ContentMessageBroker';

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
  InternalCommandRunner: InternalCommandRunner;

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

    scUiMan = new ScUiManager(this.Logger);

    let topLevelDoc: IDataOneDoc = {
      ContentDoc: document,
      DocId: null,
      Nickname: 'TopLevelDoc'
    };

    this.ScUiProxy = new HindSiteScUiProxy(this.Logger, scUiMan, this.ScUrlAgent, topLevelDoc);

    this.AutoSnapShotAgent = new AutoSnapShotAgent(this.Logger, this.SettingsAgent, this.AtticAgent, this.ScUiProxy);

    this.AtticAgent.CleanOutOldAutoSavedData();

    this.ContentBrowserProxy = new ContentBrowserProxy(this.Logger)

    this.SnapShotsAgent = new SnapShotsAgent(this.Logger);

    this.InternalCommandRunner = new InternalCommandRunner(this.Logger, this.AtticAgent, this.ScUiProxy);
    this.InternalCommandRunner.InitFromQueryString();

    let contentMessageBroker: IContentMessageBroker = new ContentMessageBroker(this.Logger, this.SettingsAgent,
      this.ScUiProxy, this.AtticAgent, this.ToastAgent, scUiMan, this.ContentBrowserProxy, this.AutoSnapShotAgent, this.SnapShotsAgent, this.InternalCommandRunner);

    contentMessageMan = new ContentMessageManager(this.Logger, contentMessageBroker);

    await scUiMan.InitSitecoreUiManager()
      .then(() => contentMessageMan.InitContentMessageManager())
      .then(() => this.ScUiProxy.OnReadyInitScWindowManager())
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