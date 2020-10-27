import { IStateOfScContentTreeNodeDeep } from './IStateOfScContentTreeNode';
import { IStateOf_ } from './IStateOf_';

export interface IStateOfContentTree extends IStateOf_ {
  //ActiveNodeShallow: IStateOfScContentTreeNodeShallow;
  ContentTreeNodeDeep: IStateOfScContentTreeNodeDeep;
}