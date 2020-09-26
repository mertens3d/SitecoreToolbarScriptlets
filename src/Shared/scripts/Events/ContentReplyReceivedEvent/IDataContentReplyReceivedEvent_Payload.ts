import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { IError } from "../../../../Shared/scripts/Interfaces/IError";
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfStorageSnapShots";

export interface IDataContentReplyReceivedEvent_Payload {
  ErrorStack: IError[];
  LastReq: MsgFlag;
  LastReqFriendly: string;
  LastReqSuccessful: boolean;
  StateOfSitecoreWindow: IDataStateOfSitecoreWindow;
  StateOfStorageSnapShots: IDataStateOfStorageSnapShots;
}