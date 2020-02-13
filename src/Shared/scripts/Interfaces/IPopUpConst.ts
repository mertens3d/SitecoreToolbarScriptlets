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
 
  Selector: {
    Btn: {
      WindowClose: string,
    }
    HS: {
      BuildStamp: string,
      DivState: string,
      iCBoxdSettingsAutoLogin: string,
      iCBoxdSettingsShowDebugData: string,
      IdFieldSetDebug: string,
      PrefAutoLogin: string,
      SelStateSnapShot: string,
      SettingAutoSaveEnabled: string,
      SettingAutoSaveInterval: string,
      TaDebug: string,
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
 
}