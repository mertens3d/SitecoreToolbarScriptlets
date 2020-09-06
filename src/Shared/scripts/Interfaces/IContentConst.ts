import { IScVerSpec } from './IScVerSpec';

export interface IContentConst {
  DefaultMaxAutoSaveAgeDays: number;
  MaxAutoToSaveCount: number;

  ElemId: {
    sc: {
      scLoginUserName: string,
      scLoginPassword: string,
      SitecoreRootNodeId: string,
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
    ContentTreeNode: string,

    SC: {
      scContentTreeNodeActive: string,
    }
  },

  Selector: {
    SC: {
      Cancel: string,
      ContentIframe0: string,
      ContentIFrame1: string,
      ContentTreeNodeGlyph: string,
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
      },
      Publish: {
        TheItemHasBeenPublished: string,
        SettingsHidden: string,
        PublishingHidden: string,
      }
    }
  },
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