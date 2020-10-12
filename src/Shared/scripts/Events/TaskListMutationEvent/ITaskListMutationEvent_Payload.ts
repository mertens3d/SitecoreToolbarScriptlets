import { TaskMutationType } from "../../Enums/TaskMutationType";

export interface ITaskListMutationEvent_Payload {
  CompletedCount: number;
  MutationType: TaskMutationType;
  IsTaskEmpty: boolean;
  TotalTaskCount: number,
  RemainingTaskCount: number,
}
