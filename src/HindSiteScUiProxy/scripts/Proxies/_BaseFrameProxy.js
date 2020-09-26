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
exports._BaseFrameProxy = void 0;
var LoggableBase_1 = require("../Managers/LoggableBase");
var FactoryHelper_1 = require("../../../Shared/scripts/Helpers/FactoryHelper");
var Guid_1 = require("../../../Shared/scripts/Helpers/Guid");
var _BaseFrameProxy = /** @class */ (function (_super) {
    __extends(_BaseFrameProxy, _super);
    function _BaseFrameProxy(logger, iframeElem) {
        var _this = _super.call(this, logger) || this;
        _this.Index = -1;
        _this.HTMLIframeElement = null;
        _this.Id = null;
        _this.Discriminator = _BaseFrameProxy.name;
        _this.HTMLIframeElement = iframeElem;
        _this.Id = Guid_1.Guid.NewRandomGuid();
        return _this;
    }
    _BaseFrameProxy.prototype.GetZindex = function () {
        var toReturn = -99;
        if (this.HTMLIframeElement && this.HTMLIframeElement.style && this.HTMLIframeElement.style.zIndex) {
            //toReturn = this.IframeElem.style.zIndex;
            toReturn = parseInt(this.HTMLIframeElement.style.zIndex);
        }
        return toReturn;
    };
    _BaseFrameProxy.prototype.GetContentDoc = function () {
        return new FactoryHelper_1.FactoryHelper(this.Logger).DataOneContentDocFactoryFromIframe(this);
    };
    return _BaseFrameProxy;
}(LoggableBase_1.LoggableBase));
exports._BaseFrameProxy = _BaseFrameProxy;
//# sourceMappingURL=_BaseFrameProxy.js.map