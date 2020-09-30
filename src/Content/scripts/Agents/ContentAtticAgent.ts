import { ScWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { Guid } from "../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../Shared/scripts/Helpers/GuidData";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IRepositoryAgent } from "../../../Shared/scripts/Interfaces/Agents/IRepositoryAgent";
import { IStateOfScUiProxy } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { IOneStorageData } from "../../../Shared/scripts/Interfaces/IOneStorageData";
import { DefaultStateOfStorageSnapshots } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfSnapshots";
import { DefaultMetaData } from "../../../Shared/scripts/Classes/Defaults/DefaultMetaData";
import { DefaultFriendly } from "../../../Shared/scripts/Classes/Defaults/DefaultFriendly";
import { IStateOfStorageSnapShots } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfStorageSnapShots";

export class ContentAtticAgent implements IContentAtticAgent {
  private RepoAgent: IRepositoryAgent;
  private SettingAutoSnapshotRetainDays: number;
  private Logger: ILoggerAgent;

  constructor(repoAgent: IRepositoryAgent, logger: ILoggerAgent) {
    this.Logger = logger;

    this.Logger.FuncStart(ContentAtticAgent.name);

    this.RepoAgent = repoAgent;

    this.Logger.FuncEnd(ContentAtticAgent.name);
  }

  InitContentAtticManager(settingAutoSnapshotRetainDays: number) {
    this.SettingAutoSnapshotRetainDays = settingAutoSnapshotRetainDays;
  }

  async WriteStateOfSitecoreToStorage(stateOfSitecoreWindow: IStateOfScUiProxy): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WriteStateOfSitecoreToStorage.name);

      let storageKey = ContentConst.Const.Storage.WindowRoot + ContentConst.Const.Storage.SnapShotPrefix + stateOfSitecoreWindow.Meta.SessionId + '.' + stateOfSitecoreWindow.Meta.TimeStamp.valueOf();

      stateOfSitecoreWindow.Meta.StorageKey = storageKey;
      var snapShotAsString = JSON.stringify(stateOfSitecoreWindow);

      this.RepoAgent.WriteByKey(stateOfSitecoreWindow.Meta.StorageKey, snapShotAsString);

      this.CleanOutOldAutoSavedData();

      resolve();

      this.Logger.FuncEnd(this.WriteStateOfSitecoreToStorage.name);
    });
  }

  GetFromStorageBySnapShotId(needleId: GuidData): IStateOfScUiProxy {
    this.Logger.FuncStart(this.GetFromStorageBySnapShotId.name, needleId.Raw);

    var DateOneWinStoreMatch: IStateOfScUiProxy = null;

    let foundStorage: IStateOfStorageSnapShots = this.GetStateOfStorageSnapShots();

    for (var idx = 0; idx < foundStorage.SnapShots.length; idx++) {
      var candidate = foundStorage.SnapShots[idx];
      if (candidate.Meta.SnapshotId.Raw === needleId.Raw) {
        DateOneWinStoreMatch = candidate;
        break;
      }
    }

    if (!DateOneWinStoreMatch) {
      this.Logger.WarningAndContinue(this.GetFromStorageBySnapShotId.name, 'No match found for: ' + needleId.Raw);
    }
    this.Logger.FuncEnd(this.GetFromStorageBySnapShotId.name);

    return DateOneWinStoreMatch;
  }

  private ValidateStorageData(oneRaw: IOneStorageData): IStateOfScUiProxy {
    var candidate: IStateOfScUiProxy = <IStateOfScUiProxy>JSON.parse(oneRaw.data);

    if (candidate) {
      if (!candidate.Meta) {
        candidate.Meta = new DefaultMetaData();
      }

      candidate.Meta.TimeStamp = new Date(candidate.Meta.TimeStamp);

      if (!candidate.Meta.WindowType) {
        candidate.Meta.WindowType = ScWindowType.Unknown;
        candidate.Friendly.WindowType = ScWindowType[candidate.Meta.WindowType];
      }

      if (!candidate.Friendly) {
        candidate.Friendly = new DefaultFriendly();
      }

      if (!candidate.Friendly.NickName) {
        candidate.Friendly.NickName = '';
      }
    } else {
      this.Logger.ErrorAndThrow(this.ValidateStorageData.name, 'Saved data did not import correctly')
    }
    return candidate
  }

  private GetAllLocalStorageAsIOneStorageData(): IOneStorageData[] {
    let prefix = ContentConst.Const.Storage.WindowRoot + ContentConst.Const.Storage.SnapShotPrefix;
    let result = this.RepoAgent.GetBulkLocalStorageByKeyPrefix(prefix);
    return result;
  }

  private GetAllStorage(): IStateOfScUiProxy[] {
    var toReturn: IStateOfScUiProxy[] = [];

    let rawStorageData: IOneStorageData[] = this.GetAllLocalStorageAsIOneStorageData();

    if (rawStorageData) {
      for (var idx = 0; idx < rawStorageData.length; idx++) {
        toReturn.push(this.ValidateStorageData(rawStorageData[idx]));
      }
    }

    toReturn.sort((a: IStateOfScUiProxy, b: IStateOfScUiProxy) =>
      +b.Meta.TimeStamp - +a.Meta.TimeStamp
    );

    toReturn = this.FilterOutOldData(toReturn);

    return toReturn;
  }

  private CleanOneStorageItem(candidate: IStateOfScUiProxy, autoCount: number): number {
    var maxAutoSaveDiff: number = this.SettingAutoSnapshotRetainDays * 24 * 60 * 60 * 1000;
    var deleteFlag: boolean = false;
    var now: Date = new Date();

    if (candidate.Meta.Flavor == SnapShotFlavor.Autosave) {
      if (autoCount > ContentConst.Const.MaxAutoToSaveCount) {
        this.Logger.LogVal('Delete (max count :' + ContentConst.Const.MaxAutoToSaveCount + ')', candidate.Meta.TimeStamp.toString());
        deleteFlag = true;
      }
      autoCount++;
    }

    if (now.getTime() - candidate.Meta.TimeStamp.getTime() > maxAutoSaveDiff) {
      this.Logger.LogVal('Delete (Old : max' + ContentConst.Const.DefaultMaxAutoSaveAgeDays + ' days)', candidate.Meta.TimeStamp.toString());
      deleteFlag = true;
    }

    if (deleteFlag) {
      try {
        this.Logger.LogVal('Cleaning old autosave', candidate.Meta.SnapshotId);
        window.localStorage.removeItem(candidate.Meta.StorageKey)
      } catch (e) {
        this.Logger.ErrorAndThrow(this.CleanOutOldAutoSavedData.name, 'unable to delete key: ' + candidate.Meta.SnapshotId)
      }
    }

    return autoCount;
  }

  CleanFoundStorage(currentWindowStorage: IStateOfStorageSnapShots): void {
    try {
      if (currentWindowStorage) {
        var cacheLength = currentWindowStorage.SnapShots.length;
        var autoCount: number = 0;
        for (var idx = 0; idx < cacheLength; idx++) {
          var candidate = currentWindowStorage.SnapShots[idx];
          autoCount = this.CleanOneStorageItem(candidate, autoCount);
        }
      }
    } catch (err) {
      throw (this.CleanFoundStorage.name, err);
    }
  }

  CleanOutOldAutoSavedData(): void {
    this.Logger.FuncStart(this.CleanOutOldAutoSavedData.name);

    try {
      if (!this.SettingAutoSnapshotRetainDays || this.SettingAutoSnapshotRetainDays < 1) {
        this.SettingAutoSnapshotRetainDays = ContentConst.Const.DefaultMaxAutoSaveAgeDays;
      }

      let currentWindowStorage: IStateOfStorageSnapShots = this.GetStateOfStorageSnapShots();

      this.CleanFoundStorage(currentWindowStorage);
    } catch (err) {
      throw (this.CleanOutOldAutoSavedData.name, err);
    }

    this.Logger.FuncEnd(this.CleanOutOldAutoSavedData.name);
  }

  GetStateOfStorageSnapShots(): IStateOfStorageSnapShots {
    this.Logger.FuncStart(this.GetStateOfStorageSnapShots.name);

    let stateOfSnapshotStorage: IStateOfStorageSnapShots = new DefaultStateOfStorageSnapshots();
    let result: IStateOfScUiProxy[] = this.GetAllStorage();
    stateOfSnapshotStorage.SnapShots = result;
    stateOfSnapshotStorage.CreationDate = new Date();
    this.UpdateCounts(stateOfSnapshotStorage);
    this.Logger.FuncEnd(this.GetStateOfStorageSnapShots.name);
    return stateOfSnapshotStorage;
  }

  //ConvertGuidData(candidateSnapShots: IDataStateOfSitecoreWindow[]): IDataStateOfSitecoreWindow[] {
  //  let toReturn: IDataStateOfSitecoreWindow[] = []

  //  for (var idx = 0; idx < candidateSnapShots.length; idx++) {
  //    var candidate = candidateSnapShots[idx];

  //    try {
  //      if (candidate.Meta.SessionId && Guid.IsValidGuidStr(candidate.Meta.SnapshotId.Raw)) {
  //        //candidate.Meta.SnapshotId = new GuidData(candidate.Meta.SnapshotId.Raw);
  //        toReturn.push(candidate);
  //      } else {
  //        this.Logger.ErrorAndContinue(this.ConvertGuidData.name, 'invalid guid for ID, record is being ignored. Got: ' + candidate.Meta.SnapshotId.Raw)
  //      }
  //    } catch (err) {
  //    }
  //  }

  //  return toReturn;
  //}

  UpdateCounts(storageAllSnapshots: IStateOfStorageSnapShots) {
    storageAllSnapshots.FavoriteCount = 0;
    storageAllSnapshots.SnapShotsAutoCount = 0;
    storageAllSnapshots.PlainCount = 0;

    for (var idx = 0; idx < storageAllSnapshots.SnapShots.length; idx++) {
      var candidate = storageAllSnapshots.SnapShots[idx];
      if (candidate.Meta.Flavor === SnapShotFlavor.Autosave) {
        storageAllSnapshots.SnapShotsAutoCount++;
      } else if (candidate.Meta.Flavor === SnapShotFlavor.Favorite) {
        storageAllSnapshots.FavoriteCount++;
      } else {
        storageAllSnapshots.PlainCount++;
      }
    }
  }

  FilterOutOldData(data: IStateOfScUiProxy[]): IStateOfScUiProxy[] {
    var toReturn: IStateOfScUiProxy[] = data;

    return toReturn;
  }

  RemoveAndConfirmRemoval(storageMatch: IStateOfScUiProxy): void {
    this.Logger.LogVal('Key to Delete', storageMatch.Meta.SnapshotId);

    let storageKey = storageMatch.Meta.StorageKey;

    this.RepoAgent.RemoveByKey(storageKey);

    let result = this.RepoAgent.ReadDataOfKey(storageKey);

    if (result) {
      this.Logger.ErrorAndThrow(this.RemoveAndConfirmRemoval.name, 'Snapshot still exists after deleting');
    }
  }

  RemoveSnapshotFromStorageById(targetId: GuidData): void {
    this.Logger.FuncStart(this.RemoveSnapshotFromStorageById.name);
    try {
      if (targetId) {
        var storageMatch: IStateOfScUiProxy = this.GetFromStorageBySnapShotId(targetId)
        if (storageMatch) {
          this.RemoveAndConfirmRemoval(storageMatch)
        } else {
          this.Logger.WarningAndContinue(this.RemoveSnapshotFromStorageById.name, 'no storage match');
        }
      } else {
        this.Logger.WarningAndContinue(this.RemoveSnapshotFromStorageById.name, 'no target id');
      }
    } catch (err) {
      this.Logger.ErrorAndThrow(this.RemoveSnapshotFromStorageById.name, err);
    }

    this.Logger.FuncEnd(this.RemoveSnapshotFromStorageById.name);
  }
}