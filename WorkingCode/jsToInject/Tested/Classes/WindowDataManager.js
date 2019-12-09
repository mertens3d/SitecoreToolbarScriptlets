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
var WindowSnapShotManager = /** @class */ (function (_super) {
    __extends(WindowSnapShotManager, _super);
    function WindowSnapShotManager(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(WindowSnapShotManager.name);
        _this.CreateNewWindowTreeSnapShot();
        xyyz.debug.FuncEnd(WindowSnapShotManager.name);
        return _this;
    }
    WindowSnapShotManager.prototype.ClearStorage = function () {
        this.Xyyz.debug.FuncStart('ClearStorage');
        var result = confirm('Clear Local Storage for Xyyz b?');
        if (result === true) {
            var targets = this.__GetAllLocalStorage();
            if (targets) {
                this.Xyyz.debug.Log('Target Count: ' + targets.length);
                var countBefore = targets.length;
                for (var idx = 0; idx < targets.length; idx++) {
                    this.Xyyz.debug.Log('idx: ' + idx);
                    var oneTarget = targets[idx];
                    this.Xyyz.debug.Log('key: ' + oneTarget.key);
                    window.localStorage.removeItem(oneTarget.key);
                }
                targets = this.__GetAllLocalStorage();
                var countAfter = targets.length;
                alert('Count Before: ' + countBefore + ' Count After: ' + countAfter);
            }
            else {
                alert('No local storage was found for Xyyz');
            }
        }
        this.Xyyz.debug.FuncEnd('ClearStorage');
    };
    WindowSnapShotManager.prototype.__GetAllLocalStorage = function () {
        this.Xyyz.debug.FuncStart('__GetAllLocalStorage ');
        var toReturn = [];
        for (var idx = 0; idx < window.localStorage.length; idx++) {
            var candidate = {
                data: '',
                key: ''
            };
            candidate.key = window.localStorage.key(idx);
            this.Xyyz.debug.Log('candidate.key: ' + candidate.key);
            if (candidate.key.startsWith(this.Xyyz.InjectConst.Storage.WindowRoot)) {
                candidate.data = window.localStorage.getItem(candidate.key);
                toReturn.push(candidate);
            }
        }
        this.Xyyz.debug.FuncEnd('__GetAllLocalStorage ');
        return toReturn;
    };
    WindowSnapShotManager.prototype.__drawStorageRaw = function (ourData) {
        this.Xyyz.debug.FuncStart('DrawStorageRaw');
        for (var idx = 0; idx < ourData.length; idx++) {
            this.Xyyz.debug.Log('key: \t' + ourData[idx].key);
            this.Xyyz.debug.Log('data: \t' + ourData[idx].data);
            this.Xyyz.debug.Log('------------');
        }
        this.Xyyz.debug.FuncEnd('DrawStorageRaw');
    };
    WindowSnapShotManager.prototype.__drawStoragePretty = function (ourData) {
        this.Xyyz.debug.FuncStart('DrawStoragePretty');
        this.Xyyz.FeedbackMan.ClearTextArea();
        for (var idx = 0; idx < ourData.length; idx++) {
            this.Xyyz.debug.Log('key: \t' + ourData[idx].key);
            var parsed = JSON.parse(ourData[idx].data);
            if (parsed) {
                this.DrawDebugDataPretty(parsed);
                this.Xyyz.debug.Log('------------');
            }
        }
        this.Xyyz.debug.FuncEnd('DrawStoragePretty');
    };
    WindowSnapShotManager.prototype.DrawStorage = function () {
        this.Xyyz.debug.FuncStart('DrawStorage');
        try {
            var ourData = this.__GetAllLocalStorage();
            if (ourData) {
                this.__drawStorageRaw(ourData);
                this.__drawStoragePretty(ourData);
            }
        }
        catch (e) {
            xyyz.debug.Error(e.message);
        }
        this.Xyyz.debug.FuncEnd('DrawStorage');
    };
    WindowSnapShotManager.prototype.PutCEDataToCurrentSnapShot = function (oneCeData) {
        this.Xyyz.debug.FuncStart(this.PutCEDataToCurrentSnapShot.name);
        this.Xyyz.debug.Log('PutCEDataToCurrentSnapShot');
        var matchingCeData = this.FindMatchingCeData(oneCeData);
        if (matchingCeData) {
            matchingCeData = oneCeData;
        }
        else {
            this.__activeWindowSnapShot.AllCEAr.push(oneCeData);
        }
        //this.__activeWindowTreeSnapShot.ShowDebugDataOneWindow();
        this.UpdateStorage();
        this.DrawDebugDataPretty(null);
        this.Xyyz.debug.FuncEnd(this.PutCEDataToCurrentSnapShot.name);
    };
    WindowSnapShotManager.prototype.ShowDebugDataOneWindow = function () {
        this.Xyyz.debug.FuncStart('ShowDebugDataOneWindow');
        var toReturn = [];
        toReturn.push(this.__activeWindowSnapShot.TimeStamp.toJSON());
        for (var jdx = 0; jdx < this.__activeWindowSnapShot.AllCEAr.length; jdx++) {
            var oneCE = this.__activeWindowSnapShot.AllCEAr[jdx];
            toReturn = toReturn.concat(this.Xyyz.SnapShotOneContentEditorMan.GetDebugDataOneCE(oneCE));
        }
        for (var kdx = 0; kdx < toReturn.length; kdx++) {
            this.Xyyz.debug.Log(toReturn[kdx]);
        }
        this.Xyyz.debug.FuncEnd('ShowDebugDataOneWindow');
        return toReturn;
    };
    WindowSnapShotManager.prototype.UpdateStorage = function () {
        this.Xyyz.debug.FuncStart('UpdateStorage');
        //this.__activeWindowTreeSnapShot.ShowDebugDataOneWindow();
        var snapShotAsString = JSON.stringify(this.__activeWindowSnapShot);
        this.Xyyz.debug.Log('snapShotAsString: ' + snapShotAsString);
        window.localStorage.setItem(this.Xyyz.InjectConst.Storage.WindowRoot + this.__activeWindowSnapShot.Id, snapShotAsString);
        this.Xyyz.debug.FuncEnd('UpdateStorage');
    };
    WindowSnapShotManager.prototype.FindMatchingCeData = function (oneCeData) {
        var toReturn = null;
        for (var idx = 0; idx < this.__activeWindowSnapShot.AllCEAr.length; idx++) {
            var candidate = this.__activeWindowSnapShot.AllCEAr[idx];
            if (candidate.Id === oneCeData.Id) {
                toReturn = candidate;
                break;
            }
        }
        this.Xyyz.debug.Log('match found :' + (toReturn !== null));
        return toReturn;
    };
    WindowSnapShotManager.prototype.CreateNewWindowTreeSnapShot = function () {
        this.Xyyz.debug.FuncStart('CreateNewWindowTreeSnapShot');
        var dateToUse = new Date();
        //var friendly: string = this.Xyyz.Utilities.MakeFriendlyDate(dateToUse);
        this.__activeWindowSnapShot = {
            TimeStamp: dateToUse,
            //TimeStampFriendly: friendly,
            AllCEAr: [],
            Id: this.Xyyz.Utilities.Uuidv4()
        };
        this.Xyyz.debug.FuncEnd('CreateNewWindowTreeSnapShot');
    };
    WindowSnapShotManager.prototype.DrawDebugDataPretty = function (source) {
        var allDebugData = this.__buildDebugDataPretty(source);
        for (var ldx = 0; ldx < allDebugData.length; ldx++) {
            this.Xyyz.FeedbackMan.WriteLine(allDebugData[ldx]);
        }
        //this.Xyyz.debug.Log(JSON.stringify(this.__activeWindowSnapShot));
    };
    WindowSnapShotManager.prototype.__buildDebugDataPretty = function (source) {
        this.Xyyz.debug.FuncStart(this.__buildDebugDataPretty.name);
        if (!source) {
            source = this.__activeWindowSnapShot;
        }
        var toReturn = [];
        toReturn.push('------ One Window Snap Shot Start -----');
        toReturn.push('Id: ' + source.Id);
        toReturn.push('TimeStamp: ' + source.TimeStamp);
        toReturn.push('CE Count: ' + source.AllCEAr.length);
        for (var jdx = 0; jdx < source.AllCEAr.length; jdx++) {
            toReturn.push('\t------ One CE -----');
            var dataOneCE = source.AllCEAr[jdx];
            toReturn.push('\tId: ' + dataOneCE.Id);
            var allCeDebugDataAr = this.Xyyz.SnapShotOneContentEditorMan.GetDebugDataOneCE(dataOneCE);
            for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
                toReturn.push('\t\t' + allCeDebugDataAr[kdx]);
            }
        }
        toReturn.push('------ One Window Snap Shot End -----');
        this.Xyyz.debug.FuncEnd(this.__buildDebugDataPretty.name);
        return toReturn;
    };
    return WindowSnapShotManager;
}(SpokeBase));
//# sourceMappingURL=WindowDataManager.js.map