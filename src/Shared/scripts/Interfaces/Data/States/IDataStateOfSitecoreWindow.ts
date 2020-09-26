import { IDataSitecoreWindowStates } from './IDataStates';
import { IDataFriendly } from "./IDataFriendly";
import { IDataMetaData } from "./IDataMetaData";
export interface IDataStateOfSitecoreWindow {
    ErrorStack: import("C:/projects/SitecoreToolbarScriptlets/src/Shared/scripts/Interfaces/IError").IError[];
    Friendly: IDataFriendly;
    Meta: IDataMetaData;
    ScWindowStates: IDataSitecoreWindowStates;
}
