import { IScMode } from "../../../Shared/Scripts/Interfaces/IscMode";

export interface IPopUpConst {
  ScMode: {
    edit: IScMode,
    normal: IScMode,
    preview: IScMode,
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
    AutoSaveIntervalMin: number,
  },
  Notify: {
    Default: string,
    PublishComplete: string,
  },
 
  Selector: {
    Btn: {
      WindowClose: string,
    },
    Legend: {
      LgndDebug: string,
      LgndForeSite: string,
      LgndHindSite: string,
      LgndInSite: string,
      LgndSettings: string,
      LgndState: string,
    },
    HS: {
      BuildStamp: string,
      GenericSettingTest: string,
      DivState: string,
      iCBoxdSettingsAutoLogin: string,
      iCBoxdSettingsShowLogData: string,
      IdFieldSetDebug: string,
      PrefAutoLogin: string,
      SelStateSnapShot: string,
      SettingAutoSaveEnabled: string,
      SettingDebugKeepDialogOpen: string,
      SettingAutoSaveInterval: string,
      SettingAutoSaveMaxCount: string,
      TaDebug: string,
    }
  },
  Settings: {
    Defaults: {
      LgndDebug: boolean,
      LgndForeSite: boolean,
      LgndHindSite: boolean,
      LgndInSite: boolean,
      LgndSettings: boolean,
      LgndState: boolean,
      AutoSaveEnabled: boolean,
      DebugKeepDialogOpen: boolean,

    }
  },
  Storage: {
    WindowRoot: string,
    SettingsSuffix: string,
    KeyGenericSettings: string,
    Defaults: {
      bool: {
        AutoSaveEnabled: boolean,
        AutoLogin: boolean,
        DefaultDebugKeepDialogOpen: boolean,
        DefaultShowLogData: boolean,
      }
    }
  },
  Timeouts: {
    WaitBeforeRemovingCompleteFlag: number,
    
    AutoLoginCheckInterval: number,
  },
 
}