import { scWindowType } from '../Enums/scWindowType';
import { IDataOneStorageCE } from '../Interfaces/IDataOneStorageCE';

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

