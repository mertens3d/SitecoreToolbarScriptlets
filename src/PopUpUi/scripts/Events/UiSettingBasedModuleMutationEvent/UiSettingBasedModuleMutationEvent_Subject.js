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
exports.UiSettingBasedModuleMutationEvent_Subject = void 0;
var HindeSiteEvent_Subject_1 = require("../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject");
var UiSettingBasedModuleMutationEvent_Subject = /** @class */ (function (_super) {
    __extends(UiSettingBasedModuleMutationEvent_Subject, _super);
    function UiSettingBasedModuleMutationEvent_Subject(logger) {
        return _super.call(this, logger, UiSettingBasedModuleMutationEvent_Subject.name) || this;
    }
    return UiSettingBasedModuleMutationEvent_Subject;
}(HindeSiteEvent_Subject_1.HindeSiteEvent_Subject));
exports.UiSettingBasedModuleMutationEvent_Subject = UiSettingBasedModuleMutationEvent_Subject;
//# sourceMappingURL=UiSettingBasedModuleMutationEvent_Subject.js.map