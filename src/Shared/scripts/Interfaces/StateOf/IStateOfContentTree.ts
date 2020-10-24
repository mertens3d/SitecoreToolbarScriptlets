import { IStateOfScContentTreeNodeDeep } from './IStateOfScContentTreeNode';
import { IStateOfScContentTreeNodeShallow } from "./IStateOfScContentTreeNodeShallow";
import { IStateOf_ } from './IStateOf_';

export interface IStateOfContentTree extends IStateOf_ {
  ActiveNodeShallow: IStateOfScContentTreeNodeShallow;
  ContentTreeNodeDeep: IStateOfScContentTreeNodeDeep;
}