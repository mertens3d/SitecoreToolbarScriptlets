import { IScVerSpec } from './IScVerSpec';

export interface IContentConst {
  DefaultMaxAutoSaveAgeDays: number;
  MaxAutoToSaveCount: number;
  DefaultAutoRenameCeTabButton: boolean;
  DefaultShowDebuggingModules: boolean;

  ElemId: {
    sc: {
      scLoginPassword: string,
      scLoginUserName: string,
      SitecoreRootAnchorNodeId: string,
      SitecoreRootApparentIdRaw: string,
      SitecoreRootGlyphId: string,

      scLoginBtn: IScVerSpec,
    },
  },

  Iterations: {
    MaxSetHrefEffort: number,
    MaxIterationSwitchBoard: number,
  },
  Timeouts: {
    PostLoginBtnClick: number,
    SetHrefEffortWait: number,
    WaitBeforeRemovingCompleteFlagOnContent: number,
    AutoSaveIntervalMin: number,
  },

  ClassNames: {
    SC: {
      ContentTreeNode: string,
      scContentTreeNodeActive: string,
    }
  },

  Selector: {
    SC: {
      ContentEditor: {
        ContentTreeNodeGlyph: string,
        RootAnchorNode: string,
        ScContentTreeContainer: string,
        scContentTreeNodeIcon: string,
      },
      Level2Nodes: {
        MediaLibraryAnchorRootNode: string,
        TemplatesAnchorRootNode: string,
        LayoutRootAnchorNode: string,
        SystemRootAnchorNode: string,
        ContentRootAnchorNode: string,
      },
      Cancel: string,
      ContentIframe0: string,
      ContentIFrame1: string,
      IdStartsWithTreeNode: string,
      IframeContent: IScVerSpec,
      JqueryModalDialogsFrame: string,
      LoginBtn: IScVerSpec,
      MenuButtonPublish: string,
      MenuDropDownPublishItem: string,
      NavPublishStrip: string,
      NextButton: string,
      Ok: string,
      StartMenuLeftOption: string,
      scStartButton: IScVerSpec,
      Desktop: {
        DtStartBar: string,
        ContentTreeHolder: string,
      },
      Publish: {
        TheItemHasBeenPublished: string,
        SettingsHidden: string,
        PublishingHidden: string,
      }
    }
  },
  Storage: {
    SessionKey: string,
    SettingsSuffix: string,
    ShowDebugData: boolean,
    SnapShotPrefix: string,
    WindowRoot: string,
  },
  Numbers: {
    Desktop: {
      MaxToolBarNameChars: number,
    }
  },
  MaxIter: number,
  MaxNullOrUndefinedIter: number,

  prop: {
    AllTreeData: string,
  },
  Names: {
    SC: {
      TreeGlyphPrefix: string,
      TreeNodePrefix: string,
      TreeExpandedPng: IScVerSpec,
    },
    Desktop: {
      StartBarApplicationPrefix: string
    },
    PopUpUi: string,
    PopUpUiStyles: string,
    TreeMenuExpandedPng: string,
    TreeMenuCollapsedPng: string,
    scDefaultAdminPassword: string,
    scDefaultAdminUserName: string,
  }
}