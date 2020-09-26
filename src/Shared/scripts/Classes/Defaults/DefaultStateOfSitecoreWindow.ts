import { ScWindowType } from "../../Enums/scWindowType";
import { SnapShotFlavor } from "../../Enums/SnapShotFlavor";
import { IDataFriendly } from "../../Interfaces/Data/States/IDataFriendly";
import { IDataMetaData } from "../../Interfaces/Data/States/IDataMetaData";
import { IDataStateOfSitecoreWindow } from "../../Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataSitecoreWindowStates } from "../../Interfaces/Data/States/IDataStates";
import { StaticHelpers } from "../StaticHelpers";
import { DefaultStateOfDesktop } from "./DefaultStateOfDesktop";
import { Guid } from "../../Helpers/Guid";
import { DefaultStateOfContentEditor } from "./DefaultStateOfContentEditor";
import { IError } from "../../Interfaces/IError";

export class DefaultFriendly implements IDataFriendly {
  Flavor = SnapShotFlavor[SnapShotFlavor.Live];
  NickName = '';
  TimeStamp = '';
  WindowType = ScWindowType[ScWindowType.Unknown];
}

export class DefaultMetaData implements IDataMetaData {
  Flavor = SnapShotFlavor.Live;
  SessionId = '';
  SnapshotId = Guid.NewRandomGuid();
  StorageKey = '';
  TimeStamp = null;
  WindowType = ScWindowType.Unknown;
}

export class DefaultScWindowStates implements IDataSitecoreWindowStates {
  StateOfContentEditor = new DefaultStateOfContentEditor;
  StateOfDesktop = new DefaultStateOfDesktop();
}
export class DefaultStateOfSitecoreWindow implements IDataStateOfSitecoreWindow {
  Friendly = new DefaultFriendly();
  Meta = new DefaultMetaData();
  ScWindowStates: IDataSitecoreWindowStates = new DefaultScWindowStates();
  ErrorStack: IError[] = [];

  constructor() {
    this.Meta.TimeStamp = new Date();
    this.Friendly.TimeStamp = StaticHelpers.MakeFriendlyDate(this.Meta.TimeStamp);
  }
}