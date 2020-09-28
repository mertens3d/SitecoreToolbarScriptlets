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
var DefaultStateOfSitecoreWindow_1 = require("../../../Shared/scripts/Classes/Defaults/DefaultStateOfSitecoreWindow");
var RecipeBasics_1 = require("../../../Shared/scripts/Classes/RecipeBasics");
var StaticHelpers_1 = require("../../../Shared/scripts/Classes/StaticHelpers");
var scWindowType_1 = require("../../../Shared/scripts/Enums/scWindowType");
var SnapShotFlavor_1 = require("../../../Shared/scripts/Enums/SnapShotFlavor");
var Guid_1 = require("../../../Shared/scripts/Helpers/Guid");
var InitResultsScWindowManager_1 = require("../../../Shared/scripts/Interfaces/Agents/InitResultsScWindowManager");
var InjectConst_1 = require("../../../Shared/scripts/Interfaces/InjectConst");
var ContentEditorProxy_1 = require("./ContentEditor/ContentEditorProxy/ContentEditorProxy");
var DesktopProxy_1 = require("./Desktop/DesktopProxy/DesktopProxy");
var LoggableBase_1 = require("../../../Shared/scripts/LoggableBase");
var ScWindowProxy = /** @class */ (function (_super) {
    __extends(ScWindowProxy, _super);
    function ScWindowProxy(logger, scUrlAgent) {
        var _this = _super.call(this, logger) || this;
        _this.Logger.CTORStart(ScWindowProxy.name);
        _this.ScUrlAgent = scUrlAgent;
        _this.Instantiate_ScWindowProxy();
        _this.Logger.CTOREnd(ScWindowProxy.name);
        return _this;
    }
    ScWindowProxy.prototype.PublishActiveCE = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.GetCurrentPageType() == scWindowType_1.ScWindowType.ContentEditor)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.ContentEditorProxy.PublishItem()
                                .then(function () { return resolve(); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.GetCurrentPageType() == scWindowType_1.ScWindowType.Desktop) {
                            this.DesktopProxy.PublishItem()
                                .then(function () { return resolve(); })
                                .catch(function (err) { return reject(_this.PublishActiveCE.name + ' | ' + err); });
                        }
                        else {
                            reject(this.PublishActiveCE.name + ' Unhandled page type');
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    ScWindowProxy.prototype.Init = function () {
        this.TabSessionId = sessionStorage.getItem(InjectConst_1.ContentConst.Const.Storage.SessionKey);
        if (!this.TabSessionId) {
            this.TabSessionId = Guid_1.Guid.WithoutDashes(Guid_1.Guid.NewRandomGuid());
            sessionStorage.setItem(InjectConst_1.ContentConst.Const.Storage.SessionKey, this.TabSessionId);
        }
    };
    ScWindowProxy.prototype.Instantiate_ScWindowProxy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var recipesBasic, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.Logger.FuncStart(this.Instantiate_ScWindowProxy.name);
                        recipesBasic = new RecipeBasics_1.RecipeBasics(this.Logger);
                        this.InitReportScWindowManager = new InitResultsScWindowManager_1.InitReportScWindowManager();
                        return [4 /*yield*/, recipesBasic.WaitForReadyNABDocument(this.GetTopLevelDoc())
                                .then(function () {
                                if (_this.ScUrlAgent.GetScWindowType() === scWindowType_1.ScWindowType.Desktop) {
                                    _this.DesktopProxy = new DesktopProxy_1.DesktopProxy(_this.Logger, _this.GetTopLevelDoc());
                                    _this.DesktopProxy.Instantiate_DesktopProxy()
                                        .then(function () { return _this.DesktopProxy.WireEvents_DesktopProxy(); });
                                }
                            })
                                .then(function () {
                                if (_this.ScUrlAgent.GetScWindowType() === scWindowType_1.ScWindowType.ContentEditor) {
                                    _this.ContentEditorProxy = new ContentEditorProxy_1.ContentEditorProxy(_this.Logger, _this.GetTopLevelDoc());
                                    _this.ContentEditorProxy.Instantiate_ContentEditorProxy()
                                        .then(function () { return _this.ContentEditorProxy.WireEvents_ContentEditorProxy(); });
                                }
                            })
                                .catch(function (err) { return _this.Logger.ErrorAndThrow(_this.Instantiate_ScWindowProxy.name, err); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        this.Logger.ErrorAndThrow(this.Instantiate_ScWindowProxy.name, err_1);
                        return [3 /*break*/, 3];
                    case 3:
                        this.Logger.FuncEnd(this.Instantiate_ScWindowProxy.name);
                        return [2 /*return*/];
                }
            });
        });
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
                        return [4 /*yield*/, this.DesktopProxy.GetStateOfDesktop()
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
                            toReturn = this.ContentEditorProxy.GetStateOfContentEditor();
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
    ScWindowProxy.prototype.GetCurrentPageType = function () {
        return this.ScUrlAgent.GetScWindowType();
    };
    ScWindowProxy.prototype.GetTopLevelDoc = function () {
        if (!this.TopDoc) {
            this.TopDoc = {
                ContentDoc: window.document,
                DocId: Guid_1.Guid.NewRandomGuid(),
                Nickname: 'top doc'
            };
        }
        return this.TopDoc;
    };
    ScWindowProxy.prototype.SetCompactCss = function (targetDoc) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ContentEditorProxy.SetCompactCss()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
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
                        return [4 /*yield*/, this.DesktopProxy.GetStateOfDesktop()
                                .then(function (result) { return toReturn.StateOfDesktop = result; })
                                .then(function () { return resolve(toReturn); })
                                .catch(function (err) { return reject(_this.GetStateOfSitecoreWindow.name + ' | ' + err); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.ScUrlAgent.GetScWindowType() === scWindowType_1.ScWindowType.ContentEditor) {
                            result = this.ContentEditorProxy.GetStateOfContentEditor();
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
                        toReturnStateOfSitecoreWindow = new DefaultStateOfSitecoreWindow_1.DefaultStateOfLiveHindSite();
                        return [4 /*yield*/, this.GetStates()
                                .then(function (dataSitecoreWindowStates) { return toReturnStateOfSitecoreWindow.StateOfSitecoreWindow = dataSitecoreWindowStates; })
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
    ScWindowProxy.prototype.SetStateOfScWin = function (dataToRestore) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.SetStateOfScWin.name);
                                    if (!dataToRestore) return [3 /*break*/, 8];
                                    if (!(dataToRestore.Meta.WindowType == scWindowType_1.ScWindowType.Desktop)) return [3 /*break*/, 4];
                                    if (!dataToRestore.StateOfSitecoreWindow.StateOfDesktop) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.DesktopProxy.SetStateOfDesktop(dataToRestore.StateOfSitecoreWindow.StateOfDesktop)
                                            .then(function () { return resolve(); })
                                            .catch(function (err) { return reject(_this.SetStateOfScWin.name + ' | ' + err); })];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    this.Logger.ErrorAndThrow(this.SetStateOfScWin.name, 'no states in dataToRestore');
                                    _a.label = 3;
                                case 3: return [3 /*break*/, 7];
                                case 4:
                                    if (!(dataToRestore.Meta.WindowType === scWindowType_1.ScWindowType.ContentEditor)) return [3 /*break*/, 6];
                                    return [4 /*yield*/, this.ContentEditorProxy.SetStateOfContentEditorAsync(dataToRestore.StateOfSitecoreWindow.StateOfContentEditor)
                                            .then(function () { return resolve(); })
                                            .catch(function (err) { return reject(err); })];
                                case 5:
                                    _a.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    reject(this.SetStateOfScWin.name + 'Data not restored. Not in Desktop or Content Editor');
                                    _a.label = 7;
                                case 7: return [3 /*break*/, 9];
                                case 8:
                                    this.Logger.WarningAndContinue(this.SetStateOfScWin.name, " No data found to restore");
                                    resolve();
                                    _a.label = 9;
                                case 9:
                                    reject(this.SetStateOfScWin.name + ' : unknown reason');
                                    this.Logger.FuncEnd(this.SetStateOfScWin.name);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
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