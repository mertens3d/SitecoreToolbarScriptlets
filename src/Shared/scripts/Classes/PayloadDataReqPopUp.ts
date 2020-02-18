import { IScMode } from "../Interfaces/IscMode";
import { IGuid } from "../Interfaces/IGuid";
import { IDataPayloadSnapShot } from "./IDataPayloadSnapShot";

export class PayloadDataFromPopUp {
  IdOfSelect: IGuid;
  ScreenMessage: string;
  SnapShotSettings: IDataPayloadSnapShot;
}