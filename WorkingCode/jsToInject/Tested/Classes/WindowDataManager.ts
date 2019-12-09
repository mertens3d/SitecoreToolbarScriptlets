class WindowSnapShotManager extends SpokeBase {
  __activeWindowSnapShot: IDataOneWindow;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(WindowSnapShotManager.name);
    this.CreateNewWindowTreeSnapShot();
    xyyz.debug.FuncEnd(WindowSnapShotManager.name);
  }
  ClearStorage() {
    this.Xyyz.debug.FuncStart('ClearStorage');

    var result: boolean = confirm('Clear Local Storage for Xyyz b?');
    if (result === true) {
      var targets: IOneStorageData[] = this.__GetAllLocalStorage();

      if (targets) {
        this.Xyyz.debug.Log('Target Count: ' + targets.length);

        var countBefore: number = targets.length;

        for (var idx = 0; idx < targets.length; idx++) {
          this.Xyyz.debug.Log('idx: ' + idx);
          var oneTarget: IOneStorageData = targets[idx];
          this.Xyyz.debug.Log('key: ' + oneTarget.key);
          window.localStorage.removeItem(oneTarget.key);
        }

        targets = this.__GetAllLocalStorage()
        var countAfter: number = targets.length;

        alert('Count Before: ' + countBefore + ' Count After: ' + countAfter);
      }
      else {
        alert('No local storage was found for Xyyz');
      }
    }

    this.Xyyz.debug.FuncEnd('ClearStorage');
  }
  __GetAllLocalStorage(): IOneStorageData[] {
    this.Xyyz.debug.FuncStart('__GetAllLocalStorage ');
    var toReturn: IOneStorageData[] = [];

    for (var idx = 0; idx < window.localStorage.length; idx++) {
      var candidate: IOneStorageData = {
        data: '',
        key: ''
      };

      candidate.key = window.localStorage.key(idx);
      this.Xyyz.debug.Log('candidate.key: ' + candidate.key);

      if (candidate.key.startsWith(this.Xyyz.InjectConst.Storage.WindowRoot)) {
        candidate.data = window.localStorage.getItem(candidate.key);

        toReturn.push(candidate);
      }
    }

    this.Xyyz.debug.FuncEnd('__GetAllLocalStorage ');
    return toReturn;
  }

  __drawStorageRaw(ourData: IOneStorageData[]) {
    this.Xyyz.debug.FuncStart('DrawStorageRaw');
    for (var idx = 0; idx < ourData.length; idx++) {
      this.Xyyz.debug.Log('key: \t' + ourData[idx].key);
      this.Xyyz.debug.Log('data: \t' + ourData[idx].data);
      this.Xyyz.debug.Log('------------');
    }
    this.Xyyz.debug.FuncEnd('DrawStorageRaw');
  }
  __drawStoragePretty(ourData: IOneStorageData[]) {
    this.Xyyz.debug.FuncStart('DrawStoragePretty');

    this.Xyyz.FeedbackMan.ClearTextArea();
    for (var idx = 0; idx < ourData.length; idx++) {
      this.Xyyz.debug.Log('key: \t' + ourData[idx].key);
      var parsed: IDataOneWindow = <IDataOneWindow>JSON.parse(ourData[idx].data);
      if (parsed) {
        this.DrawDebugDataPretty(parsed);
        this.Xyyz.debug.Log('------------');
      }
    }
    this.Xyyz.debug.FuncEnd('DrawStoragePretty');
  }

  DrawStorage() {
    this.Xyyz.debug.FuncStart('DrawStorage');
    try {
      var ourData: IOneStorageData[] = this.__GetAllLocalStorage();
      if (ourData) {
        this.__drawStorageRaw(ourData)
        this.__drawStoragePretty(ourData)
      }
    } catch (e) {
      xyyz.debug.Error(e.message);
    }
    this.Xyyz.debug.FuncEnd('DrawStorage');
  }

  PutCEDataToCurrentSnapShot(oneCeData: IDataOneCE) {
    this.Xyyz.debug.FuncStart(this.PutCEDataToCurrentSnapShot.name);
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

    this.Xyyz.debug.FuncEnd(this.PutCEDataToCurrentSnapShot.name);
  }
  ShowDebugDataOneWindow() {
    this.Xyyz.debug.FuncStart('ShowDebugDataOneWindow');
    var toReturn: string[] = [];

    toReturn.push(this.__activeWindowSnapShot.TimeStamp.toJSON());
    for (var jdx = 0; jdx < this.__activeWindowSnapShot.AllCEAr.length; jdx++) {
      var oneCE = this.__activeWindowSnapShot.AllCEAr[jdx];
      toReturn = toReturn.concat(this.Xyyz.SnapShotOneContentEditorMan.GetDebugDataOneCE(oneCE));
    }

    for (var kdx = 0; kdx < toReturn.length; kdx++) {
      this.Xyyz.debug.Log(toReturn[kdx]);
    }

    this.Xyyz.debug.FuncEnd('ShowDebugDataOneWindow');
    return toReturn;
  }
  UpdateStorage() {
    this.Xyyz.debug.FuncStart('UpdateStorage');
    //this.__activeWindowTreeSnapShot.ShowDebugDataOneWindow();

    var snapShotAsString = JSON.stringify(this.__activeWindowSnapShot);
    this.Xyyz.debug.Log('snapShotAsString: ' + snapShotAsString);

    window.localStorage.setItem(this.Xyyz.InjectConst.Storage.WindowRoot + this.__activeWindowSnapShot.Id, snapShotAsString);
    this.Xyyz.debug.FuncEnd('UpdateStorage');
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

  CreateNewWindowTreeSnapShot() {
    this.Xyyz.debug.FuncStart('CreateNewWindowTreeSnapShot');

    var dateToUse: Date = new Date();
    //var friendly: string = this.Xyyz.Utilities.MakeFriendlyDate(dateToUse);
    this.__activeWindowSnapShot = {
      TimeStamp: dateToUse,
      //TimeStampFriendly: friendly,
      AllCEAr: [],
      Id: this.Xyyz.Utilities.Uuidv4()
    }

    this.Xyyz.debug.FuncEnd('CreateNewWindowTreeSnapShot');
  }
  DrawDebugDataPretty(source: IDataOneWindow): void {
    var allDebugData: string[] = this.__buildDebugDataPretty(source);

    for (var ldx = 0; ldx < allDebugData.length; ldx++) {
      this.Xyyz.FeedbackMan.WriteLine(allDebugData[ldx]);
    }

    //this.Xyyz.debug.Log(JSON.stringify(this.__activeWindowSnapShot));
  }

  __buildDebugDataPretty(source: IDataOneWindow) {
    this.Xyyz.debug.FuncStart(this.__buildDebugDataPretty.name);

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

      var allCeDebugDataAr = this.Xyyz.SnapShotOneContentEditorMan.GetDebugDataOneCE(dataOneCE);
      for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
        toReturn.push('\t\t' + allCeDebugDataAr[kdx]);
      }
    }
    toReturn.push('------ One Window Snap Shot End -----');

    this.Xyyz.debug.FuncEnd(this.__buildDebugDataPretty.name);
    return toReturn;
  }
}