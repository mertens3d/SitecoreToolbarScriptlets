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
    var result = data.TimeNicknameFavStr;
    result = result.replace(new RegExp(/&nbsp;/ig), '');
    return result;
  }

  TimeNicknameFavStr(data: IDataOneWindowStorage): string {
    var typeStr: string = '';
    if (data.WindowType === scWindowType.ContentEditor) {
      typeStr = 'Cont Ed';
    }
    else if (data.WindowType === scWindowType.Desktop) {
      typeStr = 'Desktop';
    }
    //= (data.WindowType === scWindowType.Unknown) ? '?' : scWindowType[data.WindowType];
    var activeCeNode: string = '';
    for (var idx = 0; idx < data.AllCEAr.length; idx++) {
      var candidateCe = data.AllCEAr[idx];
      for (var jdx = 0; jdx < candidateCe.AllTreeNodeAr.length; jdx++) {
        var candidateNode = candidateCe.AllTreeNodeAr[jdx];
        if (candidateNode.IsActive) {
          var lvl2Node: string = '';
          if (jdx >= 2) {
            lvl2Node = candidateCe.AllTreeNodeAr[1].NodeFriendly + '/';
          }
          activeCeNode = lvl2Node + candidateNode.NodeFriendly;
          break;
        }
      }
    }
    let toReturn = StaticHelpers.BufferString(data.TimeStampFriendly, PopConst.Const.SnapShotFormat.lenTimestamp, BufferChar.space, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(typeStr, PopConst.Const.SnapShotFormat.lenPageType, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(data.NickName, PopConst.Const.SnapShotFormat.lenNickname, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(activeCeNode, PopConst.Const.SnapShotFormat.lenActiveNode, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString((data.Flavor === SnapShotFlavor.Favorite ? '*' : ''), PopConst.Const.SnapShotFormat.lenFavorite, BufferChar.Nbsp, BufferDirection.right)
      //+ PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString((data.Flavor === SnapShotFlavor.Autosave ? 'A' : ' '), 1, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(data.Id.AsShort, PopConst.Const.SnapShotFormat.lenShortId, BufferChar.Nbsp, BufferDirection.right)
      + PopConst.Const.SnapShotFormat.colSep + StaticHelpers.BufferString(data.AllCEAr.length.toString(), PopConst.Const.SnapShotFormat.lenCeCount, BufferChar.Nbsp, BufferDirection.right);
    return toReturn;
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
      var ampm = hoursRaw >= 12 ? 'p' : 'a';
      hoursRaw = hoursRaw % 12;
      var hourClean = hoursRaw ? hoursRaw : 12; // the hour '0' should be '12'
      var hourCleanStr: string = StaticHelpers.BufferString(hourClean.toString(), 2, BufferChar.Zero, BufferDirection.left);
      //year + '.' +
      toReturn = month + '.' + day + ' ' + hourCleanStr + ':' + min + ' ' + ampm;
    }
    else {
      toReturn = '{error}';
      this.Logger.ErrorAndThrow(this.MakeFriendlyDate.name, 'no date provided');
    }
    return toReturn;
  }
}