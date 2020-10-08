import { ErrorHandlerAgent } from './Agents/Agents/LoggerAgent/ErrorHandlerAgent';
import { IErrorHandlerAgent } from "./Interfaces/Agents/IErrorHandlerAgent";
import { IHindeCore } from "./Interfaces/Agents/IHindeCore";
import { ILoggerAgent } from './Interfaces/Agents/ILoggerAgent';
import { IInterruptAgent } from "./Interfaces/Agents/ITaskMonitorAgent";

export abstract class _HindeCoreBase {
    protected Logger: ILoggerAgent;
    protected HindeCore: IHindeCore;
    protected ErrorHand: IErrorHandlerAgent;
    TaskMonitor: IInterruptAgent;

    constructor(hindeCore: IHindeCore) {
        ErrorHandlerAgent.ThrowIfNullOrUndefinedStatic(_HindeCoreBase.name, [hindeCore]);
        ErrorHandlerAgent.ThrowIfNullOrUndefinedStatic(_HindeCoreBase.name, [hindeCore.Discriminator, hindeCore.ErrorHand, hindeCore.Logger, hindeCore.TaskMonitor]);

        this.Logger = hindeCore.Logger;
        this.HindeCore = hindeCore;
        this.ErrorHand = hindeCore.ErrorHand;
        this.TaskMonitor = hindeCore.TaskMonitor;
    }
}
