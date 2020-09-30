import { IStateOfScWindowProxy } from './IDataStates';
import { IDataFriendly } from "./IDataFriendly";
import { IDataMetaData } from "./IDataMetaData";
import { IError } from '../../IError';
export interface IStateOfScUiProxy {
    ErrorStackScUiProxy: IError[];
    Friendly: IDataFriendly;
    Meta: IDataMetaData;
    StateOfScWindowProxy: IStateOfScWindowProxy;
}
