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
exports.CancelButtonModule = void 0;
var ModuleKey_1 = require("../../../../Shared/scripts/Enums/ModuleKey");
var _baseButtonModule_1 = require("./_baseButtonModule");
var CancelButtonModule = /** @class */ (function (_super) {
    __extends(CancelButtonModule, _super);
    function CancelButtonModule(loggerAgent, menuCommandParameters) {
        var _this = _super.call(this, loggerAgent, menuCommandParameters) || this;
        _this.ModuleKey = ModuleKey_1.ModuleKey.ButtonCancel;
        _this.Logger = loggerAgent;
        return _this;
    }
    CancelButtonModule.prototype.WireEvents_Module = function () {
        this.WireEvents_Base();
    };
    CancelButtonModule.prototype.Init_Module = function () {
        this.Init_BaseButtonModule();
    };
    CancelButtonModule.prototype.BuildHtmlForModule = function () {
        this.BuildHtmlForModule_base_ButtonModule();
    };
    CancelButtonModule.prototype.RefreshUi_Module = function () {
    };
    CancelButtonModule.prototype.__GetCancelButton = function () {
        return this.ContainerUiDivElem;
    };
    CancelButtonModule.prototype.SetCancelFlag = function () {
        //todo this.OperationCancelled = true;
        var btn = this.__GetCancelButton();
        if (btn) {
            btn.classList.add('red');
        }
    };
    CancelButtonModule.prototype.ClearCancelFlag = function () {
        var btn = this.__GetCancelButton();
        if (btn) {
            btn.classList.remove('red');
        }
        //todo this.UiMan.OperationCancelled = false;
    };
    return CancelButtonModule;
}(_baseButtonModule_1._base_ButtonModule));
exports.CancelButtonModule = CancelButtonModule;
//# sourceMappingURL=CancelButtonModule.js.map