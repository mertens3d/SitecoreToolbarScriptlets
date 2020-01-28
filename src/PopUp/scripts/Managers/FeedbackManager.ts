import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';

export class FeedbackManager extends PopUpManagerBase {
  constructor(popHub: PopUpHub) {
    super(popHub);
  }
  __getTextArea(): HTMLTextAreaElement {
    return <HTMLTextAreaElement>document.getElementById(this.PopConst().ElemId.textAreaFeedback);
  }


  WriteLine(text) {
    var ta = this.__getTextArea();
    if (ta) {
      ta.value += text + '\n';
      //ta.scrollTop = ta.scrollHeight;
    }
  }
}
