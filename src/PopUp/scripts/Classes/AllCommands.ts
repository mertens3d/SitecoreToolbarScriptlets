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
        Command: MenuCommand.MarkFavorite,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.MarkFavorite,
        RequiredPageTypes: [],
        Events: [{
          Handler: null,
          Event: null,
          ParameterData: [],
        }]
      },
      {
        Command: MenuCommand.TakeSnapShot,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.HsSaveWindowState,
        RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop],
        Events: [{
          Handler: null,
          Event: null,
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
          Handler: popHub.EventMan.Handlers.External.__hndlrSetScMode,
          ParameterData: [PopConst.Const.ScMode.edit],
        }]
      },
      {
        Command: MenuCommand.ScModeNormal,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.ModeNorm,
        RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop, scWindowType.Edit, scWindowType.Preview, scWindowType.Normal],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.__hndlrSetScMode,
          ParameterData: [PopConst.Const.ScMode.normal],
        }]
      },
      {
        Command: MenuCommand.ScModePrev,
        ButtonSelector: PopConst.Const.ElemId.HS.Btn.ModePrev,
        RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop, scWindowType.Edit, scWindowType.Preview, scWindowType.Normal],
        Events: [{
          Event: CommandButtonEvents.OnClick,
          Handler: popHub.EventMan.Handlers.External.__hndlrSetScMode,
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



      //this.UiMan().AssignOnClickEventFromCmd(this.GetCommandByKey(MenuCommand.Edit), (evt) => this.Handlers.External.__hndlrSetScMode(PopConst.Const.ScMode.edit, evt, this.PopHub));

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