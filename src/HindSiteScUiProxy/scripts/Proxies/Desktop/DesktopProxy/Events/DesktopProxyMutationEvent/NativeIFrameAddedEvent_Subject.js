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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeIFrameAddedEvent_Subject = void 0;
var DTFrameProxy_1 = require("../../FrameProxies/DTFrameProxy");
var HindeSiteEvent_Subject_1 = require("../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject");
var NativeIFrameAddedEvent_Subject = /** @class */ (function (_super) {
    __extends(NativeIFrameAddedEvent_Subject, _super);
    function NativeIFrameAddedEvent_Subject(logger, targetDoc) {
        var _this = _super.call(this, logger, NativeIFrameAddedEvent_Subject.name) || this;
        _this.Logger.CTORStart(NativeIFrameAddedEvent_Subject.name);
        if (!targetDoc) {
            _this.Logger.ErrorAndThrow(NativeIFrameAddedEvent_Subject.name, 'No target doc');
        }
        _this.AssociatedDoc = targetDoc;
        _this.InitMutationObserver();
        _this.Logger.CTOREnd(NativeIFrameAddedEvent_Subject.name);
        return _this;
    }
    NativeIFrameAddedEvent_Subject.prototype.HandleNativeMutationEvent = function (mutations) {
        var _this = this;
        this.Logger.FuncStart(this.HandleNativeMutationEvent.name);
        if (this.HasObservers()) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'childList') {
                    var mutatedElement = (mutation.target);
                    var addedDTFrameProxies_1 = [];
                    mutation.addedNodes.forEach(function (addedNode) {
                        if (addedNode instanceof HTMLIFrameElement) {
                            var dtFrameProxy = new DTFrameProxy_1.DTFrameProxy(_this.Logger, addedNode);
                            addedDTFrameProxies_1.push(dtFrameProxy);
                        }
                    });
                    var desktopMutatedEvent_Payload = {
                        MutatedElement: mutatedElement,
                        AddedDTFrameProxies: addedDTFrameProxies_1,
                        DTFrameProxyMutationEvent_Payload: null
                    };
                    _this.NotifyObservers(desktopMutatedEvent_Payload);
                }
            });
        }
        else {
            this.Logger.Log('No observers');
        }
        this.Logger.FuncEnd(this.HandleNativeMutationEvent.name);
    };
    NativeIFrameAddedEvent_Subject.prototype.InitMutationObserver = function () {
        this.Logger.FuncStart(this.InitMutationObserver.name);
        try {
            if (this.AssociatedDoc) {
                var self_1 = this;
                var mutationObserver = new MutationObserver(function (mutations) { self_1.HandleNativeMutationEvent(mutations); });
                var desktop = this.AssociatedDoc.ContentDoc.getElementById('Desktop');
                if (desktop) {
                    mutationObserver.observe(desktop, { attributes: false, subtree: false, childList: true });
                }
            }
            else {
                this.Logger.ErrorAndThrow(this.InitMutationObserver.name, 'no AssociatedDoc');
            }
        }
        catch (err) {
            throw (err);
        }
        this.Logger.FuncEnd(this.InitMutationObserver.name);
    };
    return NativeIFrameAddedEvent_Subject;
}(HindeSiteEvent_Subject_1.HindeSiteEvent_Subject));
exports.NativeIFrameAddedEvent_Subject = NativeIFrameAddedEvent_Subject;
//# sourceMappingURL=NativeIFrameAddedEvent_Subject.js.map