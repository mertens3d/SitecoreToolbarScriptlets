import { IStateOfScWindow } from './IStateOfScWindow';
import { IDataFriendly } from "./IDataFriendly";
import { IDataMetaData } from "./IDataMetaData";
import { IError } from '../../IError';
export interface IStateOfScUiProxy {
    ErrorStackScUiProxy: IError[];
    Friendly: IDataFriendly;
    Meta: IDataMetaData;
    StateOfScWindow: IStateOfScWindow;
}
