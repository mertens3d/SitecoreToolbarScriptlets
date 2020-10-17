import { IStateOfScUi } from "../../Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { IRootState } from "../../Interfaces/StateOf/IStateOfScWindow";
import { StaticHelpers } from "../StaticHelpers";
import { IError } from "../../Interfaces/IError";
import { DefaultFriendly } from "./DefaultFriendly";
import { DefaultMetaData } from "./DefaultMetaData";
import { DefaultStateOfScWindow } from "./DefaultStateOfScWindowProxy";

export class DefaultStateOfScUiProxy implements IStateOfScUi {
  Friendly = new DefaultFriendly();
  Meta = new DefaultMetaData();
  ErrorStack: IError[] = [];
  State: IRootState = new DefaultStateOfScWindow();
  StorageSchema = '2020.10.09.20:19';

  constructor() {
    this.Meta.TimeStamp = new Date();
    this.Friendly.TimeStamp = StaticHelpers.MakeFriendlyDate(this.Meta.TimeStamp);
  }
}