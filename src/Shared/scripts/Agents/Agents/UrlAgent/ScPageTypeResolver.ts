import { QueryStrKey } from "../../../Enums/QueryStrKey";
import { scMode } from "../../../Enums/scMode";
import { ScWindowType } from "../../../Enums/scWindowType";
import { IControllerMessageReceivedEvent_Payload } from "../../../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IHindeCore } from "../../../Interfaces/Agents/IHindeCore";
import { IUrlJacket } from "../../../Interfaces/IUrlAgent";
import { IScUrlAgent } from "../../../Interfaces/Jackets/IScUrlAgent";
import { IGenericUrlParts } from "../../../Interfaces/Jackets/IUrlParts";
import { _HindeCoreBase } from "../../../LoggableBase";
import { SharedConst } from "../../../SharedConst";

export interface IQueryKeyValuePair {
  Key: QueryStrKey,
  ValueMatch: RegExp
}

export interface IPageDeterminator {
  ConfidenceScore: number;
  Friendly: string;
  QueryKeyValuePairs: IQueryKeyValuePair[];
  RegexPathTest: RegExp;
  ScWindowType: ScWindowType;
  ScWindowTypeFriendly: string;
}

export class AllPageDeterminators {
  static regexPathTestShell: RegExp = /sitecore\/shell/ig;
  static regexMatchAll: RegExp = /.*/ig;
  static regexMatchApplicationsContentManager: RegExp = /sitecore\/shell\/Applications\/Content.*Manager/ig;

  static ScPages: IPageDeterminator[] = [
    {
      ConfidenceScore:  0,
      Friendly: "Content Editor",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.he,
          ValueMatch: /Content.*Editor/ig,
        }
      ],
      RegexPathTest: /sitecore\/shell\/Applications\/Content.*Editor/ig,  //content-editor, content%20editor
      ScWindowType: ScWindowType.ContentEditor,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.ContentEditor],
    },
    {
      // - /sitecore/shell/default.aspx
      ConfidenceScore:  0,
      Friendly: "Desktop",
      QueryKeyValuePairs: [
        
      ],
      RegexPathTest: AllPageDeterminators.regexPathTestShell,
      ScWindowType: ScWindowType.Desktop,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.Desktop],
    },
    {
      ConfidenceScore:  0,
      Friendly: "Login",
      QueryKeyValuePairs: [],
      RegexPathTest: /sitecore\/login/ig,
      ScWindowType: ScWindowType.LoginPage,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.LoginPage],
    },
    {
      // - /sitecore/shell/Applications/Content%20Manager/default.aspx?he=Marketing+Control+Panel&pa=0&ic=People%2f16x16%2fmegaphone.png&ro=%7b33CFB9CA-F565-4D5B-B88A-7CDFE29A6D71%7d&mo=templateworkspace
      ConfidenceScore:  0,
      Friendly: "Marketing Control Panel",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.he,
          ValueMatch: /Marketing.?Control.?Panel/ig,
        }
      ],
      RegexPathTest: AllPageDeterminators.regexMatchApplicationsContentManager,
      ScWindowType: ScWindowType.MarketingControlPanel,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.MarketingControlPanel],
    },
    {
      // - /sitecore/shell/Applications/Content%20Manager/default.aspx?he=Media+Library&pa=1&ic=Applications%2f16x16%2fphoto_scenery.png&mo=media&ro=%7b3D6658D8-A0BF-4E75-B3E2-D050FABCF4E1%7d
      ConfidenceScore:  0,
      Friendly: "Media Library",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.he,
          ValueMatch: /Media.?Library/ig,
        }
      ],
      RegexPathTest: AllPageDeterminators.regexMatchApplicationsContentManager,
      ScWindowType: ScWindowType.MediaLibrary,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.MediaLibrary],
    },
    {
      // - /sitecore/shell/default.aspx?xmlcontrol=Application&hdl=477C31C3C2C84771BCA48F151995D37D&he=Package+Designer&ic=apps%2f32x32%2fpackager.png
      ConfidenceScore:  0,
      Friendly: "Package Designer",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.he,
          ValueMatch: /Package.?Designer/ig
        },
        {
          Key: QueryStrKey.xmlcontrol,
          ValueMatch: /Application/ig
        }
      ],
      RegexPathTest: AllPageDeterminators.regexPathTestShell,
      ScWindowType: ScWindowType.PackageDesigner,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.PackageDesigner],
    },

    {
      // /?sc_site=website&sc_mode=preview
      ConfidenceScore:  0,
      Friendly: "Preview",
      RegexPathTest: AllPageDeterminators.regexMatchAll,
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.sc_mode,
          ValueMatch: /preview/ig
        }
      ],
      ScWindowType: ScWindowType.Preview,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.Preview],
    },
    {
      // - /sitecore/shell/Applications/Publish.aspx
      ConfidenceScore:  0,
      Friendly: "Publish",
      QueryKeyValuePairs: [
      ],
      RegexPathTest: /sitecore\/shell\/Applications\/Publish/ig,
      ScWindowType: ScWindowType.Publish,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.Publish],
    },

    {
      // - /sitecore/shell/Applications/Content%20Manager/default.aspx?he=Template%20Manager&pa=0&mo=templateworkspace&ic=Software%2F16x16%2Fcomponents.png&ro=%7B3C1715FE-6A13-4FCF-845F-DE308BA9741D%7D&fo&il
      ///en/sitecore/shell/Applications/Templates/Template-Manager?ic=Apps%2F48x48%2FNewspaper.png&he=Template%20Manager
      // /sitecore/shell/Applications/Content%20Manager/default.aspx?he=Template%20Manager&pa=0&mo=templateworkspace&ic=Software%2F16x16%2Fcomponents.png&ro=%7B3C1715FE-6A13-4FCF-845F-DE308BA9741D%7D&fo&il
      ConfidenceScore:  0,
      Friendly: "Template Manager",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.he,
          ValueMatch: /Template.*Manager/ig,
        }, {
          Key: QueryStrKey.mo,
          ValueMatch: /templateworkspace/ig,
        }
      ],
      RegexPathTest: AllPageDeterminators.regexMatchApplicationsContentManager,
      ScWindowType: ScWindowType.TemplateManager,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.TemplateManager],
    },
  ]
}

export class ScPageTypeResolver extends _HindeCoreBase implements IScUrlAgent {
  public UrlJacket: IUrlJacket;
  constructor(hindeCore: IHindeCore, urlJacket: IUrlJacket) {
    super(hindeCore);
    this.ErrorHand.ThrowIfNullOrUndefined(ScPageTypeResolver.name, [urlJacket]);
    this.UrlJacket = urlJacket;
  }

  RunJacketAgainstAllDeterminators(): IPageDeterminator {
  let determinators: IPageDeterminator[] = AllPageDeterminators.ScPages;
    let toReturnPageDeterminator: IPageDeterminator = null;

    determinators.forEach((determinant: IPageDeterminator) => {
      let passed: boolean = true;
      determinant.ConfidenceScore = 0;


      passed = this.TestJacketAgainstRegex(determinant.RegexPathTest);
      if (passed) {
        determinant.ConfidenceScore++;
      }

      determinant.QueryKeyValuePairs.forEach((queryKeyvaluePairs: IQueryKeyValuePair) => {
        let queryTest: boolean = this.QueryStringHasKey(queryKeyvaluePairs.Key)

          &&
          (this.__urlTestAgainstRegex(queryKeyvaluePairs.ValueMatch, this.GetQueryStringValueByKey(queryKeyvaluePairs.Key)));

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

    return toReturnPageDeterminator;
  }

  private TestJacketAgainstRegex(regexPattern: RegExp): boolean {
    return this.__urlTestAgainstRegex(regexPattern, this.UrlJacket.OriginalURL)
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

  private __urlTestAgainstRegex(regexPattern: RegExp, url: string): boolean {
    this.Logger.FuncStart(this.__urlTestAgainstRegex.name, regexPattern.toString());
    this.Logger.LogVal('Url', url);
    let testResult: boolean = new RegExp(regexPattern).test(url);

    this.Logger.FuncEnd(this.__urlTestAgainstRegex.name, regexPattern.toString() + ' | ' + url + ' | ' + testResult.toString());
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


    let result: IPageDeterminator = this.RunJacketAgainstAllDeterminators();
    if (!result) {
      this.ErrorHand.ErrorAndThrow(this.GetScWindowType.name, 'Undetermined page');
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
      case ScWindowType.Edit:
        this.UrlJacket.SetFilePath(SharedConst.Const.UrlSuffix.None);
        break;
      case ScWindowType.Preview:
        this.UrlJacket.SetFilePath(SharedConst.Const.UrlSuffix.None);
        break;
      case ScWindowType.Normal:
        this.UrlJacket.SetFilePath(SharedConst.Const.UrlSuffix.None);
        break;
      default:
        this.UrlJacket.SetFilePath('');
        this.ErrorHand.ErrorAndThrow(this.SetFilePathFromWindowType.name, 'unaccounted for window type');
        break;
    }
  }
}