import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { ILogWriter } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerWriter";
import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";

export class UiFeedbackModuleLog extends UiFeedbackModuleBase implements ILogWriter {
  WriteText(text: string) {
    this.WriteSingleLine(text);
  }

  constructor(selector: string, logger: ILoggerAgent) {
    super(selector, logger);
  }
}