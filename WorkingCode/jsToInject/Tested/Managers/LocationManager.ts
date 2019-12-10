class LocationManager extends ManagerBase {
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

  SetHref(href, callback, isFromTimeout, effortCount, targetWindow: IDataBroswerWindow) {
    this.debug().FuncStart(this.SetHref.name, href + ' : ' + isFromTimeout + ' : ' + effortCount);
    targetWindow.Window.location.href = href;

    if (isFromTimeout) {
      effortCount--;
    }
    else {
      effortCount = this.MaxAttempts;
    }

    if (targetWindow.Window.location.href === href) {
      callback();
    } else if (effortCount > 0) {
      setTimeout(function () {
        this.SetHref(href, callback, true, effortCount);
      }, this.EffortWait);
    }
    else {
      this.debug().Log('changing href unsuccessful. Dying');
    }
    this.debug().FuncEnd(this.SetHref.name);
  }
  ChangeLocation(desiredPageType: WindowType, targetWindow: IDataBroswerWindow) {
    this.debug().FuncStart(this.ChangeLocation.name, 'desired = ' + WindowType[desiredPageType]);

    var currentState = this.PageDataMan().GetCurrentPageType();

    if (currentState === WindowType.LoginPage) {
      this.debug().Log('On Login page: ');
      this.AdminB(targetWindow.DataDocSelf);
      var self = this;
      setTimeout(function () {
        self.Xyyz.LocationMan.ChangeLocation(desiredPageType, targetWindow);
      }, self.Const().Timeouts.TimeoutChangeLocation);
    }

    else if (currentState === WindowType.Launchpad || currentState === WindowType.ContentEditor || currentState === WindowType.Desktop) {
      var callBackFunc: Function = function () { this.ChangeLocation(desiredPageType, targetWindow) }

      if (desiredPageType === WindowType.Desktop && currentState !== WindowType.Desktop) {


        this.SetHref(this.Const().Url.Desktop, callBackFunc, null, null, targetWindow);
      }

      else if (desiredPageType === WindowType.ContentEditor && currentState !== WindowType.ContentEditor) {

        this.SetHref(this.Const().Url.ContentEditor, callBackFunc, null, null, targetWindow);
      }

      else if (currentState === WindowType.Desktop && desiredPageType === WindowType.Desktop) {
        this.debug().Log('On Desktop');
        //   this.debug().Log('owner: ' + JSON.stringify(ownerWindow));

        //var pat = new RegExp('.*' + ownerWindow.location.hostname);
        //   this.debug().Log('pat: ' + pat);
        //var match = ownerWindow.location.href.match(pat);
        //   this.debug().Log('match: ' + match);

        //  this.Xyyz.PageData.WinData.Opener.Window.location.href =   this.Xyyz.InjectConst.Url.ShellDefaultAspx;
        this.Xyyz.LocationMan.TriggerRedButton(targetWindow.DataDocSelf);
      }
    }

    this.debug().FuncEnd(this.Xyyz.LocationMan.ChangeLocation.name);
  }

  RedButton(iteration: number, targetDoc: IDataOneDoc) {
    this.debug().FuncStart(this.Xyyz.LocationMan.RedButton.name + ':' + iteration);

    var found: HTMLElement = <HTMLElement>targetDoc.Document.getElementById(this.Const().ElemId.StartButton.sc920);
    if (!found) {
      found = <HTMLElement>targetDoc.Document.getElementById(this.Const().ElemId.StartButton.sc820);
    }

    this.debug().Log('Red Button: ' + found + '  ' + targetDoc.DataWinParent.Window.location.href + ' ' + iteration);
    if (found) {
      found.click();
      var menuLeft: HTMLElement = targetDoc.Document.querySelector('.scStartMenuLeftOption');
      if (menuLeft) {
        menuLeft.click();
      }
    } else {
      iteration = iteration - 1;

      if (iteration > 0) {
        var self = this;
        setTimeout(function () {
          self.Xyyz.LocationMan.RedButton(iteration, targetDoc);
        }, self.Const().Timeouts.TimeoutTriggerRedButton);
      }
    }
    this.debug().FuncEnd(this.Xyyz.LocationMan.RedButton.name);
  }
  TriggerRedButton(targetDoc: IDataOneDoc) {
    this.debug().FuncStart(this.Xyyz.LocationMan.TriggerRedButton.name);

    var self = this;
    setTimeout(function () {
      self.Xyyz.LocationMan.RedButton(self.Const().Iterations.MaxIterationRedButton, targetDoc);
    }, self.Const().Timeouts.TimeoutTriggerRedButton);
    this.debug().FuncEnd(this.Xyyz.LocationMan.TriggerRedButton.name);
  }

  SetScMode(newValue) {
    var newValueB = '=' + newValue;
    window.opener.location.href = window.opener.location.href.replace('=normal', newValueB).replace('=preview', newValueB).replace('=edit', newValueB);
  }

  AdminB(targetDoc: IDataOneDoc) {
    this.debug().FuncStart(this.AdminB.name);

    var userNameElem = targetDoc.Document.getElementById(this.Const().ElemId.scLoginUserName);
    var passwordElem = targetDoc.Document.getElementById(this.Const().ElemId.scLoginPassword);

    this.debug().Log('userNameElem: ' + userNameElem);
    this.debug().Log('passwordElem: ' + passwordElem);
    userNameElem.setAttribute('value', 'admin');
    passwordElem.setAttribute('value', 'b');

    var candidate: HTMLElement = targetDoc.Document.getElementById(this.QkID().LoginBtn);

    this.debug().Log('candidate: ' + candidate);
    if (candidate) {
      candidate.click();
    } else {
      //window.opener.document.querySelector('input.btn').click()
      candidate = targetDoc.Document.querySelector(this.QkSel().InputBtn2);
      this.debug().Log('candidate: ' + candidate);
      if (candidate) {
        candidate.click();
      }
    }

    this.debug().FuncEnd(this.AdminB.name);
  }
  QkSel() {
    return this.Const().Selector;
  }
  QkID() {
    return this.Const().ElemId;
  }
}