import { SnapShotFlavor } from "../../Enums/SnapShotFlavor";
import { ScWindowType } from "../../Enums/scWindowType";

export interface IDataPayloadSnapShot {
  SnapShotNewNickname: string;
  Flavor: SnapShotFlavor;
  CurrentPageType: ScWindowType;
}
