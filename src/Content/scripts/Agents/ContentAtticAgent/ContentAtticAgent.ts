import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { SnapShotFlavor } from "../../../../Shared/scripts/Enums/SnapShotFlavor";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IRepositoryAgent } from "../../../../Shared/scripts/Interfaces/Agents/IRepositoryAgent";
import { IDataStateOfStorageSnapShots } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfStorageSnapShots";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IOneStorageData } from "../../../../Shared/scripts/Interfaces/IOneStorageData";
import { DefaultStateOfSnapshotStorage } from "../../../../Shared/scripts/Classes/Defaults/DefaultStateOfSnapshots";

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

  async WriteStateOfSitecoreToStorage(stateOfSitecoreWindow: IDataStateOfSitecoreWindow): Promise<void> {
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

  
  GetFromStorageBySnapShotId(needleId: GuidData): IDataStateOfSitecoreWindow {
    this.Logger.FuncStart(this.GetFromStorageBySnapShotId.name, needleId.Raw);

    var DateOneWinStoreMatch: IDataStateOfSitecoreWindow = null;

    let foundStorage: IDataStateOfStorageSnapShots = this.GetStateOfStorageSnapShots();

    for (var idx = 0; idx < foundStorage.SnapShots.length; idx++) {
      var candidate = foundStorage.SnapShots[idx];
      if (candidate.Meta.SnapshotId.Raw === needleId.Raw) {
        DateOneWinStoreMatch = candidate;
        this.Logger.Log('found match');
        break;
      }
    }

    this.Logger.FuncEnd(this.GetFromStorageBySnapShotId.name);

    return DateOneWinStoreMatch;
  }

  private __parseRawData(oneRaw: IOneStorageData) {
    var candidate: IDataStateOfSitecoreWindow = <IDataStateOfSitecoreWindow>JSON.parse(oneRaw.data);

    if (candidate) {
      candidate.Meta.TimeStamp = new Date(candidate.Meta.TimeStamp);

      if (!candidate.Meta.WindowType) {
        candidate.Meta.WindowType = ScWindowType.Unknown;
        candidate.Friendly.WindowType = ScWindowType[candidate.Meta.WindowType];
      }

      if (!candidate.Friendly.NickName) {
        candidate.Friendly.NickName = '';
      }
    } else {
      this.Logger.ErrorAndThrow(this.__parseRawData.name, 'Saved data did not import correctly')
    }
    return candidate
  }

  private GetAllLocalStorageAsIOneStorageData(): IOneStorageData[] {
    this.Logger.FuncStart(this.GetAllLocalStorageAsIOneStorageData.name);

    let prefix = ContentConst.Const.Storage.WindowRoot + ContentConst.Const.Storage.SnapShotPrefix;

    let result = this.RepoAgent.GetBulkLocalStorageByKeyPrefix(prefix);

    this.Logger.FuncEnd(this.GetAllLocalStorageAsIOneStorageData.name);

    return result;
  }

  private GetAllStorage(): IDataStateOfSitecoreWindow[] {
    this.Logger.FuncStart(this.GetAllStorage.name);
    var toReturn: IDataStateOfSitecoreWindow[] = [];

    let rawStorageData: IOneStorageData[] = this.GetAllLocalStorageAsIOneStorageData();

    if (rawStorageData) {
      for (var idx = 0; idx < rawStorageData.length; idx++) {
        toReturn.push(this.__parseRawData(rawStorageData[idx]));
      }
    }

    toReturn.sort((a: IDataStateOfSitecoreWindow, b: IDataStateOfSitecoreWindow) =>
      +b.Meta.TimeStamp - +a.Meta.TimeStamp
    );

    toReturn = this.FilterOutOldData(toReturn);

    this.Logger.FuncEnd(this.GetAllStorage.name);
    return toReturn;
  }

  private CleanOneStorageItem(candidate: IDataStateOfSitecoreWindow, autoCount: number): number {
    this.Logger.FuncStart(this.CleanOneStorageItem.name);
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

    this.Logger.FuncEnd(this.CleanOneStorageItem.name);
    return autoCount;
  }

  CleanFoundStorage(currentWindowStorage: IDataStateOfStorageSnapShots): void {
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

      let currentWindowStorage: IDataStateOfStorageSnapShots = this.GetStateOfStorageSnapShots();

      this.CleanFoundStorage(currentWindowStorage);
    } catch (err) {
      throw (this.CleanOutOldAutoSavedData.name, err);
    }

    this.Logger.FuncEnd(this.CleanOutOldAutoSavedData.name);
  }

  GetStateOfStorageSnapShots(): IDataStateOfStorageSnapShots {
    this.Logger.FuncStart(this.GetStateOfStorageSnapShots.name);

    let stateOfSnapshotStorage: IDataStateOfStorageSnapShots = new DefaultStateOfSnapshotStorage();

    let result: IDataStateOfSitecoreWindow[] = this.GetAllStorage();

    stateOfSnapshotStorage.SnapShots = result;
    stateOfSnapshotStorage.CreationDate = new Date();
    this.UpdateCounts(stateOfSnapshotStorage);
    stateOfSnapshotStorage.SnapShots = this.ConvertGuidData(stateOfSnapshotStorage.SnapShots);

    this.Logger.FuncEnd(this.GetStateOfStorageSnapShots.name);

    return stateOfSnapshotStorage;
  }

  ConvertGuidData(candidateSnapShots: IDataStateOfSitecoreWindow[]): IDataStateOfSitecoreWindow[] {
    let toReturn: IDataStateOfSitecoreWindow[] = []

    for (var idx = 0; idx < candidateSnapShots.length; idx++) {
      var candidate = candidateSnapShots[idx];

      try {
        if (candidate.Meta.SessionId && Guid.IsValidGuidStr(candidate.Meta.SnapshotId.Raw)) {
          //candidate.Meta.SnapshotId = new GuidData(candidate.Meta.SnapshotId.Raw);
          toReturn.push(candidate);
        } else {
          this.Logger.ErrorAndContinue(this.ConvertGuidData.name, 'invalid guid for ID, record is being ignored. Got: ' + candidate.Meta.SnapshotId.Raw)
        }
      } catch (err) {
      }
    }

    return toReturn;
  }

  UpdateCounts(storageAllSnapshots: IDataStateOfStorageSnapShots) {
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

  FilterOutOldData(data: IDataStateOfSitecoreWindow[]): IDataStateOfSitecoreWindow[] {
    var toReturn: IDataStateOfSitecoreWindow[] = data;

    return toReturn;
  }

  TimeNicknameFavStrForConfirmation(data: IDataStateOfSitecoreWindow): string {
    var result = data.Friendly.TimeStamp + ' ' + data.Friendly.NickName + ' ' + Guid.AsShort(data.Meta.SnapshotId);
    result = result.replace(new RegExp(/&nbsp;/ig), '');
    return result;
  }

  RemoveAndConfirmRemoval(storageMatch: IDataStateOfSitecoreWindow): void {
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
        var storageMatch: IDataStateOfSitecoreWindow = this.GetFromStorageBySnapShotId(targetId)
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