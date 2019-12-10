class OneWindowManager extends ManagerBase {
  __activeWindowSnapShot: IDataOneWindow;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStartName(OneWindowManager.name);

    xyyz.debug.FuncEndName(OneWindowManager.name);
  }

  SaveWindowState() {
    this.Xyyz.debug.FuncStartName(this.SaveWindowState.name);

    this.Xyyz.OneWindowMan.CreateNewWindowSnapShot();

    var currentPageType = this.Xyyz.PageData.GetCurrentPageType();

    if (currentPageType === PageType.ContentEditor) {
      this.Xyyz.debug.Log('is Content Editor');

      var id = this.Xyyz.GuidMan.EmptyGuid();
      var docElem = this.Xyyz.PageData.WinDataParent.Opener.Document;

      this.Xyyz.OneCEMan.SaveStateOneContentEditor(id, docElem);
    }
    else if (currentPageType === PageType.Desktop) {
      this.Xyyz.debug.Log('is Desktop');
      this.Xyyz.OneDesktopMan.SaveStateOneDesktop();
    } else {
      this.Xyyz.debug.Error(this.SaveWindowState.name, 'Invalid page location ' + currentPageType);
    }

    //this.PopulateStateSel();

    this.Xyyz.debug.FuncEndName(this.SaveWindowState.name);;
  }

  WaitForPageLoad(desiredPageType: PageType, targetWindow: IWindowData, iteration: number, successCallBack: Function) {
    this.Xyyz.debug.FuncStartName(this.WaitForPageLoad.name, 'Iteration: ' + iteration);
    this.Xyyz.debug.Log('desired type: ' + PageType[desiredPageType]);

    var targetPageType: PageType = this.Xyyz.PageData.GetPageTypeOfTargetWindow(targetWindow.Window);

    if (targetPageType !== desiredPageType) {
      var self = this;
      if (iteration > 0) {
        iteration = iteration - 1;
        setTimeout(function () {
          self.WaitForPageLoad(desiredPageType, targetWindow, iteration, successCallBack);
        }, 1000);
      }
    } else {
      successCallBack();
    }
    this.Xyyz.debug.FuncEndName(this.WaitForPageLoad.name);
  }

  RestoreWindowState(targetDoc: Document, treeIdx) {
    this.Xyyz.debug.ClearTextArea();
    this.Xyyz.debug.FuncStartName(this.RestoreWindowState.name);
    //this.Xyyz.debug.Log('s) LookAtExistingData: ' + treeIdx);

    var idOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();

    var foundMatch = this.AtticMan().GetFromStorageById(idOfSelect);

    if (foundMatch) {
      this.Xyyz.debug.Log('found match ' + foundMatch.TimeStamp);

      var newPage = this.Xyyz.PageData.WinDataParent.Opener.Window.open(this.Xyyz.PageData.WinDataParent.Opener.Window.location.href);

      var ChildPage: IWindowData = {
        Window: newPage
      }

      ChildPage.Window.location.href = this.Const().Url.ContentEditor;

      //wait for page to load
      var self = this;
      this.WaitForPageLoad(PageType.ContentEditor, ChildPage, 10,
        function () {
          self.Xyyz.OneCEMan.RestoreCEState(foundMatch.AllCEAr[0], ChildPage.Window.document);
        })

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
      this.Xyyz.debug.Error(this.RestoreWindowState.name, 'No match found for snap shot');
    }

    this.Xyyz.debug.FuncEndName(this.RestoreWindowState.name);
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

    this.AtticMan().DrawDebugDataPretty(this.__activeWindowSnapShot);

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
    this.AtticMan().WriteToStorage(this.__activeWindowSnapShot);
    this.UiMan().RefreshUi();
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
      NickName: '__',
      RawData: null
    }

    this.Xyyz.debug.FuncEndName('CreateNewWindowSnapShot');
  }
}