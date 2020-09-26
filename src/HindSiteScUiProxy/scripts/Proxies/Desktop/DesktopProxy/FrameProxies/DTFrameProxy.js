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
exports.DTFrameProxy = void 0;
var DefaultStateOfFrame_1 = require("../../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfFrame");
var RecipeBasics_1 = require("../../../../../../Shared/scripts/Classes/RecipeBasics");
var ContentEditorProxy_1 = require("../../../ContentEditor/ContentEditorProxy/ContentEditorProxy");
var ContentEditorProxyMutationEvent_Observer_1 = require("../Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Observer");
var _BaseFrameProxy_1 = require("./_BaseFrameProxy");
var InitResultsDTFrameProxy_1 = require("../../../../../../Shared/scripts/Interfaces/Agents/InitResultsDTFrameProxy");
var DTFrameProxyMutationEvent_Subject_1 = require("../Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Subject");
var DTFrameProxy = /** @class */ (function (_super) {
    __extends(DTFrameProxy, _super);
    function DTFrameProxy(logger, iframeElem) {
        var _this = _super.call(this, logger, iframeElem) || this;
        _this.Discriminator = DTFrameProxy.name;
        return _this;
    }
    DTFrameProxy.prototype.GetStateOfDTFrame = function () {
        var toReturn = new DefaultStateOfFrame_1.DefaultStateOfFrame();
        var sourceStyle = this.HTMLIframeElement.style;
        toReturn.Styling = {
            height: sourceStyle.height,
            left: sourceStyle.left,
            position: sourceStyle.position,
            top: sourceStyle.top,
            width: sourceStyle.width,
            zIndex: sourceStyle.zIndex
        };
        if (this.ContentEditorProxy) {
            toReturn.StateOfContentEditor = this.ContentEditorProxy.GetStateOfContentEditor();
        }
        return toReturn;
    };
    DTFrameProxy.prototype.SetStateOfDTFrame = function (stateOfDTFrame) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ContentEditorProxy.SetStateOfContentEditor(stateOfDTFrame.StateOfContentEditor)
                            .then(function () {
                            _this.HTMLIframeElement.style.height = stateOfDTFrame.Styling.height;
                            _this.HTMLIframeElement.style.left = stateOfDTFrame.Styling.left;
                            _this.HTMLIframeElement.style.position = stateOfDTFrame.Styling.position;
                            _this.HTMLIframeElement.style.top = stateOfDTFrame.Styling.top;
                            _this.HTMLIframeElement.style.width = stateOfDTFrame.Styling.width;
                            _this.HTMLIframeElement.style.zIndex = stateOfDTFrame.Styling.zIndex;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DTFrameProxy.prototype.OnContentEditorProxyMutation = function (payload) {
        var dtFrameProxyMutationEvent_Payload = {
            ContentEditorProxyMutationPayload: payload,
            DTFrameProxy: this
        };
        this.DTFrameProxyMutationEvent_Subject.NotifyObservers(dtFrameProxyMutationEvent_Payload);
    };
    DTFrameProxy.prototype.OnReadyInitDTFrameProxy = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var recipeBasic, initResultFrameProxy;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.OnReadyInitDTFrameProxy.name);
                        recipeBasic = new RecipeBasics_1.RecipeBasics(this.Logger);
                        initResultFrameProxy = new InitResultsDTFrameProxy_1.InitResultsDTFrameProxy();
                        return [4 /*yield*/, recipeBasic.WaitForReadyNABHtmlIframeElement(this.HTMLIframeElement)
                                .then(function () { return _this.ContentEditorProxy = new ContentEditorProxy_1.ContentEditorProxy(_this.GetContentDoc(), _this.Logger); })
                                .then(function () { return _this.ContentEditorProxy.OnReadyInitContentEditorProxy(); })
                                .then(function (result) { return initResultFrameProxy.InitResultContentEditorProxy = result; })
                                .then(function () {
                                _this.DTFrameProxyMutationEvent_Subject = new DTFrameProxyMutationEvent_Subject_1.DTFrameProxyMutationEvent_Subject(_this.Logger);
                                _this.ContentEditorProxyMutationEvent_Observer = new ContentEditorProxyMutationEvent_Observer_1.ContentEditorProxyMutationEvent_Observer(_this.Logger, _this);
                                _this.ContentEditorProxy.ContentEditorProxyMutationEvent_Subject.RegisterObserver(_this.ContentEditorProxyMutationEvent_Observer);
                                initResultFrameProxy.DTFrameProxyInitialized = true;
                            })
                                .then(function () { return resolve(initResultFrameProxy); })
                                .catch(function (err) { return reject(_this.OnReadyInitDTFrameProxy.name + ' | ' + err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return DTFrameProxy;
}(_BaseFrameProxy_1._BaseFrameProxy));
exports.DTFrameProxy = DTFrameProxy;
//# sourceMappingURL=DTFrameProxy.js.map