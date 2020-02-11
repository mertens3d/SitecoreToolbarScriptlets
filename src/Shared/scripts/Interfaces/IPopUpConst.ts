import { IsScMode } from "../../../Shared/Scripts/Interfaces/IscMode";

export interface IPopUpConst {
  ScMode: {
    edit: IsScMode,
    normal: IsScMode,
    preview: IsScMode,
  },
  ElemId: {
    textAreaFeedback: string,
    InputNickname: string,
    HindSiteParentInfo: string,
    HS: {
      SelectHeaderAuto: string;
      SelectHeaderAutoTitle: string;
      SelectHeaderFavorite: string;
      SelectHeaderFavoriteTitle: string;
      TabId: string,

      Btn: {
        AdminB: string,
        BigRed: string,
        CE: string,
        Desktop: string,
        HsCancel: string,
        HsDrawStorage: string,
        HsRemoveFromStorage: string,
        HsRestoreWindowState: string,
        HsSaveWindowState: string,
        MarkFavorite: string,
        ModeEdit: string,
        ModeNorm: string,
        ModePrev: string,
        QuickPublish: string,
        UpdateNicknameB: string,
      }
      Legend: {
        LgndDebug: string,
        LgndForeSite: string,
        LgndHindSite: string,
        LgndInSite: string,
        LgndSettings: string,
        LgndState: string,
      }
    },
  }

  ClassNames: {
    HS: {
      Collapsed: string,
    },
  },
  Numbers: {
    MinMenuHeight: number,
    MinMenuWidth: number,
    MaxAutoSaveCount: number,
  },
  Notify: {
    Default: string,
    PublishComplete: string,
  },
  Regex: {
    ContentEditor: RegExp,
    NbSp: RegExp,
    PageType: {
      Desktop: RegExp
      Edit: RegExp
      Normal: RegExp
      Preview: RegExp
    },
  },
  Selector: {
    Btn: {
      WindowClose: string,
    }
    HS: {
      iCBoxdSettingsShowDebugData: string,
      iCBoxdSettingsAutoLogin: string,
      IdFieldSetDebug: string,
      PrefAutoLogin: string,
      SettingAutoSaveEnabled: string,
      SettingAutoSaveInterval: string,
      SelStateSnapShot: string,
      TaDebug: string,
      TaState: string,
      BuildStamp: string,
    }
  },
  Storage: {
    WindowRoot: string,
    SettingsSuffix: string,
    Defaults: {
      bool: {
        AutoSave: boolean,
        AutoLogin: boolean,
        DefaultDebugKeepDialogOpen: boolean,
        DefaultShowDebugData: boolean,
      }
    }
  },
  Timeouts: {
    WaitBeforeRemovingCompleteFlag: number,
    AutoSaveInterval: number,
    AutoLoginCheckInterval: number,
  },
  UrlSuffix: {
    Desktop: string,
    Login: string,
    LaunchPad: string,
    CE: string,
    None: string,
  },
}