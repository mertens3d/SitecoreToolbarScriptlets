var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SnapShotOneContentEditor = /** @class */ (function (_super) {
    __extends(SnapShotOneContentEditor, _super);
    function SnapShotOneContentEditor(id, zzyx) {
        var _this = _super.call(this, xyyz) || this;
        _this.Id = id;
        _this.__allTreeDataAr = [];
        return _this;
    }
    SnapShotOneContentEditor.prototype.GetDebugDataOneCE = function () {
        this.Xyyz.debug.FuncStart(this.GetDebugDataOneCE.name);
        var toReturn = [];
        toReturn.push('------ All Tree Nodes -----');
        for (var idx = 0; idx < this.__allTreeDataAr.length; idx++) {
            toReturn.push(this.__allTreeDataAr[idx].NodeId + ' ' + this.__allTreeDataAr[idx].NodeFriendly);
        }
        this.Xyyz.debug.FuncEnd(this.GetDebugDataOneCE.name);
        return toReturn;
    };
    return SnapShotOneContentEditor;
}(SpokeBase));
//# sourceMappingURL=SnapShotOneContentEditor.js.map