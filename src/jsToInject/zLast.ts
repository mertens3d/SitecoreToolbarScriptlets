import { SitecoreUiManager } from './Managers/SitecoreUiManager';
import { Hub } from './Managers/Hub'; 
import { Debug } from './Classes/debug';

var xyyz = xyyz || {};

let debug = new Debug(window.opener);
let SitecoreUiMan = new SitecoreUiManager(debug);

xyyz.HubObj = new Hub(SitecoreUiMan, debug);
