class UiManager extends ManagerBase {
  private __selectSnapshotIndex: number = 0;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStartName(UiManager.name);

    xyyz.debug.FuncEndName(UiManager.name);
  }


  SelectChanged(): void {
    this.Xyyz.debug.FuncStartName(this.SelectChanged.name);
    this.__selectSnapshotIndex = this.__getSelectElem().selectedIndex;
    this.Xyyz.debug.Log('new index :' + this.__selectSnapshotIndex);
    this.RefreshUi();
    this.Xyyz.debug.FuncEndName(this.SelectChanged.name);
  }

  RefreshUi() {
    this.Xyyz.debug.FuncStartName(this.DrawCorrectNicknameInUI.name);
    this.__populateStateSel();
    this.DrawCorrectNicknameInUI();
    this.Xyyz.debug.FuncEndName(this.DrawCorrectNicknameInUI.name);
  }
  DrawCorrectNicknameInUI() {
    this.Xyyz.debug.FuncStartName(this.DrawCorrectNicknameInUI.name);
    var targetId: IGuid = this.UiMan().GetIdOfSelectWindowSnapshot();
    if (targetId) {
      this.Xyyz.debug.Log('targetId : ' + targetId.asString);

      var storageValue = this.AtticMan().GetFromStorageById(targetId);
      if (storageValue) {
        var inputElem = <HTMLInputElement>window.document.getElementById(this.Const().ElemId.InputNickname);
        if (inputElem) {
          inputElem.value = storageValue.NickName;
        }
      }
    }
    this.Xyyz.debug.FuncEndName(this.DrawCorrectNicknameInUI.name);
  }
  GetValueInNickname(): string {
    var toReturn: string = '';
    toReturn = (<HTMLInputElement>window.document.getElementById(this.Const().ElemId.InputNickname)).value;
    return toReturn;
  }
  private __getSelectElem(): HTMLSelectElement {
    return <HTMLSelectElement>window.document.getElementById(this.Xyyz.Const.ElemId.SelStateSnapShot);
  }

  GetIdOfSelectWindowSnapshot(): IGuid {
    var targetSel: HTMLSelectElement = this.__getSelectElem();
    var toReturn: IGuid = null;
    if (targetSel) {
      var temp = targetSel.options[this.__selectSnapshotIndex].value;
      this.debug().Log('temp: ' + temp);
      toReturn = this.Guidman().ParseGuid(temp);
    }
    this.debug().Log('idOfSelect: ' + toReturn.asString);
    return toReturn;
  }

  private __populateStateSel() {
    this.Xyyz.debug.FuncStartName(this.__populateStateSel.name, this.__selectSnapshotIndex.toString());

    var targetSel: HTMLSelectElement = this.__getSelectElem();

    if (targetSel) {
      var snapShots: IDataOneWindow[] = this.AtticMan().GetAllStorageAsIDataOneWindow();

      if (snapShots && snapShots.length > 0) {
        targetSel.options.length = 0;
        this.Xyyz.debug.Log('targetSel.options.length : ' + targetSel.options.length);

        for (var idx: number = 0; idx < snapShots.length; idx++) {
          var data = snapShots[idx];

          this.Xyyz.debug.Log('data.Id.asString : ' + data.Id.asString);

          var el = <HTMLOptionElement>window.document.createElement('option');
          el.textContent = this.Xyyz.Utilities.TimeNicknameFavStr(data);
          //el.textContent = this.Xyyz.Utilities.MakeFriendlyDate(data.TimeStamp) + ' - ' + data.NickName + ' - ' + (data.IsFavorite ? 'Favorite' : '--');
          el.value = data.Id.asString;
          if (idx === this.__selectSnapshotIndex) {
            el.selected = true;
          }

          targetSel.appendChild(el);
        }
      }
    }

    this.Xyyz.debug.FuncEndName(this.__populateStateSel.name);
  }
}