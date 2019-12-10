class Utilities extends ManagerBase {
  TimeNicknameFavStr(data: IDataOneWindow): string {
    return this.MakeFriendlyDate(data.TimeStamp) + ' - ' + data.NickName + ' - ' + (data.IsFavorite ? 'Favorite' : '--');
  }
  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStartName(Utilities.name);
    xyyz.debug.FuncEndName(Utilities.name);
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

  MakeFriendlyDate(date: Date) {
    var toReturn = date.toDateString() + ' ' + date.toLocaleTimeString();
    return toReturn;
  }
}