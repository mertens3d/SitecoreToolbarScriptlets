import { IGuid } from './IGuid';
import { IOneStorageData } from './IOneStorageData';
import { IDataOneStorageOneTreeState } from './IDataOneStorageOneTreeState';
import { scWindowType } from '../Enums/scWindowType';
import { SnapShotFlavor } from '../Enums/SnapShotFlavor';

export interface IDataOneWindowStorage {
  AllCEAr: IDataOneStorageOneTreeState[],
  Id: IGuid,
  Flavor: SnapShotFlavor;
  NickName: string
  RawData: IOneStorageData,
  TimeStamp: Date,
  TimeStampFriendly: string,
  WindowFriendly: string,
  WindowType: scWindowType,
  TimeNicknameFavStr: string
}