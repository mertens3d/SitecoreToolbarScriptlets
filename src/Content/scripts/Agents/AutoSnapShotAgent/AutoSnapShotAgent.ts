import { StaticHelpers } from "../../../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../../../Shared/scripts/Enums/3xxx-SettingKey";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindSiteSetting } from "../../../../Shared/scripts/Interfaces/Agents/IGenericSetting";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { ISettingsAgent } from "../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { RecipeAutoSaveState } from "../../ContentApi/Recipes/RecipeAutoSaveState";
import { LoggableBase } from "../../Managers/LoggableBase";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { HindSiteSettingWrapper } from "../../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";

export class AutoSnapShotAgent extends LoggableBase {
  private AtticAgent: IContentAtticAgent;
  private AutoSaveHasBeenScheduled: boolean = false;
  private LastKnownSavedState: IDataStateOfSitecoreWindow = null;
  private ScWinMan: IScWindowManager;
  private SettingsAgent: ISettingsAgent;
  private RecipeAutoSaveState: RecipeAutoSaveState;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent, scWinMan: IScWindowManager, atticAgent: IContentAtticAgent) {
    super(logger);
    this.SettingsAgent = settingsAgent;
    this.ScWinMan = scWinMan;
    this.AtticAgent = atticAgent;
    this.RecipeAutoSaveState = new RecipeAutoSaveState(this.Logger, this.ScWinMan, this.AtticAgent);
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