"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PayloadDataReqPopUp_1 = require("./PayloadDataReqPopUp");
var MsgFromPopUp = /** @class */ (function () {
    function MsgFromPopUp(msgFlag) {
        this.MsgFlag = msgFlag;
        this.Data = new PayloadDataReqPopUp_1.PayloadDataFromPopUp();
    }
    return MsgFromPopUp;
}());
exports.MsgFromPopUp = MsgFromPopUp;
//# sourceMappingURL=MsgPayloadRequestFromPopUp.js.map