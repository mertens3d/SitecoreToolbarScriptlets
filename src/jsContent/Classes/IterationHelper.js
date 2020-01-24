"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var _ContentManagerBase_1 = require("../_first/_ContentManagerBase");
var IterationHelper = /** @class */ (function (_super) {
    __extends(IterationHelper, _super);
    function IterationHelper(xyyz, nickname, maxIterations) {
        if (maxIterations === void 0) { maxIterations = null; }
        var _this = _super.call(this, xyyz) || this;
        //xyyz.debug.FuncStart('ctor: ' + IterationHelper.name, nickname);
        if (!maxIterations) {
            maxIterations = _this.Const().IterHelper.MaxCount.Default;
        }
        _this.__maxIterations = maxIterations;
        _this.__currentIteration = maxIterations;
        _this.__timeout = xyyz.Const.IterHelper.Timeouts.Default;
        _this.__nickName = nickname;
        _this.IsExhausted = false;
        return _this;
        //xyyz.debug.FuncEnd('ctor: ' + IterationHelper.name);
    }
    IterationHelper.prototype.DecrementAndKeepGoing = function () {
        var toReturn = false;
        if (!this.MsgMan().OperationCancelled && this.__currentIteration > 0) {
            this.__currentIteration -= 1;
            this.__timeout += this.__timeout * this.Const().IterHelper.GrowthPerIteration;
            if (this.__timeout > this.Const().IterHelper.Timeouts.Max) {
                this.__timeout = this.Const().IterHelper.Timeouts.Max;
            }
            this.debug().Log('DecrementAndKeepGoing: ' + this.__nickName + ' ' + this.__currentIteration + ':' + this.__maxIterations + ' | timeout: ' + this.__timeout);
            toReturn = true;
        }
        else {
            this.IsExhausted = true;
            this.NotifyExhausted();
            toReturn = false;
        }
        return toReturn;
    };
    IterationHelper.prototype.NotifyExhausted = function () {
        this.debug().Log('Iteration: ' + this.__nickName + ' counter exhausted ' + this.__currentIteration + ':' + this.__maxIterations);
    };
    IterationHelper.prototype.WaitAndThen = function (timeoutFunction) {
        this.debug().FuncStart(this.WaitAndThen.name, this.__nickName + ' ' + timeoutFunction.name);
        var self = this;
        setTimeout(timeoutFunction(), self.__timeout);
        this.debug().FuncEnd(this.WaitAndThen.name, this.__nickName);
    };
    IterationHelper.prototype.Wait = function () {
        var _this = this;
        //self.debug().FuncStart(self.WaitAndThen.name, self.__nickName + ' ' + timeoutFunction.name);
        if (!this.MsgMan().OperationCancelled) {
            return new Promise(function (resolve) {
                setTimeout(resolve, _this.__timeout);
            });
        }
        //this.debug().FuncEnd(this.WaitAndThen.name, self.__nickName);
    };
    return IterationHelper;
}(_ContentManagerBase_1.ContentManagerBase));
exports.IterationHelper = IterationHelper;
//# sourceMappingURL=IterationHelper.js.map