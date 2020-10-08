import { IStateOf_ } from "../Data/States/IStateofX";
import { IStateOfScContentTreeNodeShallow } from "../Data/States/IStateOfScContentTreeNodeFlat";

export interface IFirstActive {
  StateOfHostedFrame: IStateOf_,
  activeTreeNodeFlat: IStateOfScContentTreeNodeShallow
}