import { MsgFlag } from "../../Enums/1xxx-MessageFlag";
import { IError } from "../../Interfaces/IError";
import { DefaultStateOfScUiProxy } from "./DefaultStateOfSitecoreWindow";
import { DefaultStateOfStorageSnapshots } from "./DefaultStateOfSnapshots";
import { IControllerMessageReceivedEvent_Payload, IMessageContentToController_Payload } from "../../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IStateOfStorageSnapShots } from "../../Interfaces/Data/States/IDataStateOfStorageSnapShots";
import { IStateOfScUiProxy } from "../../Interfaces/Data/States/IDataStateOfSitecoreWindow";

export class DefaultMessageContentToController_Payload implements IMessageContentToController_Payload {
  StateOfStorageSnapShots: IStateOfStorageSnapShots = new DefaultStateOfStorageSnapshots();
  ErrorStack: []
  LastReqFriendly: string;
  LastReq: MsgFlag;
  StateOfScUiProxy_Live: IStateOfScUiProxy;
}

export class DefaultControllerMessageReceivedEvent_Payload implements IControllerMessageReceivedEvent_Payload {
  ErrorStack: IError[] = [];
  LastReq = MsgFlag.Unknown;
  LastReqFriendly: string = MsgFlag[MsgFlag.Unknown];
  LastReqSuccessful = false;
  StateOfScUiProxy_Live = new DefaultStateOfScUiProxy();
  StateOfStorageSnapShots = new DefaultStateOfStorageSnapshots();
};