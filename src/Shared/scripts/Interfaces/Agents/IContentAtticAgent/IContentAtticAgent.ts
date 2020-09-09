import { GuidData } from "../../../Helpers/GuidData";
import { IDataOneWindowStorage } from "../../Data/IDataOneWindowStorage";

export interface IContentAtticAgent {
  WriteToStorage(storageMatch: IDataOneWindowStorage);
  RemoveSnapshotFromStorageById(TargetSnapShotId: GuidData);
  WriteToStorage(storageMatch: IDataOneWindowStorage);
  GetAllSnapShotsMany();
  InitContentAtticManager(arg0: number);
  GetFromStorageById(targetGuid: GuidData);
}