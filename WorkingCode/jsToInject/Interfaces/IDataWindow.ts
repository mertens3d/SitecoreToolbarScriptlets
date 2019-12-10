interface IDataBroswerWindow {
  readonly Window: Window,
  DataDocSelf: IDataOneDoc;
  //Id: IGuid,
  Friendly: String,
  WindowType: WindowType
}

interface IDataOneDoc {
  DataWinParent: IDataBroswerWindow;
  Id: IGuid,
  IsCEDoc: Boolean,
  Document: Document,
  ParentDesktop: IGuid,
  HasParentDesktop: Boolean
}