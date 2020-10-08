import { IStateOfScContentTreeNodeDeep } from './IStateOfScContentTreeNode';
import { IScContentTreeNodeCoord } from "./IScContentTreeNodeCoord";
import { IStateOfScContentTreeNodeShallow } from './IStateOfScContentTreeNodeFlat';

export interface IStateOfContentTree {
  //ActiveNodeCoord: IScContentTreeNodeCoord;
  ActiveNodeFlat: IStateOfScContentTreeNodeShallow;
  StateOfScContentTreeNodeDeep: IStateOfScContentTreeNodeDeep;
}