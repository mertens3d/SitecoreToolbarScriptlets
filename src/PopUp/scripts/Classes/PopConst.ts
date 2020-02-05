import { scMode } from "../../../Shared/scripts/Enums/scMode";
import { IPopUpConst } from "../../../Shared/scripts/Interfaces/IPopUpConst";

export class PopConst {
  static PopConst: IPopUpConst = {
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
        SelectHeader: 'sel-header',
        TabId: 'orig-win-id',

        Btn: {
          AdminB: 'AdminB',
          ToggleFavoriteB: 'ToggleFavorite',
          Cancel: 'Cancel',
          CE: 'CE',
          Desktop: 'Desktop',
          DrawStorage: 'DrawLocalStorage',
          BigRed: 'BigRed',
          ModeEdit: 'Edit',
          ModeNorm: 'Norm',
          ModePrev: 'Prev',
          QuickPublish: 'QuickPublish',
          RemoveFromStorage: 'RemoveOneFromLocalStorage',
          RestoreWindowState: 'RestoreWindowState',
          SaveWindowState: 'SaveWindowState',
          UpdateNicknameB: 'UpdateNickname',
        },
        Legend: {
          LgndSettings: 'lgnd-settings',
          LgndInSite: 'lgnd-in-site',
          LgndHindSite: 'lgnd-hind-site',

          LgndDebug: 'lgnd-debug',
          LgndForeSite: 'lgnd-fore-site',
          LgndState: 'lgnd-state',
        }
      }
    },
    Numbers: {
      MinMenuHeight: 600,
      MinMenuWidth: 600,
      MaxAutoSaveCount: 10,
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
      HS: {
        iCBoxdSettingsShowDebugData: '[id=id-settings-show-debug-data]',
        iCBoxdSettingsAutoLogin: '[id=id-settings-auto-login]',
        PrefAutoLogin: '[id=id-settings-auto-login]',
        SettingAutoSaveEnabled: '[id=id-settings-auto-save]',
        SettingAutoSaveInterval: '[id=id-settings-auto-save-interval]',

        IdFieldSetDebug: '[id=id-fieldset-debug]',
        menuOverlay: '[id=id-menu-overlay]',
        SelStateSnapShot: '[id=selState]',
        TaDebug: '[id=ta-debug]',
        TaState: '[id=ta-state]',
        BuildStamp: '[id=build-stamp]',
      },
    },
    Storage: {
      WindowRoot: 'todo',
      SettingsSuffix: 'todo',
      Defaults: {
        bool: {
          AutoSave: false,
          AutoLogin: false,
          DefaultDebugKeepDialogOpen: false,
          DefaultShowDebugData: false
        }
      }
    },
    Timeouts: {
      WaitBeforeRemovingCompleteFlag: 1500,
      AutoSaveInterval: 15000,
      AutoLoginCheckInterval: 3000,
    },
  }
}