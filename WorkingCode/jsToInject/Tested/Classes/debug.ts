class Debug {
  __indentCount: number;
  ParentWindow: Window;

  constructor(parentWindow: Window) {
    console.log('debug');
    this.__indentCount = 0;
    this.ParentWindow = parentWindow;
  }
  __getTextArea(): HTMLTextAreaElement {
    return <HTMLTextAreaElement>document.getElementById('ta-debug');
  }
  ClearTextArea(): void {
    var ta = this.__getTextArea();
    if (ta) {
      ta.value = '';
    } else {
      this.Error(Debug.name, 'No text area found');
    }
  }
  Log(text) {
    var indent = '  ';
    //text =  indent.repeat(this.__indentCount) + text;

    for (var idx = 0; idx < this.__indentCount; idx++) {
      text = indent + text;
    }
    console.log(text);

    var ta = this.__getTextArea();
    if (ta) {
      ta.value += text + '\\n';
      ta.scrollTop = ta.scrollHeight;
    }

    if (this.ParentWindow) {
      this.ParentWindow.console.log(text);
    }
  }

  FuncStartFunc(func) {
    this.FuncStartName(func.name);
  }
  FuncStartName(text) {
    text = 's) ' + text;
    this.Log(text);
    this.__indentCount++;
  }

  FuncEndName(text) {
    text = 'e) ' + text;
    this.__indentCount--;
    this.Log(text);
  }

  Error(container, text) {
    if (!container) {
      container = 'unknown';
    }
    if (!text) {
      text = 'unknown';
    }
    var logText = '** ERROR ** ' + container + ':' + text;
    this.Log(logText);
  }
}