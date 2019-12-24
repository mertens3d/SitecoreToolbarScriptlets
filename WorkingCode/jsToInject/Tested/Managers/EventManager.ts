console.log('EventManager loaded');
class EventManager extends ManagerBase {
  constructor(xyyz: Hub) {
    super(xyyz);
  }

  Init() {
    this.__wireMenuButtons();
  }
  __ById(value) {
    var toReturn = document.getElementById(value);
    if (!toReturn) {
      this.debug().Error(this.__ById.name, 'No Id: ' + value);
    }
    return toReturn;
  }
  private __wireMenuButtons() {
    this.debug().FuncStart(EventManager.name + ' ' + this.__wireMenuButtons.name);

    this.__ById(this.Const().ElemId.BtnEdit).onclick = () => { this.locMan().SetScMode('edit'); };
    this.__ById('btnPrev').onclick = () => { this.locMan().SetScMode('preview'); };
    this.__ById('btnNorm').onclick = () => { this.locMan().SetScMode('normal'); };
    this.__ById('btnAdminB').onclick = () => { this.locMan().AdminB(this.PageDataMan().GetParentWindow().DataDocSelf, null); };

    this.__ById('btnDesktop').onclick = () => { this.debug().ClearDebugText(); this.locMan().ChangeLocationSwitchBoard(scWindowType.Desktop, this.PageDataMan().GetParentWindow()); };
    this.__ById('btnCE').onclick = () => { this.__hndlrOpenCE(); };

    this.__ById(this.Const().ElemId.BtnSaveWindowState).onclick = () => { this.__hndlrTakeSnapShot(); };
    this.__ById('btnDrawLocalStorage').onclick = () => { this.AtticMan().DrawStorage(); };
    this.__ById('btnRemoveOneFromLocalStorage').onclick = () => { this.AtticMan().RemoveOneFromStorage(); };
    this.__ById(this.Const().ElemId.Hs.btnClearDebugTextArea).onclick = () => { this.Xyyz.debug.ClearDebugText(); };
    this.__ById(this.Const().ElemId.btnUpdateNicknameB).onclick = () => { this.Xyyz.AtticMan.UpdateNickname(); };

    this.__ById(this.Const().ElemId.hsBtnBigRed).onclick = () => { this.__hndlrAddCETab() };

    this.__ById(this.Const().ElemId.btnQuickPublish).onclick = (evt) => { this.__hndlrQuickPublish(evt) };

    this.__ById(this.Const().ElemId.Hs.BtnCancel).onclick = (evt) => { this.__hndlrCancelOperation(evt); };

    this.__ById(this.Const().ElemId.BtnRestoreWindowState).onclick = (evt) => { this.__hndlrRestoreClick(evt); };
    (<HTMLSelectElement>this.__ById(this.Const().ElemId.Hs.SelStateSnapShot)).onchange = () => { this.Xyyz.UiMan.SelectChanged(); };

    (<HTMLSelectElement>this.__ById(this.Const().ElemId.Hs.SelStateSnapShot)).ondblclick = (evt) => { this.__hndlrRestoreClick(evt); };

    //this.__ById(this.Const().ElemId.InputNickname).onclick = () => { thisObj.Xyyz.debug.ClearTextArea(); };

    //this.__ById(this.Const().ElemId.SelSnapShot).onclick = () => { thisObj.Xyyz.debug.ClearTextArea(); };
    (<HTMLElement>document.querySelector(this.Const().Selector.XS.iCBoxdSettingsShowDebugData)).onclick = () => { this.UiMan().UpdateAtticFromUi(); };

    // Legends

    this.__ById(this.Const().ElemId.Hs.LgndHindSite).onclick = (evt) => { this.__toggleAccordian(evt) };
    this.__ById(this.Const().ElemId.Hs.LgndDebug).onclick = (evt) => { this.__toggleAccordian(evt) };
    this.__ById(this.Const().ElemId.Hs.LgndForeSite).onclick = (evt) => { this.__toggleAccordian(evt) };
    this.__ById(this.Const().ElemId.Hs.LgndInSite).onclick = (evt) => { this.__toggleAccordian(evt) };
    this.__ById(this.Const().ElemId.Hs.LgndSettings).onclick = (evt) => { this.__toggleAccordian(evt) };

    this.debug().FuncEnd(this.__wireMenuButtons.name);
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

  private __hndlrCancelOperation(evt: MouseEvent) {
    this.UiMan().SetCancelFlag();
  }

  private __hndlrQuickPublish(evt: MouseEvent) {
    this.__initNewOperation();
    var targetWin = this.PageDataMan().GetParentWindow();
    this.OneWinMan().PublishActiveCE(targetWin);
  }

  private __hndlrTakeSnapShot() {
    this.__initNewOperation();
    this.Xyyz.OneWindowMan.SaveWindowState(this.PageDataMan().GetParentWindow());
  }

  private async __hndlrAddCETab() {
    this.__initNewOperation();
    await this.PromiseGen().RaceWaitAndClick(this.Const().Selector.SC.scStartButton, this.PageDataMan().GetParentWindow().DataDocSelf)
      .then(() => { this.PromiseGen().WaitAndClick(this.Const().Selector.SC.StartMenuLeftOption, this.PageDataMan().GetParentWindow().DataDocSelf) });

    //this.UiMan().NotifyComplete();
  }

  private __hndlrOpenCE() {
    this.__initNewOperation();
    this.locMan().ChangeLocationSwitchBoard(scWindowType.ContentEditor, this.PageDataMan().GetParentWindow());
  }

  private __initNewOperation() {
    this.debug().ClearDebugText();
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

      var targetWindow: IDataBroswerWindow = await this.PageDataMan().GetTargetWindowAsync(evt.ctrlKey ? true : false, dataOneWindowStorage.WindowType);

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