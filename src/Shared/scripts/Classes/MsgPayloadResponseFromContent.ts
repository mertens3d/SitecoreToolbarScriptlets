import { IMsgFromX } from "../Interfaces/IMsgPayload";
//import { MsgFlag } from "../Enums/MessageFlag";
import { PayloadDataFromContent } from "./PayloadDataFromContent";
import { MsgFlag } from "../Enums/MessageFlag";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";

export class MsgFromContent extends MsgFromXBase implements IMsgFromX {
  Data: PayloadDataFromContent;
  response: string;

  constructor(msgFlag: MsgFlag) {
    super(msgFlag);
  }
}