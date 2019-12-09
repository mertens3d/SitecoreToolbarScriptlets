interface IDataOneWindow {
  TimeStamp: Date,
  //TimeStampFriendly: String,
  AllCEAr: IDataOneCE[],
  Id: String
}
interface IDataOneCE {
  Id: string,
  AllTreeNodeAr: IDataOneTreeNode[]
}
interface IDataOneTreeNode {
  NodeId: string,
  NodeFriendly: string
}

