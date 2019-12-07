class WindowTreeSnapShotManager {
  constructor() {
    this.CreateNewWindowTreeSnapShot();
  }

  PutCEDataToCurrentSnapShot(oneCeData) {
    xyyz.debug.FuncStart(this.PutCEDataToCurrentSnapShot.name + ' ' + JSON.stringify(oneCeData));

    var matchingCeData = this.FindMatchingCeData(oneCeData);

    if (matchingCeData) {
      matchingCeData = oneCeData;
    } else {
      this.__activeWindowTreeSnapShot.AllCEAr.push(oneCeData);
    }

    this.UpdateStorage();

    this.ShowDebugData();

    xyyz.debug.FuncEnd(this.PutCEDataToCurrentSnapShot.name);
  }

  UpdateStorage() {
    var snapShotAsString = JSON.stringify(this.__activeWindowTreeSnapShot);

    window.localStorage.setItem(xyyz.InjectConst.Storage.WindowRoot + this.__activeWindowTreeSnapShot.Id, snapShotAsString);
  }

  FindMatchingCeData(oneCeData) {
    var toReturn = null;

    for (var idx = 0; idx < this.__activeWindowTreeSnapShot.AllCEAr; idx++) {
      var candidate = this.__activeWindowTreeSnapShot.AllCEAr[idx];
      if (candidate.id === oneCeData.id) {
        toReturn = candidate;
        break;
      }
    }

    return toReturn;
  }

  CreateNewWindowTreeSnapShot() {
    this.__activeWindowTreeSnapShot = new SnapShotOneWindow();
  }

  ShowDebugData() {
    xyyz.debug.FuncStart(this.ShowDebugData.name);

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

      xyyz.debug.Log(allDebugData[ldx]);
    }

    xyyz.debug.FuncEnd(this.ShowDebugData.name);
  }
}