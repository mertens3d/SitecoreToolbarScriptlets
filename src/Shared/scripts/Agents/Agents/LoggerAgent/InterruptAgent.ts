import { IInterruptAgent, ITaskMonitorAgent } from "../../../Interfaces/Agents/ITaskMonitorAgent";
import { TaskListMutationEvent_Subject } from "../../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DesktopProxyMutationEvent/TaskListMutationEvent_Subject";
import { LoggerAgent } from "./LoggerAgent";
import { IErrorHandlerAgent } from "../../../Interfaces/Agents/IErrorHandlerAgent";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";
import { ITaskListMutationEvent_Payload } from "../../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DesktopProxyMutationEvent/ITaskListMutationEvent_Payload";
import { TaskMutationType } from "./TaskMutationType";

export class TaskMonitor implements ITaskMonitorAgent {
}

export class InterruptAgent implements IInterruptAgent {
  private TaskBucketStarted: string[] = [];
  private TaskBucketCompleted: string[] = [];
  private Logger: ILoggerAgent;
  public TaskMutationEvent_Subject: TaskListMutationEvent_Subject;
  private ErrorHand: IErrorHandlerAgent;
  private DelaySendMs: number = 3000;
  private CancelRequestedFlag: boolean = false;
  private IdleNotificationSent: boolean = false;
  private LastActivityTime: number;
  private MinElapsedBeforeIsIdleMs: number = 5000;
  constructor(logger: LoggerAgent, errorHand: IErrorHandlerAgent) {
    this.Logger = logger;
    this.ErrorHand = errorHand;

    this.TaskMutationEvent_Subject = new TaskListMutationEvent_Subject(this.Logger, this.ErrorHand, InterruptAgent.name);
  }

  AsyncTaskStarted(name: string) {
    this.MarkActivity();
    this.TaskBucketStarted.push(name);
    this.Logger.LogImportant('Task remaining : total - ' + this.TaskBucketStarted.length + ' : ' + this.totalTaskCount());

    this.BuildAndSendPayload(TaskMutationType.TaskAdded);

    this.LogValues();
  }

  private MarkActivity() {
    this.LastActivityTime = new Date().getTime();
    this.IdleNotificationSent = false;
  }

  IsTaskListEmpty(): boolean {
    return this.TaskBucketStarted.length === 0;
  }

  private totalTaskCount(): number {
    return this.TaskBucketCompleted.length + this.TaskBucketStarted.length;
  }

  AsyncTaskCompleted(name: string) {
    this.Logger.FuncStart(this.AsyncTaskCompleted.name, name);
    this.MarkActivity();
    let foundIndex: number = this.TaskBucketStarted.indexOf(name);
    if (foundIndex > -1) {
      let toRemove = this.TaskBucketStarted.splice(foundIndex, 1)
      this.TaskBucketCompleted.push(toRemove[0]);

      this.SendIfEmpty();
    } else {
      console.log('Error - mismatch on tasks ' + name);
      console.log(JSON.stringify(this.TaskBucketStarted, null, 2));
    }

    this.BuildAndSendPayload(TaskMutationType.TaskCompleted);
    this.LogValues()
    this.Logger.FuncEnd(this.AsyncTaskCompleted.name, name);
  }

  private LogValues() {
    this.Logger.LogImportant(this.LogValues.name + ' Task remaining : total - ' + this.TaskBucketStarted.length + ' : ' + this.totalTaskCount());
    if (this.AsyncTaskStarted.length < 20) {
      this.Logger.LogAsJsonPretty('TaskBucketStarted', this.TaskBucketStarted);
    }
  }

  private SendIfEmpty() {
    if (this.IsTaskListEmpty()) {
      this.DelaySend();
    }
  }

  private BuildAndSendPayload(mutationType: TaskMutationType) {
    console.log('Sending payload');

    let payload: ITaskListMutationEvent_Payload = {
      MutationType: mutationType,
      IsTaskEmpty: this.IsTaskListEmpty(),
      RemainingTaskCount: this.TaskBucketStarted.length,
      TotalTaskCount: this.totalTaskCount(),
      CompletedCount: this.TaskBucketCompleted.length,
    }

    this.TaskMutationEvent_Subject.NotifyObserversAsync(payload);
  }

  private TimeRemainingBeforeIdle(): number {
    let timeElapsedSinceLastActivity: number = new Date().getTime() - this.LastActivityTime;

    let timeRemainingBeforeIdle = this.MinElapsedBeforeIsIdleMs - timeElapsedSinceLastActivity;
    if (timeRemainingBeforeIdle < 0) {
      timeRemainingBeforeIdle = 0;
    }
    return timeRemainingBeforeIdle;
  }

  private TasksHaveGoneIdle(): boolean {
    let timeRemaining: number = this.TimeRemainingBeforeIdle();
    let toReturn: boolean = timeRemaining < 1;
    return toReturn;
  }

  private SendTaskHaveGoneIdle() {
    this.IdleNotificationSent = true;
    this.BuildAndSendPayload(TaskMutationType.TasksHaveGoneIdle);
  }

  private IsEmptyAndIdle() {
    let toReturn: boolean = this.IsTaskListEmpty() && this.TasksHaveGoneIdle();
    return toReturn;
  }

  private DelaySend() {
    if (!this.IdleNotificationSent) {
      if (this.IsEmptyAndIdle()) {
        this.SendTaskHaveGoneIdle();
      } else {
        setTimeout(() => {
          this.DelaySend();
        }, this.DelaySendMs);
      }
    }
  }

  CancelRequested(): void {
    this.CancelRequestedFlag = true;
  }

  IsCancelRequested(): boolean {
    return this.CancelRequestedFlag;
  }
}