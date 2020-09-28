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
exports._base_ButtonModule = void 0;
var _2xxx_MenuCommand_1 = require("../../../../Shared/scripts/Enums/2xxx-MenuCommand");
var CommandButtonEvents_1 = require("../../../../Shared/scripts/Enums/CommandButtonEvents");
var ModuleKey_1 = require("../../../../Shared/scripts/Enums/ModuleKey");
var _UiModuleBase_1 = require("../_UiModuleBase");
var SingleClickEvent_Subject_1 = require("../../Events/SingleClickEvent/SingleClickEvent_Subject");
var _base_ButtonModule = /** @class */ (function (_super) {
    __extends(_base_ButtonModule, _super);
    function _base_ButtonModule(loggerAgent, menuCommandDefinition) {
        var _this = _super.call(this, loggerAgent, menuCommandDefinition ? menuCommandDefinition.PlaceHolderSelector : null) || this;
        _this.ModuleKey = ModuleKey_1.ModuleKey.Unknown;
        _this.Friendly = _this.MenuCommandDefinition ? _2xxx_MenuCommand_1.MenuCommandKey[_this.MenuCommandDefinition.MenuCommandKey] : _this.ContainerSelector;
        _this.MenuCommandDefinition = menuCommandDefinition;
        return _this;
    }
    _base_ButtonModule.prototype.Init_BaseButtonModule = function () {
        this.Init_UiModuleBase();
    };
    _base_ButtonModule.prototype.WireEvents_Base = function () {
        this.WireClickEvents();
    };
    _base_ButtonModule.prototype.BuildHtmlForModule_base_ButtonModule = function () {
        this.Logger.FuncStart(this.BuildHtmlForModule_base_ButtonModule.name, this.MenuCommandDefinition.InnerText + ' ' + _2xxx_MenuCommand_1.MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey]);
        if (this.ContainerUiDivElem) {
            this.BuildButtonElem();
            this.ContainerUiDivElem.classList.add('btn-container');
            this.ContainerUiDivElem.appendChild(this.HTMLButtonElement);
        }
        else {
            this.Logger.ErrorAndContinue(this.BuildHtmlForModule_base_ButtonModule.name, 'Could not find ' + this.MenuCommandDefinition.PlaceHolderSelector);
        }
        this.Logger.FuncEnd(this.BuildHtmlForModule_base_ButtonModule.name);
    };
    _base_ButtonModule.prototype.WireClickEvents = function () {
        this.SingleButtonClickEvent_Subject = new SingleClickEvent_Subject_1.SingleClickEvent_Subject(this.Logger, _2xxx_MenuCommand_1.MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey]);
        if (this.MenuCommandDefinition && this.MenuCommandDefinition.PlaceHolderSelector) {
            var targetElem = document.querySelector(this.MenuCommandDefinition.PlaceHolderSelector);
            if (targetElem) {
                if (this.MenuCommandDefinition.EventHandlerData.Event === CommandButtonEvents_1.CommandButtonEvents.OnSingleClick) {
                    this.WireSingleClickEvent();
                }
                else if (this.MenuCommandDefinition.EventHandlerData.Event === CommandButtonEvents_1.CommandButtonEvents.OnDoubleClick) {
                    this.WireDoubleClickEvent();
                }
            }
            else {
                this.Logger.ErrorAndThrow(this.WireClickEvents.name, 'did not find placeholder: ' + this.MenuCommandDefinition.PlaceHolderSelector);
            }
        }
        else {
            this.Logger.ErrorAndThrow(this.WireClickEvents.name, 'no command or no command placeholder');
        }
    };
    _base_ButtonModule.prototype.BuildButtonElem = function () {
        //<div id='PresentationDetails' type = 'button' class="button-wrapper icon details" > Presentation Details < /div>
        this.HTMLButtonElement = document.createElement("button");
        this.HTMLButtonElement.classList.add("icon");
        this.HTMLButtonElement.classList.add(this.MenuCommandDefinition.IconClassName);
        this.HTMLButtonElement.innerText = this.MenuCommandDefinition.InnerText;
        this.HTMLButtonElement.type = "button";
    };
    _base_ButtonModule.prototype.WireSingleClickEvent = function () {
        var _this = this;
        if (this.HTMLButtonElement) {
            this.HTMLButtonElement.addEventListener('click', function (evt) {
                var singleClickEvent_payload = {
                    HandlerData: _this.MenuCommandDefinition.EventHandlerData
                };
                _this.SingleButtonClickEvent_Subject.NotifyObservers(singleClickEvent_payload);
            });
        }
        else {
            this.Logger.ErrorAndThrow(this.WireSingleClickEvent.name, 'No button element: ' + this.MenuCommandDefinition.PlaceHolderSelector);
        }
    };
    _base_ButtonModule.prototype.WireDoubleClickEvent = function () {
        //this.UiMan().AssignDblClickEvent(PopConst.Const.Selector.HS.SelStateSnapShot, (evt) => { this.Handlers.External.HndlrSnapShotRestoreNewTab(evt, this.PopHub); });
        //this.UiMan().AssignDblClickEvent(PopConst.Const.Selector.HS.FeedbackLogElement, (evt) => { this.Handlers.Internal.__cleardebugTextWithConfirm(evt, this.PopHub); });
        var _this = this;
        if (this.HTMLButtonElement) {
            this.HTMLButtonElement.ondblclick = function (evt) {
                var data = _this.BuildCommandDataForPopUp();
                data.Evt = evt;
                //data.EventMan.RouteAllCommandEvents(data);
            };
        }
    };
    _base_ButtonModule.prototype.BuildCommandDataForPopUp = function () {
        var data = {
            EventMan: null,
            MenuCommandDefinition: this.MenuCommandDefinition,
            EventHandlerData: this.MenuCommandDefinition.EventHandlerData,
            Evt: null,
        };
        return data;
    };
    return _base_ButtonModule;
}(_UiModuleBase_1._UiModuleBase));
exports._base_ButtonModule = _base_ButtonModule;
//# sourceMappingURL=_baseButtonModule.js.map