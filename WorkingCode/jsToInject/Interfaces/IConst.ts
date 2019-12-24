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
    IterationHelperInitial: number,
    PostLoginBtnClick: number,
    SetHrefEffortWait: number,
    TimeoutChangeLocation: number, //1000
    TimeoutTriggerRedButton: number, //1500
    TimeoutWaitForNodeToLoad: number,
    WaitBeforeRemovingCompleteFlag: number,
    WaitFogPageLoad: number,
  },
  ElemId: {
    Hs: {
      BtnCancel: string,
      btnClearDebugTextArea: string,
      SelStateSnapShot: string,
      LgndHindSite: string,
      LgndInSite: string,
      LgndForeSite: string,
      LgndDebug: string,
      LgndSettings: string,
    }

    BtnEdit: string,
    btnQuickPublish: string,
    BtnRestoreWindowState: string,
    BtnSaveWindowState: string,
    btnToggleFavoriteB: string,
    btnUpdateNicknameB: string,
    HindSiteParentInfo: string,
    hsBtnBigRed: string,
    InputNickname: string,
    textAreaFeedback: string,
    sc: {
      scLoginBtn: IScVerSpec,
      scLoginPassword: string,
      scLoginUserName: string,

      SitecoreRootGlyphId: string,
      SitecoreRootNodeId: string,
    }
  },
  ClassNames: {
    ContentTreeNode: string,
    HS: {
      Collapsed: string,
    },
    SC: {
      scContentTreeNodeActive: string,
    }
  },
  UrlSuffix: {
    Desktop: string,
    Login: string,
    LaunchPad: string,
    CE: string,
  },
  Regex: {
    ContentEditor: RegExp,

  },
  Selector: {
    XS: {
      IdFieldSetDebug: string,
      iCBoxdSettingsShowDebugData: string,
    }
    SC: {
      ContentTreeNodeGlyph: string,
      IdStartsWithTreeNode: string,
      IframeContent: string,
      LoginBtn: IScVerSpec,
      scStartButton: IScVerSpec,
      StartMenuLeftOption: string,
    }
  },
  Storage: {
    DefaultDebugKeepDialogOpen: boolean,
    SettingsSuffix: string,
    ShowDebugData: boolean,
    SnapShotSuffix: string,
    WindowRoot: string,
  },

  MaxIter: number,
  MaxNullOrUndefinedIter: number,

  GuidEmpty: string,
  prop: {
    AllTreeData: string,
  },
  Names: {
    SC: {
      TreeGlyphPrefix: string,
      TreeNodePrefix: string,
      TreeExpandedPng: IScVerSpec,
    },
    HtmlToInject: string,
    StylesToInject: string,
    TreeMenuExpandedPng: string,
    TreeMenuCollapsedPng: string,
    scDefaultAdminPassword: string,
    scDefaultAdminUserName: string,
  }
}