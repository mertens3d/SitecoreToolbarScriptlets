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
exports.UiEventManager = void 0;
var LoggableBase_1 = require("../../../Shared/scripts/LoggableBase");
var StaticHelpers_1 = require("../../../Shared/scripts/Classes/StaticHelpers");
var ModuleKey_1 = require("../../../Shared/scripts/Enums/ModuleKey");
var SingleClickEvent_Observer_1 = require("../Events/SingleClickEvent/SingleClickEvent_Observer");
var UiCommandFlagRaisedEvent_Subject_1 = require("../Events/UiCommandFlagRaisedEvent/UiCommandFlagRaisedEvent_Subject");
var UiModulesManager_1 = require("./UiManager/UiModulesManager");
var UiEventManager = /** @class */ (function (_super) {
    __extends(UiEventManager, _super);
    function UiEventManager(logger, uimodulesMan) {
        var _this = _super.call(this, logger) || this;
        _this.UiModulesMan = uimodulesMan;
        if (StaticHelpers_1.StaticHelpers.IsNullOrUndefined([uimodulesMan])) {
            throw (UiModulesManager_1.UiModulesManager.name + ' null at constructor');
        }
        return _this;
    }
    UiEventManager.prototype.Init_UiEventManager = function () {
        this.Logger.FuncStart(this.Init_UiEventManager.name);
        this.UiCommandRaisedFlag_UiEventManagerRelay_Subject = new UiCommandFlagRaisedEvent_Subject_1.UiCommandFlagRaisedEvent_Subject(this.Logger);
        this.CommandButtonSingleClickEvent_Observer = new SingleClickEvent_Observer_1.SingleClickEvent_Observer(this.Logger, this.OnSingleClickEvent.bind(this));
        this.Logger.FuncEnd(this.Init_UiEventManager.name);
    };
    UiEventManager.prototype.GetStateOfPopUp = function () {
        var stateOfUiModules = this.UiModulesMan.GetStateOfModules(); //todo - this msgFlag is redundant to the payload below
        var StateOfPopup = {
            NewNickName: stateOfUiModules.SnapShotNewNickname,
            SelectSnapShotId: stateOfUiModules.SelectSnapshotId,
        };
        return StateOfPopup;
    };
    UiEventManager.prototype.OnSingleClickEvent = function (singleClickEventPayload) {
        this.Logger.Log('single click');
        var payload = {
            MsgFlag: singleClickEventPayload.HandlerData.MsgFlag,
            CommandType: singleClickEventPayload.HandlerData.CommandType,
            StateOfPopUp: this.GetStateOfPopUp()
        };
        this.UiCommandRaisedFlag_UiEventManagerRelay_Subject.NotifyObservers(payload);
    };
    ;
    UiEventManager.prototype.WireEvents_UiEventMan = function () {
        this.Logger.FuncStart(this.WireEvents_UiEventMan.name);
        this.ListenForCommandEvents();
        this.Logger.FuncEnd(this.WireEvents_UiEventMan.name);
    };
    UiEventManager.prototype.ListenForSettingsEvents = function () {
    };
    UiEventManager.prototype.ListenForCommandEvents = function () {
        var _this = this;
        this.Logger.FuncStart(this.ListenForCommandEvents.name);
        var baseButtonModules = this.UiModulesMan.GetBaseButtonModules();
        if (baseButtonModules) {
            baseButtonModules.forEach(function (baseButtonModule) {
                if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined(baseButtonModule.SingleButtonClickEvent_Subject)) {
                    _this.Logger.LogVal('baseButtonModule.Friendly', baseButtonModule.Friendly);
                    baseButtonModule.SingleButtonClickEvent_Subject.RegisterObserver(_this.CommandButtonSingleClickEvent_Observer);
                }
                else {
                    _this.Logger.WarningAndContinue(_this.ListenForCommandEvents.name, 'null SingleButtonClickEvent_Subject ' + ModuleKey_1.ModuleKey[baseButtonModule.ModuleKey]);
                }
            });
        }
        this.Logger.FuncEnd(this.ListenForCommandEvents.name);
    };
    return UiEventManager;
}(LoggableBase_1.LoggableBase));
exports.UiEventManager = UiEventManager;
//# sourceMappingURL=UiEventManager.js.map