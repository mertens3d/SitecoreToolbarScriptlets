import { IDataOneDoc } from "../Interfaces/IDataOneDoc";
import { IDataDebugCallback } from "../Interfaces/DebugCallback";
import { ICallbackDataDebugTextChanged } from "../Interfaces/ICallbackDataDebugTextChanged";
import { IGuid } from "../Interfaces/IGuid";
import { MsgFlag } from "../Enums/MessageFlag";
import { Utilities } from "./Utilities";
import { IError } from "../Interfaces/IError";
import { StaticHelpers } from "./StaticHelpers";

export class BaseDebug {
  private __indentCount: number;
  private ParentWindow: Window;
  Enabled: boolean = false;

  ErrorStack: IError[] = [];

  private __debugTextChangedCallbacks: IDataDebugCallback[] = [];
  //protected Utilites: Utilities;

  constructor(parentWindow: Window) {
    this.__indentCount = 0;
    this.ParentWindow = parentWindow;
    //this.Utilites = utilies;
  }

  debugPrefix: string = '\t\t';

  //DebugObjVarVal(textValName: string, textVal: number)
  //DebugObjVarVal(textValName: string, textVal: string)
  //DebugObjVarVal(textValName: string, textVal: string | number) {
  //  const debugPrefix = '   ~~~   ';

  //  this.LogVal(debugPrefix + textValName, textVal.toString())
  //}

  IsNotNullOrUndefinedBool(title, subject): boolean {
    var toReturn: boolean = false;
    if (subject) {
      if ((typeof subject) == 'undefined') {
        this.LogVal(title + ' Is Not Undefined', '!!! false !!!');
      } else {
        this.LogVal(title + ' Is Not Null', 'true');
        toReturn = true;
      }
    } else {
      this.LogVal(title + ' Is Not Null', '!!! false !!!');
    }

    return toReturn;
  }

  DebugIGuid(id: IGuid) {
    if (this.IsNotNullOrUndefinedBool('IGuid', id)) {
      this.LogVal('asShort', id.AsShort);
      this.LogVal('asString', id.AsString);
    }
  }

  DebugIDataOneDoc(dataOneDoc: IDataOneDoc) {
    this.FuncStart(this.DebugIDataOneDoc.name);

    this.Log('');
    this.Log(this.debugPrefix + this.DebugIDataOneDoc.name);

    if (dataOneDoc) {
      this.Log(this.debugPrefix + 'dataOneDoc: \t' + this.IsNullOrUndefined(dataOneDoc));
      this.Log(this.debugPrefix + 'dataOneDoc.XyyzId.asShort: \t' + this.IsNullOrUndefined(dataOneDoc.DocId.AsShort));
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
      this.Error(this.DebugIDataOneDoc.name, 'no targetDoc');
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

  HndlrClearDebugText(self: BaseDebug, verify: boolean = false): void {
    this.FuncStart(this.HndlrClearDebugText.name);
    var proceed: boolean = true;

    if (verify) {
      proceed = confirm('Clear Debug TextArea ?');
    }
    console.log('maker pink');
    console.log('enabled? ' + this.Enabled.toString());

    if (proceed) {
      var newText = '--- Debug Text Reset ---';
      self.__triggerAllDebugTextChangedCallbacks({
        NewText: newText,
        Append: false
      });
    }
    this.FuncEnd(this.HndlrClearDebugText.name);
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

  LogVal(textValName: string, textVal: IGuid): void;
  LogVal(textValName: string, textVal: string): void;
  LogVal(textValName: string, textVal: boolean): void;
  LogVal(textValName: string, textVal: number): void;
  LogVal(textValName: string, textVal: string | boolean | number | IGuid): any {
    if (!textVal) {
      textVal = '{notVal}';
    } else {
      var asGuid = <IGuid>textVal;
      if (asGuid.Type === 'IGuid') {
        textVal = asGuid.AsString;
      }
    }

    textVal = textVal.toString();

    textValName = StaticHelpers.BufferString(textValName.toString(), 26, ' ', false, false);

    const debugPrefix = '  ~~~  ';

    this.Log(debugPrefix + textValName + ' : ' + textVal);
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

      //if (this.ParentWindow) {
      //  this.ParentWindow.console.log(text);
      //}
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
  FuncStart(textOrFunc: string, optionalValue?: string): void;
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

  FuncEnd(text, optionalValueInput?: number)
  FuncEnd(text, optionalValueInput?: string)
  FuncEnd(text, optionalValueInput: string | number) {
    text = 'e) ' + text;
    if (!optionalValueInput) {
      optionalValueInput = '';
    }

    var optionalValue = optionalValueInput.toString();

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

    this.ErrorStack.push(
      {
        ContainerFunc: container,
        ErrorString: text
      }
    )

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
}