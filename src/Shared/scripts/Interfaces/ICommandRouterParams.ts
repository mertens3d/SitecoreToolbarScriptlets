import { GuidData } from "../Helpers/GuidData";
import { ReqCommandMsgFlag } from "../Enums/10 - MessageFlag";

export interface ICommandRouterParams {
  NewNickName: string,
  SelectSnapShotId: GuidData,
  MsgFlag: ReqCommandMsgFlag,
  SelectText: string,
}