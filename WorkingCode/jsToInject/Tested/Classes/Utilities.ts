class Utilities extends ManagerBase {
  TimeNicknameFavStr(data: IDataOneWindowStorage): string {
    var typeStr: string = (data.WindowType === scWindowType.Unknown) ? '?' : scWindowType[data.WindowType];

    return this.MakeFriendlyDate(data.TimeStamp)
      + ' - ' + this.Buffer(typeStr, 17, ' ', false)
      + ' - ' + this.Buffer(data.NickName, 16, ' ' , false) 
      + ' - ' + this.Buffer((data.IsFavorite ? '*' : ' '), 1);
  }

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(Utilities.name);
    xyyz.debug.FuncEnd(Utilities.name);
  }

  //GetEnumTextValue(myEnum: any) {
  //  var toReturn: string = '{unknown}';

  //  for (var enumMember in myEnum) {
  //    var isValueProperty = parseInt(enumMember, 10) >= 0
  //    if (isValueProperty) {
  //      console.log("enum member: ", myEnum[enumMember]);
  //    }
  //  }

  //  return toReturn;
  //}

  Buffer(str: string, desiredLength: number, buffChar = ' ', bufferLEft: Boolean = true): string {
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
      if (buffChar === ' ') {
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