import { GuidData } from "../../../Helpers/GuidData";
import { IDataStateOfSitecore } from "../../Data/IDataOneWindowStorage";

export interface IContentAtticAgent {
  WriteStateOfSitecoreToStorage(storageMatch: IDataStateOfSitecore);
  RemoveSnapshotFromStorageById(TargetSnapShotId: GuidData);
  WriteStateOfSitecoreToStorage(storageMatch: IDataStateOfSitecore);
  GetAllSnapShotsMany();
  InitContentAtticManager(retainDayCount: number);
  GetFromStorageById(targetGuid: GuidData): IDataStateOfSitecore;
}