class WindowTreeSnapShotManager extends SpokeBase {
  __activeWindowTreeSnapShot: SnapShotOneWindow;
  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(WindowTreeSnapShotManager.name);
    this.CreateNewWindowTreeSnapShot();
    xyyz.debug.FuncEnd(WindowTreeSnapShotManager.name);
  }

  PutCEDataToCurrentSnapShot(oneCeData) {
    this.Xyyz.debug.FuncStart(this.PutCEDataToCurrentSnapShot.name + ' ' + JSON.stringify(oneCeData));

    var matchingCeData = this.FindMatchingCeData(oneCeData);

    if (matchingCeData) {
      matchingCeData = oneCeData;
    } else {
      this.__activeWindowTreeSnapShot.AllCEAr.push(oneCeData);
    }

    this.UpdateStorage();

    this.ShowDebugData();

    this.Xyyz.debug.FuncEnd(this.PutCEDataToCurrentSnapShot.name);
  }

  UpdateStorage() {
    var snapShotAsString = JSON.stringify(this.__activeWindowTreeSnapShot);

    window.localStorage.setItem(this.Xyyz.InjectConst.Storage.WindowRoot + this.__activeWindowTreeSnapShot.Id, snapShotAsString);
  }

  FindMatchingCeData(oneCeData) {
    var toReturn = null;

    for (var idx = 0; idx < this.__activeWindowTreeSnapShot.AllCEAr.length; idx++) {
      var candidate = this.__activeWindowTreeSnapShot.AllCEAr[idx];
      if (candidate.id === oneCeData.id) {
        toReturn = candidate;
        break;
      }
    }

    return toReturn;
  }

  CreateNewWindowTreeSnapShot() {
    this.Xyyz.debug.FuncStart(this.CreateNewWindowTreeSnapShot.name);
    this.__activeWindowTreeSnapShot = new SnapShotOneWindow(this.Xyyz);
    this.Xyyz.debug.FuncEnd(this.CreateNewWindowTreeSnapShot.name);
  }

  ShowDebugData() {
    this.Xyyz.debug.FuncStart(this.ShowDebugData.name);

    var allDebugData = [];

    allDebugData.push('------ One Window Snap Shot Start -----');
    allDebugData.push('Id: ' + this.__activeWindowTreeSnapShot.Id);
    allDebugData.push('TimeStamp: ' + this.__activeWindowTreeSnapShot.TimeStamp);
    allDebugData.push('CE Count: ' + this.__activeWindowTreeSnapShot.AllCEAr.length);
    for (var jdx = 0; jdx < this.__activeWindowTreeSnapShot.AllCEAr.length; jdx++) {
      allDebugData.push('------ One CE -----');
      var oneCE = this.__activeWindowTreeSnapShot.AllCEAr[jdx];
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