import { ErrorHandlerAgent } from "../Agents/Agents/LoggerAgent/ErrorHandlerAgent";
import { LoggerAgent } from "../Agents/Agents/LoggerAgent/LoggerAgent";
import { TaskMonitor } from "../Agents/Agents/LoggerAgent/TaskMonitor";
import { TaskListMutationEvent_Subject } from "../Events/TaskListMutationEvent/TaskListMutationEvent_Subject";
import { ICommonCore } from "../Interfaces/Agents/ICommonCore";
import { CommonCore } from "../_CommonCoreBase";

export class CoreFactory {
  BuildCommonCore(): ICommonCore {
    let commonCore: ICommonCore = new CommonCore();

    commonCore.Logger = new LoggerAgent();
    commonCore.TaskMonitor = new TaskMonitor();
    commonCore.ErrorHand = new ErrorHandlerAgent();

    commonCore.Logger.IntroduceSiblings(commonCore.TaskMonitor, commonCore.ErrorHand);
    commonCore.TaskMonitor.IntroduceSiblings(commonCore.Logger, commonCore.ErrorHand);
    commonCore.ErrorHand.IntroduceSiblings(commonCore.Logger, commonCore.TaskMonitor);


    //this.HindeCore = {
    //  Logger: logger,
    //  ErrorHand: this.ErrorHand,
    //  TaskMonitor: this.TaskMonitor,
    //  TypeDiscriminator: TypeDiscriminator.IHindeCore,
    //}

    //this.HindeCore.Logger.SetCore(this.HindeCore);
    //this.HindeCore.ErrorHand.SetCore(this.HindeCore);
    //this.HindeCore.TaskMonitor.SetCore(this.HindeCore);

    let taskMutationEvent_Subject = new TaskListMutationEvent_Subject(commonCore);
    commonCore.TaskMonitor.InitAfterErrorHand(taskMutationEvent_Subject);

    return commonCore;
  }
}