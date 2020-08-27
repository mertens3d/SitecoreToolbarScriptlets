import { HelperBase } from '../Classes/HelperBase';
import { StaticHelpers } from '../Classes/StaticHelpers';
import { BufferChar } from '../Enums/BufferChar';
import { BufferDirection } from '../Enums/BufferDirection';
import { IDataOneWindowStorage } from '../Interfaces/IDataOneWindowStorage';
import { scWindowType } from '../Enums/scWindowType';
import { PopConst } from '../../../PopUp/scripts/Classes/PopConst';
import { SnapShotFlavor } from '../Enums/SnapShotFlavor';

export class UtilityHelper extends HelperBase {
  MakeSelectorFromId(TabId: string): any {
    return '[id=' + TabId + ']';
  }

  TimeNicknameFavStrForConfirmation(data: IDataOneWindowStorage): string {
    var result = data.TimeStampFriendly + ' ' + data.NickName + ' ' + data.Id.AsShort;
    result = result.replace(new RegExp(/&nbsp;/ig), '');
    return result;
  }

 

  MakeFriendlyDate(date: Date): string {
    var toReturn: string = '';

    var workingDate = new Date(date);

    if (workingDate) {
      //var year = date.getFullYear();
      var month = StaticHelpers.BufferString((workingDate.getMonth() + 1).toString(), 2, BufferChar.Zero, BufferDirection.left);
      var day = StaticHelpers.BufferString(workingDate.getDate().toString(), 2, BufferChar.Zero, BufferDirection.left);
      var min = StaticHelpers.BufferString(workingDate.getMinutes().toString(), 2, BufferChar.Zero, BufferDirection.left);
      var hoursRaw = workingDate.getHours();
      //var ampm = hoursRaw >= 12 ? 'p' : 'a';
      //hoursRaw = hoursRaw % 12;
      var hourClean = hoursRaw ? hoursRaw : 12; // the hour '0' should be '12'
      var hourCleanStr: string = StaticHelpers.BufferString(hourClean.toString(), 2, BufferChar.Zero, BufferDirection.left);
      //year + '.' +
      toReturn = month + '.' + day + ' ' + hourCleanStr + ':' + min;// + ' ' + ampm;
    }
    else {
      toReturn = '{error}';
      this.Logger.ErrorAndThrow(this.MakeFriendlyDate.name, 'no date provided');
    }
    return toReturn;
  }
}