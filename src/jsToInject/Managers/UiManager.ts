import { Hub } from '../Managers/Hub';
import { ManagerBase } from '../_first/_ManagerBase';
import { IDataBrowserWindow } from '../Interfaces/IDataBrowserWindow';
import { IDataOneWindowStorage } from '../Interfaces/IDataOneWindowStorage';
import { IDataSettings } from '../Interfaces/IDataSettings';
import { IDataMenuWindowPrefs } from '../Interfaces/IDataMenuWindowPrefs';

export class UiManager extends ManagerBase {
  private __selectSnapshotIndex: number = 0;
  OperationCancelled: any;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(UiManager.name);

    xyyz.debug.FuncEnd(UiManager.name);
  }

  Init() {
    var self = this;
    this.debug().AddDebugTextChangedCallback(self, this.HndlrDebugTextChanged);

    var prefs: IDataMenuWindowPrefs = this.AtticMan().CurrentSettings().MenuPrefs;

    if (prefs.MenuX && prefs.MenuY) {
      var currentX = window.screenLeft;
      var currentY = window.screenTop;
      var deltaX = Math.abs( prefs.MenuX - currentX);
      var deltaY = Math.abs( prefs.MenuY - currentY);





      window.moveTo(Math.abs(prefs.MenuX), Math.abs(prefs.MenuY));
    }
    if (prefs.MenuWidth && prefs.MenuHeight) {
      window.resizeTo(Math.abs(prefs.MenuWidth), Math.abs(prefs.MenuHeight));

    }

    this.RefreshUi();
    this.debug().LogVal('dddd', 'dddd');
  }
  __getTextArea(): HTMLTextAreaElement {
    return <HTMLTextAreaElement>document.getElementById(this.Const().ElemId.Hs.TaDebug);
  }

  HndlrDebugTextChanged(caller: any, data: ICallbackDataDebugTextChanged) {
    var self = caller;
    var ta = self.__getTextArea();

    if (ta) {
      if (data.Append) {
        ta.value += data.NewText + '\n';
      } else {
        ta.value = data.NewText + '\n';
      }

      ta.scrollTop = ta.scrollHeight;
    }
  }

  SetParentInfo(winDataParent: IDataBrowserWindow) {
    var targetSpan = document.getElementById(this.Const().ElemId.HindSiteParentInfo);
    if (targetSpan) {
      targetSpan.innerHTML = ' | Parent Id: ' + this.GuidMan().ShortGuid(winDataParent.DataDocSelf.XyyzId) + ' | ' + winDataParent.Window.location.href;
    }
  }

  NotifyComplete(targetWindow: IDataBrowserWindow = null, Message: string = this.Const().Notify.Default): void {


    if (!targetWindow) {
      targetWindow = this.PageDataMan().TopLevelWindow();
    }


    let bodyTag = targetWindow.DataDocSelf.Document.getElementsByTagName('body')[0];//(treeGlyphTargetId);

    var flagElem: HTMLElement = targetWindow.DataDocSelf.Document.createElement('div');
    flagElem.innerHTML = '<div>' + Message + '</div>';
    flagElem.style.position = 'absolute';
    flagElem.style.top = '100px';
    flagElem.style.left = '100px';
    flagElem.style.backgroundColor = 'yellow';
    flagElem.style.zIndex = '999';
    flagElem.style.fontSize = '40px';

    console.log(flagElem.toString());

    setTimeout(function () {
      flagElem.remove();
    }, this.Const().Timeouts.WaitBeforeRemovingCompleteFlag);

    bodyTag.appendChild(flagElem);
  }

  SetAccordianClass(targetElem: HTMLElement, isCollapsed: boolean) {
    if (!isCollapsed) {
      targetElem.classList.remove(this.Const().ClassNames.HS.Collapsed);
    } else {
      targetElem.classList.add(this.Const().ClassNames.HS.Collapsed);
    }
  }

  GetAccordianContentElem(sib: HTMLElement): HTMLElement {
    //this.debug().FuncStart(this.GetAccordianContentElem.name);
    var toReturn: HTMLElement;
    if (sib) {
      var siblings = sib.parentElement.getElementsByClassName('accordian-content');

      if (siblings) {
        var toReturn = <HTMLElement>siblings[0];
      }
    }

    //this.debug().FuncEnd(this.GetAccordianContentElem.name);
    return toReturn;
  }

  RestoreAccordianStates(): void {
    var accordianSettings = this.AtticMan().CurrentSettings().Accordian;
    for (var idx = 0; idx < accordianSettings.length; idx++) {
      var candidate = accordianSettings[idx];
      var target = document.getElementById(candidate.ElemId);

      if (target) {
        var contentSib = this.GetAccordianContentElem(target);
        if (contentSib) {
          this.SetAccordianClass(contentSib, candidate.isCollapsed)
        }
      }
    }
  }

  UpdateAtticFromUi(): any {
    this.debug().FuncStart(this.UpdateAtticFromUi.name);

    let currentSettings = this.AtticMan().CurrentSettings();
    let currentVal = (<HTMLInputElement>document.querySelector(this.Const().Selector.XS.iCBoxdSettingsShowDebugData)).checked;
    this.debug().LogVal('currentVal', currentVal.toString())
    currentSettings.DebugSettings.ShowDebugData = currentVal;

    this.AtticMan().StoreSettings(currentSettings);
    this.RefreshUi();
    this.debug().FuncEnd(this.UpdateAtticFromUi.name);
  }

  SelectChanged(): void {
    this.debug().FuncStart(this.SelectChanged.name);
    this.__selectSnapshotIndex = this.__getSelectElem().selectedIndex;
    this.debug().Log('new index :' + this.__selectSnapshotIndex);

    //if (e.ctrlKey) {
    //  alert
    //}

    this.RefreshUi();
    this.debug().FuncEnd(this.SelectChanged.name);
  }

  private __GetCancelButton() {
    return document.getElementById(this.Const().ElemId.Hs.BtnCancel);
  }

  SetCancelFlag() {
    this.OperationCancelled = true;
    var btn = this.__GetCancelButton();
    if (btn) {
      btn.classList.add('red');
    }
  }

  ClearCancelFlag() {
    var btn = this.__GetCancelButton();
    if (btn) {
      btn.classList.remove('red');
    }
    this.UiMan().OperationCancelled = false;
  }

  __refreshSettings() {
    this.debug().FuncStart(this.__refreshSettings.name);
    let debugFieldSet: HTMLFieldSetElement = <HTMLFieldSetElement>window.document.querySelector(this.Const().Selector.XS.IdFieldSetDebug);

    let currentSettings: IDataSettings = this.AtticMan().CurrentSettings();
    if (currentSettings) {
      if (debugFieldSet) {
        let newDisplay = this.AtticMan().CurrentSettings().DebugSettings.ShowDebugData ? '' : 'none';
        debugFieldSet.style.display = newDisplay;
      }
      let checkBoxShowDebug: HTMLInputElement = <HTMLInputElement>window.document.querySelector(this.Const().Selector.XS.iCBoxdSettingsShowDebugData);
      if (checkBoxShowDebug) {
        this.debug().LogVal('before', checkBoxShowDebug.checked.toString());
        checkBoxShowDebug.checked = currentSettings.DebugSettings.ShowDebugData;
        this.debug().LogVal('after', checkBoxShowDebug.checked.toString());
      } else {
        this.debug().Error(this.RefreshUi.name, 'no checkbox found');
      }
    }
    else {
      this.debug().Error(this.RefreshUi.name, 'no settings found');
    }
    this.debug().FuncEnd(this.__refreshSettings.name);
  }
  RefreshUi() {
    this.debug().FuncStart(this.__drawCorrectNicknameInUI.name);
    this.__populateStateSel();
    this.__drawCorrectNicknameInUI();
    this.__refreshSettings();
    this.RestoreAccordianStates();

    this.debug().FuncEnd(this.__drawCorrectNicknameInUI.name);
  }
  private __drawCorrectNicknameInUI() {
    this.debug().FuncStart(this.__drawCorrectNicknameInUI.name);
    var targetId: IGuid = this.UiMan().GetIdOfSelectWindowSnapshot();
    if (targetId) {
      this.debug().Log('targetId : ' + targetId.asString);

      var storageValue = this.AtticMan().GetFromStorageById(targetId);
      if (storageValue) {
        var inputElem = <HTMLInputElement>window.document.getElementById(this.Const().ElemId.InputNickname);
        if (inputElem) {
          inputElem.value = storageValue.NickName;
        }
      }
    }
    this.debug().FuncEnd(this.__drawCorrectNicknameInUI.name);
  }

  GetValueInNickname(): string {
    var toReturn: string = '';
    toReturn = (<HTMLInputElement>window.document.getElementById(this.Const().ElemId.InputNickname)).value;
    return toReturn;
  }

  private __getSelectElem(): HTMLSelectElement {
    return <HTMLSelectElement>window.document.getElementById(this.Const().ElemId.Hs.SelStateSnapShot);
  }

  GetIdOfSelectWindowSnapshot(): IGuid {
    this.debug().FuncStart(this.GetIdOfSelectWindowSnapshot.name);

    var targetSel: HTMLSelectElement = this.__getSelectElem();
    var toReturn: IGuid = null;
    if (targetSel) {
      var temp = targetSel.options[this.__selectSnapshotIndex].value;
      //this.debug().Log('temp: ' + temp);
      toReturn = this.GuidMan().ParseGuid(temp);
    }
    this.debug().FuncEnd(this.GetIdOfSelectWindowSnapshot.name, 'idOfSelect: ' + toReturn.asString);
    return toReturn;
  }

  private __populateStateSel() {
    this.debug().FuncStart(this.__populateStateSel.name, this.__selectSnapshotIndex.toString());

    var targetSel: HTMLSelectElement = this.__getSelectElem();

    if (targetSel) {
      var header: HTMLOptGroupElement = <HTMLOptionElement>window.document.createElement('optgroup');
      header.label = this.Utilites().SelectHeaderStr();

      var snapShots: IDataOneWindowStorage[] = this.AtticMan().GetAllStorageAsIDataOneWindow();

      if (snapShots && snapShots.length > 0) {
        targetSel.options.length = 0;
        this.debug().Log('targetSel.options.length : ' + targetSel.options.length);

        for (var idx: number = 0; idx < snapShots.length; idx++) {
          var data = snapShots[idx];

          var el = <HTMLOptionElement>window.document.createElement('option');
          el.innerHTML = this.Xyyz.Utilities.TimeNicknameFavStr(data);

          el.value = data.Id.asString;
          if (idx === this.__selectSnapshotIndex) {
            el.selected = true;
          }
          header.appendChild(el);
        }
      }

      targetSel.appendChild(header);
    }

    this.debug().FuncEnd(this.__populateStateSel.name);
  }
}