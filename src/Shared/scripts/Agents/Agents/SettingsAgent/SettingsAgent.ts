import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { IRepositoryAgent } from "../../../Interfaces/Agents/IRepositoryAgent";
import { IGenericSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { IOneGenericSettingForStorage } from "../../../Classes/IOneGenericSettingForStorage";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerBase";
import { StaticHelpers } from "../../../Classes/StaticHelpers";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";
import { OneGenericSetting } from "./OneGenericSetting";

export class SettingsAgent implements ISettingsAgent {
  private SettingsAr: OneGenericSetting[] = [];
  private Logger: ILoggerAgent;
  private RepoAgent: IRepositoryAgent;

  constructor(logger: ILoggerAgent, repoAgent: IRepositoryAgent) {
    this.Logger = logger;
    this.RepoAgent = repoAgent;
  }

  UpdateSettings(newSettings: IGenericSetting[]) {
    this.Logger.FuncStart(this.UpdateSettings.name);
    if (newSettings) {
      for (var idx = 0; idx < newSettings.length; idx++) {
        let oneSetting: IGenericSetting = newSettings[idx];
        this.SetByKey(oneSetting.SettingKey, oneSetting.ValueAsObj);
      }
    }
    this.Logger.FuncEnd(this.UpdateSettings.name);
  }

  SetContentSettings(currentContentPrefs: IGenericSetting[]) {
    this.SettingsAr = <OneGenericSetting[]>currentContentPrefs;
  }

  InitSettingsAgent(allDefaultSettings: IGenericSetting[]): void {
    this.Logger.FuncStart(this.InitSettingsAgent.name, allDefaultSettings.length);
    this.SettingsAr = <OneGenericSetting[]>allDefaultSettings;

    let settingsFromStorage: IOneGenericSettingForStorage[] = this.ReadGenericSettingsFromStorage();
    this.UpdateSettingValuesFromStorage(settingsFromStorage)

    this.Logger.FuncEnd(this.InitSettingsAgent.name);
  }

  GetAllSettings(): IGenericSetting[] {
    return this.SettingsAr;
  }

  ReadGenericSettingsFromStorage(): IOneGenericSettingForStorage[] {
    this.Logger.FuncStart(this.ReadGenericSettingsFromStorage.name);
    let toReturn: IOneGenericSettingForStorage[] = [];

    let storedValue: browser.storage.StorageValue = this.RepoAgent.ReadDataOfKey(PopConst.Const.Storage.KeyGenericSettings);

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

  UpdateSettingValuesFromStorage(settingsFromStorage: IOneGenericSettingForStorage[]) {
    this.Logger.FuncStart(this.UpdateSettingValuesFromStorage.name);
    try {
      for (var idx = 0; idx < settingsFromStorage.length; idx++) {
        let storageSetting: IOneGenericSettingForStorage = settingsFromStorage[idx];
        let matchingSetting: IGenericSetting = this.GetByKey(storageSetting.SettingKey);
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

GetSettingsByFlavor(targetFlavors: SettingFlavor[]): IGenericSetting[] {
    let toReturn: IGenericSetting[] = [];

    for (var idx = 0; idx < this.SettingsAr.length; idx++) {
      let candidate: IGenericSetting = this.SettingsAr[idx];
      if (targetFlavors.indexOf(candidate.SettingFlavor) > -1) {
        toReturn.push(candidate);
      }
    }

    return toReturn;
  }
  GetOnlyContentPrefs(): IGenericSetting[] {
    let toReturn: IGenericSetting[] = [];

    for (var idx = 0; idx < this.SettingsAr.length; idx++) {
      let candidate: IGenericSetting = this.SettingsAr[idx];
      if (targetFlavors.indexOf(candidate.SettingFlavor) > -1) {
        toReturn.push(candidate);
      }
    }

    return toReturn;
  }

  CheckBoxSettingChanged(SettingKey: SettingKey, valueAsObj: any): void {
    //this.Logger.Log(StaticHelpers.SettingKeyAsString(SettingKey));
    //this.Logger.LogVal('valueAsObj', valueAsObj.toString());
    this.SetByKey(SettingKey, valueAsObj);
  }


  NumberSettingChanged(SettingKey: SettingKey, valueAsNumber: number): void {
    this.Logger.Log(StaticHelpers.SettingKeyAsString(SettingKey));
    this.Logger.LogVal('valueAsNumber', valueAsNumber.toString());
    this.SetByKey(SettingKey, valueAsNumber);
  }


  GetByKey(needleSettingKey: SettingKey): OneGenericSetting {
    //this.Logger.FuncStart(this.GetByKey.name, StaticHelpers.SettingKeyAsString(needleSettingKey));

    var toReturn: OneGenericSetting = null;

    for (var idx = 0; idx < this.SettingsAr.length; idx++) {
      let candidate: OneGenericSetting = this.SettingsAr[idx];
      if (candidate.SettingKey === needleSettingKey) {
        toReturn = candidate;
        break;
      }
    }

    if (!toReturn) {
      throw ('Setting not found ' + StaticHelpers.SettingKeyAsString(needleSettingKey));
    }
    //this.Logger.FuncEnd(this.GetByKey.name, toReturn.ValueAsObj);
    return toReturn;
  }

  SetByKey(settingKey: SettingKey, value: any): void {
    this.Logger.FuncStart(this.SetByKey.name, StaticHelpers.SettingKeyAsString(settingKey));
    this.Logger.LogAsJsonPretty('value', value);

    let foundSetting = this.GetByKey(settingKey);

    if (foundSetting) {
      foundSetting.ValueAsObj = value;
      //if (foundSetting.DefaultValue !== value) {
      //  foundSetting.ValueAsObj = value;
      //} else {
      //  foundSetting.ValueAsObj = null;
      //}

      this.WriteAllSettingValuesToStorage();
    } else {
      this.Logger.ErrorAndThrow(this.SetByKey.name, 'setting match not found');
    }
    this.Logger.FuncEnd(this.SetByKey.name, StaticHelpers.SettingKeyAsString(settingKey));
  }

  private WriteAllSettingValuesToStorage() {
    this.Logger.FuncStart(this.WriteAllSettingValuesToStorage.name);
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

    this.RepoAgent.WriteGenericSettings(settingValues);
    this.Logger.FuncEnd(this.WriteAllSettingValuesToStorage.name);
  }
}