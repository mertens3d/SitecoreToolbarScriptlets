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
exports.PopUpMessagesBrokerAgent = void 0;
var MsgPayloadResponseFromContent_1 = require("../../../Shared/scripts/Classes/MsgPayloadResponseFromContent");
var ScWindowStateValidator_1 = require("../../../Shared/scripts/Classes/ScWindowStateValidator");
var StaticHelpers_1 = require("../../../Shared/scripts/Classes/StaticHelpers");
var _1xxx_MessageFlag_1 = require("../../../Shared/scripts/Enums/1xxx-MessageFlag");
var SettingFlavor_1 = require("../../../Shared/scripts/Enums/SettingFlavor");
var LoggableBase_1 = require("../../../Shared/scripts/LoggableBase");
var ContentReplyReceivedEvent_Subject_1 = require("../../../Shared/scripts/Events/ContentReplyReceivedEvent/ContentReplyReceivedEvent_Subject");
var PopUpMessagesBrokerAgent = /** @class */ (function (_super) {
    __extends(PopUpMessagesBrokerAgent, _super);
    function PopUpMessagesBrokerAgent(loggerAgent, browserProxy, settingsAgent) {
        var _this = _super.call(this, loggerAgent) || this;
        _this.BrowserProxy = browserProxy;
        _this.SettingsAgent = settingsAgent;
        _this.ContentReplyReceivedEvent_Subject = new ContentReplyReceivedEvent_Subject_1.ContentReplyReceivedEvent_Subject(_this.Logger);
        return _this;
    }
    PopUpMessagesBrokerAgent.prototype.__cleardebugText = function () {
        this.Logger.HandlerClearDebugText(this.Logger);
    };
    PopUpMessagesBrokerAgent.prototype.BuildMessageToContent = function (msgFlag, stateOfPopUp) {
        var wrappedSettings = this.SettingsAgent.GetSettingsByFlavor([SettingFlavor_1.SettingFlavor.ContentAndPopUpStoredInPopUp, SettingFlavor_1.SettingFlavor.ContentOnly]);
        var settingsToSend = [];
        wrappedSettings.forEach(function (wrappedSetting) { return settingsToSend.push(wrappedSetting.HindSiteSetting); });
        var messageControllerToContent = {
            CurrentContentPrefs: settingsToSend,
            IsValid: false,
            MsgFlag: msgFlag,
            StateOfPopUI: stateOfPopUp,
        };
        return messageControllerToContent;
    };
    PopUpMessagesBrokerAgent.prototype.SendCommandToContentAsync = function (msgFlag, stateOfPopUp) {
        return __awaiter(this, void 0, void 0, function () {
            var messageControllerToContent;
            var _this = this;
            return __generator(this, function (_a) {
                this.Logger.FuncStart(this.SendCommandToContentAsync.name);
                try {
                    if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined([stateOfPopUp])) {
                        this.__cleardebugText();
                        messageControllerToContent = this.BuildMessageToContent(msgFlag, stateOfPopUp);
                        this.SendMessageToContentAsync(messageControllerToContent)
                            .then(function (replyMessagePayload) { return _this.HandleReply(replyMessagePayload); })
                            .catch(function (err) { return _this.Logger.ErrorAndThrow(_this.SendCommandToContentAsync.name, err); });
                    }
                    else {
                        this.Logger.ErrorAndThrow(this.SendCommandToContentAsync.name, 'null check');
                    }
                }
                catch (err) {
                    throw (this.SendCommandToContentAsync.name + ' | ' + err);
                }
                this.Logger.FuncEnd(this.SendCommandToContentAsync.name);
                return [2 /*return*/];
            });
        });
    };
    PopUpMessagesBrokerAgent.prototype.HandleReply = function (replyMessagePayload) {
        if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined(replyMessagePayload)) {
            this.ContentReplyReceivedEvent_Subject.NotifyObservers(replyMessagePayload);
        }
        else {
            this.Logger.WarningAndContinue(this.HandleReply.name, 'null payload. Not notifying ');
        }
    };
    PopUpMessagesBrokerAgent.prototype.SendMessageToContentAsync = function (messageFromController) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.Logger.FuncStart(this.SendMessageToContentAsync.name);
                            if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined(messageFromController)) {
                                this.SendMessageToSingleTabAsync(messageFromController)
                                    .then(function (result) { return resolve(result); })
                                    .catch(function (err) { return reject(err); });
                            }
                            else {
                                this.Logger.ErrorAndThrow(this.SendMessageToContentAsync.name, 'null stateOfPopUp');
                            }
                            this.Logger.FuncEnd(this.SendMessageToContentAsync.name, StaticHelpers_1.StaticHelpers.MsgFlagAsString(messageFromController.MsgFlag));
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    PopUpMessagesBrokerAgent.prototype.SendMessageToSingleTabAsync = function (messageControllerToContent) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.Logger.FuncStart(this.SendMessageToSingleTabAsync.name, StaticHelpers_1.StaticHelpers.MsgFlagAsString(messageControllerToContent.MsgFlag));
                this.BrowserProxy.SendMessageAsync_BrowserProxy(messageControllerToContent)
                    .then(function (response) { return _this.ReceiveResponseHandler(response); })
                    .then(function (scWindowState) {
                    var validator = new ScWindowStateValidator_1.ScWindowStateValidator(_this.Logger);
                    var validatedPayload = validator.ValidatePayload(scWindowState);
                    resolve(validatedPayload);
                })
                    .catch(function (ex) {
                    _this.Logger.WarningAndContinue(_this.SendMessageToSingleTabAsync.name, ex);
                    resolve(null);
                });
                this.Logger.FuncEnd(this.SendMessageToSingleTabAsync.name, StaticHelpers_1.StaticHelpers.MsgFlagAsString(messageControllerToContent.MsgFlag));
                return [2 /*return*/];
            });
        }); });
    };
    PopUpMessagesBrokerAgent.prototype.ReceiveResponseHandler = function (response) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.Logger.FuncStart(_this.ReceiveResponseHandler.name);
            if (response) {
                StaticHelpers_1.StaticHelpers.MsgFlagAsString(response.MsgFlag);
                if (response) {
                    var asMsgFromContent = response;
                    if (asMsgFromContent) {
                        switch (response.MsgFlag) {
                            case _1xxx_MessageFlag_1.MsgFlag.RespCurState:
                                break;
                            case _1xxx_MessageFlag_1.MsgFlag.RespTaskSuccessful:
                                resolve(asMsgFromContent.Payload);
                                break;
                            case _1xxx_MessageFlag_1.MsgFlag.RespTaskFailed:
                                reject(StaticHelpers_1.StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));
                                break;
                            case _1xxx_MessageFlag_1.MsgFlag.RespFailedDidNotValidate:
                                reject(StaticHelpers_1.StaticHelpers.MsgFlagAsString(asMsgFromContent.MsgFlag));
                                break;
                            default:
                                reject('Unrecognized MsgFlag' + StaticHelpers_1.StaticHelpers.MsgFlagAsString(response.MsgFlag));
                                break;
                        }
                    }
                    else {
                        reject(_this.ReceiveResponseHandler.name + ' response is not class: ' + MsgPayloadResponseFromContent_1.MsgContentToController.name);
                    }
                }
            }
            else {
                reject(_this.ReceiveResponseHandler.name + ' null or undefined response');
            }
            _this.Logger.FuncEnd(_this.ReceiveResponseHandler.name);
        });
    };
    return PopUpMessagesBrokerAgent;
}(LoggableBase_1.LoggableBase));
exports.PopUpMessagesBrokerAgent = PopUpMessagesBrokerAgent;
//# sourceMappingURL=PopUpMessagesBrokerAgent.js.map