import { IInterruptAgent, ITaskMonitorAgent } from "../../../Interfaces/Agents/ITaskMonitorAgent";
import { TaskListMutationEvent_Subject } from "../../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DesktopProxyMutationEvent/TaskListMutationEvent_Subject";
import { LoggerAgent } from "./LoggerAgent";
import { IErrorHandlerAgent } from "../../../Interfaces/Agents/IErrorHandlerAgent";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";
import { ITaskListMutationEvent_Payload } from "../../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DesktopProxyMutationEvent/ITaskListMutationEvent_Payload";

export class TaskMonitor implements ITaskMonitorAgent {
}

export enum TaskMutationType {
  TaskAdded,
  TaskCompleted
}

export class InterruptAgent implements IInterruptAgent {
  private TrackedTasks: string[] = [];
  private Logger: ILoggerAgent;
  public TaskMutationEvent_Subject: TaskListMutationEvent_Subject;
  private ErrorHand: IErrorHandlerAgent;

  constructor(logger: LoggerAgent, errorHand: IErrorHandlerAgent) {
    this.Logger = logger;
    this.ErrorHand = errorHand;

    this.TaskMutationEvent_Subject = new TaskListMutationEvent_Subject(this.Logger, this.ErrorHand, InterruptAgent.name);
  }

  AsyncTaskStarted(name: string) {
    this.TrackedTasks.push(name);
    let payload: ITaskListMutationEvent_Payload = {
      MutationType: TaskMutationType.TaskAdded,
      IsTaskEmpty: this.IsTaskListEmpty(),
    }
    this.TaskMutationEvent_Subject.NotifyObserversAsync(payload);
  }

  IsTaskListEmpty(): boolean {
    return this.TrackedTasks.length === 0;
  }

  AsyncTaskCompleted(name: string) {
    let foundIndex: number = this.TrackedTasks.indexOf(name);
    if (foundIndex > -1) {
      this.TrackedTasks.splice(foundIndex, 1);

      let payload: ITaskListMutationEvent_Payload = {
        MutationType: TaskMutationType.TaskCompleted,
        IsTaskEmpty: this.IsTaskListEmpty(),
      }
      this.TaskMutationEvent_Subject.NotifyObserversAsync(payload);
    } else {
      console.log('Error - mismatch on tasks ' + name);
      console.log(JSON.stringify(this.TrackedTasks, null, 2));
    }
  }
  private CancelRequestedFlag: boolean = false;

  CancelRequested(): void {
    this.CancelRequestedFlag = true;
  }

  IsCancelRequested(): boolean {
    return this.CancelRequestedFlag;
  }
}