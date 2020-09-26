import { RecipeAutoSaveState } from "../../../HindSiteScUiProxy/scripts/ContentApi/Recipes/RecipeAutoSaveState";
import { LoggableBase } from "../../../HindSiteScUiProxy/scripts/Managers/LoggableBase";
import { HindSiteSettingWrapper } from "../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../../Shared/scripts/Enums/3xxx-SettingKey";
import { IHindSiteScWindowApi } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataStateOfSitecoreWindow } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { SharedConst } from "../../../Shared/scripts/SharedConst";

export class AutoSnapShotAgent extends LoggableBase {
  
  private AtticAgent: IContentAtticAgent;
  private AutoSaveHasBeenScheduled: boolean = false;
  private LastKnownSavedState: IDataStateOfSitecoreWindow = null;
  private SettingsAgent: ISettingsAgent;
  private RecipeAutoSaveState: RecipeAutoSaveState;
    ScUiProxy: IHindSiteScWindowApi;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, atticAgent: IContentAtticAgent, scUiProxy: IHindSiteScWindowApi) {
    super(logger);
    this.SettingsAgent = settingsAgent;
    this.AtticAgent = atticAgent;
    this.ScUiProxy = scUiProxy;
    this.RecipeAutoSaveState = new RecipeAutoSaveState(this.Logger, this.ScUiProxy, this.AtticAgent);
  }

  async AutoSaveSnapShot() {
    this.Logger.FuncStart(this.AutoSaveSnapShot.name);

    this.RecipeAutoSaveState.ExecuteAsync(this.LastKnownSavedState)
      .then((result: IDataStateOfSitecoreWindow) => this.LastKnownSavedState = result);

    this.Logger.FuncEnd(this.AutoSaveSnapShot.name);
  }

  ScheduleIntervalTasks() {
    this.Logger.FuncStart(this.ScheduleIntervalTasks.name);
    this.Logger.LogVal('Has been scheduled: ', this.AutoSaveHasBeenScheduled)
    let autoSaveSetting: HindSiteSettingWrapper = this.SettingsAgent.HindSiteSettingsBucket.GetByKey(SettingKey.AutoSaveIntervalMin)
    this.Logger.LogVal('autoSaveSetting: ', autoSaveSetting.HindSiteSetting.ValueAsInt());

    if (autoSaveSetting.HindSiteSetting.ValueAsInt() > 0) {
      if (!this.AutoSaveHasBeenScheduled) {
        var self = this;

        var intervalMs = StaticHelpers.MinToMs(autoSaveSetting.HindSiteSetting.ValueAsInt());

        window.setInterval(() => {
          self.AutoSaveSnapShot();
        }, intervalMs / SharedConst.Const.Debug.SpeedUpAutoSaveIntervalFactor)

        this.AutoSaveHasBeenScheduled = true;
      }
    }
    this.Logger.FuncEnd(this.ScheduleIntervalTasks.name);
  }
}