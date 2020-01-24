import { scWindowType } from '../../jsContent/Enums/scWindowType';
import { IDataOneStorageCE } from '../../jsContent/Interfaces/IDataOneStorageCE';
import { IGuid } from './IGuid';
import { IOneStorageData } from './IOneStorageData';

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

