import { SitecoreUiManagerFake } from './SitecoreUiManager.Fake';
import { ContentDebug } from '../Content/scripts/Classes/ContentDebug';
import { iSitecoreUiManager } from '../Shared/scripts/Interfaces/ISitecoreUiManager';
import { ContentHub } from '../Content/scripts/Managers/ContentHub';
import { IterationHelper } from '../Content/scripts/Classes/IterationHelper';

test('basic', () => {
  let debug = new ContentDebug(window.opener);
  let ScUiManFake: iSitecoreUiManager = new SitecoreUiManagerFake(debug);
  var hub = new ContentHub(ScUiManFake, debug);
  var iterHelper = new IterationHelper(hub,  'test-1',1);

  expect(iterHelper.DecrementAndKeepGoing).toBe(true);
});