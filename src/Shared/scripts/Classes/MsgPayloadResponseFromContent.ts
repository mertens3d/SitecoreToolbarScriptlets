import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";
import { PayloadDataFromContent } from "./PayloadDataFromContent";
import { IContentReplyPayload } from "../Interfaces/Data/IContentState";

export class MsgFromContent extends MsgFromXBase implements IMsgFromX {
  Data: PayloadDataFromContent;
  ScWindowState: IContentReplyPayload;
  response: string;

  constructor(msgFlag: MsgFlag) {
    super(msgFlag);
    this.Data = new PayloadDataFromContent();

    this.ScWindowState = {
      SnapShotsStateOfSitecore: {
        CurrentSnapShots: [],
        FavoriteCount: 0,
        SnapShotsAutoCount: 0,
        PlainCount: 0,
        Birthday: new Date(1970),
      },
      CurrentStateOfSitecore: null,
      LastReq: MsgFlag.Unknown,
      ErrorStack: [],
      LastReqSuccessful: false,
      ActiveCe: null
    };
  }
}