class OneWindowManager extends ManagerBase {
  __activeWindowSnapShot: IDataOneWindow;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStartName(OneWindowManager.name);

    xyyz.debug.FuncEndName(OneWindowManager.name);
  }

  __getSelectElem(): HTMLSelectElement {
    return <HTMLSelectElement>window.document.getElementById(this.Xyyz.Const.ElemId.SelStateSnapShot);
  }

  PopulateStateSel() {
    this.Xyyz.debug.FuncStartFunc(this.PopulateStateSel);

    var targetSel: HTMLSelectElement = this.__getSelectElem();

    if (targetSel) {
      var snapShots: IDataOneWindow[] = this.GetAllStorageAsIDataOneWindow();

      if (snapShots && snapShots.length > 0) {
        for (var idx = 0; idx < snapShots.length; idx++) {
          var data = snapShots[idx];
          var el = <HTMLOptionElement>window.document.createElement('option');
          el.textContent = this.Xyyz.Utilities.MakeFriendlyDate(data.TimeStamp) + ' - ' + data.NickName + ' - ' + (data.IsFavorite ? 'Favorite' : '--');
          el.value = data.Id.Value.toString();
          if (idx === 0) {
            el.selected = true;
          }

          targetSel.appendChild(el);
        }
      }
    } else {
    }

    this.Xyyz.debug.FuncEndName(this.PopulateStateSel.name);
  }

  SaveWindowState() {
    this.Xyyz.debug.FuncStartName(this.SaveWindowState.name);

    this.Xyyz.OneWindowMan.CreateNewWindowSnapShot();

    var currentPageType = this.Xyyz.PageData.GetCurrentPageType();

    if (currentPageType === PageType.ContentEditor) {
      this.Xyyz.debug.Log('is Content Editor');

      var id = this.Xyyz.GuidMan.EmptyGuid();
      var docElem = this.Xyyz.PageData.WinData.Opener.Document;

      this.Xyyz.OneCEMan.SaveStateOneContentEditor(id, docElem);
    }
    else if (currentPageType === PageType.Desktop) {
      this.Xyyz.debug.Log('is Desktop');
      this.Xyyz.OneDesktopMan.SaveStateOneDesktop();
    } else {
      this.Xyyz.debug.Error(this.SaveWindowState.name, 'Invalid page location ' + currentPageType);
    }
    this.Xyyz.debug.FuncEndName(this.SaveWindowState.name);;
  }
  RestoreWindowState(targetDoc, treeIdx) {
    this.Xyyz.debug.FuncStartFunc(this.RestoreWindowState);
    this.Xyyz.debug.Log('s) LookAtExistingData: ' + treeIdx);

    var idOfSelect = this.Xyyz.OneWindowMan.GetIdOfSelect();
    this.Xyyz.debug.Log('idOfSelect: ' + idOfSelect);

    var foundInStorage: IDataOneWindow[] = this.GetAllStorageAsIDataOneWindow();

    var foundMatch: IDataOneWindow = null;

    if (foundInStorage) {
      this.Xyyz.debug.Log('foundInStorage: ');

      for (var idx = 0; idx < foundInStorage.length; idx++) {
        var candidate = foundInStorage[idx];
        if (candidate.Id.Value === idOfSelect) {
          foundMatch = candidate;
          break;
        }
      }

      if (foundMatch) {
        this.Xyyz.debug.Log('found match ' + foundMatch.TimeStamp);

        if (this.Xyyz.PageData.GetCurrentPageType() === PageType.ContentEditor) {
          if (foundMatch.AllCEAr.length > 1) {
            alert('This data has multiple Content Editor data. Only the first will be used');
          }


          this.Xyyz.OneCEMan.RestoreCEState(foundMatch.AllCEAr[0], this.Xyyz.PageData.OpenerDoc());
        } else {
          this.Xyyz.OneDesktopMan.RestoreDesktopState(foundMatch);
        }

        var allData = this.Xyyz.OneDesktopMan.GetAllLiveIframeData(targetDoc)[treeIdx];
      } else {
        this.Xyyz.debug.Error(this.RestoreWindowState.name, 'No match found for snap shot');
      }
    }
    this.Xyyz.debug.FuncEndName(this.RestoreWindowState.name);
  }
  GetIdOfSelect(): string {
    var targetSel: HTMLSelectElement = this.__getSelectElem();
    var toReturn: string = '';
    if (targetSel) {
      toReturn = targetSel.options[targetSel.selectedIndex].value;
    }

    return toReturn;
  }
  ClearStorage() {
    this.Xyyz.debug.FuncStartName('ClearStorage');

    var result: boolean = confirm('Clear Local Storage for Xyyz b?');
    if (result === true) {
      var targets: IOneStorageData[] = this.GetAllLocalStorage();

      if (targets) {
        this.Xyyz.debug.Log('Target Count: ' + targets.length);

        var countBefore: number = targets.length;

        for (var idx = 0; idx < targets.length; idx++) {
          this.Xyyz.debug.Log('idx: ' + idx);
          var oneTarget: IOneStorageData = targets[idx];
          this.Xyyz.debug.Log('key: ' + oneTarget.key);
          window.localStorage.removeItem(oneTarget.key);
        }

        targets = this.GetAllLocalStorage()
        var countAfter: number = targets.length;

        alert('Count Before: ' + countBefore + ' Count After: ' + countAfter);
      }
      else {
        alert('No local storage was found for Xyyz');
      }
    }

    this.Xyyz.debug.FuncEndName('ClearStorage');
  }
  GetAllStorageAsIDataOneWindow(): IDataOneWindow[] {
    this.Xyyz.debug.FuncStartFunc(this.GetAllStorageAsIDataOneWindow);
    var toReturn: IDataOneWindow[] = [];
    var rawStorageData = this.GetAllLocalStorage();
    if (rawStorageData) {
      for (var idx = 0; idx < rawStorageData.length; idx++) {
        var candidate: IDataOneWindow = <IDataOneWindow>JSON.parse(rawStorageData[idx].data);

        
        this.Xyyz.debug.Log('rawStorageData[idx].data : ' + rawStorageData[idx].data);
        this.Xyyz.debug.Log('candidate : ' + candidate.AllCEAr.length);


        if (candidate) {
          candidate.TimeStamp = new Date(candidate.TimeStamp);
          candidate.Id = this.Xyyz.GuidMan.ParseGuid(candidate.Id.toString());
          if (!candidate.NickName) {
            candidate.NickName = '__';
          }
          toReturn.push(candidate);
        }
      }
    }

    toReturn.sort((a: IDataOneWindow, b: IDataOneWindow) =>
      +b.TimeStamp - +a.TimeStamp
    );

    this.Xyyz.debug.FuncEndName(this.GetAllStorageAsIDataOneWindow.name);
    return toReturn;
  }
  GetAllLocalStorage(): IOneStorageData[] {
    this.Xyyz.debug.FuncStartName('__GetAllLocalStorage ');
    var toReturn: IOneStorageData[] = [];

    for (var idx = 0; idx < window.localStorage.length; idx++) {
      var candidate: IOneStorageData = {
        data: '',
        key: ''
      };

      candidate.key = window.localStorage.key(idx);
      this.Xyyz.debug.Log('candidate.key: ' + candidate.key);

      if (candidate.key.startsWith(this.Xyyz.Const.Storage.WindowRoot)) {
        candidate.data = window.localStorage.getItem(candidate.key);

        toReturn.push(candidate);
      }
    }

    this.Xyyz.debug.FuncEndName('__GetAllLocalStorage ');
    return toReturn;
  }

  __drawStorageRaw(ourData: IOneStorageData[]) {
    this.Xyyz.debug.FuncStartName('DrawStorageRaw');
    for (var idx = 0; idx < ourData.length; idx++) {
      this.Xyyz.debug.Log('key: \t' + ourData[idx].key);
      this.Xyyz.debug.Log('data: \t' + ourData[idx].data);
      this.Xyyz.debug.Log('------------');
    }
    this.Xyyz.debug.FuncEndName('DrawStorageRaw');
  }
  __drawStoragePretty(ourData: IOneStorageData[]) {
    this.Xyyz.debug.FuncStartName('DrawStoragePretty');

    this.Xyyz.FeedbackMan.ClearTextArea();
    for (var idx = 0; idx < ourData.length; idx++) {
      this.Xyyz.debug.Log('key: \t' + ourData[idx].key);
      var parsed: IDataOneWindow = <IDataOneWindow>JSON.parse(ourData[idx].data);
      if (parsed) {
        this.DrawDebugDataPretty(parsed);
        this.Xyyz.debug.Log('------------');
      }
    }
    this.Xyyz.debug.FuncEndName('DrawStoragePretty');
  }

  DrawStorage() {
    this.Xyyz.debug.FuncStartName('DrawStorage');
    try {
      var ourData: IOneStorageData[] = this.GetAllLocalStorage();
      if (ourData) {
        this.__drawStorageRaw(ourData)
        this.__drawStoragePretty(ourData)
      }
    } catch (e) {
      xyyz.debug.Error(e.message);
    }
    this.Xyyz.debug.FuncEndName('DrawStorage');
  }

  PutCEDataToCurrentSnapShot(oneCeData: IDataOneCE) {
    this.Xyyz.debug.FuncStartName(this.PutCEDataToCurrentSnapShot.name);
    this.Xyyz.debug.Log('PutCEDataToCurrentSnapShot');

    var matchingCeData = this.FindMatchingCeData(oneCeData);

    if (matchingCeData) {
      matchingCeData = oneCeData;
    } else {
      this.__activeWindowSnapShot.AllCEAr.push(oneCeData);
    }

    //this.__activeWindowTreeSnapShot.ShowDebugDataOneWindow();

    this.UpdateStorage();

    this.DrawDebugDataPretty(null);

    this.Xyyz.debug.FuncEndName(this.PutCEDataToCurrentSnapShot.name);
  }
  ShowDebugDataOneWindow() {
    this.Xyyz.debug.FuncStartName('ShowDebugDataOneWindow');
    var toReturn: string[] = [];

    toReturn.push(this.__activeWindowSnapShot.TimeStamp.toJSON());
    for (var jdx = 0; jdx < this.__activeWindowSnapShot.AllCEAr.length; jdx++) {
      var oneCE = this.__activeWindowSnapShot.AllCEAr[jdx];
      toReturn = toReturn.concat(this.Xyyz.OneCEMan.GetDebugDataOneCE(oneCE));
    }

    for (var kdx = 0; kdx < toReturn.length; kdx++) {
      this.Xyyz.debug.Log(toReturn[kdx]);
    }

    this.Xyyz.debug.FuncEndName('ShowDebugDataOneWindow');
    return toReturn;
  }
  UpdateStorage() {
    this.Xyyz.debug.FuncStartName('UpdateStorage');
    //this.__activeWindowTreeSnapShot.ShowDebugDataOneWindow();

    var snapShotAsString = JSON.stringify(this.__activeWindowSnapShot);
    this.Xyyz.debug.Log('snapShotAsString: ' + snapShotAsString);

    window.localStorage.setItem(this.Xyyz.Const.Storage.WindowRoot + this.__activeWindowSnapShot.Id, snapShotAsString);
    this.Xyyz.debug.FuncEndName('UpdateStorage');
  }

  FindMatchingCeData(oneCeData: IDataOneCE): IDataOneCE {
    var toReturn: IDataOneCE = null;

    for (var idx = 0; idx < this.__activeWindowSnapShot.AllCEAr.length; idx++) {
      var candidate: IDataOneCE = this.__activeWindowSnapShot.AllCEAr[idx];
      if (candidate.Id === oneCeData.Id) {
        toReturn = candidate;
        break;
      }
    }

    this.Xyyz.debug.Log('match found :' + (toReturn !== null));
    return toReturn;
  }

  CreateNewWindowSnapShot() {
    this.Xyyz.debug.FuncStartName('CreateNewWindowSnapShot');

    var dateToUse: Date = new Date();
    //var friendly: string = this.Xyyz.Utilities.MakeFriendlyDate(dateToUse);

    var newGuid = this.Xyyz.GuidMan.Uuidv4();

    this.__activeWindowSnapShot = {
      TimeStamp: dateToUse,
      //TimeStampFriendly: friendly,
      AllCEAr: [],
      Id: newGuid,
      IsFavorite: false,
      NickName: '__'
    }

    this.Xyyz.debug.FuncEndName('CreateNewWindowSnapShot');
  }
  DrawDebugDataPretty(source: IDataOneWindow): void {
    var allDebugData: string[] = this.__buildDebugDataPretty(source);

    for (var ldx = 0; ldx < allDebugData.length; ldx++) {
      this.Xyyz.FeedbackMan.WriteLine(allDebugData[ldx]);
    }

    //this.Xyyz.debug.Log(JSON.stringify(this.__activeWindowSnapShot));
  }

  __buildDebugDataPretty(source: IDataOneWindow) {
    this.Xyyz.debug.FuncStartName(this.__buildDebugDataPretty.name);

    if (!source) {
      source = this.__activeWindowSnapShot;
    }
    var toReturn: string[] = [];

    toReturn.push('------ One Window Snap Shot Start -----');
    toReturn.push('Id: ' + source.Id);
    toReturn.push('TimeStamp: ' + source.TimeStamp);
    toReturn.push('CE Count: ' + source.AllCEAr.length);
    for (var jdx = 0; jdx < source.AllCEAr.length; jdx++) {
      toReturn.push('\t------ One CE -----');
      var dataOneCE: IDataOneCE = source.AllCEAr[jdx];
      toReturn.push('\tId: ' + dataOneCE.Id);

      var allCeDebugDataAr = this.Xyyz.OneCEMan.GetDebugDataOneCE(dataOneCE);
      for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
        toReturn.push('\t\t' + allCeDebugDataAr[kdx]);
      }
    }
    toReturn.push('------ One Window Snap Shot End -----');

    this.Xyyz.debug.FuncEndName(this.__buildDebugDataPretty.name);
    return toReturn;
  }
}