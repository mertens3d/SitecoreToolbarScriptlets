import { IDataMenuWindowPrefs } from '../../../Shared/scripts/Interfaces/IDataMenuWindowPrefs';
import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { MsgFromPopUp } from '../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp';
import { MsgFlag } from '../../../Shared/scripts/Enums/MessageFlag';
import { IsScMode } from '../../../Shared/scripts/Interfaces/IscMode';
import { PayloadDataFromPopUp } from '../../../Shared/scripts/Classes/PayloadDataReqPopUp';
import { ExternalEvents } from '../Classes/ExternalEvents';
import { InternalEvents } from '../Classes/InternalEvents';

export class EventManager extends PopUpManagerBase {
  ExternalCall: ExternalEvents;
  InternalCall: InternalEvents;

  constructor(popHub: PopUpHub) {
    super(popHub);
    this.ExternalCall = new ExternalEvents(popHub);
    this.InternalCall = new InternalEvents(popHub);
  }

  Init() {
    this.__wireMenuButtons();
  }

  private __wireMenuButtons() {
    this.debug().FuncStart(this.__wireMenuButtons.name);

    this.UiMan().AssignDblClickEvent(this.PopConst().Selector.HS.SelStateSnapShot, (evt) => { this.ExternalCall.HndlrSnapShotRestore(evt); });
    this.UiMan().AssignDblClickEvent(this.PopConst().Selector.HS.TaDebug, () => { this.InternalCall.__cleardebugTextWithConfirm(); });

    this.UiMan().AssignOnChangeEvent(this.PopConst().Selector.HS.SelStateSnapShot, (evt) => { this.InternalCall.HndlrSelectChange(evt) });

    //this.UiMan().AssignMenuWindowChanged((evt) => { this.__hndlrMenuWindowChanged(); });

    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.AdminB, () => { this.ExternalCall.HndlrAdminB() });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.Cancel, (evt) => { this.ExternalCall.__hndlrCancelOperation(evt); });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.CE, () => { this.ExternalCall.__hndlrOpenCE(); });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.Desktop, (evt) => { this.ExternalCall.__hndlrDesktop(evt); });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.DrawStorage, (evt) => this.ExternalCall.__DrawStorage(evt));
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.ModeEdit, (evt) => this.ExternalCall.__hndlrSetScMode(this.PopConst().ScMode.edit, evt));
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.ModeNorm, (evt) => this.ExternalCall.__hndlrSetScMode(this.PopConst().ScMode.normal, evt));
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.ModePrev, (evt) => this.ExternalCall.__hndlrSetScMode(this.PopConst().ScMode.preview, evt));
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.QuickPublish, (evt) => { this.ExternalCall.__hndlrQuickPublish(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.RemoveFromStorage, (evt) => this.ExternalCall.HndlrSnapShotRemove(evt));
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.RestoreWindowState, (evt) => { this.ExternalCall.HndlrSnapShotRestore(evt); });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.SaveWindowState, (evt) => { this.ExternalCall.__hndlrSnapShotCreate(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.UpdateNicknameB, () => this.ExternalCall.HndlrSnapShotUpdateNickName());

    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.BigRed, () => this.ExternalCall.__hndlrAddCETab);

    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndDebug, (evt) => { this.InternalCall.__toggleAccordian(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndForeSite, (evt) => { this.InternalCall.__toggleAccordian(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndHindSite, (evt) => { this.InternalCall.__toggleAccordian(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndInSite, (evt) => { this.InternalCall.__toggleAccordian(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndSettings, (evt) => { this.InternalCall.__toggleAccordian(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndState, (evt) => { this.InternalCall.__toggleAccordian(evt) });

    this.UiMan().AssignOnClickEvent(this.PopConst().Selector.HS.iCBoxdSettingsShowDebugData, (evt) => { this.InternalCall.__showDebugButtonClicked(evt) });

    this.debug().FuncEnd(this.__wireMenuButtons.name);
  }
}