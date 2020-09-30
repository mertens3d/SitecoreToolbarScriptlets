import { IStateOfScUiProxy } from "../../Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IStateOfScWindow } from "../../Interfaces/Data/States/IStateOfScWindow";
import { StaticHelpers } from "../StaticHelpers";
import { IError } from "../../Interfaces/IError";
import { DefaultFriendly } from "./DefaultFriendly";
import { DefaultMetaData } from "./DefaultMetaData";
import { DefaultStateOfScWindowProxy } from "./DefaultStateOfScWindowProxy";

export class DefaultStateOfScUiProxy implements IStateOfScUiProxy {
    Friendly = new DefaultFriendly();
    Meta = new DefaultMetaData();
    ErrorStackScUiProxy: IError[] = [];
    StateOfScWindowProxy: IStateOfScWindow = new DefaultStateOfScWindowProxy();

    constructor() {
        this.Meta.TimeStamp = new Date();
        this.Friendly.TimeStamp = StaticHelpers.MakeFriendlyDate(this.Meta.TimeStamp);
    }
}
