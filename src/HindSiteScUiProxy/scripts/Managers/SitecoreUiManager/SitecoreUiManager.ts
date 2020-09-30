import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IStateOfScUiProxy } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { iSitecoreUiManager } from "../../../../Shared/scripts/Interfaces/ISitecoreUiManager";
import { LoggableBase } from "../../../../Shared/scripts/LoggableBase";

export class ScUiManager extends LoggableBase implements iSitecoreUiManager {
  __activeWindowSnapShot: IStateOfScUiProxy;
    TopLevelDoc: IDataOneDoc;

  constructor(logger: ILoggerAgent) {
    super(logger)
  }

  async InitSitecoreUiManager() {
    this.Logger.FuncStart(this.InitSitecoreUiManager.name);
    try {
      this.InjectCss();
    } catch (err) {
      throw (err);
    }
    this.Logger.FuncEnd(this.InitSitecoreUiManager.name);
  }

  InjectCss(): void {
    //let tabs = browser.tabs;
    //let targetTab: browser.tabs.Tab = tabs[0];

    //let targetTab = this.man
    //browser.tabs.insertCSS( {
    //  file: 'AutoBuild/final/content.min.css'
    //});

    const style = document.createElement('link');
    style.type = 'text/css';
    style.href = browser.extension.getURL('AutoBuild/final/content.min.css');
    style.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(style);
  }

  AdminB(targetDoc: IDataOneDoc, callbackOnComplete: Function) {
    //callbackOnComplete();
    this.Logger.FuncStart(this.AdminB.name, 'targetDoc: ' + Guid.AsShort(targetDoc.DocId));
    this.Logger.Log('callback passed: ' + (callbackOnComplete !== null));

    var userNameElem = targetDoc.ContentDoc.getElementById(ContentConst.Const.ElemId.sc.scLoginUserName);
    var passwordElem = targetDoc.ContentDoc.getElementById(ContentConst.Const.ElemId.sc.scLoginPassword);

    if (this.Logger.IsNotNullOrUndefinedBool('userNameElem', userNameElem)
      &&
      this.Logger.IsNotNullOrUndefinedBool('passwordElem', passwordElem)) {
      userNameElem.setAttribute('value', ContentConst.Const.Names.scDefaultAdminUserName);
      passwordElem.setAttribute('value', ContentConst.Const.Names.scDefaultAdminPassword);

      var loginButton: HTMLElement = this.GetLoginButton(targetDoc);

      if (this.Logger.IsNotNullOrUndefinedBool('loginButton', loginButton)) {
        this.Logger.Log('clicking');
        loginButton.click();

        if (callbackOnComplete) {
          this.Logger.Log('Triggering callback');

          setTimeout(callbackOnComplete, ContentConst.Const.Timeouts.PostLoginBtnClick);
        } else {
          this.Logger.Log('no callback passed');
        }
      }
      else {
        this.Logger.ErrorAndThrow(this.AdminB.name, 'No loginButton');
      }
    }
    else {
      this.Logger.ErrorAndThrow(this.AdminB.name, 'No Username or password field');
    }
    this.Logger.FuncEnd(this.AdminB.name);
  }

  GetLoginButton(targetDoc: IDataOneDoc): HTMLElement {
    this.Logger.FuncStart(this.GetLoginButton.name);

    var toReturn: HTMLElement = targetDoc.ContentDoc.getElementById(ContentConst.Const.ElemId.sc.scLoginBtn.sc920);

    if (!toReturn) {
      toReturn = targetDoc.ContentDoc.querySelector(ContentConst.Const.Selector.SC.LoginBtn.sc820);
    }

    this.Logger.Log('toReturn: ' + toReturn);
    this.Logger.FuncEnd(this.GetLoginButton.name);
    return toReturn;
  }
}