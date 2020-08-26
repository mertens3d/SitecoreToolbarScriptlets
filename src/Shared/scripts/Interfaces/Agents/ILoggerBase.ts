import { IGuid } from "../IGuid";
import { IDataOneDoc } from "../IDataOneDoc";
import { IError } from "../IError";
import { IDataBrowserTab } from "../IDataBrowserWindow";
import { IDataBucketRestoreDesktop } from "../IDataBucketRestoreDesktop";
import { IDataOneIframe } from "../IDataOneIframe";
import { LoggerConsoleWriter } from "../../Agents/Agents/LoggerAgent/LoggerConsoleWriter";


export interface ILoggerAgent {
  __triggerAllDebugTextChangedCallbacks(arg0: { NewText: string; Append: boolean; });
  AddWriter(arg0: LoggerConsoleWriter);
  CtorName(name: string);
  DebugDataOneIframe(NewIframe: IDataOneIframe);
  DebugIGuid(Id: IGuid);
  EnabledStatus();
  ErrorAndContinue(container: string, text: any): void
  ErrorAndThrow(container: string, text: any): void
  ErrorStack: IError[];
  FuncEnd(text, optionalValueInput: string | number);
  FuncEnd(text, optionalValueInput?: number);
  FuncEnd(text, optionalValueInput?: string);
  FuncStart(textOrFunc: string, optionalValue: number | string | boolean): void;
  FuncStart(textOrFunc: string, optionalValue?: boolean): void;
  FuncStart(textOrFunc: string, optionalValue?: number): void;
  FuncStart(textOrFunc: string, optionalValue?: string): void;
  HndlrClearDebugText(self: ILoggerAgent): void
  HndlrClearDebugText(self: ILoggerAgent, verify: boolean ): void
  Init(valueToUse: boolean);
  InstantiateEnd(text: string): void;
  InstantiateStart(text: string): void;
  IsNotNullOrUndefinedBool(title: string, dataToCheck: any);
  IsNullOrUndefined(dataToCheck: any): string;
  Log(text);
  Log(text, optionalValue: string);
  Log(text, optionalValue: string, hasPrefix: boolean);
  LogAsJsonPretty(texValName: string, jsonObj: any);
  LogVal(textValName: string, textVal: string | boolean | number | IGuid): any;
  MarkerA();
  MarkerB();
  MarkerC();
  MarkerD();
  PromiseBucketDebug(promiseBucket: IDataBucketRestoreDesktop, name: string);
  SectionMarker(arg0: string);
  SetEnabled(arg0: boolean);
  ThrowIfNullOrUndefined(arg0: string, allAgents: any);
  ThrowIfNullOrUndefined(title: string, dataToCheck: any): void;
}