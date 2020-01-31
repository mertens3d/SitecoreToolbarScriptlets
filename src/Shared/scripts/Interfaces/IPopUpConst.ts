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
  },
  Notify: {
    Default: string,
    PublishComplete: string,
  },

  Selector: {
    HS: {
      iCBoxdSettingsShowDebugData: string,
      IdFieldSetDebug: string,
      menuOverlay: string,
      PrefAutoLogin: string,
      SelStateSnapShot: string,
      TaDebug: string,
      TaState: string,
    }
  }
  Storage: {
    DefaultDebugKeepDialogOpen: boolean,
    WindowRoot: string,
    SettingsSuffix: string,
    DefaultShowDebugData: boolean,
  },
  Timeouts: {
    WaitBeforeRemovingCompleteFlag: number,
  },
}