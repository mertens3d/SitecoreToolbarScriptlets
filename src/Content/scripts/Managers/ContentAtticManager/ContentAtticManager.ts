import { RepoAgent } from "../../../../Shared/scripts/Agents/Agents/RepositoryAgent/RepoAgent";
import { PayloadDataFromPopUp } from "../../../../Shared/scripts/Classes/PayloadDataReqPopUp";
import { PromiseResult } from "../../../../Shared/scripts/Classes/PromiseResult";
import { scWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { SnapShotFlavor } from "../../../../Shared/scripts/Enums/SnapShotFlavor";
import { IAllAgents } from "../../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { ISnapShotsMany } from "../../../../Shared/scripts/Interfaces/IContentState/ISnapShotsMany";
import { IDataOneWindowStorage } from "../../../../Shared/scripts/Interfaces/IDataOneWindowStorage";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IOneStorageData } from "../../../../Shared/scripts/Interfaces/IOneStorageData";
import { ContentManagerBase } from "../../_first/_ContentManagerBase";
import { ContentHub } from "../ContentHub/ContentHub";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";

export class ContentAtticManager extends ContentManagerBase {
  //private CachedWindowStorage: ISnapShotsMany;
  private Repo: RepoAgent;
  private SettingAutoSnapshotRetainDays: number;

  constructor(hub: ContentHub, AllAgents: IAllAgents, repo: RepoAgent) {
    super(hub, AllAgents);
    this.AllAgents.Logger.FuncStart(ContentAtticManager.name);

    this.Repo = repo;

    //this.AllAgents.Logger.IsNotNullOrUndefinedBool("AllAgents.HelperAgent", this.AllAgents.HelperAgent);

    this.AllAgents.Logger.FuncEnd(ContentAtticManager.name);
  }

  InitContentAtticManager(settingAutoSnapshotRetainDays: number) {
    this.SettingAutoSnapshotRetainDays = settingAutoSnapshotRetainDays;

    this.CleanOutOldAutoSavedData();
  }
  //functioneventHandler(e) {
  //  console.log('this data is ' + e.detail);
  //}

  UpdateNickname(payload: PayloadDataFromPopUp) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.UpdateNickname.name);
      var promResult: PromiseResult = new PromiseResult(this.UpdateNickname.name, this.AllAgents.Logger);

      if (payload.IdOfSelect) {
        var storageMatch;

        await this.GetFromStorageById(payload.IdOfSelect)
          .then((result) => storageMatch = result);

        if (storageMatch && payload.SnapShotSettings && payload.SnapShotSettings.SnapShotNewNickname) {
          storageMatch.NickName = payload.SnapShotSettings.SnapShotNewNickname;
          this.WriteToStorage(storageMatch);
          promResult.MarkSuccessful();
        } else {
          promResult.MarkFailed('something was missing');
        }
      } else {
        promResult.MarkFailed('no payload or id');
        this.AllAgents.Logger.LogAsJsonPretty(this.UpdateNickname.name, payload);
      }

      this.AllAgents.Logger.FuncEnd(this.UpdateNickname);
      if (promResult.WasSuccessful()) {
        resolve();
      } else {
        reject(promResult.RejectReasons);
      }
    });
  }

  async WriteToStorage(dataOneWindow: IDataOneWindowStorage) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.WriteToStorage.name);
      var result: PromiseResult = new PromiseResult(this.WriteToStorage.name, this.AllAgents.Logger);

      var snapShotAsString = JSON.stringify(dataOneWindow);
      //this.debug().LogVal('snapShotAsString', snapShotAsString);

      await window.localStorage.setItem(ContentConst.Const.Storage.WindowRoot + ContentConst.Const.Storage.SnapShotPrefix + dataOneWindow.Id.ToString(), snapShotAsString)

      var foundInStorage = await this.GetFromStorageById(dataOneWindow.Id);

      if (foundInStorage) {
        result.MarkSuccessful();
      } else {
        result.MarkFailed('not found in storage');
        result.MarkFailed('Snap shot not successfully saved');
      }

      this.AllAgents.Logger.FuncEnd(this.WriteToStorage.name);

      if (result.WasSuccessful()) {
        resolve();
      } else {
        reject(result.RejectReasons);
      }
    });
  }

  async GetFromStorageById(needleId: Guid): Promise<IDataOneWindowStorage> {
    return new Promise(async (resolve) => {
      this.AllAgents.Logger.FuncStart(this.GetFromStorageById.name, needleId.ToString());

      var foundStorage: ISnapShotsMany;
      await this.GetAllSnapShotsMany()
        .then((result) => foundStorage = result);

      var DateOneWinStoreMatch: IDataOneWindowStorage = null;

      if (foundStorage) {
        for (var idx = 0; idx < foundStorage.CurrentSnapShots.length; idx++) {
          var candidate = foundStorage.CurrentSnapShots[idx];
          if (candidate.Id.ToString() === needleId.ToString()) {
            DateOneWinStoreMatch = candidate;
            break;
          }
        }
      }
      if (DateOneWinStoreMatch) {
        this.AllAgents.Logger.Log('found match');
      } else {
        this.AllAgents.Logger.LogVal(this.GetFromStorageById.name, 'Match not found')
      }

      this.AllAgents.Logger.FuncEnd(this.GetFromStorageById.name);
      resolve(DateOneWinStoreMatch);
    });
  }

  private __parseRawData(oneRaw: IOneStorageData) {
    var candidate: IDataOneWindowStorage = <IDataOneWindowStorage>JSON.parse(oneRaw.data);
    console.log

    if (candidate) {
      candidate.TimeStamp = new Date(candidate.TimeStamp);
      candidate.Id = Guid.ParseGuid(candidate.Id.ToString(), true);
      candidate.RawData = oneRaw;

      if (!candidate.WindowType) {
        candidate.WindowType = scWindowType.Unknown;
        candidate.WindowFriendly = scWindowType[candidate.WindowType];
      }

      if (!candidate.NickName) {
        candidate.NickName = '';
      }
    } else {
      this.AllAgents.Logger.ErrorAndThrow(this.__parseRawData.name, 'Saved data did not import correctly')
    }
    return candidate
  }
  private GetAllLocalStorageAsIOneStorageData(): Promise<IOneStorageData[]> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.GetAllLocalStorageAsIOneStorageData.name);
      let prefix = ContentConst.Const.Storage.WindowRoot + ContentConst.Const.Storage.SnapShotPrefix;

      await this.Repo.GetBulkLocalStorageByKeyPrefix(prefix)
        .then((result) => resolve(result))
        .catch((err) => reject(err));

      this.AllAgents.Logger.FuncEnd(this.GetAllLocalStorageAsIOneStorageData.name);
    });
  }
  private async __getAllStorageReal(): Promise<IDataOneWindowStorage[]> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.__getAllStorageReal.name);
      var toReturn: IDataOneWindowStorage[] = [];

      var rawStorageData: IOneStorageData[];
      await this.GetAllLocalStorageAsIOneStorageData()
        .then((result) => rawStorageData = result)
        .then(() => {
          if (rawStorageData) {
            for (var idx = 0; idx < rawStorageData.length; idx++) {
              toReturn.push(this.__parseRawData(rawStorageData[idx]));
            }
          }
        })
        .then(() => {
          toReturn.sort((a: IDataOneWindowStorage, b: IDataOneWindowStorage) =>
            +b.TimeStamp - +a.TimeStamp
          );
        })
        .then(() => {
          toReturn = this.FilterOutOldData(toReturn);
          resolve(toReturn)
        })
        .catch((err) => reject(err));

      this.AllAgents.Logger.FuncEnd(this.__getAllStorageReal.name);
    })
  }

  async CleanOutOldAutoSavedData(): Promise<void> {
    this.AllAgents.Logger.FuncStart(this.CleanOutOldAutoSavedData.name);

    var cleanData: IDataOneWindowStorage[] = [];
    var now: Date = new Date();

    if (!this.SettingAutoSnapshotRetainDays || this.SettingAutoSnapshotRetainDays < 1) {
      this.SettingAutoSnapshotRetainDays = ContentConst.Const.DefaultMaxAutoSaveAgeDays;
    }
    var maxAutoSaveDiff: number = this.SettingAutoSnapshotRetainDays * 24 * 60 * 60 * 1000;
    let currentWindowStorage: ISnapShotsMany = await this.GetAllSnapShotsMany();

    if (currentWindowStorage) {
      var cacheLength = currentWindowStorage.CurrentSnapShots.length;
      var autoCount: number = 0;
      for (var idx = 0; idx < cacheLength; idx++) {
        var deleteFlag: boolean = false;
        var candidate = currentWindowStorage.CurrentSnapShots[idx];

        if (candidate.Flavor) {
          if (autoCount > ContentConst.Const.MaxAutoToSaveCount) {
            this.AllAgents.Logger.LogVal('Delete (max count :' + ContentConst.Const.MaxAutoToSaveCount + ')', candidate.TimeStamp.toString());
            deleteFlag = true;
          }
          autoCount++;
        }

        if (now.getTime() - candidate.TimeStamp.getTime() > maxAutoSaveDiff) {
          this.AllAgents.Logger.LogVal('Delete (Old : max' + ContentConst.Const.DefaultMaxAutoSaveAgeDays + ' days)', candidate.TimeStamp.toString());
          deleteFlag = true;
        }

        if (!deleteFlag) {
          cleanData.push(candidate);
        } else {
          try {
            this.AllAgents.Logger.LogVal('Cleaning old autosave', candidate.RawData.key);
            window.localStorage.removeItem(candidate.RawData.key);
          } catch (e) {
            this.AllAgents.Logger.ErrorAndThrow(this.CleanOutOldAutoSavedData.name, 'unable to delete key: ' + candidate.RawData.key)
          }
        }
      }
    }

    this.AllAgents.Logger.FuncEnd(this.CleanOutOldAutoSavedData.name);
  }

  GetAllSnapShotsMany(): Promise<ISnapShotsMany> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.GetAllSnapShotsMany.name);

      //if (cacheMode === CacheMode.DoNotUseCache) {
      //  this.CachedWindowStorage = null;
      //}

      let snapShotsMany: ISnapShotsMany = {
        CurrentSnapShots: [],
        Birthday: new Date(1970),
        FavoriteCount: 0,
        SnapShotsAutoCount: 0,
        PlainCount: 0,
      }

      await this.__getAllStorageReal()
        .then((result: IDataOneWindowStorage[]) => {
          snapShotsMany.CurrentSnapShots = result;
          snapShotsMany.Birthday = new Date();
          this.UpdateCounts(snapShotsMany);

          resolve(snapShotsMany);
        })
        .catch((err) => reject(err));

      this.AllAgents.Logger.FuncEnd(this.GetAllSnapShotsMany.name);
    });
  }
  UpdateCounts(storageAllSnapshots: ISnapShotsMany) {
    storageAllSnapshots.FavoriteCount = 0;
    storageAllSnapshots.SnapShotsAutoCount = 0;
    storageAllSnapshots.PlainCount = 0;

    for (var idx = 0; idx < storageAllSnapshots.CurrentSnapShots.length; idx++) {
      var candidate = storageAllSnapshots.CurrentSnapShots[idx];
      if (candidate.Flavor === SnapShotFlavor.Autosave) {
        storageAllSnapshots.SnapShotsAutoCount++;
      } else if (candidate.Flavor === SnapShotFlavor.Favorite) {
        storageAllSnapshots.FavoriteCount++;
      } else {
        storageAllSnapshots.PlainCount++;
      }
    }
  }

  FilterOutOldData(data: IDataOneWindowStorage[]): IDataOneWindowStorage[] {
    var toReturn: IDataOneWindowStorage[] = data;

    return toReturn;
  }

  TimeNicknameFavStrForConfirmation(data: IDataOneWindowStorage): string {
    var result = data.TimeStampFriendly + ' ' + data.NickName + ' ' + data.Id.AsShort;
    result = result.replace(new RegExp(/&nbsp;/ig), '');
    return result;
  }

  ConfirmRemoveAndCheck(storageMatch: IDataOneWindowStorage): Promise<void> {
    return new Promise(async (resolve, reject) => {
      //var result: boolean = confirm('Remove ?: ' + this.TimeNicknameFavStrForConfirmation(storageMatch));
      //if (result === true) {
      this.AllAgents.Logger.LogVal('Key to Delete', storageMatch.RawData.key);

      let targetId = storageMatch.Id;

      await window.localStorage.removeItem(storageMatch.RawData.key);

      await this.GetFromStorageById(targetId)
        .then((result) => {
          if (!result) {
            resolve();
          } else {
            reject('Snapshot still exists after deleting');
          }
        })
      //} else {
      //  reject('Confirmation not received');
      //}
    })
  }

  RemoveOneFromStorage(targetId: Guid) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.RemoveOneFromStorage.name);
      try {
        if (targetId) {
          var storageMatch: IDataOneWindowStorage = await this.GetFromStorageById(targetId)
          if (storageMatch) {
            await this.ConfirmRemoveAndCheck(storageMatch)
              .then(() => resolve())
              .catch((err) => reject(err));
          } else {
            reject('no storage match');
          }
        } else {
          reject('no target id');
        }
      } catch (e) {
        reject(e);
      }

      this.AllAgents.Logger.FuncEnd(this.RemoveOneFromStorage.name);
    })
  }
}