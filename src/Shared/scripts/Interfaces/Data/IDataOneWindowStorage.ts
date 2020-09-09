import { IOneStorageData } from '.././IOneStorageData';
import { IDataOneStorageOneTreeState } from './IDataOneStorageOneTreeState';
import { ScWindowType } from '../../Enums/scWindowType';
import { SnapShotFlavor } from '../../Enums/SnapShotFlavor';
import { GuidData } from "../../Helpers/GuidData";

export interface IDataOneWindowStorage {
  AllCEAr: IDataOneStorageOneTreeState[],
  GuidId: GuidData,
  Flavor: SnapShotFlavor;
  NickName: string
  RawData: IOneStorageData,
  TimeStamp: Date,
  TimeStampFriendly: string,
  WindowFriendly: string,
  WindowType: ScWindowType,
}