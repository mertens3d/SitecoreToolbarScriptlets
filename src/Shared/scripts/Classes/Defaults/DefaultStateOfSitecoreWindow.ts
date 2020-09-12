
import { ScWindowType } from "../../Enums/scWindowType";
import { SnapShotFlavor } from "../../Enums/SnapShotFlavor";
import { Guid } from "../../Helpers/Guid";
import { IDataStateOfSitecoreWindow } from "../../Interfaces/Data/IDataOneWindowStorage";
import { IDataStateOfSnapShots } from "../../Interfaces/Data/IDataSnapShots";
import { StaticHelpers } from "../StaticHelpers";
import { DefaultStateOfSnapshots } from "./DefaultStateOfSnapshots";
import { DefaultStateOfDesktop } from "./DefaultStateOfDesktop";


export class DefaultStateOfSitecoreWindow implements IDataStateOfSitecoreWindow {
  StateOfSnapShots: IDataStateOfSnapShots = new DefaultStateOfSnapshots();
  private dateToUse: Date = new Date();

  StateOfContentEditor = null;
  StateOfDesktop = new DefaultStateOfDesktop();
  TimeStamp = this.dateToUse;
  TimeStampFriendly = StaticHelpers.MakeFriendlyDate(this.dateToUse);
  WindowType = ScWindowType.Unknown;
  WindowFriendly = ScWindowType[ScWindowType.Unknown];
  GuidId = Guid.NewRandomGuid();
  NickName = '';
  RawData = null;
  Flavor = SnapShotFlavor.Unknown;
}
