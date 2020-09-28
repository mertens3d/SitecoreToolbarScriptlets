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
exports.SettingsBasedModules = void 0;
var LoggableBase_1 = require("../../../../Shared/scripts/LoggableBase");
var SettingType_1 = require("../../../../Shared/scripts/Enums/SettingType");
var UiPresence_1 = require("../../../../Shared/scripts/Enums/UiPresence");
var AccordianModule_1 = require("./AccordianModule");
var HindSiteSettingCheckBoxModule_1 = require("./HindSiteSettingCheckBoxModule");
var HindSiteSettingNumberModule_1 = require("./HindSiteSettingNumberModule");
var _3xxx_SettingKey_1 = require("../../../../Shared/scripts/Enums/3xxx-SettingKey");
var ModuleKey_1 = require("../../../../Shared/scripts/Enums/ModuleKey");
var SettingsBasedModules = /** @class */ (function (_super) {
    __extends(SettingsBasedModules, _super);
    function SettingsBasedModules(logger, settingsAgent) {
        var _this = _super.call(this, logger) || this;
        _this.Logger.CTORStart(SettingsBasedModules.name);
        _this.SettingsAgent = settingsAgent;
        _this.DebuggingEnabled = _this.SettingsAgent.GetByKey(_3xxx_SettingKey_1.SettingKey.EnableDebugging).ValueAsBool();
        _this.Instantiate_SettingsBasedModules();
        _this.Logger.CTOREnd(SettingsBasedModules.name);
        return _this;
    }
    SettingsBasedModules.prototype.Instantiate_SettingsBasedModules = function () {
        this.Logger.FuncStart(this.Instantiate_SettingsBasedModules.name);
        this.CheckBoxModules = this.BuildCheckBoxSettingModules();
        this.NumberModules = this.BuildNumberSettingModules();
        this.AccordianModules = this.BuildAccordianModules();
        this.Logger.FuncEnd(this.Instantiate_SettingsBasedModules.name);
    };
    SettingsBasedModules.prototype.BuildAccordianModules = function () {
        var _this = this;
        var toReturn = [];
        this.SettingsAgent.HindSiteSettingsBucket.SettingWrappers.forEach(function (settingWrapper) {
            var isNormalAccordian = settingWrapper.HindSiteSetting.ModuleType === ModuleKey_1.ModuleKey.AccordionTypical;
            var isDebuggingAccordian = settingWrapper.HindSiteSetting.ModuleType === ModuleKey_1.ModuleKey.AccordionDebugging;
            if (isNormalAccordian || isDebuggingAccordian) {
                var accordianModule = new AccordianModule_1.AccordianModule(_this.Logger, settingWrapper);
                toReturn.push(accordianModule);
                if (isNormalAccordian || (isDebuggingAccordian && _this.DebuggingEnabled)) {
                }
                else {
                    accordianModule.DisableSelf();
                }
            }
        });
        return toReturn;
    };
    SettingsBasedModules.prototype.BuildCheckBoxSettingModules = function () {
        var _this = this;
        var toReturn = [];
        this.SettingsAgent.HindSiteSettingsBucket.SettingWrappers.forEach(function (settingWrapper) {
            if (settingWrapper.HindSiteSetting.DataType === SettingType_1.SettingType.BoolCheckBox && settingWrapper.HindSiteSetting.HasUi === UiPresence_1.UiPresence.HasUi) {
                var hindSiteCheckboxSetting = new HindSiteSettingCheckBoxModule_1.HindSiteSettingCheckBoxModule(_this.Logger, settingWrapper);
                toReturn.push(hindSiteCheckboxSetting);
            }
        });
        return toReturn;
    };
    SettingsBasedModules.prototype.BuildNumberSettingModules = function () {
        var _this = this;
        var toReturn = [];
        this.SettingsAgent.HindSiteSettingsBucket.SettingWrappers.forEach(function (settingWrapper) {
            if (settingWrapper.HindSiteSetting.DataType === SettingType_1.SettingType.Number && settingWrapper.HindSiteSetting.HasUi === UiPresence_1.UiPresence.HasUi) {
                var hindSiteCheckboxSetting = new HindSiteSettingNumberModule_1.HindSiteSettingNumberModule(_this.Logger, settingWrapper);
                toReturn.push(hindSiteCheckboxSetting);
            }
        });
        return toReturn;
    };
    return SettingsBasedModules;
}(LoggableBase_1.LoggableBase));
exports.SettingsBasedModules = SettingsBasedModules;
//# sourceMappingURL=SettingsBasedModules.js.map