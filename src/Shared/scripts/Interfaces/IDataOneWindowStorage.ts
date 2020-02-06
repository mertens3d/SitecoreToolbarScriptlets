import { IGuid } from './IGuid';
import { IOneStorageData } from './IOneStorageData';
import { IDataOneStorageCE } from './IDataOneStorageCE';
import { scWindowType } from '../Enums/scWindowType';
import { SnapShotFlavor } from '../Enums/SnapShotFlavor';

export interface IDataOneWindowStorage {
  AllCEAr: IDataOneStorageCE[],
  Id: IGuid,
  Flavor: SnapShotFlavor;
  NickName: string
  RawData: IOneStorageData,
  TimeStamp: Date,
  WindowFriendly: string,
  WindowType: scWindowType,
}