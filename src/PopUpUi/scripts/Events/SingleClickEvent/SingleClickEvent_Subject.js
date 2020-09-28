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
exports.SingleClickEvent_Subject = void 0;
var HindeSiteEvent_Subject_1 = require("../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject");
var SingleClickEvent_Subject = /** @class */ (function (_super) {
    __extends(SingleClickEvent_Subject, _super);
    function SingleClickEvent_Subject(logger, friendly) {
        return _super.call(this, logger, friendly + ' ' + SingleClickEvent_Subject.name) || this;
    }
    return SingleClickEvent_Subject;
}(HindeSiteEvent_Subject_1.HindeSiteEvent_Subject));
exports.SingleClickEvent_Subject = SingleClickEvent_Subject;
//# sourceMappingURL=SingleClickEvent_Subject.js.map