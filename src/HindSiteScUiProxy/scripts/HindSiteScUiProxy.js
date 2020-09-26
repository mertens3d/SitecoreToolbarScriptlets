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
exports.HindSiteScUiProxy = void 0;
var SnapShotFlavor_1 = require("../../Shared/scripts/Enums/SnapShotFlavor");
var LoggableBase_1 = require("../../Shared/scripts/LoggableBase");
var ScWindowProxy_1 = require("./Proxies/ScWindowProxy");
var HindSiteScUiProxy = /** @class */ (function (_super) {
    __extends(HindSiteScUiProxy, _super);
    function HindSiteScUiProxy(logger, scUiMan, scUrlAgent, TopDoc, toastAgent) {
        var _this = _super.call(this, logger) || this;
        _this.Logger.FuncStart(HindSiteScUiProxy.name);
        _this.ScUrlAgent = scUrlAgent;
        _this.ScUiMan = scUiMan;
        _this.TopLevelDoc = TopDoc;
        _this.ToastAgent = toastAgent;
        _this.InitscWinProxy();
        _this.Logger.FuncEnd(HindSiteScUiProxy.name);
        return _this;
    }
    HindSiteScUiProxy.prototype.OnReadyInitScWindowManager = function () {
        this.ScWindowProxy.OnReadyInitScWindowManager();
    };
    HindSiteScUiProxy.prototype.InitscWinProxy = function () {
        this.ScWindowProxy = new ScWindowProxy_1.ScWindowProxy(this.Logger, this.ScUrlAgent);
    };
    HindSiteScUiProxy.prototype.GetStateOfSitecoreWindow = function (snapshotFlavor) {
        return this.ScWindowProxy.GetStateOfSitecoreWindow(snapshotFlavor);
    };
    HindSiteScUiProxy.prototype.RaiseToastNotification = function (arg0) {
        this.ToastAgent.RaiseToastNotification(this.TopLevelDoc, arg0);
    };
    //async UpdateNickname(commandData: ICommandHndlrDataForContent): Promise<void> {
    //  return new Promise(async (resolve, reject) => {
    //    await new RecipeChangeNickName(commandData).Execute()
    //      .then(() => resolve())
    //      .catch((err) => reject(err));
    //  })
    //}
    HindSiteScUiProxy.prototype.GetStateOfScWindow = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var reply;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reply = null;
                        return [4 /*yield*/, this.ScWindowProxy.GetStateOfSitecoreWindow(SnapShotFlavor_1.SnapShotFlavor.Live)
                                .then(function (result) { return reply = result; })
                                .then(function () { return reply.ErrorStack = _this.Logger.ErrorStack; })
                                .then(function () { return resolve(reply); })
                                .catch(function (err) { return reject(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    //Notify(payloadData: PayloadDataFromPopUp): Promise<void> {
    //  return new Promise(async (resolve, reject) => {
    //    this.ToastAgent.PopUpToastNotification(this.scWinProxy.GetTopLevelDoc(), payloadData.ToastMessage);
    //  });
    //}
    HindSiteScUiProxy.prototype.AddCETabAsync = function (apiCallPayload) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.ScWindowProxy.DesktopProxy.AddContentEditorTabAsync()
                    .then(function () { return resolve(); })
                    .catch(function (err) { return reject(); });
                return [2 /*return*/];
            });
        }); });
    };
    HindSiteScUiProxy.prototype.PublischActiveCE = function (commandData) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.ScWindowProxy.PublishActiveCE()
                    .then(function () { return resolve(); })
                    .ca;
                return [2 /*return*/];
            });
        }); });
    };
    HindSiteScUiProxy.prototype.ToggleCompactCss = function (commandData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    HindSiteScUiProxy.prototype.SetStateOfSitecoreWindowAsync = function (commandData, dataOneWindowStorage) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.ScWindowProxy.SetStateOfScWin(dataOneWindowStorage)
                    .then(function () { return resolve(); })
                    .catch(function (err) { return reject(err); });
                return [2 /*return*/];
            });
        }); });
    };
    HindSiteScUiProxy.prototype.OpenContentEditor = function () {
        throw new Error("Method not implemented.");
    };
    HindSiteScUiProxy.prototype.AdminB = function (commandData) {
        this.ScUiMan.AdminB(this.TopLevelDoc, null);
    };
    return HindSiteScUiProxy;
}(LoggableBase_1.LoggableBase));
exports.HindSiteScUiProxy = HindSiteScUiProxy;
//# sourceMappingURL=HindSiteScUiProxy.js.map