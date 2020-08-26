import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { IRepositoryAgent } from "../../../Interfaces/Agents/IRepositoryAgent";
import { IOneGenericSetting } from "../../../Interfaces/Agents/IOneGenericSetting";
import { IOneGenericSettingForStorage } from "../../../Classes/IOneGenericSettingForStorage";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerBase";
import { StaticHelpers } from "../../../Classes/StaticHelpers";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";

export class SettingsAgent implements ISettingsAgent {
  SettingsAr: IOneGenericSetting[] = [];
  private Logger: ILoggerAgent;
  private RepoAgent: IRepositoryAgent;

  constructor(logger: ILoggerAgent, repoAgent: IRepositoryAgent) {
    this.Logger = logger;
    this.RepoAgent = repoAgent;
  }

  SetContentSettings(currentContentPrefs: IOneGenericSetting[]) {
    this.SettingsAr = currentContentPrefs;
  }

  async InitSettingsAgent(allDefaultSettings: IOneGenericSetting[]): Promise<void> {
    return new Promise(async (resolve) => {
      this.Logger.FuncStart(this.InitSettingsAgent.name, allDefaultSettings.length);
      this.SettingsAr = allDefaultSettings;

      await this.HarvestGenericSettingsFromStorage()
        .then(() => resolve());

      this.Logger.FuncEnd(this.InitSettingsAgent.name);
    });
  }
  async ReadGenericSettings(): Promise<IOneGenericSettingForStorage[]> {
    return new Promise(async (resolve) => {
      this.Logger.FuncStart(this.ReadGenericSettings.name);
      let toReturn: IOneGenericSettingForStorage[] = [];

      await this.RepoAgent.ReadDataOfKey(PopConst.Const.Storage.KeyGenericSettings)
        .then((storedValue: any) => {
          if (storedValue) {
            this.Logger.Log('storedValue NOT null');
            toReturn = <IOneGenericSettingForStorage[]>JSON.parse(storedValue.toString());
          } else {
            this.Logger.Log('storedValue YES null');
            toReturn = null;
          }
        })
        .then(() => resolve(toReturn));

      //await browser.storage.local.get()
      //  .then((storageResults: browser.storage.StorageObject) => {
      //    console.log('storageResults: ' + storageResults);
      //    var storageKeys: string[] = Object.keys(storageResults);

      //    for (let oneKey of storageKeys) {
      //      if (oneKey === PopConst.Const.Storage.KeyGenericSettings) {
      //        let storedValue: browser.storage.StorageValue = storageResults[oneKey];
      //        if (storedValue) {
      //          toReturn = <IOneGenericSettingForStorage[]>JSON.parse(storedValue.toString());
      //        }
      //      }
      //    }
      //  });

      this.Logger.FuncEnd(this.ReadGenericSettings.name);
    });
  }

  UpdateSettingValuesFromStorage(foundSettings: IOneGenericSettingForStorage[]) {
    this.Logger.FuncStart(this.UpdateSettingValuesFromStorage.name);
    for (var idx = 0; idx < foundSettings.length; idx++) {
      let storageSetting: IOneGenericSettingForStorage = foundSettings[idx];
      let matchingSetting: IOneGenericSetting = this.GetByKey(storageSetting.SettingKey);
      if (matchingSetting) {
        matchingSetting.ValueAsObj = storageSetting.ValueAsObj;
      } else {
        this.Logger.ErrorAndContinue(this.UpdateSettingValuesFromStorage.name, 'matching setting not found ' + StaticHelpers.SettingKeyAsString(storageSetting.SettingKey));
      }
    }
    this.Logger.FuncEnd(this.UpdateSettingValuesFromStorage.name);
  }

  async HarvestGenericSettingsFromStorage(): Promise<void> {
    return new Promise(async (resolve) => {
      //take in a setting
      // if get, spit back it's value
      // if set, update the cache and write to storage

      this.Logger.FuncStart(this.HarvestGenericSettingsFromStorage.name);
      let foundSettings: IOneGenericSettingForStorage[];

      await this.ReadGenericSettings()
        .then((result) => {
          //this.Logger.LogAsJsonPretty('result values from storage', result);
          foundSettings = result
        })
        //.then(() => this.Logger.LogAsJsonPretty('settings from storage', foundSettings))
        .then(() => {
          if (foundSettings) {
            this.UpdateSettingValuesFromStorage(foundSettings);
          }
        })
        .then(() => resolve());

      this.Logger.FuncEnd(this.HarvestGenericSettingsFromStorage.name);
    });
  }

  ValueAsInteger(setting: IOneGenericSetting): number {
    let toReturn: number = 0;
    if (setting) {
      toReturn = <number>setting.ValueAsObj;
    }
    return toReturn;
  }

  GetOnlyContentPrefs(): IOneGenericSetting[] {
    let toReturn: IOneGenericSetting[] = [];

    for (var idx = 0; idx < this.SettingsAr.length; idx++) {
      let candidate: IOneGenericSetting = this.SettingsAr[idx];
      if ((candidate.SettingFlavor === SettingFlavor.ContentAndPopUpStoredInPopUp)
        ||
        (candidate.SettingFlavor === SettingFlavor.ContentOnly)) {
        toReturn.push(candidate);
      }
    }

    return toReturn;
  }
  SettingChanged(SettingKey: SettingKey, valueAsObj: any): void {
    //this.SetByKey(SettingKey, target.)
    this.Logger.Log(StaticHelpers.SettingKeyAsString(SettingKey));
    this.Logger.LogVal('valueAsObj', valueAsObj.toString());
    this.SetByKey(SettingKey, valueAsObj);
  }

  GetByKey(settingKey: SettingKey): IOneGenericSetting {
    //this.Logger.FuncStart(this.GetByKey.name, StaticHelpers.SettingKeyAsString(settingKey));

    var toReturn: IOneGenericSetting = null;

    for (var idx = 0; idx < this.SettingsAr.length; idx++) {
      if (this.SettingsAr[idx].SettingKey === settingKey) {
        toReturn = this.SettingsAr[idx];
        //this.Logger.LogAsJsonPretty('found. ValueAsObj', toReturn.ValueAsObj);
        break;
      }
    }

    if (!toReturn) {
      this.Logger.Log('Setting not found ' + StaticHelpers.SettingKeyAsString(settingKey));
    }
    //this.Logger.FuncEnd(this.GetByKey.name);
    return toReturn;
  }
  //GetByKey(settingKey: SettingKey): IOneGenericSetting {
  //  this.Logger.Log(StaticHelpers.SettingKeyAsString(settingKey));

  //  let foundSetting = this.AllAgents.SettingsAgent.GetByKey(settingKey);
  //  if (foundSetting) {
  //    console.log(foundSetting.Friendly);
  //  } else {
  //    this.Logger.Error(this.GetByKey.name, StaticHelpers.SettingKeyAsString(settingKey));
  //  }
  //  return foundSetting;
  //}

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

  ValueAsBool(setting: IOneGenericSetting): boolean {
    let toReturn: boolean = false;
    if (setting) {
      toReturn = <boolean>setting.ValueAsObj;
    }
    return toReturn;
  }
}