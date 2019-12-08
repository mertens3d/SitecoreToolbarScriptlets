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
        _this.Start();
        xyyz.debug.FuncEnd(SnapShotOneWindow.name);
        return _this;
    }
    SnapShotOneWindow.prototype.Start = function () {
        this.Xyyz.debug.FuncStart(this.Start.name);
        this.TimeStamp = new Date();
        this.TimeStampFriendly = this.Xyyz.Utilities.MakeFriendlyDate(this.TimeStamp);
        this.AllCEAr = [];
        this.Id = this.Xyyz.Utilities.Uuidv4();
        this.Xyyz.debug.FuncEnd(this.Start.name);
    };
    SnapShotOneWindow.prototype.ShowDebugDataOneWindow = function () {
        this.Xyyz.debug.FuncStart(this.ShowDebugDataOneWindow.name);
        var toReturn = [];
        toReturn.push(this.TimeStamp);
        for (var jdx = 0; jdx < this.AllCEAr.length; jdx++) {
            var oneCE = this.AllCEAr[jdx];
            toReturn.push(oneCE.GetDebugDataOneCE());
        }
        this.Xyyz.debug.FuncEnd(this.ShowDebugDataOneWindow.name);
        return toReturn;
    };
    return SnapShotOneWindow;
}(SpokeBase));
//# sourceMappingURL=SnapShot.OneWindow.js.map