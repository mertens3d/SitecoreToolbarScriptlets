class UiManager extends ManagerBase {
    SetParentInfo(winDataParent: IDataBroswerWindow) {

      var targetSpan = document.getElementById(this.Const().ElemId.HindSiteParentInfo);
      if (targetSpan) {
        targetSpan.innerHTML = ' | Parent Id: ' + this.GuidMan().ShortGuid(winDataParent.DataDocSelf.XyyzId) + ' | ' + winDataParent.Window.location.href;
      }
    }
  private __selectSnapshotIndex: number = 0;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(UiManager.name);

    xyyz.debug.FuncEnd(UiManager.name);
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

  RefreshUi() {
    this.debug().FuncStart(this.DrawCorrectNicknameInUI.name);
    this.__populateStateSel();
    this.DrawCorrectNicknameInUI();
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
    return <HTMLSelectElement>window.document.getElementById(this.Const().ElemId.SelStateSnapShot);
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

          //this.debug().Log('data.Id.asString : ' + data.Id.asString);

          var el = <HTMLOptionElement>window.document.createElement('option');
          el.innerHTML =  this.Xyyz.Utilities.TimeNicknameFavStr(data);

          //this.debug().Log('el.textContent : ' + el.outerHTML);
          //el.textContent = this.Xyyz.Utilities.MakeFriendlyDate(data.TimeStamp) + ' - ' + data.NickName + ' - ' + (data.IsFavorite ? 'Favorite' : '--');
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