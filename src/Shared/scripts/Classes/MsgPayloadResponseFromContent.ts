import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IContentState } from "../Interfaces/IContentState/IContentState";
import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";
import { PayloadDataFromContent } from "./PayloadDataFromContent";

export class MsgFromContent extends MsgFromXBase implements IMsgFromX {
  Data: PayloadDataFromContent;
  ContentState: IContentState;
  response: string;

  constructor(msgFlag: MsgFlag) {
    super(msgFlag);
    this.Data = new PayloadDataFromContent();

    this.ContentState = {
      SnapShotsMany: {
        CurrentSnapShots: [],
        FavoriteCount: 0,
        SnapShotsAutoCount: 0,
        PlainCount: 0,
        Birthday: new Date(1970),
      },
      LastReq: MsgFlag.Unknown,
      ErrorStack: [],
      LastReqSuccessful: false,
      LastReqFailReason: '',
      ActiveCe: null
    };
  }
}