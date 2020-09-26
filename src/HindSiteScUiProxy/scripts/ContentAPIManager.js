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
exports.ContentAPIManager = void 0;
var DefaultScWindowState_1 = require("../../Shared/scripts/Classes/Defaults/DefaultScWindowState");
var _1xxx_MessageFlag_1 = require("../../Shared/scripts/Enums/1xxx-MessageFlag");
var SnapShotFlavor_1 = require("../../Shared/scripts/Enums/SnapShotFlavor");
var FactoryHelper_1 = require("../../Shared/scripts/Helpers/FactoryHelper");
var RecipeAddContentEditorToDesktop_1 = require("./ContentApi/Recipes/RecipeAddContentEditorToDesktop/RecipeAddContentEditorToDesktop");
var RecipePublishActiveCe_1 = require("./ContentApi/Recipes/RecipePublishActiveCe/RecipePublishActiveCe");
var RecipeRemoveItemFromStorage_1 = require("./ContentApi/Recipes/RecipeRemoveItemFromStorage/RecipeRemoveItemFromStorage");
var RecipeForceAutoSnapShot_1 = require("./ContentApi/Recipes/RecipeRemoveItemFromStorage/RecipeForceAutoSnapShot");
var RecipeRestore_1 = require("./ContentApi/Recipes/RecipeRestore/RecipeRestore");
var RecipeToggleFavorite_1 = require("./ContentApi/Recipes/RecipeToggleFavorite/RecipeToggleFavorite");
var LoggableBase_1 = require("./Managers/LoggableBase");
var RecipeSaveState_1 = require("./ContentApi/Recipes/RecipeSaveState/RecipeSaveState");
var StaticHelpers_1 = require("../../Shared/scripts/Classes/StaticHelpers");
var RecipeChangeNickName_1 = require("./ContentApi/Recipes/RecipeChangeNickName/RecipeChangeNickName");
var ContentAPIManager = /** @class */ (function (_super) {
    __extends(ContentAPIManager, _super);
    function ContentAPIManager(logger, toastAgent, scUiMan, scWinMan, atticAgent, autoSnapShotAgent) {
        var _this = _super.call(this, logger) || this;
        _this.Logger.FuncStart(ContentAPIManager.name);
        _this.ToastAgent = toastAgent;
        _this.ScUiMan = scUiMan;
        _this.ScWinMan = scWinMan;
        _this.FactoryHelp = new FactoryHelper_1.FactoryHelper(_this.Logger);
        _this.AtticAgent = atticAgent;
        _this.AtticAgent.CleanOutOldAutoSavedData();
        _this.AutoSnapShotAgent = autoSnapShotAgent;
        if (StaticHelpers_1.StaticHelpers.IsNullOrUndefined([_this.AutoSnapShotAgent])) {
            _this.Logger.ErrorAndThrow(ContentAPIManager.name, 'null check');
        }
        _this.Logger.FuncEnd(ContentAPIManager.name);
        return _this;
    }
    //async UpdateNickname(commandData: ICommandHndlrDataForContent): Promise<void> {
    //  return new Promise(async (resolve, reject) => {
    //    await new RecipeChangeNickName(commandData).Execute()
    //      .then(() => resolve())
    //      .catch((err) => reject(err));
    //  })
    //}
    ContentAPIManager.prototype.GetStateOfContent = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var reply;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reply = new DefaultScWindowState_1.DefaultContentReplyPayload();
                        return [4 /*yield*/, this.ScWinMan.GetStateOfSitecoreWindow(SnapShotFlavor_1.SnapShotFlavor.Live)
                                .then(function (result) { return reply.StateOfSitecoreWindow = result; })
                                .then(function () { return _this.AtticAgent.GetStateOfStorageSnapShots(); })
                                .then(function (result) { return reply.StateOfStorageSnapShots = result; })
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
    //    this.ToastAgent.PopUpToastNotification(this.ScWinMan.GetTopLevelDoc(), payloadData.ToastMessage);
    //  });
    //}
    ContentAPIManager.prototype.AddCETab = function (commandData) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new RecipeAddContentEditorToDesktop_1.RecipeAddNewContentEditorToDesktop(commandData.Logger, commandData.TargetDoc, commandData.DesktopProxy.DesktopStartBarAgent).Execute()
                            .then(function () {
                            _this.ToastAgent.RaiseToastNotification(commandData.ScWinMan.GetTopLevelDoc(), "Success");
                            resolve();
                        })
                            .catch(function (err) { return reject(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ContentAPIManager.prototype.PublischActiveCE = function (commandData) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new RecipePublishActiveCe_1.RecipePublishActiveCe(commandData, this.FactoryHelp).Execute()
                            .then(function () { return resolve; })
                            .catch(function (err) { return reject(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ContentAPIManager.prototype.DebugForceAutoSnapShot = function (commandData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var recipe;
                        var _this = this;
                        return __generator(this, function (_a) {
                            recipe = new RecipeForceAutoSnapShot_1.RecipeForceAutoSnapShot(commandData);
                            recipe.Execute()
                                .then(function () { return resolve(); })
                                .catch(function (err) { return reject(_this.DebugForceAutoSnapShot.name + ' | ' + err); });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    ContentAPIManager.prototype.SetNickName = function (commandData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var recipe;
                        var _this = this;
                        return __generator(this, function (_a) {
                            recipe = new RecipeChangeNickName_1.RecipeChangeNickName(commandData);
                            recipe.Execute()
                                .then(function () { return resolve(); })
                                .catch(function (err) { return reject(_this.SetNickName.name + ' | ' + err); });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    ContentAPIManager.prototype.RemoveSnapShot = function (commandData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var recipe;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    recipe = new RecipeRemoveItemFromStorage_1.RecipeRemoveItemFromStorage(commandData, commandData.ToastAgent);
                                    return [4 /*yield*/, recipe.Execute()
                                            .then(resolve)
                                            .catch(function (err) { return reject(err); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ContentAPIManager.prototype.SaveWindowState = function (commandData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var recipe;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    recipe = new RecipeSaveState_1.RecipeSaveStateManual(commandData);
                                    return [4 /*yield*/, recipe.Execute()
                                            .then(resolve)
                                            .catch(function (err) { return reject(err); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ContentAPIManager.prototype.ToggleCompactCss = function (commandData) {
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
    ContentAPIManager.prototype.SetStateOfSitecoreWindow = function (commandData) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        recipe = new RecipeRestore_1.RecipeSetStateOfSitecoreWindow(commandData.Logger, commandData.ScWinMan.GetScUrlAgent(), commandData.AtticAgent, commandData.ScWinMan.GetTopLevelDoc(), commandData.ScWinMan.MakeScWinRecipeParts(), commandData.ScWinMan.DesktopProxy(), commandData.ToastAgent, commandData.ScWinMan.ContentEditorProxy(), commandData.TargetSnapShotId, commandData.SettingsAgent);
                        return [4 /*yield*/, recipe.Execute()
                                .then(function () { return resolve(); })
                                .catch(function (err) { return reject(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ContentAPIManager.prototype.OpenContentEditor = function () {
        throw new Error("Method not implemented.");
    };
    ContentAPIManager.prototype.ToggleFavorite = function (commandData) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new RecipeToggleFavorite_1.RecipeToggleFavorite(commandData).Execute()
                            .then(function () { return resolve(); })
                            .catch(function (err) { return reject(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ContentAPIManager.prototype.Ping = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                resolve(_1xxx_MessageFlag_1.MsgFlag.RespListeningAndReady);
                return [2 /*return*/];
            });
        }); });
    };
    ContentAPIManager.prototype.AdminB = function () {
        this.ScUiMan.AdminB(this.ScWinMan.GetTopLevelDoc(), null);
    };
    return ContentAPIManager;
}(LoggableBase_1.LoggableBase));
exports.ContentAPIManager = ContentAPIManager;
//# sourceMappingURL=ContentAPIManager.js.map