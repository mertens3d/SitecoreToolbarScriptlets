import { IStateOf_ } from "../Data/States/IStateOf_";
import { IStateOfScContentTreeNodeShallow } from "../Data/States/IStateOfScContentTreeNodeShallow";

export interface IFirstActive {
  StateOfHostedFrame: IStateOf_,
  activeTreeNodeFlat: IStateOfScContentTreeNodeShallow
}