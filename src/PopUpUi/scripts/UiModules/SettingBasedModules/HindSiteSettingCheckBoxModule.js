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
exports.HindSiteSettingCheckBoxModule = void 0;
var StaticHelpers_1 = require("../../../../Shared/scripts/Classes/StaticHelpers");
var Guid_1 = require("../../../../Shared/scripts/Helpers/Guid");
var SharedConst_1 = require("../../../../Shared/scripts/SharedConst");
var Enabled_1 = require("../../../../Shared/scripts/Enums/Enabled");
var _SettingsBasedModulesBase_1 = require("./_SettingsBasedModulesBase");
//export namespace HindSiteUiLayer {
var HindSiteSettingCheckBoxModule = /** @class */ (function (_super) {
    __extends(HindSiteSettingCheckBoxModule, _super);
    function HindSiteSettingCheckBoxModule(logger, hindSiteSetting) {
        var _this = _super.call(this, logger, hindSiteSetting) || this;
        _this.Friendly = HindSiteSettingCheckBoxModule.name;
        return _this;
    }
    HindSiteSettingCheckBoxModule.prototype.Init_Module = function () {
        this.Logger.FuncStart(this.Init_Module.name, this.Friendly);
        this.Init_BaseSettingsBasedModule();
        this.Logger.FuncEnd(this.Init_Module.name, this.Friendly);
    };
    HindSiteSettingCheckBoxModule.prototype.WireEvents_Module = function () {
        var _this = this;
        this.Logger.FuncStart(this.WireEvents_Module.name, this.Friendly);
        if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined(this.UiInputElement)) {
            this.UiInputElement.addEventListener('change', function (evt) { return _this.OnCheckboxChanged(evt); });
        }
        else {
            this.Logger.WarningAndContinue(this.WireEvents_Module.name, 'null input element');
        }
        this.Logger.FuncEnd(this.WireEvents_Module.name, this.Friendly);
    };
    HindSiteSettingCheckBoxModule.prototype.OnCheckboxChanged = function (evt) {
        var newValue = evt.target.checked;
        var iUiElementChangeEvent_Payload = {
            ModuleKey: this.ModuleKey,
            HindSiteSetting: this.SettingJacket.HindSiteSetting,
            CheckBoxModule: {
                Checked: newValue,
                SettingKey: this.SettingJacket.HindSiteSetting.SettingKey
            },
            NumberModule: null,
            AccordianModule: null,
        };
        this.SettingJacket.HindSiteSetting.ValueAsObj = newValue;
        this.UiSettingBasedModuleMutationEvent_Subject.NotifyObservers(iUiElementChangeEvent_Payload);
    };
    HindSiteSettingCheckBoxModule.prototype.BuildHtmlForModule = function () {
        this.UiInputElement = document.createElement(SharedConst_1.SharedConst.Const.KeyWords.Html.Input);
        this.UiInputElement.type = SharedConst_1.SharedConst.Const.KeyWords.Html.Checkbox;
        this.UiInputElement.checked = this.SettingJacket.HindSiteSetting.ValueAsBool();
        this.UiInputElement.id = "id-" + Guid_1.Guid.WithoutDashes(Guid_1.Guid.NewRandomGuid());
        this.LabelElement = document.createElement(SharedConst_1.SharedConst.Const.KeyWords.Html.Label);
        this.LabelElement.innerHTML = this.SettingJacket.HindSiteSetting.FriendlySetting;
        this.LabelElement.setAttribute(SharedConst_1.SharedConst.Const.KeyWords.Html.For, this.UiInputElement.id);
        if (this.SettingJacket.HindSiteSetting.EnabledState !== Enabled_1.UiEnableState.Enabled) {
            this.UiInputElement.setAttribute('disabled', 'disabled');
            this.LabelElement.innerHTML = this.LabelElement.innerHTML + ' {disabled}';
        }
        if (this.ContainerUiDivElem) {
            this.ContainerUiDivElem.appendChild(this.UiInputElement);
            this.ContainerUiDivElem.appendChild(this.LabelElement);
        }
    };
    HindSiteSettingCheckBoxModule.prototype.RefreshUi_Module = function () {
        if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined(this.UiInputElement)) {
            var valueToDisplay = this.SettingJacket.HindSiteSetting.ValueAsBool();
            this.UiInputElement.checked = valueToDisplay;
        }
    };
    return HindSiteSettingCheckBoxModule;
}(_SettingsBasedModulesBase_1._SettingsBasedModulesBase));
exports.HindSiteSettingCheckBoxModule = HindSiteSettingCheckBoxModule;
//}
//# sourceMappingURL=HindSiteSettingCheckBoxModule.js.map