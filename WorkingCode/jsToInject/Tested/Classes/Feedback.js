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
var FeedbackManager = /** @class */ (function (_super) {
    __extends(FeedbackManager, _super);
    function FeedbackManager(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        console.log('Feedback');
        return _this;
    }
    FeedbackManager.prototype.__getTextArea = function () {
        return document.getElementById(this.Xyyz.InjectConst.ElemId.textAreaFeedback);
    };
    FeedbackManager.prototype.ClearTextArea = function () {
        var ta = this.__getTextArea();
        if (ta) {
            ta.value = '';
        }
        else {
            this.Xyyz.debug.Error(FeedbackManager.name, 'No text area found');
        }
    };
    FeedbackManager.prototype.WriteLine = function (text) {
        var ta = this.__getTextArea();
        if (ta) {
            ta.value += text + '\\n';
            //ta.scrollTop = ta.scrollHeight;
        }
    };
    return FeedbackManager;
}(ManagerBase));
//# sourceMappingURL=Feedback.js.map