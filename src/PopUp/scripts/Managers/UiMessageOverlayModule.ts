import { PopConst } from "../Classes/PopConst";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IMessageBrokerFeedback } from "../../../Shared/scripts/Interfaces/Agents/IMessageBrokerFeedback/IMessageBrokerFeedback";

export class UiCommunicationFeedbackModule implements IMessageBrokerFeedback {
  private OverlayElem: HTMLElement;
  private MsgStatusDiv: HTMLDivElement;
  private Logger: ILoggerAgent;

  constructor(overlayElem: HTMLElement, loggerAgent: ILoggerAgent) {
    this.Logger = loggerAgent;
    this.OverlayElem = overlayElem;
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