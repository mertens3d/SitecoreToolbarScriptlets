import { ContentHub } from './Managers/ContentHub';
import { ContentDebug } from './Classes/ContentDebug';

//var xyyz = xyyz || {};

let debug = new ContentDebug(window.opener);
debug.Enabled = true;
//let SitecoreUiMan = new SitecoreUiManager(debug);

//xyyz.HubObj =
new ContentHub( debug);