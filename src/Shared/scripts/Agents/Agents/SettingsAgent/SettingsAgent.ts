import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";
import { UiModuleManagerPassThroughEvent_Observer } from "../../../../../PopUp/scripts/Events/UiModuleManagerPassThroughEvent/UiModuleManagerPassThroughEvent_Observer";
import { UiModulesManager } from "../../../../../PopUp/scripts/Managers/UiManager/UiModulesManager";
import { StaticHelpers } from "../../../Classes/StaticHelpers";
import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";
import { IRepositoryAgent } from "../../../Interfaces/Agents/IRepositoryAgent";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { IOneGenericSettingForStorage } from "../../../Interfaces/IOneGenericSettingForStorage";
import { HindSiteSetting } from "./HindSiteSetting";

export class SettingsAgent implements ISettingsAgent {
  private SettingsAr: HindSiteSetting[] = [];
  private Logger: ILoggerAgent;
  private RepoAgent: IRepositoryAgent;
  private UiElementChangeEvent_Observer: UiModuleManagerPassThroughEvent_Observer;
  private UiModulesManager: UiModulesManager;

  constructor(logger: ILoggerAgent, repoAgent: IRepositoryAgent) {
    this.Logger = logger;
    this.RepoAgent = repoAgent;
  }

  Init_SettingsAgent(allDefaultSettings: IHindSiteSetting[]): void {
    this.Logger.FuncStart(this.Init_SettingsAgent.name, allDefaultSettings.length);

    this.SettingsAr = <HindSiteSetting[]>allDefaultSettings;

    let settingsFromStorage: IOneGenericSettingForStorage[] = this.ReadGenericSettingsFromStorage();
    this.UpdateSettingValuesFromStorage(settingsFromStorage)

    this.Logger.FuncEnd(this.Init_SettingsAgent.name);
  }

  IntroduceUiModulesManager(uiModulesManager: UiModulesManager) {
    this.UiModulesManager = uiModulesManager;
  }

  WireEvents() {
    this.UiElementChangeEvent_Observer = new UiModuleManagerPassThroughEvent_Observer(this.Logger, this.OnUiModuleManagerPassThroughEvent);
  }

  OnUiModuleManagerPassThroughEvent<IUiModuleManagerPassThroughEvent_Payload>(payload: IUiModuleManagerPassThroughEvent_Payload) {
    alert('pass through');
  }

  UpdateSettingsFromPopUpMsg(newSettings: IHindSiteSetting[]) {
    this.Logger.FuncStart(this.UpdateSettingsFromPopUpMsg.name);
    if (newSettings) {
      for (var idx = 0; idx < newSettings.length; idx++) {
        let oneSetting: IHindSiteSetting = newSettings[idx];
        this.SetByKey(oneSetting.SettingKey, oneSetting.ValueAsObj);
      }
    }
    this.Logger.FuncEnd(this.UpdateSettingsFromPopUpMsg.name);
  }

  HindSiteSettings(): IHindSiteSetting[] {
    return this.SettingsAr;
  }

  ReadGenericSettingsFromStorage(): IOneGenericSettingForStorage[] {
    this.Logger.FuncStart(this.ReadGenericSettingsFromStorage.name);
    let toReturn: IOneGenericSettingForStorage[] = [];

    let storedValue: string = this.RepoAgent.ReadDataOfKey(PopConst.Const.Storage.KeyGenericSettings);

    if (storedValue) {
      toReturn = <IOneGenericSettingForStorage[]>JSON.parse(storedValue.toString());
    } else {
      toReturn = [];
    }

    this.Logger.FuncEnd(this.ReadGenericSettingsFromStorage.name);
    return toReturn;
  }

  LogAllSettings() {
    this.Logger.LogAsJsonPretty('this.SettingsAr', this.SettingsAr);
  }

  UpdateSettingValuesFromStorage(settingsFromStorage: IOneGenericSettingForStorage[]): void {
    this.Logger.FuncStart(this.UpdateSettingValuesFromStorage.name);
    try {
      for (var idx = 0; idx < settingsFromStorage.length; idx++) {
        let storageSetting: IOneGenericSettingForStorage = settingsFromStorage[idx];
        let matchingSetting: IHindSiteSetting = this.GetByKey(storageSetting.SettingKey);
        if (matchingSetting) {
          matchingSetting.ValueAsObj = storageSetting.ValueAsObj;
        } else {
          this.Logger.ErrorAndContinue(this.UpdateSettingValuesFromStorage.name, 'matching setting not found ' + StaticHelpers.SettingKeyAsString(storageSetting.SettingKey));
        }
      }
    } catch (err) {
      this.Logger.ErrorAndThrow(this.UpdateSettingValuesFromStorage.name, err);
    }

    this.Logger.FuncEnd(this.UpdateSettingValuesFromStorage.name);
  }

  GetSettingsByFlavor(targetFlavors: SettingFlavor[]): IHindSiteSetting[] {
    let toReturn: IHindSiteSetting[] = [];

    for (var idx = 0; idx < this.SettingsAr.length; idx++) {
      let candidate: IHindSiteSetting = this.SettingsAr[idx];
      if (targetFlavors.indexOf(candidate.SettingFlavor) > -1) {
        toReturn.push(candidate);
      }
    }

    return toReturn;
  }

  BooleanSettingChanged(settingKey: SettingKey, valueAsBool: boolean): void {
    this.Logger.LogVal(this.BooleanSettingChanged.name, SettingKey[settingKey]);
    this.SetByKey(settingKey, valueAsBool);
  }

  NumberSettingChanged(SettingKey: SettingKey, valueAsNumber: number): void {
    this.Logger.Log(StaticHelpers.SettingKeyAsString(SettingKey));
    this.Logger.LogVal('valueAsNumber', valueAsNumber.toString());
    this.SetByKey(SettingKey, valueAsNumber);
  }

  GetByKey(needleSettingKey: SettingKey): HindSiteSetting {
    var toReturn: HindSiteSetting = null;

    for (var idx = 0; idx < this.SettingsAr.length; idx++) {
      let candidate: HindSiteSetting = this.SettingsAr[idx];
      if (candidate.SettingKey === needleSettingKey) {
        toReturn = candidate;
        break;
      }
    }

    if (!toReturn) {
      this.Logger.ErrorAndContinue(this.NumberSettingChanged.name, 'Setting not found ' + StaticHelpers.SettingKeyAsString(needleSettingKey));
    }

    return toReturn;
  }

  SetByKey(settingKey: SettingKey, value: any): void {
    let foundSetting = this.GetByKey(settingKey);
    if (foundSetting) {
      foundSetting.ValueAsObj = value;
      this.WriteAllSettingValuesToStorage();
    } else {
      this.Logger.ErrorAndThrow(this.SetByKey.name, 'setting match not found');
    }
  }

  private WriteAllSettingValuesToStorage() {
    let settingValues: IOneGenericSettingForStorage[] = [];
    for (var udx = 0; udx < this.SettingsAr.length; udx++) {
      if (this.SettingsAr[udx].ValueAsObj !== null) {
        settingValues.push(
          {
            SettingKey: this.SettingsAr[udx].SettingKey,
            ValueAsObj: this.SettingsAr[udx].ValueAsObj,
            SettingKeyFriendly: StaticHelpers.SettingKeyAsString(this.SettingsAr[udx].SettingKey)
          });
      }
    }
    this.RepoAgent.WriteByKey(PopConst.Const.Storage.KeyGenericSettings, JSON.stringify(settingValues));
  }
}