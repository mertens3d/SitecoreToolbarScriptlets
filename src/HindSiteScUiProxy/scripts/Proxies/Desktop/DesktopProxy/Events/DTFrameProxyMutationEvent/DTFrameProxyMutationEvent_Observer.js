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
exports.DTFrameProxyMutationEvent_Observer = void 0;
var HindSiteEvent_Observer_1 = require("../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer");
var DTFrameProxyMutationEvent_Observer = /** @class */ (function (_super) {
    __extends(DTFrameProxyMutationEvent_Observer, _super);
    function DTFrameProxyMutationEvent_Observer(logger, owner) {
        var _this = _super.call(this, logger, DTFrameProxyMutationEvent_Observer.name) || this;
        _this.Owner = owner;
        return _this;
    }
    DTFrameProxyMutationEvent_Observer.prototype.UpdateAsync = function (frameProxyMutatationEvent_Payload) {
        this.Owner.OnDTFrameProxyMutationEvent(frameProxyMutatationEvent_Payload);
    };
    return DTFrameProxyMutationEvent_Observer;
}(HindSiteEvent_Observer_1.HindSiteEvent_Observer));
exports.DTFrameProxyMutationEvent_Observer = DTFrameProxyMutationEvent_Observer;
//# sourceMappingURL=DTFrameProxyMutationEvent_Observer.js.map