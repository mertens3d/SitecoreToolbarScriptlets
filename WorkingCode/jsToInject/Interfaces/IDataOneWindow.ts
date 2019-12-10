interface IDataOneWindowStorage {
  RawData: IOneStorageData;
  TimeStamp: Date,
  //TimeStampFriendly: String,
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
  NodeId: IGuid,
  NodeFriendly: string
}

