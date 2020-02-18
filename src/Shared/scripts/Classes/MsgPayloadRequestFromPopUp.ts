import { MsgFlag } from "../Enums/MessageFlag";
import { PayloadDataFromPopUp } from "./PayloadDataReqPopUp";
import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";
import { PopUpHub } from "../../../PopUp/scripts/Managers/PopUpHub";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { IOneGenericSetting } from "./OneSetting";

export class MsgFromPopUp extends MsgFromXBase implements IMsgFromX {
  CurrentContentPrefs: IOneGenericSetting[];
  Data: PayloadDataFromPopUp;
  IsValid: boolean;

  constructor(msgFlag: MsgFlag, popHub: PopUpHub) {
    super(msgFlag);
    this.Data = new PayloadDataFromPopUp();
    this.Data.IdOfSelect = popHub.UiMan.GetIdOfSelectWindowSnapshot();

    this.Data.SnapShotSettings = {
      SnapShotNewNickname: '',
      Flavor: SnapShotFlavor.Unknown,
      CurrentPageType: popHub.TabMan.CurrentTabData.UrlParts.ScWindowType
    }

    popHub.Log.Log('constructor done msgfrompopup');
  }
}