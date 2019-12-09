class WindowTreeSnapShotManager extends SpokeBase {
  __activeWindowTreeSnapShot: SnapShotOneWindow;
  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(WindowTreeSnapShotManager.name);
    this.CreateNewWindowTreeSnapShot();
    xyyz.debug.FuncEnd(WindowTreeSnapShotManager.name);
  }

  PutCEDataToCurrentSnapShot(oneCeData: SnapShotOneContentEditor) {
    this.Xyyz.debug.FuncStart(this.PutCEDataToCurrentSnapShot.name);
    this.Xyyz.debug.Log('PutCEDataToCurrentSnapShot');

    var matchingCeData = this.FindMatchingCeData(oneCeData);

    if (matchingCeData) {
      matchingCeData = oneCeData;
    } else {
      this.__activeWindowTreeSnapShot.CurrentData.AllCEAr.push(oneCeData);
      this.__activeWindowTreeSnapShot.ShowDebugDataOneWindow();
    }

    this.UpdateStorage();

    this.ShowDebugData();

    this.Xyyz.debug.FuncEnd(this.PutCEDataToCurrentSnapShot.name);
  }

  UpdateStorage() {
    this.Xyyz.debug.FuncStart('UpdateStorage');
    var snapShotAsString = JSON.stringify(this.__activeWindowTreeSnapShot);
    this.Xyyz.debug.Log('snapShotAsString: ' + snapShotAsString);

    window.localStorage.setItem(this.Xyyz.InjectConst.Storage.WindowRoot + this.__activeWindowTreeSnapShot.CurrentData.Id, snapShotAsString);
    this.Xyyz.debug.FuncEnd('UpdateStorage');
  }

  FindMatchingCeData(oneCeData: SnapShotOneContentEditor): SnapShotOneContentEditor {
    var toReturn: SnapShotOneContentEditor = null;

    for (var idx = 0; idx < this.__activeWindowTreeSnapShot.CurrentData.AllCEAr.length; idx++) {
      var candidate: SnapShotOneContentEditor = this.__activeWindowTreeSnapShot.CurrentData.AllCEAr[idx];
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
    this.__activeWindowTreeSnapShot = new SnapShotOneWindow(this.Xyyz);
    this.__activeWindowTreeSnapShot.Init();
    this.Xyyz.debug.FuncEnd('CreateNewWindowTreeSnapShot');
  }

  ShowDebugData() {
    this.Xyyz.debug.FuncStart(this.ShowDebugData.name);

    var allDebugData = [];

    allDebugData.push('------ One Window Snap Shot Start -----');
    allDebugData.push('Id: ' + this.__activeWindowTreeSnapShot.CurrentData.Id);
    allDebugData.push('TimeStamp: ' + this.__activeWindowTreeSnapShot.CurrentData.TimeStamp);
    allDebugData.push('CE Count: ' + this.__activeWindowTreeSnapShot.CurrentData.AllCEAr.length);
    for (var jdx = 0; jdx < this.__activeWindowTreeSnapShot.CurrentData.AllCEAr.length; jdx++) {
      allDebugData.push('------ One CE -----');
      var oneCE = this.__activeWindowTreeSnapShot.CurrentData.AllCEAr[jdx];
      allDebugData.push('Id: ' + oneCE.Id);

      var allCeDebugDataAr = oneCE.GetDebugDataOneCE();
      for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
        allDebugData.push(allCeDebugDataAr[kdx]);
      }
    }
    allDebugData.push('------ One Window Snap Shot End -----');

    for (var ldx = 0; ldx < allDebugData.length; ldx++) {
      this.Xyyz.debug.Log(allDebugData[ldx]);
    }

    this.Xyyz.debug.FuncEnd(this.ShowDebugData.name);
  }
}