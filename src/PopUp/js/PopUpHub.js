"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UiManager_1 = require("./Managers/UiManager");
var EventManager_1 = require("./Managers/EventManager");
var GuidHelper_1 = require("../../JsShared/Classes/GuidHelper");
var PopConst_1 = require("./Classes/PopConst");
var Utilities_1 = require("../../jsContent/Classes/Utilities");
var FeedbackManager_1 = require("./Managers/FeedbackManager");
var PopUpHub = /** @class */ (function () {
    function PopUpHub() {
        this.UiMan = new UiManager_1.UiManager(this);
        this.EventMan = new EventManager_1.EventManager(this);
        this.GuidMan = new GuidHelper_1.GuidHelper();
        this.PopUpConst = PopConst_1.PopConst.PopConst;
        this.Utilities = new Utilities_1.Utilities(this.debug);
        this.FeedbackMan = new FeedbackManager_1.FeedbackManager(this);
        this.init();
    }
    PopUpHub.prototype.init = function () {
        this.EventMan.Init();
        this.UiMan.Init();
    };
    return PopUpHub;
}());
exports.PopUpHub = PopUpHub;
//# sourceMappingURL=PopUpHub.js.map