import { TaskListMutationEvent_Subject } from "../../../Events/TaskListMutationEvent/TaskListMutationEvent_Subject";
import { ILoggerAgent } from "../ILoggerAgent";
import { ICoreErrorHandler } from "../IErrorHandlerAgent";

export interface ICoreTaskMonitor {
  NotifyWaiting(waitingMessage: boolean): void;
  InitAfterErrorHand(taskMutationEvent_Subject: TaskListMutationEvent_Subject):void;
  IntroduceSiblings(Logger: ILoggerAgent, ErrorHand: ICoreErrorHandler):void;
  ResetCancel(): void;
  IsTaskListEmpty(): boolean;
  AsyncTaskCompleted(name: string):void;
  AsyncTaskStarted(name: string):void;
  RequestCancel(requestor: string):void;
  IsCancelRequested(): boolean;
  TaskMutationEvent_Subject: TaskListMutationEvent_Subject;
}