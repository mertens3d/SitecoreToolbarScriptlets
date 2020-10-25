import { _HindeSiteEvent_Subject } from "../_HindSiteEvent/HindeSiteEvent_Subject";
import { ITaskListMutationEvent_Payload } from "./ITaskListMutationEvent_Payload";
import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";

export class TaskListMutationEvent_Subject extends _HindeSiteEvent_Subject<ITaskListMutationEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.TaskListMutationEvent_Subject;
 protected ShowLogActions: boolean = false;

  Friendly_Subject = TaskListMutationEvent_Subject.name;
}
