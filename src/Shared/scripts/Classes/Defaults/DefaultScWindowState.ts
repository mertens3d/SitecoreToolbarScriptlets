import { MsgFlag } from "../../Enums/1xxx-MessageFlag";
import { IDataContentReplyPayload } from "../../Interfaces/Data/IContentState";
import { IError } from "../../Interfaces/IError";
import { DefaultStateOfSitecoreWindow } from "./DefaultStateOfSitecoreWindow";

export class DefaultContentReplyPayload implements IDataContentReplyPayload {
  StateOfSitecoreWindow = new DefaultStateOfSitecoreWindow();

  LastReq = MsgFlag.Unknown;

  ErrorStack: IError[] = [];

  LastReqSuccessful = false;

  ActiveCe = null
};