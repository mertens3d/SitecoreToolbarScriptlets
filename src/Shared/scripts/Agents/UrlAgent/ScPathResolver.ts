import { ScWindowType } from "../../Enums/50 - scWindowType";
import { QueryStrKey } from "../../Enums/QueryStrKey";
import { scMode } from "../../Enums/scMode";
import { IControllerMessageReceivedEvent_Payload } from "../../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { IUrlJacket } from "../../Interfaces/IUrlAgent";
import { IScURLResolver } from "../../Interfaces/Jackets/IScPathResolver";
import { IGenericUrlParts } from "../../Interfaces/Jackets/IUrlParts";
import { SharedConst } from "../../SharedConst";
import { _CommonBase } from "../../_CommonCoreBase";

export class ScURLResolver extends _CommonBase implements IScURLResolver {
  public UrlJacket: IUrlJacket;


  constructor(commonCore: ICommonCore, urlJacket: IUrlJacket) {
    super(commonCore)
    this.UrlJacket = urlJacket;
  }

  BuildFullUrlFromParts_ScUrlAgent(UrlJacket: IUrlJacket) {
    this.ErrorHand.ThrowIfNullOrUndefined(this.BuildFullUrlFromParts_ScUrlAgent.name, [UrlJacket]);


    return UrlJacket.BuildFullUrlFromParts();
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

  SetParameterValueByKey(qsKey: QueryStrKey, qsValue: string) {
    return this.UrlJacket.SetParameterValueByKey(qsKey, qsValue);
  }

  GetUrlParts(): IGenericUrlParts {
    return this.UrlJacket.GetUrlParts();
  }

  GetQueryStringValueByKey(hsTargetSs: QueryStrKey): string {
    return this.UrlJacket.GetQueryStringValueByKey(hsTargetSs);
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
  QueryStringHasKey(hsTargetSs: QueryStrKey) {
    return this.UrlJacket.QueryStringHasKey(hsTargetSs);
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
}