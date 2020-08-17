import { SettingKey } from "../../Enums/SettingKey";
import { ISettingsAgent } from "../../Interfaces/Agents/ISettingsAgent";
import { IOneGenericSetting } from "../../Interfaces/Agents/IOneGenericSetting";

export class RollingLogIdDrone {
  private SettingsAgent: ISettingsAgent;
  private maxKey: number = 5;
  private minKey: number = 1;
  constructor(settingsAgent: ISettingsAgent) {
    this.SettingsAgent = settingsAgent;
  }

  //async Init() {
  //  await this.GetNextLogId()
  //    .then((result) => this.CurrentStorageLogKey = result);
  //}

  //CurrentStorageLogKey: string = null;

  GetNextLogId(): string {
    let nextKeyInt: number = this.minKey;
    let nextKeyToReturn: string;

    //if (!this.CurrentStorageLogKey) {
    //console.log("building new prefix");

    var result: number = this.GetLastUsedLogId().ValueAsInt();

     nextKeyInt = result + 1;
     if (nextKeyInt > this.maxKey) {
       nextKeyInt = this.minKey;
    }

     this.SettingsAgent.SetByKey(SettingKey.LastUsedLogToStorageKey, nextKeyInt.toString())

    ////this.CurrentStorageLogKey = PopConst.Const.Storage.StorageLogKeyPrefix + nextKey;
    //console.log("Using " + this.CurrentStorageLogKey);
    //let storageObj: browser.storage.StorageObject = {
    //  [PopConst.Const.Storage.StorageLastKeyKey]: nextKey
    //}
    //browser.storage.local.set(storageObj);
    //  .catch ((err) => { throw "WriteLogToStorage " + err });

    //resolve(nextKey);
    //}

    nextKeyToReturn = nextKeyInt.toString();

    return nextKeyToReturn;
    //.catch((err) => { throw this.GetLogId.name + ' ' + err });
  }

  private GetLastUsedLogId(): IOneGenericSetting {
    //return new Promise(async (resolve) => {
    let toReturn: number = 0;
    console.log("getting last");

    //browser.storage.local.get()
    //  .then((storageResults: browser.storage.StorageObject) => {
    console.log('Using Key : ' + SettingKey.LastUsedLogToStorageKey);
    var lastUsedLogIdSetting: IOneGenericSetting = this.SettingsAgent.GetByKey(SettingKey.LastUsedLogToStorageKey);

    console.log('storage results (value): ' + lastUsedLogIdSetting.ValueAsInt());

    console.log(JSON.stringify(lastUsedLogIdSetting));

    //let storedValue: browser.storage.StorageValue = storageResults[PopConst.Const.Storage.StorageLastKeyKey];
    //if (lastUsedLogIdSetting) {
    //  toReturn = parseInt(lastUsedLogIdSetting.toString());
    //  }

    //  .then(() => resolve(toReturn))
    //    .catch((err) => { throw 'GetLastUsedLogId ' + err });
    //});

    return lastUsedLogIdSetting;
  }
}