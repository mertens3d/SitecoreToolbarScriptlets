import { QueryStrKey } from "../Shared/scripts/Enums/QueryStrKey";
import { IHindeCore } from "../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IAbsoluteUrl } from "../Shared/scripts/Interfaces/IAbsoluteUrl";
import { IUrlJacket } from "../Shared/scripts/Interfaces/IUrlAgent";
import { IGenericUrlParts } from "../Shared/scripts/Interfaces/Jackets/IUrlParts";
import { _HindeCoreBase } from "../Shared/scripts/LoggableBase";
import { IOneParamPair } from "../Shared/scripts/Interfaces/IOneParamPair";
import { SharedConst } from "../Shared/scripts/SharedConst";

export class UrlJacket extends _HindeCoreBase implements IUrlJacket {
  protected UrlParts: IGenericUrlParts;
  private OriginalURL: string;
  //private BrowserProxy: IPopUpBrowserProxy;

  constructor(hindeCore: IHindeCore, url: string) { // browserProxy: IPopUpBrowserProxy
    super(hindeCore);
    this.OriginalURL = url;

    this.ErrorHand.ThrowIfNullOrUndefined(UrlJacket.name, url);
    this.Init_GenericUrlAgent();
  }

  protected Init_GenericUrlAgent(): void {
    try {
      this.Logger.FuncStart(this.Init_GenericUrlAgent.name, UrlJacket.name);

      this.SetFromHref(this.OriginalURL);
      //if (this.BrowserProxy) {
      //  this.Init_FromBrowserProxy();
      //}
      //else {
      //   this.InitFromWindowLocation();
      //}
    } catch (err) {
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
    this.Logger.FuncStart(this.QueryStringHasKey.name, QueryStrKey[key]);
    let toReturn: boolean = false;

    if (key !== null) {
      let keyAsStr: string = QueryStrKey[key];

      if (keyAsStr) {
        toReturn = this.UrlParts && this.UrlParts.UrlSearchParameters && this.UrlParts.UrlSearchParameters.has(keyAsStr)
      }
    }

    this.Logger.FuncEnd(this.QueryStringHasKey.name, QueryStrKey[key] + ' ' + toReturn.toString());
    return toReturn;
  }

  GetQueryStringValueByKey(key: QueryStrKey): string {
    this.Logger.FuncStart(this.GetQueryStringValueByKey.name, QueryStrKey[key]);
    let toReturn: string = '';

    if (this.QueryStringHasKey(key)) {
      let keyAsStr: string = QueryStrKey[key];
      toReturn = this.UrlParts.UrlSearchParameters.get(keyAsStr);
    }

    this.Logger.FuncEnd(this.GetQueryStringValueByKey.name, QueryStrKey[key] + ' ' + toReturn.toString());
    return toReturn;
  }

  SetParameterValueByKey(key: QueryStrKey, newValue: string): void {
    if (this.UrlParts) {
      this.UrlParts.UrlSearchParameters.set(QueryStrKey[key], newValue);
    } else {
      this.ErrorHand.ErrorAndThrow(this.SetParameterValueByKey.name, 'No URLParts ' + QueryStrKey[key] + ' ' + newValue);
    }
  }

  SetFilePath(newFilePath: string) {
    this.UrlParts.FilePath = newFilePath;
  }

  //private async Init_FromBrowserProxy(): Promise<void> {
  //  this.Logger.Log(this.Init_FromBrowserProxy.name)

  //  if (this.BrowserProxy) {
  //    this.SetFromHref(this.BrowserProxy.Url);
  //  } else {
  //    throw (this.Init_FromBrowserProxy.name + '| no proxy');
  //  }
  //}
  //private InitFromWindowLocation() {
  //  try {
  //    this.Logger.Log('Init from window.location.href')
  //    let urlToUse = window.location.href;
  //    this.SetFromHref(urlToUse);
  //  } catch (err) {
  //    throw (this.InitFromWindowLocation.name + err);
  //  }
  //}

  private SetFromHref(href: string) {
    var parser = document.createElement('a');
    parser.href = href;// resultTab.url;

    this.UrlParts = {
      OriginalRaw: href,
      Protocol: parser.protocol,// this.ExtractProtocol(url),
      HostAndPort: parser.host, //this.ExtractHostName(url),
      UrlSearchParameters: new URLSearchParams(parser.search),//  this.ExtractParameters(parser.search), //new URLSearchParams(window.location.search),//
      FilePath: parser.pathname,// this.ExtractFilePath(url, parser),
      Anchor: parser.hash,
      HasError: false,
    }
    this.Logger.LogAsJsonPretty('params', this.UrlParts.UrlSearchParameters.toString());
  }

  BuildFullUrlFromParts(): IAbsoluteUrl {
    let toReturn: IAbsoluteUrl = {
      AbsUrl: '',
    };

    if (this.UrlParts) {
      if (this.UrlParts && !this.UrlParts.HasError) {
        toReturn.AbsUrl = this.UrlParts.Protocol + '//' + this.UrlParts.HostAndPort;

        if (this.UrlParts.FilePath.length > 0) {
          toReturn.AbsUrl += this.UrlParts.FilePath;
        }

        if (this.UrlParts.UrlSearchParameters) {
          toReturn.AbsUrl += '?' + this.UrlParts.UrlSearchParameters.toString();
        }
        if (this.UrlParts.Anchor.length > 0) {
          toReturn.AbsUrl += '#' + this.UrlParts.Anchor
        }
      }
    } else {
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

  //ExtractFilePath(url: string, parser: HTMLAnchorElement): string {
  //  let toReturn: string = '';

  //  //https://gist.github.com/jlong/2428561#file-uri-js

  //  parser.protocol; // => "http:"
  //  parser.hostname; // => "example.com"
  //  parser.port;     // => "3000"
  //  parser.pathname; // => "/pathname/"
  //  parser.search;   // => "?search=test"
  //  parser.hash;     // => "#hash"
  //  parser.host;     // => "example.com:3000"

  //  toReturn = parser.pathname;

  //  //toReturn = workString.replace(SharedConst.Const.Regex.UrlPathOnly, split('/');

  //  //if (workString.indexOf('//') > -1) {
  //  //  workString = workString.split('//')[1];
  //  //  //toReturn.shift();
  //  //  //toReturn.shift();
  //  //}

  //  //workString = workString.split(':')[0];
  //  //workString = workString.split('?')[0];

  //  //toReturn = workString.split('/');

  //  //if (ar.length > 1) {
  //  //  toReturn = ar[1];
  //  //} else {
  //  //  this.AllHelperAgents.Logger.Error(this.ExtractFilePath.name, 'unable to extract path from ' + url);
  //  //}

  //  return toReturn;
  //}

  //ExtractProtocol(url: string): string {
  //  let toReturn: string = '';
  //  if (url.startsWith('https')) {
  //    toReturn = 'https';
  //  } else {
  //    toReturn = 'http';
  //  }

  //  return toReturn;
  //}
  //ExtractHostName(url: string): string {
  //  //https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string/54947757
  //  let toReturn: string = '';

  //  if (url.indexOf('//') > -1) {
  //    toReturn = url.split('/')[2];
  //  } else {
  //    toReturn = url.split('/')[0];
  //  }

  //  toReturn = toReturn.split(':')[0];
  //  toReturn = toReturn.split('?')[0];

  //  return toReturn;
  //}
}