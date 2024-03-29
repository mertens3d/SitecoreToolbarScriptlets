﻿import { ReqCommandMsgFlag } from "../../../../Shared/scripts/Enums/10 - MessageFlag";
import { IStateOfScUi } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../../../Shared/scripts/Interfaces/Data/States/IStateOfStorageSnapShots";

export interface IMessageContentToController_Payload {
    StateOfStorageSnapShots: IStateOfStorageSnapShots;
    ErrorStack: string[];
    LastReqFriendly: string;
    LastReq: ReqCommandMsgFlag;
    StateOfScUiProxy_Live: IStateOfScUi;
}
