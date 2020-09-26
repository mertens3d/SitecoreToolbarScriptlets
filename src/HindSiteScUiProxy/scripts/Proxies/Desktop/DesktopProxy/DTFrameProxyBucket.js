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
exports.DTFrameProxyBucket = void 0;
var LoggableBase_1 = require("../../../../../Shared/scripts/LoggableBase");
var DTFrameProxyBucket = /** @class */ (function (_super) {
    __extends(DTFrameProxyBucket, _super);
    function DTFrameProxyBucket(logger) {
        var _this = _super.call(this, logger) || this;
        _this.FrameBucketUnits = [];
        return _this;
    }
    DTFrameProxyBucket.prototype.AddToDTFrameProxyBucket = function (dtframeProxy) {
        var toReturn = false;
        if (!this.BucketHasSameItem(dtframeProxy)) {
            this.FrameBucketUnits.push(dtframeProxy);
            toReturn = true;
        }
        return (toReturn);
    };
    DTFrameProxyBucket.prototype.GetActiveFrame = function () {
        throw new Error("Method not implemented.");
    };
    DTFrameProxyBucket.prototype.BucketHasSameItem = function (dtFrameBucketItem) {
        var toReturn = true;
        //todo - I think we'll need to check against the iframe id
        if (this.FrameBucketUnits.indexOf(dtFrameBucketItem) < 0) {
            toReturn = false;
        }
        else {
            toReturn = true;
            this.Logger.WarningAndContinue(this.BucketHasSameItem.name, 'Proxy already exists in bucket');
        }
        return toReturn;
    };
    return DTFrameProxyBucket;
}(LoggableBase_1.LoggableBase));
exports.DTFrameProxyBucket = DTFrameProxyBucket;
//# sourceMappingURL=DTFrameProxyBucket.js.map