import { ContentHub } from '../jsContent/Managers/ContentHub';
import { Debug } from '../JsShared/Classes/debug';
import { IterationHelper } from '../jsContent/Classes/IterationHelper';
import { SitecoreUiManagerFake } from './SitecoreUiManager.Fake';
import { iSitecoreUiManager } from '../jsContent/interfaces/ISitecoreUiManager';

test('basic', () => {
  let debug = new Debug(window.opener);
  let ScUiManFake: iSitecoreUiManager = new SitecoreUiManagerFake(debug);
  var hub = new ContentHub(ScUiManFake, debug);
  var iterHelper = new IterationHelper(hub,  'test-1',1);

  expect(iterHelper.DecrementAndKeepGoing).toBe(true);
});