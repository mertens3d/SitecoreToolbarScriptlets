﻿import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { IJacketOfType } from "../../../../Shared/scripts/IJacketOfType";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { iSitecoreUiManager } from "../../../../Shared/scripts/Interfaces/ISitecoreUiManager";
import { IStateOfScUi } from "../../../../Shared/scripts/Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { ContentBrowserProxy } from "../../../../ContentTop/scripts/Proxies/ContentBrowserProxy";

export class ScUiManager extends _APICoreBase implements iSitecoreUiManager {
  __activeWindowSnapShot: IStateOfScUi;
  TopLevelDoc: DocumentJacket;

  constructor(apiCore: IAPICore) {
    super(apiCore)
  }

  async InitSitecoreUiManager() {
    this.Logger.FuncStart(this.InitSitecoreUiManager.name);
    try {
      this.InjectCss();
    } catch (err: any) {
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



    let contentBrowserProxy: ContentBrowserProxy = new ContentBrowserProxy(this.ApiCore);

    const style = document.createElement('link');
    style.type = 'text/css';
    style.href = contentBrowserProxy.ExtensionGetUrl('AutoBuild/final/content.min.css'); 
    style.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(style);
  }

  AdminB(documentJacket: DocumentJacket, callbackOnComplete: Function) {
    //callbackOnComplete();
    this.Logger.FuncStart(this.AdminB.name, 'targetDoc: ' + Guid.AsShort(documentJacket.DocId));
    this.Logger.Log('callback passed: ' + (callbackOnComplete !== null));

    let userNameElem: IJacketOfType = documentJacket.GetElementById(ContentConst.Const.ElemId.SC.scLoginUserName);
    let passwordElem: IJacketOfType = documentJacket.GetElementById(ContentConst.Const.ElemId.SC.scLoginPassword);

    if (this.Logger.IsNotNullOrUndefinedBool('userNameElem', userNameElem)
      &&
      this.Logger.IsNotNullOrUndefinedBool('passwordElem', passwordElem)) {
      userNameElem.NativeElement.setAttribute('value', ContentConst.Const.Names.scDefaultAdminUserName);
      passwordElem.NativeElement.setAttribute('value', ContentConst.Const.Names.scDefaultAdminPassword);

      var loginButton: IJacketOfType = this.GetLoginButton(documentJacket);

      if (this.Logger.IsNotNullOrUndefinedBool('loginButton', loginButton)) {
        this.Logger.Log('clicking loginbutton');
        loginButton.NativeElement.click();

        if (callbackOnComplete) {
          this.Logger.Log('Triggering callback');

          setTimeout(callbackOnComplete, ContentConst.Const.Timeouts.PostLoginBtnClick);
        } else {
          this.Logger.Log('no callback passed');
        }
      }
      else {
        this.ErrorHand.HandleFatalError(this.AdminB.name, 'No loginButton');
      }
    }
    else {
      this.ErrorHand.HandleFatalError(this.AdminB.name, 'No Username or password field');
    }
    this.Logger.FuncEnd(this.AdminB.name);
  }

  GetLoginButton(documentJacket: DocumentJacket): IJacketOfType {
    this.Logger.FuncStart(this.GetLoginButton.name);

    var toReturn: IJacketOfType = documentJacket.GetElementById(ContentConst.Const.ElemId.SC.scLoginBtn.sc920);

    if (!toReturn) {
      toReturn = documentJacket.QuerySelector(ContentConst.Const.Selector.SC.LoginBtn.sc820);
    }

    this.Logger.Log('toReturn: ' + toReturn);
    this.Logger.FuncEnd(this.GetLoginButton.name);
    return toReturn;
  }
}