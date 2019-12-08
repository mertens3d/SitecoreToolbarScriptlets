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
var Utilities = /** @class */ (function (_super) {
    __extends(Utilities, _super);
    function Utilities(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(Utilities.name);
        xyyz.debug.FuncEnd(Utilities.name);
        return _this;
    }
    Utilities.prototype.MakeFriendlyDate = function (date) {
        var toReturn = date.toDateString() + ' ' + date.toTimeString();
        return toReturn;
    };
    Utilities.prototype.Uuidv4 = function () {
        //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Utilities;
}(SpokeBase));
//# sourceMappingURL=Utilities.js.map