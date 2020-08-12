import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerBase";
import { IOneGenericSettingForStorage } from "../../../Classes/IOneGenericSettingForStorage";
import { IRepositoryAgent } from "../../../Interfaces/Agents/IRepositoryAgent";
import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";
import { IOneStorageData } from "../../../Interfaces/IOneStorageData";
import { ContentConst } from "../../../Interfaces/InjectConst";

export class RepoAgent implements IRepositoryAgent {
  private Logger: ILoggerAgent;

  constructor(loggerAgent: ILoggerAgent) {
    this.Logger = loggerAgent;
  }

  Init() {
    this.Logger.FuncStart(RepoAgent.name, this.Init.name);
    this.Logger.FuncEnd(RepoAgent.name, this.Init.name);
  }
  //async ReadStorageResults() {
  //  this.Logger.FuncStart(this.ReadStorageResults.name);
  //  try {
  //    await browser.storage.local.get()
  //      .then((storageResults: browser.storage.StorageObject) => {
  //      }
  //  } catch (e) {
  //    this.Logger.Error(this.ReadStorageResults.name, e.toString());
  //  }
  //  this.Logger.FuncEnd(this.ReadStorageResults.name);
  //}
  public GetBulkLocalStorageByKeyPrefix(targetPrefix: string): Promise<IOneStorageData[]> {
    return new Promise((resolve) => {
      var toReturn: IOneStorageData[] = [];

      var storageLength: number = window.localStorage.length;

      for (var idx: number = 0; idx < storageLength; idx++) {
        console.log('Processing Index' + idx);

        var candidate: IOneStorageData = {
          data: '',
          key: '',
        };

        candidate.key = window.localStorage.key(idx);

        console.log('Candidate.key ' + candidate.key);

        if (candidate.key.startsWith(targetPrefix)) {
          console.log('valid candidate' + true);

          candidate.data = window.localStorage.getItem(candidate.key);
          if (typeof candidate != 'undefined' && typeof candidate.data != 'undefined' && candidate != null && candidate.data != null) {
            toReturn.push(candidate);
          }
        }
      }

      resolve(toReturn);
    });
  }

  //async GetAllLocalHindSiteStorage(targetKey: string): Promise<browser.storage.StorageValue> {
  //  return new Promise(async (resolve) => {
  //    let toReturn: browser.storage.StorageValue = null;

  //    await browser.storage.local.get()
  //      .then((storageResults: browser.storage.StorageObject) => {
  //        //console.log('storageResults: ' + JSON.stringify(storageResults));
  //        var storageKeys: string[] = Object.keys(storageResults);

  //        for (let oneKey of storageKeys) {
  //          if (oneKey === targetKey) {
  //            let storedValue: browser.storage.StorageValue = storageResults[oneKey];
  //            if (storedValue) {
  //              toReturn = storedValue.toString();
  //            }
  //          }
  //        }
  //      })
  //      .then(() => resolve(toReturn));
  //  });
  //}

  async ReadDataOfKey(targetKey: string): Promise<browser.storage.StorageValue> {
    let toReturn: browser.storage.StorageValue = null;
    console.log('target key ' + targetKey);

    await browser.storage.local.get(targetKey)
      .then((storageResults: browser.storage.StorageObject) => {
        console.log('storageResults: ' + JSON.stringify(storageResults));
        var storageKeys: string[] = Object.keys(storageResults);

        for (let oneKey of storageKeys) {
          if (oneKey === targetKey) {
            let storedValue: browser.storage.StorageValue = storageResults[oneKey];
            if (storedValue) {
              toReturn = storedValue.toString();
            }
          }
        }
      });

    return toReturn;
  }

  WriteGenericSettings(settingsToWrite: IOneGenericSettingForStorage[]): void {
    this.Logger.FuncStart(this.WriteGenericSettings.name);
    this.Logger.LogAsJsonPretty('settings', settingsToWrite);
    this.Logger.LogAsJsonPretty('key', PopConst.Const.Storage.KeyGenericSettings);

    //let storageObj: browser.storage.StorageObject = {
    //  [PopConst.Const.Storage.KeyGenericSettings]: JSON.stringify(settingsToWrite)
    //}
    //browser.storage.local.set(storageObj);

    window.localStorage.setItem(PopConst.Const.Storage.KeyGenericSettings, JSON.stringify(settingsToWrite));

    this.Logger.FuncEnd(this.WriteGenericSettings.name);
  }
}