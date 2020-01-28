"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContentHub_1 = require("./Managers/ContentHub");
var SitecoreUiManager_1 = require("../../PopUp/scripts/Managers/SitecoreUiManager");
var ContentDebug_1 = require("./Classes/ContentDebug");
var xyyz = xyyz || {};
var debug = new ContentDebug_1.ContentDebug(window.opener);
var SitecoreUiMan = new SitecoreUiManager_1.SitecoreUiManager(debug);
xyyz.HubObj = new ContentHub_1.ContentHub(SitecoreUiMan, debug);
//# sourceMappingURL=zLast.js.map