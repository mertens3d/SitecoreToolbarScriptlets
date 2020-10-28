import { IError } from "../../Interfaces/IError";
import { IStateOfScUi } from "../../Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { IWindowStateTree } from "../../Interfaces/StateOf/IRootState";
import { StaticHelpers } from "../StaticHelpers";
import { DefaultFriendly } from "./DefaultFriendly";
import { DefaultMetaData } from "./DefaultMetaData";
import { DefaultStateOfRoot } from "./DefaultStateOfStateOfScWindowProxy";

export class DefaultStateOfScUiProxy implements IStateOfScUi {
  Friendly = new DefaultFriendly();
  Meta = new DefaultMetaData();
  ErrorStack: IError[] = [];
  WindowState: IWindowStateTree = new DefaultStateOfRoot();
  StorageSchema = '2020.10.09.20:19';

  constructor() {
    this.Meta.TimeStamp = new Date();
    this.Friendly.TimeStamp = StaticHelpers.MakeFriendlyDate(this.Meta.TimeStamp);
  }
}