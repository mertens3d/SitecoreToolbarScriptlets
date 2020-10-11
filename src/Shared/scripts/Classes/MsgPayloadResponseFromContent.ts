﻿import { MsgFlag } from "../Enums/10 - MessageFlag";
import { IMessageContentToController_Payload } from "../Events/ContentReplyReceivedEvent/IMessageContentToController_Payload";
import { IMessageContentToController } from "../Interfaces/IMessageContentToController";
import { DefaultMessageContentToController_Payload } from "./Defaults/DefaultMessageContentToController_Payload";

export class DefaultCommand {
  Command: browser.commands.Command;
  constructor(command: browser.commands.Command) {
    this.Command = command;
  }
}

export class DefaultMsgContentToController implements IMessageContentToController {
  Payload: IMessageContentToController_Payload = new DefaultMessageContentToController_Payload()

  MsgFlag: MsgFlag = MsgFlag.Unknown;

  constructor(msgFlag: MsgFlag) {
    this.MsgFlag = msgFlag;
  }
}