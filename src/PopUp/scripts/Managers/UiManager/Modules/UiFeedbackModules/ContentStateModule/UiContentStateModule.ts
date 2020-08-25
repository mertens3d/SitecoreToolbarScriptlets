import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";

export class UiContentStateModule extends UiFeedbackModuleBase{

  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent)
  }
}
