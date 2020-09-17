import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { MenuCommandKey } from '../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { scMode } from '../../../Shared/scripts/Enums/scMode';
import { VisibilityType } from '../../../Shared/scripts/Enums/VisibilityType';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { CommandButtonEvents } from '../../../Shared/scripts/Enums/CommandButtonEvents';
import { ModuleType } from "../../../Shared/scripts/Enums/ModuleType";
import { Handlers } from '../Managers/Handlers';
import { PopConst } from './PopConst';
import { IMenuCommandDefinitionBucket } from '../../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket';
import { IMenuCommandDefinition } from "../../../Shared/scripts/Interfaces/IMenuCommandDefinition";

export class CommandManager extends LoggableBase {
  public MenuCommandParamsBucket: IMenuCommandDefinitionBucket;
  private Handlers: Handlers;

  constructor(logger: ILoggerAgent, handlers: Handlers) {
    super(logger);
    this.Handlers = handlers;
    this.MenuCommandParamsBucket = this.BuildMenuCommandParamsBucket();
  }

  GetMenuCommandParamsByKey(needleCommand: MenuCommandKey): IMenuCommandDefinition {
    let toReturn: IMenuCommandDefinition = null;
    for (var idx = 0; idx < this.MenuCommandParamsBucket.MenuCommandParamsAr.length; idx++) {
      let candidate: IMenuCommandDefinition = this.MenuCommandParamsBucket.MenuCommandParamsAr[idx];
      if (candidate.MenuCommandKey === needleCommand) {
        toReturn = candidate;
        break;
      }
    }
    return toReturn;
  }

  private BuildMenuCommandParamsBucket(): IMenuCommandDefinitionBucket {
    let toReturn: IMenuCommandDefinitionBucket =
    {
      MenuCommandParamsAr: [
        {
          MenuCommandKey: MenuCommandKey.CloseWindow,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnWindowClose,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.CloseWindow,
          InnerText: "",
          VisibilityControllers: [],
          ModuleType: ModuleType.ButtonClose,
          EventData: {
            Handler: this.Handlers.Internal.CloseWindow,
            Event: CommandButtonEvents.OnSingleClick,
            ParameterData: [],
          }
        },

        {
          MenuCommandKey: MenuCommandKey.AddCeTab,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders. BtnAddContentEditor,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.AddCeTab,
          InnerText: "Add CE Tab to DT",
          VisibilityControllers: [VisibilityType.Desktop],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.External.AddCETab,
            ParameterData: [],
          }
        },
        {
          MenuCommandKey: MenuCommandKey.GoScModeEdit,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnModeEdit,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.ScModeEdit,
          InnerText: "Edit",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.Internal.SetScModeInternal,
            ParameterData: [scMode.Edit],
          }
        },
        {
          MenuCommandKey: MenuCommandKey.ScModeNormal,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnModeNorm,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.ScModeNormal,
          InnerText: "Normal",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.Internal.SetScModeInternal,
            ParameterData: [scMode.Normal],
          }
        },
        {
          MenuCommandKey: MenuCommandKey.ScModePrev,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnModePrev,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.ScModePrev,
          InnerText: "Preview",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor, VisibilityType.Edit],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.Internal.SetScModeInternal,
            ParameterData: [scMode.Preview],
          }
        },
        //{
        //  Command: MenuCommand.Edit,
        //  ButtonSelector: PopConst.Const.Selector.HS.ModePrev,
        //  RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop, scWindowType.Edit, scWindowType.Preview, scWindowType.Normal],
        //  Events: {
        //    Event: CommandButtonEvents.OnClick,
        //    Handler: this.Handlers.External.__hndlrSetScMode,
        //    ParameterData: [PopConst.Const.ScMode.preview],
        //  }
        //},

        // ---- fore site

        {
          MenuCommandKey: MenuCommandKey.UpdateNickname,
          PlaceHolderSelector: PopConst.Const.Selector.HS.UpdateNicknameB,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.UpdateNickname,
          InnerText: "Set Nickname",
          VisibilityControllers: [VisibilityType.SnapShotSelected],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.External.HndlrSnapShotUpdateNickName,
            ParameterData: [],
          }
        },
        {
          MenuCommandKey: MenuCommandKey.PresentationDetails,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders. BtnPresentationDetails,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.PresentationDetails,
          InnerText: "Presentation Details",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.External.HndlrPresentationDetails,
            ParameterData: [],
          }
        },
        {
          MenuCommandKey: MenuCommandKey.CompactCE,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders. BtnCompactScUi,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.CompactCe,
          InnerText: "Compact CE",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.External.HndlrCompactCE,
            ParameterData: [],
          }
        },
        {
          MenuCommandKey: MenuCommandKey.PutAdminB,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnAdminB,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.AdminB,
          InnerText: "Admin B",
          VisibilityControllers: [VisibilityType.LoginPage],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.External.PutAdminB,
            ParameterData: [],
          }
        },

        {
          MenuCommandKey: MenuCommandKey.GoContentEditor,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnGoContentEditor,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.GoContentEditor,
          InnerText: "Content Editor",
          VisibilityControllers: [VisibilityType.NotLogin],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.Internal.GoCeInternal,
            ParameterData: [],
          }
        },

        {
          MenuCommandKey: MenuCommandKey.QuickPublish,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders. BtnQuickPublish,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.QuickPublish,
          InnerText: "Quick Publish",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.External.QuickPublish,
            ParameterData: [],
          }
        },
        {
          MenuCommandKey: MenuCommandKey.GoDesktop,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.Desktop,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.GoDesktop,
          InnerText: "Desktop",
          VisibilityControllers: [VisibilityType.NotLogin],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.Internal.GoDesktopInternal,
            ParameterData: [],
          }
        },
        {
          MenuCommandKey: MenuCommandKey.Ping,
          PlaceHolderSelector: null,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.Ping,
          InnerText: "",
          VisibilityControllers: [],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: null,
            Handler: this.Handlers.External.HndlrPing,
            ParameterData: [],
          }
        },
        // ------ hind site
        {
          MenuCommandKey: MenuCommandKey.TakeSnapShot,
          PlaceHolderSelector: PopConst.Const.Selector.HS.TakeSnapshot,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.TakeSnapShot,
          InnerText: "Take Snapshot",
          VisibilityControllers: [VisibilityType.SnapShotable],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.External.HndlrSnapShotCreate,
            ParameterData: [],
          }
        },

        {
          MenuCommandKey: MenuCommandKey.ToggleFavorite,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ToggleFavorite,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.ToggleFavorite,
          InnerText: "Toggle as Favorite",
          VisibilityControllers: [VisibilityType.SnapShotSelected],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Handler: this.Handlers.External.ToggleFavorite,
            Event: CommandButtonEvents.OnSingleClick,
            ParameterData: [],
          }
        },
        {
          MenuCommandKey: MenuCommandKey.Cancel,
          PlaceHolderSelector: PopConst.Const.Selector.HS.HsCancel,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.Cancel,
          InnerText: "Cancel",
          VisibilityControllers: [VisibilityType.CommandIsRunning],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.External.__hndlrCancelOperation,
            ParameterData: [],
          }
        },
        {
          MenuCommandKey: MenuCommandKey.Remove,
          PlaceHolderSelector: PopConst.Const.Selector.HS.HsRemoveFromStorage,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.RemoveFromStorage,
          InnerText: "Delete Snapshot",
          VisibilityControllers: [VisibilityType.SnapShotSelected],
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.External.HndlrSnapShotRemove,
            ParameterData: [],
          }
        },
        {
          MenuCommandKey: MenuCommandKey.RestoreStateTBDTab,
          PlaceHolderSelector: PopConst.Const.Selector.HS.SelStateSnapShot,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.RestoreStateTBD,
          VisibilityControllers: [],//[VisibilityType.SnapShotSelected],
          InnerText: "Restore to TBD",
          ModuleType: ModuleType.Select,
          EventData: {
            Event: CommandButtonEvents.OnDoubleClick,
            Handler: this.Handlers.External.HndlrSnapShotRestoreTBDTab,
            ParameterData: [],
          }
        },
        {
          MenuCommandKey: MenuCommandKey.RestoreStateSameTab,
          PlaceHolderSelector: PopConst.Const.Selector.HS.HsRestoreWindowStateSameTab,
          VisibilityControllers: [VisibilityType.SnapShotSelected],
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.RestoreSameTab,
          InnerText: "Restore to this tab",
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.External.HndlrSnapShotRestoreSameTab,
            ParameterData: [],
          }
        },
        {
          MenuCommandKey: MenuCommandKey.RestoreStateNewTab,
          PlaceHolderSelector: PopConst.Const.Selector.HS.HsRestoreWindowStateNewTab,
          VisibilityControllers: [VisibilityType.SnapShotSelected],
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.RestoreNewTab,
          InnerText: "Restore to new tab",
          ModuleType: ModuleType.ButtonTyp,
          EventData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.External.HndlrSnapShotRestoreNewTab,
            ParameterData: [],
          }
        },
      ]
    }
    return toReturn;
  }
}