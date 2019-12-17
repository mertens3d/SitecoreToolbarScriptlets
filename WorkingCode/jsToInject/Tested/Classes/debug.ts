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

  LogVal(textValName: string, textValVal: string) {
    this.Log(textValName + ' : ' + textValVal);
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

  IsNullOrUndefined(subject) {
    var toReturn = '{unknown}';
    if (subject) {
      if ((typeof subject) == 'undefined') {
        toReturn = 'Is Undefined';
      } else {
        toReturn = 'Not Null';
      }
    } else {
      toReturn = 'Is Null';
    }

    return toReturn;
  }

  PromiseBucketDebug(promiseBucket: IDataBucketRestoreDesktop, friendlyName: string) {
    this.FuncStart(this.PromiseBucketDebug.name, friendlyName);
    this.Log('promiseBucket : ' + this.IsNullOrUndefined(promiseBucket));

    if (promiseBucket && typeof (promiseBucket) !== 'undefined') {
      this.Log('promiseBucket.IFramesbefore: ' + this.IsNullOrUndefined(promiseBucket.IFramesbefore));
      this.Log('promiseBucket.targetWindow: ' + this.IsNullOrUndefined(promiseBucket.targetWindow));
      this.Log('promiseBucket.oneCEdata: ' + this.IsNullOrUndefined(promiseBucket.oneCEdata));
      this.Log('promiseBucket.NewIframe: ' + this.IsNullOrUndefined(promiseBucket.NewIframe));
      if (promiseBucket.NewIframe) {
        this.DebugDataOneIframe(promiseBucket.NewIframe);
      }
    }
    this.FuncEnd(this.PromiseBucketDebug.name, friendlyName);
  }

  DebugDataOneIframe(dataOneIframe: IDataOneIframe) {
    this.FuncStart(this.DebugDataOneIframe.name);

    try {
    } catch (e) {
    }

    this.Log('dataOneIframe : ' + this.IsNullOrUndefined(dataOneIframe));

    if (dataOneIframe) {
      this.Log('dataOneIframe.IframeElem: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem));
      if (dataOneIframe.IframeElem) {
        this.Log('dataOneIframe.id: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.id));
        //  //this.Log('dataOneIframe.IframeElem.src: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.src));
        //  this.Log('dataOneIframe.IframeElem.id: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.id));
        //  //this.Log('dataOneIframe.IframeElem.name: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.name));
      }
      this.Log('dataOneIframe.ContentDoc: \t' + this.IsNullOrUndefined(dataOneIframe.ContentDoc));

      if (dataOneIframe.ContentDoc) {
        this.Log('dataOneIframe.ContentDoc: \t' + this.IsNullOrUndefined(dataOneIframe.ContentDoc));
        this.Log('dataOneIframe.ContentDoc.XyyzId.asShort: \t' + this.IsNullOrUndefined(dataOneIframe.ContentDoc.XyyzId.asShort));
        this.Log('dataOneIframe.ContentDoc.Document: \t' + this.IsNullOrUndefined(dataOneIframe.ContentDoc.Document));
      }

      //this.Log('dataOneIframe.IframeElem: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem));

      //this.Log('dataOneIframe.Id: \t' + this.IsNullOrUndefined(dataOneIframe.Id));
      //if (dataOneIframe.Id) {
      //  this.Log('dataOneIframe.Id.asShort: \t' + this.IsNullOrUndefined(dataOneIframe.Id.asShort));
      //}

      //this.Log('dataOneIframe.DocElem: \t' + this.IsNullOrUndefined(dataOneIframe.Index));
    }
    this.FuncEnd(this.DebugDataOneIframe.name);
  }
}