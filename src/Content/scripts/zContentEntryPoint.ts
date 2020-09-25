import { LoggerAgent } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent';
import { LoggerConsoleWriter } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter';
import { LoggerStorageWriter } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter';
import { RepositoryAgent } from '../../Shared/scripts/Agents/Agents/RepositoryAgent/RepositoryAgent';
import { SettingsAgent } from '../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent';
import { ToastAgent } from '../../Shared/scripts/Agents/Agents/ToastAgent/ToastAgent';
import { ScUrlAgent } from '../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent';
import { RollingLogIdDrone } from '../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone';
import { SettingKey } from '../../Shared/scripts/Enums/3xxx-SettingKey';
import { IHindSiteScWindowApi } from '../../Shared/scripts/Interfaces/Api/IHindSiteScWindowApi';
import { IContentAtticAgent } from '../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent';
import { IContentMessageBroker } from '../../Shared/scripts/Interfaces/Agents/IContentMessageBroker';
import { IHindSiteSetting } from '../../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { InitResultsScWindowManager } from "../../Shared/scripts/Interfaces/Agents/InitResultsScWindowManager";
import { IRepositoryAgent } from '../../Shared/scripts/Interfaces/Agents/IRepositoryAgent';
import { IScWindowManager } from '../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { ISettingsAgent } from '../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { SharedConst } from '../../Shared/scripts/SharedConst';
import { AutoSnapShotAgent } from './Agents/AutoSnapShotAgent/AutoSnapShotAgent';
import { ContentAtticAgent } from './Agents/ContentAtticAgent/ContentAtticAgent';
import { MiscAgent } from './Agents/MiscAgent/MiscAgent';
import { ContentMessageBroker } from './Drones/ContentMessageBroker/ContentMessageBroker';
import { HindSiteScWindowApi } from '../../HindSiteApi/scripts/Concretions/HindSiteScWindowApi';
import { ContentMessageManager } from './Managers/ContentMessageManager/ContentMessageManager';
import { ScWindowManager } from './Managers/ScWindowManager/ScWindowManager';
import { ScUiManager } from './Managers/SitecoreUiManager/SitecoreUiManager';
import { ContentBrowserProxy } from './Drones/ContentMessageBroker/ContentBrowserProxy';
import { IContentBrowserProxy } from '../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy';
import { ApiEntry } from '../../HindSiteApi/scripts/ApiEntryPoint';
import { DesktopStartBarProxy } from './Proxies/Desktop/DesktopStartBarProxy/DesktopStartBarProxy';

class ContentEntry {
  private RepoAgent: IRepositoryAgent;
  private Logger: LoggerAgent;
  private ContentAPI: IHindSiteScWindowApi;
  private ToastAgent: ToastAgent;
  private MiscAgent: MiscAgent;
  private SettingsAgent: ISettingsAgent;
  private AtticAgent: IContentAtticAgent;
  ScUrlAgent: ScUrlAgent;
  ContentBrowserProxy: IContentBrowserProxy;
  AutoSnapShotAgent: AutoSnapShotAgent;
  HindSiteApi: ApiEntry;
    DtStartBarProxy: DesktopStartBarProxy;

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
    this.ContentBrowserProxy = new ContentBrowserProxy(this.Logger)
    this.HindSiteApi = new ApiEntry(this.Logger, this.ContentBrowserProxy);

    scWinMan = new ScWindowManager(this.Logger, scUiMan, this.MiscAgent, this.ToastAgent, this.AtticAgent, this.ScUrlAgent, this.SettingsAgent, this.HindSiteApi, this.ContentBrowserProxy);

    scUiMan = new ScUiManager(this.Logger);

    this.AutoSnapShotAgent = new AutoSnapShotAgent(this.Logger, this.SettingsAgent, scWinMan, this.AtticAgent);

    this.ContentAPI = new HindSiteScWindowApi(this.Logger, scUiMan, scWinMan, this.ContentBrowserProxy);

    this.AtticAgent.CleanOutOldAutoSavedData();

    this.DtStartBarProxy = new DesktopStartBarProxy(this.Logger, this.ContentBrowserProxy, null); //todo null

    let contentMessageBroker: IContentMessageBroker = new ContentMessageBroker(this.Logger, this.SettingsAgent,
      this.ContentAPI, this.AtticAgent, this.ToastAgent, scUiMan, scWinMan, this.ContentBrowserProxy, this.AutoSnapShotAgent, this.DtStartBarProxy);

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