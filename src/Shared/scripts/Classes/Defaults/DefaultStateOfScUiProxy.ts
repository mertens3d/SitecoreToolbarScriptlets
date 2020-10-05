import { IStateOfScUi } from "../../Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IStateOfScWindow } from "../../Interfaces/Data/States/IStateOfScWindow";
import { StaticHelpers } from "../StaticHelpers";
import { IError } from "../../Interfaces/IError";
import { DefaultFriendly } from "./DefaultFriendly";
import { DefaultMetaData } from "./DefaultMetaData";
import { DefaultStateOfScWindow } from "./DefaultStateOfScWindowProxy";

export class DefaultStateOfScUiProxy implements IStateOfScUi {
    Friendly = new DefaultFriendly();
    Meta = new DefaultMetaData();
    ErrorStackScUiProxy: IError[] = [];
    StateOfScWindow: IStateOfScWindow = new DefaultStateOfScWindow();

    constructor() {
        this.Meta.TimeStamp = new Date();
        this.Friendly.TimeStamp = StaticHelpers.MakeFriendlyDate(this.Meta.TimeStamp);
    }
}
