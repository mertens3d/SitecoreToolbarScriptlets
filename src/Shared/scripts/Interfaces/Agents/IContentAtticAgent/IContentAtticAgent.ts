import { GuidData } from "../../../Helpers/GuidData";
import { IStateOfScUiProxy } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../Data/States/IDataStateOfStorageSnapShots";

export interface IContentAtticAgent {
  CleanOutOldAutoSavedData(): void;
  WriteStateOfSitecoreToStorage(storageMatch: IStateOfScUiProxy);
  RemoveSnapshotFromStorageById(TargetSnapShotId: GuidData);
  WriteStateOfSitecoreToStorage(storageMatch: IStateOfScUiProxy);
  GetStateOfStorageSnapShots(): IStateOfStorageSnapShots;
  InitContentAtticManager(retainDayCount: number);
  GetFromStorageBySnapShotId(storageKey: GuidData): IStateOfScUiProxy;
}