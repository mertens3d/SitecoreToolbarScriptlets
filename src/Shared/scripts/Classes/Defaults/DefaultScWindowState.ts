import { MsgFlag } from "../../Enums/1xxx-MessageFlag";
import { IError } from "../../Interfaces/IError";
import { DefaultStateOfLiveHindSite } from "./DefaultStateOfSitecoreWindow";
import { DefaultStateOfSnapshotStorage } from "./DefaultStateOfSnapshots";
import { IDataContentReplyReceivedEvent_Payload } from "../../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

export class DefaultContentReplyPayload implements IDataContentReplyReceivedEvent_Payload {
  ErrorStack: IError[] = [];
  LastReq = MsgFlag.Unknown;
  LastReqFriendly: string = MsgFlag[MsgFlag.Unknown];
  LastReqSuccessful = false;
  StateOfLiveHindSite = new DefaultStateOfLiveHindSite();
  StateOfStorageSnapShots = new DefaultStateOfSnapshotStorage();
};