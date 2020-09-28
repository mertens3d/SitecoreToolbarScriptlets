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
exports.CloseButtonModule = void 0;
var _baseButtonModule_1 = require("./_baseButtonModule");
var StaticHelpers_1 = require("../../../../Shared/scripts/Classes/StaticHelpers");
var _2xxx_MenuCommand_1 = require("../../../../Shared/scripts/Enums/2xxx-MenuCommand");
var ModuleKey_1 = require("../../../../Shared/scripts/Enums/ModuleKey");
var CloseButtonModule = /** @class */ (function (_super) {
    __extends(CloseButtonModule, _super);
    function CloseButtonModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ModuleKey = ModuleKey_1.ModuleKey.ButtonClose;
        return _this;
    }
    CloseButtonModule.prototype.RefreshUi_Module = function () {
    };
    CloseButtonModule.prototype.Init_Module = function () {
        this.Init_BaseButtonModule();
    };
    CloseButtonModule.prototype.BuildHtmlForModule = function () {
        this.BuildHtmlForModule_base_ButtonModule();
        this.BuildElements();
    };
    CloseButtonModule.prototype.WireEvents_Module = function () {
        this.WireEvents_Base();
    };
    CloseButtonModule.prototype.GetCommandKey = function () {
        return this.MenuCommandDefinition.MenuCommandKey;
    };
    CloseButtonModule.prototype.BuildElements = function () {
        this.Logger.FuncStart(this.BuildElements.name, this.MenuCommandDefinition.InnerText + ' ' + _2xxx_MenuCommand_1.MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey]);
        if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined(this.ContainerUiDivElem)) {
            this.ContainerUiDivElem.appendChild(this.HTMLButtonElement);
        }
        else {
            this.Logger.ErrorAndContinue(CloseButtonModule.name, 'Could not find ' + this.MenuCommandDefinition.PlaceHolderSelector);
        }
        this.Logger.FuncEnd(this.BuildElements.name);
    };
    return CloseButtonModule;
}(_baseButtonModule_1._base_ButtonModule));
exports.CloseButtonModule = CloseButtonModule;
//# sourceMappingURL=CloseButtonModule.js.map