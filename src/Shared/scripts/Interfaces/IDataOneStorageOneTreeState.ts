import { IDataOneTreeNode } from './IDataOneTreeNode';
import { Guid } from '../Helpers/Guid';

export interface IDataOneStorageOneTreeState {
  Id: Guid,
  AllTreeNodeAr: IDataOneTreeNode[],
  ActiveNode: IDataOneTreeNode
}