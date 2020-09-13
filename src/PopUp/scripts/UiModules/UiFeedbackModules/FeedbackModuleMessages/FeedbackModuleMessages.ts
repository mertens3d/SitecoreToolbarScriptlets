import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { IMessageBrokerFeedback } from "../../../../../Shared/scripts/Interfaces/Agents/IMessageBrokerFeedback/IMessageBrokerFeedback";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IGeneric_Observer } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/GenericEvent/IGeneric_Observer";
import { IDataContentReplyReceivedEvent_Payload } from "../../../../../Shared/scripts/Interfaces/Events/IDataContentReplyReceivedEvent_Payload";
import { GenericEvent_Observer } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/GenericEvent/GenericEvent_Subject";


export class FeedbackModuleMessages_Observer extends UiFeedbackModuleBase implements IMessageBrokerFeedback, IGeneric_Observer<IDataContentReplyReceivedEvent_Payload> {
  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent)
  }
  Friendly: string;
  UpdateAsync(payload: IDataContentReplyReceivedEvent_Payload) {
    this.Logger.WarningAndContinue(this.UpdateAsync + ' ' + FeedbackModuleMessages_Observer.name, 'not implemented yet');
  }

  Init() {
  }

  UpdateMsgStatusStack(textToShow: string) {
    this.AddHtmlString(textToShow + '</br>');
  }
}