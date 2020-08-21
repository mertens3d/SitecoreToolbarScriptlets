import { IGuid } from "../IGuid";
import { IDataOneDoc } from "../IDataOneDoc";
import { IError } from "../IError";
import { IDataBrowserTab } from "../IDataBrowserWindow";
import { IDataBucketRestoreDesktop } from "../IDataBucketRestoreDesktop";
import { IDataOneIframe } from "../IDataOneIframe";


export interface ILoggerAgent {
  SetLogToStorageKey(CurrentStorageLogKey: string);
  __triggerAllDebugTextChangedCallbacks(arg0: { NewText: string; Append: boolean; });
  ThrowIfNullOrUndefined(arg0: string, allAgents: any);
  PromiseBucketDebug(promiseBucket: IDataBucketRestoreDesktop, name: string);
  DebugDataOneIframe(NewIframe: IDataOneIframe);
  CtorName(name: string);


  HndlrClearDebugText(self: ILoggerAgent): void
  HndlrClearDebugText(self: ILoggerAgent, verify: boolean ): void
  DebugIDataOneDoc(targetDoc: IDataOneDoc) :void;
  DebugIGuid(Id: IGuid);
  EnabledStatus();
  ErrorAndThrow(container: string, text: any): void
  ErrorAndContinue(container: string, text: any): void
  ErrorStack: IError[];
  AddDebugTextChangedCallback(caller: any, callback: Function): void
  FuncEnd(text, optionalValueInput: string | number);
  FuncEnd(text, optionalValueInput?: number);
  FuncEnd(text, optionalValueInput?: string);
  FuncStart(textOrFunc: string, optionalValue: number | string | boolean): void;
  FuncStart(textOrFunc: string, optionalValue?: number): void;
  FuncStart(textOrFunc: string, optionalValue?: string): void;
  FuncStart(textOrFunc: string, optionalValue?: boolean): void;
  Init(valueToUse: boolean);
  IsNotNullOrUndefinedBool(title: string, dataToCheck: any);
  IsNullOrUndefined(dataToCheck: any): string;
  ThrowIfNullOrUndefined(title: string, dataToCheck: any): void;
  Log(text);
  Log(text, optionalValue: string);
  Log(text, optionalValue: string, hasPrefix: boolean);
  LogAsJsonPretty(texValName: string, jsonObj: any);
  LogVal(textValName: string, textVal: string | boolean | number | IGuid): any;
  MarkerA();
  MarkerB();
  MarkerC();
  MarkerD();
  SetEnabled(arg0: boolean);
  DebugIDataBrowserTab(tabData: IDataBrowserTab);
}