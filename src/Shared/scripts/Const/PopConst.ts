import { IPopUpConst } from "../Interfaces/IPopUpConst";

export class PopConst {
  static StorageRootPrefix: 'HindSite.';

  static Const = {
    ClassNames: {
      HS: {
        Collapsed: 'in',
        Down: 'down',

        Buttons: {
          AdminB: 'admin-b',
          Cancel: 'cancel',

          CompactCe: 'details',
          Edit: 'edit',
          GoContentEditor: 'ce',
          GoDesktop: 'desktop-icon',
          Ping: 'edit',
          PresentationDetails: 'details',
          QuickPublish: 'publish',
          RemoveFromStorage: 'delete-snapshot',
          RestoreNewTab: 'restore-snapshot',
          RestoreSameTab: 'restore-snapshot',
          RestoreStateTBD: 'restore-snapshot',
          ScModeEdit: 'edit',
          ScModeNormal: 'normal',
          ScModePrev: 'preview-icon',
          TakeSnapShot: 'take-snapshot',
          ToggleFavorite: 'btn-favorite',
          UpdateNickname: 'set-nickname',
          Icons: {
            CloseWindow: 'icon-close-window',
            AddContentEditorTab: 'icon-add-ce-tab',
          }
        },
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
        SelectHeaderManual: 'sel-header-manual',
        SelectHeaderManualTitle: 'sel-header-manual-title',
        TabId: 'orig-win-id',
      }
    },
    Numbers: {
      MinMenuHeight: 600,
      MinMenuWidth: 600,
      MaxAutoSaveCount: 10,
      DefaultAutoSaveIntervalMin: 0,

    },
    Notify: {
      Default: 'Complete',
      PublishComplete: 'Publishing Complete',
    },
    Selector: {
      HS: {
        AutoSnapshotBeforeWindowChange: '[id=id-settings-auto-snapshot-on-window-change]',

        BuildStamp: '[id=build-stamp]',

        DivOverlayModule: '[id=menu-overlay]',
        DivStateContent: '[id=feedback-div-state-content]',
        FeedbackBrowserState: '[id=feedback-div-browser-state]',
        FeedbackPopUpState: '[id=feedback-div-pop-up-state]',
        FeedbackContentState: '[id=feedback-div-state-content]',
        FeedbackLogElement: '[id=feedback-pop-up-log]',
        FeedbackMessages: '[id=feedback-messages]',
        FeedbackStorage: '[id=feedback-storage]',
        HsCancel: '[id=Cancel]',
        HsRemoveFromStorage: '[id=id-ph-remove-one-from-local-storage]',
        HsRestoreWindowStateSameTab: '[id=id-ph-btn-restore-state-same-tab]',
        HsRestoreWindowStateNewTab: '[id=id-ph-btn-restore-state-new-tab]',
        iCBoxdSettingsAutoLogin: '[id=id-ph-settings-auto-login]',
        IdFieldSetDebug: '[id=id-fieldset-debug]',

        ToggleFavorite: '[id=id-ph-btn-toggle-favorite]',

        SettingAutoSaveInterval: '[id=id-settings-auto-save-interval]',
        SettingAutoSaveMaxCount: '[id=id-settings-auto-save-max-count]',

        SettingAutoSaveSnapshotRetainDays: '[id=id-settings-auto-save-snap-shot-retain-days]',
        SettingAutoRenameCeTabButton: '[id=id-settings-auto-rename-ce-tab-button]',
        SettingNotUsed: '[id=id-settings-not-used]',
        TakeSnapshot: '[id=id-ph-btn-take-snapshot]',
        UpdateNicknameB: '[id=id-ph-btn-update-nickname]',
        ModuleContainers: {
        SettingShowDebuggingModules: '[id=id-setting-show-debugging-modules]',
          BtnAddContentEditor: '[id=id-ph-btn-add-drframe-content-editor]',
          BtnAdminB: '[id=id-ph-btn-adminb]',
          BtnCompactScUi: '[id=id-ph-btn-compact-sc-ui]',
          BtnDebugClearPopUpConsole: '[id=id-container-btn-debug-clear-console]',
          BtnDebugForceAutoSnapShot: '[id=id-container-btn-debug-force-auto-snapshot]',
          BtnDebugTriggerContentFataError: '[id=id-container-btn-debug-trigger-content-fatal-error]',
          BtnDebugTriggerPopUpReload: '[id=id-container-btn-debug-trigger-pop-up-reload]',
          BtnGoContentEditor: '[id=id-ph-btn-go-content-editor]',
          BtnModeEdit: '[id=id-ph-btn-sc-mode-edit]',
          BtnModeNorm: '[id=id-ph-btn-norm]',
          BtnModePrev: '[id=id-ph-btn-prev]',
          BtnPresentationDetails: '[id=id-ph-btn-presentation-details]',
          BtnQuickPublish: '[id=id-ph-btn-quick-publish]',
          BtnWindowClose: '[id=id-ph-close-window]',
          SettingEnableDebugging: '[id=id-ph-settings-enable-debugging]',
          Desktop: '[id=id-ph-btn-desktop]',
          LgndBrowserState: '[id=lgnd-browser-state]',
          LgndContentState: '[id=lgnd-content-state]',
          LgndForeSite: '[id=lgnd-fore-site]',
          LgndHindSite: '[id=lgnd-hind-site]',
          LgndMessages: '[id=lgnd-messages]',
          LgndPopUpDebug: '[id=lgnd-pop-up-debug]',
          LgndPopUpLog: '[id=lgnd-pop-up-log]',
          LgndPopUpState: '[id=lgnd-pop-up-state]',
          LgndSettings: '[id=lgnd-settings]',
          PrefAutoLogin: '[id=id-ph-settings-auto-login]',
          SelStateSnapShot: '[id=id-container-select-state]',
          SettingAutoRestoreState: '[id=id-settings-auto-restore-state]',
          SettingDebugKeepDialogOpen: '[id=id-ph-settings-debug-keep-dialog-open]',
          SettingUseCompactCss: '[id=id-ph-settings-use-compact]',
        }
      },
    },
    Settings: {
      Defaults: {
        AutoSaveEnabled: false,
        AutoRestoreState: false,
        DebugKeepDialogOpen: false,
        LgndBrowserState: false,
        LgndContentState: false,
        LgndForeSite: true,
        LgndHindSite: true,
        LgndMessages: false,
        LgndPopUpLog: false,
        LgndPopUpState: false,
        LgndPopUpDebug: false,
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
          AutoSnapshotBeforeWindowChange: false,
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
      MainSectionNode: 9,
      lenActiveNode: 9,
      lenFavorite: 3,
    },
    Timeouts: {
      WaitBeforeRemovingCompleteFlag: 1500,

      AutoLoginCheckInterval: 3000,
    },
  }
}