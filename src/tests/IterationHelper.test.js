"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContentHub_1 = require("../jsContent/Managers/ContentHub");
var debug_1 = require("../JsShared/Classes/debug");
var IterationHelper_1 = require("../jsContent/Classes/IterationHelper");
var SitecoreUiManager_Fake_1 = require("./SitecoreUiManager.Fake");
test('basic', function () {
    var debug = new debug_1.Debug(window.opener);
    var ScUiManFake = new SitecoreUiManager_Fake_1.SitecoreUiManagerFake(debug);
    var hub = new ContentHub_1.ContentHub(ScUiManFake, debug);
    var iterHelper = new IterationHelper_1.IterationHelper(hub, 'test-1', 1);
    expect(iterHelper.DecrementAndKeepGoing).toBe(true);
});
//# sourceMappingURL=IterationHelper.test.js.map