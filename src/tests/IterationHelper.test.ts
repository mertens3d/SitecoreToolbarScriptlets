import { Hub } from '../jsToInject/Managers/Hub';
import { Debug } from '../jsToInject/Classes/debug';
import { IterationHelper } from '../jsToInject/Classes/IterationHelper';
import { SitecoreUiManagerFake } from './SitecoreUiManager.Fake';
import { iSitecoreUiManager } from '../jsToInject/interfaces/ISitecoreUiManager';

test('basic', () => {
  let debug = new Debug(window.opener);
  let ScUiManFake: iSitecoreUiManager = new SitecoreUiManagerFake(debug);
  var hub = new Hub(ScUiManFake, debug);
  var iterHelper = new IterationHelper(hub,  'test-1',1);

  expect(iterHelper.DecrementAndKeepGoing).toBe(true);
});