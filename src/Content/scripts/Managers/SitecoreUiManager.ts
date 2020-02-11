import { IDataOneWindowStorage } from '../../../Shared/Scripts/Interfaces/IDataOneWindowStorage'
import { iSitecoreUiManager } from '../../../Shared/scripts/Interfaces/ISitecoreUiManager';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { ContentHub } from './ContentHub';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataBrowserWindow } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';

export class SitecoreUiManager extends ContentManagerBase implements iSitecoreUiManager {


  GetCurrentPageType(): scWindowType {
    throw new Error("Method not implemented.");
  }
  __activeWindowSnapShot: IDataOneWindowStorage;

  private __winDataParent: IDataBrowserWindow;

  

  TopLevelWindow(): IDataBrowserWindow {
    return this.__winDataParent;
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
}