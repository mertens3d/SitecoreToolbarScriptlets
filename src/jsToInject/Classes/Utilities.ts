import { Hub } from '../Managers/Hub';
import { ManagerBase } from '../_first/_ManagerBase';
import { scWindowType } from '../Enums/scWindowType';
import { IDataOneWindowStorage } from '../Interfaces/IDataOneWindowStorage';
import { IDataOneIframe } from '../Interfaces/IDataOneIframe';
import { IDataBrowserWindow } from '../Interfaces/IDataBrowserWindow';
import { IDataOneDoc } from '../Interfaces/IDataOneDoc';

export class Utilities extends ManagerBase {
   
  SelectHeaderStr(): string {
    let toReturn: string = '';
    // '    Time Stamp          - Page Type - Nickname       - Favorite?';

    toReturn += this.Buffer('...Time Stamp', 23, '.', false);
    toReturn += this.Buffer('- Page Type', 20, '.', false, false);
    toReturn += this.Buffer('- Nickname', 16, '.', false, false);
    toReturn += this.Buffer('- Fav.', 4, '.', false);

    return toReturn;
  }
  MakeSelectorFromId(TabId: string): any {
    return '[id=' + TabId + ']';
  }
  DateOneIframeFactory(iframeElem: HTMLIFrameElement, parentDocument: IDataOneDoc, nickname: string): IDataOneIframe {
    var toReturn: IDataOneIframe = {
      Index: -1,
      IframeElem: iframeElem,
      Id: this.GuidMan().NewGuid(),
      Zindex: iframeElem.style.zIndex ? parseInt(iframeElem.style.zIndex) : -1,
      Nickname: nickname,
      ContentDoc: this.DataOneContentDocFactoryFromIframe(iframeElem, parentDocument, nickname),
    };

    return toReturn;
  }

  DataOneContentDocFactoryFromIframe(IframeElem: HTMLIFrameElement, parentDocument: IDataOneDoc, nickname: string): IDataOneDoc {
    var toReturn: IDataOneDoc = {
      ParentDoc: parentDocument,
      Document: IframeElem.contentDocument,
      HasParentDesktop: false,
      XyyzId: this.GuidMan().NewGuid(),
      IsCEDoc: false,
      ParentDesktop: null,
      Nickname: nickname + ' - content doc'
    }
    return toReturn;
  }

  TimeNicknameFavStr(data: IDataOneWindowStorage): string {
    var typeStr: string = (data.WindowType === scWindowType.Unknown) ? '?' : scWindowType[data.WindowType];

    return this.MakeFriendlyDate(data.TimeStamp)
      + ' - ' + this.Buffer(typeStr, 17, ' ', false)
      + ' - ' + this.Buffer(data.NickName, 16, ' ', false)
      + ' - ' + this.Buffer((data.IsFavorite ? '*' : ' '), 1);
  }

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(Utilities.name);
    xyyz.debug.FuncEnd(Utilities.name);
  }

  Buffer(str: string, desiredLength: number, buffChar = ' ', bufferLEft: Boolean = true, useNbsp: boolean = true): string {
    var toReturn = str;

    if (buffChar.length === 0) {
      buffChar = ' ';
    }

    if (toReturn.length > desiredLength) {
      if (desiredLength > 6) {
        toReturn = toReturn.substring(0, desiredLength - 3) + '...';
      } else {
        toReturn = toReturn.substring(0, desiredLength);
      }
    }

    if (toReturn.length < desiredLength) {
      var spacesNeeded = desiredLength - toReturn.length;
      if (buffChar === ' ' && useNbsp) {
        buffChar = '&nbsp;';
      }
      for (var idx = 0; idx < spacesNeeded; idx++) {
        if (bufferLEft) {
          toReturn = buffChar + toReturn;
        } else {
          toReturn = toReturn + buffChar;
        }
      }
    }
    return toReturn;
  }

  MakeFriendlyDate(date: Date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = this.Utilites().Buffer(date.getDay().toString(), 2, '0');
    var min = this.Utilites().Buffer(date.getMinutes().toString(), 2, '0');
    var hoursRaw = date.getHours();
    var ampm = hoursRaw >= 12 ? 'pm' : 'am';

    hoursRaw = hoursRaw % 12;

    var hourClean = hoursRaw ? hoursRaw : 12; // the hour '0' should be '12'
    var hourCleanStr: string = this.Utilites().Buffer(hourClean.toString(), 2, '0');

    var toReturn = year + '.' + month + '.' + day + ' ' + hourCleanStr + ':' + min + ' ' + ampm;
    return toReturn;
  }
}