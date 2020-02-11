"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SitecoreUiManager_Fake_1 = require("./SitecoreUiManager.Fake");
var ContentDebug_1 = require("../Content/scripts/Classes/ContentDebug");
var ContentHub_1 = require("../Content/scripts/Managers/ContentHub");
var IterationHelper_1 = require("../Shared/scripts/Classes/IterationHelper");
test('basic', function () {
    var debug = new ContentDebug_1.ContentDebug(window.opener);
    var ScUiManFake = new SitecoreUiManager_Fake_1.SitecoreUiManagerFake(debug);
    var hub = new ContentHub_1.ContentHub(ScUiManFake, debug);
    var iterHelper = new IterationHelper_1.IterationHelper(debug, 'test-1', 1);
    expect(iterHelper.DecrementAndKeepGoing).toBe(true);
});
//# sourceMappingURL=IterationHelper.test.js.map