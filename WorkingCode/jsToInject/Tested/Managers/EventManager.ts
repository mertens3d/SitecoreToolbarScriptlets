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

    var thisObj = this;
    var locMan = thisObj.Xyyz.LocationMan;
    var constId = this.Const().ElemId;

    this.__ById(this.Const().ElemId.BtnEdit).onclick = () => { locMan.SetScMode('edit'); };
    this.__ById('btnPrev').onclick = () => { locMan.SetScMode('preview'); };
    this.__ById('btnNorm').onclick = () => { locMan.SetScMode('normal'); };
    this.__ById('btnAdminB').onclick = () => { locMan.AdminB(this.PageDataMan().GetParentWindow().DataDocSelf); };
    this.__ById('btnDesktop').onclick = () => { locMan.ChangeLocation(WindowType.Desktop, this.PageDataMan().GetParentWindow()); };

    this.__ById('btnCE').onclick = () => { locMan.ChangeLocation(WindowType.ContentEditor, this.PageDataMan().GetParentWindow()); };
    this.__ById(constId.BtnSaveWindowState).onclick = () => { thisObj.Xyyz.OneWindowMan.SaveWindowState(this.PageDataMan().GetParentWindow()); };
    this.__ById('btnDrawLocalStorage').onclick = () => { this.AtticMan().DrawStorage(); };
    this.__ById('btnRemoveOneFromLocalStorage').onclick = () => { this.AtticMan().RemoveOneFromStorage(); };
    this.__ById('btnClearTextArea').onclick = () => { thisObj.Xyyz.debug.ClearTextArea(); };
    this.__ById(constId.btnUpdateNicknameB).onclick = () => { thisObj.Xyyz.AtticMan.UpdateNickname(); };
    this.__ById(constId.btnToggleFavoriteB).onclick = () => { thisObj.Xyyz.AtticMan.ToggleFavorite(); };

    this.__ById(constId.BtnRestoreWindowState).onclick = (evt) => { this._handlerRestoreClick(evt); };
    (<HTMLSelectElement>this.__ById(constId.SelStateSnapShot)).onchange = () => { thisObj.Xyyz.UiMan.SelectChanged(); };

    (<HTMLSelectElement>this.__ById(constId.SelStateSnapShot)).ondblclick = (evt) => { this._handlerRestoreClick(evt); };

    //this.__ById(constId.InputNickname).onclick = () => { thisObj.Xyyz.debug.ClearTextArea(); };

    //this.__ById(constId.SelSnapShot).onclick = () => { thisObj.Xyyz.debug.ClearTextArea(); };

    this.debug().FuncEnd(this.__wireMenuButtons.name);
  };

  private _getTargetWindow(evt: MouseEvent, callbackOnLoaded: Function): IDataBroswerWindow {
    var targetWindow: IDataBroswerWindow;
    if (evt.ctrlKey) {
      targetWindow = this.PageDataMan().GetParentWindow();
      this.debug().Log('targetWindow id: ' + targetWindow.DataDocSelf.Id.asString)
      callbackOnLoaded(targetWindow);
    } else {
      targetWindow = this.PageDataMan().OpenNewBrowserWindow();
      var self = this;
      targetWindow.Window.addEventListener('load', function () {
        self.debug().Log('targetWindow id: ' + targetWindow.DataDocSelf.Id.asString)

        //targetWindow.Window.document.body.innerHTML = 'adsffsda';
        targetWindow.DataDocSelf.DataWinParent = targetWindow;
        targetWindow.DataDocSelf.Document = targetWindow.Window.document;

        console.log(targetWindow.DataDocSelf.Document.body.innerHTML);


          //.Window.location.href = 'https://bing.com?mmouse=true';
        callbackOnLoaded(targetWindow);
      }, false);
    }
    targetWindow.WindowType = WindowType.ContentEditor;

    return targetWindow;
  }

  private _handlerRestoreClick(evt: MouseEvent) {
    this.debug().ClearTextArea();
    this.debug().FuncStart(this._handlerRestoreClick.name);
    var idOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();
    var dataOneWindowStorage = this.AtticMan().GetFromStorageById(idOfSelect);

    var self = this;

    var callbackOnLoaded: Function = (targetWindow: IDataBroswerWindow) => {
      self.debug().Log('Page loaded callback ' + (targetWindow.Window.location.href));

      

      //targetWindow.Window.location.href = 'https://bing.com?dog=2';

      self.Xyyz.OneWindowMan.RestoreWindowStateToTarget(targetWindow, dataOneWindowStorage);
    }

    this._getTargetWindow(evt, callbackOnLoaded);

    this.debug().FuncEnd(this._handlerRestoreClick.name);
  }
}