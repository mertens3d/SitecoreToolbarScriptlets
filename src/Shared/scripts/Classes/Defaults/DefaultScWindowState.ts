import { MsgFlag } from "../../Enums/1xxx-MessageFlag";
import { IDataContentReplyPayload } from "../../Interfaces/Data/IContentState";
import { IError } from "../../Interfaces/IError";
import { DefaultStateOfSitecoreWindow } from "./DefaultStateOfSitecoreWindow";
import { DefaultStateOfSnapshots } from "./DefaultStateOfSnapshots";

export class DefaultContentReplyPayload implements IDataContentReplyPayload {
  ActiveCe = null;
  ErrorStack: IError[] = [];
  LastReq = MsgFlag.Unknown;
  LastReqSuccessful = false;
  StateOfSitecoreWindow = new DefaultStateOfSitecoreWindow();
  StateOfSnapShots = new DefaultStateOfSnapshots();
};