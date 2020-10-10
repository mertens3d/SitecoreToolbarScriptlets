import { TaskListMutationEvent_Subject } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/TaskListMutationEvent/TaskListMutationEvent_Subject";
import { IDiscriminator } from "./IDiscriminator";

export interface ITaskMonitorAgent extends IDiscriminator {

}

export interface IInterruptAgent extends IDiscriminator {
  ResetCancel();
  IsTaskListEmpty(): boolean;
  AsyncTaskCompleted(name: string);
  AsyncTaskStarted(name: string);
  RequestCancel();
  IsCancelRequested(): boolean;
  TaskMutationEvent_Subject: TaskListMutationEvent_Subject;
}