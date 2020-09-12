import { GuidData } from "../../../Helpers/GuidData";
import { IDataStateOfSitecoreWindow } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from "../../Data/States/IDataStateOfStorageSnapShots";

export interface IContentAtticAgent {
  WriteStateOfSitecoreToStorage(storageMatch: IDataStateOfSitecoreWindow);
  RemoveSnapshotFromStorageById(TargetSnapShotId: GuidData);
  WriteStateOfSitecoreToStorage(storageMatch: IDataStateOfSitecoreWindow);
  GetStateOfStorageSnapShots(): IDataStateOfStorageSnapShots;
  InitContentAtticManager(retainDayCount: number);
  GetFromStorageBySnapShotId(storageKey: GuidData): IDataStateOfSitecoreWindow;
}