console.log('_first loaded');
//# sourceMappingURL=_first.js.map
console.log('_SpokeBase loaded');
var SpokeBase = /** @class */ (function () {
    function SpokeBase(xyyzHub) {
        //console.log(xyyzHub);
        this.Xyyz = xyyzHub;
        console.log('SpokeBase');
    }
    return SpokeBase;
}());
exports = SpokeBase;
//# sourceMappingURL=_SpokeBase.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ClassOneLivingIframe = /** @class */ (function (_super) {
    __extends(ClassOneLivingIframe, _super);
    function ClassOneLivingIframe(iframeIndex, iframeElem, xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(ClassOneLivingIframe.name + ' : ' + iframeIndex);
        _this.Index = iframeIndex;
        _this.IframeElem = iframeElem;
        _this.DocElem = iframeElem.contentDocument;
        xyyz.debug.Log('e) OneLivingIframeData');
        return _this;
    }
    return ClassOneLivingIframe;
}(SpokeBase));
//# sourceMappingURL=ClassOneLivingIframe.js.map
var Debug = /** @class */ (function () {
    function Debug() {
        console.log('debug');
        this.__indentCount = 0;
    }
    Debug.prototype.Log = function (text) {
        var indent = '  ';
        //text =  indent.repeat(this.__indentCount) + text;
        for (var idx = 0; idx < this.__indentCount; idx++) {
            text = indent + text;
        }
        console.log(text);
        var ta = document.getElementById('ta-debug');
        if (ta) {
            ta.value += text + '\\n\\r';
            ta.scrollTop = ta.scrollHeight;
        }
    };
    Debug.prototype.FuncStart = function (text) {
        text = 's) ' + text;
        this.Log(text);
        this.__indentCount++;
    };
    Debug.prototype.FuncEnd = function (text) {
        text = 'e) ' + text;
        this.__indentCount--;
        this.Log(text);
    };
    Debug.prototype.Error = function (container, text) {
        if (!container) {
            container = 'unknown';
        }
        if (!text) {
            text = 'unknown';
        }
        var logText = '** ERROR ** ' + container + ':' + text;
        this.Log(logText);
    };
    return Debug;
}());
//# sourceMappingURL=debug.js.map
var Hub = /** @class */ (function () {
    function Hub() {
        this.debug = new Debug();
        this.debug.FuncStart(Hub.name);
        this.Start();
        this.debug.FuncEnd(Hub.name);
    }
    Hub.prototype.Start = function () {
        this.debug.FuncStart(this.Start.name);
        console.log('marker A');
        this.PageData = new PageData(window, this);
        console.log('marker B');
        this.EventMan = new EventManager(this);
        console.log('marker C');
        this.Utilities = new Utilities(this);
        console.log('marker D');
        this.InjectConst = new InjectConst(this);
        console.log('marker E');
        this.LocationMan = new LocationManager(this);
        console.log('marker F');
        this.ManyTreesMan = new ManyTrees(this);
        console.log('marker G');
        this.OneTreeMan = new OneTree(this);
        console.log('marker H');
        this.WindowTreeSnapShotMan = new WindowTreeSnapShotManager(this);
        console.log('marker I');
        this.init();
        this.debug.FuncEnd(this.Start.name);
    };
    Hub.prototype.init = function () {
        this.debug.FuncStart(Hub.constructor.name + ' ' + this.init.name);
        this.EventMan.WireMenuButtons();
        this.debug.FuncEnd(Hub.constructor.name + ' ' + this.init.name);
    };
    return Hub;
}());
//# sourceMappingURL=Hub.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LocationManager = /** @class */ (function (_super) {
    __extends(LocationManager, _super);
    function LocationManager(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(LocationManager.name);
        _this.MaxAttempts = 10;
        _this.CurrentAttempt = _this.MaxAttempts;
        _this.EffortWait = 1000;
        xyyz.debug.FuncEnd(LocationManager.name);
        return _this;
    }
    LocationManager.prototype.SetHref = function (href, callback, isFromTimeout, effortCount) {
        this.Xyyz.debug.FuncStart(this.SetHref.toString() + ' : ' + href + ' : ' + isFromTimeout + ' : ' + effortCount);
        this.Xyyz.PageData.WinData.Opener.Window.location.href = href;
        if (isFromTimeout) {
            effortCount--;
        }
        else {
            effortCount = this.MaxAttempts;
        }
        if (this.Xyyz.PageData.WinData.Opener.Window.location.href === href) {
            callback();
        }
        else if (effortCount > 0) {
            setTimeout(function () {
                this.SetHref(href, callback, true, effortCount);
            }, this.EffortWait);
        }
        else {
            this.Xyyz.debug.Log('changing href unsuccessful. Dying');
        }
        this.Xyyz.debug.FuncEnd(this.SetHref.name);
    };
    LocationManager.prototype.Desktop = function () {
        //   this.Xyyz.debug.FuncStart(this.Desktop .name);
        var currentState = this.Xyyz.PageData.CurrentOpenerPageState();
        if (currentState === PageType.LoginPage) {
            this.Xyyz.debug.Log('On Login page: ');
            this.AdminB();
            setTimeout(function () {
                this.Xyyz.LocationMan.Desktop();
            }, 1000);
        }
        else if (currentState === PageType.Launchpad) {
            this.SetHref(this.Xyyz.InjectConst.Url.Desktop, this.Desktop, null, null);
        }
        else if (currentState === PageType.Desktop) {
            this.Xyyz.debug.Log('On Desktop');
            //   this.Xyyz.debug.Log('owner: ' + JSON.stringify(ownerWindow));
            //var pat = new RegExp('.*' + ownerWindow.location.hostname);
            //   this.Xyyz.debug.Log('pat: ' + pat);
            //var match = ownerWindow.location.href.match(pat);
            //   this.Xyyz.debug.Log('match: ' + match);
            //  this.Xyyz.PageData.WinData.Opener.Window.location.href =   this.Xyyz.InjectConst.Url.ShellDefaultAspx;
            this.Xyyz.LocationMan.TriggerRedButton();
        }
        this.Xyyz.debug.FuncEnd(this.Xyyz.LocationMan.Desktop.name);
    };
    LocationManager.prototype.RedButton = function (iteration) {
        this.Xyyz.debug.FuncStart(this.Xyyz.LocationMan.RedButton.name);
        var found = this.Xyyz.PageData.WinData.Opener.Document.getElementById('StartButton');
        this.Xyyz.debug.Log('Red Button: ' + found + '  ' + this.Xyyz.PageData.WinData.Opener.Window.location.href + ' ' + iteration);
        if (found) {
            found.click();
            var menuLeft = this.Xyyz.PageData.WinData.Opener.Document.querySelector('.scStartMenuLeftOption');
            if (menuLeft) {
                menuLeft.click();
            }
        }
        else {
            iteration = iteration - 1;
            if (iteration > 0) {
                setTimeout(function () {
                    this.Xyyz.LocationMan.RedButton(iteration);
                }, 1500);
            }
        }
    };
    LocationManager.prototype.TriggerRedButton = function () {
        this.Xyyz.debug.FuncStart(this.Xyyz.LocationMan.TriggerRedButton.name);
        var self = this;
        setTimeout(function () {
            self.Xyyz.LocationMan.RedButton(10);
        }, 1500);
        this.Xyyz.debug.FuncEnd(this.Xyyz.LocationMan.TriggerRedButton.name);
    };
    LocationManager.prototype.SetScMode = function (newValue) {
        var newValueB = '=' + newValue;
        window.opener.location.href = window.opener.location.href.replace('=normal', newValueB).replace('=preview', newValueB).replace('=edit', newValueB);
    };
    LocationManager.prototype.AdminB = function () {
        this.Xyyz.debug.FuncStart(this.AdminB.name);
        this.Xyyz.PageData.WinData.Opener.Document.getElementById('UserName').setAttribute('value', 'admin');
        this.Xyyz.PageData.WinData.Opener.Document.getElementById('Password').setAttribute('value', 'b');
        var candidate = this.Xyyz.PageData.WinData.Opener.Document.getElementById('LogInBtn');
        if (candidate) {
            candidate.click();
        }
        else {
            //window.opener.document.querySelector('input.btn').click()
            var candidate = this.Xyyz.PageData.WinData.Opener.Document.querySelector('input.btn');
            if (candidate) {
                candidate.click();
            }
        }
        this.Xyyz.debug.FuncEnd(this.AdminB.name);
    };
    return LocationManager;
}(SpokeBase));
//# sourceMappingURL=LocationManager.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var OneTreeNode = /** @class */ (function (_super) {
    __extends(OneTreeNode, _super);
    function OneTreeNode(nodeId, nodeFriendly, xyyz) {
        var _this = _super.call(this, xyyz) || this;
        _this.NodeId = nodeId;
        _this.NodeFriendly = nodeFriendly;
        return _this;
    }
    return OneTreeNode;
}(SpokeBase));
//# sourceMappingURL=OneTreeNode.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PageData = /** @class */ (function (_super) {
    __extends(PageData, _super);
    function PageData(window, xyyz) {
        var _this = _super.call(this, xyyz) || this;
        _this.Start();
        return _this;
    }
    PageData.prototype.Start = function () {
        this.Xyyz.debug.FuncStart(this.constructor.name + ' ' + this.Start.name);
        console.log('PageData B');
        if (window.opener) {
            this.WinData = new WindowData(this.Xyyz);
            this.WinData.Opener.Window = window.opener;
            this.WinData.Opener.Document = window.opener.document;
        }
        else {
            this.Xyyz.debug.Error(this.constructor.name, 'No Opener Page');
        }
        console.log('PageData C');
        this.DebugInfo();
        this.Xyyz.debug.FuncEnd(this.constructor.name);
    };
    PageData.prototype.CurrentOpenerPageState = function () {
        this.Xyyz.debug.FuncStart(this.CurrentOpenerPageState.name);
        var toReturn = PageType.Unknown;
        if (this.WinData && this.WinData.Opener && this.WinData.Opener.Window && this.WinData.Opener.Document) {
            var currentLoc = this.WinData.Opener.Window.location.href;
            this.Xyyz.debug.Log('currentLoc: ' + currentLoc);
            if (currentLoc.indexOf(this.Xyyz.InjectConst.Url.Login) > -1) {
                toReturn = PageType.LoginPage;
            }
            else if (currentLoc.indexOf(this.Xyyz.InjectConst.Url.Desktop) > -1) {
                toReturn = PageType.Desktop;
            }
            else if (currentLoc.indexOf(this.Xyyz.InjectConst.Url.ContentEditor) > -1) {
                toReturn = PageType.ContentEditor;
            }
            else if (currentLoc.indexOf(this.Xyyz.InjectConst.Url.LaunchPad) > -1) {
                toReturn = PageType.Launchpad;
            }
            else {
                toReturn = PageType.Unknown;
            }
        }
        this.Xyyz.debug.FuncEnd(this.CurrentOpenerPageState.name + ' ' + toReturn);
        return toReturn;
    };
    PageData.prototype.DebugInfo = function () {
        this.Xyyz.debug.FuncStart(this.DebugInfo.name);
        this.Xyyz.debug.Log(this.WinData.Opener.Window);
        this.Xyyz.debug.Log(this.WinData.Opener.Document);
        this.Xyyz.debug.FuncEnd(this.DebugInfo.name);
    };
    return PageData;
}(SpokeBase));
//# sourceMappingURL=PageData.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SnapShotOneWindow = /** @class */ (function (_super) {
    __extends(SnapShotOneWindow, _super);
    function SnapShotOneWindow(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(SnapShotOneWindow.name);
        _this.Start();
        xyyz.debug.FuncEnd(SnapShotOneWindow.name);
        return _this;
    }
    SnapShotOneWindow.prototype.Start = function () {
        this.Xyyz.debug.FuncStart(this.Start.name);
        this.TimeStamp = new Date();
        this.TimeStampFriendly = this.Xyyz.Utilities.MakeFriendlyDate(this.TimeStamp);
        this.AllCEAr = [];
        this.Id = this.Xyyz.Utilities.Uuidv4();
        this.Xyyz.debug.FuncEnd(this.Start.name);
    };
    SnapShotOneWindow.prototype.ShowDebugDataOneWindow = function () {
        this.Xyyz.debug.FuncStart(this.ShowDebugDataOneWindow.name);
        var toReturn = [];
        toReturn.push(this.TimeStamp);
        for (var jdx = 0; jdx < this.AllCEAr.length; jdx++) {
            var oneCE = this.AllCEAr[jdx];
            toReturn.push(oneCE.GetDebugDataOneCE());
        }
        this.Xyyz.debug.FuncEnd(this.ShowDebugDataOneWindow.name);
        return toReturn;
    };
    return SnapShotOneWindow;
}(SpokeBase));
//# sourceMappingURL=SnapShot.OneWindow.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SnapShotOneContentEditor = /** @class */ (function (_super) {
    __extends(SnapShotOneContentEditor, _super);
    function SnapShotOneContentEditor(id, zzyx) {
        var _this = _super.call(this, xyyz) || this;
        _this.Id = id;
        _this.__allTreeDataAr = [];
        return _this;
    }
    SnapShotOneContentEditor.prototype.GetDebugDataOneCE = function () {
        this.Xyyz.debug.FuncStart(this.GetDebugDataOneCE.name);
        var toReturn = [];
        toReturn.push('------ All Tree Nodes -----');
        for (var idx = 0; idx < this.__allTreeDataAr.length; idx++) {
            toReturn.push(this.__allTreeDataAr[idx].NodeId + ' ' + this.__allTreeDataAr[idx].NodeFriendly);
        }
        this.Xyyz.debug.FuncEnd(this.GetDebugDataOneCE.name);
        return toReturn;
    };
    return SnapShotOneContentEditor;
}(SpokeBase));
//# sourceMappingURL=SnapShotOneContentEditor.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WindowTreeSnapShotManager = /** @class */ (function (_super) {
    __extends(WindowTreeSnapShotManager, _super);
    function WindowTreeSnapShotManager(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(WindowTreeSnapShotManager.name);
        _this.CreateNewWindowTreeSnapShot();
        xyyz.debug.FuncEnd(WindowTreeSnapShotManager.name);
        return _this;
    }
    WindowTreeSnapShotManager.prototype.PutCEDataToCurrentSnapShot = function (oneCeData) {
        this.Xyyz.debug.FuncStart(this.PutCEDataToCurrentSnapShot.name + ' ' + JSON.stringify(oneCeData));
        var matchingCeData = this.FindMatchingCeData(oneCeData);
        if (matchingCeData) {
            matchingCeData = oneCeData;
        }
        else {
            this.__activeWindowTreeSnapShot.AllCEAr.push(oneCeData);
        }
        this.UpdateStorage();
        this.ShowDebugData();
        this.Xyyz.debug.FuncEnd(this.PutCEDataToCurrentSnapShot.name);
    };
    WindowTreeSnapShotManager.prototype.UpdateStorage = function () {
        var snapShotAsString = JSON.stringify(this.__activeWindowTreeSnapShot);
        window.localStorage.setItem(this.Xyyz.InjectConst.Storage.WindowRoot + this.__activeWindowTreeSnapShot.Id, snapShotAsString);
    };
    WindowTreeSnapShotManager.prototype.FindMatchingCeData = function (oneCeData) {
        var toReturn = null;
        for (var idx = 0; idx < this.__activeWindowTreeSnapShot.AllCEAr.length; idx++) {
            var candidate = this.__activeWindowTreeSnapShot.AllCEAr[idx];
            if (candidate.id === oneCeData.id) {
                toReturn = candidate;
                break;
            }
        }
        return toReturn;
    };
    WindowTreeSnapShotManager.prototype.CreateNewWindowTreeSnapShot = function () {
        this.Xyyz.debug.FuncStart(this.CreateNewWindowTreeSnapShot.name);
        this.__activeWindowTreeSnapShot = new SnapShotOneWindow(this.Xyyz);
        this.Xyyz.debug.FuncEnd(this.CreateNewWindowTreeSnapShot.name);
    };
    WindowTreeSnapShotManager.prototype.ShowDebugData = function () {
        this.Xyyz.debug.FuncStart(this.ShowDebugData.name);
        var allDebugData = [];
        allDebugData.push('------ One Window Snap Shot Start -----');
        allDebugData.push('Id: ' + this.__activeWindowTreeSnapShot.Id);
        allDebugData.push('TimeStamp: ' + this.__activeWindowTreeSnapShot.TimeStamp);
        allDebugData.push('CE Count: ' + this.__activeWindowTreeSnapShot.AllCEAr.length);
        for (var jdx = 0; jdx < this.__activeWindowTreeSnapShot.AllCEAr.length; jdx++) {
            allDebugData.push('------ One CE -----');
            var oneCE = this.__activeWindowTreeSnapShot.AllCEAr[jdx];
            allDebugData.push('Id: ' + oneCE.Id);
            var allCeDebugDataAr = oneCE.GetDebugDataOneCE();
            for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
                allDebugData.push(allCeDebugDataAr[kdx]);
            }
        }
        allDebugData.push('------ One Window Snap Shot End -----');
        for (var ldx = 0; ldx < allDebugData.length; ldx++) {
            this.Xyyz.debug.Log(allDebugData[ldx]);
        }
        this.Xyyz.debug.FuncEnd(this.ShowDebugData.name);
    };
    return WindowTreeSnapShotManager;
}(SpokeBase));
//# sourceMappingURL=TreeDataManager.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Utilities = /** @class */ (function (_super) {
    __extends(Utilities, _super);
    function Utilities(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(Utilities.name);
        xyyz.debug.FuncEnd(Utilities.name);
        return _this;
    }
    Utilities.prototype.MakeFriendlyDate = function (date) {
        var toReturn = date.toDateString() + ' ' + date.toTimeString();
        return toReturn;
    };
    Utilities.prototype.Uuidv4 = function () {
        //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    return Utilities;
}(SpokeBase));
//# sourceMappingURL=Utilities.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Opener = /** @class */ (function () {
    function Opener() {
        this.Window = null;
        this.Document = null;
    }
    return Opener;
}());
var WindowData = /** @class */ (function (_super) {
    __extends(WindowData, _super);
    function WindowData(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(_this.constructor.name);
        _this.Opener = new Opener();
        xyyz.debug.FuncEnd(_this.constructor.name);
        return _this;
    }
    return WindowData;
}(SpokeBase));
//# sourceMappingURL=WindowData.js.map
var PageType;
(function (PageType) {
    PageType[PageType['Unknown'] = 0] = 'Unknown';
    PageType[PageType['LoginPage'] = 1] = 'LoginPage';
    PageType[PageType['Desktop'] = 2] = 'Desktop';
    PageType[PageType['ContentEditor'] = 3] = 'ContentEditor';
    PageType[PageType['Launchpad'] = 4] = 'Launchpad';
})(PageType || (PageType = {}));
//# sourceMappingURL=PageType.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
console.log('EventManager loaded');
var EventManager = /** @class */ (function (_super) {
    __extends(EventManager, _super);
    function EventManager(xyyz) {
        return _super.call(this, xyyz) || this;
    }
    EventManager.prototype.WireMenuButtons = function () {
        this.Xyyz.debug.FuncStart(EventManager.name + ' ' + this.WireMenuButtons.name);
        var thisObj = this;
        document.getElementById('btnEdit').onclick = function () {
            thisObj.Xyyz.LocationMan.SetScMode('edit');
        };
        document.getElementById('btnPrev').onclick = function () {
            thisObj.Xyyz.LocationMan.SetScMode('preview');
        };
        document.getElementById('btnNorm').onclick = function () {
            thisObj.Xyyz.LocationMan.SetScMode('normal');
        };
        document.getElementById('btnAdminB').onclick = function () {
            thisObj.Xyyz.LocationMan.AdminB();
        };
        document.getElementById('btnDesktop').onclick = function () {
            thisObj.Xyyz.LocationMan.Desktop();
        };
        document.getElementById('btnSaveTheTrees').onclick = function () {
            thisObj.Xyyz.ManyTreesMan.SaveAllTrees();
        };
        document.getElementById('btnPlantTheTrees').onclick = function () {
            thisObj.Xyyz.ManyTreesMan.PlantTheTrees(window.opener.document, 0);
        };
        document.getElementById('btnDrawLocalStorage').onclick = function () {
            //todo   this.Xyyz.ManyTreesMan.DrawStorage();
            console.log('todo');
        };
        this.Xyyz.debug.FuncEnd(this.WireMenuButtons.name);
    };
    ;
    return EventManager;
}(SpokeBase));
//# sourceMappingURL=EventManager.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
console.log('InjectConst loaded');
var InjectConst = /** @class */ (function (_super) {
    __extends(InjectConst, _super);
    function InjectConst(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        _this.ClassNames = {
            ContentTreeNode: 'scContentTreeNode',
        };
        _this.Url = {
            Desktop: '/sitecore/shell/default.aspx',
            Login: '/sitecore/login',
            ContentEditor: '/sitecore/shell/Applications/Content%20Editor.aspx',
            LaunchPad: '/sitecore/shell/sitecore/client/applications/launchpad',
        };
        _this.Selector = {
            ContentTreeNodeGlyph: '.scContentTreeNodeGlyph',
            RootNodeId: 'Tree_Node_11111111111111111111111111111111'
        };
        _this.Storage = {
            WindowRoot: '  this.Xyyz.'
        };
        _this.TreeExpandedPng = 'treemenu_expanded.png';
        _this.MaxIter = 100;
        _this.GuidEmpty = '00000000-0000-0000-0000-000000000000';
        _this.prop = {
            AllTreeData: 'AllTreeData',
        };
        _this.Names = {
            HtmlToInject: 'HtmlToInject',
            StylesToInject: 'StylesToInject'
        };
        xyyz.debug.FuncStart(InjectConst.name);
        xyyz.debug.FuncEnd(InjectConst.name);
        return _this;
    }
    return InjectConst;
}(SpokeBase));
//# sourceMappingURL=InjectConst.js.map
var xyyz = xyyz || {};

xyyz.OneCEIframe = function () {
  this.Index = -1;
  this.TreeData = {};
};

xyyz.TreeData = function () {
  this.DateStamp = Date.now();
  this.AllCEIframes = [];
};
console.log('StorageMan loaded');

xyyz.StorageMan = {
  DrawStorage: function () {
    try {
      var fromStorage = window.localStorage.getItem(xyyz.InjectConst.Storage.WindowRoot);

      var asAr = fromStorage.split('},{');
      for (var idx = 0; idx < asAr.length; idx++) {

        xyyz.debug.Log(asAr[idx]);
      }

      //var converted = JSON.parse(fromStorage);
      
      //xyyz.debug.Log(JSON.stringify(converted, null, 4));

    } catch (e) {
      xyyz.debug.Error(e.message);
    }
  },

  GetTreeData: function (treeIdx) {
    xyyz.debug.Log('s) GetTreeData');
    var toReturn = null;
    var foundInStorageJson = window.localStorage.getItem(xyyz.InjectConst.Storage.WindowRoot);
    if (foundInStorageJson) {
      var foundInStorage = JSON.parse(foundInStorageJson);

      var allTreeDataAr = foundInStorage[xyyz.InjectConst.prop.AllTreeData];
      if (allTreeDataAr.length <= treeIdx) {
        toReturn = allTreeDataAr[treeIdx];
      }
    }
    xyyz.debug.Log('e) GetTreeData');
    return treeIdx;
  }
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
console.log('ManyTrees loaded');
var ManyTrees = /** @class */ (function (_super) {
    __extends(ManyTrees, _super);
    function ManyTrees(xyyz) {
        var _this = this;
        xyyz.debug.FuncStart(ManyTrees.name);
        _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncEnd(ManyTrees.name);
        return _this;
    }
    ManyTrees.prototype.GetAllLiveIframeData = function (targetDoc) {
        this.Xyyz.debug.FuncStart(this.GetAllLiveIframeData.name);
        var toReturn = [];
        var iframeAr = targetDoc.querySelectorAll('iframe[src*=content]');
        if (iframeAr) {
            this.Xyyz.debug.Log('iframeAr: ' + iframeAr.length);
            for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
                this.Xyyz.debug.Log('pushing: ' + ifrIdx);
                toReturn.push(new ClassOneLivingIframe(ifrIdx, iframeAr[ifrIdx], this.Xyyz));
            }
        }
        this.Xyyz.debug.FuncEnd(this.GetAllLiveIframeData.name + ' ' + toReturn.length);
        return toReturn;
    };
    ManyTrees.prototype.PlantTheTrees = function (targetDoc, treeIdx) {
        this.Xyyz.debug.Log('s) LookAtExistingData: ' + treeIdx);
        var foundInStorage = null; //todo   this.Xyyz.StorageMan.GetTreeData(treeIdx);
        if (foundInStorage) {
            this.Xyyz.debug.Log('foundInStorage: ' + foundInStorage);
            var fromStorageAr = foundInStorage.split(',');
            if (fromStorageAr) {
                this.Xyyz.debug.Log('foundAr: ' + fromStorageAr.length + ' ' + fromStorageAr);
                var allData = this.GetAllLiveIframeData(targetDoc)[treeIdx];
                for (var idx = 0; idx < fromStorageAr.length; idx++) {
                    var candidate = fromStorageAr[idx].replace(/\u0022/gi, '');
                    candidate = candidate.replace('[', '').replace(']', '');
                    this.Xyyz.debug.Log('candidate: ' + candidate);
                    var foundOnPage = null; //todo targetIframe.getElementById(candidate);
                    if (foundOnPage) {
                        this.Xyyz.debug.Log('foundOnPage');
                        var currentSrc = foundOnPage.getAttribute('src');
                        this.Xyyz.debug.Log('currentSrc' + currentSrc);
                        if (currentSrc.indexOf('treemenu_expanded.png') < 0) {
                            this.Xyyz.debug.Log('clicking it');
                            foundOnPage.click();
                        }
                    }
                }
            }
        }
    };
    ManyTrees.prototype.SaveOneContentEditor = function (id, docElem) {
        this.Xyyz.debug.FuncStart(this.SaveOneContentEditor.name);
        ;
        if (!id) {
            id = this.Xyyz.InjectConst.GuidEmpty;
        }
        if (!docElem) {
            docElem = this.Xyyz.PageData.WinData.Opener.Document;
            this.Xyyz.debug.Log('Assigning docElem: ' + docElem);
        }
        var CeSnapShot = new SnapShotOneContentEditor(id, this.Xyyz);
        var oneTree = new OneTree(this.Xyyz);
        CeSnapShot.__allTreeDataAr = oneTree.GetOneLiveTreeData(id, docElem);
        this.Xyyz.WindowTreeSnapShotMan.PutCEDataToCurrentSnapShot(CeSnapShot);
        this.Xyyz.debug.FuncEnd(this.SaveOneContentEditor.name);
        ;
    };
    ManyTrees.prototype.SaveOneDesktop = function () {
        this.Xyyz.debug.FuncStart(this.SaveOneDesktop.name);
        ;
        var livingIframeAr = this.GetAllLiveIframeData(this.Xyyz.PageData.WinData.Opener.Document);
        if (livingIframeAr && livingIframeAr.length > 0) {
            for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
                this.Xyyz.debug.Log('iframeIdx: ' + iframeIdx);
                var targetIframeObj = livingIframeAr[iframeIdx];
                this.Xyyz.debug.Log('targetIframe: ' + JSON.stringify(targetIframeObj));
                this.SaveOneContentEditor(iframeIdx, targetIframeObj.DocElem);
            }
        }
        this.Xyyz.debug.Log('done gathering tree data');
        this.Xyyz.WindowTreeSnapShotMan.ShowDebugData();
        this.Xyyz.debug.FuncEnd(this.SaveOneDesktop.name);
    };
    ManyTrees.prototype.SaveAllTrees = function () {
        this.Xyyz.debug.FuncStart(this.SaveAllTrees.name);
        this.Xyyz.WindowTreeSnapShotMan.CreateNewWindowTreeSnapShot();
        var currentState = this.Xyyz.PageData.CurrentOpenerPageState();
        if (currentState === PageType.ContentEditor) {
            this.SaveOneContentEditor(null, this.Xyyz);
        }
        else if (currentState === PageType.Desktop) {
            this.SaveOneDesktop();
        }
        else {
            this.Xyyz.debug.Error(this.SaveAllTrees.name, 'Invalid page location ' + currentState);
        }
        this.Xyyz.debug.FuncEnd(this.SaveAllTrees.name);
        ;
    };
    return ManyTrees;
}(SpokeBase));
;
//# sourceMappingURL=Trees.Many.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
console.log('OneTree loaded');
var OneTree = /** @class */ (function (_super) {
    __extends(OneTree, _super);
    function OneTree(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(OneTree.name);
        xyyz.debug.FuncEnd(OneTree.name);
        return _this;
    }
    OneTree.prototype.GetFriendlyNameFromNode = function (inputNode) {
        this.Xyyz.debug.FuncStart(this.GetFriendlyNameFromNode.name);
        var toReturn = 'unknown';
        var parentNode = inputNode.parentNode;
        var treeNode = parentNode.querySelector('[id^=Tree_Node_]');
        if (treeNode) {
            toReturn = treeNode.innerText;
        }
        else {
            this.Xyyz.debug.Log('No treeNode');
        }
        this.Xyyz.debug.FuncEnd(this.GetFriendlyNameFromNode.toString + ' ' + toReturn);
        return toReturn;
    };
    OneTree.prototype.WalkNodeRecursive = function (targetNode, depth) {
        var toReturn = [];
        depth = depth - 1;
        if (targetNode) {
            var className = targetNode.className;
            if (className === this.Xyyz.InjectConst.ClassNames.ContentTreeNode) {
                var firstImg = targetNode.querySelector(this.Xyyz.InjectConst.Selector.ContentTreeNodeGlyph);
                if (firstImg) {
                    var srcAttr = firstImg.getAttribute('src');
                    if (srcAttr.indexOf(this.Xyyz.InjectConst.TreeExpandedPng) > -1) {
                        var friendlyName = this.GetFriendlyNameFromNode(firstImg);
                        toReturn.push(new OneTreeNode(firstImg.id, friendlyName, this.Xyyz));
                    }
                }
            }
            var childNodes = targetNode.children;
            if (childNodes && childNodes.length > 0 && depth > 0) {
                for (var jdx = 0; jdx < childNodes.length; jdx++) {
                    var oneChild = childNodes[jdx];
                    toReturn = toReturn.concat(this.WalkNodeRecursive(oneChild, depth));
                }
            }
        }
        return toReturn;
    };
    OneTree.prototype.GetOneLiveTreeData = function (idx, targetDoc) {
        this.Xyyz.debug.FuncStart(this.GetOneLiveTreeData.name + ' idx: ' + idx);
        var toReturn = [];
        if (targetDoc) {
            this.Xyyz.debug.Log(JSON.stringify(targetDoc));
            var rootNode = targetDoc.getElementById(this.Xyyz.InjectConst.Selector.RootNodeId);
            if (rootNode) {
                this.Xyyz.debug.Log('rootNode: ' + rootNode.innerHTML);
                var rootParent = rootNode.parentElement;
                toReturn = this.WalkNodeRecursive(rootParent, this.Xyyz.InjectConst.MaxIter);
                this.Xyyz.debug.Log('foundNodes count: ' + toReturn.length);
                var nodesAsString = JSON.stringify(toReturn);
                this.Xyyz.debug.Log('toReturn as string: ' + nodesAsString);
            }
            else {
                this.Xyyz.debug.Error(this.GetOneLiveTreeData.name, 'no root node');
            }
        }
        else {
            this.Xyyz.debug.Error(this.GetOneLiveTreeData.name, 'no targetDoc');
        }
        this.Xyyz.debug.FuncEnd(this.GetOneLiveTreeData.name);
        return toReturn;
    };
    return OneTree;
}(SpokeBase));
//# sourceMappingURL=Trees.One.js.map
console.log('marker aa');
var xyyz = xyyz || {};
this.xyyz.HubObj = new Hub();
//new Hub();
console.log('marker bb');
//# sourceMappingURL=zLast.js.map