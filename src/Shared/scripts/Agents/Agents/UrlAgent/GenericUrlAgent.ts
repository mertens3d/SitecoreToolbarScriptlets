import { QueryStrKey } from "../../../Enums/QueryStrKey";
import { scWindowType } from "../../../Enums/scWindowType";
import { AbsoluteUrl } from "../../../Interfaces/AbsoluteUrl";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";
import { IUrlAgent } from "../../../Interfaces/IUrlAgent";
import { GenericUrlParts } from "../../../Interfaces/UrlParts";

export class GenericUrlAgent implements IUrlAgent {
  protected Logger: ILoggerAgent;
  protected UrlParts: GenericUrlParts;

  constructor(logger: ILoggerAgent) {
    this.Logger = logger;
  }

  GetUrlParts(): GenericUrlParts {
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
      this.Logger.ErrorAndThrow(this.SetParameterValueByKey.name, 'No URLParts ' + QueryStrKey[key] + ' ' + newValue);
    }
  }

  SetFilePath(newFilePath: string) {
    this.UrlParts.FilePath = newFilePath;
  }

  protected InitGenericUrlAgent(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        this.Logger.FuncStart(this.InitGenericUrlAgent.name);

        if (browser.tabs) {
          await browser.tabs.query({ currentWindow: true, active: true })
            .then((result: browser.tabs.Tab[]) => {
              this.Logger.LogAsJsonPretty('result', result);
              let resultTab: browser.tabs.Tab = result[0];

              this.SetFromHref(resultTab.url);

              resolve();
            })
            .catch((err) => reject(err));
        }
        else {
          this.Logger.Log('Init from window.location.href')
          let urlToUse = window.location.href;
          this.SetFromHref(urlToUse);
        }

        resolve();
      } catch (ex) {
        reject(ex);
      }

      this.Logger.FuncEnd(this.InitGenericUrlAgent.name);
    });
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
      ScWindowType: scWindowType.Unknown,
      HasError: false,
    }
  }

  BuildFullUrlFromParts(): AbsoluteUrl {
    let toReturn: AbsoluteUrl = {
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
      this.Logger.ErrorAndThrow(this.BuildFullUrlFromParts.name, 'Null UrlParts');
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