import { MsgFlag } from "../../Enums/1xxx-MessageFlag";
import { IError } from "../IError";
import { IDataStateOfSitecoreWindow } from "./IDataOneWindowStorage";
import { IDataStateOfSnapShots } from "./IDataSnapShots";

export interface IDataContentReplyPayload {
  ErrorStack: IError[];
  LastReq: MsgFlag;
  LastReqSuccessful: boolean;
  StateOfSitecoreWindow: IDataStateOfSitecoreWindow;
  StateOfSnapShots: IDataStateOfSnapShots;

}