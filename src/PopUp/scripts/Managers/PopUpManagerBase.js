"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PopUpManagerBase = /** @class */ (function () {
    function PopUpManagerBase(popHub) {
        this.PopHub = popHub;
    }
    PopUpManagerBase.prototype.Utilites = function () { return this.PopHub.Utilities; };
    PopUpManagerBase.prototype.UiMan = function () { return this.PopHub.UiMan; };
    PopUpManagerBase.prototype.debug = function () { return this.PopHub.debug; };
    PopUpManagerBase.prototype.PopConst = function () { return this.PopHub.PopUpConst; };
    PopUpManagerBase.prototype.MsgMan = function () { return this.PopHub.PopMsgMan; };
    PopUpManagerBase.prototype.PopAtticMan = function () { return this.PopHub.PopUpAtticMan; };
    //MsgFlag(): MessageFlag { return this.PopHub.MessageFlag; }
    PopUpManagerBase.prototype.GuidMan = function () { return this.PopHub.GuidMan; };
    PopUpManagerBase.prototype.SettingsMan = function () { return this.PopHub.SettingsMan; };
    return PopUpManagerBase;
}());
exports.PopUpManagerBase = PopUpManagerBase;
//# sourceMappingURL=PopUpManagerBase.js.map