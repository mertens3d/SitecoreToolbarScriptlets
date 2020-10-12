import { TaskListMutationEvent_Subject } from "../../../Events/TaskListMutationEvent/TaskListMutationEvent_Subject";
import { ILoggerAgent } from "../ILoggerAgent";
import { ICoreErrorHandler } from "../IErrorHandlerAgent";

export interface ICoreTaskMonitor {
  InitAfterErrorHand(taskMutationEvent_Subject: TaskListMutationEvent_Subject);
  IntroduceSiblings(Logger: ILoggerAgent, ErrorHand: ICoreErrorHandler);
  ResetCancel();
  IsTaskListEmpty(): boolean;
  AsyncTaskCompleted(name: string);
  AsyncTaskStarted(name: string);
  RequestCancel();
  IsCancelRequested(): boolean;
  TaskMutationEvent_Subject: TaskListMutationEvent_Subject;
}