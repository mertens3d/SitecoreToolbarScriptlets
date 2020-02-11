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
          ModeEdit: 'Edit',
          ModeNorm: 'Norm',
          ModePrev: 'Prev',
          QuickPublish: 'QuickPublish',
          HsRemoveFromStorage: 'RemoveOneFromLocalStorage',
          HsRestoreWindowState: 'RestoreWindowState',
          HsSaveWindowState: 'SaveWindowState',
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

    Regex: {
      ContentEditor: /Content.*?Editor/ig,
      NbSp: /&nbsp;/ig,
      PageType: {
        //http://perficient9sc.dev.local/?sc_itemid=%7B9E8CD546-2354-4921-B38C-4A0C864F236B%7D&sc_mode=preview&sc_lang=en&sc_site=website
        Desktop: /.*default.aspx/ig,
        Edit: /sc_itemid=.*sc_mode=edit/ig,
        Normal: /sc_itemid=.*sc_mode=normal/ig,
        Preview: /sc_itemid=.*sc_mode=preview/ig,
      },
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
      HS: {
        iCBoxdSettingsShowDebugData: '[id=id-settings-show-debug-data]',
        iCBoxdSettingsAutoLogin: '[id=id-settings-auto-login]',
        PrefAutoLogin: '[id=id-settings-auto-login]',
        SettingAutoSaveEnabled: '[id=id-settings-auto-save]',
        SettingAutoSaveInterval: '[id=id-settings-auto-save-interval]',

        IdFieldSetDebug: '[id=id-fieldset-debug]',
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
      AutoSaveInterval: 1000,
      AutoLoginCheckInterval: 3000,
    },
    UrlSuffix: {
      Desktop: '/sitecore/shell/default.aspx',
      Login: '/sitecore/login',
      LaunchPad: '/client/applications/launchpad',
      CE: '/sitecore/shell/Applications/Content Editor.aspx?sc_bw=1',
      None: '/',
    },
    
  }
}