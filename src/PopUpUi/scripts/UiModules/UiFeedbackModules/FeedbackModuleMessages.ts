import { IHindSiteEvent_Observer } from "../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { IMessageBrokerFeedback } from "../../../../Shared/scripts/Interfaces/Agents/IMessageBrokerFeedback/IMessageBrokerFeedback";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase";
import { IDataContentReplyReceivedEvent_Payload } from "../../../../Shared/scripts/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

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