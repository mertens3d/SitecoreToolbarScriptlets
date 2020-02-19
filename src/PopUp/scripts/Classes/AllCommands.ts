import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { MenuCommand } from '../../../Shared/scripts/Enums/MenuCommand';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { PopConst } from './PopConst';
import { PopUpHub } from '../Managers/PopUpHub';
import { CommandButtonEvents } from '../../../Shared/scripts/Interfaces/CommandButtonEvents';
import { Handlers } from '../Managers/Handlers';
import { SharedConst } from '../../../Shared/scripts/SharedConst';
import { scMode } from '../../../Shared/scripts/Enums/scMode';
export class AllCommands {
  static BuildAllCommands(popHub: PopUpHub, handlers: Handlers) {
    let toReturn: IOneCommand[] = [
      {
        Command: MenuCommand.CloseWindow,
        ButtonSelector: PopConst.Const.Selector.Btn.WindowClose,
        RequiredPageTypes: [],
        Events: [{
          Handler: handlers.Internal.CloseWindow,
          Event: CommandButtonEvents.OnClick,
          ParameterData: [],
        }]
      },
      
      
      {
        Command: MenuCommand.AddCeTab,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.BigRed,
        RequiredPageTypes: [scWindowType.Desktop],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.__hndlrAddCETab,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.ScModeEdit,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.ModeEdit,
        RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop, scWindowType.Normal, scWindowType.Preview],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.SetScMode,
          ParameterData: [PopConst.Const.ScMode.edit],
        }]
      },
      {
        Command: MenuCommand.ScModeNormal,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.ModeNorm,
        RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop, scWindowType.Edit, scWindowType.Preview, scWindowType.Normal],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.SetScMode,
          ParameterData: [PopConst.Const.ScMode.normal],
        }]
      },
      {
        Command: MenuCommand.ScModePrev,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.ModePrev,
        RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop, scWindowType.Edit, scWindowType.Preview, scWindowType.Normal],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.SetScMode,
          ParameterData: [PopConst.Const.ScMode.preview],
        }]
      },
      //{
      //  Command: MenuCommand.Edit,
      //  ButtonSelector: PopConst.Const.ElemId.HS.Btn.ModePrev,
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
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.UpdateNicknameB,
        RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.HndlrSnapShotUpdateNickName,
          ParameterData: [],
        }]
      },

      {
        Command: MenuCommand.PutAdminB,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.AdminB,
        RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.PutAdminB,
          ParameterData: [],
        }]
      },


      {
        Command: MenuCommand.GoContentEditor,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.GoCE,
        RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.GoCe,
          ParameterData: [],
        }]
      },



      {
        Command: MenuCommand.QuickPublish,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.QuickPublish,
        RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.QuickPublish,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.GoDesktop,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.Desktop,
        RequiredPageTypes: [],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.GoDesktop,
          ParameterData: [],
        }]
      },
      // ------ hind site
      {
        Command: MenuCommand.TakeSnapShot,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.TakeSnapshot,
        RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop, scWindowType.Edit, scWindowType.Preview, scWindowType.Normal],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.HndlrSnapShotCreate,
          ParameterData: [],
        }]
      },
     
      {
        Command: MenuCommand.MarkFavorite,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.MarkFavorite,
        RequiredPageTypes: [],
        Events: [{
          Handler: popHub.EventMan.Handlers.External.MarkFavorite,
          Event: null,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.Cancel,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.HsCancel,
        RequiredPageTypes: [],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.__hndlrCancelOperation,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.Remove,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.HsRemoveFromStorage,
        RequiredPageTypes: [],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.HndlrSnapShotRemove,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.RestoreState,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.HsRestoreWindowState,
        RequiredPageTypes: [],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.HndlrSnapShotRestore,
          ParameterData: [],
        }]
      },


      //------------ insite
      {
        Command: MenuCommand.DrawStorage,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.HsDrawStorage,
        RequiredPageTypes: [],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.__DrawStorage,
          ParameterData: [],
        }]
      },

      /*
       
      {
        Command: null,
        ButtonSelector: null,
        RequiredPageTypes: null,
        Events: [{
          Handler: null,
          Event: null,
        }]
      },

       */

    ];

    return toReturn;
  }
}