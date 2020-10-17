import { ReqCommandMsgFlag } from "../../../../Shared/scripts/Enums/10 - MessageFlag";
import { IError } from "../../../../Shared/scripts/Interfaces/IError";
import { IStateOfScUi } from "../../Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../Interfaces/StateOf/IStateOfStorageSnapShots";

export interface IControllerMessageReceivedEvent_Payload {
  ErrorStack: IError[];
  LastReq: ReqCommandMsgFlag;
  LastReqFriendly: string;
  LastReqSuccessful: boolean;
  StateOfScUiProxy_Live: IStateOfScUi;
  StateOfStorageSnapShots: IStateOfStorageSnapShots;
}