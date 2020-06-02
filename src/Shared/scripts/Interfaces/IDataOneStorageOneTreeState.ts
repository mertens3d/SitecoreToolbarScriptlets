import { IGuid } from './IGuid';
import { IDataOneTreeNode } from './IDataOneTreeNode';

export interface IDataOneStorageOneTreeState {
  Id: IGuid,
  AllTreeNodeAr: IDataOneTreeNode[],
  ActiveNode: IDataOneTreeNode
}