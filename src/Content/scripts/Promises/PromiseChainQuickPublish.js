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
var PromiseChainQuickPublish = /** @class */ (function (_super) {
    __extends(PromiseChainQuickPublish, _super);
    function PromiseChainQuickPublish(xyyz) {
        //xyyz.debug.FuncStart(PromiseChainQuickPublish.name);
        return _super.call(this, xyyz) || this;
        //xyyz.debug.FuncEnd(PromiseChainQuickPublish.name);
    }
    PromiseChainQuickPublish.prototype.__debugDataPublishChain = function (dataPublishChain, nickname) {
        this.debug().FuncStart(this.__debugDataPublishChain.name, nickname);
        this.debug().LogVal('docToPublish', this.debug().IsNullOrUndefined(dataPublishChain.docToPublish));
        this.debug().LogVal('jqIframe', this.debug().IsNullOrUndefined(dataPublishChain.jqIframe) + ' ' + (dataPublishChain.jqIframe ? dataPublishChain.jqIframe.IframeElem.src : ''));
        this.debug().LogVal('Iframe0blueIframe', this.debug().IsNullOrUndefined(dataPublishChain.Iframe0Blue) + ' ' + (dataPublishChain.Iframe0Blue ? dataPublishChain.Iframe0Blue.IframeElem.src : ''));
        this.debug().LogVal('messageDialogIframeRed', this.debug().IsNullOrUndefined(dataPublishChain.messageDialogIframeRed) + ' ' + (dataPublishChain.messageDialogIframeRed ? dataPublishChain.messageDialogIframeRed.IframeElem.src : ''));
        this.debug().FuncEnd(this.__debugDataPublishChain.name);
        return dataPublishChain;
    };
    PromiseChainQuickPublish.prototype.PublishCE = function (docToPublish) {
        return __awaiter(this, void 0, void 0, function () {
            var dataPublishChain;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.PublishCE.name);
                        dataPublishChain = {
                            docToPublish: docToPublish,
                            TopLevelDoc: this.PageDataMan().TopLevelWindow().DataDocSelf,
                            Iframe0Blue: null,
                            jqIframe: null,
                            messageDialogIframeRed: null
                        };
                        return [4 /*yield*/, this.PromiseOneStep().ClickPublishOnNav(dataPublishChain)
                                .then(function (dataPublishChain) { return _this.PromiseOneStep().ClickMenuButtonPublishDropDown(dataPublishChain); })
                                .then(function (dataPublishChain) { return _this.__debugDataPublishChain(dataPublishChain, 'post ClickMenuButtonPublishDropDown'); })
                                .then(function (dataPublishChain) { return _this.PromiseOneStep().ClickMenuDropDownPublishItem(dataPublishChain); })
                                .then(function (dataPublishChain) { return _this.__debugDataPublishChain(dataPublishChain, 'post MenuDropDownPublishItem'); })
                                .then(function (dataPublishChain) { return _this.PromiseOneStep().GetThePublishItemDialog(dataPublishChain); })
                                .then(function (dataPublishChain) { return _this.__debugDataPublishChain(dataPublishChain, 'post PublishItemDialog'); })
                                .then(function (dataPublishChain) { return _this.GetDialogIframe0Blue(dataPublishChain); })
                                .then(function (dataPublishChain) { return _this.__WaitForAndClickPublishNextButton(dataPublishChain); })
                                .then(function (dataPublishChain) { return _this.GetMessageDialog(dataPublishChain); })
                                .then(function (dataPublishChain) { return _this.__waitForAndClickOk(dataPublishChain); })
                                .then(function (dataPublishChain) { return _this.__waitForAndClickClose(dataPublishChain); })
                                .catch(function (ex) {
                                _this.debug().Error(_this.PublishCE.name, ex);
                            })];
                    case 1:
                        _a.sent();
                        this.debug().FuncEnd(this.PublishCE.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    PromiseChainQuickPublish.prototype.__waitForAndClickClose = function (dataPublishChain) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.PromiseGen().WaitForAndReturnFoundElem(dataPublishChain.Iframe0Blue.ContentDoc, this.Const().Selector.SC.Publish.SettingsHidden)
                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.PromiseGen().WaitForAndReturnFoundElem(dataPublishChain.Iframe0Blue.ContentDoc, this.Const().Selector.SC.Publish.TheItemHasBeenPublished, this.Const().IterHelper.MaxCount.OverridePublishing)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.PromiseGen().WaitForThenClick(this.Const().Selector.SC.Cancel, dataPublishChain.Iframe0Blue.ContentDoc)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, dataPublishChain];
                }
            });
        });
    };
    PromiseChainQuickPublish.prototype.__waitForAndClickOk = function (dataPublishChain) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.PromiseGen().WaitForThenClick(this.Const().Selector.SC.Ok, dataPublishChain.messageDialogIframeRed.ContentDoc)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, dataPublishChain];
                }
            });
        });
    };
    PromiseChainQuickPublish.prototype.__WaitForAndClickPublishNextButton = function (dataPublishChain) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.PromiseGen().WaitForThenClick(this.Const().Selector.SC.NextButton, dataPublishChain.Iframe0Blue.ContentDoc)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, dataPublishChain];
                }
            });
        });
    };
    PromiseChainQuickPublish.prototype.GetMessageDialog = function (dataPublishChain) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = dataPublishChain;
                        return [4 /*yield*/, this.PromiseGen().WaitForAndReturnReadyIframe(dataPublishChain.jqIframe.ContentDoc, this.Const().Selector.SC.ContentIFrame1, 'iframeRed')];
                    case 1:
                        _a.messageDialogIframeRed = _b.sent();
                        return [2 /*return*/, dataPublishChain];
                }
            });
        });
    };
    PromiseChainQuickPublish.prototype.GetDialogIframe0Blue = function (dataPublishChain) {
        if (dataPublishChain === void 0) { dataPublishChain = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.debug().FuncStart(this.GetDialogIframe0Blue.name);
                        _a = dataPublishChain;
                        return [4 /*yield*/, this.PromiseGen().WaitForAndReturnReadyIframe(dataPublishChain.jqIframe.ContentDoc, this.Const().Selector.SC.ContentIframe0, 'Iframe0Blue')];
                    case 1:
                        _a.Iframe0Blue = _b.sent();
                        this.debug().DebugDataOneIframe(dataPublishChain.Iframe0Blue);
                        this.debug().FuncEnd(this.GetDialogIframe0Blue.name);
                        return [2 /*return*/, dataPublishChain];
                }
            });
        });
    };
    PromiseChainQuickPublish.prototype.__waitForThenFunc = function (selector, targetDoc, dataPublishChain, optionFunc) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var found, found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.__waitForThenFunc.name, selector);
                        this.debug().DebugIDataDoc(targetDoc);
                        found = null;
                        return [4 /*yield*/, this.PromiseGen().WaitForAndReturnFoundElem(targetDoc, selector)];
                    case 1:
                        found = _a.sent();
                        if (!found) return [3 /*break*/, 4];
                        this.debug().Log('found');
                        if (!optionFunc) return [3 /*break*/, 3];
                        this.debug().Log('executing func');
                        return [4 /*yield*/, optionFunc(found, dataPublishChain)];
                    case 2:
                        dataPublishChain = _a.sent();
                        _a.label = 3;
                    case 3:
                        this.__debugDataPublishChain(dataPublishChain, this.__waitForThenFunc.name);
                        this.debug().FuncEnd(this.__waitForThenFunc.name, selector);
                        resolve(dataPublishChain);
                        return [3 /*break*/, 5];
                    case 4:
                        reject('not found');
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    return PromiseChainQuickPublish;
}(_ContentManagerBase_1.ContentManagerBase));
exports.PromiseChainQuickPublish = PromiseChainQuickPublish;
//# sourceMappingURL=PromiseChainQuickPublish.js.map