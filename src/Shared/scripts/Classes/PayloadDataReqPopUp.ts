import { IDataPayloadSnapShot } from "../Interfaces/IDataPayloadSnapShot";
import { Guid } from "../Helpers/Guid";

export class PayloadDataFromPopUp {
  IdOfSelect: Guid;
  ScreenMessage: string;
  SnapShotSettings: IDataPayloadSnapShot;
}