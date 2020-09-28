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
exports.DTAreaProxy = void 0;
var DefaultStateOfDesktop_1 = require("../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDesktop");
var RecipeBasics_1 = require("../../../../../Shared/scripts/Classes/RecipeBasics");
var InitResults_DesktopAreaProxy_1 = require("../../../../../Shared/scripts/Interfaces/Agents/InitResults_DesktopAreaProxy");
var LoggableBase_1 = require("../../../../../Shared/scripts/LoggableBase");
var FrameHelper_1 = require("../../../Helpers/FrameHelper");
var DTFrameProxyMutationEvent_Observer_1 = require("./Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Observer");
var DesktopAreaProxyMutationEvent_Observer_1 = require("./Events/DesktopProxyMutationEvent/DesktopAreaProxyMutationEvent_Observer");
var NativeIFrameAddedEvent_Subject_1 = require("./Events/DesktopProxyMutationEvent/NativeIFrameAddedEvent_Subject");
var DTAreaProxyMutationEvent_Subject_1 = require("./Events/DTAreaProxyMutationEvent/DTAreaProxyMutationEvent_Subject");
var DTAreaProxy = /** @class */ (function (_super) {
    __extends(DTAreaProxy, _super);
    function DTAreaProxy(logger, associatedDoc) {
        var _this = _super.call(this, logger) || this;
        _this.FramesBucket = [];
        _this.IncomingSetStateList = [];
        _this.AssociatedDoc = associatedDoc;
        return _this;
    }
    DTAreaProxy.prototype.Instantiate_DTAreaProxy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.Logger.FuncStart(this.Instantiate_DTAreaProxy.name);
                try {
                    this.FrameHelper = new FrameHelper_1.FrameHelper(this.Logger);
                    this.InitReportForDTAreaProxy = new InitResults_DesktopAreaProxy_1.InitReport_DTAreaProxy();
                    this.NativeIFrameAddedEvent_Subject = new NativeIFrameAddedEvent_Subject_1.NativeIFrameAddedEvent_Subject(this.Logger, this.AssociatedDoc);
                    this.RecipeBasics = new RecipeBasics_1.RecipeBasics(this.Logger);
                    this.DTAreaProxyMutationEvent_Subject = new DTAreaProxyMutationEvent_Subject_1.DTAreaProxyMutationEvent_Subject(this.Logger); //, this.OnDTAreaProxyMutationEvent.bind(this));
                    this.DTFrameProxyMutationEvent_Observer = new DTFrameProxyMutationEvent_Observer_1.DTFrameProxyMutationEvent_Observer(this.Logger, this.OnDTFProxyMutationEvent.bind(this));
                    this.NativeIframeAddedEvent_Observer = new DesktopAreaProxyMutationEvent_Observer_1.NativeIFrameAddedEvent_Observer(this.Logger, this.CallBackOnNativeIFrameAddedEvent.bind(this));
                }
                catch (err) {
                    this.Logger.ErrorAndThrow(this.Instantiate_DTAreaProxy.name, err);
                }
                this.Logger.FuncEnd(this.Instantiate_DTAreaProxy.name);
                return [2 /*return*/];
            });
        });
    };
    DTAreaProxy.prototype.WireEvents_DTAreaProxy = function () {
        this.Logger.FuncStart(this.WireEvents_DTAreaProxy.name);
        this.NativeIFrameAddedEvent_Subject.RegisterObserver(this.NativeIframeAddedEvent_Observer);
        this.Logger.FuncEnd(this.WireEvents_DTAreaProxy.name);
    };
    DTAreaProxy.prototype.CallBackOnNativeIFrameAddedEvent = function (payload) {
        var _this = this;
        this.Logger.FuncStart(this.CallBackOnNativeIFrameAddedEvent.name);
        this.Logger.Log("The desktop DOM changed - probably an iframe has been added");
        if (payload && payload.AddedDTFrameProxies.length > 0) {
            payload.AddedDTFrameProxies.forEach(function (dtFrameProxy) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.ProcessNewFrameProxy(dtFrameProxy);
                    return [2 /*return*/];
                });
            }); });
        }
        this.Logger.FuncEnd(this.CallBackOnNativeIFrameAddedEvent.name);
    };
    DTAreaProxy.prototype.ProcessNewFrameProxy = function (dtFrameProxy) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.ProcessNewFrameProxy.name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.RecipeBasics.WaitForReadyNABFrameProxy(dtFrameProxy)
                                .then(function () { return _this.newFrameStep1_Instantiate(dtFrameProxy); })
                                .then(function () { return _this.NewFrameStep2_SetStateIfQueued(dtFrameProxy); })
                                .then(function () { return _this.NewFrameStep3_WireEvents(dtFrameProxy); })
                                .then(function () { return _this.NewFrameStep4_NotifyObservers(dtFrameProxy); })
                                .catch(function (err) { return _this.Logger.ErrorAndThrow(_this.CallBackOnNativeIFrameAddedEvent.name, err); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.Logger.ErrorAndThrow(this.CallBackOnNativeIFrameAddedEvent.name, err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.Logger.FuncEnd(this.ProcessNewFrameProxy.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    DTAreaProxy.prototype.newFrameStep1_Instantiate = function (dtFrameProxy) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.newFrameStep1_Instantiate.name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dtFrameProxy.Instantiate_DTFrameProxy()
                                .then(function () { })
                                .catch(function (err) { return _this.Logger.ErrorAndThrow(_this.newFrameStep1_Instantiate.name, err); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        this.Logger.ErrorAndThrow(this.newFrameStep1_Instantiate.name, err_2);
                        return [3 /*break*/, 4];
                    case 4:
                        this.Logger.FuncEnd(this.newFrameStep1_Instantiate.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    DTAreaProxy.prototype.NewFrameStep3_WireEvents = function (dtFrameProxy) {
        this.Logger.FuncStart(this.NewFrameStep3_WireEvents.name);
        dtFrameProxy.DTFrameProxyMutationEvent_Subject.RegisterObserver(this.DTFrameProxyMutationEvent_Observer);
        dtFrameProxy.WireEvents_DTFrameProxy();
        this.Logger.FuncEnd(this.NewFrameStep3_WireEvents.name);
    };
    DTAreaProxy.prototype.NewFrameStep2_SetStateIfQueued = function (dtFrameProxy) {
        this.Logger.FuncStart(this.NewFrameStep2_SetStateIfQueued.name);
        var queuedState = this.IncomingSetStateList.shift();
        if (queuedState) {
            dtFrameProxy.SetStateOfDTFrame(queuedState);
        }
        this.Logger.FuncEnd(this.NewFrameStep2_SetStateIfQueued.name);
    };
    DTAreaProxy.prototype.NewFrameStep4_NotifyObservers = function (dtFrameProxy) {
        this.Logger.FuncStart(this.NewFrameStep4_NotifyObservers.name);
        var payload = {
            AddedDTFrameProxies: [dtFrameProxy],
            MutatedElement: null,
            DTFrameProxyMutationEvent_Payload: null
        };
        this.DTAreaProxyMutationEvent_Subject.NotifyObservers(payload);
        this.Logger.FuncEnd(this.NewFrameStep4_NotifyObservers.name);
    };
    //private NewFrameStep4_AddToDTFrameProxyBucket(dtframeProxy: DTFrameProxy): boolean {
    //  this.Logger.FuncStart(this.NewFrameStep4_AddToDTFrameProxyBucket.name);
    //  let toReturn: boolean = false;
    //  if (!this.BucketHasSameItem(dtframeProxy)) {
    //    this.FramesBucket.push(dtframeProxy);
    //    toReturn = true;
    //  }
    //  this.Logger.FuncEnd(this.NewFrameStep4_AddToDTFrameProxyBucket.name);
    //  return (toReturn);
    //}
    ////async PopulateFrameBucketWithExistingFrames(): Promise<void> {
    ////  try {
    ////    await this.FrameHelper.GetIFramesAsBaseFrameProxies(this.AssociatedDoc)
    ////      .then((frameProxies: DTFrameProxy[]) => {
    ////        frameProxies.forEach(async (frameProxy: _BaseFrameProxy) => {
    ////          this.ProcessNewFrameProxy(<DTFrameProxy>frameProxy);
    ////        });
    ////      });
    ////  }
    ////  catch (err) {
    ////    this.Logger.ErrorAndThrow(this.PopulateFrameBucketWithExistingFrames.name, err);
    ////  }
    ////}
    DTAreaProxy.prototype.OnDTAreaProxyMutationEvent = function (payload) {
    };
    DTAreaProxy.prototype.OnDTFProxyMutationEvent = function (payload) {
    };
    DTAreaProxy.prototype.AddToIncomingSetStateList = function (stateOfFrame) {
        var _this = this;
        this.Logger.FuncStart(this.AddToIncomingSetStateList.name);
        stateOfFrame.StateOfDTFrames.forEach(function (stateOfDTFrame) { return _this.IncomingSetStateList.push(stateOfDTFrame); });
        this.Logger.FuncEnd(this.AddToIncomingSetStateList.name);
    };
    DTAreaProxy.prototype.PublishTopFrame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dtFrameProxy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dtFrameProxy = this.GetTopFrame();
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
    DTAreaProxy.prototype.GetTopFrame = function () {
        var toReturn = null;
        this.FramesBucket.forEach(function (dtframeProxy) {
            if (dtframeProxy.GetZindex() == 1) {
                toReturn = dtframeProxy;
            }
        });
        return toReturn;
    };
    DTAreaProxy.prototype.GetStateOfFrames = function () {
        var toReturn = new DefaultStateOfDesktop_1.DefaultStateOfDesktopArea();
        for (var idx = 0; idx < this.FramesBucket.length; idx++) {
            var dtframeProxy = this.FramesBucket[idx];
            var stateOfFrame = dtframeProxy.GetStateOfDTFrame();
            toReturn.StateOfDTFrames.push(stateOfFrame);
            if (stateOfFrame.ZIndex === 1) {
                toReturn.IndexOfActiveFrame = idx;
            }
        }
        return toReturn;
    };
    DTAreaProxy.prototype.BucketHasSameItem = function (dtFrameBucketItem) {
        var toReturn = true;
        //todo - I think we'll need to check against the iframe id
        if (this.FramesBucket.indexOf(dtFrameBucketItem) < 0) {
            toReturn = false;
        }
        else {
            toReturn = true;
            this.Logger.WarningAndContinue(this.BucketHasSameItem.name, 'Proxy already exists in bucket');
        }
        return toReturn;
    };
    return DTAreaProxy;
}(LoggableBase_1.LoggableBase));
exports.DTAreaProxy = DTAreaProxy;
//# sourceMappingURL=DTAreaProxy.js.map