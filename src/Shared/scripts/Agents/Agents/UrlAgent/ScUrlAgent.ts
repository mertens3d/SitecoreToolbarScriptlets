import { QueryStrKey } from "../../../Enums/QueryStrKey";
import { scMode } from "../../../Enums/scMode";
import { ScWindowType } from "../../../Enums/scWindowType";
import { IControllerMessageReceivedEvent_Payload } from "../../../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IHindeCore } from "../../../Interfaces/Agents/IHindeCore";
import { IScUrlAgent } from "../../../Interfaces/Agents/IScUrlAgent/IScUrlAgent";
import { IAbsoluteUrl } from "../../../Interfaces/IAbsoluteUrl";
import { SharedConst } from "../../../SharedConst";
import { GenericUrlAgent } from "./GenericUrlAgent";

export class ScUrlAgent extends GenericUrlAgent implements IScUrlAgent {
  constructor(hindeCore: IHindeCore, url: string) {
    super(hindeCore, url);
  }

  private __urlTestAgainstRegex(regexPattern: RegExp, url: string) {
    return new RegExp(regexPattern).test(url);
  }

  Init_ScUrlAgent(): void {
    this.Logger.FuncStart(this.Init_ScUrlAgent.name);

    this.Init_GenericUrlAgent();
    this.Logger.FuncEnd(this.Init_ScUrlAgent.name);
  }

  GetFullUrl() {
    return this.BuildFullUrlFromParts();
  }

  private GetScWindowtypeXmlControl(testPath: IAbsoluteUrl): ScWindowType {
    var toReturn: ScWindowType = ScWindowType.Unknown;
    if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.PackageDesigner, testPath.AbsUrl)
    ) {
      toReturn = ScWindowType.PackageDesigner;
    } else {
      this.ErrorHand.WarningAndContinue(this.GetScWindowtypeXmlControl.name, 'unhandled XmlControl type');
    }
    return toReturn;
  }

  GetScWindowType(): ScWindowType {  //absUrl: AbsoluteUrl
    var toReturn: ScWindowType = ScWindowType.Unknown;

    let testPath: IAbsoluteUrl = this.BuildFullUrlFromParts();
    if (testPath) {
      if (testPath.AbsUrl.indexOf(SharedConst.Const.UrlSuffix.Login) > -1) {
        toReturn = ScWindowType.LoginPage;
      }
      else if (new RegExp(SharedConst.Const.Regex.ContentEditor).test(testPath.AbsUrl)) {
        toReturn = ScWindowType.ContentEditor;
      }
      else if (testPath.AbsUrl.toLowerCase().indexOf(SharedConst.Const.UrlSuffix.LaunchPad.toLowerCase()) > -1) {
        toReturn = ScWindowType.Launchpad;
      }
      else if (
        this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.Default, testPath.AbsUrl)
      ) {
        if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.XmlControl, testPath.AbsUrl)) {
          toReturn = this.GetScWindowtypeXmlControl(testPath)
        } else {
          toReturn = ScWindowType.Desktop;
        }
      }
      else if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.Preview, testPath.AbsUrl)) {
        toReturn = ScWindowType.Preview;
      }
      else if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.Edit, testPath.AbsUrl)) {
        toReturn = ScWindowType.Edit;
      }
      else if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.Normal, testPath.AbsUrl)) {
        toReturn = ScWindowType.Normal;
      }

      else {
        toReturn = ScWindowType.Unknown;
      }
    } else {
      this.ErrorHand.ErrorAndThrow(this.GetScWindowType.name, 'null url');
    }

    return toReturn;
  }

  BuildEditPrevNormUrl(newMode: scMode, contState: IControllerMessageReceivedEvent_Payload): void {
    this.UrlParts.Anchor = '';
    this.UrlParts.FilePath = '';

    //todo - put back once this method returns to use this.SetParameterValueByKey(QueryStrKey.sc_itemid, contState.ActiveCe.StateOfTree.ActiveNode.NodeId.AsBracedGuid());
    this.SetParameterValueByKey(QueryStrKey.sc_mode, scMode[newMode]);
    this.SetParameterValueByKey(QueryStrKey.sc_lang, 'en');
    this.SetParameterValueByKey(QueryStrKey.sc_site, 'website');
  }

  SetScMode(newMode: scMode): void {
    if (this.UrlParts && newMode) {
      //this.SetFilePathFromWindowType(newMode);

      if (this.UrlParts && this.UrlParts)
        this.SetParameterValueByKey(QueryStrKey.sc_mode, scMode[newMode])
    }
  }

  SetFilePathFromWindowType(windowType: ScWindowType = null): void {
    if (!windowType) {
      windowType = ScWindowType.Unknown;
    }

    switch (windowType) {
      case ScWindowType.ContentEditor:
        this.SetFilePath(SharedConst.Const.UrlSuffix.CE);
        break;
      case ScWindowType.Desktop:
        this.SetFilePath(SharedConst.Const.UrlSuffix.Desktop);
        break;
      case ScWindowType.Edit:
        this.SetFilePath(SharedConst.Const.UrlSuffix.None);
        break;
      case ScWindowType.Preview:
        this.SetFilePath(SharedConst.Const.UrlSuffix.None);
        break;
      case ScWindowType.Normal:
        this.SetFilePath(SharedConst.Const.UrlSuffix.None);
        break;
      default:
        this.SetFilePath('');
        this.ErrorHand.ErrorAndThrow(this.SetFilePathFromWindowType.name, 'unaccounted for window type');
        break;
    }
  }
}