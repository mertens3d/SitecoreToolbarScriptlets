import { TaskListMutationEvent_Subject } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DesktopProxyMutationEvent/TaskListMutationEvent_Subject";

export interface ITaskMonitorAgent {

}

export interface IInterruptAgent {
  IsTaskListEmpty(): boolean;
  AsyncTaskCompleted(name: string);
  AsyncTaskStarted(name: string);
  CancelRequested();
  IsCancelRequested(): boolean;
  TaskMutationEvent_Subject: TaskListMutationEvent_Subject;
}