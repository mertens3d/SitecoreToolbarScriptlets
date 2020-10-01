import { IStateOfScContentTreeNodeDeep } from './IStateOfScContentTreeNode';
import { IScContentTreeNodeCoord } from "./IScContentTreeNodeCoord";
import { IStateOfScContentTreeNodeFlat } from './IStateOfScContentTreeNodeFlat';

export interface IStateOfContentTree {
  ActiveNodeCoord: IScContentTreeNodeCoord;
  StateOfScContentTreeNodeFlat: IStateOfScContentTreeNodeFlat;
  StateOfScContentTreeNodeDeep: IStateOfScContentTreeNodeDeep;
}