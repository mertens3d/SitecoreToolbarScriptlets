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
var MessageFlag_1 = require("../../../Shared/scripts/Enums/MessageFlag");
var PopUpMessagesManager = /** @class */ (function (_super) {
    __extends(PopUpMessagesManager, _super);
    function PopUpMessagesManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopUpMessagesManager.prototype.ReceiveMessage = function (msgPayload) {
    };
    PopUpMessagesManager.prototype.SendMessage = function (msgPlayload) {
        this.debug().LogVal('Sending Message', MessageFlag_1.MsgFlag[msgPlayload.MsgFlag]);
    };
    PopUpMessagesManager.prototype.FromAtticDrawStorage = function () {
        //AtticMan().DrawStorage
    };
    return PopUpMessagesManager;
}(PopUpManagerBase_1.PopUpManagerBase));
exports.PopUpMessagesManager = PopUpMessagesManager;
//# sourceMappingURL=PopUpMessagesManager.js.map