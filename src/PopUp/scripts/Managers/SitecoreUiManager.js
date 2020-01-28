"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SitecoreUiManager = /** @class */ (function () {
    function SitecoreUiManager(debug) {
        debug.FuncStart(SitecoreUiManager.name);
        this.debug = debug;
        debug.FuncEnd(SitecoreUiManager.name);
    }
    SitecoreUiManager.prototype.AssignMenuWindowChanged = function (handler) {
        window.addEventListener('click', function (evt) { handler(); });
        window.addEventListener('resize', function (evt) { handler(); });
        //window.onclick = () => {
        //  alert('changed');
        //}
    };
    return SitecoreUiManager;
}());
exports.SitecoreUiManager = SitecoreUiManager;
//# sourceMappingURL=SitecoreUiManager.js.map