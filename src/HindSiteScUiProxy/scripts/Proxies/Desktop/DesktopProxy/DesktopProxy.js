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
var RecipeBasics_1 = require("../../../../../Shared/scripts/Classes/RecipeBasics");
var StaticHelpers_1 = require("../../../../../Shared/scripts/Classes/StaticHelpers");
var InitResultsDesktopProxy_1 = require("../../../../../Shared/scripts/Interfaces/Agents/InitResultsDesktopProxy");
var InitResultsDTFrameProxy_1 = require("../../../../../Shared/scripts/Interfaces/Agents/InitResultsDTFrameProxy");
var RecipeRestoreDesktop_1 = require("../../../ContentApi/Recipes/RecipeRestoreDesktop");
var FrameHelper_1 = require("../../../Helpers/FrameHelper");
var LoggableBase_1 = require("../../../../../Shared/scripts/LoggableBase");
var DesktopStartBarProxy_1 = require("../DesktopStartBarProxy/DesktopStartBarProxy");
var DTFrameProxyBucket_1 = require("./DTFrameProxyBucket");
var DesktopProxyMutationEvent_Observer_1 = require("./Events/DesktopProxyMutationEvent/DesktopProxyMutationEvent_Observer");
var DesktopProxyMutationEvent_Subject_1 = require("./Events/DesktopProxyMutationEvent/DesktopProxyMutationEvent_Subject");
var DTFrameProxyMutationEvent_Observer_1 = require("./Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Observer");
var RecipeAddContentEditorToDesktop_1 = require("../../../ContentApi/Recipes/RecipeAddContentEditorToDesktop");
var DesktopProxy = /** @class */ (function (_super) {
    __extends(DesktopProxy, _super);
    function DesktopProxy(logger, associatedDoc, OwnerScWinProxy) {
        var _this = _super.call(this, logger) || this;
        _this.Logger.InstantiateStart(DesktopProxy.name);
        if (associatedDoc) {
            _this.AssociatedDoc = associatedDoc;
            _this.RecipeBasics = new RecipeBasics_1.RecipeBasics(_this.Logger);
        }
        else {
            _this.Logger.ErrorAndThrow(DesktopProxy.name, 'No associated doc');
        }
        _this.OwnerScWinProxy = OwnerScWinProxy;
        _this.Logger.InstantiateEnd(DesktopProxy.name);
        return _this;
    }
    DesktopProxy.prototype.PublishItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dtFrameProxy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dtFrameProxy = this.DesktopFrameProxyBucket.GetActiveFrame();
                        if (!dtFrameProxy) return [3 /*break*/, 2];
                        return [4 /*yield*/, dtFrameProxy.ContentEditorProxy.PublishItem()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DesktopProxy.prototype.OnReadyInitDesktopProxy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var initResultsDesktopProxy;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.OnReadyInitDesktopProxy.name);
                                    initResultsDesktopProxy = new InitResultsDesktopProxy_1.InitResultsDesktopProxy();
                                    this.DTFrameProxyMutationEvent_Observer = new DTFrameProxyMutationEvent_Observer_1.DTFrameProxyMutationEvent_Observer(this.Logger, this);
                                    this.DesktopFrameProxyBucket = new DTFrameProxyBucket_1.DTFrameProxyBucket(this.Logger);
                                    return [4 /*yield*/, this.OnReadyPopulateDTFrameProxyBucket()
                                            .then(function () {
                                            _this.DesktopStartBarAgent = new DesktopStartBarProxy_1.DesktopStartBarProxy(_this.Logger, _this);
                                            var self = _this;
                                            _this.DesktopProxyMutationEvent_Subject = new DesktopProxyMutationEvent_Subject_1.DesktopProxyMutationEvent_Subject(self.Logger, _this.AssociatedDoc);
                                            _this.WireEvents();
                                        })
                                            .then(function () { return resolve(initResultsDesktopProxy); })
                                            .catch(function (err) { return _this.Logger.ErrorAndThrow(_this.OnReadyInitDesktopProxy.name, err); })];
                                case 1:
                                    _a.sent();
                                    this.Logger.FuncEnd(this.OnReadyInitDesktopProxy.name);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DesktopProxy.prototype.AddContentEditorTabAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    recipe = new RecipeAddContentEditorToDesktop_1.RecipeAddNewContentEditorToDesktop(this.Logger, this.OwnerScWinProxy, this.AssociatedDoc);
                    recipe.Execute()
                        .catch(function (err) { return _this.Logger.ErrorAndThrow(_this.AddContentEditorTabAsync.name, err); });
                }
                catch (err) {
                    this.Logger.ErrorAndThrow(this.AddContentEditorTabAsync.name, err);
                }
                return [2 /*return*/];
            });
        });
    };
    DesktopProxy.prototype.OnDTFrameProxyMutationEvent = function (frameProxyMutatationEvent_Payload) {
        this.Logger.FuncStart(this.OnDTFrameProxyMutationEvent.name);
        this.DesktopStartBarAgent.OnTreeMutationEvent_DesktopStartBarProxy(frameProxyMutatationEvent_Payload);
        this.Logger.FuncEnd(this.OnDTFrameProxyMutationEvent.name);
    };
    DesktopProxy.prototype.OnDTFrameProxyMutation = function (desktopDTFrameProxyMutatationEvent_Payload) {
        if (this.DesktopProxyMutationEvent_Subject) {
            this.DesktopProxyMutationEvent_Subject.NotifyObservers(desktopDTFrameProxyMutatationEvent_Payload);
        }
    };
    DesktopProxy.prototype.GetFrameHelper = function () {
        if (this.__iframeHelper == null) {
            this.__iframeHelper = new FrameHelper_1.FrameHelper(this.Logger);
        }
        return this.__iframeHelper;
    };
    DesktopProxy.prototype.OnReadyPopulateDTFrameProxyBucket = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.GetFrameHelper().GetIFramesAsBaseFrameProxies(this.AssociatedDoc)
                                .then(function (frameProxies) {
                                frameProxies.forEach(function (frameProxy) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        this.AddDTFrameProxyAsync(frameProxy);
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        this.Logger.ErrorAndThrow(this.OnReadyPopulateDTFrameProxyBucket.name, err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DesktopProxy.prototype.WireEvents = function () {
        //let setting = this.SettingsAgent.SetByKey(SettingKey.AutoRenameCeButton);
        //if (setting && setting.ValueAsBool()) {
        //}
        this.DomChangedEvent_Subject = new DesktopProxyMutationEvent_Subject_1.DesktopProxyMutationEvent_Subject(this.Logger, this.AssociatedDoc);
        var DomChangeEvent_Observer = new DesktopProxyMutationEvent_Observer_1.DesktopProxyMutationEvent_Observer(this.Logger, this.OnDesktopProxyMutationEvent.bind(this));
        this.DomChangedEvent_Subject.RegisterObserver(DomChangeEvent_Observer);
    };
    DesktopProxy.prototype.OnDesktopProxyMutationEvent = function (payload) {
        var _this = this;
        this.Logger.Log("The desktop DOM changed - probably an iframe has been added");
        if (payload && payload.AddedDTFrameProxies.length > 0) {
            payload.AddedDTFrameProxies.forEach(function (dtFrameProxy) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    dtFrameProxy.OnReadyInitDTFrameProxy()
                        .then(function () { return _this.AddDTFrameProxyAsync(dtFrameProxy); })
                        .catch(function (err) { throw (DesktopProxyMutationEvent_Observer_1.DesktopProxyMutationEvent_Observer.name + ' | ' + err); });
                    return [2 /*return*/];
                });
            }); });
        }
    };
    DesktopProxy.prototype.AddDTFrameProxyAsync = function (dtframeProxy) {
        var _this = this;
        var initResultFrameProxy = new InitResultsDTFrameProxy_1.InitResultsDTFrameProxy();
        if (!StaticHelpers_1.StaticHelpers.IsNullOrUndefined([dtframeProxy, dtframeProxy.ContentEditorProxy, dtframeProxy.ContentEditorProxy.AssociatedDoc])) {
            this.RecipeBasics.WaitForReadyNABFrameProxy(dtframeProxy)
                .then(function () {
                var result = _this.DesktopFrameProxyBucket.AddToDTFrameProxyBucket(dtframeProxy);
                if (result) {
                    dtframeProxy.OnReadyInitDTFrameProxy()
                        .then(function (result) {
                        initResultFrameProxy = result;
                        var payload = {
                            AddedDTFrameProxies: [dtframeProxy],
                            MutatedElement: null,
                            DTFrameProxyMutationEvent_Payload: null
                        };
                        _this.DesktopProxyMutationEvent_Subject.NotifyObservers(payload);
                    })
                        .then(function () { return dtframeProxy.DTFrameProxyMutationEvent_Subject.RegisterObserver(_this.DTFrameProxyMutationEvent_Observer); })
                        .catch(function (err) { return _this.Logger.ErrorAndThrow(_this.AddDTFrameProxyAsync.name, err); });
                }
            });
        }
        else {
            this.Logger.ErrorAndThrow(this.AddDTFrameProxyAsync.name, 'null dtframeProxy or dtframeProxy.Doc');
        }
        this.Logger.LogAsJsonPretty('InitResultsDTFrameProxy', initResultFrameProxy);
    };
    DesktopProxy.prototype.GetAssociatedDoc = function () {
        return this.AssociatedDoc;
    };
    DesktopProxy.prototype.GetIframeHelper = function () {
        if (this.__iframeHelper == null) {
            this.__iframeHelper = new FrameHelper_1.FrameHelper(this.Logger);
        }
        return this.__iframeHelper;
    };
    DesktopProxy.prototype.ProcessLiveDTFrameProxies = function (results) {
        var toReturnDesktopState = new DefaultStateOfDesktop_1.DefaultStateOfDesktop();
        if (results) {
            for (var idx = 0; idx < results.length; idx++) {
                var dtframeProxy = results[idx];
                var stateOfFrame = dtframeProxy.GetStateOfDTFrame();
                toReturnDesktopState.StateOfDTFrames.push(stateOfFrame);
                if (dtframeProxy.GetZindex() === 1) {
                    toReturnDesktopState.IndexOfActiveFrame = idx;
                }
            }
        }
        return toReturnDesktopState;
    };
    DesktopProxy.prototype.GetStateOfDesktop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var err_2;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.GetStateOfDesktop.name);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.GetIframeHelper().GetIFramesAsDTFrameProxies(this.AssociatedDoc)
                                            .then(function (results) { return _this.ProcessLiveDTFrameProxies(results); })
                                            .then(function (results) { return resolve(results); })
                                            .catch(function (err) { return _this.Logger.ErrorAndThrow(_this.GetStateOfDesktop.name, err); })];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_2 = _a.sent();
                                    reject(this.GetStateOfDesktop.name + ' | ' + err_2);
                                    return [3 /*break*/, 4];
                                case 4:
                                    this.Logger.FuncEnd(this.GetStateOfDesktop.name);
                                    return [2 /*return*/];
                            }
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
                        var idx, stateOfFrame, recipe;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.SetStateOfDesktop.name);
                                    ;
                                    if (!(stateOfDesktop && stateOfDesktop.StateOfDTFrames && stateOfDesktop.StateOfDTFrames.length > 0)) return [3 /*break*/, 7];
                                    if (!!StaticHelpers_1.StaticHelpers.IsNullOrUndefined([this.AssociatedDoc])) return [3 /*break*/, 5];
                                    idx = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(idx < stateOfDesktop.StateOfDTFrames.length)) return [3 /*break*/, 4];
                                    stateOfFrame = stateOfDesktop.StateOfDTFrames[idx];
                                    recipe = new RecipeRestoreDesktop_1.RecipeRestoreFrameOnDesktop(this.Logger, this.AssociatedDoc, stateOfFrame, this.DesktopStartBarAgent, this.OwnerScWinProxy);
                                    //todo - do I need to await this? can't it just be triggered? we're not waiting on anything to finish
                                    return [4 /*yield*/, recipe.Execute()
                                            .then(function () { return resolve(); })
                                            .catch(function (err) { return reject(err); })];
                                case 2:
                                    //todo - do I need to await this? can't it just be triggered? we're not waiting on anything to finish
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