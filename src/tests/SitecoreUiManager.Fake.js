"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SitecoreUiManagerFake = /** @class */ (function () {
    function SitecoreUiManagerFake(debug) {
        debug.FuncStart(SitecoreUiManagerFake.name);
        debug.FuncEnd(SitecoreUiManagerFake.name);
    }
    SitecoreUiManagerFake.prototype.AssignOnClickEvent = function (targetId, handler) {
        //do nothing
    };
    SitecoreUiManagerFake.prototype.AssignOnChangeEvent = function (targetId, handler) {
        //do nothing
    };
    SitecoreUiManagerFake.prototype.AssignDblClickEvent = function (targetId, handler) {
        //do nothing
    };
    SitecoreUiManagerFake.prototype.AssignMenuWindowChanged = function () {
    };
    return SitecoreUiManagerFake;
}());
exports.SitecoreUiManagerFake = SitecoreUiManagerFake;
//# sourceMappingURL=SitecoreUiManager.Fake.js.map