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
        //   this.Xyyz.debug.FuncStart(this.AdminB .name);
        this.Xyyz.PageData.WinData.Opener.Document.getElementById('UserName').setAttribute('value', 'admin');
        this.Xyyz.PageData.WinData.Opener.Document.getElementById('Password').setAttribute('value', 'b');
        this.Xyyz.PageData.WinData.Opener.Document.getElementById('LogInBtn').click();
        //   this.Xyyz.debug.FuncEnd(this.AdminB .name);
    };
    return LocationManager;
}(SpokeBase));
//# sourceMappingURL=LocationManager.js.map