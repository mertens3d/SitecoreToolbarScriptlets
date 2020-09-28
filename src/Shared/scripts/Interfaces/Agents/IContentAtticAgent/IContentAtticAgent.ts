import { GuidData } from "../../../Helpers/GuidData";
import { IDataStateOfLiveHindSite } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from "../../Data/States/IDataStateOfStorageSnapShots";

export interface IContentAtticAgent {
  CleanOutOldAutoSavedData(): void;
  WriteStateOfSitecoreToStorage(storageMatch: IDataStateOfLiveHindSite);
  RemoveSnapshotFromStorageById(TargetSnapShotId: GuidData);
  WriteStateOfSitecoreToStorage(storageMatch: IDataStateOfLiveHindSite);
  GetStateOfStorageSnapShots(): IDataStateOfStorageSnapShots;
  InitContentAtticManager(retainDayCount: number);
  GetFromStorageBySnapShotId(storageKey: GuidData): IDataStateOfLiveHindSite;
}