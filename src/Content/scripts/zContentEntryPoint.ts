import { LoggerAgent } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent';
import { LoggerConsoleWriter } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter';
import { LoggerStorageWriter } from '../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter';
import { RepositoryAgent } from '../../Shared/scripts/Agents/Agents/RepositoryAgent/RepositoryAgent';
import { ConstAllSettings } from '../../Shared/scripts/Agents/Agents/SettingsAgent/ConstAllSettings';
import { SettingsAgent } from '../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent';
import { ToastAgent } from '../../Shared/scripts/Agents/Agents/ToastAgent/ToastAgent';
import { RollingLogIdDrone } from '../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone';
import { SettingKey } from '../../Shared/scripts/Enums/3xxx-SettingKey';
import { IGenericSetting } from '../../Shared/scripts/Interfaces/Agents/IGenericSetting';
import { AutoSnapShotAgent } from './Managers/AutoSnapShotAgent/AutoSnapShotAgent';
import { SitecoreUiManager } from './Managers/SitecoreUiManager/SitecoreUiManager';
import { ContentAtticAgent } from './Managers/ContentAtticManager/ContentAtticAgent';
import { ContentAPIManager } from './Managers/ContentAPIManager/ContentAPIManager';
import { ContentStateManager } from './Classes/ContentStateManager/ContentStateManager';
import { RecipeBasics } from '../../Shared/scripts/Classes/RecipeBasics';
import { MiscManager } from './Managers/MiscManager/MiscManager';
import { PromisesRecipes } from '../../Shared/scripts/Classes/PromisesRecipes';
import { ContentMessageManager } from './Managers/ContentMessageManager/ContentMessageManager';
import { ISettingsAgent } from '../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { ContentMessageBroker } from './Drones/ContentMessageBroker/ContentMessageBroker';
import { IContentMessageBroker } from '../../Shared/scripts/Interfaces/Agents/IContentMessageBroker';
import { IContentApi } from '../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi';
import { IScWindowManager } from '../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { ScUrlAgent } from '../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent';
import { IScUrlAgent } from '../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent';
import { IRepositoryAgent } from '../../Shared/scripts/Interfaces/Agents/IRepositoryAgent';
import { IContentAtticAgent } from '../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent';
import { ScWindowManager } from './Managers/ScWindowManager/ScWindowManager';

class ContentEntry {
  private RepoAgent: IRepositoryAgent;
  private Logger: LoggerAgent;
  private ContentAPIMan: IContentApi;
  private ContentMan: ContentStateManager;
  private ToastAgent: ToastAgent;
  private MiscMan: MiscManager;
  private SettingsAgent: ISettingsAgent;
  private AtticAgent: IContentAtticAgent;

  async main() {
    let scUiMan: SitecoreUiManager;
    let contentMessageMan: ContentMessageManager;
    let scWinMan: IScWindowManager;
    let recipeBasics: RecipeBasics;

    await this.InstantiateAndInitLoggerAndSettings()
      .then(async () => {
        this.Logger.SectionMarker('Instantiate Agents');

        this.MiscMan = new MiscManager(this.Logger);
        this.ToastAgent = new ToastAgent(this.Logger);
        recipeBasics = new RecipeBasics(this.Logger);
        let promisesRecipes = new PromisesRecipes(this.Logger);

        let scUrlAgent: IScUrlAgent = new ScUrlAgent(this.Logger);
        await scUrlAgent.InitScUrlAgent()

        this.Logger.SectionMarker('Instantiate Managers');

        this.AtticAgent = new ContentAtticAgent(this.RepoAgent, this.Logger);
        this.AtticAgent.InitContentAtticManager(this.SettingsAgent.GetByKey(SettingKey.AutoSaveRetainDays).ValueAsInt());

        scWinMan = new ScWindowManager(this.Logger, scUiMan, recipeBasics, this.MiscMan, this.ToastAgent, this.AtticAgent, scUrlAgent);
        scUiMan = new SitecoreUiManager(this.Logger, recipeBasics);
        this.ContentMan = new ContentStateManager(this.Logger, this.AtticAgent, scUiMan, scWinMan);

        this.ContentAPIMan = new ContentAPIManager(this.Logger, this.ContentMan, this.ToastAgent, scUiMan, promisesRecipes, recipeBasics, scWinMan);

        let contentMessageBroker: IContentMessageBroker = new ContentMessageBroker(this.Logger, this.SettingsAgent,
          this.ContentAPIMan, this.AtticAgent, recipeBasics, this.ToastAgent, scUiMan, scWinMan);

        contentMessageMan = new ContentMessageManager(this.Logger, scWinMan, contentMessageBroker);
      })
      .catch((err) => this.Logger.ErrorAndThrow(this.main.name, err));

    this.Logger.SectionMarker('Initialize Managers');

    await scUiMan.InitSitecoreUiManager()
      .then(() => contentMessageMan.InitContentMessageManager())
      .then(() => scWinMan.InitScWindowManager())

      .then(() => {
        let autoSnapShotAgent: AutoSnapShotAgent = new AutoSnapShotAgent(this.Logger, this.SettingsAgent, scWinMan,
          this.AtticAgent, scUiMan, recipeBasics, this.ToastAgent);
        autoSnapShotAgent.ScheduleIntervalTasks();
      })
      .then(() => this.Logger.Log('Init success'))
      .catch((err) => this.Logger.ErrorAndThrow('Content Entry Point', err));
  }

  private InitLogging() {
    this.Logger.FuncStart(this.InitLogging.name);

    let enableLogger: IGenericSetting = this.SettingsAgent.GetByKey(SettingKey.EnableLogging);

    if (enableLogger.ValueAsBool()) {
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

  private async InstantiateAndInitLoggerAndSettings() {
    this.Logger = new LoggerAgent();

    this.RepoAgent = new RepositoryAgent(this.Logger);

    this.SettingsAgent = new SettingsAgent(this.Logger, this.RepoAgent);

    var allSettings: IGenericSetting[] = new ConstAllSettings().AllSettings;

    this.SettingsAgent.InitSettingsAgent(allSettings);

    this.InitLogging();
  }
}

let contentEntry: ContentEntry = new ContentEntry();
contentEntry.main();