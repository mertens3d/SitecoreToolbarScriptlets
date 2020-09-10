import { GuidData } from "../../../Helpers/GuidData";
import { IDataOneWindowStorage } from "../../Data/IDataOneWindowStorage";

export interface IContentAtticAgent {
  WriteStateToStorage(storageMatch: IDataOneWindowStorage);
  RemoveSnapshotFromStorageById(TargetSnapShotId: GuidData);
  WriteStateToStorage(storageMatch: IDataOneWindowStorage);
  GetAllSnapShotsMany();
  InitContentAtticManager(retainDayCount: number);
  GetFromStorageById(targetGuid: GuidData): IDataOneWindowStorage;
}