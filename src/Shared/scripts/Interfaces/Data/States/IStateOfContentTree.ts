import { IStateOfScContentTreeNode } from './IStateOfScContentTreeNode';
import { IScContentTreeNodeCoord } from "./IScContentTreeNodeCoord";

export interface IStateOfContentTree {
  ActiveNodeCoord: IScContentTreeNodeCoord;
  StateOfScContentTreeNodeProxy: IStateOfScContentTreeNode;
}