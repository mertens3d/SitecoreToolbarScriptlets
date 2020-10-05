import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ScDocumentFacade } from "../../Proxies/ScDocumentFacade";
import { IStateOfScUi } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { iSitecoreUiManager } from "../../../../Shared/scripts/Interfaces/ISitecoreUiManager";
import { _HindeCoreBase } from "../../../../Shared/scripts/LoggableBase";

export class ScUiManager extends _HindeCoreBase implements iSitecoreUiManager {
  __activeWindowSnapShot: IStateOfScUi;
    TopLevelDoc: ScDocumentFacade;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore)
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

  AdminB(scDocumentProxy: ScDocumentFacade, callbackOnComplete: Function) {
    //callbackOnComplete();
    this.Logger.FuncStart(this.AdminB.name, 'targetDoc: ' + Guid.AsShort(scDocumentProxy.DocId));
    this.Logger.Log('callback passed: ' + (callbackOnComplete !== null));

    var userNameElem = scDocumentProxy.getElementById(ContentConst.Const.ElemId.sc.scLoginUserName);
    var passwordElem = scDocumentProxy.getElementById(ContentConst.Const.ElemId.sc.scLoginPassword);

    if (this.Logger.IsNotNullOrUndefinedBool('userNameElem', userNameElem)
      &&
      this.Logger.IsNotNullOrUndefinedBool('passwordElem', passwordElem)) {
      userNameElem.setAttribute('value', ContentConst.Const.Names.scDefaultAdminUserName);
      passwordElem.setAttribute('value', ContentConst.Const.Names.scDefaultAdminPassword);

      var loginButton: HTMLElement = this.GetLoginButton(scDocumentProxy);

      if (this.Logger.IsNotNullOrUndefinedBool('loginButton', loginButton)) {
        this.Logger.Log('clicking loginbutton');
        loginButton.click();

        if (callbackOnComplete) {
          this.Logger.Log('Triggering callback');

          setTimeout(callbackOnComplete, ContentConst.Const.Timeouts.PostLoginBtnClick);
        } else {
          this.Logger.Log('no callback passed');
        }
      }
      else {
        this.ErrorHand.ErrorAndThrow(this.AdminB.name, 'No loginButton');
      }
    }
    else {
      this.ErrorHand.ErrorAndThrow(this.AdminB.name, 'No Username or password field');
    }
    this.Logger.FuncEnd(this.AdminB.name);
  }

  GetLoginButton(targetDoc: ScDocumentFacade): HTMLElement {
    this.Logger.FuncStart(this.GetLoginButton.name);

    var toReturn: HTMLElement = targetDoc.getElementById(ContentConst.Const.ElemId.sc.scLoginBtn.sc920);

    if (!toReturn) {
      toReturn = targetDoc.querySelector(ContentConst.Const.Selector.SC.LoginBtn.sc820);
    }

    this.Logger.Log('toReturn: ' + toReturn);
    this.Logger.FuncEnd(this.GetLoginButton.name);
    return toReturn;
  }
}