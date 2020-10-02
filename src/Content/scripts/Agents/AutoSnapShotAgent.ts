import { RecipeAutoSaveState } from "../../../HindSiteScUiProxy/scripts/ContentApi/Recipes/RecipeAutoSaveState";
import { _HindeCoreBase } from "../../../Shared/scripts/LoggableBase";
import { HindSiteSettingWrapper } from "../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../../Shared/scripts/Enums/3xxx-SettingKey";
import { IHindSiteScUiProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IStateOfScUiProxy } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { SharedConst } from "../../../Shared/scripts/SharedConst";

export class AutoSnapShotAgent extends _HindeCoreBase {
  private AtticAgent: IContentAtticAgent;
  private AutoSaveHasBeenScheduled: boolean = false;
  private LastKnownSavedState: IStateOfScUiProxy = null;
  private SettingsAgent: ISettingsAgent;
  private RecipeAutoSaveState: RecipeAutoSaveState;
  ScUiProxy: IHindSiteScUiProxy;

  constructor(hindeCore: IHindeCore, settingsAgent: ISettingsAgent, atticAgent: IContentAtticAgent, scUiProxy: IHindSiteScUiProxy) {
    super(hindeCore);
    this.SettingsAgent = settingsAgent;
    this.AtticAgent = atticAgent;
    this.ScUiProxy = scUiProxy;
  }

  async AutoSaveSnapShot() {
    this.Logger.FuncStart(this.AutoSaveSnapShot.name);

    if (!this.RecipeAutoSaveState) {
      this.RecipeAutoSaveState = new RecipeAutoSaveState(this.HindeCore, this.ScUiProxy, this.AtticAgent);
    }

    this.RecipeAutoSaveState.ExecuteAsync(this.LastKnownSavedState)
      .then((result: IStateOfScUiProxy) => this.LastKnownSavedState = result);

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