import { IPopUpConst } from "../../../Shared/scripts/Interfaces/IPopUpConst";

export class PopConst {
  static StorageRootPrefix: 'HindSite.';

  static Const: IPopUpConst = {
    ClassNames: {
      HS: {
        Collapsed: 'in',
      },
    },
    ElemId: {
      InputNickname: 'id-input-nickname',
      HindSiteParentInfo: 'spanParentInfo',

      HS: {
        SelectHeaderAuto: 'sel-header-auto',
        SelectHeaderAutoTitle: 'sel-header-auto-title',
        SelectHeaderFavorite: 'sel-header-favorite',
        SelectHeaderFavoriteTitle: 'sel-header-favorite-title',
        TabId: 'orig-win-id',
      }
    },
    Numbers: {
      MinMenuHeight: 600,
      MinMenuWidth: 600,
      MaxAutoSaveCount: 10,
      AutoSaveIntervalMin: 5,
    },
    Notify: {
      Default: 'Complete',
      PublishComplete: 'Publishing Complete',
    },
    Selector: {
      Btn: {
        WindowClose: '[id=close-window]',
      },
      Legend: {
        LgndBrowserState: '[id=lgnd-browser-state]',
        LgndContentState: '[id=lgnd-content-state]',
        LgndForeSite: '[id=lgnd-fore-site]',
        LgndHindSite: '[id=lgnd-hind-site]',
        LgndMessages: '[id=lgnd-messages]',
        LgndPopUpLog: '[id=lgnd-pop-up-log]',
        LgndPopUpState: '[id=lgnd-pop-up-state]',
        LgndSettings: '[id=lgnd-settings]',
      },
      HS: {
        AdminB: '[id=AdminB]',
        AutoSnapshotBeforeWindowChange: '[id=id-settings-auto-snapshot-on-window-change]',
        BigRed: '[id=BigRed]',
        BuildStamp: '[id=build-stamp]',
        CompactCE: '[id=CompactCE]',
        Desktop: '[id=Desktop]',
        DivOverlayModule: '[id=menu-overlay]',
        DivStateContent: '[id=feedback-div-state-content]',
        FeedbackBrowserState: '[id=feedback-div-browser-state]',
        FeedbackPopUpState: '[id=feedback-div-pop-up-state]',
        FeedbackContentState: '[id=feedback-div-state-content]',
        FeedbackLogElement: '[id=feedback-pop-up-log]',
        FeedbackMessages: '[id=feedback-messages]',
        FeedbackStorage: '[id=feedback-storage]',
        GoCE: '[id=CE]',
        HsCancel: '[id=Cancel]',
        HsRemoveFromStorage: '[id=RemoveOneFromLocalStorage]',
        HsRestoreWindowStateSameTab: '[id=id-restore-state-same-tab]',
        HsRestoreWindowStateNewTab: '[id=id-restore-state-new-tab]',
        iCBoxdSettingsAutoLogin: '[id=id-settings-auto-login]',
        IdFieldSetDebug: '[id=id-fieldset-debug]',
        LogToConsole: '[id=id-settings-show-log-data]',
        MarkFavorite: '[id=MarkFavorite]',
        ModeEdit: '[id=sc-mode-edit]',
        ModeNorm: '[id=Norm]',
        ModePrev: '[id=Prev]',
        PrefAutoLogin: '[id=id-settings-auto-login]',
        PresentationDetails: '[id=PresentationDetails]',
        QuickPublish: '[id=QuickPublish]',
        SelStateSnapShot: '[id=selState]',
        SettingAutoSaveInterval: '[id=id-settings-auto-save-interval]',
        SettingAutoSaveMaxCount: '[id=id-settings-auto-save-max-count]',
        SettingDebugKeepDialogOpen: '[id=id-settings-debug-keep-dialog-open]',
        SettingAutoSaveSnapshotRetainDays: '[id=id-settings-auto-save-snap-shot-retain-days]',
        SettingNotUsed: '[id=id-settings-not-used]',
        SettingUseCompactCss: '[id=id-settings-use-compact]',
        TakeSnapshot: '[id=SaveWindowState]',
        UpdateNicknameB: '[id=id-btn-update-nickname]',
      },
    },
    Settings: {
      Defaults: {
        AutoSaveEnabled: false,
        DebugKeepDialogOpen: false,
        LgndBrowserState: false,
        LgndContentState: false,
        LgndForeSite: true,
        LgndHindSite: true,
        LgndMessages: false,
        LgndPopUpLog: false,
        LgndPopUpState: false,
        LgndSettings: false,
      }
    },
    Storage: {
      SettingsSuffix: 'todo',
      KeyGenericSettings: 'HindSite.' + 'GenericSettings',
      StorageLogKeyPrefix: 'HindSite.' + 'Log.',
      Defaults: {
        bool: {
          AutoSaveEnabled: false,
          AutoLogin: false,
          DefaultDebugKeepDialogOpen: false,
          AutoSnapshotBeforeWindowChange: true,
        }
      }
    },
    SnapShotFormat: {
      lenTimestamp: 13,
      lenNickname: 16,
      lenPageType: 7,
      lenPrefix: 6,
      lenShortId: 4,
      colSep: ' - ',
      lenCeCount: 3,
      lenActiveNode: 16,
      lenFavorite: 3,
    },
    Timeouts: {
      WaitBeforeRemovingCompleteFlag: 1500,

      AutoLoginCheckInterval: 3000,
    },
  }
}