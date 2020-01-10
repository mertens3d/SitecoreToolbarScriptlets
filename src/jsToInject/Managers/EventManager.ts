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
    this.debug().FuncStart(this.__wireMenuButtons.name);

    this.ScUiMan().AssignDblClickEvent(this.Const().ElemId.HS.SelStateSnapShot, (evt) => { this.__hndlrRestoreClick(evt); });
    this.ScUiMan().AssignDblClickEvent(this.Const().ElemId.HS.TaDebug, () => { this.__cleardebugTextWithConfirm(); });

    this.ScUiMan().AssignOnChangeEvent(this.Const().ElemId.HS.SelStateSnapShot, (evt) => { this.Xyyz.UiMan.SelectChanged(); });

    this.ScUiMan().AssignMenuWindowChanged((evt) => { this.__hndlrMenuWindowChanged(); });

    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.AdminB, () => { this.__handlrB() });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.Cancel, (evt) => { this.__hndlrCancelOperation(evt); });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.CE, () => { this.__hndlrOpenCE(); });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.Desktop, (evt) => { this.__hndlrDesktop(evt); });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.DrawStorage, this.AtticMan().DrawStorage);
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.ModeEdit, (evt) => this.__hndlrSetScMode(this.Const().ScMode.edit, evt));
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.ModeNorm, (evt) => this.__hndlrSetScMode(this.Const().ScMode.normal, evt));
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.ModePrev, (evt) => this.__hndlrSetScMode(this.Const().ScMode.preview, evt));
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.QuickPublish, (evt) => { this.__hndlrQuickPublish(evt) });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.RemoveFromStorage, this.AtticMan().RemoveOneFromStorage);
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.RestoreWindowState, (evt) => { this.__hndlrRestoreClick(evt); });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.SaveWindowState, (evt) => { this.__hndlrTakeSnapShot(evt) });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.UpdateNicknameB, () => this.__updateNickName());

    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Btn.BigRed, () => this.__hndlrAddCETab);

    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Legend.LgndDebug, (evt) => { this.__toggleAccordian(evt) });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Legend.LgndForeSite, (evt) => { this.__toggleAccordian(evt) });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Legend.LgndHindSite, (evt) => { this.__toggleAccordian(evt) });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Legend.LgndInSite, (evt) => { this.__toggleAccordian(evt) });
    this.ScUiMan().AssignOnClickEvent(this.Const().ElemId.HS.Legend.LgndSettings, (evt) => { this.__toggleAccordian(evt) });

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
      MenuHeight: window.outerHeight,
      MenuWidth: window.outerWidth,
    }

    this.AtticMan().UpdateMenuCoords(menuData);

    this.__verifyMatchingTab();
  }

  private __verifyMatchingTab() {
    //this.UiMan().VerifyTabMatch();
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
        this.UiMan().NotifyComplete(null, this.Const().Notify.PublishComplete);
      })
  }

  private __hndlrTakeSnapShot(evt: MouseEvent) {
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