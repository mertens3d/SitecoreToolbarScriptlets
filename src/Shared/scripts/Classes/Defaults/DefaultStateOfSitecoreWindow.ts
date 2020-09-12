import { ScWindowType } from "../../Enums/scWindowType";
import { SnapShotFlavor } from "../../Enums/SnapShotFlavor";
import { IDataStateOfSitecoreWindow, IDataMetaData, IDataFriendly } from "../../Interfaces/Data/IDataOneWindowStorage";
import { StaticHelpers } from "../StaticHelpers";
import { DefaultStateOfDesktop } from "./DefaultStateOfDesktop";
import { Guid } from "../../Helpers/Guid";

export class DefaultFriendly implements IDataFriendly {
  Flavor = SnapShotFlavor[SnapShotFlavor.Unknown];
  NickName = '';
  TimeStamp = '';
  WindowType = ScWindowType[ScWindowType.Unknown];
}

export class DefaultMetaData implements IDataMetaData {
  Flavor = SnapShotFlavor.Unknown;
  SessionId = '';
  SnapshotId = Guid.NewRandomGuid();
  StorageKey = '';
  TimeStamp = null;
  WindowType = ScWindowType.Unknown;
}

export class DefaultStateOfSitecoreWindow implements IDataStateOfSitecoreWindow {
  Friendly = new DefaultFriendly();
  Meta = new DefaultMetaData();
  StateOfContentEditor = null;
  StateOfDesktop = new DefaultStateOfDesktop();

  constructor() {
    this.Meta.TimeStamp = new Date();
    this.Friendly.TimeStamp = StaticHelpers.MakeFriendlyDate(this.Meta.TimeStamp);
  }
}