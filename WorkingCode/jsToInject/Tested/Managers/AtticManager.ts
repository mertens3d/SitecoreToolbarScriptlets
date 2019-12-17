class AtticManager extends ManagerBase {
  eventAwesome: CustomEvent<string>;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(AtticManager.name);

    xyyz.debug.FuncEnd(AtticManager.name);
  }

  Init() {
    this.eventAwesome = new CustomEvent('awesome', { detail: 'some detail' });
  }

  functioneventHandler(e) {
    console.log('this data is ' + e.detail);
  }

  UpdateNickname() {
    this.debug().FuncStart(this.UpdateNickname);

    var targetId: IGuid = this.UiMan().GetIdOfSelectWindowSnapshot();
    if (targetId) {
      var storageMatch = this.GetFromStorageById(targetId)
      if (storageMatch) {
        var newNickname = this.UiMan().GetValueInNickname();
        storageMatch.NickName = newNickname;
        this.WriteToStorage(storageMatch);
      }
    }

    this.debug().FuncEnd(this.UpdateNickname);
  }

  ToggleFavorite() {
    this.debug().FuncStart(this.ToggleFavorite.name);

    var targetId: IGuid = this.UiMan().GetIdOfSelectWindowSnapshot();
    if (targetId) {
      var storageMatch = this.GetFromStorageById(targetId)
      if (storageMatch) {
        storageMatch.IsFavorite = !storageMatch.IsFavorite;
        this.WriteToStorage(storageMatch);
      }
    }

    this.debug().FuncEnd(this.ToggleFavorite.name);
  }

  DrawDebugDataPretty(source: IDataOneWindowStorage): void {
    this.debug().FuncStart(this.DrawDebugDataPretty.name, 'source not null: ' + this.debug().IsNullOrUndefined(source));

    var allDebugData: string[] = this.__buildDebugDataPretty(source);

    for (var ldx = 0; ldx < allDebugData.length; ldx++) {
      this.Xyyz.FeedbackMan.WriteLine(allDebugData[ldx]);
    }

    this.debug().FuncEnd(this.DrawDebugDataPretty.name);
  }

  __buildDebugDataPretty(dataOneWindow: IDataOneWindowStorage) {
    this.debug().FuncStart(this.__buildDebugDataPretty.name, 'data not null? ' + this.debug().IsNullOrUndefined(dataOneWindow));

    var toReturn: string[] = [];
    if (dataOneWindow) {
      toReturn.push('------ One Window Snap Shot Start -----');
      toReturn.push('Id: ' + dataOneWindow.Id);
      toReturn.push('TimeStamp: ' + dataOneWindow.TimeStamp);
      toReturn.push('CE Count: ' + dataOneWindow.AllCEAr.length);
      toReturn.push('Type: ' + WindowType[dataOneWindow.WindowType]);
      toReturn.push('Nickname: ' + dataOneWindow.NickName);
      for (var jdx = 0; jdx < dataOneWindow.AllCEAr.length; jdx++) {
        toReturn.push('\t------ One CE Start -----');
        var dataOneCE: IDataOneStorageCE = dataOneWindow.AllCEAr[jdx];
        toReturn.push('\tId: ' + dataOneCE.Id.asString);

        var allCeDebugDataAr = this.Xyyz.OneCEMan.GetDebugDataOneCE(dataOneCE);
        for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
          toReturn.push('\t\t' + allCeDebugDataAr[kdx]);
        }
        toReturn.push('\t------ One CE End -----');
      }
      toReturn.push('------ One Window Snap Shot End -----');

      this.debug().FuncEnd(this.__buildDebugDataPretty.name);
    } else {
      this.debug().Error(this.__buildDebugDataPretty.name, 'missing data')
    }
    return toReturn;
  }
  private __drawStorageRaw(ourData: IOneStorageData[]) {
    this.debug().FuncStart('DrawStorageRaw');
    for (var idx = 0; idx < ourData.length; idx++) {
      this.debug().Log('key: \t' + ourData[idx].key);
      this.debug().Log('data: \t' + ourData[idx].data);
      this.debug().Log('------------');
    }
    this.debug().FuncEnd('DrawStorageRaw');
  }
  private __drawStoragePretty(ourData: IOneStorageData[]) {
    this.debug().FuncStart('DrawStoragePretty');

    this.Xyyz.FeedbackMan.ClearTextArea();
    for (var idx = 0; idx < ourData.length; idx++) {
      this.debug().Log('key: \t' + ourData[idx].key);
      var parsed: IDataOneWindowStorage = <IDataOneWindowStorage>JSON.parse(ourData[idx].data);
      if (parsed) {
        this.DrawDebugDataPretty(parsed);
        this.debug().Log('------------');
      }
    }
    this.debug().FuncEnd('DrawStoragePretty');
  }
  private __getAllLocalStorageAsIOneStorageData(): IOneStorageData[] {
    this.debug().FuncStart('__GetAllLocalStorage ');
    var toReturn: IOneStorageData[] = [];

    for (var idx = 0; idx < window.localStorage.length; idx++) {
      var candidate: IOneStorageData = {
        data: '',
        key: '',
      };

      candidate.key = window.localStorage.key(idx);

      if (candidate.key.startsWith(this.Const().Storage.WindowRoot)) {
        //this.debug().Log('candidate.key: ' + candidate.key);
        candidate.data = window.localStorage.getItem(candidate.key);
        toReturn.push(candidate);
      }
    }

    this.debug().FuncEnd('__GetAllLocalStorage ');
    return toReturn;
  }
  WriteToStorage(dataOneWindow: IDataOneWindowStorage) {
    this.debug().FuncStart(this.WriteToStorage);

    var snapShotAsString = JSON.stringify(dataOneWindow);
    this.debug().Log('snapShotAsString: ' + snapShotAsString);

    window.localStorage.setItem(this.Const().Storage.WindowRoot + dataOneWindow.Id.asString, snapShotAsString);

    this.UiMan().RefreshUi();

    this.debug().FuncEnd(this.WriteToStorage.name);
  }

  //GetAllStorageAsIOneStorageData(): IOneStorageData[] {
  //  this.debug().FuncStartName(this.GetAllStorageAsIOneStorageData.name);
  //  var toReturn: IOneStorageData[] = [];

  //  this.debug().FuncEndName(this.GetAllStorageAsIOneStorageData.name);
  //  return toReturn;

  //}
  GetAllStorageAsIDataOneWindow(): IDataOneWindowStorage[] {
    this.debug().FuncStart(this.GetAllStorageAsIDataOneWindow.name);
    var toReturn: IDataOneWindowStorage[] = [];
    var rawStorageData: IOneStorageData[] = this.__getAllLocalStorageAsIOneStorageData();
    if (rawStorageData) {
      for (var idx = 0; idx < rawStorageData.length; idx++) {
        var oneRaw: IOneStorageData = rawStorageData[idx];
        var candidate: IDataOneWindowStorage = <IDataOneWindowStorage>JSON.parse(oneRaw.data);

        //this.debug().Log('rawStorageData[idx].data : ' + rawStorageData[idx].data);

        if (candidate) {
          //this.debug().Log('candidate.AllCEAr.length : ' + candidate.AllCEAr.length);
          candidate.TimeStamp = new Date(candidate.TimeStamp);
          candidate.Id = this.Xyyz.GuidMan.ParseGuid(candidate.Id.asString);
          candidate.RawData = oneRaw;

          if (!candidate.WindowType) {
            candidate.WindowType = WindowType.Unknown;
            candidate.WindowFriendly = WindowType[candidate.WindowType];
          }

          if (!candidate.NickName) {
            candidate.NickName = '';
          }
          toReturn.push(candidate);
        }
      }
    }

    toReturn.sort((a: IDataOneWindowStorage, b: IDataOneWindowStorage) =>
      +b.TimeStamp - +a.TimeStamp
    );

    this.debug().FuncEnd(this.GetAllStorageAsIDataOneWindow.name);
    return toReturn;
  }
  RemoveOneFromStorage() {
    this.debug().FuncStart(this.RemoveOneFromStorage.name);

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
    //    this.debug().Log('Target Count: ' + targets.length);

    //    var countBefore: number = targets.length;

    //    for (var idx = 0; idx < targets.length; idx++) {
    //      this.debug().Log('idx: ' + idx);
    //      var oneTarget: IOneStorageData = targets[idx];
    //      this.debug().Log('key: ' + oneTarget.key);
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

    this.debug().FuncEnd(this.RemoveOneFromStorage.name);
  }
  DrawStorage() {
    this.debug().FuncStart('DrawStorage');
    try {
      var ourData: IOneStorageData[] = this.__getAllLocalStorageAsIOneStorageData();
      if (ourData) {
        this.__drawStorageRaw(ourData)
        this.__drawStoragePretty(ourData)
      }
    } catch (e) {
      xyyz.debug.Error(e.message);
    }
    this.debug().FuncEnd('DrawStorage');
  }
  GetRawFromStorageById(needleId: IGuid): IOneStorageData {
    this.debug().FuncStart(this.GetRawFromStorageById.name, needleId.asString);
    var toReturn: IOneStorageData = null;
    var foundStorage: IOneStorageData[] = this.__getAllLocalStorageAsIOneStorageData();
    if (foundStorage) {
      for (var idx = 0; idx < foundStorage.length; idx++) {
        var candidate = foundStorage[idx];
        //if (candidate.key === needleId) {
        //}
      }
    }
    this.debug().FuncEnd(this.GetRawFromStorageById.name);

    return toReturn;
  }

  GetFromStorageById(needleId: IGuid): IDataOneWindowStorage {
    this.debug().FuncStart(this.GetFromStorageById.name, needleId.asString);
    var foundStorage: IDataOneWindowStorage[] = this.GetAllStorageAsIDataOneWindow();
    var DateOneWinStoreMatch: IDataOneWindowStorage = null;

    if (foundStorage) {
      for (var idx = 0; idx < foundStorage.length; idx++) {
        var candidate = foundStorage[idx];
        if (candidate.Id.asString === needleId.asString) {
          DateOneWinStoreMatch = candidate;
          break;
        }
      }
    }
    if (DateOneWinStoreMatch) {
      this.debug().Log('found match', this.Utilites().TimeNicknameFavStr(DateOneWinStoreMatch));
    } else {
      this.debug().Error(this.GetFromStorageById.name, 'Match notfound')
    }

    this.debug().FuncEnd(this.GetFromStorageById.name);
    return DateOneWinStoreMatch;
  }
}