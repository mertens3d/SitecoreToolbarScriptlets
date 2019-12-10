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
      ta.value = '--- Debug Text Reset ---\\n';
      this.__indentCount = 0;
    } else {
      this.Error(Debug.name, 'No text area found');
    }
  }
  Log(text, optionalValue: string = '') {
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

  //FuncStartFunc(func) {
  //  this.FuncStartName(func.name);
  //}

  CtorName(ctorName: string) {
    this.Log('Constructor: ' + ctorName);
  }

  FuncStart(textOrFunc, optionalValue:string = '') {
    textOrFunc = 's) ' + textOrFunc;

    if (typeof (textOrFunc) === 'function') {
      console.log('******* is func *************');
      textOrFunc = textOrFunc.name;
    }

    if (optionalValue.length > 0) {
      textOrFunc = textOrFunc + ' : ' + optionalValue;
    }

    this.Log(textOrFunc);
    this.__indentCount++;
    if (this.__indentCount > 10) {
      this.__indentCount = 10;
    }
  }

  FuncEnd(text, optionalValue: string = '') {
    text = 'e) ' + text;

    if (optionalValue.length > 0) {
      text = text + ' : ' + optionalValue;
    }



    this.__indentCount--;

       
    if (this.__indentCount < 0) {
      this.__indentCount = 0;
    }
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