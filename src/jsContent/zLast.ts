import { SitecoreUiManager } from '../PopUp/js/Managers/SitecoreUiManager';
import { ContentHub } from './Managers/ContentHub'; 
import { Debug } from '../JsShared/Classes/debug';

var xyyz = xyyz || {};

let debug = new Debug(window.opener);
let SitecoreUiMan = new SitecoreUiManager(debug);

xyyz.HubObj = new ContentHub(SitecoreUiMan, debug);
