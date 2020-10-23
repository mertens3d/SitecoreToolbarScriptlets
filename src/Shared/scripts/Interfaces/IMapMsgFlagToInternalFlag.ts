import { ReqCommandMsgFlag } from "../Enums/10 - MessageFlag";
import { InternalCommandFlag } from "../Enums/InternalCommand";

export interface IMapMsgFlagToInternalFlag {
  MsgFlag: ReqCommandMsgFlag;
  InternalCommand: InternalCommandFlag;
}