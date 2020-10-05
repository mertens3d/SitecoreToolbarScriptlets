import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { IStateOfScUi } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../../../Shared/scripts/Interfaces/Data/States/IStateOfStorageSnapShots";

export interface IMessageContentToController_Payload {
    StateOfStorageSnapShots: IStateOfStorageSnapShots;
    ErrorStack: string[];
    LastReqFriendly: string;
    LastReq: MsgFlag;
    StateOfScUiProxy_Live: IStateOfScUi;
}
