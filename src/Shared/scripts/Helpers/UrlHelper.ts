import { HelperBase } from "../Classes/HelperBase";
import { UrlParts } from "../Interfaces/UrlParts";
import { scWindowType } from "../Enums/scWindowType";
import { SharedConst } from "../SharedConst";
import { IScMode } from "../Interfaces/IscMode";
import { OneParamPair } from "../Interfaces/OneParamPair";
import { AbsoluteUrl } from "../Interfaces/AbsoluteUrl";
import { ICurrStateContent } from "../Interfaces/ICurrState";
export class UrlHelper extends HelperBase {



  MakeUrlParts(url: AbsoluteUrl): UrlParts {
    var parser = document.createElement('a');
    parser.href = url.AbsUrl;

    let toReturn: UrlParts = {
      OriginalRaw: url.AbsUrl,
      Protocol: parser.protocol,// this.ExtractProtocol(url),
      HostAndPort: parser.host, //this.ExtractHostName(url),
      Parameters: this.ExtractParameters(parser.search),
      FilePath: parser.pathname,// this.ExtractFilePath(url, parser),
      Anchor: parser.hash,
      ScWindowType: scWindowType.Unknown,
      HasError: false,
    }

    toReturn.ScWindowType = this.CalcPageTypeFromHref(url);

    return toReturn;
  }

  CloneUrlParts(original: UrlParts): UrlParts {
    let toReturn: UrlParts =
    {
      Anchor: original.Anchor,
      FilePath: original.FilePath,
      HasError: original.HasError,
      HostAndPort: original.HostAndPort,
      OriginalRaw: original.OriginalRaw,
      Parameters: original.Parameters,
      Protocol: original.Protocol,
      ScWindowType: original.ScWindowType,
    }

    return toReturn;
  }

  BuildEditPrevNormUrl(scMode: IScMode, contState: ICurrStateContent, urlParts: UrlParts): UrlParts {
    let toReturn: UrlParts = urlParts;
    urlParts.Anchor = '';
    urlParts.FilePath = '';
    urlParts.Parameters = [];
    urlParts.ScWindowType = scWindowType.Unknown;


    urlParts.Parameters.push(
      {
        Key: 'sc_itemid',
        value: contState.ActiveCe.ActiveNode.NodeId.AsBracedGuid
      });

    urlParts.Parameters.push(
      {
        Key: 'sc_mode',
        value: scMode.AsString
      });

    urlParts.Parameters.push(
      {
        Key: 'sc_lang',
        value: 'en'
      });

    urlParts.Parameters.push(
      {
        Key: 'sc_site',
        value: 'website'
      });

    return toReturn;
  }
  BuildFullUrlFromParts(UrlParts: UrlParts): AbsoluteUrl {
    let toReturn: AbsoluteUrl = {
      AbsUrl: '',
    };

    if (UrlParts && !UrlParts.HasError) {
      toReturn.AbsUrl = UrlParts.Protocol + '//' + UrlParts.HostAndPort;

      if (UrlParts.FilePath.length > 0) {
        toReturn.AbsUrl += UrlParts.FilePath;
      }

      if (UrlParts.Parameters && UrlParts.Parameters.length > 0) {
        toReturn.AbsUrl += '?';

        for (var idx = 0; idx < UrlParts.Parameters.length; idx++) {
          if (idx > 0) {
            toReturn.AbsUrl += '&';
          }
          let oneParam: OneParamPair = UrlParts.Parameters[idx];
          toReturn.AbsUrl += oneParam.Key;
          if (oneParam.value) {
            toReturn.AbsUrl += '=' + oneParam.value;
          }
        }
      }
      if (UrlParts.Anchor.length > 0) {
        toReturn.AbsUrl += '#' + UrlParts.Anchor
      }
    }

    return toReturn;
  }

  SetScModeFromEditPrevNorm(newValue: IScMode, urlParts: UrlParts): UrlParts {
    let toReturn: UrlParts = urlParts;

    if (urlParts && newValue) {
      urlParts = this.SetFilePathFromWindowType(urlParts);

      if (urlParts && urlParts.Parameters && urlParts.Parameters.length > 0)
        for (var idx = 0; idx < urlParts.Parameters.length; idx++) {
          let candidate: OneParamPair = urlParts.Parameters[idx];
          if (candidate.Key === 'scmode') {
            candidate.value = newValue.AsString;
            break;
          }
        }
    }
    return toReturn;
  }

  SetFilePathFromWindowType(urlParts: UrlParts, windowType: scWindowType = null): UrlParts {
    //this.debug().NotNullCheck('this.__winDataParent.DataDocSelf.Document', this.CurrentTabData.DataDocSelf.Document);

    let toReturn: UrlParts = urlParts;

    if (!windowType) {
      windowType = urlParts.ScWindowType;
    }

    toReturn.ScWindowType = windowType;

    switch (toReturn.ScWindowType) {
      case scWindowType.ContentEditor:
        toReturn.FilePath = SharedConst.Const.UrlSuffix.CE;
        break;
      case scWindowType.Desktop:
        toReturn.FilePath = SharedConst.Const.UrlSuffix.Desktop;
        break;
      case scWindowType.Edit:
        toReturn.FilePath = SharedConst.Const.UrlSuffix.None;
        break;
      case scWindowType.Preview:
        toReturn.FilePath = SharedConst.Const.UrlSuffix.None;
        break;
      case scWindowType.Normal:
        toReturn.FilePath = SharedConst.Const.UrlSuffix.None;
        break;
      default:
        toReturn.FilePath = '';
        this.AllHelperAgents.LoggerAgent.Error(this.SetFilePathFromWindowType.name, 'unaccounted for window type');
        break;
    }

    return toReturn;
  }

  ExtractParameters(url: string): OneParamPair[] {
    let toReturn: OneParamPair[] = [];
    if (url) {
      let splitStr = url.split('?');
      if (splitStr.length > 1) {
        let paramString = splitStr[1].replace(SharedConst.Const.Regex.QueryStrSeparatorQuest, '');
        let pairStr = paramString.split('&');
        if (pairStr && pairStr.length > 0) {
          for (var idx = 0; idx < pairStr.length; idx++) {
            let oneParamAr: string[] = pairStr[idx].split('=');
            let paramPair: OneParamPair = {
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

  ExtractFilePath(url: string, parser: HTMLAnchorElement): string {
    let toReturn: string = '';

    //https://gist.github.com/jlong/2428561#file-uri-js

    parser.protocol; // => "http:"
    parser.hostname; // => "example.com"
    parser.port;     // => "3000"
    parser.pathname; // => "/pathname/"
    parser.search;   // => "?search=test"
    parser.hash;     // => "#hash"
    parser.host;     // => "example.com:3000"

    toReturn = parser.pathname;

    //toReturn = workString.replace(SharedConst.Const.Regex.UrlPathOnly, split('/');

    //if (workString.indexOf('//') > -1) {
    //  workString = workString.split('//')[1];
    //  //toReturn.shift();
    //  //toReturn.shift();
    //}

    //workString = workString.split(':')[0];
    //workString = workString.split('?')[0];

    //toReturn = workString.split('/');

    //if (ar.length > 1) {
    //  toReturn = ar[1];
    //} else {
    //  this.AllHelperAgents.LoggerAgent.Error(this.ExtractFilePath.name, 'unable to extract path from ' + url);
    //}

    return toReturn;
  }

  ExtractProtocol(url: string): string {
    let toReturn: string = '';
    if (url.startsWith('https')) {
      toReturn = 'https';
    } else {
      toReturn = 'http';
    }

    return toReturn;
  }
  ExtractHostName(url: string): string {
    //https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string/54947757
    let toReturn: string = '';

    if (url.indexOf('//') > -1) {
      toReturn = url.split('/')[2];
    } else {
      toReturn = url.split('/')[0];
    }

    toReturn = toReturn.split(':')[0];
    toReturn = toReturn.split('?')[0];

    return toReturn;
  }

  private __urlVsRegex(regexPattern: RegExp, url: string) {
    return new RegExp(regexPattern).test(url);
  }
  CalcPageTypeFromHref(absUrl: AbsoluteUrl): scWindowType {
    this.AllHelperAgents.LoggerAgent.FuncStart(this.CalcPageTypeFromHref.name);
    var toReturn: scWindowType = scWindowType.Unknown;

    if (absUrl && absUrl.AbsUrl) {
      this.AllHelperAgents.LoggerAgent.LogVal('current url', absUrl.AbsUrl);
      if (absUrl.AbsUrl.indexOf(SharedConst.Const.UrlSuffix.Login) > -1) {
        toReturn = scWindowType.LoginPage;
      }
      else if (new RegExp(SharedConst.Const.Regex.ContentEditor).test(absUrl.AbsUrl)) {
        toReturn = scWindowType.ContentEditor;
      }
      else if (absUrl.AbsUrl.toLowerCase().indexOf(SharedConst.Const.UrlSuffix.LaunchPad.toLowerCase()) > -1) {
        toReturn = scWindowType.Launchpad;
      }
      else if (this.__urlVsRegex(SharedConst.Const.Regex.PageType.Desktop, absUrl.AbsUrl)) {
        toReturn = scWindowType.Desktop;
      }
      else if (this.__urlVsRegex(SharedConst.Const.Regex.PageType.Preview, absUrl.AbsUrl)) {
        toReturn = scWindowType.Preview;
      }
      else if (this.__urlVsRegex(SharedConst.Const.Regex.PageType.Edit, absUrl.AbsUrl)) {
        toReturn = scWindowType.Edit;
      }
      else if (this.__urlVsRegex(SharedConst.Const.Regex.PageType.Normal, absUrl.AbsUrl)) {
        toReturn = scWindowType.Normal;
      }
      else {
        toReturn = scWindowType.Unknown;
      }
    } else {
      this.AllHelperAgents.LoggerAgent.Error(this.CalcPageTypeFromHref.name, 'null url');
    }
    this.AllHelperAgents.LoggerAgent.FuncEnd(this.CalcPageTypeFromHref.name, scWindowType[toReturn]);
    return toReturn;
  }
}