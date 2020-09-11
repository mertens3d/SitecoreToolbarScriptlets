import { QueryStrKey } from "../../../Enums/QueryStrKey";
import { scMode } from "../../../Enums/scMode";
import { ScWindowType } from "../../../Enums/scWindowType";
import { AbsoluteUrl } from "../../../Interfaces/AbsoluteUrl";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";
import { SharedConst } from "../../../SharedConst";
import { GenericUrlAgent } from "./GenericUrlAgent";
import { IScUrlAgent } from "../../../Interfaces/Agents/IScUrlAgent/IScUrlAgent";
import { IContentState } from "../../../Interfaces/Data/IContentState";

export class ScUrlAgent extends GenericUrlAgent implements IScUrlAgent {
  constructor(logger: ILoggerAgent) {
    super(logger);
  }

  private __urlTestAgainstRegex(regexPattern: RegExp, url: string) {
    return new RegExp(regexPattern).test(url);
  }

  async InitScUrlAgent() : Promise<void>{
    try {
      await super.InitGenericUrlAgent();
    } catch (err) {
      this.Logger.ErrorAndThrow(this.InitScUrlAgent.name, err);
    }
  }

  GetFullUrl() {
    return this.BuildFullUrlFromParts();
  }

  GetScWindowType(): ScWindowType {  //absUrl: AbsoluteUrl
    var toReturn: ScWindowType = ScWindowType.Unknown;

    let testPath: AbsoluteUrl = this.BuildFullUrlFromParts();
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
      else if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.Desktop, testPath.AbsUrl)) {
        toReturn = ScWindowType.Desktop;
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
      this.Logger.ErrorAndThrow(this.GetScWindowType.name, 'null url');
    }

    return toReturn;
  }

  BuildEditPrevNormUrl(newMode: scMode, contState: IContentState): void {
    this.UrlParts.Anchor = '';
    this.UrlParts.FilePath = '';

    this.SetParameterValueByKey(QueryStrKey.sc_itemid, contState.ActiveCe.ActiveNode.NodeId.AsBracedGuid());
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
        this.Logger.ErrorAndThrow(this.SetFilePathFromWindowType.name, 'unaccounted for window type');
        break;
    }
  }
}