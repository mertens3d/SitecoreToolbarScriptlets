console.log('EventManager loaded');
class EventManager extends ManagerBase {
  constructor(xyyz: Hub) {
    super(xyyz);
  }
  __ById(value) {
    return document.getElementById(value);
  }
  Init() {
    this.__wireMenuButtons();
  }
  private __wireMenuButtons() {
    this.debug().FuncStart(EventManager.name + ' ' + this.__wireMenuButtons.name);

    this.__ById(this.Const().ElemId.BtnEdit).onclick = () => { this.locMan().SetScMode('edit'); };
    this.__ById('btnPrev').onclick = () => { this.locMan().SetScMode('preview'); };
    this.__ById('btnNorm').onclick = () => { this.locMan().SetScMode('normal'); };
    this.__ById('btnAdminB').onclick = () => { this.locMan().AdminB(this.PageDataMan().GetParentWindow().DataDocSelf, null); };

    this.__ById('btnDesktop').onclick = () => { this.debug().ClearDebugText(); this.locMan().ChangeLocationSwitchBoard(WindowType.Desktop, this.PageDataMan().GetParentWindow()); };
    this.__ById('btnCE').onclick = () => { this.__openCE(); };

    this.__ById(this.Const().ElemId.BtnSaveWindowState).onclick = () => { this.__takeSnapShot(); };
    this.__ById('btnDrawLocalStorage').onclick = () => { this.AtticMan().DrawStorage(); };
    this.__ById('btnRemoveOneFromLocalStorage').onclick = () => { this.AtticMan().RemoveOneFromStorage(); };
    this.__ById(this.Const().ElemId.Hs.btnClearDebugTextArea).onclick = () => { this.Xyyz.debug.ClearDebugText(); };
    this.__ById(this.Const().ElemId.btnUpdateNicknameB).onclick = () => { this.Xyyz.AtticMan.UpdateNickname(); };

    this.__ById(this.Const().ElemId.hsBtnBigRed).onclick = () => { this.__addCETab() };

    this.__ById(this.Const().ElemId.BtnRestoreWindowState).onclick = (evt) => { this._handlerRestoreClick(evt); };
    (<HTMLSelectElement>this.__ById(this.Const().ElemId.SelStateSnapShot)).onchange = () => { this.Xyyz.UiMan.SelectChanged(); };

    (<HTMLSelectElement>this.__ById(this.Const().ElemId.SelStateSnapShot)).ondblclick = (evt) => { this._handlerRestoreClick(evt); };

    //this.__ById(this.Const().ElemId.InputNickname).onclick = () => { thisObj.Xyyz.debug.ClearTextArea(); };

    //this.__ById(this.Const().ElemId.SelSnapShot).onclick = () => { thisObj.Xyyz.debug.ClearTextArea(); };

    this.debug().FuncEnd(this.__wireMenuButtons.name);
  };

  private __takeSnapShot() {
    this.debug().ClearDebugText();
    this.Xyyz.OneWindowMan.SaveWindowState(this.PageDataMan().GetParentWindow());
  }

  private __addCETab() {
    this.debug().ClearDebugText();
    this.DesktopMan().WaitForAndClickRedStartButtonWorker(this.PageDataMan().SelfWindow);
  }

  private __openCE() {
    this.debug().ClearDebugText();
    this.locMan().ChangeLocationSwitchBoard(WindowType.ContentEditor, this.PageDataMan().GetParentWindow());
  }

  private __getTargetWindow(evt: MouseEvent, callbackOnLoaded: Function): IDataBroswerWindow {
    this.debug().FuncStart(this.__getTargetWindow.name);
    var targetWindow: IDataBroswerWindow;

    if (evt.ctrlKey) {
      this.debug().Log('target window is self');
      targetWindow = this.PageDataMan().GetParentWindow();

      callbackOnLoaded(targetWindow);
    } else {
      this.debug().Log('target window is new');
      targetWindow = this.PageDataMan().OpenNewBrowserWindow();

      var self = this;

      targetWindow.Window.addEventListener('load', function () {
        if (targetWindow) {
          targetWindow.DataDocSelf.DataWinParent = targetWindow;
          targetWindow.DataDocSelf.Document = targetWindow.Window.document;

          self.debug().Log(self.__getTargetWindow.name,'triggering callback');
          callbackOnLoaded(targetWindow);
        } else {
          self.debug().Error(self.__getTargetWindow, 'No target window');
        }
      }, false);
    }

    targetWindow.WindowType = WindowType.ContentEditor;
    this.debug().FuncEnd(this.__getTargetWindow.name, 'child window id: ' + targetWindow.DataDocSelf.XyyzId.asShort);

    return targetWindow;
  }

  private _handlerRestoreClick(evt: MouseEvent) {
    this.debug().ClearDebugText();

    this.debug().FuncStart(this._handlerRestoreClick.name);

    try {
      var idOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();

      this.debug().MarkerA();
      var dataOneWindowStorage = this.AtticMan().GetFromStorageById(idOfSelect);
      this.debug().MarkerB();
      var self = this;

      var callbackOnLoaded: Function = function (targetWindow: IDataBroswerWindow) {
        self.debug().FuncStart(self._handlerRestoreClick.name, 'callback');
        if (targetWindow) {
              self.Xyyz.OneWindowMan.RestoreWindowStateToTarget(targetWindow, dataOneWindowStorage);
            } else {
              self.debug().Error(this._handlerRestoreClick.name, 'no target window');
        }
        self.debug().FuncEnd('callback');
      }
      this.debug().MarkerC();

      this.__getTargetWindow(evt, callbackOnLoaded);
    } catch (ex) {
      this.debug().Error(this._handlerRestoreClick.name, ex)
    }
    this.debug().FuncEnd(this._handlerRestoreClick.name);
  }
}