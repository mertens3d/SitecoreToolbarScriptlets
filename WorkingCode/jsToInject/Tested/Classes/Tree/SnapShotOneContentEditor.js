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
var SnapShotOneContentEditorManager = /** @class */ (function (_super) {
    __extends(SnapShotOneContentEditorManager, _super);
    function SnapShotOneContentEditorManager(xyyz) {
        return _super.call(this, xyyz) || this;
    }
    SnapShotOneContentEditorManager.prototype.MakeNewData = function (id) {
        this.Xyyz.debug.FuncStart('MakeNewData: ' + id);
        var toReturn = {
            Id: id,
            AllTreeNodeAr: []
        };
        this.Xyyz.debug.FuncEnd('MakeNewData: ' + id);
        return toReturn;
    };
    SnapShotOneContentEditorManager.prototype.DebugDataOneNode = function (dataOneTreeNode) {
        this.Xyyz.debug.FuncStart('DebugDataOneNode');
        var toReturn = dataOneTreeNode.NodeId + ' ' + dataOneTreeNode.NodeFriendly;
        this.Xyyz.debug.FuncEnd('DebugDataOneNode');
        return toReturn;
    };
    SnapShotOneContentEditorManager.prototype.GetDebugDataOneCE = function (dataOneCe) {
        this.Xyyz.debug.FuncStart('GetDebugDataOneCE');
        var toReturn = [];
        toReturn.push('------ All Tree Nodes -----');
        for (var idx = 0; idx < dataOneCe.AllTreeNodeAr.length; idx++) {
            this.Xyyz.debug.Log('idx: ' + idx);
            var oneVal = this.DebugDataOneNode(dataOneCe.AllTreeNodeAr[idx]);
            this.Xyyz.debug.Log("oneVal : " + oneVal);
            toReturn.push(oneVal);
        }
        this.Xyyz.debug.FuncEnd(this.GetDebugDataOneCE.name);
        return toReturn;
    };
    return SnapShotOneContentEditorManager;
}(SpokeBase));
//# sourceMappingURL=SnapShotOneContentEditor.js.map