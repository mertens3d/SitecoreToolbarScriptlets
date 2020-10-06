import { DocumentJacket } from "../../../../DOMJacket/DocumentJacket";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateOfScUi } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { iSitecoreUiManager } from "../../../../Shared/scripts/Interfaces/ISitecoreUiManager";
import { _HindeCoreBase } from "../../../../Shared/scripts/LoggableBase";
import { ElementJacket } from "../../../../DOMJacket/ElementJacket";

export class ScUiManager extends _HindeCoreBase implements iSitecoreUiManager {
  __activeWindowSnapShot: IStateOfScUi;
  TopLevelDoc: DocumentJacket;

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

  AdminB(documentJacket: DocumentJacket, callbackOnComplete: Function) {
    //callbackOnComplete();
    this.Logger.FuncStart(this.AdminB.name, 'targetDoc: ' + Guid.AsShort(documentJacket.DocId));
    this.Logger.Log('callback passed: ' + (callbackOnComplete !== null));

    let userNameElem: ElementJacket = documentJacket.GetElementById(ContentConst.Const.ElemId.SC.scLoginUserName);
    let passwordElem: ElementJacket = documentJacket.GetElementById(ContentConst.Const.ElemId.SC.scLoginPassword);

    if (this.Logger.IsNotNullOrUndefinedBool('userNameElem', userNameElem)
      &&
      this.Logger.IsNotNullOrUndefinedBool('passwordElem', passwordElem)) {
      userNameElem.NativeElement.setAttribute('value', ContentConst.Const.Names.scDefaultAdminUserName);
      passwordElem.NativeElement.setAttribute('value', ContentConst.Const.Names.scDefaultAdminPassword);

      var loginButton: ElementJacket = this.GetLoginButton(documentJacket);

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
        this.ErrorHand.ErrorAndThrow(this.AdminB.name, 'No loginButton');
      }
    }
    else {
      this.ErrorHand.ErrorAndThrow(this.AdminB.name, 'No Username or password field');
    }
    this.Logger.FuncEnd(this.AdminB.name);
  }

  GetLoginButton(documentJacket: DocumentJacket): ElementJacket {
    this.Logger.FuncStart(this.GetLoginButton.name);

    var toReturn: ElementJacket = documentJacket.GetElementById(ContentConst.Const.ElemId.SC.scLoginBtn.sc920);

    if (!toReturn) {
      toReturn = documentJacket.QuerySelector(ContentConst.Const.Selector.SC.LoginBtn.sc820);
    }

    this.Logger.Log('toReturn: ' + toReturn);
    this.Logger.FuncEnd(this.GetLoginButton.name);
    return toReturn;
  }
}