import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { PayloadDataFromPopUp } from '../../../Shared/scripts/Classes/PayloadDataReqPopUp';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { IOneStorageData } from '../../../Shared/scripts/Interfaces/IOneStorageData';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { ISnapShotsMany } from '../../../Shared/scripts/Interfaces/ISnapShotsMany';
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';
import { PromiseResult } from "../../../Shared/scripts/Classes/PromiseResult";
import { CacheMode } from '../../../Shared/scripts/Enums/CacheMode';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { IContentLoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentLogger";

export class ContentAtticManager extends ContentManagerBase{ 
  private CachedWindowStorage: ISnapShotsMany;
  private _logger: IContentLoggerAgent;

  constructor(hub: ContentHub ,  logger: IContentLoggerAgent) {
    super(hub, logger);
    this._logger = logger;
    this._logger.FuncStart(ContentAtticManager.name);

    this._logger.FuncEnd(ContentAtticManager.name);
  }

  Init() {
  }
  //functioneventHandler(e) {
  //  console.log('this data is ' + e.detail);
  //}

  UpdateNickname(payload: PayloadDataFromPopUp) {
    return new Promise((resolve, reject) => {
      this._logger.FuncStart(this.UpdateNickname.name);
      var promResult: PromiseResult = new PromiseResult(this.UpdateNickname.name, this._logger);

      if (payload.IdOfSelect) {
        var storageMatch = this.GetFromStorageById(payload.IdOfSelect, CacheMode.OkToUseCache)
        if (storageMatch && payload.SnapShotSettings && payload.SnapShotSettings.SnapShotNewNickname) {
          storageMatch.NickName = payload.SnapShotSettings.SnapShotNewNickname;
          this.WriteToStorage(storageMatch);
          promResult.MarkSuccessful();
        } else {
          promResult.MarkFailed('something was missing');
        }
      } else {
        promResult.MarkFailed('no payload or id');
        this._logger.LogAsJsonPretty(this.UpdateNickname.name, payload);
      }

      this._logger.FuncEnd(this.UpdateNickname);
      if (promResult.WasSuccessful()) {
        resolve();
      } else {
        reject(promResult.RejectReasons);
      }
    });
  }

  MarkFavorite(data: PayloadDataFromPopUp) {
    return new Promise(async (resolve, reject) => {
      this._logger.FuncStart(this.MarkFavorite.name);
      var result: PromiseResult = new PromiseResult(this.MarkFavorite.name, this._logger);

      if (data.IdOfSelect) {
        var storageMatch = this.GetFromStorageById(data.IdOfSelect, CacheMode.OkToUseCache)
        if (storageMatch) {
          storageMatch.Flavor = SnapShotFlavor.Favorite;
          await this.WriteToStorage(storageMatch);
          result.MarkSuccessful();
        } else {
          result.MarkFailed('no storage match');
        }
      } else {
        result.MarkFailed('no data.idofselect');
      }

      this._logger.FuncEnd(this.MarkFavorite.name);

      if (result) {
        resolve();
      } else {
        reject(result.RejectReasons);
      }
    })
  }
  async WriteToStorage(dataOneWindow: IDataOneWindowStorage) {
    return new Promise(async (resolve, reject) => {
      this._logger.FuncStart(this.WriteToStorage.name);
      var result: PromiseResult = new PromiseResult(this.WriteToStorage.name, this._logger);

      var snapShotAsString = JSON.stringify(dataOneWindow);
      //this.debug().LogVal('snapShotAsString', snapShotAsString);

      await window.localStorage.setItem(ContentConst.Const.Storage.WindowRoot + ContentConst.Const.Storage.SnapShotPrefix + dataOneWindow.Id.AsString, snapShotAsString)

      var foundInStorage = await this.GetFromStorageById(dataOneWindow.Id, CacheMode.DoNotUseCach);

      if (foundInStorage) {
        result.MarkSuccessful();
      } else {
        result.MarkFailed('not found in storage');
        result.MarkFailed('Snap shot not successfully saved');
      }

      this._logger.FuncEnd(this.WriteToStorage.name);

      if (result.WasSuccessful()) {
        resolve();
      } else {
        reject(result.RejectReasons);
      }
    });
  }

  GetFromStorageById(needleId: IGuid, cacheMode: CacheMode): IDataOneWindowStorage {
    this._logger.FuncStart(this.GetFromStorageById.name, needleId.AsString);
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
      this._logger.Log('found match', this.Helpers().UtilityHelp.TimeNicknameFavStr(DateOneWinStoreMatch));
    } else {
      this._logger.LogVal(this.GetFromStorageById.name, 'Match notfound')
    }

    this._logger.FuncEnd(this.GetFromStorageById.name);
    return DateOneWinStoreMatch;
  }

  private __getAllLocalStorageAsIOneStorageData(): IOneStorageData[] {
    this._logger.FuncStart(this.__getAllLocalStorageAsIOneStorageData.name);
    var toReturn: IOneStorageData[] = [];

    var storageLength: number = window.localStorage.length;
    this._logger.LogVal('storageLength', storageLength);

    for (var idx: number = 0; idx < storageLength; idx++) {
      this._logger.LogVal('Processing Index', idx);

      var candidate: IOneStorageData = {
        data: '',
        key: '',
      };

      candidate.key = window.localStorage.key(idx);

      this._logger.LogVal('Candidate.key', candidate.key);

      if (candidate.key.startsWith(ContentConst.Const.Storage.WindowRoot + ContentConst.Const.Storage.SnapShotPrefix)) {
        this._logger.LogVal('valid candidate', true);

        candidate.data = window.localStorage.getItem(candidate.key);
        if (this._logger.IsNotNullOrUndefinedBool('candidate.data', candidate.data)) {
          toReturn.push(candidate);
        }
      }
    }

    this._logger.FuncEnd(this.__getAllLocalStorageAsIOneStorageData.name, toReturn.length);
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
      this._logger.Error(this.__parseRawData.name, 'Saved data did not import correctly')
    }
    return candidate
  }

  private __getAllStorageReal() {
    this._logger.FuncStart(this.__getAllStorageReal.name);
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

    this._logger.FuncEnd(this.__getAllStorageReal.name);
    return toReturn;
  }

  CleanOutOldData(): void {
    this._logger.FuncStart(this.CleanOutOldData.name);

    var cleanData: IDataOneWindowStorage[] = [];
    var now: Date = new Date();
    var maxAutoSaveDiff: number = ContentConst.Const.MaxAutoSaveAgeDays * 24 * 60 * 60 * 1000;

    if (this.CachedWindowStorage) {
      var cacheLength = this.CachedWindowStorage.CurrentSnapShots.length;
      var autoCount: number = 0;
      for (var idx = 0; idx < cacheLength; idx++) {
        var deleteFlag: boolean = false;
        var candidate = this.CachedWindowStorage.CurrentSnapShots[idx];

        if (candidate.Flavor) {
          if (autoCount > ContentConst.Const.MaxAutoToSaveCount) {
            this._logger.LogVal('Delete (max count :' + ContentConst.Const.MaxAutoToSaveCount + ')', candidate.TimeStamp.toString());
            deleteFlag = true;
          }
          autoCount++;
        }

        if (now.getTime() - candidate.TimeStamp.getTime() > maxAutoSaveDiff) {
          this._logger.LogVal('Delete (Old : max' + ContentConst.Const.MaxAutoSaveAgeDays + ' days)', candidate.TimeStamp.toString());
          deleteFlag = true;
        }

        if (!deleteFlag) {
          cleanData.push(candidate);
        } else {
          try {
            this._logger.LogVal('Cleaning old autosave', candidate.RawData.key);
            window.localStorage.removeItem(candidate.RawData.key);
          } catch (e) {
            this._logger.Error(this.CleanOutOldData.name, 'unable to delete key: ' + candidate.RawData.key)
          }
        }
      }
      this.CachedWindowStorage.CurrentSnapShots = cleanData;
    }

    this._logger.FuncEnd(this.CleanOutOldData.name);
  }

  GetAllSnapShotsMany(cacheMode: CacheMode): ISnapShotsMany {
    this._logger.FuncStart(this.GetAllSnapShotsMany.name, StaticHelpers.CacheModeAsString(cacheMode));
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

    this._logger.LogVal('cached timeDiff', timeDiff + ' : ' + ContentConst.Const.MaxCacheAgeMs);
    if (timeDiff > (ContentConst.Const.MaxCacheAgeMs)) {
      this._logger.Log('updating cache');

      this.CachedWindowStorage.CurrentSnapShots = this.__getAllStorageReal();
      this.CachedWindowStorage.Birthday = new Date();
    } else {
      this._logger.Log('using cache');
    }

    this.CleanOutOldData();
    this.UpdateCounts();

    toReturn = this.CachedWindowStorage;
    this._logger.FuncEnd(this.GetAllSnapShotsMany.name);

    return toReturn;
  }

  UpdateCounts() {
    this.CachedWindowStorage.FavoriteCount = 0;
    this.CachedWindowStorage.SnapShotsAutoCount = 0;
    this.CachedWindowStorage.PlainCount = 0;

    for (var idx = 0; idx < this.CachedWindowStorage.CurrentSnapShots.length; idx++) {
      var candidate = this.CachedWindowStorage.CurrentSnapShots[idx];
      if (candidate.Flavor === SnapShotFlavor.Autosave) {
        this.CachedWindowStorage.SnapShotsAutoCount++;
      } else if (candidate.Flavor === SnapShotFlavor.Favorite) {
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
      this._logger.FuncStart(this.RemoveOneFromStorage.name);
      var successful: boolean = true;
      var failMsg: string = '';
      try {
        if (targetId) {
          var storageMatch: IDataOneWindowStorage = await this.GetFromStorageById(targetId, CacheMode.OkToUseCache)
          if (storageMatch) {
            var result: boolean = confirm('Remove ?: ' + this.ContentHub.Utilities.TimeNicknameFavStrForConfirmation(storageMatch));
            if (result === true) {
              this._logger.LogVal('Key to Delete', storageMatch.RawData.key);
              await window.localStorage.removeItem(storageMatch.RawData.key);

              var stillExists: IDataOneWindowStorage = await this.GetFromStorageById(targetId, CacheMode.DoNotUseCach);

              if (stillExists) {
                successful = false;
                failMsg = 'Snapshot still exists after deleting';
              } else {
                successful = true;
              }

              this._logger.Log('Attempting completed');
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

      this._logger.FuncEnd(this.RemoveOneFromStorage.name);

      if (successful) {
        this._logger.Log('resolving');
        resolve();
      } else {
        this._logger.Log('rejecting');
        reject(failMsg);
      }
    })
  }
}