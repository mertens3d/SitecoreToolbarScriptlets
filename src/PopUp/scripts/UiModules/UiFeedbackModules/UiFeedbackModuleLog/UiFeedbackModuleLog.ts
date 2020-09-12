import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { ILoggerWriter } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerWriter";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";

export class UiFeedbackModuleLog extends UiFeedbackModuleBase implements ILoggerWriter {
  WriteText(text: string) {
    this.WriteSingleLine(text);
  }

  constructor(selector: string, logger: ILoggerAgent) {
    super(selector, logger);
  }
}