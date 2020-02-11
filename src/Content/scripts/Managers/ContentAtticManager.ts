import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { PayloadDataFromPopUp } from '../../../Shared/scripts/Classes/PayloadDataReqPopUp';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { IOneStorageData } from '../../../Shared/scripts/Interfaces/IOneStorageData';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { ISnapShotsMany } from '../../../Shared/scripts/Interfaces/ISnapShotsMany';
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';
import { ResultSuccessFail } from '../../../Shared/scripts/Classes/ResultSuccessFail';
import { CacheMode } from '../../../Shared/scripts/Enums/CacheMode';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';

export class ContentAtticManager extends ContentManagerBase {
  private CachedWindowStorage: ISnapShotsMany;

  constructor(hub: ContentHub) {
    super(hub);
    hub.debug.FuncStart(ContentAtticManager.name);

    hub.debug.FuncEnd(ContentAtticManager.name);
  }

  Init() {
  }
  //functioneventHandler(e) {
  //  console.log('this data is ' + e.detail);
  //}

  UpdateNickname(payload: PayloadDataFromPopUp) {
    this.debug().FuncStart(this.UpdateNickname.name);

    if (payload.IdOfSelect) {
      var storageMatch = this.GetFromStorageById(payload.IdOfSelect, CacheMode.OkToUseCache)
      if (storageMatch && payload.SnapShotSettings && payload.SnapShotSettings.SnapShotNewNickname) {
        storageMatch.NickName = payload.SnapShotSettings.SnapShotNewNickname;
        this.WriteToStorage(storageMatch);
      }
    }

    this.debug().FuncEnd(this.UpdateNickname);
  }

  MarkFavorite(data: PayloadDataFromPopUp) {
    return new Promise(async (resolve, reject) => {
      this.debug().FuncStart(this.MarkFavorite.name);
      var result: ResultSuccessFail = new ResultSuccessFail();

      if (data.IdOfSelect) {
        var storageMatch = this.GetFromStorageById(data.IdOfSelect, CacheMode.OkToUseCache)
        if (storageMatch) {
          storageMatch.Flavor = SnapShotFlavor.Favorite;
          await this.WriteToStorage(storageMatch);
          result.Succeeded = true;
        } else {
          result.Succeeded = false;
          result.FailMessage = 'No storage match found';
        }
      } else {
        result.Succeeded = false;
        result.FailMessage = 'no id provided'
      }

      this.debug().FuncEnd(this.MarkFavorite.name);

      if (result) {
        resolve();
      } else {
        reject(result.FailMessage);
      }
    })
  }
  async WriteToStorage(dataOneWindow: IDataOneWindowStorage) {
    return new Promise(async (resolve, reject) => {
      this.debug().FuncStart(this.WriteToStorage.name);
      var result: ResultSuccessFail = new ResultSuccessFail();

      var snapShotAsString = JSON.stringify(dataOneWindow);
      //this.debug().LogVal('snapShotAsString', snapShotAsString);

      await window.localStorage.setItem(this.Const().Storage.WindowRoot + this.Const().Storage.SnapShotPrefix + dataOneWindow.Id.AsString, snapShotAsString)

      var foundInStorage = await this.GetFromStorageById(dataOneWindow.Id, CacheMode.DoNotUseCach);

      if (foundInStorage) {
        result.Succeeded = true;
      } else {
        result.Succeeded = false;
        result.FailMessage = 'Snap shot not successfully saved';
      }

      this.debug().FuncEnd(this.WriteToStorage.name);

      if (result.Succeeded) {
        resolve();
      } else {
        reject(result.FailMessage);
      }
    });
  }

  GetFromStorageById(needleId: IGuid, cacheMode: CacheMode): IDataOneWindowStorage {
    this.debug().FuncStart(this.GetFromStorageById.name, needleId.AsString);
    var foundStorage: ISnapShotsMany = this.GetAllSnapShotsMany(cacheMode);
    var DateOneWinStoreMatch: IDataOneWindowStorage = null;

    if (foundStorage) {
      for (var idx = 0; idx < foundStorage.CurrentSnapShots.length; idx++) {
        var candidate = foundStorage.CurrentSnapShots[idx];
        if (candidate.Id.AsString === needleId.AsString) {
          DateOneWinStoreMatch = candidate;
          break;
        }
      }
    }
    if (DateOneWinStoreMatch) {
      this.debug().Log('found match', this.Utilites().TimeNicknameFavStr(DateOneWinStoreMatch));
    } else {
      this.debug().LogVal(this.GetFromStorageById.name, 'Match notfound')
    }

    this.debug().FuncEnd(this.GetFromStorageById.name);
    return DateOneWinStoreMatch;
  }

  private __getAllLocalStorageAsIOneStorageData(): IOneStorageData[] {
    this.debug().FuncStart(this.__getAllLocalStorageAsIOneStorageData.name);
    var toReturn: IOneStorageData[] = [];

    var storageLength: number = window.localStorage.length;
    this.debug().LogVal('storageLength', storageLength);

    for (var idx: number = 0; idx < storageLength; idx++) {
      this.debug().LogVal('Processing Index', idx);

      var candidate: IOneStorageData = {
        data: '',
        key: '',
      };

      candidate.key = window.localStorage.key(idx);

      this.debug().LogVal('Candidate.key', candidate.key);

      if (candidate.key.startsWith(this.Const().Storage.WindowRoot + this.Const().Storage.SnapShotPrefix)) {
        this.debug().LogVal('valid candidate', true);

        candidate.data = window.localStorage.getItem(candidate.key);
        if (this.debug().IsNotNullOrUndefinedBool('candidate.data', candidate.data)) {
          toReturn.push(candidate);
        }
      }
    }

    this.debug().FuncEnd(this.__getAllLocalStorageAsIOneStorageData.name, toReturn.length);
    return toReturn;
  }

  private __parseRawData(oneRaw: IOneStorageData) {
    var candidate: IDataOneWindowStorage = <IDataOneWindowStorage>JSON.parse(oneRaw.data);
    console.log

    if (candidate) {
      candidate.TimeStamp = new Date(candidate.TimeStamp);
      candidate.Id = this.ContentHub.Helpers.GuidHelp.ParseGuid(candidate.Id.AsString);
      candidate.RawData = oneRaw;

      if (!candidate.WindowType) {
        candidate.WindowType = scWindowType.Unknown;
        candidate.WindowFriendly = scWindowType[candidate.WindowType];
      }

      if (!candidate.NickName) {
        candidate.NickName = '';
      }
    } else {
      this.debug().Error(this.__parseRawData.name, 'Saved data did not import correctly')
    }
    return candidate
  }

  private __getAllStorageReal() {
    this.debug().FuncStart(this.__getAllStorageReal.name);
    var toReturn: IDataOneWindowStorage[] = [];

    var rawStorageData: IOneStorageData[] = this.__getAllLocalStorageAsIOneStorageData();

    if (rawStorageData) {
      for (var idx = 0; idx < rawStorageData.length; idx++) {
        toReturn.push(this.__parseRawData(rawStorageData[idx]));
      }
    }

    toReturn.sort((a: IDataOneWindowStorage, b: IDataOneWindowStorage) =>
      +b.TimeStamp - +a.TimeStamp
    );

    toReturn = this.FilterOutOldData(toReturn);

    this.debug().FuncEnd(this.__getAllStorageReal.name);
    return toReturn;
  }

  CleanOutOldData(): void {
    this.debug().FuncStart(this.CleanOutOldData.name);

    var cleanData: IDataOneWindowStorage[] = [];
    var now: Date = new Date();
    var maxAutoSaveDiff: number = this.Const().MaxAutoSaveAgeDays * 24 * 60 * 60 * 1000;

    if (this.CachedWindowStorage) {
      var cacheLength = this.CachedWindowStorage.CurrentSnapShots.length;
      var autoCount: number = 0;
      for (var idx = 0; idx < cacheLength; idx++) {
        var deleteFlag: boolean = false;
        var candidate = this.CachedWindowStorage.CurrentSnapShots[idx];

        if (candidate.Flavor) {
          if (autoCount > this.Const().MaxAutoToSaveCount) {
            this.debug().LogVal('Delete (max count :' + this.Const().MaxAutoToSaveCount + ')', candidate.TimeStamp.toString());
            deleteFlag = true;
          }
          autoCount++;
        }

        if (now.getTime() - candidate.TimeStamp.getTime() > maxAutoSaveDiff) {
          this.debug().LogVal('Delete (Old : max' + this.Const().MaxAutoSaveAgeDays + ' days)', candidate.TimeStamp.toString());
          deleteFlag = true;
        }

        if (!deleteFlag) {
          cleanData.push(candidate);
        } else {
          try {
            this.debug().LogVal('Cleaning old autosave', candidate.RawData.key);
            window.localStorage.removeItem(candidate.RawData.key);
          } catch (e) {
            this.debug().Error(this.CleanOutOldData.name, 'unable to delete key: ' + candidate.RawData.key)
          }
        }
      }
      this.CachedWindowStorage.CurrentSnapShots = cleanData;
    }

    this.debug().FuncEnd(this.CleanOutOldData.name);
  }

  GetAllSnapShotsMany(cacheMode: CacheMode): ISnapShotsMany {
    this.debug().FuncStart(this.GetAllSnapShotsMany.name, StaticHelpers.CacheModeAsString(cacheMode));
    var toReturn: ISnapShotsMany;

    if (cacheMode === CacheMode.DoNotUseCach) {
      this.CachedWindowStorage = null;
    }

    if (!this.CachedWindowStorage) {
      this.CachedWindowStorage = {
        CurrentSnapShots: [],
        Birthday: new Date(1970),
        FavoriteCount: 0,
        SnapShotsAutoCount: 0,
        PlainCount: 0,
      }
    }

    var timeDiff: number = Date.now() - this.CachedWindowStorage.Birthday.getTime();

    this.debug().LogVal('cached timeDiff', timeDiff + ' : ' + this.Const().MaxCacheAgeMs);
    if (timeDiff > (this.Const().MaxCacheAgeMs)) {
      this.debug().Log('updating cache');

      this.CachedWindowStorage.CurrentSnapShots = this.__getAllStorageReal();
      this.CachedWindowStorage.Birthday = new Date();
    } else {
      this.debug().Log('using cache');
    }

    this.CleanOutOldData();
    this.UpdateCounts();

    toReturn = this.CachedWindowStorage;
    this.debug().FuncEnd(this.GetAllSnapShotsMany.name);

    return toReturn;
  }

  UpdateCounts() {
    this.CachedWindowStorage.FavoriteCount = 0;
    this.CachedWindowStorage.SnapShotsAutoCount = 0;
    this.CachedWindowStorage.PlainCount = 0;

    for (var idx = 0; idx < this.CachedWindowStorage.CurrentSnapShots.length; idx++) {
      var candidate = this.CachedWindowStorage.CurrentSnapShots[idx];
      if (candidate.Flavor == SnapShotFlavor.Autosave) {
        this.CachedWindowStorage.SnapShotsAutoCount++;
      } else if (candidate.Flavor == SnapShotFlavor.Favorite) {
        this.CachedWindowStorage.FavoriteCount++;
      } else {
        this.CachedWindowStorage.PlainCount++;
      }
    }
  }

  FilterOutOldData(data: IDataOneWindowStorage[]): IDataOneWindowStorage[] {
    var toReturn: IDataOneWindowStorage[] = data;

    return toReturn;
  }

  RemoveOneFromStorage(targetId: IGuid) {
    return new Promise(async (resolve, reject) => {
      this.debug().FuncStart(this.RemoveOneFromStorage.name);
      var successful: boolean = true;
      var failMsg: string = '';
      try {
        if (targetId) {
          var storageMatch: IDataOneWindowStorage = await this.GetFromStorageById(targetId, CacheMode.OkToUseCache)
          if (storageMatch) {
            var result: boolean = confirm('Remove ?: ' + this.ContentHub.Utilities.TimeNicknameFavStrForConfirmation(storageMatch));
            if (result === true) {
              this.debug().LogVal('Key to Delete', storageMatch.RawData.key);
              await window.localStorage.removeItem(storageMatch.RawData.key);

              var stillExists: IDataOneWindowStorage = await this.GetFromStorageById(targetId, CacheMode.DoNotUseCach);

              if (stillExists) {
                successful = false;
                failMsg = 'Snapshot still exists after deleting';
              } else {
                successful = true;
              }

              this.debug().Log('Attempting completed');
            } else {
              successful = false;
              failMsg = 'Confirmation not received';
            }
          } else {
            successful = false;
            failMsg = 'no storage match';
          }
        } else {
          successful = false;
          failMsg = 'no target id';
        }
      } catch (e) {
        successful = false;
        failMsg = e.toString();
      }

      this.debug().FuncEnd(this.RemoveOneFromStorage.name);

      if (successful) {
        this.debug().Log('resolving');
        resolve();
      } else {
        this.debug().Log('rejecting');
        reject(failMsg);
      }
    })
  }
}