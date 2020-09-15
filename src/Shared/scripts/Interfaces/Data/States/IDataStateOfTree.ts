import { IDataStateOfScContentTreeNode } from './IDataStateOfScContentTreeNode';

export interface IDataStateOfTree {
  ActiveTreeNodeIndex: number;
  StateOfTreeNodes: IDataStateOfScContentTreeNode[];
}