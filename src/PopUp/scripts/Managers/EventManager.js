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
var PopUpManagerBase_1 = require("./PopUpManagerBase");
var MsgPayloadRequestFromPopUp_1 = require("../../../Shared/scripts/Classes/MsgPayloadRequestFromPopUp");
var MessageFlag_1 = require("../../../Shared/scripts/Enums/MessageFlag");
var PayloadDataReqPopUp_1 = require("../../../Shared/scripts/Classes/PayloadDataReqPopUp");
var EventManager = /** @class */ (function (_super) {
    __extends(EventManager, _super);
    function EventManager(popHub) {
        return _super.call(this, popHub) || this;
    }
    EventManager.prototype.Init = function () {
        this.__wireMenuButtons();
    };
    EventManager.prototype.__wireMenuButtons = function () {
        var _this = this;
        this.debug().FuncStart(this.__wireMenuButtons.name);
        this.UiMan().AssignDblClickEvent(this.PopConst().ElemId.HS.SelStateSnapShot, function (evt) { _this.__hndlrRestoreClick(evt); });
        this.UiMan().AssignDblClickEvent(this.PopConst().ElemId.HS.TaDebug, function () { _this.__cleardebugTextWithConfirm(); });
        this.UiMan().AssignOnChangeEvent(this.PopConst().ElemId.HS.SelStateSnapShot, function (evt) { _this.__hndlrSelectChange(evt); });
        //this.UiMan().AssignMenuWindowChanged((evt) => { this.__hndlrMenuWindowChanged(); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.AdminB, function () { _this.__handlrB(); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.Cancel, function (evt) { _this.__hndlrCancelOperation(evt); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.CE, function () { _this.__hndlrOpenCE(); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.Desktop, function (evt) { _this.__hndlrDesktop(evt); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.DrawStorage, function (evt) { return _this.__DrawStorage(evt); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.ModeEdit, function (evt) { return _this.__hndlrSetScMode(_this.PopConst().ScMode.edit, evt); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.ModeNorm, function (evt) { return _this.__hndlrSetScMode(_this.PopConst().ScMode.normal, evt); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.ModePrev, function (evt) { return _this.__hndlrSetScMode(_this.PopConst().ScMode.preview, evt); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.QuickPublish, function (evt) { _this.__hndlrQuickPublish(evt); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.RemoveFromStorage, function (evt) { return _this.__RemoveFromStorage(evt); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.RestoreWindowState, function (evt) { _this.__hndlrRestoreClick(evt); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.SaveWindowState, function (evt) { _this.__hndlrTakeSnapShot(evt); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.UpdateNicknameB, function () { return _this.__updateNickName(); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Btn.BigRed, function () { return _this.__hndlrAddCETab; });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndDebug, function (evt) { _this.__toggleAccordian(evt); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndForeSite, function (evt) { _this.__toggleAccordian(evt); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndHindSite, function (evt) { _this.__toggleAccordian(evt); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndInSite, function (evt) { _this.__toggleAccordian(evt); });
        this.UiMan().AssignOnClickEvent(this.PopConst().ElemId.HS.Legend.LgndSettings, function (evt) { _this.__toggleAccordian(evt); });
        this.debug().FuncEnd(this.__wireMenuButtons.name);
    };
    EventManager.prototype.__hndlrSelectChange = function (evt) {
        this.PopHub.UiMan.SelectChanged();
    };
    EventManager.prototype.__RemoveFromStorage = function (evt) {
        this.MsgMan().SendMessage(new MsgPayloadRequestFromPopUp_1.MsgFromPopUp(MessageFlag_1.MsgFlag.RemoveFromStorage));
    };
    EventManager.prototype.__DrawStorage = function (evt) {
        this.MsgMan().FromAtticDrawStorage();
    };
    EventManager.prototype.__hndlrSetScMode = function (newMode, evt) {
        return __awaiter(this, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                this.__initNewOperation();
                payload = new MsgPayloadRequestFromPopUp_1.MsgFromPopUp(MessageFlag_1.MsgFlag.SetScMode);
                payload.Data = new PayloadDataReqPopUp_1.PayloadDataFromPopUp();
                payload.Data.ReqScMode = newMode;
                payload.Data.UseOriginalWindowLocation = evt.ctrlKey;
                this.MsgMan().SendMessage(payload);
                return [2 /*return*/];
            });
        });
    };
    EventManager.prototype.__updateNickName = function () {
        var self = this.PopAtticMan;
        var payload = new MsgPayloadRequestFromPopUp_1.MsgFromPopUp(MessageFlag_1.MsgFlag.UpdateNickName);
        payload.Data.idOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();
        payload.Data.NewNickname = this.UiMan().GetValueInNickname();
        ;
        this.MsgMan().SendMessage(payload);
    };
    EventManager.prototype.__cleardebugTextWithConfirm = function () {
        this.debug().HndlrClearDebugText(this.debug(), true);
    };
    EventManager.prototype.__cleardebugText = function () {
        this.debug().HndlrClearDebugText(this.debug());
    };
    EventManager.prototype.__toggleAccordian = function (evt) {
        this.debug().FuncStart(this.__toggleAccordian.name);
        var srcElem = (evt.target || evt.srcElement);
        var foundContentSib = this.UiMan().GetAccordianContentElem(srcElem);
        if (foundContentSib) {
            var isCollapsed = foundContentSib.classList.contains(this.PopConst().ClassNames.HS.Collapsed);
            var newVal = !isCollapsed;
            this.UiMan().SetAccordianClass(foundContentSib, newVal);
            this.PopAtticMan().UpdateAccodianState(srcElem.getAttribute('id'), newVal);
        }
        else {
            this.debug().Error(this.__toggleAccordian.name, 'did not find sib');
        }
        this.debug().FuncEnd(this.__toggleAccordian.name);
    };
    EventManager.prototype.__handlrB = function () {
        this.MsgMan().SendMessage(new MsgPayloadRequestFromPopUp_1.MsgFromPopUp(MessageFlag_1.MsgFlag.AdminB));
    };
    EventManager.prototype.__hndlrMenuWindowChanged = function () {
        var menuData = {
            MenuX: (window.screenX || window.screenLeft || 0),
            MenuY: (window.screenY || window.screenTop || 0),
            MenuHeight: window.outerHeight,
            MenuWidth: window.outerWidth,
        };
        this.PopAtticMan().UpdateMenuCoords(menuData);
        this.__verifyMatchingTab();
    };
    EventManager.prototype.__verifyMatchingTab = function () {
        //this.UiMan().VerifyTabMatch();
    };
    EventManager.prototype.__hndlrDesktop = function (evt) {
        this.__initNewOperation();
        this.MsgMan().SendMessage(new MsgPayloadRequestFromPopUp_1.MsgFromPopUp(MessageFlag_1.MsgFlag.GoDesktop));
    };
    EventManager.prototype.__hndlrCancelOperation = function (evt) {
        this.UiMan().SetCancelFlag();
    };
    EventManager.prototype.__hndlrQuickPublish = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.__initNewOperation();
                this.MsgMan().SendMessage(new MsgPayloadRequestFromPopUp_1.MsgFromPopUp(MessageFlag_1.MsgFlag.QuickPublish));
                this.MsgMan().SendMessage(new MsgPayloadRequestFromPopUp_1.MsgFromPopUp(MessageFlag_1.MsgFlag.TaskSuccessful));
                return [2 /*return*/];
            });
        });
    };
    EventManager.prototype.__hndlrTakeSnapShot = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.__initNewOperation();
                this.MsgMan().SendMessage(new MsgPayloadRequestFromPopUp_1.MsgFromPopUp(MessageFlag_1.MsgFlag.TakeSnapShot));
                return [2 /*return*/];
            });
        });
    };
    EventManager.prototype.__hndlrAddCETab = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.__initNewOperation();
                this.MsgMan().SendMessage(new MsgPayloadRequestFromPopUp_1.MsgFromPopUp(MessageFlag_1.MsgFlag.AddCETab));
                return [2 /*return*/];
            });
        });
    };
    EventManager.prototype.__hndlrOpenCE = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.__initNewOperation();
                this.MsgMan().SendMessage(new MsgPayloadRequestFromPopUp_1.MsgFromPopUp(MessageFlag_1.MsgFlag.OpenCE));
                return [2 /*return*/];
            });
        });
    };
    EventManager.prototype.__initNewOperation = function () {
        this.__cleardebugText();
        this.UiMan().ClearCancelFlag();
    };
    EventManager.prototype.__hndlrRestoreClick = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                this.debug().FuncStart(this.__hndlrRestoreClick.name);
                this.__initNewOperation();
                payload = new MsgPayloadRequestFromPopUp_1.MsgFromPopUp(MessageFlag_1.MsgFlag.AddCETab);
                payload.Data.idOfSelect = this.UiMan().GetIdOfSelectWindowSnapshot();
                this.MsgMan().SendMessage(payload);
                this.debug().FuncEnd(this.__hndlrRestoreClick.name);
                return [2 /*return*/];
            });
        });
    };
    return EventManager;
}(PopUpManagerBase_1.PopUpManagerBase));
exports.EventManager = EventManager;
//# sourceMappingURL=EventManager.js.map