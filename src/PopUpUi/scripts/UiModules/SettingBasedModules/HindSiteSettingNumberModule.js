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
exports.HindSiteSettingNumberModule = void 0;
var StaticHelpers_1 = require("../../../../Shared/scripts/Classes/StaticHelpers");
var Guid_1 = require("../../../../Shared/scripts/Helpers/Guid");
var SharedConst_1 = require("../../../../Shared/scripts/SharedConst");
var _SettingsBasedModulesBase_1 = require("./_SettingsBasedModulesBase");
var HindSiteSettingNumberModule = /** @class */ (function (_super) {
    __extends(HindSiteSettingNumberModule, _super);
    function HindSiteSettingNumberModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Friendly = HindSiteSettingNumberModule.name;
        return _this;
    }
    HindSiteSettingNumberModule.prototype.Init_Module = function () {
        this.Init_BaseSettingsBasedModule();
    };
    HindSiteSettingNumberModule.prototype.BuildHtmlForModule = function () {
        this.UiInputElement = document.createElement(SharedConst_1.SharedConst.Const.KeyWords.Html.Input);
        this.UiInputElement.id = 'nm-' + Guid_1.Guid.WithoutDashes(Guid_1.Guid.NewRandomGuid());
        this.UiInputElement.type = SharedConst_1.SharedConst.Const.KeyWords.Html.Number;
        var hindsiteSettingForNumbers = this.SettingJacket.HindSiteSetting;
        if (hindsiteSettingForNumbers) {
            this.UiInputElement.min = hindsiteSettingForNumbers.Min.toString();
            this.UiInputElement.max = hindsiteSettingForNumbers.Max.toString();
        }
        this.UiInputElement.value = this.SettingJacket.HindSiteSetting.ValueAsInt().toString();
        this.LabelElement = document.createElement(SharedConst_1.SharedConst.Const.KeyWords.Html.Label);
        this.LabelElement.setAttribute(SharedConst_1.SharedConst.Const.KeyWords.Html.For, this.UiInputElement.id);
        this.LabelElement.innerHTML = this.SettingJacket.HindSiteSetting.FriendlySetting;
        if (this.ContainerUiDivElem) {
            this.ContainerUiDivElem.appendChild(this.UiInputElement);
            this.ContainerUiDivElem.appendChild(this.LabelElement);
        }
    };
    HindSiteSettingNumberModule.prototype.WireEvents_Module = function () {
        var _this = this;
        if (this.UiInputElement) {
            this.UiInputElement.addEventListener('change', function (evt) { return _this.OnSettingChanged(evt); });
        }
    };
    HindSiteSettingNumberModule.prototype.OnSettingChanged = function (evt) {
        var numberValue = parseInt(evt.target.value);
        var iUiElementChangeEvent_Payload = {
            ModuleKey: this.ModuleKey,
            CheckBoxModule: null,
            HindSiteSetting: this.SettingJacket.HindSiteSetting,
            NumberModule: {
                NumberValue: numberValue
            },
            AccordianModule: null,
        };
        this.SettingJacket.HindSiteSetting.ValueAsObj = numberValue;
        this.UiSettingBasedModuleMutationEvent_Subject.NotifyObservers(iUiElementChangeEvent_Payload);
    };
    HindSiteSettingNumberModule.prototype.RefreshUi_Module = function () {
        if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined(this.UiInputElement)) {
            var valueToDisplay = this.SettingJacket.HindSiteSetting.ValueAsInt();
            this.UiInputElement.value = valueToDisplay.toString();
        }
    };
    return HindSiteSettingNumberModule;
}(_SettingsBasedModulesBase_1._SettingsBasedModulesBase));
exports.HindSiteSettingNumberModule = HindSiteSettingNumberModule;
//# sourceMappingURL=HindSiteSettingNumberModule.js.map