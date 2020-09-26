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
exports.ContentEditorPublishProxy = void 0;
var PromiseResult_1 = require("../../../../../Shared/scripts/Classes/PromiseResult");
var scWindowType_1 = require("../../../../../Shared/scripts/Enums/scWindowType");
var InjectConst_1 = require("../../../../../Shared/scripts/Interfaces/InjectConst");
var SharedConst_1 = require("../../../../../Shared/scripts/SharedConst");
var LoggableBase_1 = require("../../../../../Shared/scripts/LoggableBase");
var RecipeBasics_1 = require("../../../../../Shared/scripts/Classes/RecipeBasics");
var FactoryHelper_1 = require("../../../../../Shared/scripts/Helpers/FactoryHelper");
var ContentEditorPublishProxy = /** @class */ (function (_super) {
    __extends(ContentEditorPublishProxy, _super);
    function ContentEditorPublishProxy(logger, contentEditorProxy, associatedDoc) {
        var _this = _super.call(this, logger) || this;
        _this.ContentEditorProxy = contentEditorProxy;
        _this.AssociatedDoc = associatedDoc;
        _this.RecipeBasics = new RecipeBasics_1.RecipeBasics(_this.Logger);
        _this.FactoryHelp = new FactoryHelper_1.FactoryHelper(_this.Logger);
        return _this;
    }
    ContentEditorPublishProxy.prototype.Execute = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.PublishActiveCE()
                            .then(function () { return resolve(); })
                            .catch(function (err) { return reject(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ContentEditorPublishProxy.prototype.GetDocToPublish = function (scWindowType, targetDoc) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var err_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.GetDocToPublish.name);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 5, , 6]);
                                    if (!(scWindowType === scWindowType_1.ScWindowType.Desktop)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, this.RecipeBasics.GetTopLevelIframe(targetDoc)
                                            .then(function (topIframe) {
                                            resolve(topIframe.GetContentDoc());
                                        })
                                            .catch(function (err) { return reject(_this.GetDocToPublish.name + ' ' + err); })];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    resolve(this.AssociatedDoc);
                                    _a.label = 4;
                                case 4: return [3 /*break*/, 6];
                                case 5:
                                    err_1 = _a.sent();
                                    reject(this.GetDocToPublish.name + ' ' + err_1);
                                    return [3 /*break*/, 6];
                                case 6:
                                    this.Logger.FuncEnd(this.GetDocToPublish.name);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ContentEditorPublishProxy.prototype.PublishActiveCE = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.PublishActiveCE.name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.PublishCE(this.AssociatedDoc)
                                .catch(function (err) { throw (err); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        throw (this.PublishActiveCE.name + ' ' + err_2);
                    case 4:
                        this.Logger.FuncEnd(this.PublishActiveCE.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    ContentEditorPublishProxy.prototype.__debugDataPublishChain = function (dataPublishChain, nickname) {
        this.Logger.FuncStart(this.__debugDataPublishChain.name, nickname);
        this.Logger.LogVal('docToPublish', this.Logger.IsNullOrUndefined(dataPublishChain.DocToPublish));
        this.Logger.LogVal('jqIframe', this.Logger.IsNullOrUndefined(dataPublishChain.JqIframe) + ' ' + (dataPublishChain.JqIframe ? dataPublishChain.JqIframe.HTMLIframeElement.src : ''));
        this.Logger.LogVal('Iframe0blueIframe', this.Logger.IsNullOrUndefined(dataPublishChain.Iframe0Blue) + ' ' + (dataPublishChain.Iframe0Blue ? dataPublishChain.Iframe0Blue.HTMLIframeElement.src : ''));
        this.Logger.LogVal('messageDialogIframeRed', this.Logger.IsNullOrUndefined(dataPublishChain.MessageDialogIframeRed) + ' ' + (dataPublishChain.MessageDialogIframeRed ? dataPublishChain.MessageDialogIframeRed.HTMLIframeElement.src : ''));
        this.Logger.FuncEnd(this.__debugDataPublishChain.name);
        return dataPublishChain;
    };
    ContentEditorPublishProxy.prototype.PublishCE = function (docToPublish) {
        return __awaiter(this, void 0, void 0, function () {
            var dataPublishChain, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.PublishCE.name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        dataPublishChain = {
                            DocToPublish: docToPublish,
                            TopLevelDoc: this.AssociatedDoc,
                            Iframe0Blue: null,
                            JqIframe: null,
                            MessageDialogIframeRed: null
                        };
                        return [4 /*yield*/, this.ClickPublishOnNav(dataPublishChain)
                                .then(function (dataPublishChain) { return _this.ClickMenuButtonPublishDropDown(dataPublishChain); })
                                //.then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post ClickMenuButtonPublishDropDown'))
                                .then(function (dataPublishChain) { return _this.ClickMenuDropDownPublishItem(dataPublishChain); })
                                //.then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post MenuDropDownPublishItem'))
                                .then(function (dataPublishChain) { return _this.GetThePublishItemDialog(dataPublishChain); })
                                //.then((dataPublishChain: IDataPublishChain) => this.__debugDataPublishChain(dataPublishChain, 'post PublishItemDialog'))
                                .then(function (dataPublishChain) { return _this.GetDialogIframe0Blue(dataPublishChain); })
                                .then(function (dataPublishChain) { return _this.__WaitForAndClickPublishNextButton(dataPublishChain); })
                                .then(function (dataPublishChain) { return _this.GetMessageDialog(dataPublishChain); })
                                .then(function (dataPublishChain) { return _this.__waitForAndClickOk(dataPublishChain); })
                                .then(function (dataPublishChain) { return _this.__waitForAndClickClose(dataPublishChain); })
                                .catch(function (ex) {
                                _this.Logger.ErrorAndThrow(_this.PublishCE.name, ex);
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        throw (this.PublishCE.name + ' ' + err_3);
                    case 4:
                        this.Logger.FuncEnd(this.PublishCE.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    ContentEditorPublishProxy.prototype.ClickPublishOnNav = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.ClickPublishOnNav.name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.RecipeBasics.WaitForThenClick([InjectConst_1.ContentConst.Const.Selector.SC.NavPublishStrip], payload.DocToPublish)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.RecipeBasics.WaitForThenClick([InjectConst_1.ContentConst.Const.Selector.SC.NavPublishStrip], payload.DocToPublish)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_4 = _a.sent();
                        throw (this.ClickPublishOnNav.name + ' ' + err_4);
                    case 5:
                        this.Logger.FuncEnd(this.ClickPublishOnNav.name);
                        return [2 /*return*/, payload];
                }
            });
        });
    };
    ContentEditorPublishProxy.prototype.__waitForAndClickClose = function (dataPublishChain) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.RecipeBasics.WaitForAndReturnFoundElem(dataPublishChain.Iframe0Blue.GetContentDoc(), InjectConst_1.ContentConst.Const.Selector.SC.Publish.SettingsHidden)
                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.RecipeBasics.WaitForAndReturnFoundElem(dataPublishChain.Iframe0Blue.GetContentDoc(), InjectConst_1.ContentConst.Const.Selector.SC.Publish.TheItemHasBeenPublished, SharedConst_1.SharedConst.Const.IterHelper.MaxCount.OverridePublishing)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                            .then(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.RecipeBasics.WaitForThenClick([InjectConst_1.ContentConst.Const.Selector.SC.Cancel], dataPublishChain.Iframe0Blue.GetContentDoc())];
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
    ContentEditorPublishProxy.prototype.__waitForAndClickOk = function (dataPublishChain) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.RecipeBasics.WaitForThenClick([InjectConst_1.ContentConst.Const.Selector.SC.Ok], dataPublishChain.MessageDialogIframeRed.GetContentDoc())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, dataPublishChain];
                }
            });
        });
    };
    ContentEditorPublishProxy.prototype.__WaitForAndClickPublishNextButton = function (dataPublishChain) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.RecipeBasics.WaitForThenClick([InjectConst_1.ContentConst.Const.Selector.SC.NextButton], dataPublishChain.Iframe0Blue.GetContentDoc())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, dataPublishChain];
                }
            });
        });
    };
    ContentEditorPublishProxy.prototype.ClickMenuButtonPublishDropDown = function (payload) {
        if (payload === void 0) { payload = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.RecipeBasics.WaitForThenClick([InjectConst_1.ContentConst.Const.Selector.SC.MenuButtonPublish], payload.DocToPublish)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, payload];
                }
            });
        });
    };
    ContentEditorPublishProxy.prototype.ClickMenuDropDownPublishItem = function (payload) {
        if (payload === void 0) { payload = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.RecipeBasics.WaitForAndClickWithPayload(InjectConst_1.ContentConst.Const.Selector.SC.MenuDropDownPublishItem, payload.DocToPublish, payload)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ContentEditorPublishProxy.prototype.GetThePublishItemDialog = function (dataPublishChain) {
        if (dataPublishChain === void 0) { dataPublishChain = null; }
        return __awaiter(this, void 0, void 0, function () {
            var err_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.RecipeBasics.WaitForAndReturnFoundElem(dataPublishChain.TopLevelDoc, InjectConst_1.ContentConst.Const.Selector.SC.JqueryModalDialogsFrame)
                                .then(function (found) { return _this.FactoryHelp.BaseFramePromiseFactory(found, 'jqIframe'); })
                                .then(function (result) { return dataPublishChain.JqIframe = result; })
                                // opens publish item dialog
                                .then(function () { return _this.RecipeBasics.WaitForReadyNABFrameProxy(dataPublishChain.JqIframe); })
                                .catch(function (err) { throw (_this.GetThePublishItemDialog.name + ' ' + err); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        throw (this.GetThePublishItemDialog.name + ' ' + err_5);
                    case 3: return [2 /*return*/, dataPublishChain];
                }
            });
        });
    };
    ContentEditorPublishProxy.prototype.GetMessageDialog = function (dataPublishChain) {
        return __awaiter(this, void 0, void 0, function () {
            var toReturnPublishChain;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toReturnPublishChain = dataPublishChain;
                        return [4 /*yield*/, this.RecipeBasics.WaitForIframeElemAndReturnWhenReady(dataPublishChain.JqIframe.GetContentDoc(), InjectConst_1.ContentConst.Const.Selector.SC.ContentIFrame1, 'iframeRed')
                                .then(function (result) { return toReturnPublishChain.MessageDialogIframeRed = result; })
                                .catch(function (err) { return _this.Logger.ErrorAndThrow(_this.GetMessageDialog.name, err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, toReturnPublishChain];
                }
            });
        });
    };
    ContentEditorPublishProxy.prototype.GetDialogIframe0Blue = function (dataPublishChain) {
        if (dataPublishChain === void 0) { dataPublishChain = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var promiseResult;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.GetDialogIframe0Blue.name);
                                    promiseResult = new PromiseResult_1.PromiseResult(this.GetDialogIframe0Blue.name, this.Logger);
                                    this.Logger.LogAsJsonPretty('dataPublishChain', dataPublishChain);
                                    return [4 /*yield*/, this.RecipeBasics.WaitForIframeElemAndReturnWhenReady(dataPublishChain.JqIframe.GetContentDoc(), InjectConst_1.ContentConst.Const.Selector.SC.ContentIframe0, 'Iframe0Blue')
                                            .then(function (result) {
                                            _this.Logger.MarkerC();
                                            dataPublishChain.Iframe0Blue = result;
                                            promiseResult.MarkSuccessful();
                                        })
                                            .catch(function (err) { return promiseResult.MarkFailed(err); })];
                                case 1:
                                    _a.sent();
                                    this.Logger.LogAsJsonPretty('dataPublishChain.Iframe0Blue', dataPublishChain.Iframe0Blue);
                                    //this.ContentAgents.Logger.DebugDataOneIframe(dataPublishChain.Iframe0Blue);
                                    this.Logger.FuncEnd(this.GetDialogIframe0Blue.name);
                                    if (promiseResult.WasSuccessful()) {
                                        resolve(dataPublishChain);
                                    }
                                    else {
                                        reject(promiseResult.RejectReasons);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ContentEditorPublishProxy.prototype.__waitForThenFunc = function (selector, targetDoc, dataPublishChain, optionFunc) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var found;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.__waitForThenFunc.name, selector);
                        this.Logger.LogAsJsonPretty(this.__waitForThenFunc.name, targetDoc);
                        found = null;
                        return [4 /*yield*/, this.RecipeBasics.WaitForAndReturnFoundElem(targetDoc, selector)
                                .then(function (result) { return found = result; })];
                    case 1:
                        _a.sent();
                        if (!found) return [3 /*break*/, 4];
                        this.Logger.Log('found');
                        if (!optionFunc) return [3 /*break*/, 3];
                        this.Logger.Log('executing func');
                        return [4 /*yield*/, optionFunc(found, dataPublishChain)];
                    case 2:
                        dataPublishChain = _a.sent();
                        _a.label = 3;
                    case 3:
                        this.__debugDataPublishChain(dataPublishChain, this.__waitForThenFunc.name);
                        this.Logger.FuncEnd(this.__waitForThenFunc.name, selector);
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
    return ContentEditorPublishProxy;
}(LoggableBase_1.LoggableBase));
exports.ContentEditorPublishProxy = ContentEditorPublishProxy;
//# sourceMappingURL=ContentEditorPublishProxy.js.map