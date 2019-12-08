class Utilities extends SpokeBase {
  constructor(xyyz: Hub) {
    super(xyyz)
    xyyz.debug.FuncStart(Utilities.name);
    xyyz.debug.FuncEnd(Utilities.name);
  }
  MakeFriendlyDate(date) {
    var toReturn = date.toDateString() + ' ' + date.toTimeString();
    return toReturn;
  }

  Uuidv4() {
    //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}