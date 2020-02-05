import { GuidHelper } from './GuidHelper';
import { BaseDebug } from './debug';
import { IDataOneWindowStorage } from '../Interfaces/IDataOneWindowStorage';
import { scWindowType } from '../Enums/scWindowType';
import { MsgFromXBase } from '../Interfaces/MsgFromXBase';
import { MsgFlag } from '../Enums/MessageFlag';
import { StaticHelpers } from './StaticHelpers';

export class Utilities {
  private GuidMan: GuidHelper;
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

    toReturn += StaticHelpers.BufferString('...Time Stamp', 23, '.', false);
    toReturn += StaticHelpers.BufferString('- Page Type', 20, '.', false, false);
    toReturn += StaticHelpers.BufferString('- Nickname', 16, '.', false, false);
    toReturn += StaticHelpers.BufferString('- Fav.', 4, '.', false);
    toReturn += StaticHelpers.BufferString('- Node.', 10, '.', false);

    return toReturn;
  }
  MakeSelectorFromId(TabId: string): any {
    return '[id=' + TabId + ']';
  }

  TimeNicknameFavStr(data: IDataOneWindowStorage): string {
    var typeStr: string = (data.WindowType === scWindowType.Unknown) ? '?' : scWindowType[data.WindowType];

    return this.MakeFriendlyDate(data.TimeStamp)
      + ' - ' + StaticHelpers.BufferString(typeStr, 17, ' ', false)
      + ' - ' + StaticHelpers.BufferString(data.NickName, 16, ' ', false)
      + ' - ' + StaticHelpers.BufferString((data.IsFavorite ? '*' : ' '), 1)
      + ' - ' + StaticHelpers.BufferString((data.IsAutoSave ? 'A' : ' '), 1);
  }

  MakeFriendlyDate(date: Date) {
    var year = date.getFullYear();
    var month = StaticHelpers.BufferString(date.getMonth().toString(), 2, '0');
    var day = StaticHelpers.BufferString(date.getDay().toString(), 2, '0');
    var min = StaticHelpers.BufferString(date.getMinutes().toString(), 2, '0');
    var hoursRaw = date.getHours();
    var ampm = hoursRaw >= 12 ? 'pm' : 'am';

    hoursRaw = hoursRaw % 12;

    var hourClean = hoursRaw ? hoursRaw : 12; // the hour '0' should be '12'
    var hourCleanStr: string = StaticHelpers.BufferString(hourClean.toString(), 2, '0');

    var toReturn = year + '.' + month + '.' + day + ' ' + hourCleanStr + ':' + min + ' ' + ampm;
    return toReturn;
  }
}