import { IError } from "../IError";
import { ICoreTaskMonitor } from "./Core/ITaskMonitorAgent";
import { ILoggerAgent } from "./ILoggerAgent";

export interface ICoreErrorHandler  {
  HandleCancelReaction(arg0: string, arg1: string);
  IntroduceSiblings(Logger: ILoggerAgent, TaskMonitor: ICoreTaskMonitor);
  FormatRejectMessage(arg0:string| string[], err: string): string;
  HandleFatalError(container: string | string[], text: string): void;
  ErrorAndContinue(container: string, text: any): void;
  WarningAndContinue(container: string, text: any): void;
  ErrorStack: IError[];
  ThrowIfNullOrUndefined(title: string| string[], objectsToCheck: any | any[]): void;
}