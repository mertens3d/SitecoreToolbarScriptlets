import { QueryStrKey } from "../../../Enums/QueryStrKey";
import { scMode } from "../../../Enums/scMode";
import { scWindowType } from "../../../Enums/scWindowType";
import { AbsoluteUrl } from "../../../Interfaces/AbsoluteUrl";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerBase";
import { IContentState } from "../../../Interfaces/IContentState/IContentState";
import { SharedConst } from "../../../SharedConst";
import { GenericUrlAgent } from "./GenericUrlAgent";

export class ScUrlAgent extends GenericUrlAgent {
  constructor(logger: ILoggerAgent) {
    super(logger);
  }

  private __urlTestAgainstRegex(regexPattern: RegExp, url: string) {
    return new RegExp(regexPattern).test(url);
  }


  GetFullUrl() {
    return this.BuildFullUrlFromParts();
  }

  GetScWindowType(): scWindowType {  //absUrl: AbsoluteUrl
    this.Logger.FuncStart(this.GetScWindowType.name);
    var toReturn: scWindowType = scWindowType.Unknown;

    let testPath: AbsoluteUrl = this.BuildFullUrlFromParts();
    if (testPath) {
      this.Logger.LogVal('current url', testPath.AbsUrl);
      if (testPath.AbsUrl.indexOf(SharedConst.Const.UrlSuffix.Login) > -1) {
        toReturn = scWindowType.LoginPage;
      }
      else if (new RegExp(SharedConst.Const.Regex.ContentEditor).test(testPath.AbsUrl)) {
        toReturn = scWindowType.ContentEditor;
      }
      else if (testPath.AbsUrl.toLowerCase().indexOf(SharedConst.Const.UrlSuffix.LaunchPad.toLowerCase()) > -1) {
        toReturn = scWindowType.Launchpad;
      }
      else if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.Desktop, testPath.AbsUrl)) {
        toReturn = scWindowType.Desktop;
      }
      else if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.Preview, testPath.AbsUrl)) {
        toReturn = scWindowType.Preview;
      }
      else if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.Edit, testPath.AbsUrl)) {
        toReturn = scWindowType.Edit;
      }
      else if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.Normal, testPath.AbsUrl)) {
        toReturn = scWindowType.Normal;
      }
      else {
        toReturn = scWindowType.Unknown;
      }
    } else {
      this.Logger.ErrorAndThrow(this.GetScWindowType.name, 'null url');
    }
    this.Logger.FuncEnd(this.GetScWindowType.name, scWindowType[toReturn]);

    return toReturn;
  }

  BuildEditPrevNormUrl(newMode: scMode, contState: IContentState): void {
    this.UrlParts.Anchor = '';
    this.UrlParts.FilePath = '';
    //urlParts.Parameters = [];
    this.UrlParts.ScWindowType = scWindowType.Unknown;

    this.SetParameterValueByKey(QueryStrKey.sc_itemid, contState.ActiveCe.ActiveNode.NodeId.AsBracedGuid);
    this.SetParameterValueByKey(QueryStrKey.sc_mode, scMode[newMode]);
    this.SetParameterValueByKey(QueryStrKey.sc_lang, 'en');
    this.SetParameterValueByKey(QueryStrKey.sc_site, 'website');
  }

  SetScMode(newMode: scMode): void {
    if (this.UrlParts && newMode) {
      //this.SetFilePathFromWindowType(newMode);

      if (this.UrlParts && this.UrlParts)
        this.SetParameterValueByKey(QueryStrKey.sc_mode, scMode[ newMode])
    }
  }

  SetFilePathFromWindowType(windowType: scWindowType = null): void {
    if (!windowType) {
      windowType = scWindowType.Unknown;
    }

    switch (windowType) {
      case scWindowType.ContentEditor:
        this.SetFilePath(SharedConst.Const.UrlSuffix.CE);
        break;
      case scWindowType.Desktop:
        this.SetFilePath(SharedConst.Const.UrlSuffix.Desktop);
        break;
      case scWindowType.Edit:
        this.SetFilePath(SharedConst.Const.UrlSuffix.None);
        break;
      case scWindowType.Preview:
        this.SetFilePath(SharedConst.Const.UrlSuffix.None);
        break;
      case scWindowType.Normal:
        this.SetFilePath(SharedConst.Const.UrlSuffix.None);
        break;
      default:
        this.SetFilePath('');
        this.Logger.ErrorAndThrow(this.SetFilePathFromWindowType.name, 'unaccounted for window type');
        break;
    }
  }
}