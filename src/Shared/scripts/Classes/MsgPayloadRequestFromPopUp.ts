import { MsgFlag } from "../Enums/MessageFlag";
import { PayloadDataFromPopUp } from "./PayloadDataReqPopUp";
import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";
import { IDataContentPrefs } from "../Interfaces/IDataContentPrefs";
import { PopUpHub } from "../../../PopUp/scripts/Managers/PopUpHub";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";

export class MsgFromPopUp extends MsgFromXBase implements IMsgFromX {
  CurrentContentPrefs: IDataContentPrefs;
  Data: PayloadDataFromPopUp;
  IsValid: boolean;

  constructor(msgFlag: MsgFlag, popHub: PopUpHub) {
    super(msgFlag);
    this.Data = new PayloadDataFromPopUp();
    this.Data.IdOfSelect = popHub.UiMan.GetIdOfSelectWindowSnapshot();

    this.Data.SnapShotSettings = {
      SnapShotNewNickname: '',
      Flavor: SnapShotFlavor.Unknown,
      CurrentPageType: popHub.PageMan.GetCurrentPageType()
    }



    popHub.debug.Log('constructor done msgfrompopup');
  }
}