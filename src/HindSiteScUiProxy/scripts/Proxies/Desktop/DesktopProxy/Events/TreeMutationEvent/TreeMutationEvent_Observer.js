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
exports.TreeMutationEvent_Observer = void 0;
var HindSiteEvent_Observer_1 = require("../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer");
var TreeMutationEvent_Observer = /** @class */ (function (_super) {
    __extends(TreeMutationEvent_Observer, _super);
    function TreeMutationEvent_Observer(logger, ownerContentEditorProxy) {
        var _this = _super.call(this, logger, TreeMutationEvent_Observer.name) || this;
        _this.OwnerContentEditorProxy = ownerContentEditorProxy;
        return _this;
    }
    TreeMutationEvent_Observer.prototype.SetAssociatedContentEditorProxy = function (contentEditorProxy) {
        this.OwnerContentEditorProxy = contentEditorProxy;
    };
    TreeMutationEvent_Observer.prototype.UpdateAsync = function (payload) {
        this.OwnerContentEditorProxy.ContentEditorProxyOnTreeMutationEvent(payload);
        payload.OwnerContentEditorProxy = this.OwnerContentEditorProxy;
    };
    return TreeMutationEvent_Observer;
}(HindSiteEvent_Observer_1.HindSiteEvent_Observer));
exports.TreeMutationEvent_Observer = TreeMutationEvent_Observer;
//# sourceMappingURL=TreeMutationEvent_Observer.js.map