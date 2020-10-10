import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";
import { HindSiteSettingWrapper } from "../../../Shared/scripts/Agents/Agents/SettingsAgent/HindSiteSettingWrapper";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../../Shared/scripts/Enums/30 - SettingKey";
import { IHindSiteScUiAPI } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IStateOfScUi } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { SharedConst } from "../../../Shared/scripts/SharedConst";
import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";

export class AutoSnapShotAgent extends _FrontBase {
  private AtticAgent: IContentAtticAgent;
  private AutoSaveHasBeenScheduled: boolean = false;
  private LastKnownSavedState: IStateOfScUi = null;
  private SettingsAgent: ISettingsAgent;
  ScUiProxy: IHindSiteScUiAPI;

  constructor(hindeCore: IHindeCore, settingsAgent: ISettingsAgent, atticAgent: IContentAtticAgent, scUiProxy: IHindSiteScUiAPI) {
    super(hindeCore);
    this.SettingsAgent = settingsAgent;
    this.AtticAgent = atticAgent;
    this.ScUiProxy = scUiProxy;
  }

  async AutoSaveSnapShot() {
    this.Logger.FuncStart(this.AutoSaveSnapShot.name);

    //if (!this.RecipeAutoSaveState) {
    //  this.RecipeAutoSaveState = new RecipeAutoSaveState(this.HindeCore, this.ScUiProxy, this.AtticAgent);
    //}

    let windowStatePrior = this.LastKnownSavedState;

    this.ScUiProxy.GetStateOfScUiProxyWindow(SnapShotFlavor.Autosave)
      .then((windowStateNew: IStateOfScUi) => {
        let hasCorrectData = windowStateNew && windowStateNew.Meta && windowStateNew.Meta.Hash
          && windowStatePrior && windowStatePrior.Meta && windowStatePrior.Meta.Hash;

        if (!hasCorrectData || (windowStateNew.Meta.Hash !== windowStatePrior.Meta.Hash)) {
          this.Logger.Log('states are different, save snap shot');

          this.AtticAgent.WriteStateOfSitecoreToStorage(windowStateNew);
        } else {
          this.Logger.Log('states are same, no save');
        }
        this.LastKnownSavedState = windowStateNew;
      })
      //.then((result: IStateOfScUi) => this.LastKnownSavedState = result);
      .catch((err) => this.ErrorHand.ErrorAndThrow(this.AutoSaveSnapShot.name, err));

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