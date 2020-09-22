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
var PopUpMessagesBrokerAgent_1 = require("../../PopUpController/Agents/PopUpMessagesBrokerAgent");
var LoggerAgent_1 = require("../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerAgent");
var CommandManager_1 = require("../../PopUpUi/scripts/Classes/CommandManager");
var RepositoryAgent_1 = require("../../Shared/scripts/Agents/Agents/RepositoryAgent/RepositoryAgent");
var SettingsAgent_1 = require("../../Shared/scripts/Agents/Agents/SettingsAgent/SettingsAgent");
var SharedConst_1 = require("../../Shared/scripts/SharedConst");
var _3xxx_SettingKey_1 = require("../../Shared/scripts/Enums/3xxx-SettingKey");
var LoggerStorageWriter_1 = require("../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerStorageWriter");
var LoggerConsoleWriter_1 = require("../../Shared/scripts/Agents/Agents/LoggerAgent/LoggerConsoleWriter");
var RollingLogIdDrone_1 = require("../../Shared/scripts/Agents/Drones/RollingLogIdDrone/RollingLogIdDrone");
var zPopUpUiEntryPoint_1 = require("../../PopUpUi/scripts/zPopUpUiEntryPoint");
var UiCommandFlagRaisedEvent_Observer_1 = require("../../PopUpUi/scripts/Events/UiCommandFlagRaisedEvent/UiCommandFlagRaisedEvent_Observer");
var ContentReplyReceivedEvent_Observer_1 = require("../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Observer");
var PopUpCommands_1 = require("../../PopUpUi/scripts/Classes/PopUpCommands");
var PopUpControllerEntry = /** @class */ (function () {
    function PopUpControllerEntry() {
    }
    PopUpControllerEntry.prototype.main = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this.Instantiate();
                    this.PopUpUiEntry = new zPopUpUiEntryPoint_1.PopUpUiEntry();
                    this.PopUpUiEntry.main(this.commandMan.CommandDefinitionBucket);
                    this.PopUpUiEntry.EventMan.UiCommandRaisedFlag_Subject.RegisterObserver(this.UiCommandRaisedFlag_Observer);
                    this.Init();
                }
                catch (err) {
                }
                return [2 /*return*/];
            });
        });
    };
    PopUpControllerEntry.prototype.Init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.Logger.SectionMarker('Begin Init');
                this.commandMan.Init();
                this.WireEvents();
                this.Start();
                return [2 /*return*/];
            });
        });
    };
    PopUpControllerEntry.prototype.WireEvents = function () {
        this.WireCustomevents();
    };
    PopUpControllerEntry.prototype.OnUiCommandRaisedEvent = function (uiCommandFlagRaisedEvent_Payload) {
        this.Logger.Log('Controller got command message');
        this.PopUpMessageBrokerAgent.SendCommandToContentImprovedAsync(uiCommandFlagRaisedEvent_Payload.MsgFlag, uiCommandFlagRaisedEvent_Payload.StateOfPopUp);
    };
    PopUpControllerEntry.prototype.Start = function () {
        this.commandMan.TriggerPingEventAsync();
    };
    PopUpControllerEntry.prototype.InstantiateAndInitSettingsAndLogger = function () {
        this.Logger = new LoggerAgent_1.LoggerAgent();
        this.RepoAgent = new RepositoryAgent_1.RepositoryAgent(this.Logger);
        this.SettingsAgent = new SettingsAgent_1.SettingsAgent(this.Logger, this.RepoAgent);
        this.SettingsAgent.Init_SettingsAgent();
        this.InitLogger();
    };
    PopUpControllerEntry.prototype.Instantiate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.InstantiateAndInitSettingsAndLogger();
                this.UiCommandRaisedFlag_Observer = new UiCommandFlagRaisedEvent_Observer_1.UiCommandFlagRaisedEvent_Observer(this.Logger, this.OnUiCommandRaisedEvent.bind(this));
                this.PopUpMessageBrokerAgent = new PopUpMessagesBrokerAgent_1.PopUpMessagesBrokerAgent(this.Logger);
                this.CommandDefintionBucket = new PopUpCommands_1.CommandDefintionFactory(this.Logger).BuildMenuCommandParamsBucket();
                this.commandMan = new CommandManager_1.CommandManager(this.Logger, this.PopUpMessageBrokerAgent, this.CommandDefintionBucket);
                return [2 /*return*/];
            });
        });
    };
    PopUpControllerEntry.prototype.InitLogger = function () {
        this.Logger.FuncStart(this.InitLogger.name);
        var enableLoggingSetting = this.SettingsAgent.HindSiteSettingsBucket.GetByKey(_3xxx_SettingKey_1.SettingKey.EnableLogging);
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
        this.Logger.FuncEnd(this.InitLogger.name);
    };
    PopUpControllerEntry.prototype.WireCustomevents = function () {
        var contentReplyReceivedEvent_Observer = new ContentReplyReceivedEvent_Observer_1.ContentReplyReceivedEvent_Observer(this.Logger, null); //todo wire null to ui
        this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(contentReplyReceivedEvent_Observer);
        this.PopUpMessageBrokerAgent.ContentReplyReceivedEvent_Subject.RegisterObserver(null); //todo put this back somehow this.FeedbackModuleMsg_Observer)
    };
    return PopUpControllerEntry;
}());
var popUpControllerEntry = new PopUpControllerEntry();
popUpControllerEntry.main();
//# sourceMappingURL=zPopUpControllerEntryPoint.js.map