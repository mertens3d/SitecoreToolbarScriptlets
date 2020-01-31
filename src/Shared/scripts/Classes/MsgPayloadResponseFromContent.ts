import { IMsgFromX } from "../Interfaces/IMsgPayload";
//import { MsgFlag } from "../Enums/MessageFlag";
import { PayloadDataFromContent } from "./PayloadDataFromContent";
import { MsgFlag } from "../Enums/MessageFlag";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";
import { ICurrState } from "../Interfaces/ICurrState";
import { scWindowType } from "../Enums/scWindowType";

export class MsgFromContent extends MsgFromXBase implements IMsgFromX {
  Data: PayloadDataFromContent;
  State: ICurrState;
  response: string;

  constructor(msgFlag: MsgFlag) {
    super(msgFlag);
    this.Data = new PayloadDataFromContent();
    this.State = {
      CurrentSnapShots :[],
      WindowType : scWindowType.Unknown,
      Url: '',
      LastReq: MsgFlag.Unknown,
      ErrorStack: []

    };
  }
}