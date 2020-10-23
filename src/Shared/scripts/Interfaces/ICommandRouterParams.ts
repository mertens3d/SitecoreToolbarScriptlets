import { GuidData } from "../Helpers/GuidData";
import { ReqCommandMsgFlag } from "../Enums/10 - MessageFlag";
import { IStateOfScUi } from "./StateOf/IDataStateOfSitecoreWindow";

export interface ICommandRouterParams {
  NewNickName: string,
  SelectSnapShotId: GuidData,
  ReqMsgFlag: ReqCommandMsgFlag,
  ReqMsgFlagFriendly: string,
  SelectText: string,
  StateSnapShot: IStateOfScUi,
}