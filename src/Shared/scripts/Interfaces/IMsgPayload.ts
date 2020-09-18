import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { ScWindowType } from "../Enums/scWindowType";
import { GuidData } from "../Helpers/GuidData";
import { IHindSiteSetting } from "./Agents/IGenericSetting";

export interface IStateOfPopUp {
  IsValid: boolean;
  CurrentContentPrefs: IHindSiteSetting[];
  MsgFlag: MsgFlag;
  WindowType: ScWindowType
  SelectSnapshotId: GuidData;
  CurrentNicknameValue: string;
  ToastMessage: string;
  SnapShotNewNickname: string;
}

export interface IMsgFromX {
  MsgFlag: MsgFlag;
  Payload: any;
}