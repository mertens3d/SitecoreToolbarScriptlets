import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IMessageBrokerFeedback } from "../../../../../Shared/scripts/Interfaces/Agents/IMessageBrokerFeedback/IMessageBrokerFeedback";
import { IDataContentReplyReceivedEvent_Payload } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { IHindSiteEvent_Observer } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/IHindSiteEvent_Observer";

export class FeedbackModuleMessages_Observer extends UiFeedbackModuleBase implements IMessageBrokerFeedback, IHindSiteEvent_Observer<IDataContentReplyReceivedEvent_Payload> {
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