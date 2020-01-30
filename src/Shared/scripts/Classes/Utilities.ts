import { GuidHelper } from './GuidHelper';
import { BaseDebug } from './debug';
import { IDataOneWindowStorage } from '../Interfaces/IDataOneWindowStorage';
import { scWindowType } from '../Enums/scWindowType';
import { MsgFromXBase } from '../Interfaces/MsgFromXBase';
import { MsgFlag } from '../Enums/MessageFlag';

export class Utilities {
private  GuidMan: GuidHelper;
   private Debug: BaseDebug;

  constructor(debug: BaseDebug) {
    debug.FuncStart(Utilities.name);
    this.Debug = debug;
    this.GuidMan = new GuidHelper(debug);
    //this.Utilities = new Utilities(debug);
    debug.FuncEnd(Utilities.name);
  }

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

  MsgFlagAsString(msg: MsgFromXBase): string {
    var toReturn: string = "{error}";
    if (this.Debug.IsNotNullOrUndefinedBool('message', msg)) {
      try {
        toReturn =  MsgFlag[msg.MsgFlag];

      } catch (e) {

      }

    }

    return 'flag: ' + toReturn;
  }

  TimeNicknameFavStr(data: IDataOneWindowStorage): string {
    var typeStr: string = (data.WindowType === scWindowType.Unknown) ? '?' : scWindowType[data.WindowType];

    return this.MakeFriendlyDate(data.TimeStamp)
      + ' - ' + this.Buffer(typeStr, 17, ' ', false)
      + ' - ' + this.Buffer(data.NickName, 16, ' ', false)
      + ' - ' + this.Buffer((data.IsFavorite ? '*' : ' '), 1);
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
    var day = this.Buffer(date.getDay().toString(), 2, '0');
    var min = this.Buffer(date.getMinutes().toString(), 2, '0');
    var hoursRaw = date.getHours();
    var ampm = hoursRaw >= 12 ? 'pm' : 'am';

    hoursRaw = hoursRaw % 12;

    var hourClean = hoursRaw ? hoursRaw : 12; // the hour '0' should be '12'
    var hourCleanStr: string = this.Buffer(hourClean.toString(), 2, '0');

    var toReturn = year + '.' + month + '.' + day + ' ' + hourCleanStr + ':' + min + ' ' + ampm;
    return toReturn;
  }
}