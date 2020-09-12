import { GuidData } from "../../../Helpers/GuidData";
import { IDataStateOfSitecoreWindow } from "../../Data/IDataOneWindowStorage";
import { IDataStateOfSnapShots } from "../../Data/IDataSnapShots";

export interface IContentAtticAgent {
  WriteStateOfSitecoreToStorage(storageMatch: IDataStateOfSitecoreWindow);
  RemoveSnapshotFromStorageById(TargetSnapShotId: GuidData);
  WriteStateOfSitecoreToStorage(storageMatch: IDataStateOfSitecoreWindow);
  GetStateOfSnapShots(): IDataStateOfSnapShots;
  InitContentAtticManager(retainDayCount: number);
  GetFromStorageById(targetGuid: GuidData): IDataStateOfSitecoreWindow;
}