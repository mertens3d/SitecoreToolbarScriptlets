import { Hub } from '../Managers/Hub';
import { ManagerBase } from '../_first/_ManagerBase';

export class FeedbackManager extends ManagerBase {
  constructor(xyyz: Hub) {
    super(xyyz);
  }
  __getTextArea(): HTMLTextAreaElement {
    return <HTMLTextAreaElement>document.getElementById(this.Const().ElemId.textAreaFeedback);
  }

  ClearTextArea(): void {
    var ta = this.__getTextArea();
    if (ta) {
      ta.value = '';
    } else {
      this.debug().Error(FeedbackManager.name, 'No text area found');
    }
  }
  WriteLine(text) {
    var ta = this.__getTextArea();
    if (ta) {
      ta.value += text + '\n';
      //ta.scrollTop = ta.scrollHeight;
    }
  }
}
