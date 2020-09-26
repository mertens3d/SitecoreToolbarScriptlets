import { MsgFlag } from "../../Enums/1xxx-MessageFlag";
import { IError } from "../../Interfaces/IError";
import { DefaultStateOfSitecoreWindow } from "./DefaultStateOfSitecoreWindow";
import { DefaultStateOfSnapshotStorage } from "./DefaultStateOfSnapshots";
import { IDataContentReplyReceivedEvent_Payload } from "../../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

export class DefaultContentReplyPayload implements IDataContentReplyReceivedEvent_Payload {
  ErrorStack: IError[] = [];
  LastReq = MsgFlag.Unknown;
  LastReqFriendly: string = MsgFlag[MsgFlag.Unknown];
  LastReqSuccessful = false;
  StateOfSitecoreWindow = new DefaultStateOfSitecoreWindow();
  StateOfStorageSnapShots = new DefaultStateOfSnapshotStorage();
};