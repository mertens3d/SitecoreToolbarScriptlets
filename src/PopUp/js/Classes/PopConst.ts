import { IPopUpConst } from "../Interfaces/IPopUpConst";
import { scMode } from "../../../JsShared/Enum/scMode";

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
        SelStateSnapShot: 'selState',
        TabId: 'orig-win-id',
        TaDebug: 'ta-debug',
        Btn: {
          AdminB: 'AdminB',
          ToggleFavoriteB: 'ToggleFavorite',
          Cancel: 'Cancel',
          CE: 'CE',
          Desktop: 'Desktop',
          DrawStorage: 'DrawLocalStorage',
          BigRed: 'btnBigRed',
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
        }
      }
    },
    Numbers: {
      MinMenuHeight: 600,
      MinMenuWidth: 600,
    },
    Notify: {
      Default: 'Complete',
      PublishComplete: 'Publishing Complete',
    },
    ScMode: {
      edit: { asEnum: scMode.Edit, asString: 'edit' },
      normal: { asEnum: scMode.Normal, asString: 'normal' },
      preview: { asEnum: scMode.Preview, asString: 'preview' },
    },
    Selector: {
      HS: {
        iCBoxdSettingsShowDebugData: '[id=id-settings-show-debug-data]',
        IdFieldSetDebug: '[id=id-fieldset-debug]',
        menuOverlay: '[id=id-menu-overlay]',
        PrefAutoLogin: '[id=id-settings-auto-login]',
      },
    },
    Storage: {
      DefaultDebugKeepDialogOpen: false,
      WindowRoot: 'todo',
      SettingsSuffix: 'todo',
      DefaultShowDebugData: false
    },
    Timeouts: {
      WaitBeforeRemovingCompleteFlag: 1500,
    },
  }
}