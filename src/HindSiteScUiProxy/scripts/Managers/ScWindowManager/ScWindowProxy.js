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
exports.ScWindowProxy = void 0;
var DefaultStateOfSitecoreWindow_1 = require("../../../../Shared/scripts/Classes/Defaults/DefaultStateOfSitecoreWindow");
var RecipeBasics_1 = require("../../../../Shared/scripts/Classes/RecipeBasics");
var StaticHelpers_1 = require("../../../../Shared/scripts/Classes/StaticHelpers");
var scWindowType_1 = require("../../../../Shared/scripts/Enums/scWindowType");
var SnapShotFlavor_1 = require("../../../../Shared/scripts/Enums/SnapShotFlavor");
var Guid_1 = require("../../../../Shared/scripts/Helpers/Guid");
var InitResultsScWindowManager_1 = require("../../../../Shared/scripts/Interfaces/Agents/InitResultsScWindowManager");
var InjectConst_1 = require("../../../../Shared/scripts/Interfaces/InjectConst");
var ContentEditorProxy_1 = require("../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy");
var DesktopProxy_1 = require("../../Proxies/Desktop/DesktopProxy/DesktopProxy");
var LoggableBase_1 = require("../LoggableBase");
var ScWindowRecipePartials_1 = require("./ScWindowRecipePartials");
var ScWindowProxy = /** @class */ (function (_super) {
    __extends(ScWindowProxy, _super);
    function ScWindowProxy(logger, scUrlAgent) {
        var _this = _super.call(this, logger) || this;
        _this.__desktopProxyLazy = null;
        _this.__contentEditorProxyLazy = null;
        _this.Logger.InstantiateStart(ScWindowProxy.name);
        _this.ScUrlAgent = scUrlAgent;
        _this.TabSessionId = sessionStorage.getItem(InjectConst_1.ContentConst.Const.Storage.SessionKey);
        if (!_this.TabSessionId) {
            _this.TabSessionId = Guid_1.Guid.WithoutDashes(Guid_1.Guid.NewRandomGuid());
            sessionStorage.setItem(InjectConst_1.ContentConst.Const.Storage.SessionKey, _this.TabSessionId);
        }
        _this.Logger.InstantiateEnd(ScWindowProxy.name);
        return _this;
    }
    ScWindowProxy.prototype.DesktopProxy = function () {
        if (!this.__desktopProxyLazy) {
            this.__desktopProxyLazy = new DesktopProxy_1.DesktopProxy(this.Logger, this.GetTopLevelDoc());
        }
        return this.__desktopProxyLazy;
    };
    ScWindowProxy.prototype.ContentEditorProxy = function () {
        if (!this.__contentEditorProxyLazy) {
            this.__contentEditorProxyLazy = new ContentEditorProxy_1.ContentEditorProxy(this.GetTopLevelDoc(), this.Logger);
            return this.__contentEditorProxyLazy;
        }
    };
    ScWindowProxy.prototype.OnReadyInitScWindowManager = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var recipesBasic, initResultsScWindowManager_1, err_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.OnReadyInitScWindowManager.name);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    recipesBasic = new RecipeBasics_1.RecipeBasics(this.Logger);
                                    initResultsScWindowManager_1 = new InitResultsScWindowManager_1.InitResultsScWindowManager();
                                    return [4 /*yield*/, recipesBasic.WaitForReadyNABDocument(this.GetTopLevelDoc())
                                            .then(function () { return _this.DesktopProxy().OnReadyInitDesktopProxy(); })
                                            .then(function (results) { return initResultsScWindowManager_1.InitResultsDesktop = results; })
                                            //.then(() => this.InitFromQueryStr())
                                            .then(function () { return resolve(initResultsScWindowManager_1); })
                                            .catch(function (err) { throw (_this.OnReadyInitScWindowManager.name + ' | ' + err); })];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_1 = _a.sent();
                                    throw (this.OnReadyInitScWindowManager.name + ' ' + err_1);
                                case 4:
                                    this.Logger.FuncEnd(this.OnReadyInitScWindowManager.name);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ScWindowProxy.prototype.MakeScWinRecipeParts = function () {
        return new ScWindowRecipePartials_1.ScWindowRecipePartials(this.Logger);
    };
    ScWindowProxy.prototype.GetCurrentStateByPageType = function (scWindowType) {
        return __awaiter(this, void 0, void 0, function () {
            var toReturn, dtResult_1, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.GetCurrentStateByPageType.name, StaticHelpers_1.StaticHelpers.ScWindowTypeFriendly(scWindowType));
                        toReturn = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!(scWindowType === scWindowType_1.ScWindowType.Desktop)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.DesktopProxy().GetStateOfDesktop()
                                .then(function (result) {
                                dtResult_1 = result;
                                if (dtResult_1.ActiveCEAgent) {
                                    toReturn = dtResult_1.ActiveCEAgent.GetStateTree();
                                }
                            })
                                .catch(function (err) { return _this.Logger.ErrorAndThrow(_this.GetCurrentStateByPageType.name, err); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (scWindowType === scWindowType_1.ScWindowType.ContentEditor) {
                            toReturn = this.ContentEditorProxy().GetStateOfContentEditor();
                        }
                        else if (scWindowType === scWindowType_1.ScWindowType.LoginPage
                            || scWindowType === scWindowType_1.ScWindowType.Launchpad
                            || scWindowType === scWindowType_1.ScWindowType.Edit
                            || scWindowType === scWindowType_1.ScWindowType.Preview
                            || scWindowType === scWindowType_1.ScWindowType.Normal) {
                        }
                        else {
                            this.Logger.ErrorAndThrow(this.GetCurrentStateByPageType.name, 'unknown page type ' + StaticHelpers_1.StaticHelpers.ScWindowTypeFriendly(scWindowType));
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        this.Logger.ErrorAndThrow(this.GetCurrentStateByPageType.name, err_2);
                        return [3 /*break*/, 6];
                    case 6:
                        this.Logger.FuncEnd(this.GetCurrentStateByPageType.name);
                        return [2 /*return*/, toReturn];
                }
            });
        });
    };
    ScWindowProxy.prototype.GetScUrlAgent = function () {
        return this.ScUrlAgent;
    };
    ScWindowProxy.prototype.GetCurrentPageType = function () {
        return this.ScUrlAgent.GetScWindowType();
    };
    ScWindowProxy.prototype.GetTopLevelDoc = function () {
        if (!this.TopDoc) {
            this.TopDoc = {
                //ParentDoc: null,
                ContentDoc: window.document,
                DocId: Guid_1.Guid.NewRandomGuid(),
                Nickname: 'top doc'
            };
        }
        return this.TopDoc;
    };
    //async InitFromQueryStr(): Promise<void> {
    //  this.Logger.FuncStart(this.InitFromQueryStr.name);
    //  try {
    //    if (this.GetScUrlAgent().QueryStringHasKey(QueryStrKey.hsTargetSs)) {
    //      let recipe = new RecipeInitFromQueryStr(this.Logger, this.GetScUrlAgent(), this.AtticAgent, this.GetTopLevelDoc(), this.MakeScWinRecipeParts(), this.DesktopProxy(), this.ContentEditorProxy());
    //      await recipe.Execute();
    //    }
    //    this.Logger.FuncEnd(this.InitFromQueryStr.name);
    //  }
    //  catch (err) {
    //    throw (err);
    //  }
    //}
    ScWindowProxy.prototype.SetCompactCss = function (targetDoc) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //if (this.ScUiMan().GetCurrentPageType() === scWindowType.ContentEditor) {
                    return [4 /*yield*/, this.ContentEditorProxy().SetCompactCss()];
                    case 1:
                        //if (this.ScUiMan().GetCurrentPageType() === scWindowType.ContentEditor) {
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ScWindowProxy.prototype.CreateShellIDataScWindowState = function (windowType, flavor) {
        this.Logger.FuncStart(this.CreateShellIDataScWindowState.name);
        var activeWindowSnapShot = new DefaultStateOfSitecoreWindow_1.DefaultStateOfSitecoreWindow();
        activeWindowSnapShot.Meta.Flavor = flavor;
        activeWindowSnapShot.Meta.WindowType = windowType;
        activeWindowSnapShot.Meta.SessionId = this.TabSessionId;
        this.Logger.FuncEnd(this.CreateShellIDataScWindowState.name);
        return activeWindowSnapShot;
    };
    //private async PopulateIfTopIsContentEditor(scWindowState: IDataStateOfSitecore): Promise<void> {
    //  try {
    //    if (this.GetCurrentPageType() === ScWindowType.ContentEditor) {
    //      let contentEditorProxy = new ContentEditorProxy(this.GetTopLevelDoc(), this.Logger, this.SettingsAgent, null);
    //      await contentEditorProxy.WaitForReadyContentEditor()
    //        .then(() => contentEditorProxy.GetStateOfTree())
    //        .then((stateOfContentEditor: IDataStateOfContentEditor) => {
    //          scWindowState.StateOfContentEditor = stateOfContentEditor;
    //        })
    //        .catch((err) => { throw (err) });
    //    }
    //  } catch (err) {
    //    this.Logger.ErrorAndThrow(this.PopulateIfTopIsContentEditor.name, err);
    //  }
    //}
    //private async PopulateIfTopIsDeskTop(scWindowState: IDataStateOfSitecore): Promise<void> {
    //  this.Logger.FuncStart(this.PopulateIfTopIsDeskTop.name);
    //  try {
    //    if (this.GetCurrentPageType() === ScWindowType.Desktop) {
    //      await this.DesktopUiProxy.GetStateDesktop()
    //        .then((desktopState: IDataSateOfDesktop) => scWindowState.StateOfDesktop = desktopState)
    //        .catch((err) => { throw (this.PopulateIfTopIsDeskTop.name + ' ' + err) });
    //    }
    //  } catch (err) {
    //    this.Logger.ErrorAndThrow(this.PopulateIfTopIsContentEditor.name, err);
    //  }
    //  this.Logger.FuncEnd(this.PopulateIfTopIsDeskTop.name);
    //}
    ScWindowProxy.prototype.GetStates = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var toReturn, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toReturn = new DefaultStateOfSitecoreWindow_1.DefaultScWindowStates();
                        if (!(this.ScUrlAgent.GetScWindowType() === scWindowType_1.ScWindowType.Desktop)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.DesktopProxy().GetStateOfDesktop()
                                .then(function (result) { return toReturn.StateOfDesktop = result; })
                                .then(function () { return resolve(toReturn); })
                                .catch(function (err) { return reject(_this.GetStateOfSitecoreWindow.name + ' | ' + err); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.ScUrlAgent.GetScWindowType() === scWindowType_1.ScWindowType.ContentEditor) {
                            result = this.ContentEditorProxy().GetStateOfContentEditor();
                            toReturn.StateOfContentEditor = result;
                            resolve(toReturn);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ScWindowProxy.prototype.GetStateOfSitecoreWindow = function (snapshotFlavor) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var toReturnStateOfSitecoreWindow;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.GetStateOfSitecoreWindow.name);
                        toReturnStateOfSitecoreWindow = new DefaultStateOfSitecoreWindow_1.DefaultStateOfSitecoreWindow();
                        return [4 /*yield*/, this.GetStates()
                                .then(function (dataSitecoreWindowStates) { return toReturnStateOfSitecoreWindow.ScWindowStates = dataSitecoreWindowStates; })
                                .then(function () {
                                toReturnStateOfSitecoreWindow.Meta = _this.PopulateMetaData(snapshotFlavor);
                                toReturnStateOfSitecoreWindow.Friendly = _this.PopulateFriendly(toReturnStateOfSitecoreWindow.Meta);
                            })
                                .then(function () { return resolve(toReturnStateOfSitecoreWindow); })
                                .catch(function (err) { return reject(_this.GetStateOfSitecoreWindow.name + ' | ' + err); })];
                    case 1:
                        _a.sent();
                        this.Logger.FuncEnd(this.GetStateOfSitecoreWindow.name);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ScWindowProxy.prototype.PopulateFriendly = function (metadata) {
        var toReturn = new DefaultStateOfSitecoreWindow_1.DefaultFriendly();
        toReturn.WindowType = scWindowType_1.ScWindowType[metadata.WindowType];
        toReturn.TimeStamp = StaticHelpers_1.StaticHelpers.MakeFriendlyDate(metadata.TimeStamp);
        toReturn.Flavor = SnapShotFlavor_1.SnapShotFlavor[metadata.Flavor];
        return toReturn;
    };
    ScWindowProxy.prototype.PopulateMetaData = function (snapshotFlavor) {
        var toReturn = new DefaultStateOfSitecoreWindow_1.DefaultMetaData();
        toReturn.WindowType = this.ScUrlAgent.GetScWindowType();
        toReturn.TimeStamp = new Date();
        toReturn.SessionId = this.TabSessionId;
        toReturn.Flavor = snapshotFlavor;
        return toReturn;
    };
    return ScWindowProxy;
}(LoggableBase_1.LoggableBase));
exports.ScWindowProxy = ScWindowProxy;
//# sourceMappingURL=ScWindowProxy.js.map