import { QueryStrKey } from "../../Enums/QueryStrKey";
import { scMode } from "../../Enums/scMode";
import { ScWindowType } from "../../Enums/50 - scWindowType";
import { IControllerMessageReceivedEvent_Payload } from "../../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { IUrlJacket } from "../../Interfaces/IUrlAgent";
import { IScUrlAgent } from "../../Interfaces/Jackets/IScUrlAgent";
import { IGenericUrlParts } from "../../Interfaces/Jackets/IUrlParts";
import { SharedConst } from "../../SharedConst";
import { IQueryKeyValuePair } from "./IQueryKeyValuePair";
import { ScWindowTypeDeterminators } from "./ScWindowTypeDeterminators";
import { _CommonBase } from "../../_CommonCoreBase";
import { IScWindowTypeDeterminator } from "../../Interfaces/IPageDeterminator";

export class ScPageTypeResolver extends _CommonBase implements IScUrlAgent {
  public UrlJacket: IUrlJacket;
  constructor(commonCore: ICommonCore, urlJacket: IUrlJacket) {
    super(commonCore);
    this.Logger.CTORStart(ScPageTypeResolver.name);
    this.ErrorHand.ThrowIfNullOrUndefined(ScPageTypeResolver.name, [urlJacket]);
    this.UrlJacket = urlJacket;
    this.Logger.FuncEnd(ScPageTypeResolver.name);
  }

  RunJacketAgainstAllDeterminators(): IScWindowTypeDeterminator {
    let determinators: IScWindowTypeDeterminator[] = ScWindowTypeDeterminators.ScWindowTypeDeterminators;
    let toReturnPageDeterminator: IScWindowTypeDeterminator = null;

    determinators.forEach((determinant: IScWindowTypeDeterminator) => {
      let passed: boolean = true;
      determinant.ConfidenceScore = 0;

      passed = this.TestJacketAgainstRegex(determinant.RegexPathTest);
      if (passed) {
        let regExAsStr: string = determinant.RegexPathTest.toString();
        if (regExAsStr.charAt(0) === "/") {
          regExAsStr = regExAsStr.substr(1);
        }
        if (regExAsStr.charAt(regExAsStr.length - 1) === "/") {
          regExAsStr = regExAsStr.substr(0, regExAsStr.length - 1);
        }

        let slashCount = regExAsStr.split('/').length;

        determinant.ConfidenceScore += slashCount;
      }

      determinant.QueryKeyValuePairs.forEach((queryKeyvaluePair: IQueryKeyValuePair) => {
        let queryTest: boolean = this.QueryStringHasKey(queryKeyvaluePair.Key);
        if (queryTest) {
          //this.Logger.LogVal('has key : ', QueryStrKey[queryKeyvaluePair.Key]);
          //this.Logger.LogVal('regex : ', queryKeyvaluePair.ValueMatch.toString());
          queryTest = this.__urlTestAgainstRegex(queryKeyvaluePair.ValueMatch, this.GetQueryStringValueByKey(queryKeyvaluePair.Key));
        }

        passed = passed && queryTest;
        if (passed) {
          determinant.ConfidenceScore++;
        }
      });
      if (passed) {
        if (!toReturnPageDeterminator || toReturnPageDeterminator.ConfidenceScore < determinant.ConfidenceScore) {
          this.Logger.LogAsJsonPretty('current determinant winner', determinant);
          toReturnPageDeterminator = determinant;
        }
      }
    });

    this.Logger.LogAsJsonPretty('Final winner', toReturnPageDeterminator);

    return toReturnPageDeterminator;
  }

  private TestJacketAgainstRegex(regexPattern: RegExp): boolean {
    return this.__urlTestAgainstRegex(regexPattern, this.UrlJacket.BuildFullUrlFromParts().AbsUrl)
  }

  SetParameterValueByKey(qsKey: QueryStrKey, qsValue: string) {
    return this.UrlJacket.SetParameterValueByKey(qsKey, qsValue);
  }

  GetUrlParts(): IGenericUrlParts {
    return this.UrlJacket.GetUrlParts();
  }

  GetQueryStringValueByKey(hsTargetSs: QueryStrKey): string {
    return this.UrlJacket.GetQueryStringValueByKey(hsTargetSs);
  }

  QueryStringHasKey(hsTargetSs: QueryStrKey) {
    return this.UrlJacket.QueryStringHasKey(hsTargetSs);
  }

  BuildFullUrlFromParts_ScUrlAgent() {
    this.ErrorHand.ThrowIfNullOrUndefined(this.BuildFullUrlFromParts_ScUrlAgent.name, [this.UrlJacket]);
    return this.UrlJacket.BuildFullUrlFromParts();
  }

  private __urlTestAgainstRegex(regexPattern: RegExp, testee: string): boolean {
    //this.Logger.FuncStart(this.__urlTestAgainstRegex.name, regexPattern.toString());
    //this.Logger.LogVal('Testee', testee);
    let testResult: boolean = new RegExp(regexPattern).test(testee);

    //this.Logger.FuncEnd(this.__urlTestAgainstRegex.name, regexPattern.toString() + ' | ' + url + ' | ' + testResult.toString());
    return testResult;
  }

  private GetScWindowtypeXmlControl(): ScWindowType {
    var toReturn: ScWindowType = ScWindowType.Unknown;

    if (this.QueryStringHasKey(QueryStrKey.he)) {
      let heValue: string = this.GetQueryStringValueByKey(QueryStrKey.he);
      switch (heValue) {
        case ('Package Designer'):
          toReturn = ScWindowType.PackageDesigner;
          break;

        default:
      }
    }

    if (toReturn === ScWindowType.Unknown) {
      this.ErrorHand.WarningAndContinue(this.GetScWindowtypeXmlControl.name, 'unhandled XmlControl type');
    }

    return toReturn;
  }

  GetScWindowType(): ScWindowType {
    var toReturn: ScWindowType = ScWindowType.Unknown;

    //let testPath: IAbsoluteUrl = this.BuildFullUrlFromParts_ScUrlAgent();
    //if (testPath) {
    //  if (testPath.AbsUrl.indexOf(SharedConst.Const.UrlSuffix.Login) > -1) {
    //    toReturn = ScWindowType.LoginPage;
    //  }
    //  else if (new RegExp(SharedConst.Const.Regex.ContentEditor).test(testPath.AbsUrl)) {
    //    toReturn = ScWindowType.ContentEditor;
    //  }
    //  else if (testPath.AbsUrl.toLowerCase().indexOf(SharedConst.Const.UrlSuffix.LaunchPad.toLowerCase()) > -1) {
    //    toReturn = ScWindowType.Launchpad;
    //  }
    //  else if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.Shell, testPath.AbsUrl)) {
    //    if (this.QueryStringHasKey(QueryStrKey.xmlcontrol)) {
    //      toReturn = this.GetScWindowtypeXmlControl();
    //    }
    //    else if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.ContentManager, testPath.AbsUrl)) {
    //      if (this.QueryStringHasKey(QueryStrKey.he)) {
    //        let heValue: string = this.GetQueryStringValueByKey(QueryStrKey.he);
    //        if (heValue === SharedConst.Const.QueryStringHeValues.heTemplateManager) {
    //          toReturn = ScWindowType.TemplateManager;
    //        } else {
    //          toReturn = ScWindowType.Unknown;
    //        }
    //      }
    //    }
    //    else {
    //      toReturn = ScWindowType.Desktop;
    //    }
    //  }
    //  else if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.Preview, testPath.AbsUrl)) {
    //    toReturn = ScWindowType.Preview;
    //  }
    //  else if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.Edit, testPath.AbsUrl)) {
    //    toReturn = ScWindowType.Edit;
    //  }
    //  else if (this.__urlTestAgainstRegex(SharedConst.Const.Regex.PageType.Normal, testPath.AbsUrl)) {
    //    toReturn = ScWindowType.Normal;
    //  }
    //  else {
    //    toReturn = ScWindowType.Unknown;
    //  }
    //}
    //else {
    //  this.ErrorHand.ErrorAndThrow(this.GetScWindowType.name, 'null url');
    //}

    let result: IScWindowTypeDeterminator = this.RunJacketAgainstAllDeterminators();
    if (!result) {
      this.ErrorHand.HandleFatalError(this.GetScWindowType.name, 'Undetermined page');
    } else {
      toReturn = result.ScWindowType;
    }

    this.Logger.LogImportant(this.GetScWindowType.name + ' ' + ScWindowType[toReturn]);
    return toReturn;
  }

  BuildEditPrevNormUrl(newMode: scMode, contState: IControllerMessageReceivedEvent_Payload): void {
    let urlParts = this.GetUrlParts();
    urlParts.Anchor = '';
    urlParts.FilePath = '';

    //todo - put back once this method returns to use this.SetParameterValueByKey(QueryStrKey.sc_itemid, contState.ActiveCe.StateOfTree.ActiveNode.NodeId.AsBracedGuid());
    this.SetParameterValueByKey(QueryStrKey.sc_mode, scMode[newMode]);
    this.SetParameterValueByKey(QueryStrKey.sc_lang, 'en');
    this.SetParameterValueByKey(QueryStrKey.sc_site, 'website');
  }

  SetScMode(newMode: scMode): void {
    let urlParts = this.GetUrlParts();
    if (urlParts && newMode) {
      //this.SetFilePathFromWindowType(newMode);
      if (urlParts)
        this.SetParameterValueByKey(QueryStrKey.sc_mode, scMode[newMode]);
    }
  }

  SetFilePathFromWindowType(windowType: ScWindowType = null): void {
    if (!windowType) {
      windowType = ScWindowType.Unknown;
    }

    switch (windowType) {
      case ScWindowType.ContentEditor:
        this.UrlJacket.SetFilePath(SharedConst.Const.UrlSuffix.CE);
        break;
      case ScWindowType.Desktop:
        this.UrlJacket.SetFilePath(SharedConst.Const.UrlSuffix.Desktop);
        break;
      case ScWindowType.ExperienceEditor_Edit:
        this.UrlJacket.SetFilePath(SharedConst.Const.UrlSuffix.None);
        break;
      case ScWindowType.ExperienceEditor_Preview:
        this.UrlJacket.SetFilePath(SharedConst.Const.UrlSuffix.None);
        break;
      case ScWindowType.ExperienceEditor_Normal:
        this.UrlJacket.SetFilePath(SharedConst.Const.UrlSuffix.None);
        break;
      default:
        this.UrlJacket.SetFilePath('');
        this.ErrorHand.HandleFatalError(this.SetFilePathFromWindowType.name, 'unaccounted for window type');
        break;
    }
  }
}