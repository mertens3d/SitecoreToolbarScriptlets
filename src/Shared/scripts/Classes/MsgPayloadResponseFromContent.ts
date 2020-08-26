import { IMsgFromX } from "../Interfaces/IMsgPayload";
//import { MsgFlag } from "../Enums/MessageFlag";
import { PayloadDataFromContent } from "./PayloadDataFromContent";
import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";
import { IContentState } from "../Interfaces/IContentState/IContentState";
import { scWindowType } from "../Enums/scWindowType";

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