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
    IterationHelperInitial: number,
  },
  ElemId: {
    Hs: {
      btnClearDebugTextArea: string,
    }
    BtnEdit: string,
    BtnRestoreWindowState: string,
    BtnSaveWindowState: string,
    btnToggleFavoriteB: string,
    btnUpdateNicknameB: string,
    HindSiteParentInfo: string,
    hsBtnBigRed: string,
    InputNickname: string,
    SelStateSnapShot: string,
    textAreaFeedback: string,
    sc: {
      scLoginBtn: IScVerSpec,
      scLoginPassword: string,
      scLoginUserName: string,
      scStartButton: IScVerSpec,
      SitecoreRootGlyphId: string,
      SitecoreRootNodeId: string,
      
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
    
    IframeContent: string,
    sc: {
      StartMenuLeftOption: string,
      LoginBtn: IScVerSpec,
    }
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