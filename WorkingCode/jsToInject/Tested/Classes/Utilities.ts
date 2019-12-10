class Utilities extends ManagerBase {
  TimeNicknameFavStr(data: IDataOneWindow): string {
    return this.MakeFriendlyDate(data.TimeStamp) + ' - ' + data.NickName + ' - ' + (data.IsFavorite ? 'Favorite' : '--');
  }
  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStartName(Utilities.name);
    xyyz.debug.FuncEndName(Utilities.name);
  }

  MakeFriendlyDate(date: Date) {
    var toReturn = date.toDateString() + ' ' + date.toLocaleTimeString();
    return toReturn;
  }
}