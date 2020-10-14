import { DefaultFriendly } from "../../../Shared/scripts/Classes/Defaults/DefaultFriendly";
import { DefaultMetaData } from "../../../Shared/scripts/Classes/Defaults/DefaultMetaData";
import { DefaultStateOfStorageSnapshots } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfSnapshots";
import { ScWindowType } from "../../../Shared/scripts/Enums/50 - scWindowType";
import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { GuidData } from "../../../Shared/scripts/Helpers/GuidData";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IRepositoryAgent } from "../../../Shared/scripts/Interfaces/Agents/IRepositoryAgent";
import { IStateOfScUi } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfStorageSnapShots";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { IOneStorageData } from "../../../Shared/scripts/Interfaces/IOneStorageData";
import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";

export class ContentAtticAgent extends _FrontBase implements IContentAtticAgent {
  private RepoAgent: IRepositoryAgent;
  private SettingAutoSnapshotRetainDays: number;

  constructor(repoAgent: IRepositoryAgent, hindeCore: IHindeCore) {
    super(hindeCore);

    this.Logger.CTORStart(ContentAtticAgent.name);

    this.RepoAgent = repoAgent;

    this.Logger.CTOREnd(ContentAtticAgent.name);
  }

  InitContentAtticManager(settingAutoSnapshotRetainDays: number) {
    this.SettingAutoSnapshotRetainDays = settingAutoSnapshotRetainDays;
  }

  async WriteStateOfSitecoreToStorage(stateOfSitecoreWindow: IStateOfScUi): Promise<void> {
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

  GetFromStorageBySnapShotId(needleId: GuidData): IStateOfScUi {
    this.Logger.FuncStart(this.GetFromStorageBySnapShotId.name, needleId.Raw);

    var DateOneWinStoreMatch: IStateOfScUi = null;

    let foundStorage: IStateOfStorageSnapShots = this.GetStateOfStorageSnapShots();

    for (var idx = 0; idx < foundStorage.SnapShots.length; idx++) {
      var candidate = foundStorage.SnapShots[idx];
      if (candidate.Meta.SnapshotId.Raw === needleId.Raw) {
        DateOneWinStoreMatch = candidate;
        break;
      }
    }

    if (!DateOneWinStoreMatch) {
      this.ErrorHand.WarningAndContinue(this.GetFromStorageBySnapShotId.name, 'No match found for: ' + needleId.Raw);
    }
    this.Logger.FuncEnd(this.GetFromStorageBySnapShotId.name);

    return DateOneWinStoreMatch;
  }

  private ValidateStorageData(oneRaw: IOneStorageData): IStateOfScUi {
    var candidate: IStateOfScUi = <IStateOfScUi>JSON.parse(oneRaw.data);

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
      this.ErrorHand.HandleFatalError(this.ValidateStorageData.name, 'Saved data did not import correctly')
    }
    return candidate
  }

  private GetAllLocalStorageAsIOneStorageData(): IOneStorageData[] {
    let prefix = ContentConst.Const.Storage.WindowRoot + ContentConst.Const.Storage.SnapShotPrefix;
    let result = this.RepoAgent.GetBulkLocalStorageByKeyPrefix(prefix);
    return result;
  }

  private GetAllStorage(): IStateOfScUi[] {
    var toReturn: IStateOfScUi[] = [];

    let rawStorageData: IOneStorageData[] = this.GetAllLocalStorageAsIOneStorageData();

    if (rawStorageData) {
      for (var idx = 0; idx < rawStorageData.length; idx++) {
        toReturn.push(this.ValidateStorageData(rawStorageData[idx]));
      }
    }

    toReturn.sort((a: IStateOfScUi, b: IStateOfScUi) =>
      +b.Meta.TimeStamp - +a.Meta.TimeStamp
    );

    toReturn = this.FilterOutOldData(toReturn);

    return toReturn;
  }

  private CleanOneStorageItem(candidate: IStateOfScUi, autoCount: number): number {
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
        this.ErrorHand.HandleFatalError(this.CleanOutOldAutoSavedData.name, 'unable to delete key: ' + candidate.Meta.SnapshotId)
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
    let result: IStateOfScUi[] = this.GetAllStorage();
    stateOfSnapshotStorage.SnapShots = result;
    stateOfSnapshotStorage.CreationDate = new Date();
    this.UpdateCounts(stateOfSnapshotStorage);
    this.Logger.FuncEnd(this.GetStateOfStorageSnapShots.name);
    return stateOfSnapshotStorage;
  }

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

  FilterOutOldData(data: IStateOfScUi[]): IStateOfScUi[] {
    var toReturn: IStateOfScUi[] = data;

    return toReturn;
  }

  RemoveAndConfirmRemoval(storageMatch: IStateOfScUi): void {
    this.Logger.LogVal('Key to Delete', storageMatch.Meta.SnapshotId);

    let storageKey = storageMatch.Meta.StorageKey;

    this.RepoAgent.RemoveByKey(storageKey);

    let result = this.RepoAgent.ReadDataOfKey(storageKey);

    if (result) {
      this.ErrorHand.HandleFatalError(this.RemoveAndConfirmRemoval.name, 'Snapshot still exists after deleting');
    }
  }

  RemoveSnapshotFromStorageById(targetId: GuidData): void {
    this.Logger.FuncStart(this.RemoveSnapshotFromStorageById.name);
    try {
      if (targetId) {
        var storageMatch: IStateOfScUi = this.GetFromStorageBySnapShotId(targetId)
        if (storageMatch) {
          this.RemoveAndConfirmRemoval(storageMatch)
        } else {
          this.ErrorHand.WarningAndContinue(this.RemoveSnapshotFromStorageById.name, 'no storage match');
        }
      } else {
        this.ErrorHand.WarningAndContinue(this.RemoveSnapshotFromStorageById.name, 'no target id');
      }
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.RemoveSnapshotFromStorageById.name, err);
    }

    this.Logger.FuncEnd(this.RemoveSnapshotFromStorageById.name);
  }
}