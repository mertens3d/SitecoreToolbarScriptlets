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
exports.FrameHelper = void 0;
var RecipeBasics_1 = require("../../../Shared/scripts/Classes/RecipeBasics");
var FactoryHelper_1 = require("../../../Shared/scripts/Helpers/FactoryHelper");
var InjectConst_1 = require("../../../Shared/scripts/Interfaces/InjectConst");
var LoggableBase_1 = require("../../../Shared/scripts/LoggableBase");
var FrameHelper = /** @class */ (function (_super) {
    __extends(FrameHelper, _super);
    function FrameHelper(logger) {
        var _this = _super.call(this, logger) || this;
        _this.RecipeBasics = new RecipeBasics_1.RecipeBasics(_this.Logger);
        _this.factoryHelper = new FactoryHelper_1.FactoryHelper(_this.Logger);
        return _this;
    }
    FrameHelper.prototype.GetIFramesFromDataOneDoc = function (targetDoc) {
        var toReturnIframeAr = [];
        if (!this.Logger.IfNullOrUndefinedThrow(this.GetIFramesFromDataOneDoc.name, targetDoc)) {
            var queryResults = targetDoc.ContentDoc.querySelectorAll(InjectConst_1.ContentConst.Const.Selector.SC.IframeContent.sc920);
            if (!queryResults) {
                queryResults = targetDoc.ContentDoc.querySelectorAll(InjectConst_1.ContentConst.Const.Selector.SC.IframeContent.sc820);
            }
            if (queryResults) {
                for (var ifrIdx = 0; ifrIdx < queryResults.length; ifrIdx++) {
                    var iframeElem = queryResults[ifrIdx];
                    if (iframeElem) {
                        toReturnIframeAr.push(iframeElem);
                    }
                }
            }
        }
        else {
            this.Logger.ErrorAndThrow(this.GetIFramesFromDataOneDoc.name, 'null check');
        }
        this.Logger.LogVal('found iframes count', toReturnIframeAr.length);
        return toReturnIframeAr;
    };
    FrameHelper.prototype.GetIFrameAsBaseFrameProxy = function (iframeElem, ifrIdx) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.RecipeBasics.WaitForReadyNABHtmlIframeElement(iframeElem)
                                        .then(function () { return _this.factoryHelper.BaseFramePromiseFactory(iframeElem, 'desktop Iframe_' + ifrIdx); })
                                        .then(function (result) { return resolve(result); })
                                        .catch(function (err) { return reject(_this.GetIFramesAsBaseFrameProxies.name + ' | ' + err); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    FrameHelper.prototype.GetIFrameAsDTFrameProxy = function (iframeElem) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.RecipeBasics.WaitForReadyNABHtmlIframeElement(iframeElem)
                                        .then(function () { return _this.factoryHelper.DTFrameProxyFactory(iframeElem); })
                                        .then(function (result) { return resolve(result); })
                                        .catch(function (err) { return reject(_this.GetIFramesAsBaseFrameProxies.name + ' | ' + err); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    FrameHelper.prototype.GetIFramesAsDTFrameProxies = function (dataOneDoc) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.Logger.FuncStart(_this.GetIFramesAsBaseFrameProxies.name);
                        var toReturn = [];
                        var iframeAr = _this.GetIFramesFromDataOneDoc(dataOneDoc);
                        var promiseAr = [];
                        iframeAr.forEach(function (iframeElem) {
                            promiseAr.push(_this.GetIFrameAsDTFrameProxy(iframeElem));
                        });
                        Promise.all(promiseAr)
                            .then(function (values) {
                            values.forEach(function (oneVal) {
                                toReturn.push(oneVal);
                            });
                            _this.Logger.LogVal('count: ', toReturn.length);
                        })
                            .then(function () { return resolve(toReturn); })
                            .catch(function (err) { return reject(_this.GetIFramesAsBaseFrameProxies.name + ' | ' + err); });
                        _this.Logger.FuncEnd(_this.GetIFramesAsBaseFrameProxies.name);
                    })];
            });
        });
    };
    FrameHelper.prototype.GetIFramesAsBaseFrameProxies = function (targetDoc) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.Logger.FuncStart(_this.GetIFramesAsBaseFrameProxies.name);
                        var toReturn = [];
                        var iframeAr = _this.GetIFramesFromDataOneDoc(targetDoc);
                        //if (iframeAr) {
                        //  iframeAr.forEach(async (iframeElem: HTMLIFrameElement, ifrIdx) => {
                        //    await this.RecipeBasics.WaitForPageReadyHtmlIframeElement(iframeElem)
                        //      .then(() => factoryHelper.FrameProxyForPromiseFactory(iframeElem, 'desktop Iframe_' + ifrIdx))
                        //      .then((result: _BaseFrameProxy) => toReturn.push(result))
                        //      .catch((err) => reject(this.GetIFramesAsFrameProxies.name + ' | ' + err));
                        //  });
                        //}
                        var promAr = [];
                        iframeAr.forEach(function (iframeElem, index) {
                            promAr.push(_this.GetIFrameAsBaseFrameProxy(iframeElem, index));
                        });
                        Promise.all(promAr)
                            .then(function (values) {
                            values.forEach(function (oneVal) {
                                toReturn.push(oneVal);
                            });
                            _this.Logger.LogVal('count: ', toReturn.length);
                        })
                            .then(function () { return resolve(toReturn); })
                            .catch(function (err) { return reject(_this.GetIFramesAsBaseFrameProxies.name + ' | ' + err); });
                        _this.Logger.FuncEnd(_this.GetIFramesAsBaseFrameProxies.name);
                    })];
            });
        });
    };
    return FrameHelper;
}(LoggableBase_1.LoggableBase));
exports.FrameHelper = FrameHelper;
//# sourceMappingURL=FrameHelper.js.map