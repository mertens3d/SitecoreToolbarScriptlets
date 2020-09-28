import { IDataStateOfSitecoreWindow } from './IDataStates';
import { IDataFriendly } from "./IDataFriendly";
import { IDataMetaData } from "./IDataMetaData";
import { IError } from '../../IError';
export interface IDataStateOfLiveHindSite {
    ErrorStack: IError[];
    Friendly: IDataFriendly;
    Meta: IDataMetaData;
    StateOfSitecoreWindow: IDataStateOfSitecoreWindow;
}
