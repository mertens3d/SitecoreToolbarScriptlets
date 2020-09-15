import { MsgFlag } from "../Enums/1xxx-MessageFlag";
import { SettingKey } from "../Enums/3xxx-SettingKey";
import { BufferChar } from "../Enums/BufferChar";
import { BufferDirection } from "../Enums/BufferDirection";
import { ScWindowType } from "../Enums/scWindowType";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";

export class StaticHelpers {
  static MinToMs(minutes: number) {
    return minutes * 60 * 1000;
  }
  static FlavorAsString(flavor: SnapShotFlavor): string {
    return 'Flavor.' + SnapShotFlavor[flavor] + '(' + flavor + ')';
  }

  static SettingKeyAsString(settingKey: SettingKey) {
    let toReturn: string = ''
    try {
      toReturn = 'SettingKey.' + SettingKey[settingKey] + '(' + settingKey + ')';
    } catch (err) {
      toReturn = err;
    }

    return toReturn;
  }

  static ScWindowTypeFriendly(windowType: ScWindowType) {
    return ScWindowType[windowType];
  }

  static MakeFriendlyDate(date: Date): string {
    var toReturn: string = '';

    var workingDate = new Date(date);

    if (workingDate) {
      var month = StaticHelpers.BufferString((workingDate.getMonth() + 1).toString(), 2, BufferChar.Zero, BufferDirection.left);
      var day = StaticHelpers.BufferString(workingDate.getDate().toString(), 2, BufferChar.Zero, BufferDirection.left);
      var min = StaticHelpers.BufferString(workingDate.getMinutes().toString(), 2, BufferChar.Zero, BufferDirection.left);
      var hoursRaw = workingDate.getHours();
      var hourClean = hoursRaw ? hoursRaw : 12; // the hour '0' should be '12'
      var hourCleanStr: string = StaticHelpers.BufferString(hourClean.toString(), 2, BufferChar.Zero, BufferDirection.left);
      toReturn = month + '.' + day + ' ' + hourCleanStr + ':' + min;
    }
    else {
      toReturn = '{error}';
      throw (this.MakeFriendlyDate.name, 'no date provided');
    }
    return toReturn;
  }

  private static getBuffChar(buffCharEnum: BufferChar) {
    var buffChar: string = ' ';
    if (buffCharEnum === BufferChar.space) {
      buffChar = ' ';
    } else if (buffCharEnum === BufferChar.Nbsp) {
      buffChar = '&nbsp;';
    }
    else if (buffCharEnum === BufferChar.Period) {
      buffChar = '.';
    }
    else if (buffCharEnum === BufferChar.Zero) {
      buffChar = '0';
    }

    return buffChar;
  }

  static BufferString(str: string, desiredLength: number, buffCharEnum: BufferChar, direction: BufferDirection): string {
    var toReturn = str;
    var buffChar: string = this.getBuffChar(buffCharEnum);

    if (toReturn.length > desiredLength) {
      if (desiredLength > 6) {
        toReturn = toReturn.substring(0, desiredLength - 3) + '...';
      } else {
        toReturn = toReturn.substring(0, desiredLength);
      }
    }

    if (toReturn.length < desiredLength) {
      var bufferCharNeeded = desiredLength - toReturn.length;

      for (var idx = 0; idx < bufferCharNeeded; idx++) {
        if (direction === BufferDirection.left) {
          toReturn = buffChar + toReturn;
        } else {
          toReturn = toReturn + buffChar;
        }
      }
    }
    return toReturn;
  }

  static MsgFlagAsString(msg: MsgFlag): string {
    var toReturn: string = "{error}";
    if (msg) {
      try {
        toReturn = 'MsgFlag.' + MsgFlag[msg] + '(' + msg + ')';
      } catch (e) {
      }
    }

    return 'flag: ' + toReturn;
  }
}