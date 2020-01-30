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
var PromiseChainQuickPublish_1 = require("../Promises/PromiseChainQuickPublish");
var scWindowType_1 = require("../../../Shared/scripts/Enums/scWindowType");
var OneWindowManager = /** @class */ (function (_super) {
    __extends(OneWindowManager, _super);
    function OneWindowManager(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(OneWindowManager.name);
        xyyz.debug.FuncEnd(OneWindowManager.name);
        return _this;
    }
    OneWindowManager.prototype.SaveWindowState = function (targetWindow) {
        this.debug().FuncStart(this.SaveWindowState.name);
        var currentPageType = this.PageDataMan().GetCurrentPageType();
        this.Xyyz.OneWindowMan.CreateNewWindowSnapShot(currentPageType);
        if (currentPageType === scWindowType_1.scWindowType.ContentEditor) {
            this.debug().Log('is Content Editor');
            var id = this.Xyyz.GuidMan.EmptyGuid();
            //var docElem = targetWindow.DataDocSelf;
            this.Xyyz.OneCEMan.SaveStateOneContentEditor(id, targetWindow.DataDocSelf);
        }
        else if (currentPageType === scWindowType_1.scWindowType.Desktop) {
            this.debug().Log('is Desktop');
            this.Xyyz.OneDesktopMan.SaveStateOneDesktop(targetWindow);
        }
        else {
            this.debug().Error(this.SaveWindowState.name, 'Invalid page location ' + currentPageType);
        }
        //this.PopulateStateSel();
        this.debug().FuncEnd(this.SaveWindowState.name);
        ;
    };
    //WaitForPageLoad(desiredPageType: WindowType, targetWindow: IDataBrowserWindow, iteration: number, successCallBack: Function) {
    //  this.debug().FuncStart(this.WaitForPageLoad.name, 'Iteration: ' + iteration + ' | Desired type: ' + WindowType[desiredPageType]);
    //  var targetPageType: WindowType = this.PageDataMan().GetPageTypeOfTargetWindow(targetWindow.Window);
    //  if (targetPageType !== desiredPageType) {
    //    var self = this;
    //    if (iteration > 0) {
    //      iteration = iteration - 1;
    //      setTimeout(function () {
    //        self.WaitForPageLoad(desiredPageType, targetWindow, iteration, successCallBack);
    //      }, self.Const().Timeouts.WaitFogPageLoad);
    //    }
    //  } else {
    //    this.debug().Log('success, triggering callback: ' + successCallBack.name);
    //    successCallBack();
    //  }
    //  this.debug().FuncEnd(this.WaitForPageLoad.name);
    //}
    OneWindowManager.prototype.__getTopLevelIframe = function (targetWindow) {
        var toReturn = null;
        var allIframe = this.DesktopMan().GetAllLiveIframeData(targetWindow);
        var maxZVal = -1;
        if (allIframe && allIframe.length > 0) {
            for (var idx = 0; idx < allIframe.length; idx++) {
                var candidateIframe = allIframe[idx];
                if (candidateIframe && candidateIframe.Zindex > maxZVal) {
                    toReturn = candidateIframe;
                    maxZVal = candidateIframe.Zindex;
                }
            }
        }
        return toReturn;
    };
    OneWindowManager.prototype.PublishActiveCE = function (targetWindow) {
        return __awaiter(this, void 0, void 0, function () {
            var currentWindowType, docToPublish, topIframe, publishChain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.PublishActiveCE.name);
                        currentWindowType = this.PageDataMan().GetCurrentPageType();
                        docToPublish = null;
                        if (currentWindowType == scWindowType_1.scWindowType.Desktop) {
                            topIframe = this.__getTopLevelIframe(targetWindow);
                            if (topIframe) {
                                docToPublish = topIframe.ContentDoc;
                            }
                        }
                        else {
                            docToPublish = this.PageDataMan().TopLevelWindow().DataDocSelf;
                        }
                        this.debug().Log('docToPublish', this.debug().IsNullOrUndefined(docToPublish));
                        if (!docToPublish) return [3 /*break*/, 2];
                        publishChain = new PromiseChainQuickPublish_1.PromiseChainQuickPublish(this.Xyyz);
                        return [4 /*yield*/, publishChain.PublishCE(docToPublish)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.debug().FuncEnd(this.PublishActiveCE.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    OneWindowManager.prototype.RestoreWindowStateToTarget = function (targetWindow, dataToRestore) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.RestoreWindowStateToTarget.name);
                        if (!dataToRestore) return [3 /*break*/, 6];
                        if (!(dataToRestore.WindowType === scWindowType_1.scWindowType.ContentEditor)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.Xyyz.OneCEMan.RestoreCEStateAsync(dataToRestore.AllCEAr[0], targetWindow.DataDocSelf)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(dataToRestore.WindowType === scWindowType_1.scWindowType.Desktop)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.Xyyz.OneDesktopMan.RestoreDesktopStateAsync(targetWindow, dataToRestore)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.debug().Error(this.RestoreWindowStateToTarget.name, 'No match found for snap shot');
                        _a.label = 5;
                    case 5:
                        this.debug().FuncEnd(this.RestoreWindowStateToTarget.name);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OneWindowManager.prototype.PutCEDataToCurrentSnapShot = function (oneCeData) {
        this.debug().FuncStart(this.PutCEDataToCurrentSnapShot.name);
        this.debug().Log('PutCEDataToCurrentSnapShot');
        var matchingCeData = this.FindMatchingCeData(oneCeData);
        if (matchingCeData) {
            matchingCeData = oneCeData;
        }
        else {
            this.__activeWindowSnapShot.AllCEAr.push(oneCeData);
        }
        //this.__activeWindowTreeSnapShot.ShowDebugDataOneWindow();
        this.UpdateStorage();
        //this.AtticMan().DrawDebugDataPretty(this.__activeWindowSnapShot);
        this.debug().FuncEnd(this.PutCEDataToCurrentSnapShot.name);
    };
    OneWindowManager.prototype.UpdateStorage = function () {
        this.debug().FuncStart(this.UpdateStorage.name);
        this.AtticMan().WriteToStorage(this.__activeWindowSnapShot);
        this.debug().FuncEnd(this.UpdateStorage.name);
    };
    OneWindowManager.prototype.FindMatchingCeData = function (oneCeData) {
        var toReturn = null;
        for (var idx = 0; idx < this.__activeWindowSnapShot.AllCEAr.length; idx++) {
            var candidate = this.__activeWindowSnapShot.AllCEAr[idx];
            if (candidate.Id === oneCeData.Id) {
                toReturn = candidate;
                break;
            }
        }
        this.debug().Log('match found :' + (toReturn !== null));
        return toReturn;
    };
    OneWindowManager.prototype.Init = function () {
        var currentPageType = this.PageDataMan().GetCurrentPageType();
        this.CreateNewWindowSnapShot(currentPageType);
    };
    OneWindowManager.prototype.CreateNewWindowSnapShot = function (windowType) {
        this.debug().FuncStart(this.CreateNewWindowSnapShot.name);
        var dateToUse = new Date();
        //var friendly: string = this.Xyyz.Utilities.MakeFriendlyDate(dateToUse);
        var newGuid = this.Xyyz.GuidMan.NewGuid();
        this.__activeWindowSnapShot = {
            TimeStamp: dateToUse,
            WindowType: windowType,
            WindowFriendly: windowType[windowType],
            //TimeStampFriendly: friendly,
            AllCEAr: [],
            Id: newGuid,
            IsFavorite: false,
            NickName: '',
            RawData: null
        };
        this.debug().FuncEnd(this.CreateNewWindowSnapShot.name);
    };
    return OneWindowManager;
}(_ContentManagerBase_1.ContentManagerBase));
exports.OneWindowManager = OneWindowManager;
//# sourceMappingURL=OneWindowManager.js.map