import { ICommonCore } from "./Interfaces/Agents/ICommonCore";
import { ICoreErrorHandler } from "./Interfaces/Agents/IErrorHandlerAgent";
import { ILoggerAgent } from './Interfaces/Agents/ILoggerAgent';
import { ICoreTaskMonitor } from "./Interfaces/Agents/Core/ITaskMonitorAgent";

export class CommonCore implements ICommonCore {
  public Logger: ILoggerAgent = null;
  public ErrorHand: ICoreErrorHandler = null;
  public TaskMonitor: ICoreTaskMonitor = null;
}

export abstract class _CommonBase {
  protected CommonCore: ICommonCore = null;
  public Logger: ILoggerAgent = null;
  public ErrorHand: ICoreErrorHandler = null;
  public TaskMonitor: ICoreTaskMonitor = null;

  constructor(commonCore: ICommonCore) {
    //ErrorHandlerAgent.ThrowIfNullOrUndefinedStatic(_CommonBase.name, [commonCore]);
    //ErrorHandlerAgent.ThrowIfNullOrUndefinedStatic(_CommonBase.name, [commonCore.ErrorHand, commonCore.Logger, commonCore.TaskMonitor]);

    this.SetCore(commonCore)
  }

  SetCore(commonCore: ICommonCore) {
    if (commonCore !== null) {
      this.CommonCore = commonCore;
      this.Logger = commonCore.Logger;
      this.ErrorHand = commonCore.ErrorHand;
      this.TaskMonitor = commonCore.TaskMonitor;
    }
  }
}