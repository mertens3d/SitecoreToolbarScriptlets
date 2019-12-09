class Utilities extends SpokeBase {
  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(Utilities.name);
    xyyz.debug.FuncEnd(Utilities.name);
  }

  MakeFriendlyDate(date: Date) {
    var toReturn = date.toDateString() + ' ' + date.toTimeString();
    return toReturn;
  }

  Uuidv4(): string {

        //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    var toReturn = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      var toReturn = v.toString(16);
      return toReturn;
    });

    return toReturn;
  }
}