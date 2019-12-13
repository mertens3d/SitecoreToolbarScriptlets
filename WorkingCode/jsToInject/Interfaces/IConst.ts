console.log('IConst loaded');

interface IConst {
  Numbers: {
    ShortGuidLength: number,
  },
  Iterations: {
    MaxIterationLookingForNode: number,
    MaxIterationPageLoad: number,
    MaxIterationRedButton: number,
    MaxSetHrefEffort: number,
    MaxIterationSwitchBoard: number,
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
    Hs: {
      btnClearDebugTextArea: string,
    }
    BtnEdit: string,
    BtnRestoreWindowState: string,
    BtnSaveWindowState: string,
    InputNickname: string,
    SelStateSnapShot: string,
    textAreaFeedback: string,
    btnUpdateNicknameB: string,
    hsBtnBigRed: string,
    btnToggleFavoriteB: string,
    HindSiteParentInfo: string,
    sc: {
      scLoginBtn: IScVerSpec,
      SitecoreRootGlyphId: string,
      SitecoreRootNodeId: string,
      scLoginUserName: string,
      scLoginPassword: string,
      scStartButton: IScVerSpec,
    }
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

  MaxIter: number,

  GuidEmpty: string,
  prop: {
    AllTreeData: string,
  },
  Names: {
    sc: {
      scTreeExpandedPng: string,
    },
    HtmlToInject: string,
    StylesToInject: string,
    TreeMenuExpandedPng: string,
    TreeMenuCollapsedPng: string,
    scDefaultAdminPassword: string,
    scDefaultAdminUserName: string,
  }
}