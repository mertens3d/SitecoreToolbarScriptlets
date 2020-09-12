import { MsgFlag } from "../../Enums/1xxx-MessageFlag";
import { IError } from "../IError";
import { IDataStateOfSitecoreWindow } from "./IDataOneWindowStorage";

export interface IDataContentReplyPayload {
  ErrorStack: IError[];
  LastReq: MsgFlag;
  LastReqSuccessful: boolean;
  StateOfSitecoreWindow: IDataStateOfSitecoreWindow;

}