"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InjectConst_1 = require("../Interfaces/InjectConst");
var AtticManager_1 = require("../Managers/AtticManager");
var EventManager_1 = require("../../PopUp/js/EventManager");
var FeedbackManager_1 = require("../Managers/FeedbackManager");
var GuidManager_1 = require("../Managers/GuidManager");
var LocationManager_1 = require("../Managers/LocationManager");
var MiscManager_1 = require("../Managers/MiscManager");
var OneCEManager_1 = require("../Managers/OneCEManager");
var OneDesktopManager_1 = require("../Managers/OneDesktopManager");
var OneTreeManager_1 = require("../Managers/OneTreeManager");
var OneWindowManager_1 = require("../Managers/OneWindowManager");
var PageDataManager_1 = require("../Managers/PageDataManager");
var PromiseGeneric_1 = require("../Promises/PromiseGeneric");
var PromiseOneStep_1 = require("../Promises/PromiseOneStep");
var UiManager_1 = require("../../PopUp/js/UiManager");
var Utilities_1 = require("../Classes/Utilities");
var MessagesManager_1 = require("./MessagesManager");
var ContentHub = /** @class */ (function () {
    function ContentHub(sitecoreUiMan, debug) {
        debug.FuncStart(ContentHub.name);
        this.debug = debug;
        this.SitecoreUiMan = sitecoreUiMan;
        this.Start();
        debug.FuncEnd(ContentHub.name);
    }
    ContentHub.prototype.Start = function () {
        this.debug.FuncStart(this.Start.name);
        this.AtticMan = new AtticManager_1.AtticManager(this);
        this.EventMan = new EventManager_1.EventManager(this);
        this.FeedbackMan = new FeedbackManager_1.FeedbackManager(this);
        this.GuidMan = new GuidManager_1.GuidManager(this);
        this.LocationMan = new LocationManager_1.LocationManager(this);
        this.MessagesMan = new MessagesManager_1.MessagesManager(this);
        this.MiscMan = new MiscManager_1.MiscManager(this);
        this.OneCEMan = new OneCEManager_1.OneCEManager(this);
        this.OneDesktopMan = new OneDesktopManager_1.OneDesktopManager(this);
        this.OneTreeMan = new OneTreeManager_1.OneTreeManager(this);
        this.OneWindowMan = new OneWindowManager_1.OneWindowManager(this);
        this.PageDataMan = new PageDataManager_1.PageDataManager(this);
        this.PromiseGeneric = new PromiseGeneric_1.PromiseGeneric(this);
        this.PromiseOneStep = new PromiseOneStep_1.PromiseOneStep(this);
        this.UiMan = new UiManager_1.UiManager(this);
        this.Utilities = new Utilities_1.Utilities(this);
        this.init();
        this.debug.FuncEnd(this.Start.name);
    };
    ContentHub.prototype.init = function () {
        this.debug.FuncStart(ContentHub.constructor.name + ' ' + this.init.name);
        this.Const = InjectConst_1.InjectConst.ContConst;
        this.AtticMan.Init();
        this.debug.Enabled = this.AtticMan.CurrentSettings().DebugSettings.ShowDebugData;
        this.EventMan.Init();
        this.PageDataMan.Init();
        this.OneWindowMan.Init();
        this.UiMan.Init();
        this.MessagesMan.Init();
        this.debug.FuncEnd(ContentHub.constructor.name + ' ' + this.init.name);
    };
    return ContentHub;
}());
exports.ContentHub = ContentHub;
//# sourceMappingURL=Hub.js.map