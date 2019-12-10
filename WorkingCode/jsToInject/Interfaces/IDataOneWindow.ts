interface IDataOneWindow {
  RawData: IOneStorageData;
  TimeStamp: Date,
  //TimeStampFriendly: String,
  AllCEAr: IDataOneCE[],
  Id: IGuid,
  IsFavorite: Boolean,
  NickName: string

}
interface IDataOneCE {
  Id: IGuid,
  AllTreeNodeAr: IDataOneTreeNode[]
}
interface IDataOneTreeNode {
  NodeId: IGuid,
  NodeFriendly: string
}

