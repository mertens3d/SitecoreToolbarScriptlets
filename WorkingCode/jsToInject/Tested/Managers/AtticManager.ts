class AtticManager extends ManagerBase {
  eventAwesome: CustomEvent<string>;



  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStartName(AtticManager.name);

    xyyz.debug.FuncEndName(AtticManager.name);
  }

  Init() {
    this.eventAwesome = new CustomEvent('awesome', { detail: 'some detail' });
  }

  functioneventHandler(e) {
    console.log('this data is ' + e.detail);
  }

  UpdateNickname() {
    this.Xyyz.debug.FuncStartName(this.UpdateNickname);

    var targetId: IGuid = this.UiMan().GetIdOfSelectWindowSnapshot();
    if (targetId) {
      var storageMatch = this.GetFromStorageById(targetId)
      if (storageMatch) {
        var newNickname = this.UiMan().GetValueInNickname();
        storageMatch.NickName = newNickname;
        this.WriteToStorage(storageMatch);
      }
    }

    this.Xyyz.debug.FuncEndName(this.UpdateNickname);
  }

  ToggleFavorite() {
    this.Xyyz.debug.FuncStartName(this.ToggleFavorite);

    var targetId: IGuid = this.UiMan().GetIdOfSelectWindowSnapshot();
    if (targetId) {
      var storageMatch = this.GetFromStorageById(targetId)
      if (storageMatch) {
        storageMatch.IsFavorite = !storageMatch.IsFavorite;
        this.WriteToStorage(storageMatch);
      }
    }

    this.Xyyz.debug.FuncEndName(this.ToggleFavorite);
  }

  DrawDebugDataPretty(source: IDataOneWindow): void {
    var allDebugData: string[] = this.__buildDebugDataPretty(source);

    for (var ldx = 0; ldx < allDebugData.length; ldx++) {
      this.Xyyz.FeedbackMan.WriteLine(allDebugData[ldx]);
    }

    //this.Xyyz.debug.Log(JSON.stringify(this.__activeWindowSnapShot));
  }

  __buildDebugDataPretty(dataOneWindow: IDataOneWindow) {
    this.Xyyz.debug.FuncStartName(this.__buildDebugDataPretty.name, (dataOneWindow !== null).toString());

    var toReturn: string[] = [];
    if (dataOneWindow) {
      toReturn.push('------ One Window Snap Shot Start -----');
      toReturn.push('Id: ' + dataOneWindow.Id);
      toReturn.push('TimeStamp: ' + dataOneWindow.TimeStamp);
      toReturn.push('CE Count: ' + dataOneWindow.AllCEAr.length);
      for (var jdx = 0; jdx < dataOneWindow.AllCEAr.length; jdx++) {
        toReturn.push('\t------ One CE -----');
        var dataOneCE: IDataOneCE = dataOneWindow.AllCEAr[jdx];
        toReturn.push('\tId: ' + dataOneCE.Id.asString);

        var allCeDebugDataAr = this.Xyyz.OneCEMan.GetDebugDataOneCE(dataOneCE);
        for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
          toReturn.push('\t\t' + allCeDebugDataAr[kdx]);
        }
      }
      toReturn.push('------ One Window Snap Shot End -----');

      this.Xyyz.debug.FuncEndName(this.__buildDebugDataPretty.name);
    } else {
      this.debug().Error(this.__buildDebugDataPretty.name, 'missing data')
    }
    return toReturn;
  }
  private __drawStorageRaw(ourData: IOneStorageData[]) {
    this.Xyyz.debug.FuncStartName('DrawStorageRaw');
    for (var idx = 0; idx < ourData.length; idx++) {
      this.Xyyz.debug.Log('key: \t' + ourData[idx].key);
      this.Xyyz.debug.Log('data: \t' + ourData[idx].data);
      this.Xyyz.debug.Log('------------');
    }
    this.Xyyz.debug.FuncEndName('DrawStorageRaw');
  }
  private __drawStoragePretty(ourData: IOneStorageData[]) {
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
  private __getAllLocalStorageAsIOneStorageData(): IOneStorageData[] {
    this.Xyyz.debug.FuncStartName('__GetAllLocalStorage ');
    var toReturn: IOneStorageData[] = [];

    for (var idx = 0; idx < window.localStorage.length; idx++) {
      var candidate: IOneStorageData = {
        data: '',
        key: '',
      };

      candidate.key = window.localStorage.key(idx);

      if (candidate.key.startsWith(this.Xyyz.Const.Storage.WindowRoot)) {
        this.Xyyz.debug.Log('candidate.key: ' + candidate.key);
        candidate.data = window.localStorage.getItem(candidate.key);

        toReturn.push(candidate);
      }
    }

    this.Xyyz.debug.FuncEndName('__GetAllLocalStorage ');
    return toReturn;
  }
  WriteToStorage(dataOneWindow: IDataOneWindow) {
    this.Xyyz.debug.FuncStartName(this.WriteToStorage);

    var snapShotAsString = JSON.stringify(dataOneWindow);
    this.Xyyz.debug.Log('snapShotAsString: ' + snapShotAsString);

    window.localStorage.setItem(this.Xyyz.Const.Storage.WindowRoot + dataOneWindow.Id.asString, snapShotAsString);

    this.UiMan().RefreshUi();

    this.Xyyz.debug.FuncEndName(this.WriteToStorage.name);
  }

  //GetAllStorageAsIOneStorageData(): IOneStorageData[] {
  //  this.Xyyz.debug.FuncStartName(this.GetAllStorageAsIOneStorageData.name);
  //  var toReturn: IOneStorageData[] = [];

  //  this.Xyyz.debug.FuncEndName(this.GetAllStorageAsIOneStorageData.name);
  //  return toReturn;

  //}
  GetAllStorageAsIDataOneWindow(): IDataOneWindow[] {
    this.Xyyz.debug.FuncStartName(this.GetAllStorageAsIDataOneWindow.name);
    var toReturn: IDataOneWindow[] = [];
    var rawStorageData: IOneStorageData[] = this.__getAllLocalStorageAsIOneStorageData();
    if (rawStorageData) {
      for (var idx = 0; idx < rawStorageData.length; idx++) {
        var oneRaw: IOneStorageData = rawStorageData[idx];
        var candidate: IDataOneWindow = <IDataOneWindow>JSON.parse(oneRaw.data);

        //this.Xyyz.debug.Log('rawStorageData[idx].data : ' + rawStorageData[idx].data);

        if (candidate) {
          this.Xyyz.debug.Log('candidate.AllCEAr.length : ' + candidate.AllCEAr.length);
          candidate.TimeStamp = new Date(candidate.TimeStamp);
          candidate.Id = this.Xyyz.GuidMan.ParseGuid(candidate.Id.asString);
          candidate.RawData = oneRaw;

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
  RemoveOneFromStorage() {
    this.Xyyz.debug.FuncStartName(this.RemoveOneFromStorage.name);

    var targetId: IGuid = this.UiMan().GetIdOfSelectWindowSnapshot();
    if (targetId) {
      var storageMatch = this.GetFromStorageById(targetId)
      if (storageMatch) {
        var result: boolean = confirm('Remove ?: ' + this.Xyyz.Utilities.TimeNicknameFavStr(storageMatch));
        if (result === true) {
          window.localStorage.removeItem(storageMatch.RawData.key);

          this.UiMan().RefreshUi();
        }
      }
    }

    //if (result === true) {
    //  var targets: IOneStorageData[] = this.__getAllLocalStorage();

    //  if (targets) {
    //    this.Xyyz.debug.Log('Target Count: ' + targets.length);

    //    var countBefore: number = targets.length;

    //    for (var idx = 0; idx < targets.length; idx++) {
    //      this.Xyyz.debug.Log('idx: ' + idx);
    //      var oneTarget: IOneStorageData = targets[idx];
    //      this.Xyyz.debug.Log('key: ' + oneTarget.key);
    //      window.localStorage.removeItem(oneTarget.key);
    //    }

    //    targets = this.__getAllLocalStorage()
    //    var countAfter: number = targets.length;

    //    alert('Count Before: ' + countBefore + ' Count After: ' + countAfter);
    //  }
    //  else {
    //    alert('No local storage was found for Xyyz');
    //  }
    //}

    this.Xyyz.debug.FuncEndName(this.RemoveOneFromStorage.name);
  }
  DrawStorage() {
    this.Xyyz.debug.FuncStartName('DrawStorage');
    try {
      var ourData: IOneStorageData[] = this.__getAllLocalStorageAsIOneStorageData();
      if (ourData) {
        this.__drawStorageRaw(ourData)
        this.__drawStoragePretty(ourData)
      }
    } catch (e) {
      xyyz.debug.Error(e.message);
    }
    this.Xyyz.debug.FuncEndName('DrawStorage');
  }
  GetRawFromStorageById(needleId: IGuid): IOneStorageData {
    this.Xyyz.debug.FuncStartName(this.GetRawFromStorageById.name, needleId.asString);
    var toReturn: IOneStorageData = null;
    var foundStorage: IOneStorageData[] = this.__getAllLocalStorageAsIOneStorageData();
    if (foundStorage) {
      for (var idx = 0; idx < foundStorage.length; idx++) {
        var candidate = foundStorage[idx];
        //if (candidate.key === needleId) {
        //}
      }
    }
    this.Xyyz.debug.FuncEndName(this.GetRawFromStorageById.name);

    return toReturn;
  }

  GetFromStorageById(needleId: IGuid): IDataOneWindow {
    this.Xyyz.debug.FuncStartName(this.GetFromStorageById.name, needleId.asString);
    var foundStorage: IDataOneWindow[] = this.GetAllStorageAsIDataOneWindow();
    var foundMatch: IDataOneWindow = null;

    if (foundStorage) {
      for (var idx = 0; idx < foundStorage.length; idx++) {
        var candidate = foundStorage[idx];
        if (candidate.Id.asString === needleId.asString) {
          foundMatch = candidate;
          this.Xyyz.debug.Log('Found Match');
          break;
        }
      }
    }
    this.Xyyz.debug.FuncEndName(this.GetFromStorageById.name);
    return foundMatch;
  }
}