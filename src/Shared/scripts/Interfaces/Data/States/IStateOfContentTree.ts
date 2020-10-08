import { IStateOfScContentTreeNodeDeep } from './IStateOfScContentTreeNode';
import { IStateOfScContentTreeNodeShallow } from "./IStateOfScContentTreeNodeShallow";

export interface IStateOfContentTree {
  ActiveNodeShallow: IStateOfScContentTreeNodeShallow;
  StateOfScContentTreeNodeDeep: IStateOfScContentTreeNodeDeep;
}