import { ScWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { SnapShotFlavor } from "../../../../Shared/scripts/Enums/SnapShotFlavor";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../../Shared/scripts/Helpers/GuidData";
import { IContentAtticAgent } from "../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IRepositoryAgent } from "../../../../Shared/scripts/Interfaces/Agents/IRepositoryAgent";
import { IDataSnapShots } from "../../../../Shared/scripts/Interfaces/Data/IDataSnapShots";
import { IDataStateOfSitecore } from "../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IOneStorageData } from "../../../../Shared/scripts/Interfaces/IOneStorageData";

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

  async WriteStateOfSitecoreToStorage(dataOneWindow: IDataStateOfSitecore): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WriteStateOfSitecoreToStorage.name);

      var snapShotAsString = JSON.stringify(dataOneWindow);

      let storageKey = ContentConst.Const.Storage.WindowRoot + ContentConst.Const.Storage.SnapShotPrefix + dataOneWindow.GuidId.Raw;
      this.RepoAgent.WriteByKey(storageKey, snapShotAsString);

      this.CleanOutOldAutoSavedData();

      resolve();

      this.Logger.FuncEnd(this.WriteStateOfSitecoreToStorage.name);
    });
  }

  GetFromStorageById(needleId: GuidData): IDataStateOfSitecore {

    this.Logger.FuncStart(this.GetFromStorageById.name, needleId.Raw);

    var DateOneWinStoreMatch: IDataStateOfSitecore = null;

    let foundStorage: IDataSnapShots = this.GetAllSnapShotsMany();

    for (var idx = 0; idx < foundStorage.CurrentSnapShots.length; idx++) {
      var candidate = foundStorage.CurrentSnapShots[idx];
      if (candidate.GuidId.Raw === needleId.Raw) {
        DateOneWinStoreMatch = candidate;
        this.Logger.Log('found match');
        break;
      }
    }

    this.Logger.FuncEnd(this.GetFromStorageById.name);

    return DateOneWinStoreMatch;
  }

  private __parseRawData(oneRaw: IOneStorageData) {
    var candidate: IDataStateOfSitecore = <IDataStateOfSitecore>JSON.parse(oneRaw.data);

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

  private GetAllLocalStorageAsIOneStorageData(): IOneStorageData[] {
    this.Logger.FuncStart(this.GetAllLocalStorageAsIOneStorageData.name);

    let prefix = ContentConst.Const.Storage.WindowRoot + ContentConst.Const.Storage.SnapShotPrefix;

    let result = this.RepoAgent.GetBulkLocalStorageByKeyPrefix(prefix);

    this.Logger.FuncEnd(this.GetAllLocalStorageAsIOneStorageData.name);

    return result;
  }

  private GetAllStorage(): IDataStateOfSitecore[] {
    this.Logger.FuncStart(this.GetAllStorage.name);
    var toReturn: IDataStateOfSitecore[] = [];

    let rawStorageData: IOneStorageData[] = this.GetAllLocalStorageAsIOneStorageData();

    if (rawStorageData) {
      for (var idx = 0; idx < rawStorageData.length; idx++) {
        toReturn.push(this.__parseRawData(rawStorageData[idx]));
      }
    }

    toReturn.sort((a: IDataStateOfSitecore, b: IDataStateOfSitecore) =>
      +b.TimeStamp - +a.TimeStamp
    );

    toReturn = this.FilterOutOldData(toReturn);

    this.Logger.FuncEnd(this.GetAllStorage.name);
    return toReturn;
  }

  private CleanOneStorageItem(candidate: IDataStateOfSitecore, autoCount: number): number {
    this.Logger.FuncStart(this.CleanOneStorageItem.name);
    var maxAutoSaveDiff: number = this.SettingAutoSnapshotRetainDays * 24 * 60 * 60 * 1000;
    var deleteFlag: boolean = false;
    var now: Date = new Date();

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

    if (deleteFlag) {
      try {
        this.Logger.LogVal('Cleaning old autosave', candidate.RawData.key);
        window.localStorage.removeItem(candidate.RawData.key)
      } catch (e) {
        this.Logger.ErrorAndThrow(this.CleanOutOldAutoSavedData.name, 'unable to delete key: ' + candidate.RawData.key)
      }
    }

    this.Logger.FuncEnd(this.CleanOneStorageItem.name);
    return autoCount;
  }

  CleanFoundStorage(currentWindowStorage: IDataSnapShots): void {
    try {
      if (currentWindowStorage) {
        var cacheLength = currentWindowStorage.CurrentSnapShots.length;
        var autoCount: number = 0;
        for (var idx = 0; idx < cacheLength; idx++) {
          var candidate = currentWindowStorage.CurrentSnapShots[idx];
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

      let currentWindowStorage: IDataSnapShots = this.GetAllSnapShotsMany();

      this.CleanFoundStorage(currentWindowStorage);
    } catch (err) {
      throw (this.CleanOutOldAutoSavedData.name, err);
    }

    this.Logger.FuncEnd(this.CleanOutOldAutoSavedData.name);
  }

  GetAllSnapShotsMany(): IDataSnapShots {
    this.Logger.FuncStart(this.GetAllSnapShotsMany.name);

    let snapShotsMany: IDataSnapShots = {
      CurrentSnapShots: [],
      Birthday: new Date(1970),
      FavoriteCount: 0,
      SnapShotsAutoCount: 0,
      PlainCount: 0,
    }

    let result: IDataStateOfSitecore[] = this.GetAllStorage();

    snapShotsMany.CurrentSnapShots = result;
    snapShotsMany.Birthday = new Date();
    this.UpdateCounts(snapShotsMany);
    snapShotsMany.CurrentSnapShots = this.ConvertGuidData(snapShotsMany.CurrentSnapShots);

    this.Logger.FuncEnd(this.GetAllSnapShotsMany.name);

    return snapShotsMany;
  }

  ConvertGuidData(candidateSnapShots: IDataStateOfSitecore[]): IDataStateOfSitecore[] {
    let toReturn: IDataStateOfSitecore[] = []

    for (var idx = 0; idx < candidateSnapShots.length; idx++) {
      var candidate = candidateSnapShots[idx];

      try {
        if (candidate.GuidId && Guid.IsValidGuidStr(candidate.GuidId.Raw)) {
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

  FilterOutOldData(data: IDataStateOfSitecore[]): IDataStateOfSitecore[] {
    var toReturn: IDataStateOfSitecore[] = data;

    return toReturn;
  }

  TimeNicknameFavStrForConfirmation(data: IDataStateOfSitecore): string {
    var result = data.TimeStampFriendly + ' ' + data.NickName + ' ' + Guid.AsShort(data.GuidId);
    result = result.replace(new RegExp(/&nbsp;/ig), '');
    return result;
  }

  RemoveAndConfirmRemoval(storageMatch: IDataStateOfSitecore): void {
      this.Logger.LogVal('Key to Delete', storageMatch.RawData.key);

      let targetId = storageMatch.GuidId;

     
    this.RepoAgent.RemoveByKey(storageMatch.RawData.key);

      let result = this.GetFromStorageById(targetId);

      if (result) {
        this.Logger.ErrorAndThrow(this.RemoveAndConfirmRemoval.name, 'Snapshot still exists after deleting');

      }
  }

  RemoveSnapshotFromStorageById(targetId: GuidData): void {
      this.Logger.FuncStart(this.RemoveSnapshotFromStorageById.name);
      try {
        if (targetId) {
          var storageMatch: IDataStateOfSitecore = this.GetFromStorageById(targetId)
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