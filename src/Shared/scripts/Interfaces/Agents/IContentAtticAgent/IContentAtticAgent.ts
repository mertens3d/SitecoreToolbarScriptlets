import { GuidData } from "../../../Helpers/GuidData";
import { IStateOfScUi } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../Data/States/IStateOfStorageSnapShots";

export interface IContentAtticAgent {
  CleanOutOldAutoSavedData(): void;
  GetFromStorageBySnapShotId(storageKey: GuidData): IStateOfScUi;
  GetStateOfStorageSnapShots(): IStateOfStorageSnapShots;
  InitContentAtticManager(retainDayCount: number);
  RemoveSnapshotFromStorageById(TargetSnapShotId: GuidData);
  WriteStateOfSitecoreToStorage(storageMatch: IStateOfScUi);
  WriteStateOfSitecoreToStorage(storageMatch: IStateOfScUi);
}