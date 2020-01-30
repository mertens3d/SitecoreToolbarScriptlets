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
var LocationManager = /** @class */ (function (_super) {
    __extends(LocationManager, _super);
    function LocationManager(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(LocationManager.name);
        xyyz.debug.FuncEnd(LocationManager.name);
        return _this;
    }
    LocationManager.prototype.SetHref = function (href, callback, targetWindow, effortCount) {
        if (effortCount === void 0) { effortCount = this.Const().Iterations.MaxSetHrefEffort; }
        this.debug().FuncStart(this.SetHref.name, href + ' : ' + effortCount + ' : has callback? ' + (callback !== null));
        effortCount -= 1;
        var isCorrectHref = targetWindow.Window.location.href = href;
        var isReadyState = targetWindow.DataDocSelf.Document.readyState === 'complete';
        if (effortCount > 0) {
            if (isCorrectHref && isReadyState) {
                this.debug().Log(this.SetHref.name, 'triggering callback');
                callback();
            }
            else {
                if (!isCorrectHref) {
                    targetWindow.Window.location.href !== href;
                }
                var self = this;
                setTimeout(function () {
                    this.debug().Log('setting timeout');
                    self.SetHref(href, callback, targetWindow, effortCount);
                }, self.Const().Timeouts.SetHrefEffortWait);
            }
        }
        else {
            this.debug().Log('changing href unsuccessful. Dying');
        }
        this.debug().FuncEnd(this.SetHref.name);
    };
    LocationManager.prototype.ChangeLocationSwitchBoard = function (desiredPageType, targetWindow, iteration) {
        var _this = this;
        if (iteration === void 0) { iteration = this.Const().Iterations.MaxIterationSwitchBoard; }
        this.debug().FuncStart(this.ChangeLocationSwitchBoard.name, 'desired = ' + scWindowType_1.scWindowType[desiredPageType] + ' iteration: ' + iteration + ':' + this.Const().Iterations.MaxIterationSwitchBoard);
        if (iteration > 0) {
            iteration -= 1;
            var currentState = this.PageDataMan().GetCurrentPageType();
            if (currentState === scWindowType_1.scWindowType.LoginPage) {
                var self = this;
                var callbackOnComplete = function () {
                    _this.debug().Log('callback triggered');
                    self.ChangeLocationSwitchBoard(desiredPageType, targetWindow, iteration);
                };
                this.AdminB(targetWindow.DataDocSelf, callbackOnComplete);
                var self = this;
                //setTimeout(function () {
                //  self.Xyyz.LocationMan.ChangeLocation(desiredPageType, targetWindow);
                //}, self.Const().Timeouts.TimeoutChangeLocation);
            }
            else if (currentState === scWindowType_1.scWindowType.Launchpad || currentState === scWindowType_1.scWindowType.ContentEditor || currentState === scWindowType_1.scWindowType.Desktop) {
                var self = this;
                var callBackOnSuccessfulHrefChange = function () {
                    self.debug().Log('Callback triggered');
                    targetWindow = self.PageDataMan().SetWindowDataToCurrent(targetWindow.Window, targetWindow.DataDocSelf.Nickname);
                    self.ChangeLocationSwitchBoard(desiredPageType, targetWindow, iteration);
                };
                if (desiredPageType === scWindowType_1.scWindowType.Desktop && currentState !== scWindowType_1.scWindowType.Desktop) {
                    this.SetHref(this.Const().UrlSuffix.Desktop, callBackOnSuccessfulHrefChange, targetWindow);
                }
                else if (desiredPageType === scWindowType_1.scWindowType.ContentEditor && currentState !== scWindowType_1.scWindowType.ContentEditor) {
                    this.SetHref(this.Const().UrlSuffix.CE, callBackOnSuccessfulHrefChange, targetWindow);
                }
                else if (currentState === scWindowType_1.scWindowType.Desktop && desiredPageType === scWindowType_1.scWindowType.Desktop) {
                    this.debug().Log('On Desktop');
                    //todo this.DesktopMan().TriggerRedButton(targetWindow.DataDocSelf);
                }
            }
        }
        this.debug().FuncEnd(this.ChangeLocationSwitchBoard.name);
    };
    LocationManager.prototype.SetScMode = function (newValue, useOrigWindow) {
        var _this = this;
        return new Promise(function () { return __awaiter(_this, void 0, void 0, function () {
            var itemGuid, targetWindow, currentPageType, dataOneDoc, AllTreeNodeAr, idx, candidate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.SetScMode.name, newValue.asString);
                        currentPageType = this.PageDataMan().GetCurrentPageType();
                        if (!(currentPageType === scWindowType_1.scWindowType.ContentEditor
                            ||
                                currentPageType === scWindowType_1.scWindowType.Desktop)) return [3 /*break*/, 4];
                        dataOneDoc = this.PageDataMan().TopLevelWindow().DataDocSelf;
                        AllTreeNodeAr = this.Xyyz.OneTreeMan.GetOneLiveTreeData(dataOneDoc);
                        for (idx = 0; idx < AllTreeNodeAr.length; idx++) {
                            candidate = AllTreeNodeAr[idx];
                            if (candidate.IsActive) {
                                itemGuid = candidate.NodeId;
                                break;
                            }
                        }
                        return [4 /*yield*/, alert(itemGuid.asString)];
                    case 1:
                        _a.sent();
                        if (!itemGuid) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.PageDataMan().GetTargetWindowAsync(useOrigWindow, scWindowType_1.scWindowType.Edit)];
                    case 2:
                        targetWindow = _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        if (currentPageType == scWindowType_1.scWindowType.Edit
                            || currentPageType == scWindowType_1.scWindowType.Normal
                            || currentPageType == scWindowType_1.scWindowType.Preview) {
                            if (targetWindow) {
                                window.opener.location.href = window.opener.location.href.replace('=normal', newValue.asString).replace('=preview', newValue.asString).replace('=edit', newValue.asString);
                            }
                        }
                        _a.label = 5;
                    case 5:
                        this.debug().FuncEnd(this.SetScMode.name);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    LocationManager.prototype.GetLoginButton = function (targetDoc) {
        this.debug().FuncStart(this.GetLoginButton.name);
        var toReturn = targetDoc.Document.getElementById(this.Const().ElemId.sc.scLoginBtn.sc920);
        if (!toReturn) {
            toReturn = targetDoc.Document.querySelector(this.Const().Selector.SC.LoginBtn.sc820);
        }
        this.debug().Log('toReturn: ' + toReturn);
        this.debug().FuncEnd(this.GetLoginButton.name);
        return toReturn;
    };
    LocationManager.prototype.AdminB = function (targetDoc, callbackOnComplete) {
        //callbackOnComplete();
        this.debug().FuncStart(this.AdminB.name, 'targetDoc: ' + targetDoc.DocId.asShort);
        this.debug().Log('callback passed: ' + (callbackOnComplete !== null));
        var userNameElem = targetDoc.Document.getElementById(this.Const().ElemId.sc.scLoginUserName);
        var passwordElem = targetDoc.Document.getElementById(this.Const().ElemId.sc.scLoginPassword);
        if (this.debug().IsNotNullOrUndefinedBool('userNameElem', userNameElem)
            &&
                this.debug().IsNotNullOrUndefinedBool('passwordElem', passwordElem)) {
            userNameElem.setAttribute('value', this.Const().Names.scDefaultAdminUserName);
            passwordElem.setAttribute('value', this.Const().Names.scDefaultAdminPassword);
            var loginButton = this.GetLoginButton(targetDoc);
            if (this.debug().IsNotNullOrUndefinedBool('loginButton', loginButton)) {
                this.debug().Log('clicking');
                loginButton.click();
                if (callbackOnComplete) {
                    this.debug().Log('Triggering callback');
                    setTimeout(callbackOnComplete, this.Const().Timeouts.PostLoginBtnClick);
                }
                else {
                    this.debug().Log('no callback passed');
                }
            }
            else {
                this.debug().Error(this.AdminB.name, 'No loginButton');
            }
        }
        else {
            this.debug().Error(this.AdminB.name, 'No Username or password field');
        }
        this.debug().FuncEnd(this.AdminB.name);
    };
    LocationManager.prototype.QkID = function () {
        return this.Const().ElemId;
    };
    return LocationManager;
}(_ContentManagerBase_1.ContentManagerBase));
exports.LocationManager = LocationManager;
//# sourceMappingURL=LocationManager.js.map