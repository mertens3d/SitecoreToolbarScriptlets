import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { IMessageBrokerFeedback } from "../../../../../Shared/scripts/Interfaces/Agents/IMessageBrokerFeedback/IMessageBrokerFeedback";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IGeneric_Observer } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/GenericEvent/IGeneric_Observer";
import { IDataContentReplyReceivedEvent_Payload } from "../../../../../Shared/scripts/Interfaces/Events/IDataContentReplyReceivedEvent_Payload";

export class FeedbackModuleMessages_Observer extends UiFeedbackModuleBase implements IMessageBrokerFeedback, IGeneric_Observer<IDataContentReplyReceivedEvent_Payload> {
  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent)
  }
  Friendly: string;
  Update(payload: IDataContentReplyReceivedEvent_Payload) {
    this.Logger.WarningAndContinue(this.Update + ' ' + FeedbackModuleMessages_Observer.name, 'not implemented yet');
  }

  Init() {
  }

  UpdateMsgStatusStack(textToShow: string) {
    this.AddHtmlString(textToShow + '</br>');
  }
}