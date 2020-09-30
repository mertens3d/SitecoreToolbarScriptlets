import { IHindSiteEvent_Observer } from "../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { IMessageBrokerFeedback } from "../../../../Shared/scripts/Interfaces/Agents/IMessageBrokerFeedback/IMessageBrokerFeedback";
import { _UiFeedbackModuleBase } from "./_UiFeedbackModuleBase";
import { IControllerMessageReceivedEvent_Payload } from "../../../../Shared/scripts/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";

export class DebuggingFeedbackModuleMessages_Observer extends _UiFeedbackModuleBase implements IMessageBrokerFeedback, IHindSiteEvent_Observer<IControllerMessageReceivedEvent_Payload> {
  Friendly: string;

  UpdateAsync(payload: IControllerMessageReceivedEvent_Payload) {
    this.Logger.WarningAndContinue(this.UpdateAsync + ' ' + DebuggingFeedbackModuleMessages_Observer.name, 'not implemented yet');
  }
  RefreshUi_Module() {

  }
  WireEvents_Module() {

  }

  UpdateMsgStatusStack(textToShow: string) {
    this.AddHtmlString(textToShow + '</br>');
  }
}