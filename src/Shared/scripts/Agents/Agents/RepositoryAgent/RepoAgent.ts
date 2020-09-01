import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";
import { IOneGenericSettingForStorage } from "../../../Classes/IOneGenericSettingForStorage";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerBase";
import { IRepositoryAgent } from "../../../Interfaces/Agents/IRepositoryAgent";
import { IOneStorageData } from "../../../Interfaces/IOneStorageData";

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
    return new Promise((resolve, reject) => {
      var toReturn: IOneStorageData[] = [];

      try {
        var storageLength: number = window.localStorage.length;

        for (var idx: number = 0; idx < storageLength; idx++) {
          var candidate: IOneStorageData = {
            data: '',
            key: '',
          };

          candidate.key = window.localStorage.key(idx);

          if (candidate.key.startsWith(targetPrefix)) {
            candidate.data = window.localStorage.getItem(candidate.key);
            if (typeof candidate != 'undefined' && typeof candidate.data != 'undefined' && candidate != null && candidate.data != null) {
              toReturn.push(candidate);
            }
          }
        }

        resolve(toReturn);
      } catch (ex) {
        reject(ex);
      }
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
    return new Promise(async (resolve) => {
      this.Logger.FuncStart(this.ReadDataOfKey.name);

      let toReturn: browser.storage.StorageValue = null;
      this.Logger.LogVal('target key ', targetKey);

      //var testLocalStorage = window.localStorage.getItem(targetKey)
      //this.Logger.LogAsJsonPretty('testLocalStorage', testLocalStorage);
      toReturn = window.localStorage.getItem(targetKey);

      if (toReturn) {
        //this.Logger.LogAsJsonPretty('toReturn', toReturn);

        resolve(toReturn);
      } else {
        resolve(toReturn)
        this.Logger.Log(this.ReadDataOfKey.name, "No value returned from storage")
      }
      this.Logger.FuncEnd(this.ReadDataOfKey.name);
    });
  }

  WriteGenericSettings(settingsToWrite: IOneGenericSettingForStorage[]): void {
    this.Logger.FuncStart(this.WriteGenericSettings.name);

    window.localStorage.setItem(PopConst.Const.Storage.KeyGenericSettings, JSON.stringify(settingsToWrite));

    this.Logger.FuncEnd(this.WriteGenericSettings.name);
  }
}