import { LoggerConsoleWriter } from "../../Agents/LoggerAgent/LoggerConsoleWriter";
import { GuidData } from "../../Helpers/GuidData";
import { ICommonCore } from "./ICommonCore";
import { IHindeCore } from "./IHindeCore";
import { TaskMonitor } from "../../Agents/LoggerAgent/TaskMonitor";
import { ErrorHandlerAgent } from "../../Agents/LoggerAgent/ErrorHandlerAgent";
import { ICoreErrorHandler } from "./IErrorHandlerAgent";
import { ICoreTaskMonitor } from "./Core/ITaskMonitorAgent";

export interface ILoggerAgent  {
  

  FlushBuffer();
  __triggerAllDebugTextChangedCallbacks(arg0: { NewText: string; Append: boolean; });
  AddWriter(arg0: LoggerConsoleWriter);
  CtorName(name: string);
  FuncEnd(text, optionalValueInput: string | number);
  FuncEnd(text, optionalValueInput?: boolean);
  FuncEnd(text, optionalValueInput?: number);
  FuncEnd(text, optionalValueInput?: string);
  FuncStart(textOrFunc: string, optionalValue: number | string | boolean): void;
  FuncStart(textOrFunc: string, optionalValue?: boolean): void;
  FuncStart(textOrFunc: string, optionalValue?: number): void;
  FuncStart(textOrFunc: string, optionalValue?: string): void;
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