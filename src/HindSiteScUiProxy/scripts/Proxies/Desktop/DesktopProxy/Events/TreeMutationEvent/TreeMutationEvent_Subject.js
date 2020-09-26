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
exports.TreeMutationEvent_Subject = void 0;
var ContentEditorTreeNodeProxy_1 = require("../../../../ContentEditor/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy");
var HindeSiteEvent_Subject_1 = require("../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject");
var TreeMutationEvent_Subject = /** @class */ (function (_super) {
    __extends(TreeMutationEvent_Subject, _super);
    function TreeMutationEvent_Subject(logger, treeElement) {
        var _this = _super.call(this, logger, TreeMutationEvent_Subject.name) || this;
        _this.TreeElement = treeElement;
        _this.InitTreeMutationEvent_Observer();
        return _this;
    }
    TreeMutationEvent_Subject.prototype.InitTreeMutationEvent_Observer = function () {
        try {
            if (this.TreeElement) {
                var self_1 = this;
                var observer = new MutationObserver(function (mutations) { return self_1.OnTreeMutationEvent_TreeMutationEvent_Subject(mutations); });
                observer.observe(this.TreeElement, { attributes: true, subtree: true, childList: true });
            }
        }
        catch (err) {
            throw (this.InitTreeMutationEvent_Observer.name + ' | ' + err);
        }
    };
    TreeMutationEvent_Subject.prototype.MakeScContentTreeNodeProxy = function (mutation) {
        var candidateNode = null;
        var mutatedAnchorElement = (mutation.target);
        candidateNode = new ContentEditorTreeNodeProxy_1.ScContentTreeNodeProxy(this.Logger, mutatedAnchorElement);
        return candidateNode;
    };
    TreeMutationEvent_Subject.prototype.OnTreeMutationEvent_TreeMutationEvent_Subject = function (mutationRecords) {
        var _this = this;
        mutationRecords.forEach(function (mutationRecord, index) {
            if (mutationRecord.attributeName === 'class') {
                var anchorTest = (mutationRecord.target);
                if (anchorTest) {
                    var scContentTreeNodeProxy = _this.MakeScContentTreeNodeProxy(mutationRecord);
                    if (scContentTreeNodeProxy) {
                        if (scContentTreeNodeProxy.QueryIsActive()) {
                            var treeMutationEvent_Payload = {
                                OwnerContentEditorProxy: null,
                                StateOfTree: null,
                                MutatedElement: (mutationRecord.target),
                                ActiveNode: scContentTreeNodeProxy,
                            };
                            _this.NotifyObservers(treeMutationEvent_Payload);
                        }
                    }
                }
            }
        });
    };
    return TreeMutationEvent_Subject;
}(HindeSiteEvent_Subject_1.HindeSiteEvent_Subject));
exports.TreeMutationEvent_Subject = TreeMutationEvent_Subject;
//# sourceMappingURL=TreeMutationEvent_Subject.js.map