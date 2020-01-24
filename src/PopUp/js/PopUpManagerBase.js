"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PopUpManagerBase = /** @class */ (function () {
    function PopUpManagerBase(popHub) {
        this.PopHub = popHub;
    }
    PopUpManagerBase.prototype.UiMan = function () { return this.PopHub.UiMan; };
    PopUpManagerBase.prototype.debug = function () { return this.PopHub.debug; };
    return PopUpManagerBase;
}());
exports.PopUpManagerBase = PopUpManagerBase;
//# sourceMappingURL=PopUpManagerBase.js.map