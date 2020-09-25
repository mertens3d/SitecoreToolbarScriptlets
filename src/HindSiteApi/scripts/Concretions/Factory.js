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
exports.Factory = void 0;
var LoggableBase_1 = require("../../../Shared/scripts/LoggableBase");
var DesktopProxy_1 = require("../Proxies/DesktopProxy/DesktopProxy");
var Factory = /** @class */ (function (_super) {
    __extends(Factory, _super);
    function Factory(logger, contentBrowserProxy) {
        var _this = _super.call(this, logger) || this;
        _this.ContentBrowserProxy = contentBrowserProxy;
        return _this;
    }
    Factory.prototype.NewDesktopProxy = function (associatedDoc) {
        return new DesktopProxy_1.DesktopProxy(this.Logger, associatedDoc, this.ContentBrowserProxy);
    };
    return Factory;
}(LoggableBase_1.LoggableBase));
exports.Factory = Factory;
//# sourceMappingURL=Factory.js.map