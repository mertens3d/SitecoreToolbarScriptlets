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
exports.ButtonBasedModulesBucket = void 0;
var LoggableBase_1 = require("../../../../Shared/scripts/LoggableBase");
var _2xxx_MenuCommand_1 = require("../../../../Shared/scripts/Enums/2xxx-MenuCommand");
var ModuleKey_1 = require("../../../../Shared/scripts/Enums/ModuleKey");
var CancelButtonModule_1 = require("./CancelButtonModule");
var CloseButtonModule_1 = require("./CloseButtonModule");
var InputWithButtonModule_1 = require("./InputWithButtonModule");
var TypCommandButtonModule_1 = require("./TypCommandButtonModule");
var ButtonBasedModulesBucket = /** @class */ (function (_super) {
    __extends(ButtonBasedModulesBucket, _super);
    function ButtonBasedModulesBucket(logger, commandMan) {
        var _this = _super.call(this, logger) || this;
        _this.AllButtonBasedModules = [];
        _this.Logger.CTORStart(ButtonBasedModulesBucket.name);
        _this.CommandDefinitionBucket = commandMan;
        _this.InstantiateButtonBasedModules();
        _this.Logger.CTOREnd(ButtonBasedModulesBucket.name);
        return _this;
    }
    ButtonBasedModulesBucket.prototype.InstantiateButtonBasedModules = function () {
        this.Logger.FuncStart(this.InstantiateButtonBasedModules.name);
        this.PopulateMenuButtons();
        try {
        }
        catch (err) {
            this.Logger.ErrorAndThrow(this.InstantiateButtonBasedModules.name, err);
        }
        this.Logger.FuncEnd(this.InstantiateButtonBasedModules.name);
    };
    ButtonBasedModulesBucket.prototype.PopulateMenuButtons = function () {
        var _this = this;
        this.Logger.FuncStart(this.PopulateMenuButtons.name);
        if (this.CommandDefinitionBucket && this.CommandDefinitionBucket.MenuCommandParamsAr) {
            this.CommandDefinitionBucket.MenuCommandParamsAr.forEach(function (menuCommandParams) {
                if (menuCommandParams.PlaceHolderSelector && menuCommandParams.PlaceHolderSelector.length > 0) {
                    if (menuCommandParams.ModuleKey == ModuleKey_1.ModuleKey.ButtonTypical) {
                        _this.AllButtonBasedModules.push(new TypCommandButtonModule_1.TypCommandButtonModule(_this.Logger, menuCommandParams));
                    }
                    else if (menuCommandParams.ModuleKey == ModuleKey_1.ModuleKey.ButtonWithInput) {
                        _this.AllButtonBasedModules.push(new InputWithButtonModule_1.InputWithButtonModule(_this.Logger, menuCommandParams));
                    }
                    else if (menuCommandParams.ModuleKey == ModuleKey_1.ModuleKey.ButtonClose) {
                        _this.AllButtonBasedModules.push(new CloseButtonModule_1.CloseButtonModule(_this.Logger, menuCommandParams));
                    }
                    else if (menuCommandParams.ModuleKey == ModuleKey_1.ModuleKey.ButtonCancel) {
                        _this.AllButtonBasedModules.push(new CancelButtonModule_1.CancelButtonModule(_this.Logger, menuCommandParams));
                    }
                }
                else {
                    _this.Logger.Log('No ui for this command: ' + _2xxx_MenuCommand_1.MenuCommandKey[menuCommandParams.MenuCommandKey]);
                }
            });
        }
        else {
            this.Logger.ErrorAndThrow(this.PopulateMenuButtons.name, 'no bucket or no array inside');
        }
        this.Logger.FuncEnd(this.PopulateMenuButtons.name);
    };
    return ButtonBasedModulesBucket;
}(LoggableBase_1.LoggableBase));
exports.ButtonBasedModulesBucket = ButtonBasedModulesBucket;
//# sourceMappingURL=ButtonBasedModules.js.map