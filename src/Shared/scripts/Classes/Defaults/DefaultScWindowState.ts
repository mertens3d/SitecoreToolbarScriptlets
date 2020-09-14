import { MsgFlag } from "../../Enums/1xxx-MessageFlag";
import { IDataContentReplyReceivedEvent_Payload } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IError } from "../../Interfaces/IError";
import { DefaultStateOfSitecoreWindow } from "./DefaultStateOfSitecoreWindow";
import { DefaultStateOfSnapshotStorage } from "./DefaultStateOfSnapshots";

export class DefaultContentReplyPayload implements IDataContentReplyReceivedEvent_Payload {
  ErrorStack: IError[] = [];
  LastReq = MsgFlag.Unknown;
  LastReqSuccessful = false;
  StateOfSitecoreWindow = new DefaultStateOfSitecoreWindow();
  StateOfStorageSnapShots = new DefaultStateOfSnapshotStorage();
};