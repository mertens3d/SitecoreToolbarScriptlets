"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContentAtticManager_1 = require("./ContentAtticManager");
var LocationManager_1 = require("./LocationManager");
var MiscManager_1 = require("./MiscManager");
var OneCEManager_1 = require("./OneCEManager");
var OneDesktopManager_1 = require("./OneDesktopManager");
var OneTreeManager_1 = require("./OneTreeManager");
var OneWindowManager_1 = require("./OneWindowManager");
var PageDataManager_1 = require("./PageDataManager");
var PromiseGeneric_1 = require("../Promises/PromiseGeneric");
var PromiseOneStep_1 = require("../Promises/PromiseOneStep");
var Utilities_1 = require("../../../Shared/scripts/Classes/Utilities");
var MessagesManager_1 = require("./MessagesManager");
var GuidHelper_1 = require("../../../Shared/scripts/Classes/GuidHelper");
var InjectConst_1 = require("../../../Shared/scripts/Interfaces/InjectConst");
var Factories_1 = require("../Classes/Factories");
var ContentHub = /** @class */ (function () {
    function ContentHub(sitecoreUiMan, debug) {
        debug.FuncStart(ContentHub.name);
        this.debug = debug;
        this.SitecoreUiMan = sitecoreUiMan;
        this.Init();
        debug.FuncEnd(ContentHub.name);
    }
    ContentHub.prototype.Init = function () {
        this.debug.FuncStart(this.Init.name);
        this.AtticMan = new ContentAtticManager_1.ContentAtticManager(this);
        this.GuidMan = new GuidHelper_1.GuidHelper();
        this.LocationMan = new LocationManager_1.LocationManager(this);
        this.MsgMan = new MessagesManager_1.MessagesManager(this);
        this.MiscMan = new MiscManager_1.MiscManager(this);
        this.OneCEMan = new OneCEManager_1.OneCEManager(this);
        this.OneDesktopMan = new OneDesktopManager_1.OneDesktopManager(this);
        this.OneTreeMan = new OneTreeManager_1.OneTreeManager(this);
        this.OneWindowMan = new OneWindowManager_1.OneWindowManager(this);
        this.PageDataMan = new PageDataManager_1.PageDataManager(this);
        this.PromiseGeneric = new PromiseGeneric_1.PromiseGeneric(this);
        this.PromiseOneStep = new PromiseOneStep_1.PromiseOneStep(this);
        this.Factory = new Factories_1.Factories(this);
        this.Utilities = new Utilities_1.Utilities(this.debug);
        this.init();
        this.debug.FuncEnd(this.Init.name);
    };
    ContentHub.prototype.init = function () {
        this.debug.FuncStart(ContentHub.constructor.name + ' ' + this.init.name);
        this.Const = InjectConst_1.InjectConst.ContConst;
        this.AtticMan.Init();
        this.debug.Enabled = this.MsgMan.IsDebugEnabled();
        this.PageDataMan.Init();
        this.OneWindowMan.Init();
        this.MsgMan.Init();
        this.debug.FuncEnd(ContentHub.constructor.name + ' ' + this.init.name);
    };
    return ContentHub;
}());
exports.ContentHub = ContentHub;
//# sourceMappingURL=ContentHub.js.map