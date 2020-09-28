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
exports.DesktopProxy = void 0;
var DefaultStateOfDesktop_1 = require("../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop");
var StaticHelpers_1 = require("../../../../../Shared/scripts/Classes/StaticHelpers");
var InitResultsDesktopProxy_1 = require("../../../../../Shared/scripts/Interfaces/Agents/InitResultsDesktopProxy");
var LoggableBase_1 = require("../../../../../Shared/scripts/LoggableBase");
var DesktopPopUpMenuProxy_1 = require("./DesktopPopUpMenuProxy");
var DesktopStartBarProxy_1 = require("./DesktopStartBarProxy/DesktopStartBarProxy");
var DTAreaProxyMutationEvent_Observer_1 = require("./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Observer");
var DTAreaProxy_1 = require("./DTAreaProxy");
var DesktopProxy = /** @class */ (function (_super) {
    __extends(DesktopProxy, _super);
    function DesktopProxy(logger, associatedDoc) {
        var _this = _super.call(this, logger) || this;
        _this.Logger.CTORStart(DesktopProxy.name);
        if (associatedDoc) {
            _this.AssociatedDoc = associatedDoc;
        }
        else {
            _this.Logger.ErrorAndThrow(DesktopProxy.name, 'No associated doc');
        }
        _this.Logger.CTOREnd(DesktopProxy.name);
        return _this;
    }
    DesktopProxy.prototype.PublishItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.DTAreaProxy.PublishTopFrame()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DesktopProxy.prototype.Instantiate_DesktopProxy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var initReportDesktopProxy, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.Logger.FuncStart(this.Instantiate_DesktopProxy.name);
                        initReportDesktopProxy = new InitResultsDesktopProxy_1.InitReport_DesktopProxy();
                        this.DTAreaProxyMutationEvent_Observer = new DTAreaProxyMutationEvent_Observer_1.DTAreaProxyMutationEvent_Observer(this.Logger, this.OnAreaProxyMutationEvent);
                        this.DTAreaProxy = new DTAreaProxy_1.DTAreaProxy(this.Logger, this.AssociatedDoc);
                        return [4 /*yield*/, this.DTAreaProxy.Instantiate_DTAreaProxy()];
                    case 1:
                        _a.sent();
                        this.DTStartBarProxy = new DesktopStartBarProxy_1.DTStartBarProxy(this.Logger, this.AssociatedDoc);
                        return [4 /*yield*/, this.DTStartBarProxy.Instantiate_DTStartBarProxy()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.Logger.ErrorAndThrow(this.Instantiate_DesktopProxy.name, err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.Logger.FuncEnd(this.Instantiate_DesktopProxy.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    DesktopProxy.prototype.WireEvents_DesktopProxy = function () {
        this.Logger.FuncStart(this.WireEvents_DesktopProxy.name);
        this.DTAreaProxy.WireEvents_DTAreaProxy();
        this.Logger.FuncEnd(this.WireEvents_DesktopProxy.name);
    };
    DesktopProxy.prototype.AddContentEditorAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.DTPopUpMenuProxy = new DesktopPopUpMenuProxy_1.DTPopUpMenuProxy(this.Logger);
                        return [4 /*yield*/, this.DTStartBarProxy.TriggerRedButton()
                                .then(function () { return _this.DTPopUpMenuProxy.RecipeAddNewContentEditorToDesktop(_this.AssociatedDoc); })
                                .catch(function (err) { return _this.Logger.ErrorAndThrow(_this.AddContentEditorAsync.name, err); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        this.Logger.ErrorAndThrow(this.AddContentEditorAsync.name, err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DesktopProxy.prototype.OnAreaProxyMutationEvent = function (payload) {
    };
    DesktopProxy.prototype.OnDTFrameProxyMutationEvent = function (frameProxyMutatationEvent_Payload) {
        this.Logger.FuncStart(this.OnDTFrameProxyMutationEvent.name);
        this.DTStartBarProxy.OnTreeMutationEvent_DesktopStartBarProxy(frameProxyMutatationEvent_Payload);
        this.Logger.FuncEnd(this.OnDTFrameProxyMutationEvent.name);
    };
    //OnDTFrameProxyMutation(desktopDTFrameProxyMutatationEvent_Payload: INativeIFrameAddedEvent_Payload) {
    //  //todo - put back?
    //  //if (this.DesktopProxyMutationEvent_Subject) {
    //  //  this.DesktopProxyMutationEvent_Subject.NotifyObservers(desktopDTFrameProxyMutatationEvent_Payload);
    //  //}
    //}
    DesktopProxy.prototype.GetAssociatedDoc = function () {
        return this.AssociatedDoc;
    };
    DesktopProxy.prototype.GetStateOfDesktop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var toReturnDesktopState;
                        return __generator(this, function (_a) {
                            this.Logger.FuncStart(this.GetStateOfDesktop.name);
                            try {
                                toReturnDesktopState = new DefaultStateOfDesktop_1.DefaultStateOfDesktop();
                                toReturnDesktopState.StateOfDTArea = this.DTAreaProxy.GetStateOfFrames();
                                resolve(toReturnDesktopState);
                            }
                            catch (err) {
                                reject(this.GetStateOfDesktop.name + ' | ' + err);
                            }
                            this.Logger.FuncEnd(this.GetStateOfDesktop.name);
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    DesktopProxy.prototype.SetStateOfDesktop = function (stateOfDesktop) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var idx;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.SetStateOfDesktop.name);
                                    ;
                                    if (!(stateOfDesktop && stateOfDesktop.StateOfDTArea)) return [3 /*break*/, 7];
                                    if (!!StaticHelpers_1.StaticHelpers.IsNullOrUndefined([this.AssociatedDoc])) return [3 /*break*/, 5];
                                    this.DTAreaProxy.AddToIncomingSetStateList(stateOfDesktop.StateOfDTArea);
                                    idx = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(idx < stateOfDesktop.StateOfDTArea.StateOfDTFrames.length)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, this.AddContentEditorAsync()
                                            .then(function () { return resolve(); })
                                            .catch(function (err) { return reject(err); })];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    idx++;
                                    return [3 /*break*/, 1];
                                case 4: return [3 /*break*/, 6];
                                case 5:
                                    reject(this.SetStateOfDesktop.name + ' bad data');
                                    _a.label = 6;
                                case 6: return [3 /*break*/, 8];
                                case 7:
                                    reject(this.SetStateOfDesktop.name + '  No desktop state provided');
                                    _a.label = 8;
                                case 8:
                                    //await  Promise.all(promAr)
                                    //    .then(() => resolve())
                                    //    .catch((err) => reject(this.SetStateOfDesktop.name + ' | ' + err));
                                    this.Logger.FuncEnd(this.SetStateOfDesktop.name);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return DesktopProxy;
}(LoggableBase_1.LoggableBase));
exports.DesktopProxy = DesktopProxy;
//# sourceMappingURL=DesktopProxy.js.map