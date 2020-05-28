import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { PopConst } from '../Classes/PopConst';
import { IAllAgents } from '../../../Shared/scripts/Interfaces/Agents/IAllAgents';

export class FeedbackManager extends PopUpManagerBase {
  constructor(popHub: PopUpHub, allAgents: IAllAgents) {
    super(popHub, allAgents);
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
