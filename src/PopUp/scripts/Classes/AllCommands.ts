import { MenuCommand } from '../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { VisibilityType } from '../../../Shared/scripts/Enums/VisibilityType';
import { CommandButtonEvents } from '../../../Shared/scripts/Interfaces/CommandButtonEvents';
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { Handlers } from '../Managers/Handlers';
import { PopUpHub } from '../Managers/PopUpHub';
import { PopConst } from './PopConst';
export class AllCommands {
  static BuildAllCommands(popHub: PopUpHub, handlers: Handlers) {
    let toReturn: IOneCommand[] = [
      {
        Command: MenuCommand.CloseWindow,
        ButtonSelector: PopConst.Const.Selector.Btn.WindowClose,
        VisibilityControllers: [],
        Events: [{
          Handler: handlers.Internal.CloseWindow,
          Event: CommandButtonEvents.OnClick,
          ParameterData: [],
        }]
      },

      {
        Command: MenuCommand.AddCeTab,
        ButtonSelector: PopConst.Const.Selector.HS.BigRed,
        VisibilityControllers: [VisibilityType.Desktop],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.AddCETab,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.GoScModeEdit,
        ButtonSelector: PopConst.Const.Selector.HS.ModeEdit,
        VisibilityControllers: [VisibilityType.ActiveCeNode],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.Internal.SetScModeInternal,
          ParameterData: [PopConst.Const.ScMode.edit],
        }]
      },
      {
        Command: MenuCommand.ScModeNormal,
        ButtonSelector: PopConst.Const.Selector.HS.ModeNorm,
        VisibilityControllers: [VisibilityType.ActiveCeNode],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.Internal.SetScModeInternal,
          ParameterData: [PopConst.Const.ScMode.normal],
        }]
      },
      {
        Command: MenuCommand.ScModePrev,
        ButtonSelector: PopConst.Const.Selector.HS.ModePrev,
        VisibilityControllers: [VisibilityType.ActiveCeNode, VisibilityType.Edit],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.Internal.SetScModeInternal,
          ParameterData: [PopConst.Const.ScMode.preview],
        }]
      },
      //{
      //  Command: MenuCommand.Edit,
      //  ButtonSelector: PopConst.Const.Selector.HS.ModePrev,
      //  RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop, scWindowType.Edit, scWindowType.Preview, scWindowType.Normal],
      //  Events: [{
      //    Event: CommandButtonEvents.OnClick,
      //    Handler: popHub.EventMan.Handlers.External.__hndlrSetScMode,
      //    ParameterData: [PopConst.Const.ScMode.preview],
      //  }]
      //},

      // ---- fore site

      {
        Command: MenuCommand.UpdateNickname,
        ButtonSelector: PopConst.Const.Selector.HS.UpdateNicknameB,
        VisibilityControllers: [VisibilityType.SnapShotSelected],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.HndlrSnapShotUpdateNickName,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.PresentationDetails,
        ButtonSelector: PopConst.Const.Selector.HS.PresentationDetails,
        VisibilityControllers: [VisibilityType.ActiveCeNode],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.HndlrPresentationDetails,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.CompactCE,
        ButtonSelector: PopConst.Const.Selector.HS.CompactCE,
        VisibilityControllers: [VisibilityType.ActiveCeNode],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.HndlrCompactCE,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.PutAdminB,
        ButtonSelector: PopConst.Const.Selector.HS.AdminB,
        VisibilityControllers: [VisibilityType.LoginPage],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.PutAdminB,
          ParameterData: [],
        }]
      },

      {
        Command: MenuCommand.GoContentEditor,
        ButtonSelector: PopConst.Const.Selector.HS.GoCE,
        VisibilityControllers: [VisibilityType.NotLogin],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.Internal.GoCeInternal,
          ParameterData: [],
        }]
      },

      {
        Command: MenuCommand.QuickPublish,
        ButtonSelector: PopConst.Const.Selector.HS.QuickPublish,
        VisibilityControllers: [VisibilityType.ActiveCeNode],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.QuickPublish,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.GoDesktop,
        ButtonSelector: PopConst.Const.Selector.HS.Desktop,
        VisibilityControllers: [VisibilityType.NotLogin],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.Internal.GoDesktopInternal,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.Ping,
        ButtonSelector: null,
        VisibilityControllers: [],
        Events: [{
          Event: null,
          Handler: popHub.EventMan.Handlers.External.Ping,
          ParameterData: [],
        }]
      },
      // ------ hind site
      {
        Command: MenuCommand.TakeSnapShot,
        ButtonSelector: PopConst.Const.Selector.HS.TakeSnapshot,
        VisibilityControllers: [VisibilityType.SnapShotable],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.HndlrSnapShotCreate,
          ParameterData: [],
        }]
      },

      {
        Command: MenuCommand.MarkFavorite,
        ButtonSelector: PopConst.Const.Selector.HS.MarkFavorite,
        VisibilityControllers: [VisibilityType.SnapShotSelected],
        Events: [{
          Handler: popHub.EventMan.Handlers.External.MarkFavorite,
          Event: null,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.Cancel,
        ButtonSelector: PopConst.Const.Selector.HS.HsCancel,
        VisibilityControllers: [VisibilityType.CommandIsRunning],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.__hndlrCancelOperation,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.Remove,
        ButtonSelector: PopConst.Const.Selector.HS.HsRemoveFromStorage,
        VisibilityControllers: [VisibilityType.SnapShotSelected],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.HndlrSnapShotRemove,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.RestoreState,
        ButtonSelector: PopConst.Const.Selector.HS.HsRestoreWindowState,
        VisibilityControllers: [VisibilityType.SnapShotSelected],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.HndlrSnapShotRestore,
          ParameterData: [],
        }]
      },

      //------------ insite
      {
        Command: MenuCommand.DrawStorage,
        ButtonSelector: PopConst.Const.Selector.HS.HsDrawStorage,
        VisibilityControllers: [],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.__DrawStorage,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.DrawStoragePopUpLogStorage,
        ButtonSelector: PopConst.Const.Selector.HS.HsDrawStorage,
        VisibilityControllers: [],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.__DrawPopUpLogStorage,
          ParameterData: [],
        }]
      },
    ];

    return toReturn;
  }
}