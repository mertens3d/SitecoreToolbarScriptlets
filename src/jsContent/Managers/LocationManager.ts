import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { scWindowType } from '../Enums/scWindowType';
import { IDataBrowserWindow } from '../Interfaces/IDataBrowserWindow';
import { IDataOneDoc } from '../Interfaces/IDataOneDoc';
import { IDataOneTreeNode } from '../../JsShared/Classes/IDataOneTreeNode';
import { IsScMode } from '../Interfaces/IscMode';
import { IGuid } from '../../JsShared/Interfaces/IGuid';

export class LocationManager extends ContentManagerBase {
  constructor(xyyz: ContentHub) {
    super(xyyz);
    xyyz.debug.FuncStart(LocationManager.name);
    xyyz.debug.FuncEnd(LocationManager.name);
  }

  SetHref(href, callback, targetWindow: IDataBrowserWindow, effortCount = this.Const().Iterations.MaxSetHrefEffort) {
    this.debug().FuncStart(this.SetHref.name, href + ' : ' + effortCount + ' : has callback? ' + (callback !== null));

    effortCount -= 1

    var isCorrectHref = targetWindow.Window.location.href = href;
    var isReadyState = targetWindow.DataDocSelf.Document.readyState === 'complete';

    if (effortCount > 0) {
      if (isCorrectHref && isReadyState) {
        this.debug().Log(this.SetHref.name, 'triggering callback');
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

  ChangeLocationSwitchBoard(desiredPageType: scWindowType, targetWindow: IDataBrowserWindow, iteration: number = this.Const().Iterations.MaxIterationSwitchBoard) {
    this.debug().FuncStart(this.ChangeLocationSwitchBoard.name, 'desired = ' + scWindowType[desiredPageType] + ' iteration: ' + iteration + ':' + this.Const().Iterations.MaxIterationSwitchBoard);

    if (iteration > 0) {
      iteration -= 1;

      var currentState = this.PageDataMan().GetCurrentPageType();

      if (currentState === scWindowType.LoginPage) {
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

      else if (currentState === scWindowType.Launchpad || currentState === scWindowType.ContentEditor || currentState === scWindowType.Desktop) {
        var self = this;
        var callBackOnSuccessfulHrefChange: Function = function () {
          self.debug().Log('Callback triggered');
          targetWindow = self.PageDataMan().SetWindowDataToCurrent(targetWindow.Window, targetWindow.DataDocSelf.Nickname);

          self.ChangeLocationSwitchBoard(desiredPageType, targetWindow, iteration)
        }

        if (desiredPageType === scWindowType.Desktop && currentState !== scWindowType.Desktop) {
          this.SetHref(this.Const().UrlSuffix.Desktop, callBackOnSuccessfulHrefChange, targetWindow);
        }

        else if (desiredPageType === scWindowType.ContentEditor && currentState !== scWindowType.ContentEditor) {
          this.SetHref(this.Const().UrlSuffix.CE, callBackOnSuccessfulHrefChange, targetWindow);
        }

        else if (currentState === scWindowType.Desktop && desiredPageType === scWindowType.Desktop) {
          this.debug().Log('On Desktop');

          //todo this.DesktopMan().TriggerRedButton(targetWindow.DataDocSelf);
        }
      }
    }
    this.debug().FuncEnd(this.ChangeLocationSwitchBoard.name);
  }

  SetScMode(newValue: IsScMode, useOrigWindow: boolean) {
    return new Promise(async () => {
      this.debug().FuncStart(this.SetScMode.name, newValue.asString);

      var itemGuid: IGuid;
      var targetWindow: IDataBrowserWindow;

      var currentPageType = this.PageDataMan().GetCurrentPageType();

      if (currentPageType === scWindowType.ContentEditor
        ||
        currentPageType === scWindowType.Desktop
      ) {
        var dataOneDoc = this.PageDataMan().TopLevelWindow().DataDocSelf;

        var AllTreeNodeAr: IDataOneTreeNode[] = this.Xyyz.OneTreeMan.GetOneLiveTreeData(dataOneDoc);

        for (var idx = 0; idx < AllTreeNodeAr.length; idx++) {
          var candidate: IDataOneTreeNode = AllTreeNodeAr[idx];
          if (candidate.IsActive) {
            itemGuid = candidate.NodeId;
            break;
          }
        }
        await alert(itemGuid.asString);
        // we should use the sitecore buttons

        if (itemGuid) {
          targetWindow = await this.PageDataMan().GetTargetWindowAsync(useOrigWindow, scWindowType.Edit);
        }
      } else if (currentPageType == scWindowType.Edit
        || currentPageType == scWindowType.Normal
        || currentPageType == scWindowType.Preview) {


        if (targetWindow) {
          window.opener.location.href = window.opener.location.href.replace('=normal', newValue.asString).replace('=preview', newValue.asString).replace('=edit', newValue.asString);
        }
      }
      this.debug().FuncEnd(this.SetScMode.name);
    });
  }

  GetLoginButton(targetDoc: IDataOneDoc): HTMLElement {
    this.debug().FuncStart(this.GetLoginButton.name);

    var toReturn: HTMLElement = targetDoc.Document.getElementById(this.Const().ElemId.sc.scLoginBtn.sc920);

    if (!toReturn) {
      toReturn = targetDoc.Document.querySelector(this.Const().Selector.SC.LoginBtn.sc820);
    }

    this.debug().Log('toReturn: ' + toReturn);
    this.debug().FuncEnd(this.GetLoginButton.name);
    return toReturn;
  }

  AdminB(targetDoc: IDataOneDoc, callbackOnComplete: Function) {
    //callbackOnComplete();
    this.debug().FuncStart(this.AdminB.name, 'targetDoc: ' + targetDoc.XyyzId.asShort);
    this.debug().Log('callback passed: ' + (callbackOnComplete !== null));

    var userNameElem = targetDoc.Document.getElementById(this.Const().ElemId.sc.scLoginUserName);
    var passwordElem = targetDoc.Document.getElementById(this.Const().ElemId.sc.scLoginPassword);

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