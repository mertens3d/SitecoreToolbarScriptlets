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
console.log('EventManager loaded');
var EventManager = /** @class */ (function (_super) {
    __extends(EventManager, _super);
    function EventManager(xyyz) {
        return _super.call(this, xyyz) || this;
    }
    EventManager.prototype.WireMenuButtons = function () {
        this.Xyyz.debug.FuncStart(EventManager.name + ' ' + this.WireMenuButtons.name);
        var thisObj = this;
        document.getElementById('btnEdit').onclick = function () {
            thisObj.Xyyz.LocationMan.SetScMode('edit');
        };
        document.getElementById('btnPrev').onclick = function () {
            thisObj.Xyyz.LocationMan.SetScMode('preview');
        };
        document.getElementById('btnNorm').onclick = function () {
            thisObj.Xyyz.LocationMan.SetScMode('normal');
        };
        document.getElementById('btnAdminB').onclick = function () {
            thisObj.Xyyz.LocationMan.AdminB();
        };
        document.getElementById('btnDesktop').onclick = function () {
            thisObj.Xyyz.LocationMan.ChangeLocation(PageType.Desktop);
        };
        document.getElementById('btnCE').onclick = function () {
            thisObj.Xyyz.LocationMan.ChangeLocation(PageType.ContentEditor);
        };
        document.getElementById('btnSaveTheTrees').onclick = function () {
            thisObj.Xyyz.OneWindowMan.SaveWindowState();
        };
        document.getElementById('btnPlantTheTrees').onclick = function () {
            thisObj.Xyyz.OneDesktopMan.PlantTheTrees(window.opener.document, 0);
        };
        document.getElementById('btnDrawLocalStorage').onclick = function () {
            thisObj.Xyyz.OneWindowMan.DrawStorage();
        };
        document.getElementById('btnClearLocalStorage').onclick = function () {
            thisObj.Xyyz.OneWindowMan.ClearStorage();
        };
        document.getElementById('btnClearTextArea').onclick = function () {
            thisObj.Xyyz.debug.ClearTextArea();
        };
        this.Xyyz.debug.FuncEnd(this.WireMenuButtons.name);
    };
    ;
    return EventManager;
}(ManagerBase));
//# sourceMappingURL=EventManager.js.map