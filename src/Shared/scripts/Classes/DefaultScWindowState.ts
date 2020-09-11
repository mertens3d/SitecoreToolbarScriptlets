import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IContentReplyPayload } from "../Interfaces/Data/IContentState";
import { IError } from "../Interfaces/IError";

export class DefaultContentReplyPayload implements IContentReplyPayload {
  CurrentStateOfSitecore = null;
  SnapShotsStateOfSitecore = {
    CurrentSnapShots: [],
    FavoriteCount: 0,
    SnapShotsAutoCount: 0,
    PlainCount: 0,
    Birthday: new Date(1970),
  };

  LastReq = MsgFlag.Unknown;

  ErrorStack: IError[] = [];

  LastReqSuccessful = false;

  ActiveCe = null
};