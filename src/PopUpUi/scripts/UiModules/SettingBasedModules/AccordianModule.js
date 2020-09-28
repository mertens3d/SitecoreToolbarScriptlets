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
exports.AccordianModule = void 0;
var ModuleKey_1 = require("../../../../Shared/scripts/Enums/ModuleKey");
var PopConst_1 = require("../../../../Shared/scripts/Const/PopConst");
var _SettingsBasedModulesBase_1 = require("./_SettingsBasedModulesBase");
var StaticHelpers_1 = require("../../../../Shared/scripts/Classes/StaticHelpers");
var AccordianModule = /** @class */ (function (_super) {
    __extends(AccordianModule, _super);
    function AccordianModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ModuleKey = ModuleKey_1.ModuleKey.AccordionTypical;
        _this.Friendly = AccordianModule.name;
        _this.IsEnabled = true;
        return _this;
    }
    AccordianModule.prototype.Init_Module = function () {
        this.Logger.FuncStart(this.Init_Module.name, AccordianModule.name);
        this.Init_BaseSettingsBasedModule();
        this.Logger.FuncEnd(this.Init_Module.name, AccordianModule.name);
    };
    AccordianModule.prototype.WireEvents_Module = function () {
        var _this = this;
        if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined(this.AccordionTriggerElem)) {
            this.AccordionTriggerElem.addEventListener('click', function (evt) { return _this.OnToggleAccordion(evt); });
        }
        else {
            this.Logger.ErrorAndThrow(this.DroneRestoreAccordionState.name, 'trigger not found ' + this.SettingJacket.HindSiteSetting.FriendlySetting);
        }
    };
    AccordianModule.prototype.DisableSelf = function () {
        console.log(this.ContainerSelector);
        this.IsEnabled = false;
    };
    AccordianModule.prototype.BuildHtmlForModule = function () {
        this.Logger.FuncStart(this.BuildHtmlForModule.name);
        if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined(this.ContainerUiDivElem)) {
            // let uiLabel: HTMLElement = window.document.querySelector(this.HindSiteSetting.UiSelector.replace('id', 'for'));
            this.ContainerUiDivElem.style.display = 'block';
            this.AccordionTriggerElem = this.ContainerUiDivElem.querySelector('.accordion-trigger');
            this.AccordionContentElem = this.ContainerUiDivElem.querySelector('.accordion-content');
            if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined([this.AccordionTriggerElem, this.AccordionContentElem])) {
                this.AccordionTriggerElem.innerHTML = this.SettingJacket.HindSiteSetting.FriendlySetting;
            }
            else {
                this.Logger.ErrorAndThrow(this.BuildHtmlForModule.name, 'null trigger: ' + this.ContainerSelector);
            }
        }
        if (StaticHelpers_1.StaticHelpers.IsNullOrUndefined([this.AccordionTriggerElem, this.AccordionContentElem])) {
            this.Logger.ErrorAndThrow(this.BuildHtmlForModule.name, AccordianModule.name + '  missing elem');
        }
        this.SetAccordionClass();
        if (!this.IsEnabled) {
            console.log(this.ContainerSelector);
            this.ContainerUiDivElem.style.display = 'none';
        }
        this.Logger.FuncEnd(this.BuildHtmlForModule.name);
    };
    AccordianModule.prototype.RefreshUi_Module = function () {
        this.DroneRestoreAccordionState();
    };
    AccordianModule.prototype.DroneRestoreAccordionState = function () {
        if (this.AccordionContentElem) {
            this.SetAccordionClass();
        }
    };
    AccordianModule.prototype.OnToggleAccordion = function (evt) {
        this.Logger.FuncStart(this.OnToggleAccordion.name);
        if (this.AccordionContentElem && this.SettingJacket) {
            var newVal = !(this.SettingJacket.HindSiteSetting.ValueAsBool());
            if (this.SettingJacket) {
                var iUiElementChangeEvent_Payload = {
                    ModuleKey: this.ModuleKey,
                    HindSiteSetting: this.SettingJacket.HindSiteSetting,
                    CheckBoxModule: null,
                    NumberModule: null,
                    AccordianModule: {
                        NewVal: newVal
                    }
                };
                this.SettingJacket.HindSiteSetting.ValueAsObj = newVal;
                this.SetAccordionClass();
                this.UiSettingBasedModuleMutationEvent_Subject.NotifyObservers(iUiElementChangeEvent_Payload);
            }
        }
        else {
            this.Logger.ErrorAndThrow(this.OnToggleAccordion.name, 'did not find sib');
        }
        this.Logger.FuncEnd(this.OnToggleAccordion.name);
    };
    AccordianModule.prototype.SetAccordionClass = function () {
        if (this.AccordionContentElem && this.AccordionTriggerElem) {
            if (this.SettingJacket.HindSiteSetting.ValueAsBool() !== true) {
                this.AccordionContentElem.classList.remove(PopConst_1.PopConst.Const.ClassNames.HS.Collapsed);
                this.AccordionTriggerElem.classList.remove(PopConst_1.PopConst.Const.ClassNames.HS.Down);
            }
            else {
                this.AccordionContentElem.classList.add(PopConst_1.PopConst.Const.ClassNames.HS.Collapsed);
                this.AccordionTriggerElem.classList.add(PopConst_1.PopConst.Const.ClassNames.HS.Down);
            }
        }
        else {
            this.Logger.ErrorAndContinue(this.SetAccordionClass.name, 'null elems');
        }
    };
    return AccordianModule;
}(_SettingsBasedModulesBase_1._SettingsBasedModulesBase));
exports.AccordianModule = AccordianModule;
//# sourceMappingURL=AccordianModule.js.map