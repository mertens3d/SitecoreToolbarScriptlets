import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IMessageControllerToContent } from "./IStateOfController";

export interface IMessageContentToController {
  MsgFlag: MsgFlag;
  Payload: any;
}