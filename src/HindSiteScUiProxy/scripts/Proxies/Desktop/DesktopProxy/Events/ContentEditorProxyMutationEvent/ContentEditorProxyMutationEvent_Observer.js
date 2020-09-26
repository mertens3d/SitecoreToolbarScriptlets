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
exports.ContentEditorProxyMutationEvent_Observer = void 0;
var HindSiteEvent_Observer_1 = require("../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer");
var ContentEditorProxyMutationEvent_Observer = /** @class */ (function (_super) {
    __extends(ContentEditorProxyMutationEvent_Observer, _super);
    function ContentEditorProxyMutationEvent_Observer(logger, ownerFrameProxy) {
        var _this = _super.call(this, logger, ContentEditorProxyMutationEvent_Observer.name) || this;
        _this.OwnerDTFrameProxy = ownerFrameProxy;
        return _this;
    }
    ContentEditorProxyMutationEvent_Observer.prototype.UpdateAsync = function (payload) {
        this.OwnerDTFrameProxy.OnContentEditorProxyMutation(payload);
    };
    return ContentEditorProxyMutationEvent_Observer;
}(HindSiteEvent_Observer_1.HindSiteEvent_Observer));
exports.ContentEditorProxyMutationEvent_Observer = ContentEditorProxyMutationEvent_Observer;
//# sourceMappingURL=ContentEditorProxyMutationEvent_Observer.js.map