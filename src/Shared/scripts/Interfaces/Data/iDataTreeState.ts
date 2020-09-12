import { IDataStateOfScContentTreeNode } from './IDataOneTreeNode';

export interface IDataStateOfTree {
  ActiveTreeNodeIndex: number;
  StateOfTreeNodes: IDataStateOfScContentTreeNode[];
}