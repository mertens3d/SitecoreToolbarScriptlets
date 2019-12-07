class Debug {
    __indentCount: number;
  constructor() {
    this.__indentCount = 0;
  }
  Log(text) {
    var indent = '  ';
    //text =  indent.repeat(this.__indentCount) + text;

    for (var idx = 0; idx < this.__indentCount; idx++) {
      text = indent + text;
    }
    console.log(text);
    var ta = <HTMLTextAreaElement>document.getElementById('ta-debug');
    if (ta) {

      ta.value += text + '\\n\\r';
      ta.scrollTop = ta.scrollHeight;
    }
  }

  FuncStart(text) {
    text = 's) ' + text;
    this.Log(text);
    this.__indentCount++;
  }

  FuncEnd(text) {
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