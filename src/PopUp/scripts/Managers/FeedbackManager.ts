import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { PopConst } from '../Classes/PopConst';

export class FeedbackManager extends PopUpManagerBase {
  constructor(popHub: PopUpHub) {
    super(popHub);
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
