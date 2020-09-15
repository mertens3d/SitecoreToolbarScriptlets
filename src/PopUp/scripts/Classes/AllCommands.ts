import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { MenuCommand } from '../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { scMode } from '../../../Shared/scripts/Enums/scMode';
import { VisibilityType } from '../../../Shared/scripts/Enums/VisibilityType';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { CommandButtonEvents, ModuleType } from '../../../Shared/scripts/Enums/CommandButtonEvents';
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { Handlers } from '../Managers/Handlers';
import { PopConst } from './PopConst';

export class CommandManager extends LoggableBase{
  AllMenuCommands: IOneCommand[];
  private Handlers: Handlers;

  constructor(logger: ILoggerAgent, handlers: Handlers) {
    super(logger);
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
        PlaceHolderSelector: PopConst.Const.Selector.Btn.WindowClose,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.CloseWindow,
        InnerText: "",
        VisibilityControllers: [],
        ModuleType: ModuleType.Button,
        EventData: {
          Handler: handlers.Internal.CloseWindow,
          Event: CommandButtonEvents.OnSingleClick,
          ParameterData: [],
        }
      },

      {
        Command: MenuCommand.AddCeTab,
        PlaceHolderSelector: PopConst.Const.Selector.HS.BigRed,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.AddCeTab,
        InnerText: "Add CE Tab to DT",
        VisibilityControllers: [VisibilityType.Desktop],
        ModuleType: ModuleType.Button,
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.AddCETab,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.GoScModeEdit,
        PlaceHolderSelector: PopConst.Const.Selector.HS.ModeEdit,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.ScModeEdit,
        InnerText: "Edit",
        VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
        ModuleType: ModuleType.Button,
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.Internal.SetScModeInternal,
          ParameterData: [scMode.Edit],
        }
      },
      {
        Command: MenuCommand.ScModeNormal,
        PlaceHolderSelector: PopConst.Const.Selector.HS.ModeNorm,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.ScModeNormal,
        InnerText: "Normal",
        VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
        ModuleType: ModuleType.Button,
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.Internal.SetScModeInternal,
          ParameterData: [scMode.Normal],
        }
      },
      {
        Command: MenuCommand.ScModePrev,
        PlaceHolderSelector: PopConst.Const.Selector.HS.ModePrev,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.ScModePrev,
        InnerText: "Preview",
        VisibilityControllers: [VisibilityType.DesktopOrContentEditor, VisibilityType.Edit],
        ModuleType: ModuleType.Button,
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
        PlaceHolderSelector: PopConst.Const.Selector.HS.UpdateNicknameB,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.UpdateNickname,
        InnerText: "Set Nickname",
        VisibilityControllers: [VisibilityType.SnapShotSelected],
        ModuleType: ModuleType.Button,
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.HndlrSnapShotUpdateNickName,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.PresentationDetails,
        PlaceHolderSelector: PopConst.Const.Selector.HS.PresentationDetails,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.PresentationDetails,
        InnerText: "Presentation Details",
        VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
        ModuleType: ModuleType.Button,
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.HndlrPresentationDetails,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.CompactCE,
        PlaceHolderSelector: PopConst.Const.Selector.HS.CompactCE,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.CompactCe,
        InnerText: "Compact CE",
        VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
        ModuleType: ModuleType.Button,
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.HndlrCompactCE,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.PutAdminB,
        PlaceHolderSelector: PopConst.Const.Selector.HS.AdminB,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.AdminB,
        InnerText: "Admin B",
        VisibilityControllers: [VisibilityType.LoginPage],
        ModuleType: ModuleType.Button,
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.PutAdminB,
          ParameterData: [],
        }
      },

      {
        Command: MenuCommand.GoContentEditor,
        PlaceHolderSelector: PopConst.Const.Selector.HS.GoCE,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.GoContentEditor,
        InnerText: "Content Editor",
        VisibilityControllers: [VisibilityType.NotLogin],
        ModuleType: ModuleType.Button,
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.Internal.GoCeInternal,
          ParameterData: [],
        }
      },

      {
        Command: MenuCommand.QuickPublish,
        PlaceHolderSelector: PopConst.Const.Selector.HS.QuickPublish,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.QuickPublish,
        InnerText: "Quick Publish",
        VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
        ModuleType: ModuleType.Button,
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.QuickPublish,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.GoDesktop,
        PlaceHolderSelector: PopConst.Const.Selector.HS.Desktop,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.GoDesktop,
        InnerText: "Desktop",
        VisibilityControllers: [VisibilityType.NotLogin],
        ModuleType: ModuleType.Button,
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.Internal.GoDesktopInternal,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.Ping,
        PlaceHolderSelector: null,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.Ping,
        InnerText: "",
        VisibilityControllers: [],
        ModuleType: ModuleType.Button,
        EventData: {
          Event: null,
          Handler: handlers.External.HndlrPing,
          ParameterData: [],
        }
      },
      // ------ hind site
      {
        Command: MenuCommand.TakeSnapShot,
        PlaceHolderSelector: PopConst.Const.Selector.HS.TakeSnapshot,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.TakeSnapShot,
        InnerText: "Take Snapshot",
        VisibilityControllers: [VisibilityType.SnapShotable],
        ModuleType: ModuleType.Button,
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.HndlrSnapShotCreate,
          ParameterData: [],
        }
      },

      {
        Command: MenuCommand.ToggleFavorite,
        PlaceHolderSelector: PopConst.Const.Selector.HS.ToggleFavorite,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.ToggleFavorite,
        InnerText: "Toggle as Favorite",
        VisibilityControllers: [VisibilityType.SnapShotSelected],
        ModuleType: ModuleType.Button,
        EventData: {
          Handler: handlers.External.ToggleFavorite,
          Event: CommandButtonEvents.OnSingleClick,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.Cancel,
        PlaceHolderSelector: PopConst.Const.Selector.HS.HsCancel,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.Cancel,
        InnerText: "Cancel",
        VisibilityControllers: [VisibilityType.CommandIsRunning],
        ModuleType: ModuleType.Button,
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.__hndlrCancelOperation,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.Remove,
        PlaceHolderSelector: PopConst.Const.Selector.HS.HsRemoveFromStorage,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.RemoveFromStorage,
        InnerText: "Delete Snapshot",
        VisibilityControllers: [VisibilityType.SnapShotSelected],
        ModuleType: ModuleType.Button,
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.HndlrSnapShotRemove,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.RestoreStateTBDTab,
        PlaceHolderSelector: PopConst.Const.Selector.HS.SelStateSnapShot,
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.RestoreStateTBD,
        VisibilityControllers: [],//[VisibilityType.SnapShotSelected],
        InnerText: "Restore to TBD",
        ModuleType: ModuleType.Select,
        EventData: {
          Event: CommandButtonEvents.OnDoubleClick,
          Handler: handlers.External.HndlrSnapShotRestoreTBDTab,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.RestoreStateSameTab,
        PlaceHolderSelector: PopConst.Const.Selector.HS.HsRestoreWindowStateSameTab,
        VisibilityControllers: [VisibilityType.SnapShotSelected],
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.RestoreSameTab,
        InnerText: "Restore to this tab",
        ModuleType: ModuleType.Button,
        EventData: {
          Event: CommandButtonEvents.OnSingleClick,
          Handler: handlers.External.HndlrSnapShotRestoreSameTab,
          ParameterData: [],
        }
      },
      {
        Command: MenuCommand.RestoreStateNewTab,
        PlaceHolderSelector: PopConst.Const.Selector.HS.HsRestoreWindowStateNewTab,
        VisibilityControllers: [VisibilityType.SnapShotSelected],
        IconClassName: PopConst.Const.ClassNames.HS.Buttons.RestoreNewTab,
        InnerText: "Restore to new tab",
        ModuleType: ModuleType.Button,
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