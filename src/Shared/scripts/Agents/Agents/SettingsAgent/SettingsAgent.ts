import { SettingKey } from "../../../Enums/SettingKey";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { IRepositoryAgent } from "../../../Interfaces/Agents/IRepositoryAgent";
import { IOneGenericSetting } from "../../../Interfaces/Agents/IOneGenericSetting";
import { IOneGenericSettingForStorage } from "../../../Classes/IOneGenericSettingForStorage";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerBase";
import { StaticHelpers } from "../../../Classes/StaticHelpers";
import { SettingFlavor } from "../../../Enums/SettingFlavor";

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

  async Init(allDefaultSettings: IOneGenericSetting[]) {
    this.Logger.FuncStart(this.Init.name, allDefaultSettings.length);
    this.SettingsAr = allDefaultSettings;

    await this.HarvestGenericSettingsFromStorage();
    this.Logger.FuncEnd(this.Init.name);
  }
  async HarvestGenericSettingsFromStorage() {
    //take in a setting
    // if get, spit back it's value
    // if set, update the cache and write to storage

    this.Logger.FuncStart(this.HarvestGenericSettingsFromStorage.name);
    let foundSettings: IOneGenericSettingForStorage[];

    try {
      foundSettings = await this.RepoAgent.ReadGenericSettings();
    } catch (e) {
      this.Logger.ErrorAndThrow(this.HarvestGenericSettingsFromStorage.name, e.toString());
    }

    this.Logger.LogAsJsonPretty('settings from storage', foundSettings);

    if (foundSettings) {
      for (var idx = 0; idx < foundSettings.length; idx++) {
        let storageSetting: IOneGenericSettingForStorage = foundSettings[idx];
        this.Logger.LogVal('setting key', storageSetting.SettingKeyFriendly);
        let matchingSetting: IOneGenericSetting = this.GetByKey(storageSetting.SettingKey);
        if (matchingSetting) {
          matchingSetting.ValueAsObj = storageSetting.ValueAsObj;
        } else {
          this.Logger.ErrorAndThrow(this.HarvestGenericSettingsFromStorage.name, 'matching setting not found ' + StaticHelpers.SettingKeyAsString(storageSetting.SettingKey));
        }
      }
    } else {
      this.Logger.ErrorAndThrow(this.HarvestGenericSettingsFromStorage.name, 'settings not found');
    }

    this.Logger.FuncEnd(this.HarvestGenericSettingsFromStorage.name);
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
      if (candidate.SettingFlavor === SettingFlavor.ContentAndPopUp) {
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
    var toReturn: IOneGenericSetting;

    for (var idx = 0; idx < this.SettingsAr.length; idx++) {
      if (this.SettingsAr[idx].SettingKey === settingKey) {
        toReturn = this.SettingsAr[idx];
        break;
      }
    }
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

    let foundSetting = this.GetByKey(settingKey);

    if (foundSetting) {
      if (foundSetting.DefaultValue !== value) {
        foundSetting.ValueAsObj = value;
      } else {
        foundSetting.ValueAsObj = null;
      }

      let nonDefaultSettings: IOneGenericSettingForStorage[] = [];

      for (var udx = 0; udx < this.SettingsAr.length; udx++) {
        if (this.SettingsAr[udx].ValueAsObj !== null) {
          nonDefaultSettings.push(
            {
              SettingKey: this.SettingsAr[udx].SettingKey,
              ValueAsObj: this.SettingsAr[udx].ValueAsObj,
              SettingKeyFriendly: StaticHelpers.SettingKeyAsString(this.SettingsAr[udx].SettingKey)
            });
        }
      }

      this.RepoAgent.WriteGenericSettings(nonDefaultSettings);
    } else {
      this.Logger.ErrorAndThrow(this.SetByKey.name, 'setting match not found');
    }
    this.Logger.FuncEnd(this.SetByKey.name, StaticHelpers.SettingKeyAsString(settingKey));
  }
  ValueAsBool(setting: IOneGenericSetting): boolean {
    let toReturn: boolean = false;
    if (setting) {
      toReturn = <boolean>setting.ValueAsObj;
    }
    return toReturn;
  }
}