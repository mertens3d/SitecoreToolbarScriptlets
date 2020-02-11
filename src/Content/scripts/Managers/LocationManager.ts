import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IDataBrowserWindow } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataOneTreeNode } from '../../../Shared/scripts/Interfaces/IDataOneTreeNode';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { IsScMode } from '../../../Shared/scripts/Interfaces/IscMode';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';

export class LocationManager extends ContentManagerBase {
  constructor(xyyz: ContentHub) {
    super(xyyz);
    xyyz.debug.FuncStart(LocationManager.name);
    xyyz.debug.FuncEnd(LocationManager.name);
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
          this.PromiseGen().SetHrefAndWaitForReadyStateComplete(this.Const().UrlSuffix.Desktop, targetWindow, desiredPageType)
            //.then(() => this.MsgMan().wa)
            .then(() => callBackOnSuccessfulHrefChange);
        }

        else if (desiredPageType === scWindowType.ContentEditor && currentState !== scWindowType.ContentEditor) {
          this.PromiseGen().SetHrefAndWaitForReadyStateComplete(this.Const().UrlSuffix.CE, targetWindow, desiredPageType)
            .then(() => callbackOnComplete);
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
      this.debug().FuncStart(this.SetScMode.name, newValue.AsString);

      var itemGuid: IGuid;
      var targetWindow: IDataBrowserWindow;

      var currentPageType = this.PageDataMan().GetCurrentPageType();

      if (currentPageType === scWindowType.ContentEditor
        ||
        currentPageType === scWindowType.Desktop
      ) {
        var dataOneDoc: IDataOneDoc = null;

        if (currentPageType == scWindowType.Desktop) {
          var currentIframe = this.DesktopMan().GetActiveDesktopIframeData();
          if (currentIframe) {
            dataOneDoc = currentIframe.ContentDoc;
          }
        }
        else {
          dataOneDoc = this.PageDataMan().TopLevelWindow().DataDocSelf;
        }

        if (dataOneDoc) {
          var AllTreeNodeAr: IDataOneTreeNode[] = this.ContentHub.OneTreeMan.GetOneLiveTreeData(dataOneDoc);

          for (var idx = 0; idx < AllTreeNodeAr.length; idx++) {
            var candidate: IDataOneTreeNode = AllTreeNodeAr[idx];
            if (candidate.IsActive) {
              itemGuid = candidate.NodeId;
              break;
            }
          }
          await alert(itemGuid.AsString);
          // we should use the sitecore buttons

          if (itemGuid) {
            targetWindow = await this.PageDataMan().GetTargetWindowAsync(useOrigWindow, scWindowType.Edit);
          }
        }
      } else if (currentPageType == scWindowType.Edit
        || currentPageType == scWindowType.Normal
        || currentPageType == scWindowType.Preview) {
        if (targetWindow) {
          window.opener.location.href = window.opener.location.href.replace('=normal', newValue.AsString).replace('=preview', newValue.AsString).replace('=edit', newValue.AsString);
        }
      }
      this.debug().FuncEnd(this.SetScMode.name);
    });
  }

  GetCurrentUrl(targ) {
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
    this.debug().FuncStart(this.AdminB.name, 'targetDoc: ' + targetDoc.DocId.AsShort);
    this.debug().Log('callback passed: ' + (callbackOnComplete !== null));

    var userNameElem = targetDoc.Document.getElementById(this.Const().ElemId.sc.scLoginUserName);
    var passwordElem = targetDoc.Document.getElementById(this.Const().ElemId.sc.scLoginPassword);

    if (this.debug().IsNotNullOrUndefinedBool('userNameElem', userNameElem)
      &&
      this.debug().IsNotNullOrUndefinedBool('passwordElem', passwordElem)) {
      userNameElem.setAttribute('value', this.Const().Names.scDefaultAdminUserName);
      passwordElem.setAttribute('value', this.Const().Names.scDefaultAdminPassword);

      var loginButton: HTMLElement = this.GetLoginButton(targetDoc);

      if (this.debug().IsNotNullOrUndefinedBool('loginButton', loginButton)) {
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
    }
    else {
      this.debug().Error(this.AdminB.name, 'No Username or password field');
    }
    this.debug().FuncEnd(this.AdminB.name);
  }
}