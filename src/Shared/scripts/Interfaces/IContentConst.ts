import { IScVerSpec } from './IScVerSpec';

export interface IContentConst {
  DefaultMaxAutoSaveAgeDays: number;
  MaxAutoToSaveCount: number;
  DefaultAutoRenameCeTabButton: boolean;
  DefaultShowDebuggingModules: boolean;

  ElemId: {
    SC: {
      PackageDesigner: {
        StatusText: string,
      }
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
      scContentTreeNodeNormal: string,
    }
  },

  Selector: {
    SC: {
      ContentEditor: {
        ScContentTreeNodeGlyph: string,
        ScContentTreeNode: string,
        ScContentTreeContainer: string,
        scContentTreeNodeIcon: string,
      },
      ContentTree: {
        BuiltIn: {
          TreeNodeSitecoreRoot: string,
          MediaLibraryAnchorRootNode: string,
          MarketingControlPanelRoodNode: string,
          TemplatesAnchorRootNode: string,
          LayoutRootAnchorNode: string,
          SystemRootAnchorNode: string,
          ContentRootAnchorNode: string,
        }
      },
      PackageDesigner: {
        Ribbon: {
          InstallerRibbon_Nav_Package: string,
          InstallerRibbon_Toolbar: string,
          Open: string,
        }
      },

      Cancel: string,
      IdStartsWithTreeNode: string,
      IframeContent: IScVerSpec,
      Frames: {
        ScContentIframeId0: {
          Cancel: string
          Filename: string,
          Id: string,
          Ok: string,
        },
        AppFrame: {
          Id: string,
        },
        JqueryModalDialogsFrame: {
          Id: string,
        },
        scContentIframeId1: {
          Id: string,
        }
      },
      PopUp1: {
        DevelopmentTools: string,
        MarketingControlPanel: string,
        MediaLibrary: string,
        PackageDesigner: string,
        PackageDesignerButton: string,
        StartMenuLeftOption: string,  
        TemplateManager: string,
      },
      LoginBtn: IScVerSpec,
      MenuButtonPublish: string,
      NextButton: string,

      Publish: {
        MenuDropDownPublishItem: string,
        NavPublishStrip: string,
        TheItemHasBeenPublished: string,
        SettingsHidden: string,
        PublishingHidden: string,
      }

      Ok: string,
     
      scStartButtonVSpec: IScVerSpec,
    
   
     
      Desktop: {
        DtStartBar: string,
        ContentTreeHolder: string,
      },
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
      TimeNewCEWaitForScOverlayToClearMs: number,
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