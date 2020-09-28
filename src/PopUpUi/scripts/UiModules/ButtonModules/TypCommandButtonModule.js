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
exports.TypCommandButtonModule = void 0;
var StaticHelpers_1 = require("../../../../Shared/scripts/Classes/StaticHelpers");
var _2xxx_MenuCommand_1 = require("../../../../Shared/scripts/Enums/2xxx-MenuCommand");
var ModuleKey_1 = require("../../../../Shared/scripts/Enums/ModuleKey");
var _baseButtonModule_1 = require("./_baseButtonModule");
var TypCommandButtonModule = /** @class */ (function (_super) {
    __extends(TypCommandButtonModule, _super);
    function TypCommandButtonModule(loggerAgent, menuCommandParameters) {
        var _this = _super.call(this, loggerAgent, menuCommandParameters) || this;
        _this.ModuleKey = ModuleKey_1.ModuleKey.ButtonTypical;
        return _this;
    }
    TypCommandButtonModule.prototype.Init_Module = function () {
        this.Logger.FuncStart(this.Init_Module.name, TypCommandButtonModule.name);
        this.Init_BaseButtonModule();
        this.Logger.FuncEnd(this.Init_Module.name, TypCommandButtonModule.name);
    };
    TypCommandButtonModule.prototype.WireEvents_Module = function () {
        this.WireEvents_Base();
    };
    TypCommandButtonModule.prototype.GetCommandKey = function () {
        return this.MenuCommandDefinition.MenuCommandKey;
    };
    TypCommandButtonModule.prototype.BuildHtmlForModule = function () {
        this.BuildHtmlForModule_base_ButtonModule();
        this.BuildElements();
    };
    TypCommandButtonModule.prototype.BuildButtonOverlay = function () {
        this.ElemDivBtnOverlay = document.createElement("div");
        this.ElemDivBtnOverlay.classList.add("btn-overlay");
        var backFill = this.BuildButtonOverlayBackFill();
        this.BuildButtonTextContainer();
        this.ElemDivBtnOverlay.appendChild(backFill);
        this.ElemDivBtnOverlay.appendChild(this.ElemButtonBackText);
    };
    TypCommandButtonModule.prototype.BuildButtonOverlayBackFill = function () {
        var divElem = document.createElement("div");
        divElem.classList.add("back-fill");
        return divElem;
    };
    TypCommandButtonModule.prototype.BuildButtonTextContainer = function () {
        this.ElemButtonBackText = document.createElement("div");
        this.ElemButtonBackText.classList.add("back-text");
        this.ElemButtonBackText.innerText = 'here is why it is disabled';
        return this.ElemButtonBackText;
    };
    TypCommandButtonModule.prototype.BuildElements = function () {
        this.Logger.FuncStart(this.BuildElements.name, this.MenuCommandDefinition.InnerText + ' ' + _2xxx_MenuCommand_1.MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey]);
        if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined(this.ContainerUiDivElem)) {
            this.BuildButtonOverlay();
            this.ContainerUiDivElem.classList.add('btn-container');
            this.ContainerUiDivElem.appendChild(this.ElemDivBtnOverlay);
            this.ContainerUiDivElem.appendChild(this.HTMLButtonElement);
        }
        else {
            this.Logger.ErrorAndContinue(TypCommandButtonModule.name, 'Could not find ' + this.MenuCommandDefinition.PlaceHolderSelector);
        }
        this.Logger.FuncEnd(this.BuildElements.name);
    };
    TypCommandButtonModule.prototype.RefreshUi_Module = function () {
        this.Logger.FuncStart(this.RefreshUi_Module.name, this.Friendly);
        if (this.DoesContainerExist()) {
            var allresults = this.RefreshData.UiVisibilityTestAgent.TestAgainstAllSetControllers(this.MenuCommandDefinition);
            this.Logger.LogVal('test count', allresults.TestResults.length);
            this.SetCommandButtonVisibilityBaseOnResults(allresults);
        }
        else {
            this.Logger.Log('no placeholder ' + this.Friendly);
        }
        this.Logger.FuncEnd(this.RefreshUi_Module.name, this.Friendly);
    };
    TypCommandButtonModule.prototype.SetCommandButtonVisibilityBaseOnResults = function (allresults) {
        this.Logger.FuncStart(this.SetCommandButtonVisibilityBaseOnResults.name, this.Friendly);
        this.Logger.LogAsJsonPretty(this.Friendly, allresults.TestResults);
        if (allresults && this.HTMLButtonElement) {
            if (!allresults.HasFailures()) {
                this.HTMLButtonElement.classList.remove('disabled');
                this.HTMLButtonElement.removeAttribute('disabled');
                if (this.ElemDivBtnOverlay) {
                    this.ElemDivBtnOverlay.style.display = 'none';
                }
            }
            else {
                this.HTMLButtonElement.classList.add('disabled');
                this.HTMLButtonElement.setAttribute('disabled', 'disabled');
                if (this.ElemDivBtnOverlay) {
                    this.ElemDivBtnOverlay.style.display = 'block';
                }
                if (this.ElemButtonBackText) {
                    this.ElemButtonBackText.innerText = allresults.GetFriendlyFails();
                }
            }
        }
        else {
            this.Logger.ErrorAndContinue(this.SetCommandButtonVisibilityBaseOnResults.name, 'targetButton is NULL: ' + _2xxx_MenuCommand_1.MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey]);
        }
        this.Logger.FuncEnd(this.SetCommandButtonVisibilityBaseOnResults.name, this.Friendly);
    };
    return TypCommandButtonModule;
}(_baseButtonModule_1._base_ButtonModule));
exports.TypCommandButtonModule = TypCommandButtonModule;
//# sourceMappingURL=TypCommandButtonModule.js.map