import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { IDataContentReplyPayload } from "../Interfaces/Data/IContentState";
import { IMsgFromX } from "../Interfaces/IMsgPayload";
import { MsgFromXBase } from "../Interfaces/MsgFromXBase";
import { DefaultContentReplyPayload } from "./Defaults/DefaultScWindowState";

export class MsgFromContent extends MsgFromXBase implements IMsgFromX {
  Payload: IDataContentReplyPayload = new DefaultContentReplyPayload()

  constructor(msgFlag: MsgFlag) {
    super(msgFlag);
  }
}