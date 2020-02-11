import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { scWindowType } from "../Enums/scWindowType";

export interface IDataPayloadSnapShot {
  SnapShotNewNickname: string;
  Flavor: SnapShotFlavor;
  CurrentPageType: scWindowType;
}
