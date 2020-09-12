import { MenuCommand } from '../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { scMode } from '../../../Shared/scripts/Enums/scMode';
import { VisibilityType } from '../../../Shared/scripts/Enums/VisibilityType';
import { CommandButtonEvents } from '../../../Shared/scripts/Interfaces/CommandButtonEvents';
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { Handlers } from '../Managers/Handlers';
import { PopConst } from './PopConst';

export class CommandManager {
  AllMenuCommands: IOneCommand[];
  private Handlers: Handlers;

  constructor(handlers: Handlers) {
    this.Handlers = handlers;
    this.AllMenuCommands = CommandManager.BuildAllCommands(this.Handlers);
  }

  GetCommandById(needleCommand: MenuCommand): IOneCommand {
    let toReturn: IOneCommand = null;

    for (var idx = 0; idx < this.AllMenuCommands.length; idx++) {
      let candidate = this.AllMenuCommands[idx];
      if (candidate.Command === needleCommand) {
        toReturn = candidate;
        break;
      }
    }

    return toReturn;
  }

  static BuildAllCommands(handlers: Handlers) {
    let toReturn: IOneCommand[] = [
      {
        Command: MenuCommand.CloseWindow,
        ButtonSelector: PopConst.Const.Selector.Btn.WindowClose,
        VisibilityControllers: [],
        EventData: {
          Handler: handlers.Internal.CloseWindow,
          Event: CommandButtonEvents.OnSingleClick,
          ParameterData: [],
        }
      },

      {
        Command: MenuCommand.AddCeTab,
        ButtonSelector: PopConst.Const.Selector.HS.BigRed,
        VisibilityControllers: [VisibilityType.Desktop],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.AddCETab,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.GoScModeEdit,
        ButtonSelector: PopConst.Const.Selector.HS.ModeEdit,
        VisibilityControllers: [VisibilityType.ActiveCeNode],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.Internal.SetScModeInternal,
          ParameterData: [scMode.Edit],
        }
      },
      {
        Command: MenuCommand.ScModeNormal,
        ButtonSelector: PopConst.Const.Selector.HS.ModeNorm,
        VisibilityControllers: [VisibilityType.ActiveCeNode],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.Internal.SetScModeInternal,
          ParameterData: [scMode.Normal],
        }
      },
      {
        Command: MenuCommand.ScModePrev,
        ButtonSelector: PopConst.Const.Selector.HS.ModePrev,
        VisibilityControllers: [VisibilityType.ActiveCeNode, VisibilityType.Edit],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.Internal.SetScModeInternal,
          ParameterData: [scMode.Preview],
        }
      },
      //{
      //  Command: MenuCommand.Edit,
      //  ButtonSelector: PopConst.Const.Selector.HS.ModePrev,
      //  RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop, scWindowType.Edit, scWindowType.Preview, scWindowType.Normal],
      //  Events: {
      //    Event: CommandButtonEvents.OnClick,
      //    Handler: handlers.External.__hndlrSetScMode,
      //    ParameterData: [PopConst.Const.ScMode.preview],
      //  }
      //},

      // ---- fore site

      {
        Command: MenuCommand.UpdateNickname,
        ButtonSelector: PopConst.Const.Selector.HS.UpdateNicknameB,
        VisibilityControllers: [VisibilityType.SnapShotSelected],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.HndlrSnapShotUpdateNickName,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.PresentationDetails,
        ButtonSelector: PopConst.Const.Selector.HS.PresentationDetails,
        VisibilityControllers: [VisibilityType.ActiveCeNode],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.HndlrPresentationDetails,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.CompactCE,
        ButtonSelector: PopConst.Const.Selector.HS.CompactCE,
        VisibilityControllers: [VisibilityType.ActiveCeNode],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.HndlrCompactCE,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.PutAdminB,
        ButtonSelector: PopConst.Const.Selector.HS.AdminB,
        VisibilityControllers: [VisibilityType.LoginPage],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.PutAdminB,
          ParameterData: [],
        }
      },

      {
        Command: MenuCommand.GoContentEditor,
        ButtonSelector: PopConst.Const.Selector.HS.GoCE,
        VisibilityControllers: [VisibilityType.NotLogin],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.Internal.GoCeInternal,
          ParameterData: [],
        }
      },

      {
        Command: MenuCommand.QuickPublish,
        ButtonSelector: PopConst.Const.Selector.HS.QuickPublish,
        VisibilityControllers: [VisibilityType.ActiveCeNode],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.QuickPublish,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.GoDesktop,
        ButtonSelector: PopConst.Const.Selector.HS.Desktop,
        VisibilityControllers: [VisibilityType.NotLogin],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.Internal.GoDesktopInternal,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.Ping,
        ButtonSelector: null,
        VisibilityControllers: [],
        EventData: {
          Event: null,
          Handler: handlers.External.HndlrPing,
          ParameterData: [],
        }
      },
      // ------ hind site
      {
        Command: MenuCommand.TakeSnapShot,
        ButtonSelector: PopConst.Const.Selector.HS.TakeSnapshot,
        VisibilityControllers: [VisibilityType.SnapShotable],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.HndlrSnapShotCreate,
          ParameterData: [],
        }
      },

      {
        Command: MenuCommand.ToggleFavorite,
        ButtonSelector: PopConst.Const.Selector.HS.ToggleFavorite,
        VisibilityControllers: [VisibilityType.SnapShotSelected],
        EventData: {
          Handler: handlers.External.ToggleFavorite,
          Event: CommandButtonEvents.OnSingleClick,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.Cancel,
        ButtonSelector: PopConst.Const.Selector.HS.HsCancel,
        VisibilityControllers: [VisibilityType.CommandIsRunning],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.__hndlrCancelOperation,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.Remove,
        ButtonSelector: PopConst.Const.Selector.HS.HsRemoveFromStorage,
        VisibilityControllers: [VisibilityType.SnapShotSelected],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.HndlrSnapShotRemove,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.RestoreStateTBDTab,
        ButtonSelector: PopConst.Const.Selector.HS.SelStateSnapShot,
        VisibilityControllers: [],//[VisibilityType.SnapShotSelected],
        EventData: {
          Event: CommandButtonEvents.OnDoubleClick,
          Handler: handlers.External.HndlrSnapShotRestoreTBDTab,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.RestoreStateSameTab,
        ButtonSelector: PopConst.Const.Selector.HS.HsRestoreWindowStateSameTab,
        VisibilityControllers: [VisibilityType.SnapShotSelected],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.HndlrSnapShotRestoreSameTab,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.RestoreStateNewTab,
        ButtonSelector: PopConst.Const.Selector.HS.HsRestoreWindowStateNewTab,
        VisibilityControllers: [VisibilityType.SnapShotSelected],
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.HndlrSnapShotRestoreNewTab,
          ParameterData: [],
        }
      },
    ];

    return toReturn;
  }
}