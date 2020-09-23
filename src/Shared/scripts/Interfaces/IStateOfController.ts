import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { GuidData } from "../Helpers/GuidData";
import { IHindSiteSetting } from "./Agents/IGenericSetting";

export interface IMessageControllerToContent {
  SnapShotNewNickname: string;
  SelectSnapshotId: GuidData;
  IsValid: boolean;
  CurrentContentPrefs: IHindSiteSetting[];
  MsgFlag: MsgFlag;
}