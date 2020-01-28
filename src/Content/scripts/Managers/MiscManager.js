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
var MiscManager = /** @class */ (function (_super) {
    __extends(MiscManager, _super);
    function MiscManager(xyyz) {
        return _super.call(this, xyyz) || this;
    }
    MiscManager.prototype.NotNullOrUndefined = function (subjectAnyOrAr, label, iterationCheck) {
        if (label === void 0) { label = ''; }
        if (iterationCheck === void 0) { iterationCheck = null; }
        var toReturn = false;
        if (!iterationCheck) {
            iterationCheck = this.Const().MaxNullOrUndefinedIter;
        }
        iterationCheck -= 1;
        if (iterationCheck > 0) {
            if (label === '') {
                label = this.NotNullOrUndefined.name + ' : no labelprovided';
            }
            if (subjectAnyOrAr === 'undefined') {
                this.debug().Error(label, 'Is undefined');
            }
            else if (!subjectAnyOrAr) {
                this.debug().Error(label, 'Is Null');
            }
            else {
                this.debug().LogVal(label, 'Passed');
                toReturn = true;
                if (Array.isArray(subjectAnyOrAr)) {
                    for (var idx = 0; idx < subjectAnyOrAr.length; idx++) {
                        toReturn = toReturn && this.NotNullOrUndefined(subjectAnyOrAr[idx], (idx + 1) + ':' + subjectAnyOrAr.length + ' ' + label, iterationCheck);
                    }
                }
            }
        }
        else {
            this.debug().Error(this.NotNullOrUndefined.name, 'max iteration hit');
        }
        return toReturn;
    };
    return MiscManager;
}(_ContentManagerBase_1.ContentManagerBase));
exports.MiscManager = MiscManager;
//# sourceMappingURL=MiscManager.js.map