import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { IRepositoryAgent } from "../../Interfaces/Agents/IRepositoryAgent";
import { IOneStorageData } from "../../Interfaces/IOneStorageData";
import { _CommonBase } from "../../_CommonCoreBase";

export class RepositoryAgent extends _CommonBase implements IRepositoryAgent {

  constructor(hindeCore: ICommonCore) {
    super(hindeCore);
  }

  RemoveByKey(key: string) {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.RemoveByKey.name, err);
    }
  }

  InitRepositoryAgent() {
    this.Logger.FuncStart(RepositoryAgent.name, this.InitRepositoryAgent.name);
    this.Logger.FuncEnd(RepositoryAgent.name, this.InitRepositoryAgent.name);
  }

  public GetBulkLocalStorageByKeyPrefix(targetPrefix: string): IOneStorageData[] {
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
    }
    catch (err) {
      this.ErrorHand.ErrorAndThrow(this.GetBulkLocalStorageByKeyPrefix.name, err);
    }
    return toReturn;
  }

  ReadDataOfKey(targetKey: string): string {
    this.Logger.FuncStart(this.ReadDataOfKey.name);
    let storageValue: string = null;
    let toReturn: string = '';
    storageValue = window.localStorage.getItem(targetKey); // is synchronous
    if (storageValue != null) {
      toReturn = storageValue.toString();
    } else {
      this.Logger.Log(this.ReadDataOfKey.name, "No value returned from storage")
    }
    this.Logger.FuncEnd(this.ReadDataOfKey.name);
    return toReturn;
  }

  WriteByKey(storageKey: string, jsonString: string): void {
    window.localStorage.setItem(storageKey, jsonString);
  }
}