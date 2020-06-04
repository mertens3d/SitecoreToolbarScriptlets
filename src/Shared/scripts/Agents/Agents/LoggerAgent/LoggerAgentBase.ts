import { IDataOneDoc } from "../../../Interfaces/IDataOneDoc";
import { IDataDebugCallback } from "../../../Interfaces/DebugCallback";
import { ICallbackDataDebugTextChanged } from "../../../Interfaces/ICallbackDataDebugTextChanged";
import { IGuid } from "../../../Interfaces/IGuid";
import { IError } from "../../../Interfaces/IError";
import { StaticHelpers } from "../../../Classes/StaticHelpers";
import { BufferChar } from "../../../Enums/BufferChar";
import { BufferDirection } from "../../../Enums/BufferDirection";
import { SharedConst } from "../../../SharedConst";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerBase";
import { IOneGenericSetting } from "../../../Interfaces/Agents/IOneGenericSetting";
import { IDataBrowserTab } from "../../../Interfaces/IDataBrowserWindow";
import { scWindowType } from "../../../Enums/scWindowType";
import { IDataBucketRestoreDesktop } from "../../../Interfaces/IDataBucketRestoreDesktop";
import { PayloadDataFromPopUp } from "../../../Classes/PayloadDataReqPopUp";
import { IDataPayloadSnapShot } from "../../../Interfaces/IDataPayloadSnapShot";
import { IDataOneIframe } from "../../../Interfaces/IDataOneIframe";
import { ICurrStateContent } from "../../../Interfaces/ICurrState";
import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";
import { RollingLogIdDrone } from "../../Drones/RollingLogIdDrone";

export class LoggerAgent implements ILoggerAgent {
  private __callDepth: number;
  private LogToConsoleEnabled: boolean;
  LogHasBeenInit: boolean = false;
  ErrorStack: IError[] = [];
  LogPreInitBuffer: string[] = [];
  private __debugTextChangedCallbacks: IDataDebugCallback[] = [];
  private RollingLogId: RollingLogIdDrone;
  constructor() {
    this.__callDepth = -1;
    console.log('default: ' + SharedConst.Const.Settings.Defaults.LogToConsole);
    this.LogToConsoleEnabled = SharedConst.Const.Settings.Defaults.LogToConsole;
    this.LogHasBeenInit = false;

    this.RollingLogId = new RollingLogIdDrone();
    this.RollingLogId.Init();

    console.log('(ctor) Logger log to console enabled: ' + this.LogToConsoleEnabled);
  }

  Init(val: boolean) {
    this.LogToConsoleEnabled = val;
    this.LogHasBeenInit = true;

    //console.log('Logger Enabled:' + this.LogToConsoleEnabled);

    if (this.LogToConsoleEnabled) {
      var iterCheckMax = 1000;
      while (this.LogPreInitBuffer.length > 0 && iterCheckMax > 0) {
        iterCheckMax--;
        this.Log(this.LogPreInitBuffer.shift());
      }
    }

    console.log('(init) Logger log to console enabled: ' + this.LogToConsoleEnabled);
  }

  SetEnabled(newValue: boolean) {
    this.LogToConsoleEnabled = newValue;
    console.log('Logging set to: ' + newValue);
  }
  DebugIDataBrowserTab(browserWindow: IDataBrowserTab) {
    if (this.IsNotNullOrUndefinedBool('IDataBrowserWindow', browserWindow)) {
      this.LogVal('WindowType', scWindowType[browserWindow.UrlParts.ScWindowType]);
      //this.DebugIDataOneDoc(browserWindow.DataDocSelf);
      //this.DebugWindow(browserWindow.Window);
    }
  }
  EnabledStatus(): boolean {
    return this.LogToConsoleEnabled;
  }
  debugPrefix: string = '\t\t';
  //DebugObjVarVal(textValName: string, textVal: number)
  //DebugObjVarVal(textValName: string, textVal: string)
  //DebugObjVarVal(textValName: string, textVal: string | number) {
  //  const debugPrefix = '   ~~~   ';
  //  this.LogVal(debugPrefix + textValName, textVal.toString())
  //}
  DebugIdataPopUpSettings(toReturn: IOneGenericSetting): void {
    //this.FuncStart(this.DebugSettings.name);
    this.LogVal('Settings', JSON.stringify(toReturn));
    //this.FuncEnd(this.DebugSettings.name);
  }

  DebugWindow(window: Window) {
    if (this.IsNotNullOrUndefinedBool('window', window)) {
    }
  }

  ThrowIfNullOrUndefined(title: string, subject: any): void {
    if (!this.IsNotNullOrUndefinedBool(title, subject)) {
      throw 'Failed';
    }
  }

  IsNotNullOrUndefinedBool(title, subject): boolean {
    var toReturn: boolean = false;
    if (subject) {
      if ((typeof subject) === 'undefined') {
        this.LogVal(title + ' Is Not Undefined', '!!! false !!!');
      }
      else {
        this.LogVal(title + ' Is Not Null', 'true');
        toReturn = true;
      }
    }
    else {
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
  //DebugIDataOneDoc(dataOneDoc: IDataOneDoc) {
  //  if (this.IsNotNullOrUndefinedBool('IDataOneDoc', dataOneDoc)) {
  //    if (this.IsNotNullOrUndefinedBool('Document', dataOneDoc.ContentDoc)) {
  //      this.LogVal('Doc Url', dataOneDoc.ContentDoc.location.href);
  //    }
  //  }
  //}
  DebugIDataOneDoc(dataOneDoc: IDataOneDoc) {
    this.FuncStart(this.DebugIDataOneDoc.name);
    this.Log('');
    this.Log(this.debugPrefix + this.DebugIDataOneDoc.name);
    if (dataOneDoc) {
      this.LogVal(this.debugPrefix + 'dataOneDoc', this.IsNullOrUndefined(dataOneDoc));
      this.LogVal(this.debugPrefix + 'dataOneDoc.XyyzId.asShort:', this.IsNullOrUndefined(dataOneDoc.DocId.AsShort));
      this.LogVal(this.debugPrefix + 'dataOneDoc.Document:', this.IsNullOrUndefined(dataOneDoc.ContentDoc));
      this.LogVal(this.debugPrefix + 'dataOneDoc.DocId.AsBracedGuid ', dataOneDoc.DocId.AsBracedGuid);

      if (dataOneDoc.ContentDoc) {
        this.LogVal(this.debugPrefix + 'dataOneDoc.Document.readyState:', dataOneDoc.ContentDoc.readyState);
        if (dataOneDoc.ContentDoc.location) {
          this.LogVal(this.debugPrefix + 'targetDoc.location.href', dataOneDoc.ContentDoc.location.href);
        }
        else {
          this.Log(this.debugPrefix + 'dataOneDoc.Document.location - does not exist');
        }
      }
      else {
        this.Log(this.debugPrefix + 'dataOneDoc.Document - does not exist');
      }
    }
    else {
      this.ErrorAndThrow(this.DebugIDataOneDoc.name, 'no targetDoc');
    }
    this.Log('');

    this.FuncEnd(this.DebugIDataOneDoc.name);
  }
  AddDebugTextChangedCallback(caller: any, callback: Function): void {
    //console.log('========================================');
    this.__debugTextChangedCallbacks.push({
      Caller: caller,
      Func: callback
    });
  }
  HndlrClearDebugText(self: ILoggerAgent, verify: boolean = false): void {
    this.FuncStart(this.HndlrClearDebugText.name);
    var proceed: boolean = true;
    if (verify) {
      proceed = confirm('Clear Debug TextArea ?');
    }
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
  MarkerE() { this.__markerRaw('E'); }
  MarkerF() { this.__markerRaw('F'); }
  private __markerRaw(marker) {
    this.Log('Marker ' + marker);
  }

  LogAsJsonPretty(texValName: string, jsonObj: any) {
    this.LogVal(texValName, JSON.stringify(jsonObj, null, 1));
  }

  LogVal(textValName: string, textVal: IGuid): void;
  LogVal(textValName: string, textVal: string): void;
  LogVal(textValName: string, textVal: boolean): void;
  LogVal(textValName: string, textVal: number): void;
  LogVal(textValName: string, textVal: string | boolean | number | IGuid): any {
    if (typeof textVal === 'undefined') {
      textVal = '{undefined}';
    }
    else if (textVal === null) {
      textVal = '{null}';
    }
    else {
      var asGuid = <IGuid>textVal;
      if (asGuid.Type === 'IGuid') {
        textVal = asGuid.AsString;
      }
    }
    textVal = textVal.toString();
    textValName = StaticHelpers.BufferString(textValName.toString(), 50, BufferChar.space, BufferDirection.right);
    const debugPrefix = '  ~~~  ';
    this.Log(debugPrefix + textValName + ' : ' + textVal);
  }
  Log(text, optionalValue: string = '', hasPrefix = false) {
    if (this.LogToConsoleEnabled || !this.LogHasBeenInit) {
      var indent = '  ';
      //text =  indent.repeat(this.__indentCount) + text;
      for (var idx = 0; idx < this.__callDepth; idx++) {
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

      if (this.LogToConsoleEnabled) {
        console.log(text);
        this.WriteLogToStorage(text);
      } else if (!this.LogHasBeenInit) {
        this.LogPreInitBuffer.push(text);
      }
    }
  }

  StorageLogCombined: string = "";

  async WriteLogToStorage(logMessage: any): Promise<void> {
    return new Promise(async () => {
      

      this.StorageLogCombined += "|||" + JSON.stringify(logMessage);
      let storageObj: browser.storage.StorageObject = {
        [this.RollingLogId. CurrentStorageLogKey]: this.StorageLogCombined
      }
      await browser.storage.local.set(storageObj);
    });
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
      this.DebugIDataOneDoc(dataOneIframe.ContentDoc);
      //this.Log('dataOneIframe.IframeElem: \t' + this.IsNullOrUndefined(dataOneIframe.IframeElem));
      //this.Log('dataOneIframe.Id: \t' + this.IsNullOrUndefined(dataOneIframe.Id));
      //if (dataOneIframe.Id) {
      //  this.Log('dataOneIframe.Id.asShort: \t' + this.IsNullOrUndefined(dataOneIframe.Id.asShort));
      //}
      //this.Log('dataOneIframe.DocElem: \t' + this.IsNullOrUndefined(dataOneIframe.Index));
    }
    this.FuncEnd(this.DebugDataOneIframe.name);
  }

  DebugPayloadDataFromPopUp(data: PayloadDataFromPopUp) {
    if (this.IsNotNullOrUndefinedBool('PayloadDataFromPopUp', data)) {
      this.LogVal('idOfSelect', data.IdOfSelect);
      this.DebugIGuid(data.IdOfSelect);
      this.DebugIDataPayloadSnapShot(data.SnapShotSettings);
    }
  }
  DebugIDataPayloadSnapShot(snapShotSettings: IDataPayloadSnapShot) {
    if (this.IsNotNullOrUndefinedBool('IDataPayloadSnapShot', snapShotSettings)) {
      this.LogVal('Flavor', StaticHelpers.FlavorAsString(snapShotSettings.Flavor));
      this.LogVal('Nickname', snapShotSettings.SnapShotNewNickname);
    }
  }
  //DebugIDataContentPrefs(prefs: IOneGenericSetting) {
  //      if (this.IsNotNullOrUndefinedBool('IDataContentPrefs', prefs)) {
  //          if (this.IsNotNullOrUndefinedBool('MaxAutoSaveCount', prefs.MaxAutoSaveCount)) {
  //              this.LogVal('MaxAutoSaveCount', prefs.MaxAutoSaveCount);
  //          }
  //      }
  //  }
  //DebugIDataBrowserWindow(targetWindow: IDataBrowserWindow) {
  //  this.NotNullCheck('toReturn', targetWindow);
  //  this.NotNullCheck('toReturn', targetWindow.DataDocSelf);
  //  this.NotNullCheck('toReturn', targetWindow.DataDocSelf.Document);
  //  this.NotNullCheck('toReturn', targetWindow.DataDocSelf.Document.location);
  //  this.NotNullCheck('toReturn', targetWindow.DataDocSelf.Document.location.href);
  //  this.LogVal('targetWindow.DataDocSelf.Document.location.href', targetWindow.DataDocSelf.Document.location.href);
  //}
  DebugObjState(state: ICurrStateContent) {
    if (this.IsNotNullOrUndefinedBool('State', state)) {
      if (this.IsNotNullOrUndefinedBool('CurrentSnapShots', state.SnapShotsMany.CurrentSnapShots)) {
        this.LogVal('Snapshot count', state.SnapShotsMany.CurrentSnapShots.length);
      }
      //if (this.IsNotNullOrUndefinedBool('PageType', state.WindowType)) {
      //  this.LogVal('scWindowType : ', scWindowType[state.WindowType]);
      //}
      //if (this.IsNotNullOrUndefinedBool('PageType', state.Url)) {
      //  this.LogVal('Url : ', state.Url);
      //}
    }
  }

  PromiseBucketDebug(promiseBucket: IDataBucketRestoreDesktop, friendlyName: string) {
    this.FuncStart(this.PromiseBucketDebug.name, friendlyName);
    this.Log('promiseBucket : ' + this.IsNullOrUndefined(promiseBucket));
    if (promiseBucket && typeof (promiseBucket) !== 'undefined') {
      this.Log('promiseBucket.IFramesbefore: ' + this.IsNullOrUndefined(promiseBucket.IFramesbefore));
      //this.Log('promiseBucket.targetWindow: ' + this.IsNullOrUndefined(promiseBucket.targetWindow));
      this.Log('promiseBucket.oneTreeState: ' + this.IsNullOrUndefined(promiseBucket.oneTreeState));
      //this.Log('promiseBucket.NewIframe: ' + this.IsNullOrUndefined(promiseBucket.NewIframe));
      //if (promiseBucket.NewIframe) {
      //  this.DebugDataOneIframe(promiseBucket.NewIframe);
      //}
    }
    this.FuncEnd(this.PromiseBucketDebug.name, friendlyName);
  }

  __triggerAllDebugTextChangedCallbacks(data: ICallbackDataDebugTextChanged) {
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
    textOrFunc = 's' + ' ' + this.__callDepth + ') ' + textOrFunc;
    if (!optionalValue) {
      optionalValue = '';
    }
    else {
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
    this.__callDepth++;
    if (this.__callDepth > 10) {
      this.__callDepth = 10;
    }
  }
  FuncEnd(text, optionalValueInput?: number);
  FuncEnd(text, optionalValueInput?: string);
  FuncEnd(text, optionalValueInput: string | number) {
    this.__callDepth--;
    if (this.__callDepth < 0) {
      this.__callDepth = 0;
    }

    text = 'e' + ' ' + this.__callDepth + ') ' + text;
    if (!optionalValueInput) {
      optionalValueInput = '';
    }
    var optionalValue = optionalValueInput.toString();
    if (optionalValue.length > 0) {
      text = text + ' : ' + optionalValue;
    }

    this.Log(text, optionalValue, true);
  }
  ErrorAndThrow(container: string, text: any): void {
    if (!container) {
      container = 'unknown';
    }
    if (!text) {
      text = 'unknown';
    }
    this.ErrorStack.push({
      ContainerFunc: container,
      ErrorString: text
    });
    this.Log('');
    this.Log('\t\t** ERROR ** ' + container);
    this.Log('');
    this.Log('\t\t  ' + text);
    this.Log('');
    this.Log('\t\t** ERROR ** ' + container);
    this.Log('');

    throw container + " " + text
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