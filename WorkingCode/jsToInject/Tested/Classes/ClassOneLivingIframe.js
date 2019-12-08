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
var ClassOneLivingIframe = /** @class */ (function (_super) {
    __extends(ClassOneLivingIframe, _super);
    function ClassOneLivingIframe(iframeIndex, iframeElem, xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(ClassOneLivingIframe.name + ' : ' + iframeIndex);
        _this.Index = iframeIndex;
        _this.IframeElem = iframeElem;
        _this.DocElem = iframeElem.contentDocument;
        xyyz.debug.Log('e) OneLivingIframeData');
        return _this;
    }
    return ClassOneLivingIframe;
}(SpokeBase));
//# sourceMappingURL=ClassOneLivingIframe.js.map