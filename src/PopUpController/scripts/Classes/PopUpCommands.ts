import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";
import { ReqCommandMsgFlag } from '../../../Shared/scripts/Enums/10 - MessageFlag';
import { CommandType } from "../../../Shared/scripts/Enums/CommandType";
import { MenuCommandKey } from '../../../Shared/scripts/Enums/20 - MenuCommand';
import { CommandButtonEvents } from '../../../Shared/scripts/Enums/CommandButtonEvents';
import { ModuleKey } from '../../../Shared/scripts/Enums/ModuleKey';
import { VisibilityType } from '../../../Shared/scripts/Enums/VisibilityType';
import { ICommandDefinitionBucket } from '../../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket';
import { PopConst } from '../../../Shared/scripts/Const/PopConst';

export class CommandDefintionFactory extends _FrontBase {
  public BuildMenuCommandParamsBucket(): ICommandDefinitionBucket {
    let toReturn: ICommandDefinitionBucket = {
      MenuCommandParamsAr: [
        {
          MenuCommandKey: MenuCommandKey.CloseWindow,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.BtnWindowClose,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.Icons.CloseWindow,
          InnerText: "",
          VisibilityControllers: [],
          ModuleKey: ModuleKey.ButtonClose,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqClosePopUpWindow,
            CommandType: CommandType.PopUp,
          }
        },

        {
          MenuCommandKey: MenuCommandKey.AddCeTab,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.BtnAddContentEditor,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.Icons.AddContentEditorTab,
          InnerText: "Add CE Tab to DT",
          VisibilityControllers: [VisibilityType.Desktop, VisibilityType.DISABLED],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqAddCETab,
            CommandType: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.GoScModeEdit,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.BtnModeEdit,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.ScModeEdit,
          InnerText: "Edit",
          VisibilityControllers: [VisibilityType.DISABLED,VisibilityType.DesktopOrContentEditor],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqSetScModeEdit,
            CommandType: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.ScModeNormal,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.BtnModeNorm,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.ScModeNormal,
          InnerText: "Normal",
          VisibilityControllers: [VisibilityType.DISABLED,VisibilityType.DesktopOrContentEditor ],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqSetScModeNormal,
            CommandType: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.ScModePrev,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.BtnModePrev,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.ScModePrev,
          InnerText: "Preview",
          VisibilityControllers: [ VisibilityType.DISABLED, VisibilityType.DesktopOrContentEditor, VisibilityType.Edit],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqSetScModePreview,
            CommandType: CommandType.Content,
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
          InnerText: "",
          VisibilityControllers: [VisibilityType.SnapShotSelected],
          ModuleKey: ModuleKey.ButtonWithInput,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqUpdateNickName,
            CommandType: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.PresentationDetails,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.BtnPresentationDetails,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.PresentationDetails,
          InnerText: "Presentation Details",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor, VisibilityType.DISABLED],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqOpenPresentationDetails,
            CommandType: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.CompactScUi,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.BtnCompactScUi,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.CompactCe,
          InnerText: "Toggle Compact Css",
          VisibilityControllers: [VisibilityType.DesktopOrContentEditor, VisibilityType.DISABLED],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqToggleCompactCss,
            CommandType: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.PutAdminB,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.BtnAdminB,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.AdminB,
          InnerText: "Admin B",
          VisibilityControllers: [VisibilityType.DISABLED, VisibilityType.LoginPage, ],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqAdminB,
            CommandType: CommandType.Content,
          }
        },

        {
          MenuCommandKey: MenuCommandKey.GoContentEditor,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.BtnGoContentEditor,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.GoContentEditor,
          InnerText: "Content Editor",
          VisibilityControllers: [VisibilityType.DISABLED, VisibilityType.NotLogin, ],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqOpenCE,
            CommandType: CommandType.Content,
          }
        },

        {
          MenuCommandKey: MenuCommandKey.QuickPublish,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.BtnQuickPublish,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.QuickPublish,
          InnerText: "Quick Publish",
          VisibilityControllers: [VisibilityType.DISABLED, VisibilityType.DesktopOrContentEditor, ],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqQuickPublish,
            CommandType: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.GoDesktop,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.Desktop,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.GoDesktop,
          InnerText: "Desktop",
          VisibilityControllers: [VisibilityType.DISABLED, VisibilityType.NotLogin,],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqGoDesktop,
            CommandType: CommandType.Content,
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
            MsgFlag: ReqCommandMsgFlag.Ping,
            CommandType: CommandType.Content,
          }
        },
        // ------ hind site
        {
          MenuCommandKey: MenuCommandKey.TakeSnapShot,
          PlaceHolderSelector: PopConst.Const.Selector.HS.TakeSnapshot,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.TakeSnapShot,
          InnerText: "Take Snapshot",
          VisibilityControllers: [], //VisibilityType.SnapShotable
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,

            MsgFlag: ReqCommandMsgFlag.ReqTakeSnapShot,
            CommandType: CommandType.Content,
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

            MsgFlag: ReqCommandMsgFlag.ReqToggleFavorite,
            CommandType: CommandType.Content,
          }
        },
        //{
        //  MenuCommandKey: MenuCommandKey.Cancel,
        //  PlaceHolderSelector: PopConst.Const.Selector.HS.HsCancel,
        //  IconClassName: PopConst.Const.ClassNames.HS.Buttons.Cancel,
        //  InnerText: "Cancel",
        //  VisibilityControllers: [],
        //  ModuleKey: ModuleKey.ButtonTypical,
        //  EventHandlerData: {
        //    Event: CommandButtonEvents.OnSingleClick,
        //    MsgFlag: MsgFlag.CancelCommand,
        //    CommandType: CommandType.Content,
        //  }
        //},
        {
          MenuCommandKey: MenuCommandKey.Remove,
          PlaceHolderSelector: PopConst.Const.Selector.HS.HsRemoveFromStorage,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.RemoveFromStorage,
          InnerText: "Delete Snapshot",
          VisibilityControllers: [VisibilityType.SnapShotSelected],
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqRemoveFromStorage,
            CommandType: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.RestoreStateTBDTab,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.SelStateSnapShot,
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.RestoreStateTBD,
          VisibilityControllers: [],
          InnerText: "Restore to TBD",
          ModuleKey: ModuleKey.SelectSnapShot,
          EventHandlerData: {
            Event: CommandButtonEvents.OnDoubleClick,
            MsgFlag: ReqCommandMsgFlag.ReqSetStateOfSitecoreNewWindow,
            CommandType: CommandType.Content,
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
            MsgFlag: ReqCommandMsgFlag.ReqSetStateOfSitecoreSameWindow,
            CommandType: CommandType.Content,
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
            MsgFlag: ReqCommandMsgFlag.ReqSetStateOfSitecoreNewWindow,
            CommandType: CommandType.PopUp,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.DebugForceAutoSnapShot,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.BtnDebugForceAutoSnapShot,
          VisibilityControllers: [VisibilityType.Always],
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.TakeSnapShot,
          InnerText: "Force Auto Snapshot",
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqDebugAutoSnapShot,
            CommandType: CommandType.Content,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.DebugClearPopUpConsole,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.BtnDebugClearPopUpConsole,
          VisibilityControllers: [VisibilityType.Always],
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.RemoveFromStorage,
          InnerText: "Clear PopUp Console",
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqDebugClearConsole,
            CommandType: CommandType.PopUp,
          }
        },
        {
          MenuCommandKey: MenuCommandKey.DebugTriggerPopUpReload,
          PlaceHolderSelector: PopConst.Const.Selector.HS.ModuleContainers.BtnDebugTriggerPopUpReload,
          VisibilityControllers: [VisibilityType.Always],
          IconClassName: PopConst.Const.ClassNames.HS.Buttons.RemoveFromStorage,
          InnerText: "location .reload(true)",
          ModuleKey: ModuleKey.ButtonTypical,
          EventHandlerData: {
            Event: CommandButtonEvents.OnSingleClick,
            MsgFlag: ReqCommandMsgFlag.ReqDebugTriggerReload,
            CommandType: CommandType.PopUp,
          }
        },
      ]
    };
    return toReturn;
  }
}