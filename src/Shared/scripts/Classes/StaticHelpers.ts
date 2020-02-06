import { MsgFlag } from "../Enums/MessageFlag";
import { scWindowType } from "../Enums/scWindowType";

export class StaticHelpers {
  static WindowTypeAsString(windowType: scWindowType) {
    return scWindowType[windowType];
  }

  static BufferString(str: string, desiredLength: number, buffChar = ' ', bufferLEft: Boolean = true, useNbsp: boolean = true): string {
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

  static MsgFlagAsString(msg: MsgFlag): string {
    var toReturn: string = "{error}";
    if (msg) {
      try {
        toReturn = MsgFlag[msg];
      } catch (e) {
      }
    }

    return 'flag: ' + toReturn;
  }
}