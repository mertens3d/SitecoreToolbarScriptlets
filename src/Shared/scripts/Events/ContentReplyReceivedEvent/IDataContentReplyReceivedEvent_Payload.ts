﻿import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { IError } from "../../../../Shared/scripts/Interfaces/IError";
import { IStateOfScUiProxy } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfStorageSnapShots";

export interface IMessageContentToController_Payload {
    StateOfStorageSnapShots: IStateOfStorageSnapShots;
    ErrorStack: string[];
    LastReqFriendly: string;
    LastReq: MsgFlag;
    StateOfScUiProxy_Live: IStateOfScUiProxy;


}

export interface IControllerMessageReceivedEvent_Payload {
  ErrorStack: IError[];
  LastReq: MsgFlag;
  LastReqFriendly: string;
  LastReqSuccessful: boolean;
  StateOfScUiProxy_Live: IStateOfScUiProxy;
  StateOfStorageSnapShots: IStateOfStorageSnapShots;
}