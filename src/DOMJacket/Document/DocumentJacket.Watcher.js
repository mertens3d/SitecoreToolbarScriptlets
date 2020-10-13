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
exports.DocumentJacket_Watcher = void 0;
var _CommonCoreBase_1 = require("../../Shared/scripts/_CommonCoreBase");
var FrameJacketAddRemoveEvent_Observer_1 = require("../Events/NativeIFrameAddedEvent/FrameJacketAddRemoveEvent_Observer");
var FrameJacketAddRemoveEvent_Subject_1 = require("../Events/NativeIFrameAddedEvent/FrameJacketAddRemoveEvent_Subject");
var DocumentJacket_Watcher = /** @class */ (function (_super) {
    __extends(DocumentJacket_Watcher, _super);
    function DocumentJacket_Watcher(commonCore, documentJacket, documentJacketMutationEvent_Subject) {
        var _this = _super.call(this, commonCore) || this;
        _this.ErrorHand.ThrowIfNullOrUndefined(DocumentJacket_Watcher.name, [documentJacket]);
        _this.DocumentJacketMutationEvent_Subject = documentJacketMutationEvent_Subject;
        _this.DocumentJacket = documentJacket;
        _this.InstantiateInstance();
        return _this;
    }
    DocumentJacket_Watcher.prototype.InstantiateInstance = function () {
        this.Logger.FuncStart(this.InstantiateInstance.name, DocumentJacket_Watcher.name);
        this.FrameJacketAddRemoveEvent_Subject = new FrameJacketAddRemoveEvent_Subject_1.FrameJacketAddRemoveEvent_Subject(this.CommonCore, this.DocumentJacket);
        this.NativeIframeAddRemoveEvent_Observer = new FrameJacketAddRemoveEvent_Observer_1.FrameJacketAddRemoveEvent_Observer(this.CommonCore, this.CallBackOnNativeIFrameAddRemoveEventAsync.bind(this));
        this.WireInstanceEvents();
        this.Logger.FuncEnd(this.InstantiateInstance.name, DocumentJacket_Watcher.name);
    };
    DocumentJacket_Watcher.prototype.WireInstanceEvents = function () {
        this.Logger.FuncStart(this.WireInstanceEvents.name, DocumentJacket_Watcher.name);
        this.FrameJacketAddRemoveEvent_Subject.RegisterObserver(this.NativeIframeAddRemoveEvent_Observer);
        this.Logger.FuncEnd(this.WireInstanceEvents.name, DocumentJacket_Watcher.name);
    };
    //------------------------------------------------------------
    DocumentJacket_Watcher.prototype.CallBackOnNativeIFrameAddRemoveEventAsync = function (nativeIFrameAddRemoveEvent_Payload) {
        return __awaiter(this, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                this.Logger.FuncStart(this.CallBackOnNativeIFrameAddRemoveEventAsync.name);
                try {
                    payload = {
                        AddedFrameJacket: nativeIFrameAddRemoveEvent_Payload.AddedFrameJacket,
                        RemovedIFrameId: nativeIFrameAddRemoveEvent_Payload.RemovedIFrameId
                    };
                    this.DocumentJacketMutationEvent_Subject.NotifyObserversAsync(payload);
                }
                catch (err) {
                    this.ErrorHand.ErrorAndThrow(this.CallBackOnNativeIFrameAddRemoveEventAsync.name, err);
                }
                this.Logger.FuncEnd(this.CallBackOnNativeIFrameAddRemoveEventAsync.name);
                return [2 /*return*/];
            });
        });
    };
    return DocumentJacket_Watcher;
}(_CommonCoreBase_1._CommonBase));
exports.DocumentJacket_Watcher = DocumentJacket_Watcher;
//# sourceMappingURL=DocumentJacket.Watcher.js.map