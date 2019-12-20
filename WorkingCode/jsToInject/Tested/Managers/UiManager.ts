class UiManager extends ManagerBase {
    
 
  SetParentInfo(winDataParent: IDataBroswerWindow) {
    var targetSpan = document.getElementById(this.Const().ElemId.HindSiteParentInfo);
    if (targetSpan) {
      targetSpan.innerHTML = ' | Parent Id: ' + this.GuidMan().ShortGuid(winDataParent.DataDocSelf.XyyzId) + ' | ' + winDataParent.Window.location.href;
    }
  }
  private __selectSnapshotIndex: number = 0;
  OperationCancelled: any;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(UiManager.name);

    xyyz.debug.FuncEnd(UiManager.name);
  }

  NotifyComplete(targetWindow: IDataBroswerWindow): void {

    let bodyTag = targetWindow.DataDocSelf.Document.getElementsByTagName('body')[0];//(treeGlyphTargetId);

    var flagElem: HTMLElement = targetWindow.DataDocSelf.Document.createElement('div');
    flagElem.innerHTML = '<div>Complete</div>';
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

  UpdateAtticFromUi(): any {
    this.debug().FuncStart(this.UpdateAtticFromUi.name);

    let currentSettings = this.AtticMan().Settings();
    let currentVal = (<HTMLInputElement>document.querySelector(this.Const().Selector.XS.iCBoxdSettingsShowDebugData)).checked;
    this.debug().LogVal('currentVal', currentVal.toString())
    currentSettings.DebugSettings.ShowDebugData = currentVal;

    this.AtticMan().SetSettings(currentSettings);
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

    let currentSettings: IDataSettings = this.AtticMan().Settings();
    if (currentSettings) {
      if (debugFieldSet) {
        let newDisplay = this.AtticMan().Settings().DebugSettings.ShowDebugData ? '' : 'none';
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
    this.debug().FuncStart(this.DrawCorrectNicknameInUI.name);
    this.__populateStateSel();
    this.DrawCorrectNicknameInUI();
    this.__refreshSettings();
    this.debug().FuncEnd(this.DrawCorrectNicknameInUI.name);
  }
  DrawCorrectNicknameInUI() {
    this.debug().FuncStart(this.DrawCorrectNicknameInUI.name);
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
    this.debug().FuncEnd(this.DrawCorrectNicknameInUI.name);
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
          targetSel.appendChild(el);
        }
      }
    }


    this.debug().FuncEnd(this.__populateStateSel.name);
  }
}