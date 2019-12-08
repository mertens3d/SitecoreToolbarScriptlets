var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WindowTreeSnapShotManager = /** @class */ (function (_super) {
    __extends(WindowTreeSnapShotManager, _super);
    function WindowTreeSnapShotManager(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(WindowTreeSnapShotManager.name);
        _this.CreateNewWindowTreeSnapShot();
        xyyz.debug.FuncEnd(WindowTreeSnapShotManager.name);
        return _this;
    }
    WindowTreeSnapShotManager.prototype.PutCEDataToCurrentSnapShot = function (oneCeData) {
        this.Xyyz.debug.FuncStart(this.PutCEDataToCurrentSnapShot.name + ' ' + JSON.stringify(oneCeData));
        var matchingCeData = this.FindMatchingCeData(oneCeData);
        if (matchingCeData) {
            matchingCeData = oneCeData;
        }
        else {
            this.__activeWindowTreeSnapShot.AllCEAr.push(oneCeData);
        }
        this.UpdateStorage();
        this.ShowDebugData();
        this.Xyyz.debug.FuncEnd(this.PutCEDataToCurrentSnapShot.name);
    };
    WindowTreeSnapShotManager.prototype.UpdateStorage = function () {
        var snapShotAsString = JSON.stringify(this.__activeWindowTreeSnapShot);
        window.localStorage.setItem(this.Xyyz.InjectConst.Storage.WindowRoot + this.__activeWindowTreeSnapShot.Id, snapShotAsString);
    };
    WindowTreeSnapShotManager.prototype.FindMatchingCeData = function (oneCeData) {
        var toReturn = null;
        for (var idx = 0; idx < this.__activeWindowTreeSnapShot.AllCEAr.length; idx++) {
            var candidate = this.__activeWindowTreeSnapShot.AllCEAr[idx];
            if (candidate.id === oneCeData.id) {
                toReturn = candidate;
                break;
            }
        }
        return toReturn;
    };
    WindowTreeSnapShotManager.prototype.CreateNewWindowTreeSnapShot = function () {
        this.Xyyz.debug.FuncStart(this.CreateNewWindowTreeSnapShot.name);
        this.__activeWindowTreeSnapShot = new SnapShotOneWindow(this.Xyyz);
        this.Xyyz.debug.FuncEnd(this.CreateNewWindowTreeSnapShot.name);
    };
    WindowTreeSnapShotManager.prototype.ShowDebugData = function () {
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
    };
    return WindowTreeSnapShotManager;
}(SpokeBase));
//# sourceMappingURL=TreeDataManager.js.map