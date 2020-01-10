import { IscMode } from '../Interfaces/IscMode';

export interface IConst {
  Numbers: {
    ShortGuidLength: number,
    MinMenuHeight: number,
    MinMenuWidth: number,
  },
  Iterations: {
    MaxSetHrefEffort: number,
    MaxIterationSwitchBoard: number,
  },
  Timeouts: {
    PostLoginBtnClick: number,
    SetHrefEffortWait: number,
    WaitBeforeRemovingCompleteFlag: number,
  },
  IterHelper: {
    GrowthPerIteration: number,
    MaxCount: {
      OverridePublishing: number,
      Default: number,
    },
    Timeouts: {
      Max: number,
      Default: number,
    },
  },

  ElemId: {
    HS: {
      SelStateSnapShot: string,
      TabId: string,
      TaDebug: string,
      Btn: {
        AdminB: string,
        ToggleFavoriteB: string,
        Cancel: string,
        CE: string,
        Desktop: string,
        DrawStorage: string,
        BigRed: string,
        ModeEdit: string,
        ModeNorm: string,
        ModePrev: string,
        QuickPublish: string,
        RemoveFromStorage: string,
        RestoreWindowState: string,
        SaveWindowState: string,
        UpdateNicknameB: string,
      },
      Legend: {
        LgndDebug: string,
        LgndForeSite: string,
        LgndHindSite: string,
        LgndInSite: string,
        LgndSettings: string,
      }
    }

    HindSiteParentInfo: string,
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
    None: string,
  },
  Regex: {
    ContentEditor: RegExp,
  },
  Notify: {
    Default: string,
    PublishComplete: string,
  },
  Selector: {
    HS: {
      iCBoxdSettingsShowDebugData: string,
      IdFieldSetDebug: string,
      menuOverlay: string,
      PrefAutoLogin: string,
    }
    SC: {
      ContentTreeNodeGlyph: string,
      IdStartsWithTreeNode: string,
      IframeContent: string,
      JqueryModalDialogsFrame: string,
      ContentIframe0: string,
      NextButton: string,
      ContentIFrame1: string,
      Ok: string,
      Cancel: string,
      LoginBtn: IScVerSpec,
      MenuButtonPublish: string,
      MenuDropDownPublishItem: string,
      NavPublishStrip: string,
      scStartButton: IScVerSpec,
      StartMenuLeftOption: string,
      Publish: {
        TheItemHasBeenPublished: string,
        SettingsHidden: string,
        PublishingHidden: string,
      }
    }
  },
  ScMode: {
    edit: IscMode,
    normal: IscMode,
    preview: IscMode,
  }
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