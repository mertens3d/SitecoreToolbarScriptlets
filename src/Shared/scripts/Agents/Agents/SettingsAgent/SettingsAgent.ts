import { PopConst } from "../../../Const/PopConst";
import { UiModuleManagerPassThroughEvent_Observer } from "../../../../../PopUpUi/scripts/Events/UiModuleManagerPassThroughEvent/UiModuleManagerPassThroughEvent_Observer";
import { StaticHelpers } from "../../../Classes/StaticHelpers";
import { SettingKey } from "../../../Enums/30 - SettingKey";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { IHindeCore } from "../../../Interfaces/Agents/IHindeCore";
import { IRepositoryAgent } from "../../../Interfaces/Agents/IRepositoryAgent";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { IOneGenericSettingForStorage } from "../../../Interfaces/IOneGenericSettingForStorage";
import { HindSiteSettingsBucket } from "./HindSiteSettingsBucket";
import { HindSiteSettingWrapper } from "./HindSiteSettingWrapper";
import { _HindeCoreBase } from "../../../_HindeCoreBase";

export class SettingsAgent extends _HindeCoreBase implements ISettingsAgent {
  HindSiteSettingsBucket: HindSiteSettingsBucket;
  private RepoAgent: IRepositoryAgent;
  private UiElementChangeEvent_Observer: UiModuleManagerPassThroughEvent_Observer;

  constructor(hindeCore: IHindeCore, repoAgent: IRepositoryAgent) {
    super(hindeCore);
    this.RepoAgent = repoAgent;
    this.HindSiteSettingsBucket = new HindSiteSettingsBucket(this.HindeCore);
  }

  GetSettingsByFlavor(arg0: SettingFlavor[]): HindSiteSettingWrapper[] {
    return this.HindSiteSettingsBucket.GetSettingsByFlavor(arg0);
  }

  GetByKey(settingKey: SettingKey): IHindSiteSetting {
    let toReturn: IHindSiteSetting = null;
    let settingsWrapper = this.HindSiteSettingsBucket.GetByKey(settingKey);
    if (settingsWrapper) {
      toReturn = settingsWrapper.HindSiteSetting;
    }
    return toReturn;
  }

  Init_SettingsAgent(): void {
    this.Logger.FuncStart(this.Init_SettingsAgent.name);

    let settingsFromStorage: IOneGenericSettingForStorage[] = this.ReadGenericSettingsFromStorage();
    this.UpdateSettingValuesFromStorage(settingsFromStorage)
    this.Logger.FuncEnd(this.Init_SettingsAgent.name);
  }

  WireEvents() {
    this.UiElementChangeEvent_Observer = new UiModuleManagerPassThroughEvent_Observer(this.HindeCore, this.OnUiModuleManagerPassThroughEvent);
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

  UpdateSettingValuesFromStorage(settingsFromStorage: IOneGenericSettingForStorage[]): void {
    this.Logger.FuncStart(this.UpdateSettingValuesFromStorage.name);
    try {
      for (var idx = 0; idx < settingsFromStorage.length; idx++) {
        let storageSetting: IOneGenericSettingForStorage = settingsFromStorage[idx];

        let settingWrapper: HindSiteSettingWrapper = this.HindSiteSettingsBucket.GetByKey(storageSetting.SettingKey);

        if (settingWrapper) {
          let matchingSetting: IHindSiteSetting = settingWrapper.HindSiteSetting;

          if (matchingSetting) {
            matchingSetting.ValueAsObj = storageSetting.ValueAsObj;
          } else {
            this.ErrorHand.ErrorAndContinue(this.UpdateSettingValuesFromStorage.name, 'matching setting not found ' + StaticHelpers.SettingKeyAsString(storageSetting.SettingKey));
          }
        } else {
          this.ErrorHand.ErrorAndThrow(this.UpdateSettingValuesFromStorage.name, 'null matching setting');
        }
      }
    } catch (err) {
      this.ErrorHand.ErrorAndContinue(this.UpdateSettingValuesFromStorage.name, err);
    }

    this.Logger.FuncEnd(this.UpdateSettingValuesFromStorage.name);
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

  SetByKey(settingKey: SettingKey, value: any): void {
    let foundSetting = this.HindSiteSettingsBucket.GetByKey(settingKey);
    if (foundSetting) {
      foundSetting.HindSiteSetting.ValueAsObj = value;
      this.WriteAllSettingValuesToStorage();
    } else {
      this.ErrorHand.ErrorAndThrow(this.SetByKey.name, 'setting match not found');
    }
  }

  private WriteAllSettingValuesToStorage() {
    let settingValues: IOneGenericSettingForStorage[] = [];
    for (var udx = 0; udx < this.HindSiteSettingsBucket.SettingWrappers.length; udx++) {
      let hindSiteWrapper: HindSiteSettingWrapper = this.HindSiteSettingsBucket.SettingWrappers[udx];

      if (hindSiteWrapper.HindSiteSetting.ValueAsObj !== null) {
        settingValues.push(
          {
            SettingKey: hindSiteWrapper.HindSiteSetting.SettingKey,
            ValueAsObj: hindSiteWrapper.HindSiteSetting.ValueAsObj,
            SettingKeyFriendly: StaticHelpers.SettingKeyAsString(hindSiteWrapper.HindSiteSetting.SettingKey)
          });
      }
    }
    this.RepoAgent.WriteByKey(PopConst.Const.Storage.KeyGenericSettings, JSON.stringify(settingValues));
  }
}