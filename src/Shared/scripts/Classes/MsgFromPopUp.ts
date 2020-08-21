import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { PayloadDataFromPopUp } from "./PayloadDataReqPopUp";
import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";
import { PopUpHub } from "../../../PopUp/scripts/Managers/PopUpHub";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { IOneGenericSetting } from "../Interfaces/Agents/IOneGenericSetting";
export class MsgFromPopUp extends MsgFromXBase implements IMsgFromX {
    CurrentContentPrefs: IOneGenericSetting[];
    Data: PayloadDataFromPopUp;
    IsValid: boolean;
    constructor(msgFlag: MsgFlag, popHub: PopUpHub) {
        super(msgFlag);
        this.Data = new PayloadDataFromPopUp();
        this.Data.IdOfSelect = popHub.UiMan.CurrentMenuState.SelectSnapshotId;
        this.Data.SnapShotSettings = {
            SnapShotNewNickname: '',
            Flavor: SnapShotFlavor.Unknown,
            CurrentPageType: popHub.TabMan.CurrentTabData.UrlParts.ScWindowType
        };

      this.CurrentContentPrefs = popHub._allAgents.SettingsAgent.GetOnlyContentPrefs();
  }





}
