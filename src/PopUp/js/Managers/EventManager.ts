import { ContentHub } from '../../../jsContent/Managers/ContentHub';
import { ContentManagerBase } from '../../../jsContent/_first/_ContentManagerBase';
import { scWindowType } from '../../../jsContent/Enums/scWindowType';
import { IDataBrowserWindow } from '../../../jsContent/Interfaces/IDataBrowserWindow';
import { IsScMode } from '../../../jsContent/Interfaces/IscMode';
import { scMode } from '../../../JsShared/Enum/scMode';
import { IDataMenuWindowPrefs } from '../Interfaces/IDataMenuWindowPrefs';
import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from '../PopUpHub';
import { MsgFlag } from '../../../JsShared/Enum/MessageFlag';
import { MsgFromPopUp } from '../../../JsShared/Classes/MsgPayloadRequestFromPopUp';
import { PayloadDataFromPopUp } from '../../../JsShared/Classes/PayloadDataReqPopUp';

export class EventManager extends PopUpManagerBase {
  constructor(popHub: PopUpHub) {
    super(popHub);
  }

  Init() {
    this.__wireMenuButtons();
  }

  private __wireMenuButtons() {
    this.debug().FuncStart(this.__wireMenuButtons.name);

    this.UiMan().AssignDblClickEvent(this.PopConst().ElemId.HS.SelStateSnapShot, (evt) => { this.__hndlrRestoreClick(evt); });
    this.UiMan().AssignDblClickEvent(this.PopConst().ElemId.HS.TaDebug, () => { this.__cleardebugTextWithConfirm(); });

    this.UiMan().AssignOnChangeEvent(this.PopConst().ElemId.HS.SelStateSnapShot, (evt) => { this.__hndlrSelectChange(evt) });

    //this.UiMan().AssignMenuWindowChanged((evt) => { this.__hndlrMenuWindowChanged(); });

    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.AdminB, () => { this.__handlrB() });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.Cancel, (evt) => { this.__hndlrCancelOperation(evt); });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.CE, () => { this.__hndlrOpenCE(); });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.Desktop, (evt) => { this.__hndlrDesktop(evt); });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.DrawStorage, (evt) => this.__DrawStorage(evt));
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.ModeEdit, (evt) => this.__hndlrSetScMode(this.PopConst().ScMode.edit, evt));
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.ModeNorm, (evt) => this.__hndlrSetScMode(this.PopConst().ScMode.normal, evt));
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.ModePrev, (evt) => this.__hndlrSetScMode(this.PopConst().ScMode.preview, evt));
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.QuickPublish, (evt) => { this.__hndlrQuickPublish(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.RemoveFromStorage, (evt) => this.__RemoveFromStorage(evt));
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.RestoreWindowState, (evt) => { this.__hndlrRestoreClick(evt); });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.SaveWindowState, (evt) => { this.__hndlrTakeSnapShot(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.UpdateNicknameB, () => this.__updateNickName());

    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.BigRed, () => this.__hndlrAddCETab);

    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndDebug, (evt) => { this.__toggleAccordian(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndForeSite, (evt) => { this.__toggleAccordian(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndHindSite, (evt) => { this.__toggleAccordian(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndInSite, (evt) => { this.__toggleAccordian(evt) });
    this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndSettings, (evt) => { this.__toggleAccordian(evt) });

    this.debug().FuncEnd(this.__wireMenuButtons.name);
  }
  __hndlrSelectChange(evt: any) {
    this.PopHub.UiMan.SelectChanged();
  }
  __RemoveFromStorage(evt: any) {
    this.MsgMan().SendMessage(new MsgFromPopUp(MsgFlag.RemoveFromStorage));
  }
  __DrawStorage(evt: any) {
    this.MsgMan().FromAtticDrawStorage();
  }

  private async __hndlrSetScMode(newMode: IsScMode, evt: MouseEvent) {
    this.__initNewOperation();

    var payload = new MsgFromPopUp(MsgFlag.SetScMode);
    payload.Data = new PayloadDataFromPopUp();
    payload.Data.ReqScMode = newMode;
    payload.Data.UseOriginalWindowLocation = evt.ctrlKey;

    this.MsgMan().SendMessage(payload);
  }

  private __updateNickName() {
    var self = this.PopAtticMan;
    var payload = new MsgFromPopUp(MsgFlag.UpdateNickName);
    payload.Data.idOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();
    payload.Data.NewNickname = this.UiMan().GetValueInNickname();;
    this.MsgMan().SendMessage(payload);
  }

  private __cleardebugTextWithConfirm() {
    this.debug().HndlrClearDebugText(this.debug(), true);
  }

  private __cleardebugText() {
    this.debug().HndlrClearDebugText(this.debug());
  }

  private __toggleAccordian(evt: MouseEvent) {
    this.debug().FuncStart(this.__toggleAccordian.name);

    var srcElem: HTMLElement = <HTMLElement>(evt.target || evt.srcElement);
    var foundContentSib = this.UiMan().GetAccordianContentElem(srcElem);

    if (foundContentSib) {
      var isCollapsed = foundContentSib.classList.contains(this.PopConst().ClassNames.HS.Collapsed);

      var newVal = !isCollapsed;
      this.UiMan().SetAccordianClass(foundContentSib, newVal)

      this.PopAtticMan().UpdateAccodianState(srcElem.getAttribute('id'), newVal);
    } else {
      this.debug().Error(this.__toggleAccordian.name, 'did not find sib');
    }
    this.debug().FuncEnd(this.__toggleAccordian.name);
  }

  private __handlrB() {
    this.MsgMan().SendMessage(new MsgFromPopUp(MsgFlag.AdminB))
  }

  private __hndlrMenuWindowChanged() {
    var menuData: IDataMenuWindowPrefs = {
      MenuX: (window.screenX || window.screenLeft || 0),
      MenuY: (window.screenY || window.screenTop || 0),
      MenuHeight: window.outerHeight,
      MenuWidth: window.outerWidth,
    }

    this.PopAtticMan().UpdateMenuCoords(menuData);

    this.__verifyMatchingTab();
  }

  private __verifyMatchingTab() {
    //this.UiMan().VerifyTabMatch();
  }

  private __hndlrDesktop(evt: MouseEvent) {
    this.__initNewOperation();
    this.MsgMan().SendMessage(new MsgFromPopUp(MsgFlag.GoDesktop))
  }

  private __hndlrCancelOperation(evt: MouseEvent) {
    this.UiMan().SetCancelFlag();
  }

  private async __hndlrQuickPublish(evt: MouseEvent) {
    this.__initNewOperation();
    this.MsgMan().SendMessage(new MsgFromPopUp(MsgFlag.QuickPublish))

    this.MsgMan().SendMessage(new MsgFromPopUp(MsgFlag.TaskSuccessful));

    
  }

  private async __hndlrTakeSnapShot(evt: MouseEvent) {
    this.__initNewOperation();
    this.MsgMan().SendMessage(new MsgFromPopUp(MsgFlag.TakeSnapShot));
  }

  private async __hndlrAddCETab() {
    this.__initNewOperation();
    this.MsgMan().SendMessage(new MsgFromPopUp(MsgFlag.AddCETab));
  }

  private async __hndlrOpenCE() {
    this.__initNewOperation();
    this.MsgMan().SendMessage(new MsgFromPopUp(MsgFlag.OpenCE));
  }

  private __initNewOperation() {
    this.__cleardebugText();
    this.UiMan().ClearCancelFlag();
  }

  private async __hndlrRestoreClick(evt: MouseEvent) {
    this.debug().FuncStart(this.__hndlrRestoreClick.name);
    this.__initNewOperation();

    var payload = new MsgFromPopUp(MsgFlag.AddCETab);
    payload.Data.idOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();

    this.MsgMan().SendMessage(payload);

    this.debug().FuncEnd(this.__hndlrRestoreClick.name);
  }
}