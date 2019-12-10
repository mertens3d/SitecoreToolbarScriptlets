class LocationManager extends ManagerBase {
  EffortWait: 1000;
  MaxAttempts: number;
  CurrentAttempt: number;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStartName(LocationManager.name);
    this.MaxAttempts = 10;
    this.CurrentAttempt = this.MaxAttempts;
    this.EffortWait = 1000;
    xyyz.debug.FuncEndName(LocationManager.name);
  }

  SetHref(href, callback, isFromTimeout, effortCount) {
    this.Xyyz.debug.FuncStartName(this.SetHref.toString() + ' : ' + href + ' : ' + isFromTimeout + ' : ' + effortCount);
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
    this.Xyyz.debug.FuncEndName(this.SetHref.name);
  }
  ChangeLocation(desiredPageType: PageType) {
    this.Xyyz.debug.FuncStartName(this.ChangeLocation.name);

    var currentState = this.Xyyz.PageData.GetCurrentPageType();

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
        this.SetHref(this.Xyyz.Const.Url.Desktop, function () { this.ChangeLocation(desiredPageType) }, null, null);
      } else if (desiredPageType === PageType.ContentEditor) {
        this.SetHref(this.Xyyz.Const.Url.ContentEditor, function () { this.ChangeLocation(desiredPageType) }, null, null);
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

    this.Xyyz.debug.FuncEndName(this.Xyyz.LocationMan.ChangeLocation.name);
  }

  RedButton(iteration) {
    this.Xyyz.debug.FuncStartName(this.Xyyz.LocationMan.RedButton.name + ':' + iteration);
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
    this.Xyyz.debug.FuncEndName(this.Xyyz.LocationMan.RedButton.name);
  }
  TriggerRedButton() {
    this.Xyyz.debug.FuncStartName(this.Xyyz.LocationMan.TriggerRedButton.name);

    var self = this;
    setTimeout(function () {
      self.Xyyz.LocationMan.RedButton(10);
    }, 1500);
    this.Xyyz.debug.FuncEndName(this.Xyyz.LocationMan.TriggerRedButton.name);
  }

  SetScMode(newValue) {
    var newValueB = '=' + newValue;
    window.opener.location.href = window.opener.location.href.replace('=normal', newValueB).replace('=preview', newValueB).replace('=edit', newValueB);
  }

  AdminB() {
    this.Xyyz.debug.FuncStartName(this.AdminB.name);

    var userNameElem = this.Xyyz.PageData.WinData.Opener.Document.getElementById(this.Const().ElemId.scLoginUserName);
    var passwordElem = this.Xyyz.PageData.WinData.Opener.Document.getElementById(this.Const().ElemId.scLoginPassword);

    this.Xyyz.debug.Log('userNameElem: ' + userNameElem);
    this.Xyyz.debug.Log('passwordElem: ' + passwordElem);
    userNameElem.setAttribute('value', 'admin');
    passwordElem.setAttribute('value', 'b');

    var candidate: HTMLElement = this.Xyyz.PageData.WinData.Opener.Document.getElementById(this.QkID().LoginBtn);

    this.Xyyz.debug.Log('candidate: ' + candidate);
    if (candidate) {
      candidate.click();
    } else {
      //window.opener.document.querySelector('input.btn').click()
      candidate = this.Xyyz.PageData.WinData.Opener.Document.querySelector(this.QkSel().InputBtn2);
      this.Xyyz.debug.Log('candidate: ' + candidate);
      if (candidate) {
        candidate.click();
      }
    }

    this.Xyyz.debug.FuncEndName(this.AdminB.name);
  }
  QkSel() {
    return this.Xyyz.Const.Selector;
  }
  QkID() {
    return this.Xyyz.Const.ElemId;
  }
}