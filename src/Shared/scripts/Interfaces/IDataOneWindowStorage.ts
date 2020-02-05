import { IGuid } from './IGuid';
import { IOneStorageData } from './IOneStorageData';
import { IDataOneStorageCE } from './IDataOneStorageCE';
import { scWindowType } from '../Enums/scWindowType';

export interface IDataOneWindowStorage {
  AllCEAr: IDataOneStorageCE[],
  Id: IGuid,
  IsAutoSave: boolean;
  IsFavorite: Boolean,
  NickName: string
  RawData: IOneStorageData,
  TimeStamp: Date,
  WindowFriendly: string,
  WindowType: scWindowType,
}