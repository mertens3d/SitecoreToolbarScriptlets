import { GuidData } from "../../../Helpers/GuidData";
import { IStateOfScUiProxy } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../Data/States/IStateOfStorageSnapShots";

export interface IContentAtticAgent {
  CleanOutOldAutoSavedData(): void;
  GetFromStorageBySnapShotId(storageKey: GuidData): IStateOfScUiProxy;
  GetStateOfStorageSnapShots(): IStateOfStorageSnapShots;
  InitContentAtticManager(retainDayCount: number);
  RemoveSnapshotFromStorageById(TargetSnapShotId: GuidData);
  WriteStateOfSitecoreToStorage(storageMatch: IStateOfScUiProxy);
  WriteStateOfSitecoreToStorage(storageMatch: IStateOfScUiProxy);
}