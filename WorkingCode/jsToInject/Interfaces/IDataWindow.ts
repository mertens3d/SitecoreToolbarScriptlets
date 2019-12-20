interface IDataBroswerWindow {
  Window: Window,
  DataDocSelf: IDataOneDoc;
  //Id: IGuid,
  Friendly: String,
  WindowType: scWindowType
}

interface IDataOneDoc {
  DataWinParent: IDataBroswerWindow;
  XyyzId: IGuid,

  IsCEDoc: Boolean,
  Document: Document,
  ParentDesktop: IGuid,
  HasParentDesktop: Boolean
}