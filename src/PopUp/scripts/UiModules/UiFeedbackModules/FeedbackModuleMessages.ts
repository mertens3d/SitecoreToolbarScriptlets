import { IDataContentReplyReceivedEvent_Payload } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IHindSiteEvent_Observer } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IMessageBrokerFeedback } from "../../../../Shared/scripts/Interfaces/Agents/IMessageBrokerFeedback/IMessageBrokerFeedback";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase.1";

export class FeedbackModuleMessages_Observer extends _UiFeedbackModuleBase implements IMessageBrokerFeedback, IHindSiteEvent_Observer<IDataContentReplyReceivedEvent_Payload> {


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