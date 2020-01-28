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
var PromiseRestoreDesktop = /** @class */ (function (_super) {
    __extends(PromiseRestoreDesktop, _super);
    function PromiseRestoreDesktop(xyyz) {
        var _this = this;
        xyyz.debug.FuncStart(OneDesktopManager.name);
        _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncEnd(OneDesktopManager.name);
        return _this;
    }
    PromiseRestoreDesktop.prototype.WaitForAndClickRedStartButtonPromise = function (promiseBucket) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.debug().FuncStart(_this.WaitForAndClickRedStartButtonPromise.name);
            var success = _this.DesktopMan().WaitForAndClickRedStartButtonWorker(promiseBucket.targetDoc);
            if (success) {
                resolve(promiseBucket);
            }
            else {
                reject();
            }
        });
    };
    return PromiseRestoreDesktop;
}(ManagerBase));
//# sourceMappingURL=PromisesRestoreDesktop.js.map