class Debug {
  constructor() {
    this.__indentCount = 0;
  }
  Log(text) {
    text = '  '.repeat(this.__indentCount) + text;
    console.log(text);
    var ta = document.getElementById('ta-debug');
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