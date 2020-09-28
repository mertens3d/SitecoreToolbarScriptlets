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
exports.UiCommandsManager = void 0;
var TypCommandButtonModule_1 = require("../UiModules/ButtonModules/TypCommandButtonModule");
var UiVisibilityTestAgent_1 = require("./UiManager/UiVisibilityTestAgent");
var ModuleKey_1 = require("../../../Shared/scripts/Enums/ModuleKey");
var LoggableBase_1 = require("../../../Shared/scripts/LoggableBase");
var UiCommandsManager = /** @class */ (function (_super) {
    __extends(UiCommandsManager, _super);
    function UiCommandsManager(logger, menuCommandParamsBucket, uiVisibilityTestAgent) {
        var _this = _super.call(this, logger) || this;
        _this.UiModules = [];
        _this.Logger.CTORStart(UiCommandsManager.name);
        _this.UiVisibilityTestAgent = uiVisibilityTestAgent;
        _this.MenuCommandParamsBucket = menuCommandParamsBucket;
        _this.Logger.CTOREnd(UiCommandsManager.name);
        return _this;
    }
    UiCommandsManager.prototype.Init_ButtonStateManager = function () {
        this.UiVisibilityTestAgent = new UiVisibilityTestAgent_1.UiVisibilityTestAgent(this.Logger);
        this.BuildCommandButtons();
    };
    UiCommandsManager.prototype.BuildCommandButtons = function () {
        var _this = this;
        if (this.MenuCommandParamsBucket) {
            this.MenuCommandParamsBucket.MenuCommandParamsAr.forEach(function (menuCommandParams) {
                if (menuCommandParams.ModuleKey === ModuleKey_1.ModuleKey.ButtonTypical) {
                    var typeButtonModule = new TypCommandButtonModule_1.TypCommandButtonModule(_this.Logger, menuCommandParams);
                    _this.UiModules.push(typeButtonModule);
                }
                else if (menuCommandParams.ModuleKey === ModuleKey_1.ModuleKey.ButtonClose) {
                }
            });
        }
        else {
            this.Logger.ErrorAndThrow(this.BuildCommandButtons.name, 'no bucket');
        }
    };
    UiCommandsManager.prototype.HydrateUi_UICommandManager = function (refreshData) {
        this.UiModules.forEach(function (uiModule) { return uiModule.Hydrate(refreshData); });
    };
    UiCommandsManager.prototype.RefreshUiModuleVisibilityStatus = function () {
        this.Logger.FuncStart(this.RefreshUiModuleVisibilityStatus.name, this.MenuCommandParamsBucket.MenuCommandParamsAr.length);
        this.UiModules.forEach(function (oneButtonModule) { return oneButtonModule.RefreshUi_Module(); });
        this.Logger.FuncEnd(this.RefreshUiModuleVisibilityStatus.name);
    };
    return UiCommandsManager;
}(LoggableBase_1.LoggableBase));
exports.UiCommandsManager = UiCommandsManager;
//# sourceMappingURL=UiCommandsManager.js.map