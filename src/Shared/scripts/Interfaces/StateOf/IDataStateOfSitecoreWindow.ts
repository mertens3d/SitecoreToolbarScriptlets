import { IError } from '../IError';
import { IDataFriendly } from "./IDataFriendly";
import { IDataMetaData } from "./IDataMetaData";
import { IWindowStateTree } from "./IRootState";

export interface IStateOfScUi {
  ErrorStack: IError[];
  Friendly: IDataFriendly;
  Meta: IDataMetaData;
  WindowState: IWindowStateTree;
  StorageSchema: string;
}