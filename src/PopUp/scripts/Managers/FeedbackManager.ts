import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { PopConst } from '../Classes/PopConst';
import { IAllPopUpAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllPopUpAgents";

export class FeedbackManager extends PopUpManagerBase {
  constructor(popHub: PopUpHub, allPopUpAgents: IAllPopUpAgents) {
    super(popHub, allPopUpAgents);
  }
  __getTextArea(): HTMLTextAreaElement {
    return <HTMLTextAreaElement>document.getElementById(PopConst.Const.ElemId.textAreaFeedback);
  }


  WriteLine(text) {
    var ta = this.__getTextArea();
    if (ta) {
      ta.value += text + '\n';
      //ta.scrollTop = ta.scrollHeight;
    }
  }
}
