import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { scWindowType } from "../Enums/scWindowType";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { IGenericSetting } from "../Interfaces/Agents/IGenericSetting";
import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";
import { PayloadDataFromPopUp } from "./PayloadDataReqPopUp";
import { GuidData } from "../Helpers/GuidData";

export class MsgFromPopUp extends MsgFromXBase implements IMsgFromX {
  CurrentContentPrefs: IGenericSetting[];
  Data: PayloadDataFromPopUp;
  IsValid: boolean;

  constructor(msgFlag: MsgFlag, scWindowType: scWindowType, selectSnapshotId: GuidData, contentPrefs: IGenericSetting[]) {
    super(msgFlag);
    this.Data = new PayloadDataFromPopUp();
    this.Data.IdOfSelect = selectSnapshotId;
    this.Data.SnapShotSettings = {
      SnapShotNewNickname: '',
      Flavor: SnapShotFlavor.Unknown,
      CurrentPageType: scWindowType
    };

    this.CurrentContentPrefs = contentPrefs;
  }
}