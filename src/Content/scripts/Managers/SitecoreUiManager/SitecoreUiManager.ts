import { ScUrlAgent } from "../../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { scWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IDataOneDoc } from "../../../../Shared/scripts/Interfaces/IDataOneDoc";
import { IDataOneWindowStorage } from "../../../../Shared/scripts/Interfaces/IDataOneWindowStorage";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { iSitecoreUiManager } from "../../../../Shared/scripts/Interfaces/ISitecoreUiManager";
import { LoggableBase } from "../LoggableBase";

export class SitecoreUiManager extends LoggableBase implements iSitecoreUiManager {
  ScUrlAgent: ScUrlAgent;

  constructor(logger: ILoggerAgent) {
    super(logger)
    this.ScUrlAgent = new ScUrlAgent(this.Logger);
  }

  async InitSitecoreUiManager() {
    this.Logger.FuncStart(this.InitSitecoreUiManager.name);
    await this.ScUrlAgent.InitScUrlAgent();
    this.Logger.FuncEnd(this.InitSitecoreUiManager.name);
  }

  GetCurrentPageType(): scWindowType {
    return this.ScUrlAgent.GetScWindowType()
  }

  __activeWindowSnapShot: IDataOneWindowStorage;

  private topDoc: IDataOneDoc;

  TopLevelDoc(): IDataOneDoc {
    if (!this.topDoc) {
      this.topDoc = {
        //ParentDoc: null,
        ContentDoc: window.document,
        DocId: Guid.NewRandomGuid(),
        Nickname: 'top doc'
      }
    }
    return this.topDoc;
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