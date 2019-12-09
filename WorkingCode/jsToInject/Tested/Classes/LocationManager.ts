class LocationManager extends SpokeBase {
  EffortWait: 1000;
  MaxAttempts: number;
  CurrentAttempt: number;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(LocationManager.name);
    this.MaxAttempts = 10;
    this.CurrentAttempt = this.MaxAttempts;
    this.EffortWait = 1000;
    xyyz.debug.FuncEnd(LocationManager.name);
  }

  SetHref(href, callback, isFromTimeout, effortCount) {
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
    } else if (effortCount > 0) {
      setTimeout(function () {
        this.SetHref(href, callback, true, effortCount);
      }, this.EffortWait);
    }
    else {
      this.Xyyz.debug.Log('changing href unsuccessful. Dying');
    }
    this.Xyyz.debug.FuncEnd(this.SetHref.name);
  }
  ChangeLocation(desiredPageType: PageType) {
    this.Xyyz.debug.FuncStart(this.ChangeLocation .name);

    var currentState = this.Xyyz.PageData.CurrentOpenerPageState();

    if (currentState === PageType.LoginPage) {
      this.Xyyz.debug.Log('On Login page: ');
      this.AdminB();
      var self = this;
      setTimeout(function () {
        self.Xyyz.LocationMan.ChangeLocation(desiredPageType);
      }, 1000);
    }

    else if (currentState === PageType.Launchpad) {

      if (desiredPageType === PageType.Desktop) {
        this.SetHref(this.Xyyz.InjectConst.Url.Desktop, function () { this.ChangeLocation(desiredPageType) }, null, null);

      } else if (desiredPageType === PageType.ContentEditor) {

        this.SetHref(this.Xyyz.InjectConst.Url.ContentEditor, function () { this.ChangeLocation(desiredPageType) }, null, null);
      }
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

    this.Xyyz.debug.FuncEnd(this.Xyyz.LocationMan.ChangeLocation.name);
  }

  RedButton(iteration) {
    this.Xyyz.debug.FuncStart(this.Xyyz.LocationMan.RedButton.name + ':' + iteration);
    var found: HTMLElement = <HTMLElement>this.Xyyz.PageData.WinData.Opener.Document.getElementById('StartButton');
    this.Xyyz.debug.Log('Red Button: ' + found + '  ' + this.Xyyz.PageData.WinData.Opener.Window.location.href + ' ' + iteration);
    if (found) {
      found.click();
      var menuLeft: HTMLElement = this.Xyyz.PageData.WinData.Opener.Document.querySelector('.scStartMenuLeftOption');
      if (menuLeft) {
        menuLeft.click();
      }
    } else {
      iteration = iteration - 1;

      if (iteration > 0) {
        var self = this;
        setTimeout(function () {
          self.Xyyz.LocationMan.RedButton(iteration);
        }, 1500);
      }
    }
    this.Xyyz.debug.FuncEnd(this.Xyyz.LocationMan.RedButton.name);
  }
  TriggerRedButton() {
    this.Xyyz.debug.FuncStart(this.Xyyz.LocationMan.TriggerRedButton.name);

    var self = this;
    setTimeout(function () {
      self.Xyyz.LocationMan.RedButton(10);
    }, 1500);
    this.Xyyz.debug.FuncEnd(this.Xyyz.LocationMan.TriggerRedButton.name);
  }

  SetScMode(newValue) {
    var newValueB = '=' + newValue;
    window.opener.location.href = window.opener.location.href.replace('=normal', newValueB).replace('=preview', newValueB).replace('=edit', newValueB);
  }

  AdminB() {
    this.Xyyz.debug.FuncStart(this.AdminB.name);

    var userNameElem = this.Xyyz.PageData.WinData.Opener.Document.getElementById('UserName');
    var passwordElem = this.Xyyz.PageData.WinData.Opener.Document.getElementById('Password');

    this.Xyyz.debug.Log('userNameElem: ' + userNameElem);
    this.Xyyz.debug.Log('passwordElem: ' + passwordElem);
    userNameElem.setAttribute('value', 'admin');
    passwordElem.setAttribute('value', 'b');



    var candidate = this.Xyyz.PageData.WinData.Opener.Document.getElementById('LogInBtn');

    this.Xyyz.debug.Log('candidate: ' + candidate );
    if (candidate) {
      candidate.click();
    } else {
      //window.opener.document.querySelector('input.btn').click()
      var candidate = this.Xyyz.PageData.WinData.Opener.Document.querySelector('input.btn');
    this.Xyyz.debug.Log('candidate: ' + candidate );
      if (candidate) {
        candidate.click();
      }
    }

    this.Xyyz.debug.FuncEnd(this.AdminB.name);
  }
}