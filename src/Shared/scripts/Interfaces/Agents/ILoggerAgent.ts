﻿import { LoggerConsoleWriter } from "../../Agents/LoggerAgent/LoggerConsoleWriter";
import { GuidData } from "../../Helpers/GuidData";
import { ICommonCore } from "./ICommonCore";
import { IHindeCore } from "./IHindeCore";
import { TaskMonitor } from "../../Agents/TaskMonitor/TaskMonitor";
import { ErrorHandlerAgent } from "../../Agents/ErrorHandler/ErrorHandlerAgent";
import { ICoreErrorHandler } from "./IErrorHandlerAgent";
import { ICoreTaskMonitor } from "./Core/ITaskMonitorAgent";

export interface ILoggerAgent  {
  

  FlushBuffer();
  __triggerAllDebugTextChangedCallbacks(arg0: { NewText: string; Append: boolean; });
  AddWriter(arg0: LoggerConsoleWriter);
  CtorName(name: string);
  FuncEnd(text: string | string[], optionalValueInput: string | number);
  FuncEnd(text: string | string[], optionalValueInput?: boolean);
  FuncEnd(text: string | string[], optionalValueInput?: number);
  FuncEnd(text: string | string[], optionalValueInput?: string);
  FuncStart(textOrFunc: string | string[], optionalValue: number | string | boolean): void;
  FuncStart(textOrFunc: string | string[], optionalValue?: boolean): void;
  FuncStart(textOrFunc: string | string[], optionalValue?: number): void;
  FuncStart(textOrFunc: string | string[], optionalValue?: string): void;
  HandlerClearDebugText(self: ICommonCore): void
  HandlerClearDebugText(self: ICommonCore, verify: boolean): void
  CTOREnd(text: string): void;
  CTORStart(text: string): void;
  IsNotNullOrUndefinedBool(title: string, dataToCheck: any);
  IsNullOrUndefined(dataToCheck: any): string;

  IntroduceSiblings(taskMonitor: ICoreTaskMonitor, errorHand: ICoreErrorHandler);

  LogImportant(text);
  Log(text);
  Log(text, optionalValue: string);
  Log(text, optionalValue: string, hasPrefix: boolean);


  LogAsJsonPretty(texValName: string, jsonObj: any);
  LogVal(textValName: string, textVal: string | boolean | Boolean | number | GuidData): any;
  MarkerA();
  MarkerB();
  MarkerC();
  MarkerD();
  SectionMarker(arg0: string);
}