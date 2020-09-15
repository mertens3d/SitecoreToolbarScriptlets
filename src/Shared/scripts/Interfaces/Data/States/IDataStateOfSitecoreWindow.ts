import { IDataSitecoreWindowStates } from './IDataStates';
import { IDataFriendly } from "./IDataFriendly";
import { IDataMetaData } from "./IDataMetaData";
export interface IDataStateOfSitecoreWindow {
    Friendly: IDataFriendly;
    Meta: IDataMetaData;
    ScWindowStates: IDataSitecoreWindowStates;
}
