class Utilities extends ManagerBase {
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