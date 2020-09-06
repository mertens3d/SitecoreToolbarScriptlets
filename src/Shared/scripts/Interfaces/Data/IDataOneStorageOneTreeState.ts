import { IDataOneTreeNode } from './IDataOneTreeNode';
import { GuidData } from '../../Helpers/GuidData';

export interface IDataOneStorageOneTreeState {
  Id: GuidData,
  AllTreeNodeAr: IDataOneTreeNode[],
  ActiveNode: IDataOneTreeNode
}