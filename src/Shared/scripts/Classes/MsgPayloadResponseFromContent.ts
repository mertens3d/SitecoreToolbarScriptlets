import { ReqCommandMsgFlag } from "../Enums/10 - MessageFlag";

export class DefaultCommand {
  Command: browser.commands.Command;
  constructor(command: browser.commands.Command) {
    this.Command = command;
  }
}

