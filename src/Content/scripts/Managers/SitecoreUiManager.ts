import { IDataOneWindowStorage } from '../../../Shared/Scripts/Interfaces/IDataOneWindowStorage'
import { iSitecoreUiManager } from '../../../Shared/scripts/Interfaces/ISitecoreUiManager';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';

export class SitecoreUiManager extends ContentManagerBase implements iSitecoreUiManager {

  GetCurrentPageType(): scWindowType {

    return this.Helpers().UrlHelp.CalcPageTypeFromHref({ AbsUrl: document.location.href });
  }

  __activeWindowSnapShot: IDataOneWindowStorage;

  private topDoc: IDataOneDoc;

  TopLevelDoc(): IDataOneDoc {
    if (!this.topDoc) {
      this.topDoc = {
        //ParentDoc: null,
        ContentDoc: window.document,
        DocId: this.Helpers().GuidHelp.NewGuid(),
        Nickname: 'top doc'
      }
    }
    return this.topDoc;
  }

  AdminB(targetDoc: IDataOneDoc, callbackOnComplete: Function) {
    //callbackOnComplete();
    this.Log().FuncStart(this.AdminB.name, 'targetDoc: ' + targetDoc.DocId.AsShort);
    this.Log().Log('callback passed: ' + (callbackOnComplete !== null));

    var userNameElem = targetDoc.ContentDoc.getElementById(ContentConst.Const.ElemId.sc.scLoginUserName);
    var passwordElem = targetDoc.ContentDoc.getElementById(ContentConst.Const.ElemId.sc.scLoginPassword);

    if (this.Log().IsNotNullOrUndefinedBool('userNameElem', userNameElem)
      &&
      this.Log().IsNotNullOrUndefinedBool('passwordElem', passwordElem)) {
      userNameElem.setAttribute('value', ContentConst.Const.Names.scDefaultAdminUserName);
      passwordElem.setAttribute('value', ContentConst.Const.Names.scDefaultAdminPassword);

      var loginButton: HTMLElement = this.GetLoginButton(targetDoc);

      if (this.Log().IsNotNullOrUndefinedBool('loginButton', loginButton)) {
        this.Log().Log('clicking');
        loginButton.click();

        if (callbackOnComplete) {
          this.Log().Log('Triggering callback');

          setTimeout(callbackOnComplete, ContentConst.Const.Timeouts.PostLoginBtnClick);
        } else {
          this.Log().Log('no callback passed');
        }
      }
      else {
        this.Log().Error(this.AdminB.name, 'No loginButton');
      }
    }
    else {
      this.Log().Error(this.AdminB.name, 'No Username or password field');
    }
    this.Log().FuncEnd(this.AdminB.name);
  }
  GetLoginButton(targetDoc: IDataOneDoc): HTMLElement {
    this.Log().FuncStart(this.GetLoginButton.name);

    var toReturn: HTMLElement = targetDoc.ContentDoc.getElementById(ContentConst.Const.ElemId.sc.scLoginBtn.sc920);

    if (!toReturn) {
      toReturn = targetDoc.ContentDoc.querySelector(ContentConst.Const.Selector.SC.LoginBtn.sc820);
    }

    this.Log().Log('toReturn: ' + toReturn);
    this.Log().FuncEnd(this.GetLoginButton.name);
    return toReturn;
  }
}