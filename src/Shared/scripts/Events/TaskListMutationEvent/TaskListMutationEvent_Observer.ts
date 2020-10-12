import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { HindsiteEventHandler_Type } from "../_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from "../_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../_HindSiteEvent/IHindSiteEvent_Observer";
import { ITaskListMutationEvent_Payload } from "./ITaskListMutationEvent_Payload";
import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";

export class TaskListMutationEvent_Observer extends HindSiteEvent_Observer<ITaskListMutationEvent_Payload> implements IHindSiteEvent_Observer<ITaskListMutationEvent_Payload> {
  TypeDiscriminator = TypeDiscriminator.TaskListMutationEvent_Observer;
  constructor(commonCore: ICommonCore, callback: HindsiteEventHandler_Type) {
        super(commonCore, TaskListMutationEvent_Observer.name, callback);
    }
}
