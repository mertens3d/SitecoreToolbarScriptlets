var LocationManager = /** @class */ (function () {
    function LocationManager() {
        this.MaxAttempts = 10;
        this.CurrentAttempt = this.MaxAttempts;
        this.EffortWait = 1000;
    }
    LocationManager.prototype.SetHref = function (href, callback, isFromTimeout, effortCount) {
        xyyz.debug.FuncStart(this.SetHref.toString() + ' : ' + href + ' : ' + isFromTimeout + ' : ' + effortCount);
        xyyz.PageData.Opener.Window.location.href = href;
        if (isFromTimeout) {
            effortCount--;
        }
        else {
            effortCount = this.MaxAttempts;
        }
        if (xyyz.PageData.Opener.Window.location.href === href) {
            callback();
        }
        else if (effortCount > 0) {
            setTimeout(function () {
                this.SetHref(href, callback, true, effortCount);
            }, this.EffortWait);
        }
        else {
            xyyz.debug.Log('changing href unsuccessful. Dying');
        }
        xyyz.debug.FuncEnd(this.SetHref.toString());
    };
    LocationManager.prototype.Desktop = function () {
        //xyyz.debug.FuncStart(this.Desktop.name);
        var currentState = xyyz.PageData.CurrentOpenerPageState();
        if (currentState === xyyz.InjectConst.PageType.LoginPage) {
            xyyz.debug.Log('On Login page: ');
            this.AdminB();
            setTimeout(function () {
                xyyz.LocationMan.Desktop();
            }, 1000);
        }
        else if (currentState === xyyz.InjectConst.PageType.Launchpad) {
            this.SetHref(xyyz.InjectConst.Url.Desktop, this.Desktop, null, null);
        }
        else if (currentState === xyyz.InjectConst.PageType.Desktop) {
            xyyz.debug.Log('On Desktop');
            //xyyz.debug.Log('owner: ' + JSON.stringify(ownerWindow));
            //var pat = new RegExp('.*' + ownerWindow.location.hostname);
            //xyyz.debug.Log('pat: ' + pat);
            //var match = ownerWindow.location.href.match(pat);
            //xyyz.debug.Log('match: ' + match);
            //xyyz.PageData.Opener.Window.location.href = xyyz.InjectConst.Url.ShellDefaultAspx;
            xyyz.LocationMan.TriggerRedButton();
        }
        xyyz.debug.FuncEnd(xyyz.LocationMan.Desktop.name);
    };
    LocationManager.prototype.RedButton = function (iteration) {
        xyyz.debug.FuncStart(xyyz.LocationMan.RedButton.name);
        var found = xyyz.PageData.Opener.Document.getElementById('StartButton');
        xyyz.debug.Log('Red Button: ' + found + '  ' + xyyz.PageData.Opener.Window.location.href + ' ' + iteration);
        if (found) {
            found.click();
            xyyz.PageData.Opener.Document.querySelector('.scStartMenuLeftOption').click();
        }
        else {
            iteration = iteration - 1;
            if (iteration > 0) {
                setTimeout(function () {
                    xyyz.LocationMan.RedButton(iteration);
                }, 1500);
            }
        }
    };
    LocationManager.prototype.TriggerRedButton = function () {
        xyyz.debug.FuncStart(xyyz.LocationMan.TriggerRedButton.name);
        setTimeout(function () {
            xyyz.LocationMan.RedButton(10);
        }, 1500);
        xyyz.debug.FuncEnd(xyyz.LocationMan.TriggerRedButton.name);
    };
    LocationManager.prototype.SetScMode = function (newValue) {
        var newValueB = '=' + newValue;
        window.opener.location.href = window.opener.location.href.replace('=normal', newValueB).replace('=preview', newValueB).replace('=edit', newValueB);
    };
    LocationManager.prototype.AdminB = function () {
        //xyyz.debug.FuncStart(this.AdminB.name);
        xyyz.PageData.Opener.Document.getElementById('UserName').setAttribute('value', 'admin');
        xyyz.PageData.Opener.Document.getElementById('Password').setAttribute('value', 'b');
        xyyz.PageData.Opener.Document.getElementById('LogInBtn').click();
        //xyyz.debug.FuncEnd(this.AdminB.name);
    };
    return LocationManager;
}());
//# sourceMappingURL=LocationManager.js.map