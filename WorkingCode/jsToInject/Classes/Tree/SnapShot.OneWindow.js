class SnapShotOneWindow {
  constructor() {
    this.TimeStamp = new Date(),
      this.TimeStampFriendly = xyyz.Utilities.MakeFriendlyDate(this.TimeStamp),
      this.AllCEAr = [];
    this.Id = xyyz.Utilities.Uuidv4();
  }

  ShowDebugDataOneWindow() {
    xyyz.debug.FuncStart(this.ShowDebugDataOneWindow.name);
    var toReturn = [];

    toReturn.push(this.TimeStamp);
    for (var jdx = 0; jdx < this.AllCEAr.length; jdx++) {
      var oneCE = this.AllCEAr[jdx];
      toReturn.push(oneCE.GetDebugDataOneCE());
    }

    xyyz.debug.FuncEnd(this.ShowDebugDataOneWindow.name);
    return toReturn;
  }
}