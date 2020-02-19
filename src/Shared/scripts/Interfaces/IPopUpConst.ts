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
        GoCE: string,
        Desktop: string,
        HsCancel: string,
        HsDrawStorage: string,
        HsRemoveFromStorage: string,
        HsRestoreWindowState: string,
        TakeSnapshot: string,
        MarkFavorite: string,
        ModeEdit: string,
        ModeNorm: string,
        ModePrev: string,
        PresentationDetails: string,
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
      DivStatePopUp: string,
      DivStateContent: string,
      iCBoxdSettingsAutoLogin: string,
      LogToConsole: string,
      IdFieldSetDebug: string,
      PrefAutoLogin: string,
      SelStateSnapShot: string,
      SettingNotUsed: string,
      AutoSnapshotBeforeWindowChange: string,
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
        AutoSnapshotBeforeWindowChange: boolean,
        AutoLogin: boolean,
        DefaultDebugKeepDialogOpen: boolean,
   
      }
    }
  },
  Timeouts: {
    WaitBeforeRemovingCompleteFlag: number,
    
    AutoLoginCheckInterval: number,
  },
 
}