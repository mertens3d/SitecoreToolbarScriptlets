﻿import { scMode } from "../../../Shared/scripts/Enums/scMode";
import { IPopUpConst } from "../../../Shared/scripts/Interfaces/IPopUpConst";

export class PopConst {
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
          CE: 'CE',
          Desktop: 'Desktop',
          HsDrawStorage: 'DrawLocalStorage',
          BigRed: 'BigRed',
          ModeEdit: 'sc-mode-edit',
          ModeNorm: 'Norm',
          ModePrev: 'Prev',
          QuickPublish: 'QuickPublish',
          HsRemoveFromStorage: 'RemoveOneFromLocalStorage',
          HsRestoreWindowState: 'RestoreWindowState',
          HsSaveWindowState: 'SaveWindowState',
          UpdateNicknameB: 'UpdateNickname',
        },
        
      }
    },
    Numbers: {
      MinMenuHeight: 600,
      MinMenuWidth: 600,
      MaxAutoSaveCount: 10,
      AutoSaveIntervalMin: 1000,
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
        iCBoxdSettingsShowLogData: '[id=id-settings-show-log-data]',
        iCBoxdSettingsAutoLogin: '[id=id-settings-auto-login]',
        PrefAutoLogin: '[id=id-settings-auto-login]',
        SettingAutoSaveEnabled: '[id=id-settings-auto-save-enabled]',
        SettingAutoSaveInterval: '[id=id-settings-auto-save-interval]',
        SettingAutoSaveMaxCount: '[id=id-settings-auto-save-max-count]',

        SettingDebugKeepDialogOpen: '[id=id-settings-debug-keep-dialog-open]',

        BuildStamp: '[id=build-stamp]',
        DivState: '[id=div-state]',
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
      WindowRoot: 'todo',
      SettingsSuffix: 'todo',
      KeyGenericSettings: 'GenericSettings',
      Defaults: {
        bool: {
          AutoSaveEnabled: false,
          AutoLogin: false,
          DefaultDebugKeepDialogOpen: false,
          DefaultShowLogData: false
        }
      }
    },
    Timeouts: {
      WaitBeforeRemovingCompleteFlag: 1500,
      
      AutoLoginCheckInterval: 3000,
    },
  }
}