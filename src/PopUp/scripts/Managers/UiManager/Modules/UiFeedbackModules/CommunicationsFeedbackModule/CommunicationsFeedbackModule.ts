import { PopConst } from "../../../../../Classes/PopConst";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IMessageBrokerFeedback } from "../../../../../../../Shared/scripts/Interfaces/Agents/IMessageBrokerFeedback/IMessageBrokerFeedback";
import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";

export class CommunicationsFeedbackModule extends UiFeedbackModuleBase implements IMessageBrokerFeedback {
    private MsgStatusDiv: HTMLDivElement;

  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent)

    }

    Init() {
        this.LookForMsgStatusDiv();
    }

    LookForMsgStatusDiv() {
        this.MsgStatusDiv = document.querySelector(PopConst.Const.Selector.HS.DivMsgStatus);
    }

    UpdateMsgStatusStack(textToShow: string) {
        if (this.MsgStatusDiv) {
            this.MsgStatusDiv.innerHTML = textToShow + '</br>' + this.MsgStatusDiv.innerHTML;
        }
        this.Logger.Log('msg stat: ' + textToShow);
    }
}
