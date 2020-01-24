"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SitecoreUiManager_1 = require("../jsPopUp/js/Managers/SitecoreUiManager");
var ContentHub_1 = require("./Managers/ContentHub");
var debug_1 = require("../JsShared/Classes/debug");
var xyyz = xyyz || {};
var debug = new debug_1.Debug(window.opener);
var SitecoreUiMan = new SitecoreUiManager_1.SitecoreUiManager(debug);
xyyz.HubObj = new ContentHub_1.ContentHub(SitecoreUiMan, debug);
//# sourceMappingURL=zLast.js.map