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
      StartMenu: {
        Popup1: {
          AllApplications: string,
          DevelopmentTools: string,
          Id: string,
          MediaLibrary: string,
          RecycleBin: string,
          ReportingTools: string,
          SecurityTools: string,
          StartMenuLeftOption: string,
          TemplateManager: string,
        },
        Popup2: {
          AccessViewer: string,
          Archive: string,
          DomainManager: string,
          Id: string,
          InstallationWizard: string,
          KeyboardMap: string,
          LogViewer: string,
          MarketingControlPanel: string,
          PackageDesigner: string,
          PackageDesignerButton: string,
          RoleManager: string,
          Run: string,
          ScanForBrokenLinks: string,
          Security: string,
          SecurityEditor: string,
          System: string,
          UserManager: string,
          Workbox: string,
        },
        Popup3: {
          Id: string,
          InstalledLicenses: string,
          LicenseDetails: string,
        }
      },
      LoginBtn: IScVerSpec,
      ScRibbon: {
        Navigate: {
          Id: string,
          Links: string,
        },
        View: {
          Id: string,
          RawValues: string,
          NavigateBack: string,
          NavigateForward: string,
          NavigateUp: string,
        },
        Presentation: {
          Id: string,
          Details: string,
        },
        Publish: {
          MenuButtonPublish: string,
          MenuDropDownPublishItem: string,
          NavPublishStrip: string,
          TheItemHasBeenPublished: string,
          SettingsHidden: string,
          PublishingHidden: string,
        }
      },
      NextButton: string,

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