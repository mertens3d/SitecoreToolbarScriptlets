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
var GuidManager = /** @class */ (function (_super) {
    __extends(GuidManager, _super);
    function GuidManager(xyyz) {
        return _super.call(this, xyyz) || this;
    }
    GuidManager.prototype.ParseGuid = function (val) {
        var toReturn = {
            Value: val
        };
        return toReturn;
    };
    return GuidManager;
}(ManagerBase));
//# sourceMappingURL=GuidManager.js.map