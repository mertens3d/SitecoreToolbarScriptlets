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
var scWindowType_1 = require("../../../Shared/scripts/Enums/scWindowType");
var PageDataManager = /** @class */ (function (_super) {
    __extends(PageDataManager, _super);
    function PageDataManager(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        _this.debug().CtorName(_this.constructor.name);
        return _this;
    }
    PageDataManager.prototype.GetTargetWindowAsync = function (useOrigWindow, windowType) {
        return __awaiter(this, void 0, void 0, function () {
            var targetWindow, newWindowUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.GetTargetWindowAsync.name);
                        if (!useOrigWindow) return [3 /*break*/, 1];
                        this.debug().Log('target window is self');
                        targetWindow = this.TopLevelWindow();
                        return [3 /*break*/, 3];
                    case 1:
                        this.debug().Log('target window is new');
                        newWindowUrl = this.__getUrlForWindowType(windowType);
                        return [4 /*yield*/, this.__getNewTargetWindowAsync(newWindowUrl)
                                .then(function (data) { return targetWindow = data; })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.debug().FuncEnd(this.GetTargetWindowAsync.name, 'child window id: ' + targetWindow.DataDocSelf.XyyzId.asShort);
                        return [2 /*return*/, targetWindow];
                }
            });
        });
    };
    PageDataManager.prototype.__getNewTargetWindowAsync = function (newWindowUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.debug().FuncStart(_this.__getNewTargetWindowAsync.name);
                        //var newWindowUrl = this.PageDataMan().__winDataParent.Window.location.href;
                        _this.debug().LogVal('newWindowUrl', newWindowUrl);
                        var newWindow = _this.__winDataParent.Window.open(newWindowUrl);
                        var self = _this;
                        newWindow.addEventListener('load', function () {
                            var toReturn = self.SetWindowDataToCurrent(newWindow, 'newly spawned window');
                            resolve(toReturn);
                        });
                        _this.debug().FuncEnd(_this.__getNewTargetWindowAsync.name);
                    })];
            });
        });
    };
    PageDataManager.prototype.SetWindowDataToCurrent = function (window, nickname) {
        var toReturn = {
            Friendly: 'New Tab',
            Window: window,
            WindowType: scWindowType_1.scWindowType.Unknown,
            DataDocSelf: {
                ParentDoc: null,
                Document: window.document,
                HasParentDesktop: false,
                XyyzId: this.GuidMan().NewGuid(),
                IsCEDoc: false,
                ParentDesktop: null,
                Nickname: nickname
            },
        };
        toReturn.DataDocSelf.ParentDoc = toReturn.DataDocSelf;
        return toReturn;
    };
    PageDataManager.prototype.TopLevelWindow = function () {
        console.log('marker c');
        return this.__winDataParent;
    };
    PageDataManager.prototype.Init = function () {
        this.debug().FuncStart(this.Init.name);
        if (window.opener) {
            this.__winDataParent = {
                Window: window.opener,
                Friendly: 'Parent Window',
                WindowType: scWindowType_1.scWindowType.Unknown,
                DataDocSelf: {
                    ParentDoc: null,
                    Document: (window.opener).document,
                    HasParentDesktop: false,
                    XyyzId: this.GuidMan().NewGuid(),
                    IsCEDoc: false,
                    ParentDesktop: null,
                    Nickname: 'Original Target Page'
                }
            };
            this.__winDataParent.DataDocSelf.ParentDoc = this.__winDataParent.DataDocSelf;
        }
        else {
            this.debug().Error(this.constructor.name, 'No Opener Page');
        }
        this.MsgMan().SetParentInfo(this.__winDataParent);
        this.debug().FuncEnd(this.Init.name);
    };
    PageDataManager.prototype.GetPageTypeOfTargetWindow = function (targetWindow) {
        this.debug().FuncStart(this.GetPageTypeOfTargetWindow.name, targetWindow.location.href);
        var toReturn;
        var currentLoc = targetWindow.location.href;
        if (currentLoc.indexOf(this.Const().UrlSuffix.Login) > -1) {
            toReturn = scWindowType_1.scWindowType.LoginPage;
        }
        else if (currentLoc.toLowerCase().indexOf(this.Const().UrlSuffix.Desktop.toLowerCase()) > -1) {
            this.debug().Log('Testing for Desktop editor');
            this.debug().Log('currentLoc.toLowerCase()' + currentLoc.toLowerCase());
            this.debug().Log('this.Const().Url.Desktop.toLowerCase()' + this.Const().UrlSuffix.Desktop.toLowerCase());
            toReturn = scWindowType_1.scWindowType.Desktop;
        }
        else if (new RegExp(this.Const().Regex.ContentEditor).test(currentLoc)) {
            toReturn = scWindowType_1.scWindowType.ContentEditor;
        }
        else if (currentLoc.toLowerCase().indexOf(this.Const().UrlSuffix.LaunchPad.toLowerCase()) > -1) {
            toReturn = scWindowType_1.scWindowType.Launchpad;
        }
        else {
            toReturn = scWindowType_1.scWindowType.Unknown;
        }
        this.debug().FuncEnd(this.GetPageTypeOfTargetWindow.name, scWindowType_1.scWindowType[toReturn]);
        return toReturn;
    };
    PageDataManager.prototype.__getUrlForWindowType = function (windowType) {
        var toReturn;
        this.debug().NotNullCheck('this.__winDataParent.DataDocSelf.Document', this.__winDataParent.DataDocSelf.Document);
        var hostName = this.__winDataParent.DataDocSelf.Document.location.origin;
        switch (windowType) {
            case scWindowType_1.scWindowType.ContentEditor:
                toReturn = hostName + this.Const().UrlSuffix.CE;
                break;
            case scWindowType_1.scWindowType.Desktop:
                toReturn = hostName + this.Const().UrlSuffix.Desktop;
                break;
            case scWindowType_1.scWindowType.Edit:
                toReturn = hostName + this.Const().UrlSuffix.None;
                break;
            case scWindowType_1.scWindowType.Preview:
                toReturn = hostName + this.Const().UrlSuffix.None;
                break;
            case scWindowType_1.scWindowType.Normal:
                toReturn = hostName + this.Const().UrlSuffix.None;
                break;
            default:
                toReturn = hostName;
                this.debug().Error(this.__getUrlForWindowType.name, 'unaccounted for window type');
                break;
        }
        return toReturn;
    };
    PageDataManager.prototype.GetCurrentPageType = function () {
        this.debug().FuncStart(this.GetCurrentPageType.name);
        var toReturn = scWindowType_1.scWindowType.Unknown;
        if (this.__winDataParent && this.__winDataParent && this.__winDataParent.Window && this.__winDataParent.DataDocSelf) {
            toReturn = this.GetPageTypeOfTargetWindow(this.__winDataParent.Window);
        }
        this.debug().FuncEnd(this.GetCurrentPageType.name + ' (' + toReturn + ') ' + scWindowType_1.scWindowType[toReturn]);
        return toReturn;
    };
    PageDataManager.prototype.DebugInfo = function () {
        this.debug().FuncStart(this.DebugInfo.name);
        this.debug().Log(this.__winDataParent.Window);
        this.debug().Log(this.__winDataParent.DataDocSelf);
        this.debug().FuncEnd(this.DebugInfo.name);
    };
    return PageDataManager;
}(_ContentManagerBase_1.ContentManagerBase));
exports.PageDataManager = PageDataManager;
//# sourceMappingURL=PageDataManager.js.map