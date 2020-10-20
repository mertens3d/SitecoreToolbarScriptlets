import { GuidData } from "../../../Helpers/GuidData";
import { IStateOfScUi } from "../../StateOf/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../StateOf/IStateOfStorageSnapShots";

export interface IContentAtticAgent {
  CleanOutOldAutoSavedData(): void;
  GetFromStorageBySnapShotId(storageKey: GuidData): IStateOfScUi;
  GetStateOfStorageSnapShots(): IStateOfStorageSnapShots;
  InitContentAtticManager(retainDayCount: number):void;
  RemoveSnapshotFromStorageById(TargetSnapShotId: GuidData): Promise<void>;
  WriteStateOfSitecoreToStorage(storageMatch: IStateOfScUi): Promise<void>;
  WriteStateOfSitecoreToStorage(storageMatch: IStateOfScUi): Promise<void>;
}