import { IsScMode } from './IscMode';
import { IScVerSpec } from './IScVerSpec';

export interface IContentConst {
  Iterations: {
    MaxSetHrefEffort: number,
    MaxIterationSwitchBoard: number,
  },
  Timeouts: {
    PostLoginBtnClick: number,
    SetHrefEffortWait: number,
    WaitBeforeRemovingCompleteFlagOnContent: number,
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
    PageType: {
      Desktop: RegExp
      Edit: RegExp
      Normal: RegExp
      Preview: RegExp
    },
  },

  Selector: {
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
    edit: IsScMode,
    normal: IsScMode,
    preview: IsScMode,
  }
  Storage: {
    SettingsSuffix: string,
    ShowDebugData: boolean,
    SnapShotPrefix: string,
    WindowRoot: string,
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
    PopUp: string,
    PopUpStyles: string,
    TreeMenuExpandedPng: string,
    TreeMenuCollapsedPng: string,
    scDefaultAdminPassword: string,
    scDefaultAdminUserName: string,
  }
}