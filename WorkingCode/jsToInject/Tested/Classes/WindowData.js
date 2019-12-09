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
var Opener = /** @class */ (function () {
    function Opener() {
        this.Window = null;
        this.Document = null;
    }
    return Opener;
}());
var WindowData = /** @class */ (function (_super) {
    __extends(WindowData, _super);
    function WindowData(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(_this.constructor.name);
        _this.Opener = new Opener();
        xyyz.debug.FuncEnd(_this.constructor.name);
        xyyz.debug.FuncEnd(_this.constructor.name);
        return _this;
    }
    return WindowData;
}(SpokeBase));
//# sourceMappingURL=WindowData.js.map