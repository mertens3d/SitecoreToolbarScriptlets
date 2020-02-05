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
      SelectHeader: string;
      TabId: string,

      Btn: {
        AdminB: string,
        ToggleFavoriteB: string,
        Cancel: string,
        CE: string,
        Desktop: string,
        DrawStorage: string,
        BigRed: string,
        ModeEdit: string,
        ModeNorm: string,
        ModePrev: string,
        QuickPublish: string,
        RemoveFromStorage: string,
        RestoreWindowState: string,
        SaveWindowState: string,
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
    HS: {
      iCBoxdSettingsShowDebugData: string,
      iCBoxdSettingsAutoLogin: string,
      IdFieldSetDebug: string,
      menuOverlay: string,
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
}