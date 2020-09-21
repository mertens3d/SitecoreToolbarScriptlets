import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { MenuCommandKey } from '../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { scMode } from '../../../Shared/scripts/Enums/scMode';
import { VisibilityType } from '../../../Shared/scripts/Enums/VisibilityType';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { CommandButtonEvents } from '../../../Shared/scripts/Enums/CommandButtonEvents';
import { Handlers } from '../Managers/Handlers';
import { PopConst } from './PopConst';
import { IMenuCommandDefinitionBucket } from '../../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket';
import { IMenuCommandDefinition } from "../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { ModuleKey } from '../../../Shared/scripts/Enums/ModuleKey';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { MsgFlag } from '../../../Shared/scripts/Enums/1xxx-MessageFlag';
import { PopUpMessagesBrokerAgent } from '../Agents/PopUpMessagesBrokerAgent';
import { IStateOfPopUp } from '../../../Shared/scripts/Interfaces/IMsgPayload';

export class CommandManager extends LoggableBase {
  public MenuCommandParamsBucket: IMenuCommandDefinitionBucket;
  private Handlers: Handlers;
  private PopUpMsgBroker: PopUpMessagesBrokerAgent;

  constructor(logger: ILoggerAgent, handlers: Handlers, popUpMessageBroker: PopUpMessagesBrokerAgent) {
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
      let stateOPopUp: IStateOfPopUp = this.Handlers.External.GetStateOfPopUp(MsgFlag.Ping);
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
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.CloseWindow,
          InnerText: "",
          VisibilityControllers: [],
          ModuleKey: ModuleKey.ButtonClose,
          EventHandlerData: {
            Handler: this.Handlers.Internal.CloseWindow,
            Event: CommandButtonEvents.OnSingleClick,
            ParameterData: [],
            MsgFlag: MsgFlag.ReqClosePopUpWindow,
          }
        },

        {
          MenuCommandKey: MenuCommandKey.AddCeTab,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnAddContentEditor,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.AddCeTab,
          InnerText: "Add CE Tab to DT",
          VisibilityControllers: [VisibilityType.Desktop],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.External.AddCETab,
            ParameterData: [],
            MsgFlag: MsgFlag.ReqAddCETab,
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
            Handler: this.Handlers.Internal.SetScModeInternal,
            ParameterData: [scMode.Edit],
            MsgFlag: MsgFlag.ReqSetScMode,
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
            Handler: this.Handlers.Internal.SetScModeInternal,
            ParameterData: [scMode.Normal],
            MsgFlag: MsgFlag.ReqSetScMode,
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
            Handler: this.Handlers.Internal.SetScModeInternal,
            ParameterData: [scMode.Preview],
            MsgFlag: MsgFlag.ReqSetScMode,
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
            Handler: this.Handlers.External.HandlerForSnapShotUpdateNickName,
            ParameterData: [],
            MsgFlag: MsgFlag.ReqUpdateNickName,
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
            Handler: this.Handlers.External.HandlerForPresentationDetails,
            ParameterData: [],
            MsgFlag: MsgFlag.ReqOpenPresentationDetails,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.CompactCE,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModulePlaceHolders.BtnCompactScUi,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.CompactCe,
          InnerText: "Compact CE",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            Handler: this.Handlers.External.HandlerForCompactCE,
            ParameterData: [],
            MsgFlag: MsgFlag.ReqToggleCompactCss,
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
            Handler: this.Handlers.External.PutAdminB,
            ParameterData: [],
            MsgFlag: MsgFlag.ReqAdminB,
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
            Handler: this.Handlers.Internal.GoCeInternal,
            ParameterData: [],
            MsgFlag: MsgFlag.ReqOpenCE,
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
            Handler: this.Handlers.External.QuickPublish,
            ParameterData: [],
            MsgFlag: MsgFlag.ReqQuickPublish,
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
            Handler: this.Handlers.Internal.GoDesktopInternal,
            ParameterData: [],
            MsgFlag: MsgFlag.ReqGoDesktop,
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
            Handler: this.Handlers.External.HandlerForPing,
            ParameterData: [],
            MsgFlag: MsgFlag.Ping,
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
            Handler: this.Handlers.External.HandlerForSnapShotCreate,
            ParameterData: [],
            MsgFlag: MsgFlag.ReqTakeSnapShot,
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
            Handler: this.Handlers.External.HandlerForToggleFavorite,
            Event: CommandButtonEvents.OnSingleClick,
            ParameterData: [],
            MsgFlag: MsgFlag.ToggleFavorite,
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
            Handler: this.Handlers.External.HandlerForCancelOperation,
            ParameterData: [],
            MsgFlag: MsgFlag.CancelCommand,
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
            Handler: this.Handlers.External.HandlerForSnapShotRemove,
            ParameterData: [],
            MsgFlag: MsgFlag.ReqRemoveFromStorage,
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
            Handler: this.Handlers.External.HandlerForSnapShotRestoreTBDTab,
            ParameterData: [],
            MsgFlag: MsgFlag.ReqSetStateOfSitecoreWindow,
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
            Handler: null,//this.Handlers.External.HandlerForSnapShotRestoreSameTab,
            ParameterData: [],
            MsgFlag: MsgFlag.ReqSetStateOfSitecoreWindow,
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
            Handler: this.Handlers.External.HandlerForSnapShotRestoreNewTab,
            ParameterData: [],
            MsgFlag: MsgFlag.ReqSetStateOfSitecoreWindow,
          }
        },
      ]
    }
    return toReturn;
  }
}