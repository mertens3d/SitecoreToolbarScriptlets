import { ICoreErrorHandler } from "./IErrorHandlerAgent";
import { ILoggerAgent } from "./ILoggerAgent";
import { ICoreTaskMonitor } from "./Core/ITaskMonitorAgent";

export interface ICommonCore {
  Logger: ILoggerAgent,
  ErrorHand: ICoreErrorHandler,
  TaskMonitor: ICoreTaskMonitor,
}