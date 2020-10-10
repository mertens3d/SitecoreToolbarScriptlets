import { IError } from "../IError";
import { ICoreTaskMonitor } from "./Core/ITaskMonitorAgent";
import { ILoggerAgent } from "./ILoggerAgent";

export interface ICoreErrorHandler  {
  IntroduceSiblings(Logger: ILoggerAgent, TaskMonitor: ICoreTaskMonitor);
  FormatejectMessage(arg0: string[], err: string): string;
  ErrorAndThrow(container: string | string[], text: string): void;
  ErrorAndContinue(container: string, text: any): void;
  WarningAndContinue(container: string, text: any): void;
  ErrorStack: IError[];
  ThrowIfNullOrUndefined(title: string| string[], objectsToCheck: any | any[]): void;
}