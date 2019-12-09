class FeedbackManager extends ManagerBase {
  constructor(xyyz: Hub) {
    super(xyyz);
    console.log('Feedback');
  }
  __getTextArea(): HTMLTextAreaElement {
    return <HTMLTextAreaElement>document.getElementById(this.Xyyz.Const.ElemId.textAreaFeedback);
  }

  ClearTextArea(): void {
    var ta = this.__getTextArea();
    if (ta) {
      ta.value = '';
    } else {
      this.Xyyz.debug.Error(FeedbackManager.name, 'No text area found');
    }
  }
  WriteLine(text) {
    var ta = this.__getTextArea();
    if (ta) {
      ta.value += text + '\\n';
      //ta.scrollTop = ta.scrollHeight;
    }
  }
}
