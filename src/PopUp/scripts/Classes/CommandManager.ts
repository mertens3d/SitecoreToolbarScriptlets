import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { MsgFlag, CommandType } from '../../../Shared/scripts/Enums/1xxx-MessageFlag';
import { MenuCommandKey } from '../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { CommandButtonEvents } from '../../../Shared/scripts/Enums/CommandButtonEvents';
import { ModuleKey } from '../../../Shared/scripts/Enums/ModuleKey';
import { VisibilityType } from '../../../Shared/scripts/Enums/VisibilityType';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IMenuCommandDefinition } from "../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { IMenuCommandDefinitionBucket } from '../../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket';
import { IStateOfPopUp } from '../../../Shared/scripts/Interfaces/IMsgPayload';
import { PopUpMessagesBrokerAgent } from '../Agents/PopUpMessagesBrokerAgent';
import { PopConst } from './PopConst';
import { HandlersForInternal } from './HandlersExternal';

export class CommandManager extends LoggableBase {
  public MenuCommandParamsBucket: IMenuCommandDefinitionBucket;
  private Handlers: HandlersForInternal;
  private PopUpMsgBroker: PopUpMessagesBrokerAgent;

  constructor(logger: ILoggerAgent, handlers: HandlersForInternal, popUpMessageBroker: PopUpMessagesBrokerAgent) {
    super(logger);
    this.Handlers = handlers;
    this.PopUpMsgBroker = popUpMessageBroker;
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

  async TriggerPingEventAsync(): Promise<void> {
    this.Logger.FuncStart(this.TriggerPingEventAsync.name);

    try {
      let stateOPopUp: IStateOfPopUp = this.Handlers.GetStateOfPopUp(MsgFlag.Ping);
      this.PopUpMsgBroker.SendCommandToContentImprovedAsync(stateOPopUp)
    } catch (err) {
      throw (this.TriggerPingEventAsync.name + ' | ' + err);
    }

    this.Logger.FuncEnd(this.TriggerPingEventAsync.name);
  }

  private BuildMenuCommandParamsBucket(): IMenuCommandDefinitionBucket {
    let toReturn: IMenuCommandDefinitionBucket =
    {
      MenuCommandParamsAr: [
        {
          MenuCommandKey: MenuCommandKey.CloseWindow,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnWindowClose,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.Icons.CloseWindow,
          InnerText: "",
          VisibilityControllers: [],
          ModuleKey: ModuleKey.ButtonClose,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqClosePopUpWindow,
            CommandTYpe: CommandType.PopUp,
          }
        },

        {
          MenuCommandKey: MenuCommandKey.AddCeTab,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnAddContentEditor,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.Icons.AddContentEditorTab,
          InnerText: "Add CE Tab to DT",
          VisibilityControllers: [VisibilityType.Desktop],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqAddCETab,
            CommandTYpe: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.GoScModeEdit,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnModeEdit,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.ScModeEdit,
          InnerText: "Edit",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqSetScModeEdit,
            CommandTYpe: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.ScModeNormal,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnModeNorm,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.ScModeNormal,
          InnerText: "Normal",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqSetScModeNormal,
            CommandTYpe: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.ScModePrev,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnModePrev,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.ScModePrev,
          InnerText: "Preview",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor, VisibilityType.Edit],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqSetScModePreview,
            CommandTYpe: CommandType.Content,
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
          ModuleKey: ModuleKey.ButtonWithInput,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqUpdateNickName,
            CommandTYpe: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.PresentationDetails,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnPresentationDetails,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.PresentationDetails,
          InnerText: "Presentation Details",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqOpenPresentationDetails,
            CommandTYpe: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.CompactScUi,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnCompactScUi,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.CompactCe,
          InnerText: "Toggle Compact Css",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqToggleCompactCss,
            CommandTYpe: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.PutAdminB,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnAdminB,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.AdminB,
          InnerText: "Admin B",
          VisibilityControllers: [VisibilityType.LoginPage],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqAdminB,
            CommandTYpe: CommandType.Content,
          }
        },

        {
          MenuCommandKey: MenuCommandKey.GoContentEditor,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnGoContentEditor,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.GoContentEditor,
          InnerText: "Content Editor",
          VisibilityControllers: [VisibilityType.NotLogin],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqOpenCE,
            CommandTYpe: CommandType.Content,
          }
        },

        {
          MenuCommandKey: MenuCommandKey.QuickPublish,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnQuickPublish,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.QuickPublish,
          InnerText: "Quick Publish",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqQuickPublish,
            CommandTYpe: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.GoDesktop,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.Desktop,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.GoDesktop,
          InnerText: "Desktop",
          VisibilityControllers: [VisibilityType.NotLogin],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqGoDesktop,
            CommandTYpe: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.Ping,
          PlaceHolderSelector: null,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.Ping,
          InnerText: "",
          VisibilityControllers: [],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: null,
            MsgFlag: MsgFlag.Ping,
            CommandTYpe: CommandType.Content,
          }
        },
        // ------ hind site
        {
          MenuCommandKey: MenuCommandKey.TakeSnapShot,
          PlaceHolderSelector: PopConst.Const.Selector.HS.TakeSnapshot,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.TakeSnapShot,
          InnerText: "Take Snapshot",
          VisibilityControllers: [VisibilityType.SnapShotable],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,

            MsgFlag: MsgFlag.ReqTakeSnapShot,
            CommandTYpe: CommandType.Content,
          }
        },

        {
          MenuCommandKey: MenuCommandKey.ToggleFavorite,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ToggleFavorite,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.ToggleFavorite,
          InnerText: "Toggle as Favorite",
          VisibilityControllers: [VisibilityType.SnapShotSelected],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,

            MsgFlag: MsgFlag.ReqToggleFavorite,
            CommandTYpe: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.Cancel,
          PlaceHolderSelector: PopConst.Const.Selector.HS.HsCancel,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.Cancel,
          InnerText: "Cancel",
          VisibilityControllers: [], //todo - put back [VisibilityType.CommandIsRunning],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.CancelCommand,
            CommandTYpe: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.Remove,
          PlaceHolderSelector: PopConst.Const.Selector.HS.HsRemoveFromStorage,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.RemoveFromStorage,
          InnerText: "Delete Snapshot",
          VisibilityControllers: [VisibilityType.SnapShotSelected],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqRemoveFromStorage,
            CommandTYpe: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.RestoreStateTBDTab,
          PlaceHolderSelector: PopConst.Const.Selector.HS.SelStateSnapShot,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.RestoreStateTBD,
          VisibilityControllers: [],//[VisibilityType.SnapShotSelected],
          InnerText: "Restore to TBD",
          ModuleKey: ModuleKey.SelectSnapShot,
          EventHandlerData: {
            Event: CommandButtonEvents.OnDoubleClick,
            MsgFlag: MsgFlag.ReqSetStateOfSitecoreNewWindow,
            CommandTYpe: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.RestoreStateSameTab,
          PlaceHolderSelector: PopConst.Const.Selector.HS.HsRestoreWindowStateSameTab,
          VisibilityControllers: [VisibilityType.SnapShotSelected],
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.RestoreSameTab,
          InnerText: "Restore to this tab",
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqSetStateOfSitecoreSameWindow,
            CommandTYpe: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.RestoreStateNewTab,
          PlaceHolderSelector: PopConst.Const.Selector.HS.HsRestoreWindowStateNewTab,
          VisibilityControllers: [VisibilityType.SnapShotSelected],
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.RestoreNewTab,
          InnerText: "Restore to new tab",
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: MsgFlag.ReqSetStateOfSitecoreSameWindow,
            CommandTYpe: CommandType.PopUp,
          }
        },
      ]
    }
    return toReturn;
  }
}