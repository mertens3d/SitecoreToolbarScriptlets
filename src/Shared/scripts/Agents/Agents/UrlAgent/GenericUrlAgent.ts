import { QueryStrKey } from "../../../Enums/QueryStrKey";
import { IHindeCore } from "../../../Interfaces/Agents/IHindeCore";
import { IAbsoluteUrl } from "../../../Interfaces/IAbsoluteUrl";
import { IUrlAgent } from "../../../Interfaces/IUrlAgent";
import { IGenericUrlParts } from "../../../Interfaces/IUrlParts";
import { _HindeCoreBase } from "../../../LoggableBase";

export class GenericUrlAgent extends _HindeCoreBase implements IUrlAgent {
  protected UrlParts: IGenericUrlParts;
  private  Url: string;
  //private BrowserProxy: IPopUpBrowserProxy;

  constructor(hindeCore: IHindeCore,  url:string) { // browserProxy: IPopUpBrowserProxy
    super(hindeCore);
    this.Url = url;

    this.ErrorHand.ThrowIfNullOrUndefined(GenericUrlAgent.name, url);
    //this.BrowserProxy = browserProxy;
  }

  GetUrlParts(): IGenericUrlParts {
    return this.UrlParts;
  }

  QueryStringHasKey(key: QueryStrKey): boolean {
    let toReturn: boolean = false;

    if (key !== null) {
      let keyAsStr: string = QueryStrKey[key];

      if (keyAsStr) {
        toReturn = this.UrlParts && this.UrlParts.Parameters && this.UrlParts.Parameters.has(keyAsStr)
      }
    }

    return toReturn;
  }

  GetQueryStringValueByKey(key: QueryStrKey): string {
    let toReturn: string = '';

    if (this.QueryStringHasKey(key)) {
      let keyAsStr: string = QueryStrKey[key];
      toReturn = this.UrlParts.Parameters.get(keyAsStr);
    }

    return toReturn;
  }

  SetParameterValueByKey(key: QueryStrKey, newValue: string): void {
    if (this.UrlParts) {
      this.UrlParts.Parameters.set(QueryStrKey[key], newValue);
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

  protected  Init_GenericUrlAgent(): void {
    try {
      this.Logger.FuncStart(this.Init_GenericUrlAgent.name, GenericUrlAgent.name);

      this.SetFromHref(this.Url);
      //if (this.BrowserProxy) {
      //  this.Init_FromBrowserProxy();
      //}
      //else {
      //   this.InitFromWindowLocation();
      //}
    } catch (err) {
      throw (this.Init_GenericUrlAgent.name + ' | ' + err);
    }

    this.Logger.FuncEnd(this.Init_GenericUrlAgent.name, GenericUrlAgent.name);
  }

  private SetFromHref(href: string) {
    var parser = document.createElement('a');
    parser.href = href;// resultTab.url;

    this.UrlParts = {
      OriginalRaw: href,
      Protocol: parser.protocol,// this.ExtractProtocol(url),
      HostAndPort: parser.host, //this.ExtractHostName(url),
      Parameters: new URLSearchParams(window.location.search),// this.ExtractParameters(parser.search),
      FilePath: parser.pathname,// this.ExtractFilePath(url, parser),
      Anchor: parser.hash,
      HasError: false,
    }
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

        if (this.UrlParts.Parameters) {
          toReturn.AbsUrl += '?' + this.UrlParts.Parameters.toString();
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

  //ExtractParameters(url: string): OneParamPair[] {
  //  let toReturn: OneParamPair[] = [];
  //  if (url) {
  //    let splitStr = url.split('?');
  //    if (splitStr.length > 1) {
  //      let paramString = splitStr[1].replace(SharedConst.Const.Regex.QueryStrSeparatorQuest, '');
  //      let pairStr = paramString.split('&');
  //      if (pairStr && pairStr.length > 0) {
  //        for (var idx = 0; idx < pairStr.length; idx++) {
  //          let oneParamAr: string[] = pairStr[idx].split('=');
  //          let paramPair: OneParamPair = {
  //            Key: '',
  //            value: ''
  //          };

  //          if (oneParamAr) {
  //            paramPair.Key = oneParamAr[0];
  //            if (oneParamAr.length > 1) {
  //              paramPair.value = oneParamAr[1];
  //            }
  //            toReturn.push(paramPair);
  //          }
  //        }
  //      }
  //    }
  //  }
  //  return toReturn;
  //}

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