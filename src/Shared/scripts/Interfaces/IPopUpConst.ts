import { IScMode } from "../../../Shared/Scripts/Interfaces/IscMode";

export interface IPopUpConst {
  ScMode: {
    edit: IScMode,
    normal: IScMode,
    preview: IScMode,
  },
  ElemId: {
   
    InputNickname: string,
    HindSiteParentInfo: string,
    HS: {
      SelectHeaderAuto: string;
      SelectHeaderAutoTitle: string;
      SelectHeaderFavorite: string;
      SelectHeaderFavoriteTitle: string;
      TabId: string,

      Btn: {

     
      
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
      LgndBrowserState: string,
      LgndContentState: string,
      LgndForeSite: string,
      LgndHindSite: string,
      LgndInSite: string,
      LgndMessages: string,
      LgndPopUpLog: string,
      LgndPopUpState: string,
      LgndSettings: string,
    },
    HS: {
      AdminB: string,
      AutoSnapshotBeforeWindowChange: string,
      BigRed: string,
      BuildStamp: string,
      CompactCE: string,
      Desktop: string,
      DivOverlayModule: string,
      DivStateContent: string,
      DrawPopUpLogStorage: string,
      FeedbackBrowserState: string,
      FeedbackContentState: string,
      FeedbackLogElement: string,
      FeedbackMessages: string,
      FeedbackPopUpState: string,
      FeedbackStorage: string,
      GenericSettingTest: string,
      GoCE: string,
      HsCancel: string,
      HsDrawStorage: string,
      HsRemoveFromStorage: string,
      HsRestoreWindowState: string,
      iCBoxdSettingsAutoLogin: string,
      IdFieldSetDebug: string,
      LogToConsole: string,
      MarkFavorite: string,
      ModeEdit: string,
      ModeNorm: string,
      ModePrev: string,
      PrefAutoLogin: string,
      PresentationDetails: string,
      QuickPublish: string,
      SelStateSnapShot: string,
      SettingAutoSaveInterval: string,
      SettingAutoSaveMaxCount: string,
      SettingDebugKeepDialogOpen: string,
      SettingNotUsed: string,
      SettingUseCompactCss: string,
      TakeSnapshot: string,
      UpdateNicknameB: string,
    }
  },
  Settings: {
    Defaults: {
      AutoSaveEnabled: boolean,
      DebugKeepDialogOpen: boolean,
      LgndBrowserState: boolean,
      LgndContentState: boolean,
      LgndForeSite: boolean,
      LgndHindSite: boolean,
      LgndInSite: boolean,
      LgndMessages: boolean,
      LgndPopUpLog: boolean,
      LgndPopUpState: boolean,
      LgndSettings: boolean,
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