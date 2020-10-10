import { QueryStrKey } from "../Shared/scripts/Enums/QueryStrKey";
import { IHindeCore } from "../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ISiteUrl } from "../Shared/scripts/Interfaces/IAbsoluteUrl";
import { IUrlJacket } from "../Shared/scripts/Interfaces/IUrlAgent";
import { IGenericUrlParts } from "../Shared/scripts/Interfaces/Jackets/IUrlParts";
import { _HindeCoreBase } from "../Shared/scripts/_HindeCoreBase";
import { IOneParamPair } from "../Shared/scripts/Interfaces/IOneParamPair";
import { SharedConst } from "../Shared/scripts/SharedConst";

export class UrlJacket extends _HindeCoreBase implements IUrlJacket {
  protected UrlParts: IGenericUrlParts;
  public readonly OriginalURL: string;
  constructor(hindeCore: IHindeCore, url: string) {
    super(hindeCore);
    this.OriginalURL = url;

    this.ErrorHand.ThrowIfNullOrUndefined(UrlJacket.name, url);
    this.Init_GenericUrlAgent();
  }

  protected Init_GenericUrlAgent(): void {
    try {
      this.Logger.FuncStart(this.Init_GenericUrlAgent.name, UrlJacket.name);

      this.SetFromHref(this.OriginalURL);
    }
    catch (err) {
      throw (this.Init_GenericUrlAgent.name + ' | ' + err);
    }

    this.Logger.FuncEnd(this.Init_GenericUrlAgent.name, UrlJacket.name);
  }

  GetUrlParts(): IGenericUrlParts {
    return this.UrlParts;
  }

  GetOriginalURL(): string {
    return this.OriginalURL;
  }

  QueryStringHasKey(key: QueryStrKey): boolean {
    //this.Logger.FuncStart(this.QueryStringHasKey.name, QueryStrKey[key]);
    let toReturn: boolean = false;

    if (key !== null) {
      let keyAsStr: string = QueryStrKey[key];

      if (keyAsStr) {
        toReturn = this.UrlParts && this.UrlParts.UrlSearchParameters && this.UrlParts.UrlSearchParameters.has(keyAsStr);
      }
    }

    //this.Logger.FuncEnd(this.QueryStringHasKey.name, QueryStrKey[key] + ' ' + toReturn.toString());
    return toReturn;
  }

  GetQueryStringValueByKey(key: QueryStrKey): string {
    //this.Logger.FuncStart(this.GetQueryStringValueByKey.name, QueryStrKey[key]);
    let toReturn: string = '';

    if (this.QueryStringHasKey(key)) {
      let keyAsStr: string = QueryStrKey[key];
      toReturn = this.UrlParts.UrlSearchParameters.get(keyAsStr);
    }

    //this.Logger.FuncEnd(this.GetQueryStringValueByKey.name, QueryStrKey[key] + ' ' + toReturn.toString());
    return toReturn;
  }

  SetParameterValueByKey(key: QueryStrKey, newValue: string): void {
    if (this.UrlParts) {
      this.UrlParts.UrlSearchParameters.set(QueryStrKey[key], newValue);
    }
    else {
      this.ErrorHand.ErrorAndThrow(this.SetParameterValueByKey.name, 'No URLParts ' + QueryStrKey[key] + ' ' + newValue);
    }
  }

  SetFilePath(newFilePath: string) {
    this.UrlParts.FilePath = newFilePath;
  }

  private SetFromHref(href: string) {
    var parser = document.createElement('a');
    parser.href = href; // resultTab.url;

    this.UrlParts = {
      OriginalRaw: href,
      Protocol: parser.protocol,
      HostAndPort: parser.host,
      UrlSearchParameters: new URLSearchParams(parser.search),
      FilePath: parser.pathname,
      Anchor: parser.hash,
      HasError: false,
    };
    this.Logger.LogAsJsonPretty('params', this.UrlParts.UrlSearchParameters.toString());
  }

  BuildFullUrlFromParts(): ISiteUrl {
    let toReturn: ISiteUrl = {
      AbsUrl: '',
      RelativeUrl: '',
    };

    if (this.UrlParts) {
      if (this.UrlParts && !this.UrlParts.HasError) {
        toReturn.AbsUrl = this.UrlParts.Protocol + '//' + this.UrlParts.HostAndPort;
        toReturn.RelativeUrl = '';

        if (this.UrlParts.FilePath.length > 0) {
          toReturn.AbsUrl += this.UrlParts.FilePath;
          toReturn.RelativeUrl += this.UrlParts.FilePath;
        }

        if (this.UrlParts.UrlSearchParameters) {
          toReturn.AbsUrl += '?' + this.UrlParts.UrlSearchParameters.toString();
          toReturn.RelativeUrl += '?' + this.UrlParts.UrlSearchParameters.toString();
        }
        if (this.UrlParts.Anchor.length > 0) {
          toReturn.AbsUrl += '#' + this.UrlParts.Anchor;
          toReturn.RelativeUrl += '#' + this.UrlParts.Anchor;
        }
      }
    }
    else {
      this.ErrorHand.ErrorAndThrow(this.BuildFullUrlFromParts.name, 'Null UrlParts');
    }

    return toReturn;
  }

  ExtractParameters(url: string): IOneParamPair[] {
    let toReturn: IOneParamPair[] = [];
    if (url) {
      let splitStr = url.split('?');
      if (splitStr.length > 1) {
        let paramString = splitStr[1].replace(SharedConst.Const.Regex.QueryStrSeparatorQuest, '');
        let pairStr = paramString.split('&');
        if (pairStr && pairStr.length > 0) {
          for (var idx = 0; idx < pairStr.length; idx++) {
            let oneParamAr: string[] = pairStr[idx].split('=');
            let paramPair: IOneParamPair = {
              Key: '',
              value: ''
            };

            if (oneParamAr) {
              paramPair.Key = oneParamAr[0];
              if (oneParamAr.length > 1) {
                paramPair.value = oneParamAr[1];
              }
              toReturn.push(paramPair);
            }
          }
        }
      }
    }

    return toReturn;
  }
}