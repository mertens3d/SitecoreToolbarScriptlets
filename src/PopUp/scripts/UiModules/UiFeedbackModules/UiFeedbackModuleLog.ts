import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase.1";
import { ILoggerWriter } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerWriter";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";

export class UiFeedbackModuleLog extends _UiFeedbackModuleBase implements ILoggerWriter {
  FriendlyName: string = UiFeedbackModuleLog.name;


  WriteText(text: string) {
    this.WriteSingleLine(text);
  }
}