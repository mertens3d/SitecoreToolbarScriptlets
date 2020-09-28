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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HindSiteUiLayer = void 0;
var StaticHelpers_1 = require("../../Shared/scripts/Classes/StaticHelpers");
var PopConst_1 = require("../../Shared/scripts/Const/PopConst");
var UiCommandsManager_1 = require("./Managers/UiCommandsManager");
var UiEventManager_1 = require("./Managers/UiEventManager");
var UiModulesManager_1 = require("./Managers/UiManager/UiModulesManager");
var UiVisibilityTestAgent_1 = require("./Managers/UiManager/UiVisibilityTestAgent");
var FeedbackModuleMessages_1 = require("./UiModules/UiFeedbackModules/FeedbackModuleMessages");
var LoggableBase_1 = require("../../Shared/scripts/LoggableBase");
var HindSiteUiLayer;
(function (HindSiteUiLayer_1) {
    var HindSiteUiLayer = /** @class */ (function (_super) {
        __extends(HindSiteUiLayer, _super);
        function HindSiteUiLayer(logger, settingsAgent, commandDefinitionBucket, scUrlAgent) {
            var _this = _super.call(this, logger) || this;
            _this.Logger.CTORStart(HindSiteUiLayer.name);
            try {
                _this.SettingsAgent = settingsAgent;
                _this.CommandDefinitionBucket = commandDefinitionBucket;
                _this.ScUrlAgent = scUrlAgent;
                if (StaticHelpers_1.StaticHelpers.IsNullOrUndefined([_this.SettingsAgent, _this.ScUrlAgent, _this.CommandDefinitionBucket])) {
                    _this.Logger.ErrorAndThrow(HindSiteUiLayer.name, 'null at constructor');
                }
                _this.Instantiate_Ui();
                _this.Init_Ui();
                _this.WireEvents_Ui();
            }
            catch (err) {
                _this.Logger.ErrorAndThrow(HindSiteUiLayer.name, err);
            }
            _this.Logger.CTOREnd(HindSiteUiLayer.name);
            return _this;
        }
        HindSiteUiLayer.prototype.GetStateOfPopUp = function () {
            return this.UiEventMan.GetStateOfPopUp();
        };
        HindSiteUiLayer.prototype.OnContentReplyReceived = function (dataContentReplyReceivedEvent_Payload) {
            this.Logger.FuncStart(this.OnContentReplyReceived.name);
            //calling twice as a workaround to make sure snapshot select is populated before visibility tests are run
            //todo - fix
            this.UiModulesMan.UpdateUiFromContentReply(dataContentReplyReceivedEvent_Payload.StateOfLiveHindSite, dataContentReplyReceivedEvent_Payload.StateOfStorageSnapShots);
            this.UiModulesMan.UpdateUiFromContentReply(dataContentReplyReceivedEvent_Payload.StateOfLiveHindSite, dataContentReplyReceivedEvent_Payload.StateOfStorageSnapShots);
            this.Logger.FuncEnd(this.OnContentReplyReceived.name);
        };
        HindSiteUiLayer.prototype.Instantiate_Ui = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.Logger.FuncStart(this.Instantiate_Ui.name);
                    try {
                        this.UiVisibilityTestAgent = new UiVisibilityTestAgent_1.UiVisibilityTestAgent(this.Logger);
                        this.UiCommandsMan = new UiCommandsManager_1.UiCommandsManager(this.Logger, this.CommandDefinitionBucket, this.UiVisibilityTestAgent);
                        this.UiModulesMan = new UiModulesManager_1.UiModulesManager(this.Logger, this.SettingsAgent, this.CommandDefinitionBucket, this.UiCommandsMan, this.UiVisibilityTestAgent, this.ScUrlAgent); //after tabman, after HelperAgent
                        this.UiEventMan = new UiEventManager_1.UiEventManager(this.Logger, this.UiModulesMan); // after uiman
                    }
                    catch (err) {
                        console.log(err);
                    }
                    this.Logger.FuncEnd(this.Instantiate_Ui.name);
                    return [2 /*return*/];
                });
            });
        };
        HindSiteUiLayer.prototype.Init_Ui = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.Logger.FuncEnd(this.Init_Ui.name);
                    this.UiModulesMan.Init_UiMan();
                    this.UiEventMan.Init_UiEventManager();
                    this.Logger.FuncEnd(this.Init_Ui.name);
                    return [2 /*return*/];
                });
            });
        };
        HindSiteUiLayer.prototype.WireEvents_Ui = function () {
            this.Logger.FuncStart(this.WireEvents_Ui.name);
            this.UiModulesMan.WireEvents_ModulesManager();
            this.UiEventMan.WireEvents_UiEventMan();
            this.FeedbackModuleMsg_Observer = new FeedbackModuleMessages_1.DebuggingFeedbackModuleMessages_Observer(this.Logger, PopConst_1.PopConst.Const.Selector.HS.FeedbackMessages);
            this.UiCommandRaisedFlag_Subject = this.UiEventMan.UiCommandRaisedFlag_UiEventManagerRelay_Subject;
            //this.UiCommandRaisedFlag_Observer = new UiCommandFlagRaisedEvent_Observer(this.Logger, this.OnUiCommandEvent_UiEventManagerRelay.bind(this));
            this.Logger.FuncEnd(this.WireEvents_Ui.name);
        };
        return HindSiteUiLayer;
    }(LoggableBase_1.LoggableBase));
    HindSiteUiLayer_1.HindSiteUiLayer = HindSiteUiLayer;
})(HindSiteUiLayer = exports.HindSiteUiLayer || (exports.HindSiteUiLayer = {}));
//# sourceMappingURL=HindSiteUiLayer.js.map