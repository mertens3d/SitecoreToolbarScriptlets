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
exports.ApiEntry = void 0;
var LoggableBase_1 = require("../../Shared/scripts/LoggableBase");
var Factory_1 = require("./Concretions/Factory");
var ApiEntry = /** @class */ (function (_super) {
    __extends(ApiEntry, _super);
    function ApiEntry(logger, contentBrowserProxy) {
        var _this = _super.call(this, logger) || this;
        _this.ContentBrowserProxy = contentBrowserProxy;
        _this.Factory = new Factory_1.Factory(_this.Logger, _this.ContentBrowserProxy);
        return _this;
    }
    return ApiEntry;
}(LoggableBase_1.LoggableBase));
exports.ApiEntry = ApiEntry;
//# sourceMappingURL=ApiEntryPoint.js.map