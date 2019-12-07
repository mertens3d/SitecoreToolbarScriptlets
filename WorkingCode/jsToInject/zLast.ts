//import PageData from './Classes/PageData';
//import Utilities from './Classes/Utilities';
//import WindowTreeSnapShotManager from './Classes/TreeDataManager';

var xyyz = xyyz || {};

xyyz.debug = new Debug();
xyyz.Utilities = new Utilities();
xyyz.PageData = new PageData(window.opener);
xyyz.WindowTreeSnapShotMan = new WindowTreeSnapShotManager();
xyyz.LocationMan = new LocationManager();
xyyz.WireMenuButtons();