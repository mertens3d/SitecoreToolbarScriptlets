import { TaskMutationType } from "../../../../../../../Shared/scripts/Agents/Agents/LoggerAgent/InterruptAgent";

export interface ITaskListMutationEvent_Payload {
  MutationType: TaskMutationType;
  IsTaskEmpty: boolean;
}
