import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IDataDesktopState } from "../Interfaces/Data/IDataDesktopState";
import { IContentState } from "../Interfaces/Data/IContentState";
import { IError } from "../Interfaces/IError";

export class DefaultScWindowState implements IContentState {
  DesktopState: IDataDesktopState = null;
  SnapShotsMany = {
    CurrentSnapShots: [],
    FavoriteCount: 0,
    SnapShotsAutoCount: 0,
    PlainCount: 0,
    Birthday: new Date(1970),
  };

  LastReq = MsgFlag.Unknown;

  ErrorStack: IError[] = [] ;

  LastReqSuccessful = false;

  ActiveCe = null
};
