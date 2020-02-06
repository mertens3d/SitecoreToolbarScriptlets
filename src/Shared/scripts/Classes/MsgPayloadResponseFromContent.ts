import { IMsgFromX } from "../Interfaces/IMsgPayload";
//import { MsgFlag } from "../Enums/MessageFlag";
import { PayloadDataFromContent } from "./PayloadDataFromContent";
import { MsgFlag } from "../Enums/MessageFlag";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";
import { ICurrStateContent } from "../Interfaces/ICurrState";
import { scWindowType } from "../Enums/scWindowType";

export class MsgFromContent extends MsgFromXBase implements IMsgFromX {
  Data: PayloadDataFromContent;
  State: ICurrStateContent;
  response: string;

  constructor(msgFlag: MsgFlag) {
    super(msgFlag);
    this.Data = new PayloadDataFromContent();
    
    this.State = {
      SnapShotsMany: {
        CurrentSnapShots: [],
        FavoriteCount: 0,
        SnapShotsAutoCount: 0,
        PlainCount: 0,
        Birthday: new Date(1970),
      },
      WindowType: scWindowType.Unknown,
      Url: '',
      LastReq: MsgFlag.Unknown,
      ErrorStack: [],
      LastReqSuccessful: false,
    };
  }
}