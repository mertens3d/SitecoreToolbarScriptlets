import { Hub } from '../Managers/Hub';
import { ManagerBase } from '../_first/_ManagerBase';
import { scWindowType } from '../Enums/scWindowType';
import { IDataBrowserWindow } from '../Interfaces/IDataBrowserWindow';
import { IscMode } from '../Interfaces/IscMode';
import { scMode } from '../Enums/scMode';
import { IDataMenuWindowPrefs } from '../Interfaces/IDataMenuWindowPrefs';

export class EventManager extends ManagerBase {
  constructor(xyyz: Hub) {
    super(xyyz);
  }

  Init() {
    this.__wireMenuButtons();
  }

  private __wireMenuButtons() {
    this.debug().FuncStart(EventManager.name + ' ' + this.__wireMenuButtons.name);

    this.ScUiMan().AssignDblClickEvent(this.Const().ElemId.Hs.SelStateSnapShot, (evt) => { this.__hndlrRestoreClick(evt); });
    this.ScUiMan().AssignDblClickEvent(this.Const().ElemId.Hs.TaDebug, () => { this.__cleardebugTextWithConfirm(); });

    this.ScUiMan().AssignOnChangeEvent(this.Const().ElemId.Hs.SelStateSnapShot, (evt) => { this.Xyyz.UiMan.SelectChanged(); });

    this.ScUiMan().AssignMenuWindowChanged((evt) => { this.__hndlrMenuWindowChanged(); });

    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.BtnAdminB, () => { this.__handlrB() });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.BtnCancel, (evt) => { this.__hndlrCancelOperation(evt); });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.BtnCE, () => { this.__hndlrOpenCE(); });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.BtnDesktop, (evt) => { this.__hndlrDesktop(evt); });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.BtnDrawStorage, this.AtticMan().DrawStorage);
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.BtnModeEdit, (evt) => this.__hndlrSetScMode(this.Const().ScMode.edit, evt));
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.BtnModeNorm, (evt) => this.__hndlrSetScMode(this.Const().ScMode.normal, evt));
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.BtnModePrev, (evt) => this.__hndlrSetScMode(this.Const().ScMode.preview, evt));
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.BtnQuickPublish, (evt) => { this.__hndlrQuickPublish(evt) });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.BtnRemoveFromStorage, this.AtticMan().RemoveOneFromStorage);
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.BtnRestoreWindowState, (evt) => { this.__hndlrRestoreClick(evt); });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.BtnSaveWindowState, this.__hndlrTakeSnapShot);
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.btnUpdateNicknameB, () => this.__updateNickName());
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.HsBtnBigRed, this.__hndlrAddCETab);
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.LgndDebug, (evt) => { this.__toggleAccordian(evt) });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.LgndForeSite, (evt) => { this.__toggleAccordian(evt) });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.LgndHindSite, (evt) => { this.__toggleAccordian(evt) });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.LgndInSite, (evt) => { this.__toggleAccordian(evt) });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.Hs.LgndSettings, (evt) => { this.__toggleAccordian(evt) });

    this.debug().FuncEnd(this.__wireMenuButtons.name);
  }

  private async __hndlrSetScMode(newMode: IscMode, evt: MouseEvent) {
    this.__initNewOperation();
    await this.locMan().SetScMode(newMode, evt.ctrlKey)
      .then(() => this.UiMan().NotifyComplete());
  }

  private __updateNickName() {
    var self = this.Xyyz.AtticMan;
    this.Xyyz.AtticMan.UpdateNickname(self);
  }

  private __cleardebugTextWithConfirm() {
    this.Xyyz.debug.HndlrClearDebugText(this.debug(), true);
  }

  private __cleardebugText() {
    this.Xyyz.debug.HndlrClearDebugText(this.debug());
  }

  private __toggleAccordian(evt: MouseEvent) {
    this.debug().FuncStart(this.__toggleAccordian.name);

    var srcElem: HTMLElement = <HTMLElement>(evt.target || evt.srcElement);
    var foundContentSib = this.UiMan().GetAccordianContentElem(srcElem);

    if (foundContentSib) {
      var isCollapsed = foundContentSib.classList.contains(this.Const().ClassNames.HS.Collapsed);

      var newVal = !isCollapsed;
      this.UiMan().SetAccordianClass(foundContentSib, newVal)

      this.AtticMan().UpdateAccodianState(srcElem.getAttribute('id'), newVal);
    } else {
      this.debug().Error(this.__toggleAccordian.name, 'did not find sib');
    }
    this.debug().FuncEnd(this.__toggleAccordian.name);
  }

  private __handlrB() {
    this.locMan().AdminB(this.PageDataMan().TopLevelWindow().DataDocSelf, null);
  }

  private __hndlrMenuWindowChanged() {
    var menuData: IDataMenuWindowPrefs = {
      MenuX: (window.screenX || window.screenLeft || 0),
      MenuY: (window.screenY || window.screenTop || 0),
      MenuHeight: window.innerHeight,
      MenuWidth: window.innerWidth,
    }

    this.AtticMan().UpdateMenuCoords(menuData);
  }

  private __hndlrDesktop(evt: MouseEvent) {
    this.__initNewOperation();
    this.locMan().ChangeLocationSwitchBoard(scWindowType.Desktop, this.PageDataMan().TopLevelWindow());
  }

  private __hndlrCancelOperation(evt: MouseEvent) {
    this.UiMan().SetCancelFlag();
  }

  private async __hndlrQuickPublish(evt: MouseEvent) {
    this.__initNewOperation();
    var targetWin = this.PageDataMan().TopLevelWindow();
    await this.OneWinMan().PublishActiveCE(targetWin)
      .then(() => {
        this.UiMan().NotifyComplete(null,  this.Const().Notify.PublishComplete);
      })
  }

  private __hndlrTakeSnapShot() {
    this.__initNewOperation();
    this.Xyyz.OneWindowMan.SaveWindowState(this.PageDataMan().TopLevelWindow());
  }

  private async __hndlrAddCETab() {
    this.__initNewOperation();
    await this.PromiseGen().RaceWaitAndClick(this.Const().Selector.SC.scStartButton, this.PageDataMan().TopLevelWindow().DataDocSelf)
      .then(() => { this.PromiseGen().WaitForThenClick(this.Const().Selector.SC.StartMenuLeftOption, this.PageDataMan().TopLevelWindow().DataDocSelf) });

    //this.UiMan().NotifyComplete();
  }

  private __hndlrOpenCE() {
    this.__initNewOperation();
    this.locMan().ChangeLocationSwitchBoard(scWindowType.ContentEditor, this.PageDataMan().TopLevelWindow());
  }

  private __initNewOperation() {
    this.__cleardebugText();
    this.UiMan().ClearCancelFlag();
  }

  private async __hndlrRestoreClick(evt: MouseEvent) {
    this.debug().FuncStart(this.__hndlrRestoreClick.name);
    this.__initNewOperation();

    try {
      var idOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();

      this.debug().MarkerA();
      var dataOneWindowStorage = this.AtticMan().GetFromStorageById(idOfSelect);
      this.debug().MarkerB();
      var self = this;

      var targetWindow: IDataBrowserWindow = await this.PageDataMan().GetTargetWindowAsync(evt.ctrlKey ? true : false, dataOneWindowStorage.WindowType);

      if (targetWindow) {
        await self.Xyyz.OneWindowMan.RestoreWindowStateToTarget(targetWindow, dataOneWindowStorage)
          .then(() => { this.UiMan().NotifyComplete(targetWindow); })
          .then(() => {
          });
      } else {
        self.debug().Error(this.__hndlrRestoreClick.name, 'no target window');
      }
    } catch (ex) {
      this.debug().Error(this.__hndlrRestoreClick.name, ex)
    }

    this.debug().FuncEnd(this.__hndlrRestoreClick.name);
  }
}