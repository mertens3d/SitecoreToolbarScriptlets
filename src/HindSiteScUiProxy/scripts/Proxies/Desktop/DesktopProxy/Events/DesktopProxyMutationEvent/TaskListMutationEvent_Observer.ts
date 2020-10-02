import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { HindsiteEventHandler_Type } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { ITaskListMutationEvent_Payload } from "./ITaskListMutationEvent_Payload";

export class TaskListMutationEvent_Observer extends HindSiteEvent_Observer<ITaskListMutationEvent_Payload> implements IHindSiteEvent_Observer<ITaskListMutationEvent_Payload> {
    constructor(hindeCore: IHindeCore, callback: HindsiteEventHandler_Type) {
        super(hindeCore, TaskListMutationEvent_Observer.name, callback);
    }
}
