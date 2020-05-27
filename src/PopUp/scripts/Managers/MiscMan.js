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
exports.MiscManager = void 0;
var PopUpManagerBase_1 = require("./PopUpManagerBase");
var MiscManager = /** @class */ (function (_super) {
    __extends(MiscManager, _super);
    function MiscManager(popHub, allPopUpAgents) {
        return _super.call(this, popHub, allPopUpAgents) || this;
    }
    return MiscManager;
}(PopUpManagerBase_1.PopUpManagerBase));
exports.MiscManager = MiscManager;
//# sourceMappingURL=MiscMan.js.map