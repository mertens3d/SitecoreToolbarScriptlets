import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { scWindowType } from "../Enums/scWindowType";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { IOneGenericSetting } from "../Interfaces/Agents/IOneGenericSetting";
import { IGuid } from "../Interfaces/IGuid";
import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";
import { PayloadDataFromPopUp } from "./PayloadDataReqPopUp";
export class MsgFromPopUp extends MsgFromXBase implements IMsgFromX {
    CurrentContentPrefs: IOneGenericSetting[];
    Data: PayloadDataFromPopUp;
  IsValid: boolean;
  constructor(msgFlag: MsgFlag, scWindowType: scWindowType, selectSnapshotId: IGuid, contentPrefs: IOneGenericSetting[]) {
        super(msgFlag);
        this.Data = new PayloadDataFromPopUp();
        this.Data.IdOfSelect = selectSnapshotId;
        this.Data.SnapShotSettings =  {
            SnapShotNewNickname: '',
            Flavor: SnapShotFlavor.Unknown,
          CurrentPageType: scWindowType
        };

    this.CurrentContentPrefs = contentPrefs;
  }





}
