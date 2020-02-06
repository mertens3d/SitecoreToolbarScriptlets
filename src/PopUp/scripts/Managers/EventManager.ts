import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { MsgFromPopUp } from '../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { IsScMode } from '../../../Shared/scripts/Interfaces/IscMode';
import { PayloadDataFromPopUp } from '../../../Shared/scripts/Classes/PayloadDataReqPopUp';
import { ExternalEvents } from '../Classes/ExternalEvents';
import { InternalEvents } from '../Classes/InternalEvents';
import { IOneCommand } from '../../../Shared/scripts/Interfaces/IOneCommand';
import { MenuCommand } from '../../../Shared/scripts/Enums/MenuCommand';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';

export class EventManager extends PopUpManagerBase {
  ExternalCall: ExternalEvents;
  InternalCall: InternalEvents;
  AllMenuCommands: IOneCommand[];

  constructor(popHub: PopUpHub) {
    super(popHub);
    this.ExternalCall = new ExternalEvents(popHub);
    this.InternalCall = new InternalEvents(popHub);
  }

  Init() {
    this.BuildAllCommands();
    this.__wireMenuButtons();
  }

  BuildAllCommands() {
    this.debug().FuncStart(this.BuildAllCommands.name);
    this.AllMenuCommands = [
      {
        Command: MenuCommand.CloseWindow,
        ButtonSelector: this.PopConst().Selector.Btn.WindowClose,
        RequiredPageTypes: []
      },


      {
        Command: MenuCommand.Edit,
        ButtonSelector: this.PopConst().ElemId.HS.Btn.ModeEdit,
        RequiredPageTypes: [scWindowType.ContentEditor, scWindowType.Desktop, scWindowType.Normal, scWindowType.Preview]
      },
      {
        Command: MenuCommand.MarkFavorite,
        ButtonSelector: this.PopConst().ElemId.HS.Btn.MarkFavorite,
        RequiredPageTypes: []
      }

    ]
    this.debug().FuncEnd(this.BuildAllCommands.name);
  }

  private __wireMenuButtons() {
    this.debug().FuncStart(this.__wireMenuButtons.name);

    this.UiMan().AssignDblClickEvent(this.PopConst().Selector.HS.SelStateSnapShot, (evt) => { this.ExternalCall.HndlrSnapShotRestore(evt); });
    this.UiMan().AssignDblClickEvent(this.PopConst().Selector.HS.TaDebug, () => { this.InternalCall.__cleardebugTextWithConfirm(); });

    this.UiMan().AssignOnChangeEvent(this.PopConst().Selector.HS.SelStateSnapShot, (evt) => { this.InternalCall.HndlrSelectChange(evt) });

    //this.UiMan().AssignMenuWindowChanged((evt) => { this.__hndlrMenuWindowChanged(); });


    // ------------- Header

    this.UiMan().AssignOnClickEventFromCmd(this.GetCommandByKey(MenuCommand.CloseWindow), (evt) => this.InternalCall.CloseWindow(evt));


    // ------------- Foresite

    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.AdminB, () => { this.ExternalCall.HndlrAdminB() });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.CE, () => { this.ExternalCall.__hndlrOpenCE(); });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.Desktop, (evt) => { this.ExternalCall.__hndlrDesktop(evt); });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.ModeNorm, (evt) => this.ExternalCall.__hndlrSetScMode(this.PopConst().ScMode.normal, evt));
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.ModePrev, (evt) => this.ExternalCall.__hndlrSetScMode(this.PopConst().ScMode.preview, evt));
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.QuickPublish, (evt) => { this.ExternalCall.__hndlrQuickPublish(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.UpdateNicknameB, () => this.ExternalCall.HndlrSnapShotUpdateNickName());

    this.UiMan().AssignOnClickEventFromCmd(this.GetCommandByKey(MenuCommand.Edit), (evt) => this.ExternalCall.__hndlrSetScMode(this.PopConst().ScMode.edit, evt));

    // --------------- hindsite

    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.HsCancel, (evt) => { this.ExternalCall.__hndlrCancelOperation(evt); });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.HsDrawStorage, (evt) => this.ExternalCall.__DrawStorage(evt));
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.HsRemoveFromStorage, (evt) => this.ExternalCall.HndlrSnapShotRemove(evt));
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.HsRestoreWindowState, (evt) => { this.ExternalCall.HndlrSnapShotRestore(evt); });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.HsSaveWindowState, (evt) => { this.ExternalCall.__hndlrSnapShotCreate(evt) });

    this.UiMan().AssignOnClickEventFromCmd(this.GetCommandByKey(MenuCommand.MarkFavorite), (evt) => this.ExternalCall.MarkFavorite(evt));








    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.BigRed, () => this.ExternalCall.__hndlrAddCETab);


    // --------------- fieldsets

    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndDebug, (evt) => { this.InternalCall.__toggleAccordian(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndForeSite, (evt) => { this.InternalCall.__toggleAccordian(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndHindSite, (evt) => { this.InternalCall.__toggleAccordian(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndInSite, (evt) => { this.InternalCall.__toggleAccordian(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndSettings, (evt) => { this.InternalCall.__toggleAccordian(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndState, (evt) => { this.InternalCall.__toggleAccordian(evt) });

    this.UiMan().AssignOnClickEvent(this.PopConst().Selector.HS.iCBoxdSettingsShowDebugData, (evt) => { this.InternalCall.__showDebugButtonClicked(evt) });

    this.debug().FuncEnd(this.__wireMenuButtons.name);
  }
  GetCommandByKey(menuCommand: MenuCommand): IOneCommand {
    var toReturn: IOneCommand;

    for (var idx = 0; idx < this.AllMenuCommands.length; idx++) {
      var candidate = this.AllMenuCommands[idx];
      if (candidate.Command === menuCommand) {
        toReturn = candidate;
        this.debug().LogVal('Command', MenuCommand[toReturn.Command]);
        break;
      }
    }
    if (!toReturn) {
      this.debug().Error(this.GetCommandByKey.name, 'matching command not found ' + MenuCommand[ menuCommand]);
    }
    return toReturn;
  }
}