console.log( 'IConst loaded');

interface IConst {
  Numbers: {
    ShortGuidLength: number,
    
  },
  Iterations: {
    MaxIterationLookingForNode: number,
    MaxIterationPageLoad: number,
    MaxIterationRedButton: number,
    MaxSetHrefEffort: number,
  },
  Timeouts: {
    TimeoutChangeLocation: number, //1000
    TimeoutTriggerRedButton: number, //1500
    TimeoutWaitForNodeToLoad: number,
    WaitFogPageLoad: number,
    PostLoginBtnClick: number,
    SetHrefEffortWait: number,
  },
  ElemId: {
    BtnEdit: string,
    BtnRestoreWindowState: string,
    BtnSaveWindowState: string,
    InputNickname: string,
    scLoginBtn:  IScVerSpec,
    SelStateSnapShot: string,
    textAreaFeedback: string,
    SitecoreRootNodeId: string,
    SitecoreRootGlyphId: string,
    btnUpdateNicknameB: string,
    btnToggleFavoriteB: string,
    scLoginUserName: string,
    scLoginPassword: string,
    scStartButton: IScVerSpec,
    HindSiteParentInfo: string,
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
    scLoginBtn: IScVerSpec,
    IframeContent: string,
  },
  Storage: {
    WindowRoot: string
  },
  TreeExpandedPng: string,

  MaxIter: number,

  GuidEmpty: string,
  prop: {
    AllTreeData: string,
  },
  Names: {
    HtmlToInject: string,
    StylesToInject: string,
    TreeMenuExpandedPng: string,
    TreeMenuCollapsedPng: string,
    scDefaultAdminPassword: string,
    scDefaultAdminUserName: string,
  }
}

