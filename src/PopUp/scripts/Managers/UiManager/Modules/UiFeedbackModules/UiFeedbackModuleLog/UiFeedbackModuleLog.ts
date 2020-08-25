import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { ILogWriter } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerWriter";
import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";

export class UiFeedbackModuleLog extends UiFeedbackModuleBase implements ILogWriter {


    WriteText(text: string) {
        if (this.__targetElement) {
        }
    }


    constructor(textAreaSelector: string, logger: ILoggerAgent) {
        super(textAreaSelector, logger);

    }

}
