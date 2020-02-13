import { IGuid } from '../../../Shared/Scripts/Interfaces/IGuid';
import { IDataOneTreeNode } from './IDataOneTreeNode';

export interface IDataOneStorageCE {
  Id: IGuid,
  AllTreeNodeAr: IDataOneTreeNode[],
  ActiveNode: IDataOneTreeNode
}