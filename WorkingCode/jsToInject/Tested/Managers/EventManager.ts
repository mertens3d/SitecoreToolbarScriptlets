console.log('EventManager loaded');
class EventManager extends ManagerBase {
  constructor(xyyz: Hub) {
    super(xyyz);
  }
  __ById(value) {
    return document.getElementById(value);
  }
  WireMenuButtons() {
    this.Xyyz.debug.FuncStartName(EventManager.name + ' ' + this.WireMenuButtons.name);

    var thisObj = this;
    var locMan = thisObj.Xyyz.LocationMan;
    var constId = this.Xyyz.Const.ElemId;

    this.__ById(this.Xyyz.Const.ElemId.BtnEdit).onclick = () => { locMan.SetScMode('edit'); };
    this.__ById('btnPrev').onclick = () => { locMan.SetScMode('preview'); };
    this.__ById('btnNorm').onclick = () => { locMan.SetScMode('normal'); };
    this.__ById('btnAdminB').onclick = () => { locMan.AdminB(); };
    this.__ById('btnDesktop').onclick = () => { locMan.ChangeLocation(PageType.Desktop); };

    this.__ById('btnCE').onclick = () => { locMan.ChangeLocation(PageType.ContentEditor); };
    this.__ById(constId.BtnSaveWindowState).onclick = () => { thisObj.Xyyz.OneWindowMan.SaveWindowState(); };
    this.__ById(constId.BtnRestoreWindowState).onclick = () => { thisObj.Xyyz.OneWindowMan.RestoreWindowState(window.opener.document, 0); };
    this.__ById('btnDrawLocalStorage').onclick = () => { this.AtticMan().DrawStorage(); };
    this.__ById('btnRemoveOneFromLocalStorage').onclick = () => { this.AtticMan().RemoveOneFromStorage(); };
    this.__ById('btnClearTextArea').onclick = () => { thisObj.Xyyz.debug.ClearTextArea(); };
    this.__ById(constId.btnUpdateNicknameB).onclick = () => { thisObj.Xyyz.AtticMan.UpdateNickname(); };
    this.__ById(constId.btnToggleFavoriteB).onclick = () => { thisObj.Xyyz.AtticMan.ToggleFavorite(); };
    (<HTMLSelectElement>this.__ById(constId.SelStateSnapShot)).onchange = () => { thisObj.Xyyz.UiMan.SelectChanged(); };

    //this.__ById(constId.InputNickname).onclick = () => { thisObj.Xyyz.debug.ClearTextArea(); };

    //this.__ById(constId.SelSnapShot).onclick = () => { thisObj.Xyyz.debug.ClearTextArea(); };

    this.Xyyz.debug.FuncEndName(this.WireMenuButtons.name);
  };
}