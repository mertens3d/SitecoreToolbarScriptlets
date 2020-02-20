import { MsgFlag } from "../Enums/MessageFlag";
import { scWindowType } from "../Enums/scWindowType";
import { CacheMode } from "../Enums/CacheMode";
import { BufferDirection } from "../Enums/BufferDirection";
import { BufferChar } from "../Enums/BufferChar";
import { BufferUseNbsp } from "../Enums/BufferUseNbsp";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { UrlParts } from "../Interfaces/UrlParts";
import { SettingKey } from "../Enums/SettingKey";

export class StaticHelpers {
  static MinToMs(minutes: number) {
    return minutes * 60 * 1000;
  }
  static FlavorAsString(flavor: SnapShotFlavor): string {
    return 'Flavor.' + SnapShotFlavor[flavor] + '(' + flavor + ')';
  }

  static SettingKeyAsString(settingKey: SettingKey) {
    return 'SettingKey.' + SettingKey[settingKey] + '(' + settingKey + ')';
  }

  static CacheModeAsString(cacheMode: CacheMode): string {
    return 'CacheMode.' + CacheMode[cacheMode] + ' (' + cacheMode + ')';
  }

  static WindowTypeAsString(windowType: scWindowType) {
    return scWindowType[windowType];
  }

  

  static BufferString(str: string, desiredLength: number, buffCharEnum: BufferChar, direction: BufferDirection): string {
    var toReturn = str;
    var buffChar: string = ' ';

    if (buffCharEnum === BufferChar.space) {
      buffChar = ' ';
    } else if (buffCharEnum == BufferChar.Nbsp) {
      buffChar = '&nbsp;';
    }
    else if (buffCharEnum == BufferChar.Period) {
      buffChar = '.';
    }
    else if (buffCharEnum == BufferChar.Zero) {
      buffChar = '0';
    }

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
        if (direction == BufferDirection.left) {
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
        toReturn = 'MsgFlag.' +  MsgFlag[msg] + '(' + msg + ')';
      } catch (e) {
      }
    }

    return 'flag: ' + toReturn;
  }
}