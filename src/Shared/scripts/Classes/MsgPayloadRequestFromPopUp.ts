import { MsgFlag } from "../Enums/MessageFlag";
import { PayloadDataFromPopUp } from "./PayloadDataReqPopUp";
import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";
import { IDataContentPrefs } from "../Interfaces/IDataContentPrefs";

export class MsgFromPopUp extends MsgFromXBase implements IMsgFromX {
  CurrentContentPrefs: IDataContentPrefs;
  Data: PayloadDataFromPopUp;
  IsValid: boolean;

  constructor(msgFlag: MsgFlag) {
    super(msgFlag);
    this.Data = new PayloadDataFromPopUp();
  }
}