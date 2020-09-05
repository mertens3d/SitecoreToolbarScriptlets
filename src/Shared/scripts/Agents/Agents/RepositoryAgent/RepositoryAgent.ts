import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";
import { IOneGenericSettingForStorage } from "../../../Classes/IOneGenericSettingForStorage";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";
import { IRepositoryAgent } from "../../../Interfaces/Agents/IRepositoryAgent";
import { IOneStorageData } from "../../../Interfaces/IOneStorageData";

export class RepositoryAgent implements IRepositoryAgent {
  private Logger: ILoggerAgent;

  constructor(loggerAgent: ILoggerAgent) {
    this.Logger = loggerAgent;
  }

  InitRepositoryAgent() {
    this.Logger.FuncStart(RepositoryAgent.name, this.InitRepositoryAgent.name);
    this.Logger.FuncEnd(RepositoryAgent.name, this.InitRepositoryAgent.name);
  }

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

  ReadDataOfKey(targetKey: string): browser.storage.StorageValue {
    this.Logger.FuncStart(this.ReadDataOfKey.name);

    let toReturn: browser.storage.StorageValue = null;
    this.Logger.LogVal('target key ', targetKey);

    toReturn = window.localStorage.getItem(targetKey); // is synchronous

    if (toReturn) {
      //this.Logger.LogAsJsonPretty('toReturn', toReturn);
    } else {
      this.Logger.Log(this.ReadDataOfKey.name, "No value returned from storage")
    }
    this.Logger.FuncEnd(this.ReadDataOfKey.name);

    return toReturn;
  }

  WriteGenericSettings(settingsToWrite: IOneGenericSettingForStorage[]): void {
    this.Logger.FuncStart(this.WriteGenericSettings.name);

    window.localStorage.setItem(PopConst.Const.Storage.KeyGenericSettings, JSON.stringify(settingsToWrite));

    this.Logger.FuncEnd(this.WriteGenericSettings.name);
  }
}