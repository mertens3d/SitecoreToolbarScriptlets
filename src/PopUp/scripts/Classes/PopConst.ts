import { scMode } from "../../../Shared/scripts/Enums/scMode";
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
      textAreaFeedback: 'ta-feedback',
      InputNickname: 'inputNickname',
      HindSiteParentInfo: 'spanParentInfo',

      HS: {
        SelectHeaderAuto: 'sel-header-auto',
        SelectHeaderAutoTitle: 'sel-header-auto-title',
        SelectHeaderFavorite: 'sel-header-favorite',
        SelectHeaderFavoriteTitle: 'sel-header-favorite-title',
        TabId: 'orig-win-id',

        Btn: {
          AdminB: 'AdminB',
          MarkFavorite: 'MarkFavorite',
          HsCancel: 'Cancel',
          GoCE: 'CE',
          Desktop: 'Desktop',
          HsDrawStorage: 'DrawLocalStorage',
          DrawPopUpLogStorage: 'DrawPopUpLogStorage',
          BigRed: 'BigRed',
          ModeEdit: 'sc-mode-edit',
          ModeNorm: 'Norm',
          ModePrev: 'Prev',
          PresentationDetails: 'PresentationDetails',
          CompactCE: 'CompactCE',
          QuickPublish: 'QuickPublish',
          HsRemoveFromStorage: 'RemoveOneFromLocalStorage',
          HsRestoreWindowState: 'RestoreWindowState',
          TakeSnapshot: 'SaveWindowState',
          UpdateNicknameB: 'UpdateNickname',
        },
        
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

    ScMode: {
      edit: { AsEnum: scMode.Edit, AsString: 'edit' },
      normal: { AsEnum: scMode.Normal, AsString: 'normal' },
      preview: { AsEnum: scMode.Preview, AsString: 'preview' },
    },
    Selector: {
      Btn: {
        WindowClose: '[id=close-window]',
      },
      Legend: {
        LgndSettings: '[id=lgnd-settings]',
        LgndInSite: '[id=lgnd-in-site]',
        LgndHindSite: '[id=lgnd-hind-site]',

        LgndDebug: '[id=lgnd-log]',
        LgndForeSite: '[id=lgnd-fore-site]',
        LgndState: '[id=lgnd-state]',
      },
      HS: {
        GenericSettingTest: '[id=id-generic-setting-test]',
        LogToConsole: '[id=id-settings-show-log-data]',
        iCBoxdSettingsAutoLogin: '[id=id-settings-auto-login]',
        PrefAutoLogin: '[id=id-settings-auto-login]',

        SettingNotUsed: '[id=id-settings-not-used]',
        AutoSnapshotBeforeWindowChange: '[id=id-settings-auto-snapshot-on-window-change]',
        SettingAutoSaveInterval: '[id=id-settings-auto-save-interval]',
        SettingAutoSaveMaxCount: '[id=id-settings-auto-save-max-count]',

        SettingDebugKeepDialogOpen: '[id=id-settings-debug-keep-dialog-open]',
        SettingUseCompactCss: '[id=id-settings-use-compact]',

        BuildStamp: '[id=build-stamp]',
        DivOverlayModule: '[id=menu-overlay]',
        DivMsgStatus: '[id=msg-status]',
        DivStatePopUp: '[id=div-state-pop-up]',
        DivStateContent: '[id=div-state-content]',
        IdFieldSetDebug: '[id=id-fieldset-debug]',
        SelStateSnapShot: '[id=selState]',
        TaDebug: '[id=ta-log]',
      },
    },
    Settings: {
      Defaults: {
        LgndDebug: false,
        LgndForeSite: true,
        LgndHindSite: true,
        LgndInSite: true,
        LgndSettings: false,
        LgndState: false,
        DebugKeepDialogOpen: false,
        AutoSaveEnabled: false,
        
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
    Timeouts: {
      WaitBeforeRemovingCompleteFlag: 1500,
      
      AutoLoginCheckInterval: 3000,
    },
  }
}