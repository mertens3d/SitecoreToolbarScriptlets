"use strict";
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
var HindSiteUiLayer_1 = require("../../PopUpUi/scripts/HindSiteUiLayer");
var LoggerAgent_1 = require("../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent");
var LoggerConsoleWriter_1 = require("../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter");
var LoggerStorageWriter_1 = require("../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter");
var RepositoryAgent_1 = require("../../Shared/scripts/Agents/Agents/RepositoryAgent/RepositoryAgent");
var SettingsAgent_1 = require("../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent");
var ScUrlAgent_1 = require("../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent");
var RollingLogIdDrone_1 = require("../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone");
var StaticHelpers_1 = require("../../Shared/scripts/Classes/StaticHelpers");
var _3xxx_SettingKey_1 = require("../../Shared/scripts/Enums/3xxx-SettingKey");
var SharedConst_1 = require("../../Shared/scripts/SharedConst");
var CommandManager_1 = require("./Managers/CommandManager");
var PopUpMessagesBrokerAgent_1 = require("./Agents/PopUpMessagesBrokerAgent");
var BrowserProxy_1 = require("./Proxies/BrowserProxy");
var CommandType_1 = require("../../Shared/scripts/Enums/CommandType");
var HandlersForInternal_1 = require("./Classes/HandlersForInternal");
var BrowserTabAgent_1 = require("./Agents/BrowserTabAgent");
var PopUpCommands_1 = require("./Classes/PopUpCommands");
var UiCommandFlagRaisedEvent_Observer_1 = require("../../Shared/scripts/Events/UiCommandFlagRaisedEvent/UiCommandFlagRaisedEvent_Observer");
var ContentReplyReceivedEvent_Observer_1 = require("../../Shared/scripts/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Observer");
var PopUpControllerLayer = /** @class */ (function () {
    function PopUpControllerLayer() {
    }
    PopUpControllerLayer.prototype.Startup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.Preamble_SettingsAndLogger();
                        this.BrowserProxy = new BrowserProxy_1.PopUpBrowserProxy(this.Logger);
                        return [4 /*yield*/, this.BrowserProxy.Init_BrowserProxy()
                                .then(function () {
                                _this.InstantiateAgents_Controller();
                                _this.InstantiateManagers_Controller();
                                _this.Init_Controller();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PopUpControllerLayer.prototype.Preamble_SettingsAndLogger = function () {
        this.Logger = new LoggerAgent_1.LoggerAgent();
        this.RepoAgent = new RepositoryAgent_1.RepositoryAgent(this.Logger);
        this.SettingsAgent = new SettingsAgent_1.SettingsAgent(this.Logger, this.RepoAgent);
        this.SettingsAgent.Init_SettingsAgent();
        this.Init_Logger();
    };
    PopUpControllerLayer.prototype.InstantiateAgents_Controller = function () {
        this.ScUrlAgent = new ScUrlAgent_1.ScUrlAgent(this.Logger, this.BrowserProxy);
        this.ScUrlAgent.Init_ScUrlAgent();
        this.PopUpMessageBrokerAgent = new PopUpMessagesBrokerAgent_1.PopUpMessagesBrokerAgent(this.Logger, this.BrowserProxy, this.SettingsAgent);
    };
    PopUpControllerLayer.prototype.InstantiateManagers_Controller = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.Logger.FuncStart(this.InstantiateManagers_Controller.name);
                this.CommandDefintionBucket = new PopUpCommands_1.CommandDefintionFactory(this.Logger).BuildMenuCommandParamsBucket();
                this.UiLayer = new HindSiteUiLayer_1.HindSiteUiLayer.HindSiteUiLayer(this.Logger, this.SettingsAgent, this.CommandDefintionBucket, this.ScUrlAgent);
                this.BrowserTabAgent = new BrowserTabAgent_1.BrowserTabAgent(this.Logger, this.ScUrlAgent, this.SettingsAgent);
                this.HandlersForInternal = new HandlersForInternal_1.HandlersForInternal(this.Logger, this.BrowserTabAgent);
                this.commandMan = new CommandManager_1.CommandManager(this.Logger, this.PopUpMessageBrokerAgent, this.CommandDefintionBucket, this.UiLayer, this.HandlersForInternal);
                this.Logger.FuncEnd(this.InstantiateManagers_Controller.name);
                return [2 /*return*/];
            });
        });
    };
    PopUpControllerLayer.prototype.Init_Controller = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.Logger.SectionMarker(this.Init_Controller.name);
                this.Logger.FuncStart(this.Init_Controller.name);
                this.commandMan.Init_CommandManager();
                this.WireEvents_Controller();
                this.Start();
                this.Logger.FuncEnd(this.Init_Controller.name);
                return [2 /*return*/];
            });
        });
    };
    PopUpControllerLayer.prototype.WireEvents_Controller = function () {
        this.Logger.FuncStart(this.WireEvents_Controller.name);
        this.UiCommandRaisedFlag_Observer = new UiCommandFlagRaisedEvent_Observer_1.UiCommandFlagRaisedEvent_Observer(this.Logger, this.OnUiCommandRaisedEvent.bind(this));
        if (StaticHelpers_1.StaticHelpers.IsNullOrUndefined([this.UiLayer.UiCommandRaisedFlag_Subject, this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject])) {
            this.Logger.ErrorAndThrow(this.WireEvents_Controller.name, 'Null check');
        }
        else {
            this.UiLayer.UiCommandRaisedFlag_Subject.RegisterObserver(this.UiCommandRaisedFlag_Observer);
            var contentReplyReceivedEvent_Observer = new ContentReplyReceivedEvent_Observer_1.ContentReplyReceivedEvent_Observer(this.Logger, this.OnContentReplyReceivedEventCallBack.bind(this));
            this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(contentReplyReceivedEvent_Observer);
            //todo put this back somehow this.FeedbackModuleMsg_Observer) this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(null);
        }
        this.Logger.FuncEnd(this.WireEvents_Controller.name);
    };
    PopUpControllerLayer.prototype.OnContentReplyReceivedEventCallBack = function (dataContentReplyReceivedEvent_Payload) {
        this.Logger.FuncStart(this.OnContentReplyReceivedEventCallBack.name);
        if (this.UiLayer) {
            this.UiLayer.OnContentReplyReceived(dataContentReplyReceivedEvent_Payload);
        }
        this.Logger.Log('Return to standby');
        this.Logger.FuncEnd(this.OnContentReplyReceivedEventCallBack.name);
    };
    PopUpControllerLayer.prototype.OnUiCommandRaisedEvent = function (uiCommandFlagRaisedEvent_Payload) {
        this.Logger.Log('Controller got command message');
        if (uiCommandFlagRaisedEvent_Payload.CommandType === CommandType_1.CommandType.Content) {
            this.PopUpMessageBrokerAgent.SendCommandToContentAsync(uiCommandFlagRaisedEvent_Payload.MsgFlag, uiCommandFlagRaisedEvent_Payload.StateOfPopUp);
        }
        else {
            this.commandMan.HandleCommandTypePopUp(uiCommandFlagRaisedEvent_Payload);
        }
    };
    PopUpControllerLayer.prototype.Start = function () {
        this.commandMan.TriggerPingEventAsync();
    };
    PopUpControllerLayer.prototype.Init_Logger = function () {
        this.Logger.FuncStart(this.Init_Logger.name);
        var enableLoggingSetting = this.SettingsAgent.HindSiteSettingsBucket.GetByKey(_3xxx_SettingKey_1.SettingKey.EnableDebugging);
        if (SharedConst_1.SharedConst.Const.Debug.ForceLoggingEnabled || enableLoggingSetting.HindSiteSetting.ValueAsBool()) {
            var RollingLogId = new RollingLogIdDrone_1.RollingLogIdDrone(this.SettingsAgent, this.Logger);
            var nextLogId = RollingLogId.GetNextLogId();
            var storageLogWriter = new LoggerStorageWriter_1.LoggerStorageWriter();
            storageLogWriter.SetLogToStorageKey(nextLogId);
            var consoleLogger = new LoggerConsoleWriter_1.LoggerConsoleWriter();
            //this.Logger.AddWriter(storageLogWriter);
            this.Logger.AddWriter(consoleLogger);
        }
        this.Logger.FlushBuffer();
        this.Logger.FuncEnd(this.Init_Logger.name);
    };
    return PopUpControllerLayer;
}());
var popUpControllerLayer = new PopUpControllerLayer();
popUpControllerLayer.Startup();
//# sourceMappingURL=PopUpControllerLayer.js.map