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
exports.DesktopProxyMutationEvent_Observer = void 0;
var HindSiteEvent_Observer_1 = require("../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer");
var DesktopProxyMutationEvent_Observer = /** @class */ (function (_super) {
    __extends(DesktopProxyMutationEvent_Observer, _super);
    function DesktopProxyMutationEvent_Observer(logger, callback) {
        return _super.call(this, logger, DesktopProxyMutationEvent_Observer.name, callback) || this;
    }
    return DesktopProxyMutationEvent_Observer;
}(HindSiteEvent_Observer_1.HindSiteEvent_Observer));
exports.DesktopProxyMutationEvent_Observer = DesktopProxyMutationEvent_Observer;
//# sourceMappingURL=DesktopProxyMutationEvent_Observer.js.map