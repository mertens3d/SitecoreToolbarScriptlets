import { IDataOneWindowStorage } from '../Interfaces/IDataOneWindowStorage';
import { scWindowType } from '../Enums/scWindowType';
import { StaticHelpers } from '../Classes/StaticHelpers';
import { SnapShotFlavor } from '../Enums/SnapShotFlavor';
import { BufferChar } from '../Enums/BufferChar';
import { BufferDirection } from '../Enums/BufferDirection';
import { HelperBase } from '../Classes/HelperBase';
import { SharedConst } from '../SharedConst';
export class UtilityHelper extends HelperBase {
  lenTimestamp: number = 13;
  lenNickname: number = 16;
  lenPageType: number = 7;
  lenPrefix: number = 6;
  lenShortId: number = 4;
  colSep: string = ' - ';
  lenCeCount: number = 3;
  lenActiveNode: number = 16;
  lenFavorite: number = 3;
  SelectHeaderStr(prefix: string): string {
    // '    Time Stamp          - Page Type - Nickname       - Favorite?';
    let toReturn: string = StaticHelpers.BufferString('Time Stamp', this.lenTimestamp, BufferChar.Period, BufferDirection.right)
      + this.colSep + StaticHelpers.BufferString('Type', this.lenPageType, BufferChar.Period, BufferDirection.right)
      + this.colSep + StaticHelpers.BufferString('Nickname', this.lenNickname, BufferChar.Period, BufferDirection.right)
      + this.colSep + StaticHelpers.BufferString('Active Node.', this.lenActiveNode, BufferChar.Period, BufferDirection.right)
      + this.colSep + StaticHelpers.BufferString('Fav.', this.lenFavorite, BufferChar.Period, BufferDirection.right)
      + this.colSep + StaticHelpers.BufferString('Id', this.lenShortId, BufferChar.Period, BufferDirection.right)
      + this.colSep + StaticHelpers.BufferString('#CE', this.lenCeCount, BufferChar.Period, BufferDirection.right);
    return toReturn;
  }
  MakeSelectorFromId(TabId: string): any {
    return '[id=' + TabId + ']';
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
    let toReturn = StaticHelpers.BufferString(this.MakeFriendlyDate(data.TimeStamp), this.lenTimestamp, BufferChar.space, BufferDirection.right)
      + this.colSep + StaticHelpers.BufferString(typeStr, this.lenPageType, BufferChar.Nbsp, BufferDirection.right)
      + this.colSep + StaticHelpers.BufferString(data.NickName, this.lenNickname, BufferChar.Nbsp, BufferDirection.right)
      + this.colSep + StaticHelpers.BufferString(activeCeNode, this.lenActiveNode, BufferChar.Nbsp, BufferDirection.right)
      + this.colSep + StaticHelpers.BufferString((data.Flavor == SnapShotFlavor.Favorite ? '*' : ''), this.lenFavorite, BufferChar.Nbsp, BufferDirection.right)
      //+ this.colSep + StaticHelpers.BufferString((data.Flavor == SnapShotFlavor.Autosave ? 'A' : ' '), 1, BufferChar.Nbsp, BufferDirection.right)
      + this.colSep + StaticHelpers.BufferString(data.Id.AsShort, this.lenShortId, BufferChar.Nbsp, BufferDirection.right)
      + this.colSep + StaticHelpers.BufferString(data.AllCEAr.length.toString(), this.lenCeCount, BufferChar.Nbsp, BufferDirection.right);
    return toReturn;
  }
  TimeNicknameFavStrForConfirmation(data: IDataOneWindowStorage): string {
    var result = this.TimeNicknameFavStr(data);
    result = result.replace(new RegExp(/&nbsp;/ig), '');
    return result;
  }
  MakeFriendlyDate(date: Date): string {

    var toReturn: string = '';
    if (date) {
      var year = date.getFullYear();
      var month = StaticHelpers.BufferString((date.getMonth() + 1).toString(), 2, BufferChar.Zero, BufferDirection.left);
      var day =StaticHelpers.BufferString(date.getDate().toString(), 2, BufferChar.Zero, BufferDirection.left);
      var min = StaticHelpers.BufferString(date.getMinutes().toString(), 2, BufferChar.Zero, BufferDirection.left);
      var hoursRaw = date.getHours();
      var ampm = hoursRaw >= 12 ? 'p' : 'a';
      hoursRaw = hoursRaw % 12;
      var hourClean = hoursRaw ? hoursRaw : 12; // the hour '0' should be '12'
      var hourCleanStr: string = StaticHelpers.BufferString(hourClean.toString(), 2, BufferChar.Zero, BufferDirection.left);
      //year + '.' +
      toReturn = month + '.' + day + ' ' + hourCleanStr + ':' + min + ' ' + ampm;
    }
    else {
      toReturn = '{error}';
      this.Log.Error(this.MakeFriendlyDate.name, 'no date provided');
    }
    return toReturn;
  }

 

}