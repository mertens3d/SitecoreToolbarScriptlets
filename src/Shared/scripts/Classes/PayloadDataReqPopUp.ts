import { IsScMode } from "../Interfaces/IscMode";
import { IGuid } from "../Interfaces/IGuid";
import { IDataPayloadSnapShot } from "./IDataPayloadSnapShot";

export class PayloadDataFromPopUp {
  IdOfSelect: IGuid;
  ReqScMode: IsScMode;
  ScreenMessage: string;
  SnapShotSettings: IDataPayloadSnapShot;
  UseOriginalWindowLocation: boolean;

}