class OneWindowManager extends ManagerBase {
  __activeWindowSnapShot: IDataOneWindowStorage;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(OneWindowManager.name);

    xyyz.debug.FuncEnd(OneWindowManager.name);
  }

  SaveWindowState(targetWindow: IDataBroswerWindow) {
    this.debug().FuncStart(this.SaveWindowState.name);

    this.Xyyz.OneWindowMan.CreateNewWindowSnapShot();

    var currentPageType = this.PageDataMan().GetCurrentPageType();

    if (currentPageType === WindowType.ContentEditor) {
      this.debug().Log('is Content Editor');

      var id = this.Xyyz.GuidMan.EmptyGuid();
      var docElem = targetWindow.DataDocSelf;

      this.Xyyz.OneCEMan.SaveStateOneContentEditor(id, targetWindow.DataDocSelf);
    }
    else if (currentPageType === WindowType.Desktop) {
      this.debug().Log('is Desktop');
      this.Xyyz.OneDesktopMan.SaveStateOneDesktop(targetWindow);
    } else {
      this.debug().Error(this.SaveWindowState.name, 'Invalid page location ' + currentPageType);
    }

    //this.PopulateStateSel();

    this.debug().FuncEnd(this.SaveWindowState.name);;
  }

  //WaitForPageLoad(desiredPageType: WindowType, targetWindow: IDataBroswerWindow, iteration: number, successCallBack: Function) {
  //  this.debug().FuncStart(this.WaitForPageLoad.name, 'Iteration: ' + iteration + ' | Desired type: ' + WindowType[desiredPageType]);

  //  var targetPageType: WindowType = this.PageDataMan().GetPageTypeOfTargetWindow(targetWindow.Window);

  //  if (targetPageType !== desiredPageType) {
  //    var self = this;
  //    if (iteration > 0) {
  //      iteration = iteration - 1;
  //      setTimeout(function () {
  //        self.WaitForPageLoad(desiredPageType, targetWindow, iteration, successCallBack);
  //      }, self.Const().Timeouts.WaitFogPageLoad);
  //    }
  //  } else {
  //    this.debug().Log('success, triggering callback: ' + successCallBack.name);
  //    successCallBack();
  //  }
  //  this.debug().FuncEnd(this.WaitForPageLoad.name);
  //}

  RestoreWindowStateToTarget(targetWindow: IDataBroswerWindow, dataToREstore: IDataOneWindowStorage) {
    this.debug().FuncStart(this.RestoreWindowStateToTarget.name);

    //targetWindow.Window.location.href = 'https:\\bing.com?dog=3';

    if (dataToREstore) {

      //var postPageLoadCallback: Function = function () {


        this.Xyyz.OneCEMan.RestoreCEState(dataToREstore.AllCEAr[0], targetWindow.DataDocSelf);
      //};

      //this.WaitForPageLoad(WindowType.ContentEditor, targetWindow, this.Const().Iterations.MaxIterationPageLoad, postPageLoadCallback)

      //if (this.Xyyz.PageData.GetCurrentPageType() === PageType.ContentEditor) {
      //  if (foundMatch.AllCEAr.length > 1) {
      //    alert('This data has multiple Content Editor data. Only the first will be used');
      //  }

      //  this.Xyyz.OneCEMan.RestoreCEState(foundMatch.AllCEAr[0], this.Xyyz.PageData.OpenerDoc());
      //} else {
      //  this.Xyyz.OneDesktopMan.RestoreDesktopState(foundMatch);
      //}

      //var allData = this.Xyyz.OneDesktopMan.GetAllLiveIframeData()[treeIdx];
    } else {
      this.debug().Error(this.RestoreWindowStateToTarget.name, 'No match found for snap shot');
    }
    this.debug().FuncEnd(this.RestoreWindowStateToTarget.name);
  }

  PutCEDataToCurrentSnapShot(oneCeData: IDataOneStorageCE) {
    this.debug().FuncStart(this.PutCEDataToCurrentSnapShot.name);
    this.debug().Log('PutCEDataToCurrentSnapShot');

    var matchingCeData = this.FindMatchingCeData(oneCeData);

    if (matchingCeData) {
      matchingCeData = oneCeData;
    } else {
      this.__activeWindowSnapShot.AllCEAr.push(oneCeData);
    }

    //this.__activeWindowTreeSnapShot.ShowDebugDataOneWindow();

    this.UpdateStorage();

    this.AtticMan().DrawDebugDataPretty(this.__activeWindowSnapShot);

    this.debug().FuncEnd(this.PutCEDataToCurrentSnapShot.name);
  }
  ShowDebugDataOneWindow() {
    this.debug().FuncStart('ShowDebugDataOneWindow');
    var toReturn: string[] = [];

    toReturn.push(this.__activeWindowSnapShot.TimeStamp.toJSON());
    for (var jdx = 0; jdx < this.__activeWindowSnapShot.AllCEAr.length; jdx++) {
      var oneCE = this.__activeWindowSnapShot.AllCEAr[jdx];
      toReturn = toReturn.concat(this.Xyyz.OneCEMan.GetDebugDataOneCE(oneCE));
    }

    for (var kdx = 0; kdx < toReturn.length; kdx++) {
      this.debug().Log(toReturn[kdx]);
    }

    this.debug().FuncEnd('ShowDebugDataOneWindow');
    return toReturn;
  }

  UpdateStorage() {
    this.debug().FuncStart('UpdateStorage');
    this.AtticMan().WriteToStorage(this.__activeWindowSnapShot);
    this.UiMan().RefreshUi();
    this.debug().FuncEnd('UpdateStorage');
  }

  FindMatchingCeData(oneCeData: IDataOneStorageCE): IDataOneStorageCE {
    var toReturn: IDataOneStorageCE = null;

    for (var idx = 0; idx < this.__activeWindowSnapShot.AllCEAr.length; idx++) {
      var candidate: IDataOneStorageCE = this.__activeWindowSnapShot.AllCEAr[idx];
      if (candidate.Id === oneCeData.Id) {
        toReturn = candidate;
        break;
      }
    }

    this.debug().Log('match found :' + (toReturn !== null));
    return toReturn;
  }

  Init() {
    this.CreateNewWindowSnapShot();
  }
  CreateNewWindowSnapShot() {
    this.debug().FuncStart('CreateNewWindowSnapShot');

    var dateToUse: Date = new Date();
    //var friendly: string = this.Xyyz.Utilities.MakeFriendlyDate(dateToUse);

    var newGuid = this.Xyyz.GuidMan.NewGuid();

    this.__activeWindowSnapShot = {
      TimeStamp: dateToUse,
      //TimeStampFriendly: friendly,
      AllCEAr: [],
      Id: newGuid,
      IsFavorite: false,
      NickName: '__',
      RawData: null
    }

    this.debug().FuncEnd('CreateNewWindowSnapShot');
  }
}