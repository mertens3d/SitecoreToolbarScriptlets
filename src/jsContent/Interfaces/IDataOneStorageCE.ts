import { IDataOneTreeNode } from '../../JsShared/Classes/IDataOneTreeNode';
import { IGuid } from '../../JsShared/Interfaces/IGuid';

export interface IDataOneStorageCE {
  Id: IGuid,
  AllTreeNodeAr: IDataOneTreeNode[]
}