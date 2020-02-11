"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContentManagerBase = /** @class */ (function () {
    function ContentManagerBase(contentHub) {
        this.ContentHub = contentHub;
    }
    ContentManagerBase.prototype.AtticMan = function () { return this.ContentHub.AtticMan; };
    ContentManagerBase.prototype.Const = function () { return this.ContentHub.Const; };
    ContentManagerBase.prototype.debug = function () { return this.ContentHub.debug; };
    ContentManagerBase.prototype.DesktopMan = function () { return this.ContentHub.OneDesktopMan; };
    ContentManagerBase.prototype.GuidMan = function () { return this.ContentHub.GuidMan; };
    ContentManagerBase.prototype.locMan = function () { return this.ContentHub.LocationMan; };
    ContentManagerBase.prototype.OneCEMan = function () { return this.ContentHub.OneCEMan; };
    ContentManagerBase.prototype.OneWinMan = function () { return this.ContentHub.OneWindowMan; };
    ContentManagerBase.prototype.PageDataMan = function () { return this.ContentHub.PageDataMan; };
    ContentManagerBase.prototype.MsgMan = function () { return this.ContentHub.MsgMan; };
    ContentManagerBase.prototype.Utilites = function () { return this.ContentHub.Utilities; };
    ContentManagerBase.prototype.Factoryman = function () { return this.ContentHub.Factory; };
    ContentManagerBase.prototype.MiscMan = function () { return this.ContentHub.MiscMan; };
    ContentManagerBase.prototype.PromiseGen = function () { return this.ContentHub.PromiseGeneric; };
    ContentManagerBase.prototype.PromiseOneStep = function () { return this.ContentHub.PromiseOneStep; };
    ContentManagerBase.prototype.ScUiMan = function () { return this.ContentHub.SitecoreUiMan; };
    ContentManagerBase.prototype.MsgFlag = function () { return this.ContentHub.MessageFlag; };
    ContentManagerBase.prototype.PromiseHelper = function () { return this.ContentHub.PromiseHelper; };
    ContentManagerBase.prototype.SharedConst = function () { return this.ContentHub.SharedConst; };
    ContentManagerBase.prototype.ReadyForMessages = function () { return this.ContentHub.ReadyForMessages; };
    return ContentManagerBase;
}());
exports.ContentManagerBase = ContentManagerBase;
//# sourceMappingURL=_ContentManagerBase.js.map