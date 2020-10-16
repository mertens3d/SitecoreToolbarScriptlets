import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";
import { ITaskListMutationEvent_Payload } from "../../Events/TaskListMutationEvent/ITaskListMutationEvent_Payload";
import { TaskListMutationEvent_Subject } from "../../Events/TaskListMutationEvent/TaskListMutationEvent_Subject";
import { ICoreErrorHandler } from "../../Interfaces/Agents/IErrorHandlerAgent";
import { ILoggerAgent } from "../../Interfaces/Agents/ILoggerAgent";
import { TaskMutationType } from "../../Enums/TaskMutationType";
import { ICoreTaskMonitor } from "../../Interfaces/Agents/Core/ITaskMonitorAgent";

export class TaskMonitor implements ICoreTaskMonitor {
  private TaskBucketStarted: string[] = [];
  private TaskBucketCompleted: string[] = [];
  public TaskMutationEvent_Subject: TaskListMutationEvent_Subject;
  private DelaySendMs: number = 20;
  private CancelRequestedFlag: boolean = false;
  private IdleNotificationSent: boolean = false;
  private LastActivityTime: number;
  private MinElapsedBeforeIsIdleMs: number = 20;
  TypeDiscriminator = TypeDiscriminator.TaskMonitor;
  private ErrorHand: ICoreErrorHandler;
  private Logger: ILoggerAgent;

  constructor() {
  }

  IntroduceSiblings(logger: ILoggerAgent, errorHand: ICoreErrorHandler) {
    this.Logger = logger;
    this.ErrorHand = errorHand;
  }

  IntroduceCoreSiblings(logger: ILoggerAgent, errorHand: ICoreErrorHandler) {
    this.Logger = logger;
    this.ErrorHand = errorHand;
  }

  ResetCancel() {
    this.CancelRequestedFlag = false;
  }

  InitAfterErrorHand(taskMutationEvent_Subject: TaskListMutationEvent_Subject) {
    this.TaskMutationEvent_Subject = taskMutationEvent_Subject;

    //if (this.ErrorHand) {
    //  this.TaskMutationEvent_Subject = new TaskListMutationEvent_Subject(this.CommonCore);
    //} else {
    //  throw ('no error handler attached');
    //}
  }

  AsyncTaskStarted(name: string) {
    this.MarkActivity();
    this.TaskBucketStarted.push(name);
    this.BuildAndSendPayload(TaskMutationType.TaskAdded);
    //this.LogValues();
  }

  private MarkActivity() {
    this.LastActivityTime = new Date().getTime();
    this.IdleNotificationSent = false;
  }

  NotifyWaiting(waitingMessage: boolean): void {
    if (waitingMessage) {
      this.BuildAndSendPayload(TaskMutationType.TaskWaitingYes, waitingMessage);
    } else {
      this.BuildAndSendPayload(TaskMutationType.TaskWaitingNo, waitingMessage);
    }
  }

  IsTaskListEmpty(): boolean {
    return this.TaskBucketStarted.length === 0;
  }

  private totalTaskCount(): number {
    return this.TaskBucketCompleted.length + this.TaskBucketStarted.length;
  }

  AsyncTaskCompleted(name: string) {
    this.MarkActivity();
    let foundIndex: number = this.TaskBucketStarted.indexOf(name);
    if (foundIndex > -1) {
      let toRemove = this.TaskBucketStarted.splice(foundIndex, 1);
      this.TaskBucketCompleted.push(toRemove[0]);

      this.SendIfEmpty();
    }
    else {
      console.log('Error - mismatch on tasks ' + name);
      console.log(JSON.stringify(this.TaskBucketStarted, null, 2));
    }

    this.BuildAndSendPayload(TaskMutationType.TaskCompleted);
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

  private BuildAndSendPayload(mutationType: TaskMutationType, additionalMessage: boolean = false) {
    let payload: ITaskListMutationEvent_Payload = {
      MutationType: mutationType,
      IsTaskEmpty: this.IsTaskListEmpty(),
      RemainingTaskCount: this.TaskBucketStarted.length,
      TotalTaskCount: this.totalTaskCount(),
      CompletedCount: this.TaskBucketCompleted.length,
      AdditionalMessage: additionalMessage.toString(),
    };

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
      }
      else {
        setTimeout(() => {
          this.DelaySend();
        }, this.DelaySendMs);
      }
    }
  }

  RequestCancel(requestor: string): void {
    console.log("Cancel Requested by: " + requestor);
    this.CancelRequestedFlag = true;
  }

  IsCancelRequested(): boolean {
    return this.CancelRequestedFlag;
  }
}