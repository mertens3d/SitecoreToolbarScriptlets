import { MsgFlag } from "../../../../Shared/scripts/Enums/10 - MessageFlag";
import { IError } from "../../../../Shared/scripts/Interfaces/IError";
import { IStateOfScUi } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../../../Shared/scripts/Interfaces/Data/States/IStateOfStorageSnapShots";

export interface IControllerMessageReceivedEvent_Payload {
  ErrorStack: IError[];
  LastReq: MsgFlag;
  LastReqFriendly: string;
  LastReqSuccessful: boolean;
  StateOfScUiProxy_Live: IStateOfScUi;
  StateOfStorageSnapShots: IStateOfStorageSnapShots;
}