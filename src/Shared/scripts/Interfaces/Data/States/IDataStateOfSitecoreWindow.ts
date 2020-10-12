import { IRootState } from './IStateOfScWindow';
import { IDataFriendly } from "./IDataFriendly";
import { IDataMetaData } from "./IDataMetaData";
import { IError } from '../../IError';

export interface IStateOfScUi {
  ErrorStack: IError[];
  Friendly: IDataFriendly;
  Meta: IDataMetaData;
  State: IRootState;
  StorageSchema: string;
}