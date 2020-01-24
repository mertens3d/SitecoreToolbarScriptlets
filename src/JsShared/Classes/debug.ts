import { IDataBucketRestoreDesktop } from '../../jsContent/Interfaces/IDataBucketRestoreDesktop';
import { IDataOneIframe } from '../../jsContent/Interfaces/IDataOneIframe';
import { IDataOneDoc } from '../../jsContent/Interfaces/IDataOneDoc';
import { IDataDebugCallback } from '../../jsContent/Interfaces/DebugCallback';
import { ICallbackDataDebugTextChanged } from '../../jsContent/Interfaces/ICallbackDataDebugTextChanged';

export class Debug {
  __indentCount: number;
  ParentWindow: Window;
  Enabled: boolean = false;
  private __debugTextChangedCallbacks: IDataDebugCallback[] = [];

  constructor(parentWindow: Window) {
    this.__indentCount = 0;
    this.ParentWindow = parentWindow;
  }

  debugPrefix: string = '\t\t';

  DebugIDataDoc(dataOneDoc: IDataOneDoc) {
    this.FuncStart(this.DebugIDataDoc.name);

    this.Log('');
    this.Log(this.debugPrefix + this.DebugIDataDoc.name);

    if (dataOneDoc) {
      this.Log(this.debugPrefix + 'dataOneDoc: \t' + this.IsNullOrUndefined(dataOneDoc));
      this.Log(this.debugPrefix + 'dataOneDoc.XyyzId.asShort: \t' + this.IsNullOrUndefined(dataOneDoc.XyyzId.asShort));
      this.Log(this.debugPrefix + 'dataOneDoc.Document: \t' + this.IsNullOrUndefined(dataOneDoc.Document));

      if (dataOneDoc.Document) {
        this.LogVal(this.debugPrefix + 'dataOneDoc.Document.readyState:', dataOneDoc.Document.readyState);
        if (dataOneDoc.Document.location) {
          this.LogVal(this.debugPrefix + 'targetDoc.location.href', dataOneDoc.Document.location.href);
        } else {
          this.Log(this.debugPrefix + 'dataOneDoc.Document.location - does not exist');
        }
      } else {
        this.Log(this.debugPrefix + 'dataOneDoc.Document - does not exist');
      }
    } else {
      this.Error(this.DebugIDataDoc.name, 'no targetDoc');
    }
    this.Log('');
  }

  AddDebugTextChangedCallback(caller: any, callback: Function): void {
    //console.log('========================================');
    this.__debugTextChangedCallbacks.push({
      Caller: caller,
      Func: callback
    });
  }

  HndlrClearDebugText(self: Debug, verify: boolean = false): void {
    var proceed: boolean = true;

    if (verify) {
      proceed = confirm('Clear Debug TextArea ?');
    }
    console.log('maker pink');
    if (proceed) {
      var newText = '--- Debug Text Reset ---';
      self.__triggerAllDebugTextChangedCallbacks({
        NewText: newText,
        Append: false
      });
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
    if (this.Enabled) {
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

      this.__triggerAllDebugTextChangedCallbacks({
        NewText: text,
        Append: true
      });

      console.log(text);

      if (this.ParentWindow) {
        this.ParentWindow.console.log(text);
      }
    }
  }

  private __triggerAllDebugTextChangedCallbacks(data: ICallbackDataDebugTextChanged) {
    for (var idx = 0; idx < this.__debugTextChangedCallbacks.length; idx++) {
      var oneCallback: IDataDebugCallback = this.__debugTextChangedCallbacks[idx];

      oneCallback.Func(oneCallback.Caller, data);
    }
  }

  CtorName(ctorName: string) {
    this.Log('Constructor: ' + ctorName);
  }

  //NotNullOrUndefined(subjectAnyAr: any[], label?: string, iterationCheck?: number): boolean;
  //NotNullOrUndefined(subjectAny: any, label?: string, iterationCheck?: number);
  //NotNullOrUndefined(subjectAnyOrAr: any | any[], label: string = '', iterationCheck: number = null): boolean {

  FuncStart(textOrFunc: string, optionalValue?: number): void;
  FuncStart(textOrFunc: string, optionalValue?: string ): void;
  FuncStart(textOrFunc: string, optionalValue: number | string): void {
    textOrFunc = 's) ' + textOrFunc;

    

    if (!optionalValue) {
      optionalValue = '';
    } else {
      optionalValue = optionalValue.toString();
    }

    //if (typeof (textOrFunc) === 'function') {
    //  console.log('******* is func *************');
    //  textOrFunc = textOrFunc.name;
    //}

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
    this.Log('\t\t  ' + text);
    this.Log('');
    this.Log('\t\t** ERROR ** ' + container);
    this.Log('');
  }

  NotNullCheck(title: string, value: any): void {
    if (typeof value === 'undefined') {
      this.LogVal(title, 'Is Undefined');
    } else if (!value) {
      this.LogVal(title, 'Is Null');
    } else {
      this.LogVal(title, 'Is Not Null');
    }
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

    this.Log('dataOneIframe : ' + this.IsNullOrUndefined(dataOneIframe));

    if (dataOneIframe) {
      this.Log('dataOneIframe.Nickname : ' + dataOneIframe.Nickname);
      this.Log('dataOneIframe.IframeElem: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem));
      if (dataOneIframe.IframeElem) {
        this.Log('dataOneIframe.id: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.id));
        //  //this.Log('dataOneIframe.IframeElem.src: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.src));
        //  this.Log('dataOneIframe.IframeElem.id: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.id));
        //  //this.Log('dataOneIframe.IframeElem.name: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem.name));
      }
      this.Log('dataOneIframe.ContentDoc: \t' + this.IsNullOrUndefined(dataOneIframe.ContentDoc));

      this.DebugIDataDoc(dataOneIframe.ContentDoc);

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