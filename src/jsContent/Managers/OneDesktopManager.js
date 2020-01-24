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
var PromiseChainRestoreDesktop_1 = require("../Promises/PromiseChainRestoreDesktop");
var OneDesktopManager = /** @class */ (function (_super) {
    __extends(OneDesktopManager, _super);
    function OneDesktopManager(xyyz) {
        var _this = this;
        xyyz.debug.FuncStart(OneDesktopManager.name);
        _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncEnd(OneDesktopManager.name);
        return _this;
    }
    //GetNewIframeData(index: number, docElem: Document, iframe: HTMLIFrameElement) {
    //  var toReturn: IDataOneIframe = {
    //    Index: index,
    //    DocElem: docElem,
    //    IframeElem: iframe,
    //    Id: this.Xyyz.GuidMan.ParseGuid(iframe.getAttribute('id'))
    //  }
    //  return toReturn;
    //}
    OneDesktopManager.prototype.RestoreDesktopStateAsync = function (targetWindow, dataToRestore) {
        return __awaiter(this, void 0, void 0, function () {
            var idx, desktopPromiser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.RestoreDesktopStateAsync.name);
                        ;
                        if (!this.MiscMan().NotNullOrUndefined([targetWindow, dataToRestore, dataToRestore.AllCEAr], this.RestoreDesktopStateAsync.name)) return [3 /*break*/, 4];
                        idx = 0;
                        _a.label = 1;
                    case 1:
                        if (!(idx < dataToRestore.AllCEAr.length)) return [3 /*break*/, 4];
                        this.debug().Log('data idx: ' + idx + ':' + dataToRestore.AllCEAr.length);
                        desktopPromiser = new PromiseChainRestoreDesktop_1.PromiseChainRestoreDesktop(this.Xyyz);
                        return [4 /*yield*/, desktopPromiser.RunOneChain(targetWindow, dataToRestore.AllCEAr[idx])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        idx++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.debug().FuncEnd(this.RestoreDesktopStateAsync.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    OneDesktopManager.prototype.RestoreDataToOneIframeWorker = function (oneCEdata, newIframe) {
        return __awaiter(this, void 0, void 0, function () {
            var toReturn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.RestoreDataToOneIframeWorker.name, 'data not null: ' + (oneCEdata != null) + ' newFrame not null: ' + (newIframe !== null));
                        toReturn = false;
                        this.debug().DebugDataOneIframe(newIframe);
                        if (!(oneCEdata && newIframe)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.Xyyz.OneCEMan.RestoreCEStateAsync(oneCEdata, newIframe.ContentDoc)];
                    case 1:
                        _a.sent();
                        toReturn = true;
                        return [3 /*break*/, 3];
                    case 2:
                        this.debug().Error(this.RestoreDataToOneIframeWorker.name, 'bad data');
                        toReturn = false;
                        _a.label = 3;
                    case 3:
                        this.debug().FuncEnd(this.RestoreDataToOneIframeWorker.name, toReturn.toString());
                        return [2 /*return*/, toReturn];
                }
            });
        });
    };
    OneDesktopManager.prototype.WaitForIframeCountDiffWorker = function (IFramesbefore, targetWin) {
        return __awaiter(this, void 0, void 0, function () {
            var toReturn, iterationJr, beforeCount, allIframesAfter, count, newIframes, self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.WaitForIframeCountDiffWorker.name);
                        toReturn = null;
                        iterationJr = new IterationHelper_1.IterationHelper(this.Xyyz, this.WaitForIframeCountDiffWorker.name);
                        _a.label = 1;
                    case 1:
                        if (!(!toReturn && iterationJr.DecrementAndKeepGoing())) return [3 /*break*/, 5];
                        beforeCount = IFramesbefore.length;
                        allIframesAfter = this.GetAllLiveIframeData(targetWin);
                        count = allIframesAfter.length;
                        this.debug().Log('iFrame count before: ' + IFramesbefore.length);
                        this.debug().Log('iFrame count after: ' + allIframesAfter.length);
                        if (!(count > beforeCount)) return [3 /*break*/, 2];
                        newIframes = allIframesAfter.filter(function (e) { return !IFramesbefore.includes(e); });
                        toReturn = newIframes[0];
                        return [3 /*break*/, 4];
                    case 2:
                        self = this;
                        return [4 /*yield*/, iterationJr.Wait()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5:
                        this.debug().FuncEnd(this.WaitForIframeCountDiffWorker.name);
                        return [2 /*return*/, toReturn];
                }
            });
        });
    };
    OneDesktopManager.prototype.GetAllLiveIframeData = function (targetWindow) {
        this.debug().FuncStart(this.GetAllLiveIframeData.name);
        var toReturn = [];
        var iframeAr = targetWindow.DataDocSelf.Document.querySelectorAll(this.Const().Selector.SC.IframeContent);
        if (iframeAr) {
            this.debug().Log('iframeAr: ' + iframeAr.length);
            for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
                this.debug().Log('pushing: ' + ifrIdx);
                var iframeElem = iframeAr[ifrIdx];
                var dataOneIframe = this.Utilites().DateOneIframeFactory(iframeElem, targetWindow.DataDocSelf, 'desktop Iframe_' + ifrIdx);
                dataOneIframe.ContentDoc.HasParentDesktop = true;
                dataOneIframe.ContentDoc.IsCEDoc = true;
                toReturn.push(dataOneIframe);
            }
        }
        this.debug().FuncEnd(this.GetAllLiveIframeData.name, 'count:  ' + toReturn.length);
        return toReturn;
    };
    OneDesktopManager.prototype.SaveStateOneDesktop = function (targetWindow) {
        this.debug().FuncStart(this.SaveStateOneDesktop.name);
        ;
        this.debug().Log('SaveOneDesktop');
        ;
        var livingIframeAr = this.GetAllLiveIframeData(targetWindow);
        if (livingIframeAr && livingIframeAr.length > 0) {
            for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
                this.debug().Log('iframeIdx: ' + iframeIdx);
                var targetIframeObj = livingIframeAr[iframeIdx];
                //this.debug().Log('targetIframe: ' + JSON.stringify(targetIframeObj));
                this.Xyyz.OneCEMan.SaveStateOneContentEditor(targetIframeObj.Id, targetIframeObj.ContentDoc);
            }
        }
        this.debug().FuncEnd(this.SaveStateOneDesktop.name);
    };
    return OneDesktopManager;
}(_ContentManagerBase_1.ContentManagerBase));
exports.OneDesktopManager = OneDesktopManager;
;
//# sourceMappingURL=OneDesktopManager.js.map