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
exports._SettingsBasedModulesBase = void 0;
var StaticHelpers_1 = require("../../../../Shared/scripts/Classes/StaticHelpers");
var _3xxx_SettingKey_1 = require("../../../../Shared/scripts/Enums/3xxx-SettingKey");
var _UiModuleBase_1 = require("../_UiModuleBase");
var UiSettingBasedModuleMutationEvent_Subject_1 = require("../../Events/UiSettingBasedModuleMutationEvent/UiSettingBasedModuleMutationEvent_Subject");
//export namespace HindSiteUiLayer {
var _SettingsBasedModulesBase = /** @class */ (function (_super) {
    __extends(_SettingsBasedModulesBase, _super);
    function _SettingsBasedModulesBase(logger, hindSiteSetting) {
        var _this = _super.call(this, logger, hindSiteSetting.HindSiteSetting.UiContainerSelector) || this;
        _this.Logger.CTORStart(_SettingsBasedModulesBase.name);
        if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined(hindSiteSetting)) {
            _this.SettingJacket = hindSiteSetting;
            _this.Friendly = _SettingsBasedModulesBase.name + '-' + _3xxx_SettingKey_1.SettingKey[hindSiteSetting.HindSiteSetting.SettingKey];
        }
        else {
            _this.Logger.ErrorAndThrow(_SettingsBasedModulesBase.name, 'Null settingsAgent or null hindSiteSetting');
        }
        _this.Logger.CTOREnd(_SettingsBasedModulesBase.name);
        return _this;
    }
    _SettingsBasedModulesBase.prototype.Init_BaseSettingsBasedModule = function () {
        this.Init_UiModuleBase();
        this.UiSettingBasedModuleMutationEvent_Subject = new UiSettingBasedModuleMutationEvent_Subject_1.UiSettingBasedModuleMutationEvent_Subject(this.Logger);
    };
    return _SettingsBasedModulesBase;
}(_UiModuleBase_1._UiModuleBase));
exports._SettingsBasedModulesBase = _SettingsBasedModulesBase;
//}
//# sourceMappingURL=_SettingsBasedModulesBase.js.map