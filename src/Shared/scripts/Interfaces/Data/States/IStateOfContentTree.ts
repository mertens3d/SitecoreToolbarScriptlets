import { IStateOfScContentTreeNodeDeep } from './IStateOfScContentTreeNode';
import { IScContentTreeNodeCoord } from "./IScContentTreeNodeCoord";

export interface IStateOfContentTree {
  ActiveNodeCoord: IScContentTreeNodeCoord;
  StateOfScContentTreeNode: IStateOfScContentTreeNodeDeep;
}