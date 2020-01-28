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
var _ContentManagerBase_1 = require("../_first/_ContentManagerBase");
var MessageFlag_1 = require("../../../Shared/scripts/Enums/MessageFlag");
var scWindowType_1 = require("../../../Shared/scripts/Enums/scWindowType");
var MsgPayloadResponseFromContent_1 = require("../../../Shared/scripts/Classes/MsgPayloadResponseFromContent");
var browser = browser || {};
//browser.runtime.onMessage.addListener((message) => {
//  if (message.command === "beastify") {
//    //insertBeast(message.beastURL);
//  } else if (message.command === "reset") {
//    //removeExistingBeasts();
//  }
//});
var MessagesManager = /** @class */ (function (_super) {
    __extends(MessagesManager, _super);
    function MessagesManager(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(MessagesManager.name);
        xyyz.debug.FuncEnd(MessagesManager.name);
        return _this;
    }
    MessagesManager.prototype.Init = function () {
        var _this = this;
        browser.runtime.onMessage.addListener(function (message) {
            _this.ReceiveMessage(message);
        });
    };
    MessagesManager.prototype.NotifyCompleteOnContent = function (targetWindow, Message) {
        if (targetWindow === void 0) { targetWindow = null; }
        if (!targetWindow) {
            targetWindow = this.PageDataMan().TopLevelWindow();
        }
        var bodyTag = targetWindow.DataDocSelf.Document.getElementsByTagName('body')[0]; //(treeGlyphTargetId);
        var flagElem = targetWindow.DataDocSelf.Document.createElement('div');
        flagElem.innerHTML = '<div>' + Message + '</div>';
        flagElem.style.position = 'absolute';
        flagElem.style.top = '100px';
        flagElem.style.left = '100px';
        flagElem.style.backgroundColor = 'yellow';
        flagElem.style.zIndex = '999';
        flagElem.style.fontSize = '40px';
        setTimeout(function () {
            flagElem.remove();
            window.close();
        }, this.Const().Timeouts.WaitBeforeRemovingCompleteFlagOnContent);
        bodyTag.appendChild(flagElem);
    };
    MessagesManager.prototype.ReceiveMessage = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, targetWin;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = payload.MsgFlag;
                        switch (_a) {
                            case MessageFlag_1.MsgFlag.AddCETab: return [3 /*break*/, 1];
                            case MessageFlag_1.MsgFlag.AdminB: return [3 /*break*/, 3];
                            case MessageFlag_1.MsgFlag.GetAllStorageOneWindow: return [3 /*break*/, 4];
                            case MessageFlag_1.MsgFlag.GiveCurrentData: return [3 /*break*/, 5];
                            case MessageFlag_1.MsgFlag.GoDesktop: return [3 /*break*/, 6];
                            case MessageFlag_1.MsgFlag.OpenCE: return [3 /*break*/, 7];
                            case MessageFlag_1.MsgFlag.QuickPublish: return [3 /*break*/, 8];
                            case MessageFlag_1.MsgFlag.SetScMode: return [3 /*break*/, 10];
                            case MessageFlag_1.MsgFlag.RestoreClick: return [3 /*break*/, 11];
                            case MessageFlag_1.MsgFlag.TaskSuccessful: return [3 /*break*/, 13];
                            case MessageFlag_1.MsgFlag.TakeSnapShot: return [3 /*break*/, 14];
                        }
                        return [3 /*break*/, 15];
                    case 1: return [4 /*yield*/, this.PromiseGen().RaceWaitAndClick(this.Const().Selector.SC.scStartButton, this.PageDataMan().TopLevelWindow().DataDocSelf)
                            .then(function () { _this.PromiseGen().WaitForThenClick(_this.Const().Selector.SC.StartMenuLeftOption, _this.PageDataMan().TopLevelWindow().DataDocSelf); })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 16];
                    case 3:
                        this.locMan().AdminB(this.PageDataMan().TopLevelWindow().DataDocSelf, null);
                        return [3 /*break*/, 16];
                    case 4:
                        response = this.AtticMan().GetAllStorageAsIDataOneWindow();
                        return [3 /*break*/, 16];
                    case 5:
                        this.AtticMan().GetAllStorageAsIDataOneWindow();
                        return [3 /*break*/, 16];
                    case 6:
                        this.locMan().ChangeLocationSwitchBoard(scWindowType_1.scWindowType.Desktop, this.PageDataMan().TopLevelWindow());
                        return [3 /*break*/, 16];
                    case 7:
                        this.locMan().ChangeLocationSwitchBoard(scWindowType_1.scWindowType.ContentEditor, this.PageDataMan().TopLevelWindow());
                        return [3 /*break*/, 16];
                    case 8:
                        targetWin = this.PageDataMan().TopLevelWindow();
                        return [4 /*yield*/, this.OneWinMan().PublishActiveCE(targetWin)];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 16];
                    case 10:
                        this.locMan().SetScMode(payload.Data.ReqScMode, payload.Data.UseOriginalWindowLocation)
                            .then(function () { return _this.respondSuccessful(); })
                            .catch(function () { return _this.respondFail(); });
                        return [3 /*break*/, 16];
                    case 11: return [4 /*yield*/, this.__restoreClick(payload.Data)
                            .then(function () { return _this.respondSuccessful(); })
                            .catch(function () { return _this.respondFail(); })];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 16];
                    case 13:
                        this.NotifyCompleteOnContent(null, payload.Data.ScreenMessage);
                        _b.label = 14;
                    case 14:
                        this.Xyyz.OneWindowMan.SaveWindowState(this.PageDataMan().TopLevelWindow());
                        return [3 /*break*/, 16];
                    case 15: return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    MessagesManager.prototype.respondSuccessful = function () {
        this.MsgMan().SendMessage(new MsgPayloadResponseFromContent_1.MsgFromContent(MessageFlag_1.MsgFlag.TaskSuccessful));
    };
    MessagesManager.prototype.respondFail = function () {
        this.MsgMan().SendMessage(new MsgPayloadResponseFromContent_1.MsgFromContent(MessageFlag_1.MsgFlag.TaskFailed));
    };
    MessagesManager.prototype.SendMessage = function (msgflag) {
    };
    MessagesManager.prototype.__restoreClick = function (Data) {
        var _this = this;
        return new Promise(function () { return __awaiter(_this, void 0, void 0, function () {
            var dataOneWindowStorage, self, targetWindow, ex_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.debug().MarkerA();
                        dataOneWindowStorage = this.AtticMan().GetFromStorageById(Data.idOfSelect);
                        this.debug().MarkerB();
                        self = this;
                        return [4 /*yield*/, this.PageDataMan().GetTargetWindowAsync(Data.UseOriginalWindowLocation ? true : false, dataOneWindowStorage.WindowType)];
                    case 1:
                        targetWindow = _a.sent();
                        if (!targetWindow) return [3 /*break*/, 3];
                        return [4 /*yield*/, self.Xyyz.OneWindowMan.RestoreWindowStateToTarget(targetWindow, dataOneWindowStorage)
                                .then(function () { return _this.respondSuccessful(); })
                                .catch(function () { return _this.respondFail(); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        self.debug().Error(this.__restoreClick.name, 'no target window');
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ex_1 = _a.sent();
                        this.debug().Error(this.__restoreClick.name, ex_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    MessagesManager.prototype.IsDebugEnabled = function () {
        //this.AtticMan.CurrentSettings().DebugSettings.ShowDebugData;
        throw new Error("Method not implemented.");
    };
    MessagesManager.prototype.SetParentInfo = function (__winDataParent) {
    };
    return MessagesManager;
}(_ContentManagerBase_1.ContentManagerBase));
exports.MessagesManager = MessagesManager;
//# sourceMappingURL=MessagesManager.js.map