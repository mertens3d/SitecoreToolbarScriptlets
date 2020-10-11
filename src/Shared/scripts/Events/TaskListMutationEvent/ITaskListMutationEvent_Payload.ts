﻿import { TaskMutationType } from "../../Agents/LoggerAgent/TaskMutationType";

export interface ITaskListMutationEvent_Payload {
  CompletedCount: number;
  MutationType: TaskMutationType;
  IsTaskEmpty: boolean;
  TotalTaskCount: number,
  RemainingTaskCount: number,
}
