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
        DrawPopUpLogStorage: string,
        HsRemoveFromStorage: string,
        HsRestoreWindowState: string,
        TakeSnapshot: string,
        MarkFavorite: string,
        ModeEdit: string,
        ModeNorm: string,
        ModePrev: string,
        PresentationDetails: string,
        CompactCE: string,
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
      LgndMessages: string,
      LgndSettings: string,
      LgndState: string,
    },
    HS: {
      BuildStamp: string,
      DivOverlayModule: string,
      DivMsgStatus: string,
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
      SettingUseCompactCss: string,
      SettingAutoSaveInterval: string,
      SettingAutoSaveMaxCount: string,
      TaDebug: string,
    }
  },
  Settings: {
    Defaults: {
      AutoSaveEnabled: boolean,
      DebugKeepDialogOpen: boolean,
      LgndDebug: boolean,
      LgndForeSite: boolean,
      LgndHindSite: boolean,
      LgndInSite: boolean,
      LgndMessages: boolean,
      LgndSettings: boolean,
      LgndState: boolean,
    }
  },
  Storage: {
    //StorageRootPrefix: string,
    SettingsSuffix: string,
    KeyGenericSettings: string,
    //StorageLastKeyKey: string,
    StorageLogKeyPrefix: string,
    Defaults: {
      bool: {
        AutoSaveEnabled: boolean,
        AutoSnapshotBeforeWindowChange: boolean,
        AutoLogin: boolean,
        DefaultDebugKeepDialogOpen: boolean,
   
      }
    }
  },
  SnapShotFormat: {
    lenTimestamp: number ,
    lenNickname: number,
    lenPageType: number,
    lenPrefix: number ,
    lenShortId: number,
    colSep: string,
    lenCeCount: number,
    lenActiveNode: number,
    lenFavorite: number,
  },
  Timeouts: {
    WaitBeforeRemovingCompleteFlag: number,
    
    AutoLoginCheckInterval: number,
  },
 
}