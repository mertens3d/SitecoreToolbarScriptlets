interface ICurrentData {
  TimeStamp: Date,
  TimeStampFriendly: String,
  AllCEAr: SnapShotOneContentEditor[],
  Id: String
}


class SnapShotOneWindow extends SpokeBase {
  CurrentData: ICurrentData ;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(SnapShotOneWindow.name);
    
    xyyz.debug.FuncEnd(SnapShotOneWindow.name);
  }
  Init() {
    this.Xyyz.debug.FuncStart('Start');
    var dateToUse: Date = new Date();
    this.Xyyz.debug.Log('marker a');
    var friendly: string = this.Xyyz.Utilities.MakeFriendlyDate(dateToUse);
    this.Xyyz.debug.Log('marker b');
    var guid = this.Xyyz.Utilities.Uuidv4();
    this.Xyyz.debug.Log('marker c');

    var CurrentData: ICurrentData = {
      TimeStamp: dateToUse,
      TimeStampFriendly: friendly,
      AllCEAr: [],
      Id: guid
    };
    this.Xyyz.debug.Log('marker d');

    this.CurrentData = CurrentData;
    //this.CurrentData.TimeStamp = new Date();
    //this.Xyyz.debug.Log('mark a');
    //this.CurrentData.TimeStampFriendly = this.Xyyz.Utilities.MakeFriendlyDate(this.CurrentData.TimeStamp);
    //this.Xyyz.debug.Log('mark b');
    //this.CurrentData.AllCEAr = [];
    //this.Xyyz.debug.Log('mark c');
    //this.CurrentData.Id = this.Xyyz.Utilities.Uuidv4();
    this.Xyyz.debug.FuncEnd('Start');
  }
  ShowDebugDataOneWindow() {
    this.Xyyz.debug.FuncStart(this.ShowDebugDataOneWindow.name);
    var toReturn = [];

    toReturn.push(this.CurrentData.TimeStamp);
    for (var jdx = 0; jdx < this.CurrentData.AllCEAr.length; jdx++) {
      var oneCE = this.CurrentData.AllCEAr[jdx];
      toReturn.push(oneCE.GetDebugDataOneCE());
    }

    this.Xyyz.debug.FuncEnd(this.ShowDebugDataOneWindow.name);
    return toReturn;
  }
}