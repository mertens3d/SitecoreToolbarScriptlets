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
var IterationHelper_1 = require("../Classes/IterationHelper");
var PromiseGeneric = /** @class */ (function (_super) {
    __extends(PromiseGeneric, _super);
    function PromiseGeneric(xyyz) {
        var _this = this;
        xyyz.debug.FuncStart(PromiseGeneric.name);
        _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncEnd(PromiseGeneric.name);
        return _this;
    }
    PromiseGeneric.prototype.WaitForReadyIframe = function (dataOneIframe) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var iterationJr, isReady, currentReadyState, isReadyStateComplete;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.debug().FuncStart(this.WaitForReadyIframe.name, dataOneIframe.Nickname + ' ' + dataOneIframe.Id.asShort);
                                    this.debug().DebugDataOneIframe(dataOneIframe);
                                    iterationJr = new IterationHelper_1.IterationHelper(this.Xyyz, this.WaitForReadyIframe.name);
                                    isReady = false;
                                    this.debug().MarkerA();
                                    _a.label = 1;
                                case 1:
                                    if (!(iterationJr.DecrementAndKeepGoing() && !isReady)) return [3 /*break*/, 5];
                                    this.debug().MarkerB();
                                    currentReadyState = dataOneIframe.IframeElem.contentDocument.readyState.toString();
                                    isReadyStateComplete = currentReadyState === 'complete';
                                    this.debug().Log('currentReadyState : ' + currentReadyState);
                                    ;
                                    //if (currentReadyState !== 'uninitialized') {
                                    //  this.debug().Log('id: ' + dataOneIframe.IframeElem.id)
                                    //}
                                    this.debug().MarkerC();
                                    this.debug().Log('isReadyStateComplete: ' + isReadyStateComplete);
                                    if (!isReadyStateComplete) return [3 /*break*/, 2];
                                    this.debug().Log('toReturn A is true');
                                    isReady = true;
                                    dataOneIframe.ContentDoc = this.Utilites().DataOneContentDocFactoryFromIframe(dataOneIframe.IframeElem, dataOneIframe.ContentDoc.ParentDoc, dataOneIframe.Nickname);
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, iterationJr.Wait()];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [3 /*break*/, 1];
                                case 5:
                                    this.debug().DebugDataOneIframe(dataOneIframe);
                                    this.debug().FuncEnd(this.WaitForReadyIframe.name, dataOneIframe.Nickname + ' : ' + currentReadyState + ' is ready: ' + isReady.toString());
                                    ;
                                    resolve(dataOneIframe);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PromiseGeneric.prototype.WaitForAndReturnReadyIframe = function (targetDoc, selector, nickname) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var iframeData;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.WaitForAndReturnFoundElem(targetDoc, selector)
                                        .then(function (foundElem) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            if (foundElem) {
                                                iframeData = this.Utilites().DateOneIframeFactory(foundElem, targetDoc, nickname);
                                                this.debug().DebugDataOneIframe(iframeData);
                                                return [2 /*return*/, iframeData];
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); })
                                        .then(function (iframeData) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, this.PromiseGen().WaitForReadyIframe(iframeData)];
                                                case 1:
                                                    iframeData = _a.sent();
                                                    resolve(iframeData);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PromiseGeneric.prototype.WaitForAndReturnFoundElem = function (targetDoc, selector, overrideIterCount) {
        if (overrideIterCount === void 0) { overrideIterCount = 8; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var found, iterationJr;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.debug().FuncStart(this.WaitForAndReturnFoundElem.name, 'selector: ' + selector + ' nickname: ' + targetDoc.Nickname);
                                    found = null;
                                    iterationJr = new IterationHelper_1.IterationHelper(this.Xyyz, this.WaitForAndReturnFoundElem.name, overrideIterCount);
                                    _a.label = 1;
                                case 1:
                                    if (!(!found && iterationJr.DecrementAndKeepGoing())) return [3 /*break*/, 5];
                                    this.debug().LogVal('targetDoc.Document', targetDoc.Document.toString());
                                    this.debug().LogVal('targetDoc.Document.location', targetDoc.Document.location.toString());
                                    this.debug().LogVal('targetDoc.Document.location.href', targetDoc.Document.location.href);
                                    found = targetDoc.Document.querySelector(selector);
                                    if (!found) return [3 /*break*/, 2];
                                    this.debug().Log('found');
                                    this.debug().LogVal('found.style.display', found.style.display);
                                    this.debug().FuncEnd(this.WaitForAndReturnFoundElem.name, selector + targetDoc.Document.location.href);
                                    resolve(found);
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, iterationJr.Wait()];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [3 /*break*/, 1];
                                case 5:
                                    if (!found && iterationJr.IsExhausted) {
                                        this.debug().FuncEnd(this.WaitForAndReturnFoundElem.name, selector + targetDoc.Document.location.href);
                                        reject('exhausted');
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PromiseGeneric.prototype.WaitForPageReadyNative = function (targetWindow) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var iterationJr, loaded;
                        return __generator(this, function (_a) {
                            this.debug().FuncStart(this.WaitForPageReadyNative.name);
                            iterationJr = new IterationHelper_1.IterationHelper(this.Xyyz, this.WaitForThenClick.name, 5);
                            loaded = false;
                            if (this.MiscMan().NotNullOrUndefined(targetWindow, this.WaitForPageReadyNative.name + ' document')) 
                            //&& this.MiscMan().NotNullOrUndefined(document.location, this.WaitForPageReadyNative.name + ' location'))
                            {
                                //this.debug().LogVal('document', targetWindow.DataDocSelf.Document.location.href);
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    PromiseGeneric.prototype.WaitForAndClickWithPayload = function (selector, targetDoc, payload) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.WaitForAndClickWithPayload.name, selector);
                        return [4 /*yield*/, this.PromiseGen().WaitForThenClick(selector, targetDoc)
                                .then(function () { return resolve(payload); })
                                .catch(function (ex) {
                                _this.debug().Error(_this.WaitForAndClickWithPayload.name, ex);
                                reject(ex);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    PromiseGeneric.prototype.WaitForPageReady = function (targetWindow) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.debug().FuncStart(this.WaitForPageReady.name);
                                    this.debug().NotNullCheck('toReturn', targetWindow);
                                    this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf);
                                    this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf.Document);
                                    this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf.Document.location);
                                    this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf.Document.location.href);
                                    this.debug().LogVal('targetWindow.DataDocSelf.Document.location.href', targetWindow.DataDocSelf.Document.location.href);
                                    if (!targetWindow) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.WaitForPageReadyNative(targetWindow)
                                            .then(function () { return resolve(); })
                                            .catch(function (ex) {
                                            reject(ex);
                                        })];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    this.debug().FuncEnd(this.WaitForPageReady.name);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PromiseGeneric.prototype.RaceWaitAndClick = function (selector, targetDoc, resolveFn) {
        if (resolveFn === void 0) { resolveFn = null; }
        return __awaiter(this, void 0, void 0, function () {
            var prom1, prom2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.RaceWaitAndClick.name);
                        prom1 = this.WaitForThenClick(selector.sc920, targetDoc, resolveFn);
                        prom2 = this.WaitForThenClick(selector.sc820, targetDoc, resolveFn);
                        this.debug().FuncEnd(this.RaceWaitAndClick.name);
                        return [4 /*yield*/, Promise.race([prom1, prom2])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PromiseGeneric.prototype.WaitForThenClick = function (selector, targetDoc, resolveFn) {
        var _this = this;
        if (resolveFn === void 0) { resolveFn = null; }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var found, iterationJr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!targetDoc) return [3 /*break*/, 6];
                        this.debug().FuncStart(this.WaitForThenClick.name, selector);
                        found = null;
                        iterationJr = new IterationHelper_1.IterationHelper(this.Xyyz, this.WaitForThenClick.name);
                        _a.label = 1;
                    case 1:
                        if (!(!found && iterationJr.DecrementAndKeepGoing() && !this.MsgMan().OperationCancelled)) return [3 /*break*/, 5];
                        found = targetDoc.Document.querySelector(selector);
                        if (!found) return [3 /*break*/, 2];
                        this.debug().Log('found and clicking');
                        found.click();
                        this.debug().FuncEnd(this.WaitForThenClick.name, selector);
                        if (resolveFn) {
                            resolveFn();
                        }
                        resolve();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, iterationJr.Wait()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        reject();
                        _a.label = 7;
                    case 7:
                        this.debug().FuncEnd(this.WaitForThenClick.name, selector);
                        if (!found && iterationJr.IsExhausted) {
                            reject('exhausted');
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return PromiseGeneric;
}(_ContentManagerBase_1.ContentManagerBase));
exports.PromiseGeneric = PromiseGeneric;
//# sourceMappingURL=PromiseGeneric.js.map