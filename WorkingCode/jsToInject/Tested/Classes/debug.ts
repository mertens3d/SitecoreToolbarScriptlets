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
  ClearDebugText(): void {
    var ta = this.__getTextArea();
    if (ta) {
      ta.value = '--- Debug Text Reset ---\\n';
      this.__indentCount = 0;
    } else {
      this.Error(Debug.name, 'No text area found');
    }
  }

  MarkerA() {
    this.__markerRaw('A');
  }

  MarkerB() {
    this.__markerRaw('B');
  }

  MarkerC() {
    this.__markerRaw('C');
  }

  MarkerD() {
    this.__markerRaw('D');
  }

  MarkerE() {
    this.__markerRaw('E');
  }

  private __markerRaw(marker) {
    this.Log('Marker ' + marker);
  }

  Log(text, optionalValue: string = '', hasPrefix = false) {
    var indent = '  ';
    //text =  indent.repeat(this.__indentCount) + text;

    for (var idx = 0; idx < this.__indentCount; idx++) {
      text = indent + text;
    }

    var prefixLength = 3;
    if (!hasPrefix) {
      for (var idx = 0; idx < prefixLength; idx++) {
        text = ' ' + text;
      }
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

  FuncStart(textOrFunc, optionalValue: string = '') {
    textOrFunc = 's) ' + textOrFunc;

    if (typeof (textOrFunc) === 'function') {
      console.log('******* is func *************');
      textOrFunc = textOrFunc.name;
    }

    if (optionalValue.length > 0) {
      textOrFunc = textOrFunc + ' : ' + optionalValue;
    }

    this.Log(textOrFunc, '', true);
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
    this.Log(text, optionalValue, true);
  }

  Error(container, text) {
    if (!container) {
      container = 'unknown';
    }
    if (!text) {
      text = 'unknown';
    }
    this.Log('');
    this.Log('\t\t** ERROR ** ' + container);
    this.Log('');
    this.Log(text);
    this.Log('');
    this.Log('\t\t** ERROR ** ' + container);
    this.Log('');
  }
}