import { ScUrlAgent } from "../../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { scWindowType } from "../../../../Shared/scripts/Enums/scWindowType";
import { IAllAgents } from "../../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { IDataOneDoc } from "../../../../Shared/scripts/Interfaces/IDataOneDoc";
import { IDataOneWindowStorage } from "../../../../Shared/scripts/Interfaces/IDataOneWindowStorage";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { iSitecoreUiManager } from "../../../../Shared/scripts/Interfaces/ISitecoreUiManager";
import { ContentManagerBase } from "../../_first/_ContentManagerBase";
import { ContentHub } from "../ContentHub/ContentHub";
import { Guid } from "../../../../Shared/scripts/Helpers/Guid";

export class SitecoreUiManager extends ContentManagerBase implements iSitecoreUiManager {
  ScUrlAgent: ScUrlAgent;

  constructor(contentHub: ContentHub, allAgents: IAllAgents) {
    super(contentHub, allAgents)
    this.ScUrlAgent = new ScUrlAgent(this.AllAgents.Logger);
  }

  async InitSitecoreUiManager() {
    this.AllAgents.Logger.FuncStart(this.InitSitecoreUiManager.name);
    await this.ScUrlAgent.InitScUrlAgent();
    this.AllAgents.Logger.FuncEnd(this.InitSitecoreUiManager.name);
  }

  GetCurrentPageType(): scWindowType {
    //return this.CalcPageTypeFromHref({ AbsUrl: document.location.href });
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
    this.AllAgents.Logger.FuncStart(this.AdminB.name, 'targetDoc: ' + Guid.AsShort(  targetDoc.DocId));
    this.AllAgents.Logger.Log('callback passed: ' + (callbackOnComplete !== null));

    var userNameElem = targetDoc.ContentDoc.getElementById(ContentConst.Const.ElemId.sc.scLoginUserName);
    var passwordElem = targetDoc.ContentDoc.getElementById(ContentConst.Const.ElemId.sc.scLoginPassword);

    if (this.AllAgents.Logger.IsNotNullOrUndefinedBool('userNameElem', userNameElem)
      &&
      this.AllAgents.Logger.IsNotNullOrUndefinedBool('passwordElem', passwordElem)) {
      userNameElem.setAttribute('value', ContentConst.Const.Names.scDefaultAdminUserName);
      passwordElem.setAttribute('value', ContentConst.Const.Names.scDefaultAdminPassword);

      var loginButton: HTMLElement = this.GetLoginButton(targetDoc);

      if (this.AllAgents.Logger.IsNotNullOrUndefinedBool('loginButton', loginButton)) {
        this.AllAgents.Logger.Log('clicking');
        loginButton.click();

        if (callbackOnComplete) {
          this.AllAgents.Logger.Log('Triggering callback');

          setTimeout(callbackOnComplete, ContentConst.Const.Timeouts.PostLoginBtnClick);
        } else {
          this.AllAgents.Logger.Log('no callback passed');
        }
      }
      else {
        this.AllAgents.Logger.ErrorAndThrow(this.AdminB.name, 'No loginButton');
      }
    }
    else {
      this.AllAgents.Logger.ErrorAndThrow(this.AdminB.name, 'No Username or password field');
    }
    this.AllAgents.Logger.FuncEnd(this.AdminB.name);
  }
  GetLoginButton(targetDoc: IDataOneDoc): HTMLElement {
    this.AllAgents.Logger.FuncStart(this.GetLoginButton.name);

    var toReturn: HTMLElement = targetDoc.ContentDoc.getElementById(ContentConst.Const.ElemId.sc.scLoginBtn.sc920);

    if (!toReturn) {
      toReturn = targetDoc.ContentDoc.querySelector(ContentConst.Const.Selector.SC.LoginBtn.sc820);
    }

    this.AllAgents.Logger.Log('toReturn: ' + toReturn);
    this.AllAgents.Logger.FuncEnd(this.GetLoginButton.name);
    return toReturn;
  }
}