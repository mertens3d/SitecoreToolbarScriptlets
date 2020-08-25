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
        LgndDebug: '[id=lgnd-log]',
        LgndForeSite: '[id=lgnd-fore-site]',
        LgndHindSite: '[id=lgnd-hind-site]',
        LgndInSite: '[id=lgnd-in-site]',
        LgndMessages: '[id=lgnd-messages]',
        LgndSettings: '[id=lgnd-settings]',
        LgndState: '[id=lgnd-state]',
      },
      HS: {
        AutoSnapshotBeforeWindowChange: '[id=id-settings-auto-snapshot-on-window-change]',
        BuildStamp: '[id=build-stamp]',
        DivMsgStatus: '[id=msg-status]',
        DivOverlayModule: '[id=menu-overlay]',
        DivStateContent: '[id=div-state-content]',
        DivStatePopUp: '[id=div-state-pop-up]',
        GenericSettingTest: '[id=id-generic-setting-test]',
        iCBoxdSettingsAutoLogin: '[id=id-settings-auto-login]',
        IdFieldSetDebug: '[id=id-fieldset-debug]',
        LogToConsole: '[id=id-settings-show-log-data]',
        PrefAutoLogin: '[id=id-settings-auto-login]',
        SelStateSnapShot: '[id=selState]',
        SettingAutoSaveInterval: '[id=id-settings-auto-save-interval]',
        SettingAutoSaveMaxCount: '[id=id-settings-auto-save-max-count]',
        SettingDebugKeepDialogOpen: '[id=id-settings-debug-keep-dialog-open]',
        SettingNotUsed: '[id=id-settings-not-used]',
        SettingUseCompactCss: '[id=id-settings-use-compact]',
        TaDebug: '[id=ta-log]',
        textAreaFeedback: '[id=ta-feedback]',
      },
    },
    Settings: {
      Defaults: {
        AutoSaveEnabled: false,
        DebugKeepDialogOpen: false,
        LgndDebug: false,
        LgndForeSite: true,
        LgndHindSite: true,
        LgndInSite: true,
        LgndMessages: false,
        LgndSettings: false,
        LgndState: false,
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
      lenTimestamp : 13,
      lenNickname : 16,
      lenPageType : 7,
      lenPrefix : 6,
      lenShortId : 4,
      colSep:  ' - ',
      lenCeCount : 3,
      lenActiveNode : 16,
      lenFavorite : 3,
    },
    Timeouts: {
      WaitBeforeRemovingCompleteFlag: 1500,
      
      AutoLoginCheckInterval: 3000,
    },
  }
}