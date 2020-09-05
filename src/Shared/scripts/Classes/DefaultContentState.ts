import { IContentState } from "../Interfaces/IContentState/IContentState";
import { ISnapShots } from "../Interfaces/IContentState/ISnapShots";
import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IError } from "../Interfaces/IError";

export class DefaultContentState implements IContentState {
  SnapShotsMany: ISnapShots = {
    CurrentSnapShots: [],
    FavoriteCount: 0,
    SnapShotsAutoCount: 0,
    PlainCount: 0,
    Birthday: new Date(1970),
  };

  LastReq = MsgFlag.Unknown;

  ErrorStack: IError[] = [] ;

  LastReqSuccessful = false;

  LastReqFailReason = '';

  ActiveCe = null
};
