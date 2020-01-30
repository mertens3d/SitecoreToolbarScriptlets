import { ContentHub } from './Managers/ContentHub'; 
import { SitecoreUiManager } from '../../PopUp/scripts/Managers/SitecoreUiManager';
import { ContentDebug } from './Classes/ContentDebug';

var xyyz = xyyz || {};

let debug = new ContentDebug(window.opener);
debug.Enabled = true;
debug.LogVal('test of content debug','cat cat cat');
let SitecoreUiMan = new SitecoreUiManager(debug);

xyyz.HubObj = new ContentHub(SitecoreUiMan, debug);
