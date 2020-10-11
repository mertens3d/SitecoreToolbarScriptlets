import { ReqCommandMsgFlag } from "../../Enums/10 - MessageFlag";
import { IError } from "../../Interfaces/IError";
import { DefaultStateOfScUiProxy } from "./DefaultStateOfScUiProxy";
import { DefaultStateOfStorageSnapshots } from "./DefaultStateOfSnapshots";
import { IControllerMessageReceivedEvent_Payload } from "../../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

export class DefaultControllerMessageReceivedEvent_Payload implements IControllerMessageReceivedEvent_Payload {
  ErrorStack: IError[] = [];
  LastReq = ReqCommandMsgFlag.Unknown;
  LastReqFriendly: string = ReqCommandMsgFlag[ReqCommandMsgFlag.Unknown];
  LastReqSuccessful = false;
  StateOfScUiProxy_Live = new DefaultStateOfScUiProxy();
  StateOfStorageSnapShots = new DefaultStateOfStorageSnapshots();
};