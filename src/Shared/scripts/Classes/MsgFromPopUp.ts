//import { MsgFlag } from "../Enums/1xxx-MessageFlag";
//import { ScWindowType } from "../Enums/scWindowType";
//import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
//import { IGenericSetting } from "../Interfaces/Agents/IGenericSetting";
//import { IMsgFromX } from "../Interfaces/IMsgPayload";
//import { MsgFromXBase } from "./MsgFromXBase";
//import { PayloadDataFromPopUp } from "./PayloadDataReqPopUp";
//import { GuidData } from "../Helpers/GuidData";

//export class MsgFromPopUp extends MsgFromXBase implements IMsgFromX {
//  CurrentContentPrefs: IGenericSetting[];
//  Payload: PayloadDataFromPopUp;
//  IsValid: boolean;

//  constructor(msgFlag: MsgFlag, scWindowType: ScWindowType, selectSnapshotId: GuidData, contentPrefs: IGenericSetting[]) {
//    super(msgFlag);
//    this.Payload = new PayloadDataFromPopUp();
//    this.Payload.IdOfSelect = selectSnapshotId;
//    this.Payload.SnapShotSettings = {
//      SnapShotNewNickname: '',
//      Flavor: SnapShotFlavor.Unknown,
//      CurrentPageType: scWindowType
//    };

//    this.CurrentContentPrefs = contentPrefs;
//  }
//}