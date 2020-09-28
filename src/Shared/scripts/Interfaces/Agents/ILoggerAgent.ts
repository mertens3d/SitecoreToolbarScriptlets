import { LoggerConsoleWriter } from "../../Agents/Agents/LoggerAgent/LoggerConsoleWriter";
import { GuidData } from "../../Helpers/GuidData";
import { IError } from "../IError";

export interface ILoggerAgent {
  FlushBuffer();
  __triggerAllDebugTextChangedCallbacks(arg0: { NewText: string; Append: boolean; });
  AddWriter(arg0: LoggerConsoleWriter);
  CtorName(name: string);
  ErrorAndContinue(container: string, text: any): void
  WarningAndContinue(container: string, text: any): void
  ErrorAndThrow(container: string, text: any): void
  ErrorStack: IError[];
  FuncEnd(text, optionalValueInput: string | number);
  FuncEnd(text, optionalValueInput?: boolean);
  FuncEnd(text, optionalValueInput?: number);
  FuncEnd(text, optionalValueInput?: string);
  FuncStart(textOrFunc: string, optionalValue: number | string | boolean): void;
  FuncStart(textOrFunc: string, optionalValue?: boolean): void;
  FuncStart(textOrFunc: string, optionalValue?: number): void;
  FuncStart(textOrFunc: string, optionalValue?: string): void;
  HandlerClearDebugText(self: ILoggerAgent): void
  HandlerClearDebugText(self: ILoggerAgent, verify: boolean): void
  CTOREnd(text: string): void;
  CTORStart(text: string): void;
  IsNotNullOrUndefinedBool(title: string, dataToCheck: any);
  IsNullOrUndefined(dataToCheck: any): string;
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
  IfNullOrUndefinedThrow(arg0: string, allAgents: any);
  IfNullOrUndefinedThrow(title: string, dataToCheck: any): void;
}