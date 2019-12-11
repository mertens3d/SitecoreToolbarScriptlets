class LocationManager extends ManagerBase {
  EffortWait: 1000;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(LocationManager.name);
    this.EffortWait = 1000;
    xyyz.debug.FuncEnd(LocationManager.name);
  }

  SetHref(href, callback, targetWindow: IDataBroswerWindow, effortCount = this.Const().Iterations.MaxSetHrefEffort) {
    this.debug().FuncStart(this.SetHref.name, href + ' : ' + effortCount + ' : has callback? ' + (callback !== null));

    effortCount -= 1

    var isCorrectHref = targetWindow.Window.location.href = href;
    var isReadyState = targetWindow.DataDocSelf.Document.readyState === "complete";

    if (effortCount > 0) {
      if (isCorrectHref && isReadyState) {
        this.debug().Log('triggering callback');
        callback();
      } else {
        if (!isCorrectHref) {
          targetWindow.Window.location.href !== href
        }

        var self = this;
        setTimeout(function () {
        this.debug().Log('setting timeout');
          self.SetHref(href, callback, targetWindow, effortCount);
        }, self.Const().Timeouts.SetHrefEffortWait);
      }
    }
    else {
      this.debug().Log('changing href unsuccessful. Dying');
    }

    this.debug().FuncEnd(this.SetHref.name);
  }
  ChangeLocationSwitchBoard(desiredPageType: WindowType, targetWindow: IDataBroswerWindow, iteration: number = 20) {
    this.debug().FuncStart(this.ChangeLocationSwitchBoard.name, 'desired = ' + WindowType[desiredPageType] + ' iteration: ' + iteration);

    if (iteration > 0) {
      iteration -= 1;

      var currentState = this.PageDataMan().GetCurrentPageType();

      if (currentState === WindowType.LoginPage) {
        var self = this;
        var callbackOnComplete: Function = () => {
          this.debug().Log('callback triggered');
          self.ChangeLocationSwitchBoard(desiredPageType, targetWindow, iteration);
        };

        this.AdminB(targetWindow.DataDocSelf, callbackOnComplete);
        var self = this;

        //setTimeout(function () {
        //  self.Xyyz.LocationMan.ChangeLocation(desiredPageType, targetWindow);
        //}, self.Const().Timeouts.TimeoutChangeLocation);
      }

      else if (currentState === WindowType.Launchpad || currentState === WindowType.ContentEditor || currentState === WindowType.Desktop) {

        var self = this;
        var callBackOnSuccessfulHrefChange: Function = function () {
          self.debug().Log('Callback triggered');
          targetWindow = self.PageDataMan().SetWindowDataToCurrent(targetWindow.Window);

          self.ChangeLocationSwitchBoard(desiredPageType, targetWindow, iteration)
        }

        if (desiredPageType === WindowType.Desktop && currentState !== WindowType.Desktop) {
          this.SetHref(this.Const().Url.Desktop, callBackOnSuccessfulHrefChange, targetWindow);
        }

        else if (desiredPageType === WindowType.ContentEditor && currentState !== WindowType.ContentEditor) {
          this.SetHref(this.Const().Url.ContentEditor, callBackOnSuccessfulHrefChange, targetWindow);
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
    }
    this.debug().FuncEnd(this.Xyyz.LocationMan.ChangeLocationSwitchBoard.name);
  }

  GetBigRedButtonElem(targetDoc: IDataOneDoc) {
    var toReturn: HTMLElement = <HTMLElement>targetDoc.Document.getElementById(this.Const().ElemId.scStartButton.sc920);
    if (!toReturn) {
      toReturn = <HTMLElement>targetDoc.Document.getElementById(this.Const().ElemId.scStartButton.sc820);
    }

    return toReturn;
  }

  RedButton(iteration: number, targetDoc: IDataOneDoc) {
    this.debug().FuncStart(this.RedButton.name, iteration.toString());
    iteration = iteration - 1;

    if (iteration > 0) {
      var found = this.GetBigRedButtonElem(targetDoc);
      if (found) {
        this.debug().Log('clicking it');
        found.click();
        var menuLeft: HTMLElement = targetDoc.Document.querySelector('.scStartMenuLeftOption');
        if (menuLeft) {
          menuLeft.click();
        }
      } else {
        var self = this;
        setTimeout(function () {
          self.Xyyz.LocationMan.RedButton(iteration, targetDoc);
        }, self.Const().Timeouts.TimeoutTriggerRedButton);
      }
    }
    this.debug().FuncEnd(this.RedButton.name);
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

  GetLoginButton(targetDoc: IDataOneDoc): HTMLElement {
    this.debug().FuncStart(this.GetLoginButton.name);

    var toReturn: HTMLElement = targetDoc.Document.getElementById(this.Const().ElemId.scLoginBtn.sc920);

    if (!toReturn) {
      toReturn = targetDoc.Document.querySelector(this.Const().Selector.scLoginBtn.sc820);
    }

    this.debug().Log('toReturn: ' + toReturn);
    this.debug().FuncEnd(this.GetLoginButton.name);
    return toReturn;
  }

  AdminB(targetDoc: IDataOneDoc, callbackOnComplete: Function) {
    //callbackOnComplete();
    this.debug().FuncStart(this.AdminB.name, 'targetDoc: ' + targetDoc.Id.asShort);
    this.debug().Log('callback passed: ' + (callbackOnComplete !== null));

    var userNameElem = targetDoc.Document.getElementById(this.Const().ElemId.scLoginUserName);
    var passwordElem = targetDoc.Document.getElementById(this.Const().ElemId.scLoginPassword);

    this.debug().Log('userNameElem: ' + userNameElem);
    this.debug().Log('passwordElem: ' + passwordElem);
    userNameElem.setAttribute('value', this.Const().Names.scDefaultAdminUserName);
    passwordElem.setAttribute('value', this.Const().Names.scDefaultAdminPassword);

    var loginButton: HTMLElement = this.GetLoginButton(targetDoc);

    if (loginButton) {
      this.debug().Log('clicking');
      loginButton.click();

      if (callbackOnComplete) {
        this.debug().Log('Triggering callback');

        setTimeout(callbackOnComplete, this.Const().Timeouts.PostLoginBtnClick);
      } else {
        this.debug().Log('no callback passed');
      }
    }
    else {
      this.debug().Error(this.AdminB.name, 'No loginButton');
    }
    this.debug().FuncEnd(this.AdminB.name);
  }
  QkID() {
    return this.Const().ElemId;
  }
}