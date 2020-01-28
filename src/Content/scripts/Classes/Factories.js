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
var PromiseGeneric_1 = require("../Promises/PromiseGeneric");
var _ContentManagerBase_1 = require("../_first/_ContentManagerBase");
var GuidHelper_1 = require("../../../Shared/scripts/Classes/GuidHelper");
var Factories = /** @class */ (function (_super) {
    __extends(Factories, _super);
    function Factories(xyyz) {
        var _this = this;
        xyyz.debug.FuncStart(PromiseGeneric_1.PromiseGeneric.name);
        _this = _super.call(this, xyyz) || this;
        _this.GuidHelper = new GuidHelper_1.GuidHelper();
        xyyz.debug.FuncEnd(PromiseGeneric_1.PromiseGeneric.name);
        return _this;
    }
    Factories.prototype.DateOneIframeFactory = function (iframeElem, parentDocument, nickname) {
        var toReturn = {
            Index: -1,
            IframeElem: iframeElem,
            Id: this.GuidHelper.NewGuid(),
            Zindex: iframeElem.style.zIndex ? parseInt(iframeElem.style.zIndex) : -1,
            Nickname: nickname,
            ContentDoc: this.DataOneContentDocFactoryFromIframe(iframeElem, parentDocument, nickname),
        };
        return toReturn;
    };
    Factories.prototype.DataOneContentDocFactoryFromIframe = function (IframeElem, parentDocument, nickname) {
        var toReturn = {
            ParentDoc: parentDocument,
            Document: IframeElem.contentDocument,
            HasParentDesktop: false,
            XyyzId: this.GuidHelper.NewGuid(),
            IsCEDoc: false,
            ParentDesktop: null,
            Nickname: nickname + ' - content doc'
        };
        return toReturn;
    };
    return Factories;
}(_ContentManagerBase_1.ContentManagerBase));
exports.Factories = Factories;
//# sourceMappingURL=Factories.js.map