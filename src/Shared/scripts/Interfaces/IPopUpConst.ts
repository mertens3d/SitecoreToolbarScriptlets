export interface IPopUpConst {
  Debug: {
    ForceLoggingEnabled: boolean
  },
  ClassNames: {
    HS: {
      Collapsed: string,
    },
  },
  ElemId: {
    InputNickname: string,
    HindSiteParentInfo: string,
    HS: {
      SelectHeaderAuto: string;
      SelectHeaderAutoTitle: string;
      SelectHeaderFavorite: string;
      SelectHeaderFavoriteTitle: string;
      TabId: string,
    },
  }
  Numbers: {
    MinMenuHeight: number,
    MinMenuWidth: number,
    MaxAutoSaveCount: number,
    AutoSaveIntervalMin: number,
  },
  Notify: {
    Default: string,
    PublishComplete: string,
  },

  Selector: {
    Btn: {
      WindowClose: string,
    },
    Legend: {
      LgndBrowserState: string,
      LgndContentState: string,
      LgndForeSite: string,
      LgndHindSite: string,
      LgndMessages: string,
      LgndPopUpLog: string,
      LgndPopUpState: string,
      LgndSettings: string,
    },
    HS: {
      AdminB: string,
      AutoSnapshotBeforeWindowChange: string,
      BigRed: string,
      BuildStamp: string,
      CompactCE: string,
      Desktop: string,
      DivOverlayModule: string,
      DivStateContent: string,
      FeedbackBrowserState: string,
      FeedbackContentState: string,
      FeedbackLogElement: string,
      FeedbackMessages: string,
      FeedbackPopUpState: string,
      FeedbackStorage: string,
      GoCE: string,
      HsCancel: string,
      HsRemoveFromStorage: string,
      HsRestoreWindowStateSameTab: string,
      HsRestoreWindowStateNewTab: string,
      iCBoxdSettingsAutoLogin: string,
      IdFieldSetDebug: string,
      EnableLogging: string,
      ToggleFavorite: string,
      ModeEdit: string,
      ModeNorm: string,
      ModePrev: string,
      PrefAutoLogin: string,
      PresentationDetails: string,
      QuickPublish: string,
      SelStateSnapShot: string,
      SettingAutoSaveInterval: string,
      SettingAutoSaveMaxCount: string,
      SettingDebugKeepDialogOpen: string,
      SettingAutoSaveSnapshotRetainDays: string,
      SettingNotUsed: string,
      SettingUseCompactCss: string,
      TakeSnapshot: string,
      UpdateNicknameB: string,
    }
  },
  Settings: {
    Defaults: {
      AutoSaveEnabled: boolean,
      DebugKeepDialogOpen: boolean,
      LgndBrowserState: boolean,
      LgndContentState: boolean,
      LgndForeSite: boolean,
      LgndHindSite: boolean,
      LgndMessages: boolean,
      LgndPopUpLog: boolean,
      LgndPopUpState: boolean,
      LgndSettings: boolean,
    }
  },
  Storage: {
    //StorageRootPrefix: string,
    SettingsSuffix: string,
    KeyGenericSettings: string,
    //StorageLastKeyKey: string,
    StorageLogKeyPrefix: string,
    Defaults: {
      bool: {
        AutoSaveEnabled: boolean,
        AutoSnapshotBeforeWindowChange: boolean,
        AutoLogin: boolean,
        DefaultDebugKeepDialogOpen: boolean,
      }
    }
  },
  SnapShotFormat: {
    lenTimestamp: number,
    lenNickname: number,
    lenPageType: number,
    lenPrefix: number,
    lenShortId: number,
    colSep: string,
    lenCeCount: number,
    lenActiveNode: number,
    lenFavorite: number,
  },
  Timeouts: {
    WaitBeforeRemovingCompleteFlag: number,

    AutoLoginCheckInterval: number,
  },
}