import { IDataOneWindowStorage } from '../../../Shared/Scripts/Interfaces/IDataOneWindowStorage'
import { iSitecoreUiManager } from '../../../Shared/scripts/Interfaces/ISitecoreUiManager';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { ContentHub } from './ContentHub';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';

export class SitecoreUiManager extends ContentManagerBase implements iSitecoreUiManager {
  GetCurrentPageType(): scWindowType {
    return this.Helpers().UtilityHelp.CalcPageTypeFromHref(document.location.href);
  }

  __activeWindowSnapShot: IDataOneWindowStorage;

  private topDoc: IDataOneDoc;

  TopLevelDoc(): IDataOneDoc {
    if (!this.topDoc) {
      this.topDoc = {
        ParentDoc: null,
        Document: window.document,
        HasParentDesktop: false,
        DocId: this.Helpers().GuidHelp.NewGuid(),
        ParentDesktop: null,
        Nickname: 'top doc'
      }
    }
    return this.topDoc;
  }

  AdminB(targetDoc: IDataOneDoc, callbackOnComplete: Function) {
    //callbackOnComplete();
    this.debug().FuncStart(this.AdminB.name, 'targetDoc: ' + targetDoc.DocId.AsShort);
    this.debug().Log('callback passed: ' + (callbackOnComplete !== null));

    var userNameElem = targetDoc.Document.getElementById(ContentConst.Const.ElemId.sc.scLoginUserName);
    var passwordElem = targetDoc.Document.getElementById(ContentConst.Const.ElemId.sc.scLoginPassword);

    if (this.debug().IsNotNullOrUndefinedBool('userNameElem', userNameElem)
      &&
      this.debug().IsNotNullOrUndefinedBool('passwordElem', passwordElem)) {
      userNameElem.setAttribute('value', ContentConst.Const.Names.scDefaultAdminUserName);
      passwordElem.setAttribute('value', ContentConst.Const.Names.scDefaultAdminPassword);

      var loginButton: HTMLElement = this.GetLoginButton(targetDoc);

      if (this.debug().IsNotNullOrUndefinedBool('loginButton', loginButton)) {
        this.debug().Log('clicking');
        loginButton.click();

        if (callbackOnComplete) {
          this.debug().Log('Triggering callback');

          setTimeout(callbackOnComplete, ContentConst.Const.Timeouts.PostLoginBtnClick);
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

    var toReturn: HTMLElement = targetDoc.Document.getElementById(ContentConst.Const.ElemId.sc.scLoginBtn.sc920);

    if (!toReturn) {
      toReturn = targetDoc.Document.querySelector(ContentConst.Const.Selector.SC.LoginBtn.sc820);
    }

    this.debug().Log('toReturn: ' + toReturn);
    this.debug().FuncEnd(this.GetLoginButton.name);
    return toReturn;
  }
}