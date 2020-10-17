import { ReqCommandMsgFlag } from "../../../../Shared/scripts/Enums/10 - MessageFlag";
import { IStateOfScUi } from "../../Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../Interfaces/StateOf/IStateOfStorageSnapShots";

export interface IMessageContentToController_Payload {
    StateOfStorageSnapShots: IStateOfStorageSnapShots;
    ErrorStack: string[];
    LastReqFriendly: string;
    LastReq: ReqCommandMsgFlag;
    StateOfScUiProxy_Live: IStateOfScUi;
}
