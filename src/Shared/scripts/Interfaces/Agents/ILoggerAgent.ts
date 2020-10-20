import { LoggerConsoleWriter } from "../../Agents/LoggerAgent/LoggerConsoleWriter";
import { GuidData } from "../../Helpers/GuidData";
import { ICoreTaskMonitor } from "./Core/ITaskMonitorAgent";
import { ICommonCore } from "./ICommonCore";
import { ICoreErrorHandler } from "./IErrorHandlerAgent";

export interface ILoggerAgent  {
  

  FlushBuffer(): void;
  __triggerAllDebugTextChangedCallbacks(arg0: { NewText: string; Append: boolean; }): void;
  AddWriter(arg0: LoggerConsoleWriter): void;
  CtorName(name: string): void;
  FuncEnd(text: string | string[], optionalValueInput: string | number): void;
  FuncEnd(text: string | string[], optionalValueInput?: boolean): void;
  FuncEnd(text: string | string[], optionalValueInput?: number): void;
  FuncEnd(text: string | string[], optionalValueInput?: string): void;
  FuncStart(textOrFunc: string | string[], optionalValue: number | string | boolean): void;
  FuncStart(textOrFunc: string | string[], optionalValue?: boolean): void;
  FuncStart(textOrFunc: string | string[], optionalValue?: number): void;
  FuncStart(textOrFunc: string | string[], optionalValue?: string): void;
  HandlerClearDebugText(self: ICommonCore): void
  HandlerClearDebugText(self: ICommonCore, verify: boolean): void
  CTOREnd(text: string): void;
  CTORStart(text: string): void;
  IsNotNullOrUndefinedBool(title: string, dataToCheck: any): boolean;
  IsNullOrUndefined(dataToCheck: any): string;

  IntroduceSiblings(taskMonitor: ICoreTaskMonitor, errorHand: ICoreErrorHandler):void;

  LogImportant(text:string): void;

  Log(text: string):void;
  //Log(text, optionalValue: string);
  Log(text: string, hasPrefix: boolean): void;


  LogAsJsonPretty(texValName: string, jsonObj: any): void;
  LogVal(textValName: string, textVal: string | boolean | Boolean | number | GuidData): void;
  MarkerA(): void;
  MarkerB(): void;
  MarkerC(): void;
  MarkerD(): void;
  SectionMarker(arg0: string): void;
}