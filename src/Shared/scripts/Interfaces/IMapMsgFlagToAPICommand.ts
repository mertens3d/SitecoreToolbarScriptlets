import { ReqCommandMsgFlag } from "../Enums/10 - MessageFlag";
import { APICommandFlag } from "../Enums/APICommand";

export interface IMapMsgFlagToAPICommand {
  MsgFlag: ReqCommandMsgFlag;
  APICommand: APICommandFlag;
}