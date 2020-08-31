import { IOneStorageData } from './IOneStorageData';
import { IDataOneStorageOneTreeState } from './IDataOneStorageOneTreeState';
import { scWindowType } from '../Enums/scWindowType';
import { SnapShotFlavor } from '../Enums/SnapShotFlavor';
import { Guid } from '../Helpers/Guid';

export interface IDataOneWindowStorage {
  AllCEAr: IDataOneStorageOneTreeState[],
  Id: Guid,
  Flavor: SnapShotFlavor;
  NickName: string
  RawData: IOneStorageData,
  TimeStamp: Date,
  TimeStampFriendly: string,
  WindowFriendly: string,
  WindowType: scWindowType,
}