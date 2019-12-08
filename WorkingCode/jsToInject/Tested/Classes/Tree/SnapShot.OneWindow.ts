class SnapShotOneWindow extends SpokeBase {
  TimeStamp: Date;
  TimeStampFriendly: String;

  AllCEAr: any[];
  Id: any;
  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(SnapShotOneWindow.name);
    this.Start();
    xyyz.debug.FuncEnd(SnapShotOneWindow.name);
  }
  Start() {
    this.Xyyz.debug.FuncStart(this.Start.name);
    this.TimeStamp = new Date();
    this.TimeStampFriendly = this.Xyyz.Utilities.MakeFriendlyDate(this.TimeStamp);
    this.AllCEAr = [];
    this.Id = this.Xyyz.Utilities.Uuidv4();
    this.Xyyz.debug.FuncEnd(this.Start.name);
  }
  ShowDebugDataOneWindow() {
    this.Xyyz.debug.FuncStart(this.ShowDebugDataOneWindow.name);
    var toReturn = [];

    toReturn.push(this.TimeStamp);
    for (var jdx = 0; jdx < this.AllCEAr.length; jdx++) {
      var oneCE = this.AllCEAr[jdx];
      toReturn.push(oneCE.GetDebugDataOneCE());
    }

    this.Xyyz.debug.FuncEnd(this.ShowDebugDataOneWindow.name);
    return toReturn;
  }
}