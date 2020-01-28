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
var PromiseChainRestoreDesktop = /** @class */ (function (_super) {
    __extends(PromiseChainRestoreDesktop, _super);
    function PromiseChainRestoreDesktop(xyyz) {
        var _this = this;
        xyyz.debug.FuncStart(PromiseChainRestoreDesktop.name);
        _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncEnd(PromiseChainRestoreDesktop.name);
        return _this;
    }
    PromiseChainRestoreDesktop.prototype.__waitForAndClickRedStartButtonPromise = function (promiseBucket) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.__waitForAndClickRedStartButtonPromise.name);
                        if (!this.MiscMan().NotNullOrUndefined([promiseBucket, promiseBucket.targetDoc], this.__waitForAndClickRedStartButtonPromise.name)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.PromiseGen().RaceWaitAndClick(this.Const().Selector.SC.scStartButton, promiseBucket.targetDoc)
                                .then(function () { return resolve(promiseBucket); })
                                .catch(function (ex) {
                                _this.debug().Error(_this.__waitForAndClickRedStartButtonPromise.name, ex);
                                reject();
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        reject();
                        _a.label = 3;
                    case 3:
                        this.debug().FuncEnd(this.__waitForAndClickRedStartButtonPromise.name);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    PromiseChainRestoreDesktop.prototype.__waitForIframeReady = function (promiseBucket) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.__waitForIframeReady.name, 'promiseBucket not null: ' + (promiseBucket !== null));
                        this.debug().PromiseBucketDebug(promiseBucket, this.__waitForIframeReady.name);
                        return [4 /*yield*/, this.PromiseGen().WaitForReadyIframe(promiseBucket.NewIframe)];
                    case 1:
                        success = _a.sent();
                        if (success) {
                            this.debug().Log('resolved! : ');
                            promiseBucket.NewIframe.ContentDoc.Document = promiseBucket.NewIframe.IframeElem.contentDocument;
                            this.debug().DebugDataOneIframe(promiseBucket.NewIframe);
                            resolve(promiseBucket);
                        }
                        else {
                            this.debug().Log('rejected ! : ');
                            reject(this.__waitForIframeReady.name);
                        }
                        this.debug().FuncEnd(this.__waitForIframeReady.name);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    PromiseChainRestoreDesktop.prototype.__waitForIframeCountDiffPromise = function (promiseBucket) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.__waitForIframeCountDiffPromise.name);
                        //this.debug().PromiseBucketDebug(promiseBucket, this.__waitForIframeCountDiffPromise.name);
                        //this.debug().ClearDebugText();
                        this.debug().MarkerA();
                        return [4 /*yield*/, this.DesktopMan().WaitForIframeCountDiffWorker(promiseBucket.IFramesbefore, promiseBucket.targetWindow)];
                    case 1:
                        success = _a.sent();
                        this.debug().MarkerB();
                        if (success) {
                            this.debug().MarkerC();
                            promiseBucket.NewIframe = success;
                            this.debug().DebugDataOneIframe(promiseBucket.NewIframe);
                            resolve(promiseBucket);
                        }
                        else {
                            reject(this.__waitForIframeCountDiffPromise.name);
                        }
                        this.debug().FuncEnd(this.__waitForIframeCountDiffPromise.name);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    PromiseChainRestoreDesktop.prototype.__waitForAndThenClickCEFromMenuPromise = function (promiseBucket) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.PromiseGen().WaitForThenClick(this.Const().Selector.SC.StartMenuLeftOption, promiseBucket.targetWindow.DataDocSelf)
                            .then(function () { resolve(promiseBucket); })
                            .catch(function (ex) { reject(_this.__waitForAndThenClickCEFromMenuPromise.name); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    PromiseChainRestoreDesktop.prototype.__restoreDataToOneIframe = function (promiseBucket) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.__restoreDataToOneIframe.name);
                        this.debug().DebugDataOneIframe(promiseBucket.NewIframe);
                        return [4 /*yield*/, this.DesktopMan().RestoreDataToOneIframeWorker(promiseBucket.oneCEdata, promiseBucket.NewIframe)];
                    case 1:
                        success = _a.sent();
                        if (success) {
                            resolve(promiseBucket);
                        }
                        else {
                            reject(this.__restoreDataToOneIframe.name);
                        }
                        this.debug().FuncEnd(this.__restoreDataToOneIframe.name);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    PromiseChainRestoreDesktop.prototype.RunOneChain = function (targetWindow, dataToRestore) {
        return __awaiter(this, void 0, void 0, function () {
            var allIframeData, dataBucket;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.RunOneChain.name);
                        if (!this.MiscMan().NotNullOrUndefined([targetWindow, dataToRestore], this.RunOneChain.name)) return [3 /*break*/, 2];
                        allIframeData = this.DesktopMan().GetAllLiveIframeData(targetWindow);
                        dataBucket = {
                            targetWindow: targetWindow,
                            targetDoc: targetWindow.DataDocSelf,
                            IFramesbefore: allIframeData,
                            oneCEdata: dataToRestore,
                            NewIframe: null,
                            LastChainLinkSuccessful: false,
                        };
                        //this.debug().PromiseBucketDebug(dataBucket, this.RunOneChain.name);
                        return [4 /*yield*/, this.__waitForAndClickRedStartButtonPromise(dataBucket)
                                .then(function (dataBucket) { return _this.__waitForAndThenClickCEFromMenuPromise(dataBucket); })
                                .then(function (dataBucket) { return _this.__waitForIframeCountDiffPromise(dataBucket); })
                                .then(function (dataBucket) { return _this.__waitForIframeReady(dataBucket); })
                                .then(function (dataBucket) { return _this.__restoreDataToOneIframe(dataBucket); })
                                .catch(function (ex) {
                                _this.debug().Error(_this.RunOneChain.name, ex);
                            })];
                    case 1:
                        //this.debug().PromiseBucketDebug(dataBucket, this.RunOneChain.name);
                        _a.sent();
                        this.debug().FuncEnd(this.RunOneChain.name);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return PromiseChainRestoreDesktop;
}(_ContentManagerBase_1.ContentManagerBase));
exports.PromiseChainRestoreDesktop = PromiseChainRestoreDesktop;
//# sourceMappingURL=PromiseChainRestoreDesktop.js.map