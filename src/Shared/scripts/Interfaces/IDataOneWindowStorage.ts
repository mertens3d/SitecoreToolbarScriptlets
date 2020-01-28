import { IGuid } from './IGuid';
import { IOneStorageData } from './IOneStorageData';
import { IDataOneStorageCE } from './IDataOneStorageCE';
import { scWindowType } from '../Enums/scWindowType';

export interface IDataOneWindowStorage {
  RawData: IOneStorageData ,
  TimeStamp: Date,
  WindowType: scWindowType,
  WindowFriendly: string,
  AllCEAr: IDataOneStorageCE[],
  Id: IGuid,
  IsFavorite: Boolean,
  NickName: string

}

