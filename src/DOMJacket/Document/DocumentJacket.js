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
exports.DocumentJacket = void 0;
var IterationDrone_1 = require("../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone");
var ReadyState_1 = require("../../Shared/scripts/Classes/ReadyState");
var InjectConst_1 = require("../../Shared/scripts/Interfaces/InjectConst");
var ElementJacket_1 = require("../Elements/ElementJacket");
var UrlJacket_1 = require("../UrlJacket");
var SharedConst_1 = require("../../Shared/scripts/SharedConst");
var Guid_1 = require("../../Shared/scripts/Helpers/Guid");
var PromiseFailAction_1 = require("../../Shared/scripts/Enums/PromiseFailAction");
var StaticHelpers_1 = require("../../Shared/scripts/Classes/StaticHelpers");
var _CommonCoreBase_1 = require("../../Shared/scripts/_CommonCoreBase");
var DocumentJacket_Watcher_1 = require("./DocumentJacket.Watcher");
var ElementFrameJacket_1 = require("../Elements/ElementFrameJacket");
var DocumentProxyMutationEvent_Subject_1 = require("../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/DocumentProxyMutationEvent_Subject");
var DocumentJacket = /** @class */ (function (_super) {
    __extends(DocumentJacket, _super);
    function DocumentJacket(commonCore, nativeDocument) {
        var _this = _super.call(this, commonCore) || this;
        _this.DocId = Guid_1.Guid.NewRandomGuid();
        _this.NativeDocument = nativeDocument;
        _this.UrlJacket = new UrlJacket_1.UrlJacket(_this.CommonCore, nativeDocument.URL);
        _this.Instantiate();
        return _this;
    }
    DocumentJacket.prototype.Instantiate = function () {
        this.DocumentJacketMutationEvent_Subject = new DocumentProxyMutationEvent_Subject_1.DocumentJacketMutationEvent_Subject(this.CommonCore);
        this.DocumentJacketWatcher = new DocumentJacket_Watcher_1.DocumentJacket_Watcher(this.CommonCore, this, this.DocumentJacketMutationEvent_Subject);
    };
    DocumentJacket.prototype.GetElementById = function (idStr) {
        var elementJacket = null;
        var htmlElement = this.NativeDocument.getElementById(idStr);
        if (htmlElement) {
            elementJacket = new ElementJacket_1.ElementJacket(this.CommonCore, htmlElement);
        }
        return elementJacket;
    };
    DocumentJacket.prototype.QuerySelector = function (selector) {
        var elementJacket = null;
        var htmlElement = this.NativeDocument.querySelector(selector);
        if (htmlElement) {
            elementJacket = new ElementJacket_1.ElementJacket(this.CommonCore, htmlElement);
        }
        return elementJacket;
    };
    DocumentJacket.prototype.GetContentDoc = function () {
        return this.NativeDocument;
    };
    DocumentJacket.prototype.GetParentJacket = function () {
        this.Logger.FuncStart(this.GetParentJacket.name);
        var toReturn = null;
        var thisParent = parent.document;
        if (thisParent) {
            toReturn = new DocumentJacket(this.CommonCore, thisParent);
        }
        this.Logger.FuncEnd(this.GetParentJacket.name);
        return toReturn;
    };
    DocumentJacket.prototype.WaitForFirstHostedFrame = function (querySelector) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var firstFrameJacket;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.WaitForFirstHostedFrame.name, querySelector);
                                    firstFrameJacket = null;
                                    return [4 /*yield*/, this.WaitForElem(querySelector)
                                            .then(function (elemJacket) { return resolve(new ElementFrameJacket_1.ElementFrameJacket(_this.CommonCore, elemJacket.NativeElement)); })
                                            .catch(function (err) { return reject(_this.ErrorHand.FormatRejectMessage([_this.WaitForFirstHostedFrame.name], err)); })];
                                case 1:
                                    _a.sent();
                                    //  let matchingJackets: FrameJacket[] = this.GetHostedFramesFilteredBySelector(querySelector);
                                    //if (matchingJackets && matchingJackets.length > 0) {
                                    //  firstFrameJacket = matchingJackets[0];
                                    //}
                                    this.Logger.FuncEnd(this.WaitForFirstHostedFrame.name, querySelector);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DocumentJacket.prototype.GetHostedFramesFilteredBySelector = function (querySelector) {
        var _this = this;
        this.Logger.FuncStart(this.GetHostedFramesFilteredBySelector.name, querySelector);
        var frameJackets = [];
        this.ErrorHand.ThrowIfNullOrUndefined(this.GetHostedFramesFilteredBySelector.name, [this.NativeDocument]);
        var queryResultIframes = this.NativeDocument.querySelectorAll('iframe');
        this.Logger.LogVal('found iframes', queryResultIframes.length);
        var filteredList = this.NativeDocument.querySelectorAll('iframe' + querySelector);
        this.Logger.LogVal('found filtered iframes', filteredList.length);
        if (filteredList && filteredList.length > 0) {
            filteredList.forEach(function (iframeNode) {
                var candidate = new ElementFrameJacket_1.ElementFrameJacket(_this.CommonCore, iframeNode);
                if (candidate) {
                    frameJackets.push(candidate);
                }
                else {
                    _this.Logger.Log('one of the iframes did not work');
                }
            });
        }
        this.Logger.FuncEnd(this.GetHostedFramesFilteredBySelector.name, querySelector);
        return frameJackets;
    };
    DocumentJacket.prototype.GetHostedFrameJackets = function () {
        var frameJackets = [];
        this.ErrorHand.ThrowIfNullOrUndefined(this.GetHostedFrameJackets.name, [this.NativeDocument]);
        var queryResults = this.NativeDocument.querySelectorAll(InjectConst_1.ContentConst.Const.Selector.SC.IframeContent.sc920);
        if (!queryResults) {
            queryResults = this.NativeDocument.querySelectorAll(InjectConst_1.ContentConst.Const.Selector.SC.IframeContent.sc820);
        }
        if (queryResults) {
            for (var ifrIdx = 0; ifrIdx < queryResults.length; ifrIdx++) {
                var frameJacket = new ElementFrameJacket_1.ElementFrameJacket(this.CommonCore, queryResults[ifrIdx]);
                if (frameJacket) {
                    frameJackets.push(frameJacket);
                }
            }
        }
        this.Logger.LogVal('found iframes count', frameJackets.length);
        return frameJackets;
    };
    DocumentJacket.prototype.Validate = function () {
        var url = this.UrlJacket.BuildFullUrlFromParts();
        if (!url) {
            this.ErrorHand.ErrorAndThrow(this.Validate.name, 'No URL');
        }
        else if (url.AbsUrl === SharedConst_1.SharedConst.Const.UrlSuffix.AboutBlank) {
            this.ErrorHand.ErrorAndThrow(this.Validate.name, SharedConst_1.SharedConst.Const.UrlSuffix.AboutBlank + ' not allowed');
        }
    };
    DocumentJacket.prototype.WaitForElem = function (selector, promiseFailAction) {
        if (promiseFailAction === void 0) { promiseFailAction = PromiseFailAction_1.PromiseFailAction.Default; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var toReturnFoundElem, iterationJr, firstFind, elemJacket;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.WaitForElem.name, selector);
                                    toReturnFoundElem = null;
                                    iterationJr = new IterationDrone_1.IterationDrone(this.CommonCore, this.WaitForElem.name + ' - selector: "' + selector + '"', true);
                                    firstFind = true;
                                    _a.label = 1;
                                case 1:
                                    if (!(!toReturnFoundElem && iterationJr.DecrementAndKeepGoing())) return [3 /*break*/, 5];
                                    toReturnFoundElem = this.NativeDocument.querySelector(selector);
                                    if (!(toReturnFoundElem && !StaticHelpers_1.StaticHelpers.IsNullOrUndefined(toReturnFoundElem))) return [3 /*break*/, 2];
                                    if (firstFind) {
                                        toReturnFoundElem = null;
                                        firstFind = false;
                                    }
                                    else {
                                        this.Logger.Log('found it');
                                        elemJacket = new ElementJacket_1.ElementJacket(this.CommonCore, toReturnFoundElem);
                                        this.Logger.LogAsJsonPretty('found', elemJacket);
                                        resolve(elemJacket);
                                    }
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, iterationJr.Wait()];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [3 /*break*/, 1];
                                case 5:
                                    if (promiseFailAction === PromiseFailAction_1.PromiseFailAction.Default || promiseFailAction == PromiseFailAction_1.PromiseFailAction.RejectThrow) {
                                        reject(iterationJr.IsExhaustedMsg);
                                    }
                                    else if (promiseFailAction === PromiseFailAction_1.PromiseFailAction.ResolveNull) {
                                        resolve(null);
                                    }
                                    this.Logger.FuncEnd(this.WaitForElem.name, selector);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DocumentJacket.prototype.WaitForThenClick = function (selectorAr) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var foundHtmlElement, iterationJr, foundSelector, idx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // todo - maybe just get the body element and then use the elementjacket methods to find the target elem
                        this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForThenClick.name, [selectorAr, this.NativeDocument]);
                        foundHtmlElement = null;
                        iterationJr = new IterationDrone_1.IterationDrone(this.CommonCore, this.WaitForThenClick.name + ' | ' + JSON.stringify(selectorAr), true);
                        foundSelector = '';
                        _a.label = 1;
                    case 1:
                        if (!(!foundHtmlElement && iterationJr.DecrementAndKeepGoing())) return [3 /*break*/, 3];
                        for (idx = 0; idx < selectorAr.length; idx++) {
                            foundSelector = selectorAr[idx];
                            foundHtmlElement = this.NativeDocument.querySelector(foundSelector);
                            if (foundHtmlElement) {
                                break;
                            }
                        }
                        return [4 /*yield*/, iterationJr.Wait()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        if (foundHtmlElement) {
                            try {
                                this.Logger.LogAsJsonPretty(this.WaitForThenClick.name + ' clicking', foundSelector);
                                foundHtmlElement.click();
                                resolve();
                            }
                            catch (err) {
                                reject(this.WaitForThenClick.name + ' | ' + err);
                            }
                        }
                        else {
                            if (!foundHtmlElement && iterationJr.IsExhausted) {
                                reject(iterationJr.IsExhaustedMsg);
                            }
                            else {
                                reject('unknown reason');
                            }
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    DocumentJacket.prototype.RaceWaitAndClick = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.WaitForThenClick([selector.sc920, selector.sc820])
                                        .then(function () { return resolve(); })
                                        .catch(function (err) { return reject(_this.RaceWaitAndClick.name + ' | ' + err); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DocumentJacket.prototype.WaitForAndClickWithPayload = function (selector, payload) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.WaitForAndClickWithPayload.name, selector);
                        return [4 /*yield*/, this.WaitForThenClick([selector])
                                .then(function () { return resolve(payload); })
                                .catch(function (ex) {
                                _this.ErrorHand.ErrorAndThrow(_this.WaitForAndClickWithPayload.name, ex);
                                reject(ex);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    DocumentJacket.prototype.WaitForCompleteNAB_DocumentJacket = function (friendly) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var iterationJr, readyStateNAB;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.WaitForCompleteNAB_DocumentJacket.name, friendly);
                                    this.Logger.LogVal('url', this.NativeDocument.URL);
                                    this.Logger.LogVal('readyState', this.NativeDocument.readyState);
                                    this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForCompleteNAB_DocumentJacket.name, this.NativeDocument);
                                    iterationJr = new IterationDrone_1.IterationDrone(this.CommonCore, this.WaitForCompleteNAB_DocumentJacket.name, false);
                                    readyStateNAB = new ReadyState_1.ReadyStateNAB(this.CommonCore, this.NativeDocument);
                                    _a.label = 1;
                                case 1:
                                    if (!(iterationJr.DecrementAndKeepGoing() && !readyStateNAB.IsCompleteNAB())) return [3 /*break*/, 3];
                                    readyStateNAB.LogDebugValues();
                                    return [4 /*yield*/, iterationJr.Wait()];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 1];
                                case 3:
                                    if (iterationJr.IsExhausted) {
                                        this.Logger.Log(iterationJr.IsExhaustedMsg);
                                        reject(iterationJr.IsExhaustedMsg);
                                    }
                                    else {
                                        resolve(readyStateNAB);
                                    }
                                    this.Logger.FuncEnd(this.WaitForCompleteNAB_DocumentJacket.name, friendly);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return DocumentJacket;
}(_CommonCoreBase_1._CommonBase));
exports.DocumentJacket = DocumentJacket;
//# sourceMappingURL=DocumentJacket.js.map