import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { SnapShotFlavor } from "../../../../Shared/scripts/Enums/SnapShotFlavor";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IRepositoryAgent } from "../../../../Shared/scripts/Interfaces/Agents/IRepositoryAgent";
import { IDataSnapShots } from "../../../../Shared/scripts/Interfaces/Data/IDataSnapShots";
import { IDataOneWindowStorage } from "../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IOneStorageData } from "../../../../Shared/scripts/Interfaces/IOneStorageData";

export class ContentAtticAgent implements IContentAtticAgent {
  private Repo: IRepositoryAgent;
  private SettingAutoSnapshotRetainDays: number;
  private Logger: ILoggerAgent;

  constructor(repo: IRepositoryAgent, logger: ILoggerAgent) {
    this.Logger = logger;

    this.Logger.FuncStart(ContentAtticAgent.name);

    this.Repo = repo;

    this.Logger.FuncEnd(ContentAtticAgent.name);
  }

  InitContentAtticManager(settingAutoSnapshotRetainDays: number) {
    this.SettingAutoSnapshotRetainDays = settingAutoSnapshotRetainDays;
  }

  async WriteToStorage(dataOneWindow: IDataOneWindowStorage) : Promise<void>{
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WriteToStorage.name);

      var snapShotAsString = JSON.stringify(dataOneWindow);

      await window.localStorage.setItem(ContentConst.Const.Storage.WindowRoot + ContentConst.Const.Storage.SnapShotPrefix + dataOneWindow.GuidId.Raw, snapShotAsString)

      await this.CleanOutOldAutoSavedData()
        .then(() => resolve())
        .catch((err) => reject(err))

      this.Logger.FuncEnd(this.WriteToStorage.name);
    });
  }

  async GetFromStorageById(needleId: GuidData): Promise<IDataOneWindowStorage> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetFromStorageById.name, needleId.Raw);

      var DateOneWinStoreMatch: IDataOneWindowStorage = null;

      await this.GetAllSnapShotsMany()
        .then((foundStorage: IDataSnapShots) => {
          for (var idx = 0; idx < foundStorage.CurrentSnapShots.length; idx++) {
            var candidate = foundStorage.CurrentSnapShots[idx];
            if (candidate.GuidId.Raw === needleId.Raw) {
              DateOneWinStoreMatch = candidate;
              this.Logger.Log('found match');
              break;
            }
          }
          resolve(DateOneWinStoreMatch)
        })
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.GetFromStorageById.name);
    });
  }

  private __parseRawData(oneRaw: IOneStorageData) {
    var candidate: IDataOneWindowStorage = <IDataOneWindowStorage>JSON.parse(oneRaw.data);
    console.log

    if (candidate) {
      candidate.TimeStamp = new Date(candidate.TimeStamp);
      candidate.RawData = oneRaw;

      if (!candidate.WindowType) {
        candidate.WindowType = ScWindowType.Unknown;
        candidate.WindowFriendly = ScWindowType[candidate.WindowType];
      }

      if (!candidate.NickName) {
        candidate.NickName = '';
      }
    } else {
      this.Logger.ErrorAndThrow(this.__parseRawData.name, 'Saved data did not import correctly')
    }
    return candidate
  }

  private GetAllLocalStorageAsIOneStorageData(): Promise<IOneStorageData[]> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetAllLocalStorageAsIOneStorageData.name);

      let prefix = ContentConst.Const.Storage.WindowRoot + ContentConst.Const.Storage.SnapShotPrefix;

      await this.Repo.GetBulkLocalStorageByKeyPrefix(prefix)
        .then((result) => resolve(result))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.GetAllLocalStorageAsIOneStorageData.name);
    });
  }

  private async __getAllStorageReal(): Promise<IDataOneWindowStorage[]> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.__getAllStorageReal.name);
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
          resolve(toReturn);
        })
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.__getAllStorageReal.name);
    })
  }

  async CleanOutOldAutoSavedData(): Promise<void> {
    this.Logger.FuncStart(this.CleanOutOldAutoSavedData.name);

    var cleanData: IDataOneWindowStorage[] = [];
    var now: Date = new Date();

    if (!this.SettingAutoSnapshotRetainDays || this.SettingAutoSnapshotRetainDays < 1) {
      this.SettingAutoSnapshotRetainDays = ContentConst.Const.DefaultMaxAutoSaveAgeDays;
    }
    var maxAutoSaveDiff: number = this.SettingAutoSnapshotRetainDays * 24 * 60 * 60 * 1000;
    let currentWindowStorage: IDataSnapShots = await this.GetAllSnapShotsMany();

    if (currentWindowStorage) {
      var cacheLength = currentWindowStorage.CurrentSnapShots.length;
      var autoCount: number = 0;
      for (var idx = 0; idx < cacheLength; idx++) {
        var deleteFlag: boolean = false;
        var candidate = currentWindowStorage.CurrentSnapShots[idx];

        if (candidate.Flavor == SnapShotFlavor.Autosave) {
          if (autoCount > ContentConst.Const.MaxAutoToSaveCount) {
            this.Logger.LogVal('Delete (max count :' + ContentConst.Const.MaxAutoToSaveCount + ')', candidate.TimeStamp.toString());
            deleteFlag = true;
          }
          autoCount++;
        }

        if (now.getTime() - candidate.TimeStamp.getTime() > maxAutoSaveDiff) {
          this.Logger.LogVal('Delete (Old : max' + ContentConst.Const.DefaultMaxAutoSaveAgeDays + ' days)', candidate.TimeStamp.toString());
          deleteFlag = true;
        }

        if (!deleteFlag) {
          cleanData.push(candidate);
        } else {
          try {
            this.Logger.LogVal('Cleaning old autosave', candidate.RawData.key);
            window.localStorage.removeItem(candidate.RawData.key);
          } catch (e) {
            this.Logger.ErrorAndThrow(this.CleanOutOldAutoSavedData.name, 'unable to delete key: ' + candidate.RawData.key)
          }
        }
      }
    }

    this.Logger.FuncEnd(this.CleanOutOldAutoSavedData.name);
  }

  GetAllSnapShotsMany(): Promise<IDataSnapShots> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetAllSnapShotsMany.name);

      let snapShotsMany: IDataSnapShots = {
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
          snapShotsMany.CurrentSnapShots = this.ConvertGuidData(snapShotsMany.CurrentSnapShots);

          resolve(snapShotsMany);
        })
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.GetAllSnapShotsMany.name);
    });
  }

  ConvertGuidData(candidateSnapShots: IDataOneWindowStorage[]): IDataOneWindowStorage[] {
    let toReturn: IDataOneWindowStorage[] = []

    for (var idx = 0; idx < candidateSnapShots.length; idx++) {
      var candidate = candidateSnapShots[idx];

      try {
        if (candidate.GuidId && GuidData.IsValidGuidStr(candidate.GuidId.Raw)) {
          candidate.GuidId = new GuidData(candidate.GuidId.Raw);
          toReturn.push(candidate);
        } else {
          this.Logger.ErrorAndContinue(this.ConvertGuidData.name, 'invalid guid for ID, record is being ignored. Got: ' + candidate.GuidId.Raw)
        }
      } catch (err) {
      }
    }

    return toReturn;
  }

  UpdateCounts(storageAllSnapshots: IDataSnapShots) {
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
    var result = data.TimeStampFriendly + ' ' + data.NickName + ' ' + Guid.AsShort(data.GuidId);
    result = result.replace(new RegExp(/&nbsp;/ig), '');
    return result;
  }

  ConfirmRemoveAndCheck(storageMatch: IDataOneWindowStorage): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.LogVal('Key to Delete', storageMatch.RawData.key);

      let targetId = storageMatch.GuidId;

      await window.localStorage.removeItem(storageMatch.RawData.key);

      await this.GetFromStorageById(targetId)
        .then((result) => {
          if (!result) {
            resolve();
          } else {
            reject('Snapshot still exists after deleting');
          }
        })
    })
  }

  RemoveSnapshotFromStorageById(targetId: GuidData) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RemoveSnapshotFromStorageById.name);
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

      this.Logger.FuncEnd(this.RemoveSnapshotFromStorageById.name);
    })
  }
}