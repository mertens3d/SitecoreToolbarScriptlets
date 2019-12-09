var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SnapShotOneWindow = /** @class */ (function (_super) {
    __extends(SnapShotOneWindow, _super);
    function SnapShotOneWindow(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(SnapShotOneWindow.name);
        xyyz.debug.FuncEnd(SnapShotOneWindow.name);
        return _this;
    }
    SnapShotOneWindow.prototype.Init = function () {
        this.Xyyz.debug.FuncStart('Start');
        var dateToUse = new Date();
        this.Xyyz.debug.Log('marker a');
        var friendly = this.Xyyz.Utilities.MakeFriendlyDate(dateToUse);
        this.Xyyz.debug.Log('marker b');
        var guid = this.Xyyz.Utilities.Uuidv4();
        this.Xyyz.debug.Log('marker c');
        var CurrentData = {
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
    };
    SnapShotOneWindow.prototype.ShowDebugDataOneWindow = function () {
        this.Xyyz.debug.FuncStart(this.ShowDebugDataOneWindow.name);
        var toReturn = [];
        toReturn.push(this.CurrentData.TimeStamp);
        for (var jdx = 0; jdx < this.CurrentData.AllCEAr.length; jdx++) {
            var oneCE = this.CurrentData.AllCEAr[jdx];
            toReturn.push(oneCE.GetDebugDataOneCE());
        }
        this.Xyyz.debug.FuncEnd(this.ShowDebugDataOneWindow.name);
        return toReturn;
    };
    return SnapShotOneWindow;
}(SpokeBase));
//# sourceMappingURL=SnapShot.OneWindow.js.map