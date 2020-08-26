import { IContentState } from "../Interfaces/IContentState/IContentState";
import { ISnapShotsMany } from "../Interfaces/IContentState/ISnapShotsMany";
import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IError } from "../Interfaces/IError";

export class DefaultContentState implements IContentState {
  SnapShotsMany: ISnapShotsMany = {
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
