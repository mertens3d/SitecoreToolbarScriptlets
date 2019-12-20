interface IDataOneWindowStorage {
  RawData: IOneStorageData ,
  TimeStamp: Date,
  WindowType: scWindowType,
  WindowFriendly: string,
  AllCEAr: IDataOneStorageCE[],
  Id: IGuid,
  IsFavorite: Boolean,
  NickName: string

}
interface IDataOneStorageCE {
  Id: IGuid,
  AllTreeNodeAr: IDataOneTreeNode[]
}
interface IDataOneTreeNode {
  IsActive: Boolean,
  IsExpanded: Boolean,
  NodeFriendly: string,
  NodeId: IGuid,
}

