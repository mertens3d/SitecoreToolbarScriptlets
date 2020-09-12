import { MsgFlag } from "../../Enums/1xxx-MessageFlag";
import { IError } from "../IError";
import { IDataStateOfSitecoreWindow } from "../Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from "../Data/States/IDataStateOfStorageSnapShots";

export interface IDataContentReplyReceivedEvent_Payload {
  ErrorStack: IError[];
  LastReq: MsgFlag;
  LastReqSuccessful: boolean;
  StateOfSitecoreWindow: IDataStateOfSitecoreWindow;
  StateOfStorageSnapShots: IDataStateOfStorageSnapShots;
}