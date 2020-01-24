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
var PopUpManagerBase_1 = require("./PopUpManagerBase");
var FeedbackManager = /** @class */ (function (_super) {
    __extends(FeedbackManager, _super);
    function FeedbackManager(popHub) {
        return _super.call(this, popHub) || this;
    }
    FeedbackManager.prototype.__getTextArea = function () {
        return document.getElementById(this.PopConst().ElemId.textAreaFeedback);
    };
    FeedbackManager.prototype.WriteLine = function (text) {
        var ta = this.__getTextArea();
        if (ta) {
            ta.value += text + '\n';
            //ta.scrollTop = ta.scrollHeight;
        }
    };
    return FeedbackManager;
}(PopUpManagerBase_1.PopUpManagerBase));
exports.FeedbackManager = FeedbackManager;
//# sourceMappingURL=FeedbackManager.js.map