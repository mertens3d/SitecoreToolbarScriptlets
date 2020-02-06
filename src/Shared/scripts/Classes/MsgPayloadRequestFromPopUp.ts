import { MsgFlag } from "../Enums/MessageFlag";
import { PayloadDataFromPopUp } from "./PayloadDataReqPopUp";
import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";
import { IDataContentPrefs } from "../Interfaces/IDataContentPrefs";
import { PopUpHub } from "../../../PopUp/scripts/Managers/PopUpHub";

export class MsgFromPopUp extends MsgFromXBase implements IMsgFromX {
  CurrentContentPrefs: IDataContentPrefs;
  Data: PayloadDataFromPopUp;
  IsValid: boolean;

  constructor(msgFlag: MsgFlag, popHub: PopUpHub) {
    super(msgFlag);
    this.Data = new PayloadDataFromPopUp();
    this.Data.IdOfSelect = popHub.UiMan.GetIdOfSelectWindowSnapshot();
  }
}