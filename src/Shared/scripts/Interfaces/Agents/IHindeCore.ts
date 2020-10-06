import { IInterruptAgent } from "./ITaskMonitorAgent";
import { ILoggerAgent } from "./ILoggerAgent";
import { IDiscriminator } from "./IDiscriminator";
import { IErrorHandlerAgent } from "./IErrorHandlerAgent";

export interface IHindeCore extends IDiscriminator {
    Logger: ILoggerAgent;
    ErrorHand: IErrorHandlerAgent;
    TaskMonitor: IInterruptAgent;
}
