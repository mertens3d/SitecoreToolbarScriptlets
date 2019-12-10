console.log('InjectConst loaded');


interface IScVerSpec {
  sc920: string,
  sc820: string
}




interface IConst {

  ElemId: {
    BtnEdit: string,
    BtnRestoreWindowState: string,
    BtnSaveWindowState: string,
    InputNickname: string,
    LoginBtn:  string,
    SelStateSnapShot: string,
    textAreaFeedback: string,
    SitecoreRootNodeId: string,
    SitecoreRootGlyphId: string,
    btnUpdateNicknameB: string,
    btnToggleFavoriteB: string,
    scLoginUserName: string,
    scLoginPassword: string,
    StartButton: IScVerSpec
  },
  ClassNames: {
    ContentTreeNode: string,
  },
  Url: {
    Desktop: string,
    Login: string,
    ContentEditor: string,
    LaunchPad: string,
  },
  Selector: {
    ContentTreeNodeGlyph: string,
    InputBtn2: string,
    IframeContent : string,
  },
  Storage: {
    WindowRoot: string
  },
  TreeExpandedPng: string,

  MaxIter: number,
  TimeoutWaitForNodeToLoad: number,

  GuidEmpty : string,
  prop: {
    AllTreeData: string,
  },
  Names: {
    HtmlToInject: string,
    StylesToInject: string
    TreeMenuExpandedPng: string
    TreeMenuCollapsedPng: string
  }
}
