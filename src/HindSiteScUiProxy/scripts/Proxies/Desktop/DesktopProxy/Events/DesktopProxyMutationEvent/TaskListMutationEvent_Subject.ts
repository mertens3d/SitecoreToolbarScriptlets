import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { ITaskListMutationEvent_Payload } from "./ITaskListMutationEvent_Payload";

export class TaskListMutationEvent_Subject extends HindeSiteEvent_Subject<ITaskListMutationEvent_Payload> {
  Friendly_Subject = TaskListMutationEvent_Subject.name;
}
