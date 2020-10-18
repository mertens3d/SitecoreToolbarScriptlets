import { StaticHelpers } from "../../Classes/StaticHelpers";
import { BufferChar } from "../../Enums/BufferChar";
import { BufferDirection } from "../../Enums/BufferDirection";
import { GuidData } from "../../Helpers/GuidData";
import { ILoggerAgent } from "../../Interfaces/Agents/ILoggerAgent";
import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";
import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { ILoggerWriter } from "../../Interfaces/Agents/ILoggerWriter";
import { IDataDebugCallback } from "../../Interfaces/IDataDebugCallback";
import { ICallbackDataDebugTextChanged } from "../../Interfaces/ICallbackDataDebugTextChanged";
import { LogWriterBuffer } from "./LogWriterBuffer";
import { LoggerTimer } from "./LoggerTimer";
import { SharedConst } from "../../SharedConst";
import { _CommonBase } from "../../_CommonCoreBase";
import { TaskMonitor } from "../TaskMonitor/TaskMonitor";
import { ErrorHandlerAgent } from "../ErrorHandler/ErrorHandlerAgent";

export class LoggerAgent implements ILoggerAgent {
  private __callDepth: number;
  private __debugTextChangedCallbacks: IDataDebugCallback[] = [];
  private AllLogWriters: ILoggerWriter[] = [];
  private AltColor: string;
  private BufferWriter: LogWriterBuffer;
  private HasWriters: boolean;
  private MaxIndent: number = 20;
  readonly TypeDiscriminator = TypeDiscriminator.ILoggerAgent;
  Timer: LoggerTimer;
  UseTimeStamp: boolean = true;

  private MaxDepthBeforeThrow: number = 2000; //this is to avoid extreme runaway code
  private ErrorHand: ErrorHandlerAgent;
  private TaskMonitor: TaskMonitor;

  constructor() {
    this.Instantiate();
  }

  private Instantiate() {
    this.Timer = new LoggerTimer;
    this.BufferWriter = new LogWriterBuffer();
    this.AddWriter(this.BufferWriter);
    this.__callDepth = -1;
    this.LogVal('TimeStamp', this.Timer.LogTimeStamp());
  }

  IntroduceSiblings(taskMonitor: TaskMonitor, errorHand: ErrorHandlerAgent) {
    this.TaskMonitor = taskMonitor;
    this.ErrorHand = errorHand;
  }

  FlushBuffer() {
    this.RemoveWriter(this.BufferWriter);

    this.LogVal('TimeStamp B', Date.now());

    let bufferAr: string[] = this.BufferWriter.GetBuffer();

    for (var idx = 0; idx < bufferAr.length; idx++) {
      this.Log(bufferAr[idx]);
    }
  }

  RemoveWriter(BufferWriter: LogWriterBuffer) {
    for (var idx = 0; idx < this.AllLogWriters.length; idx++) {
      let candidate: ILoggerWriter = this.AllLogWriters[idx];
      if (candidate == BufferWriter) {
        this.AllLogWriters.splice(idx, 1);
        break;
      }
    }
  }

  AddWriter(writter: ILoggerWriter) {
    this.HasWriters = true;
    this.AllLogWriters.push(writter);
  }

  SectionMarker(sectionTag: string): void {
    this.Log("");
    this.Log("======================= " + sectionTag + " =======================");
    this.Log("");
  }

  //IsNullOrUndefinedThrow(title: string, subject: any): void {
  //  if (!this.IsNotNullOrUndefinedBool(title, subject)) {
  //    throw 'Failed';
  //  }
  //}

  IsNotNullOrUndefinedBool(title, subject): boolean {
    var toReturn: boolean = false;
    if (subject) {
      if ((typeof subject) === 'undefined') {
        this.LogVal(title + ' Is Not Undefined', '!!! false !!!');
      }
      else {
        //this.LogVal(title + ' Is Not Null', 'true');
        toReturn = true;
      }
    }
    else {
      this.LogVal(title + ' Is Not Null', '!!! false !!!');
    }
    return toReturn;
  }

  HandlerClearDebugText(self: ICommonCore, verify: boolean = false): void {
    this.FuncStart(this.HandlerClearDebugText.name);
    var proceed: boolean = true;
    if (verify) {
      proceed = confirm('Clear Debug TextArea ?');
    }
    if (proceed) {
      var newText = '--- Debug Text Reset ---';
      //todo - put back? self.__triggerAllDebugTextChangedCallbacks({
      //  NewText: newText,
      //  Append: false
      //});
    }
    this.FuncEnd(this.HandlerClearDebugText.name);
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

  MarkerE() { this.__markerRaw('E'); }

  MarkerF() { this.__markerRaw('F'); }

  private __markerRaw(marker) {
    this.Log('Marker ' + marker);
  }

  LogAsJsonPretty(texValName: string, jsonObj: any) {
    try {
      this.LogVal(texValName, JSON.stringify(jsonObj, null, 2));
    } catch (err) {
      this.Log('Unable to stringify obj');
    }
  }

  LogVal(textValName: string, textVal: GuidData): void;
  LogVal(textValName: string, textVal: string): void;
  LogVal(textValName: string, textVal: boolean): void;
  LogVal(textValName: string, textVal: number): void;
  LogVal(textValName: string, textVal: string | boolean | number | GuidData): any {
    if (typeof textVal === 'undefined') {
      textVal = '{undefined}';
    }
    else if (textVal === null) {
      textVal = '{null}';
    }
    else {
      var asGuid = <GuidData>textVal;
      if (typeof asGuid === typeof GuidData) {
        textVal = asGuid.Raw;
      }
    }
    textVal = textVal.toString();
    textValName = StaticHelpers.BufferString(textValName.toString(), 26, BufferChar.space, BufferDirection.right);
    const debugPrefix = '~~ ';

    let rawText: string = debugPrefix + textValName + ' : ' + textVal;

    if (this.AltColor === SharedConst.Const.Colors.ConsoleStyles.StyleFgBlue) {
      this.AltColor = SharedConst.Const.Colors.ConsoleStyles.StyleFgMagenta;
    } else {
      this.AltColor = SharedConst.Const.Colors.ConsoleStyles.StyleFgBlue;
    }
    let formattedText: string = this.StyleFormat(this.AltColor, rawText);
    this.Log(formattedText);
  }

  LogImportant(text) {
    text = this.StyleFormat(SharedConst.Const.Colors.ConsoleStyles.StyleBgYellow, text);
    this.Log(text);
  }
  async Log(text, hasPrefix = false) {
    if (this.HasWriters) {
      var indent = '  ';

      let indentDepth = this.__callDepth % this.MaxIndent;
      for (var idx = 0; idx < indentDepth; idx++) {
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

      if (this.UseTimeStamp) {
        let timeDiff = this.Timer.GetTimeDiff() + '  ';
        text = timeDiff + text;
      }

      this.WriteToAllWriters(text);
    }
  }

  private WriteToAllWriters(text: string) {
    if (this.AllLogWriters) {
      this.AllLogWriters.forEach((oneWriter) => {
        if (oneWriter) {
          try {
            oneWriter.WriteText(text)
          } catch (err) {
            console.log(this.WriteToAllWriters.name + ' ' + oneWriter.FriendlyName + ' | ' + err);
          }
        } else {
          console.log('Null writer');
        }
      });
    }
  }

  __triggerAllDebugTextChangedCallbacks(data: ICallbackDataDebugTextChanged) {
    for (var idx = 0; idx < this.__debugTextChangedCallbacks.length; idx++) {
      var oneCallback: IDataDebugCallback = this.__debugTextChangedCallbacks[idx];
      oneCallback.Func(oneCallback.Caller, data);
    }
  }

  StyleFormat(color: string, text: string) {
    return SharedConst.Const.Colors.ConsoleStyles.StyleEsc + color + text + SharedConst.Const.Colors.ConsoleStyles.StyleEsc + SharedConst.Const.Colors.ConsoleStyles.StyleReset;
  }

  CtorName(ctorName: string) {
    this.Log('Constructor: ' + ctorName);
  }

  private resolveFuncText(text: string | string[]): string {
    let displayText: string = '';

    if (Array.isArray(text)) {
      let isFirst: boolean = true;
      text.forEach((oneText: string) => {
        if (!isFirst) {
          displayText += '.';
        }
        isFirst = false;
        displayText += oneText;
      }
      );
    } else {
      displayText = text.toString();
    }

    return displayText;
  }

  private AddOptionalValueToText(text: string, optionalValue: number | string | boolean) {
    let toReturn: string = text;

    if (optionalValue) {
      optionalValue = optionalValue.toString();

      if (optionalValue.length > 0) {
        toReturn = toReturn + ' : ' + optionalValue;
      }
    }

    return toReturn;
  }
  FuncStart(text: string | string[], optionalValue?: number): void;
  FuncStart(text: string | string[], optionalValue?: string): void;
  FuncStart(text: string | string[], optionalValue?: boolean): void;
  FuncStart(text: string | string[], optionalValue: number | string | boolean): void {
    text = this.resolveFuncText(text);

    if (optionalValue) {
      text = this.AddOptionalValueToText(text, optionalValue)
    }

    text = 's' + ' ' + this.__callDepth + ') ' + text;

    let formatted = this.StyleFormat(SharedConst.Const.Colors.ConsoleStyles.StyleFgGreen, text);

    this.Log(formatted, true);
    this.__callDepth++;
    if (this.__callDepth > this.MaxDepthBeforeThrow) {
      throw ('Logger - Max Depth Exceeded: ' + this.__callDepth);
    }
  }

  CTORStart(text: string): void {
    this.FuncStart("[CTOR] " + text);
  }

  CTOREnd(text: string): void {
    this.FuncEnd("[CTOR] " + text);
  }

  FuncEnd(text: string | string[], optionalValueInput?: number);
  FuncEnd(text: string | string[], optionalValueInput?: boolean);
  FuncEnd(text: string | string[], optionalValueInput?: string);
  FuncEnd(text: string | string[], optionalValueInput: string | number | boolean) {
    text = this.resolveFuncText(text);

    this.__callDepth--;
    if (this.__callDepth < 0) {
      this.__callDepth = 0;
    }

    text = 'e' + ' ' + this.__callDepth + ') ' + text;

    if (optionalValueInput) {
      text = this.AddOptionalValueToText(text, optionalValueInput);
    }

    let formatted = this.StyleFormat(SharedConst.Const.Colors.ConsoleStyles.StyleFgRed, text);

    this.Log(formatted, true);
  }

  NotNullCheck(title: string, value: any): void {
    if (typeof value === 'undefined') {
      this.LogVal(title, 'Is Undefined');
    }
    else if (!value) {
      this.LogVal(title, 'Is Null');
    }
    else {
      this.LogVal(title, 'Is Not Null');
    }
  }

  IsNullOrUndefined(subject): string {
    var toReturn = '{unknown}';
    if (subject) {
      if ((typeof subject) === 'undefined') {
        toReturn = 'Is Undefined';
      }
      else {
        toReturn = 'Not Null';
      }
    }
    else {
      toReturn = 'Is Null';
    }
    return toReturn;
  }
}