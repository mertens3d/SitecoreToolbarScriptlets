class Utilities {
  constructor() {

  }
  MakeFriendlyDate(date) {
    var toReturn = date.toDateString() + ' ' + date.toTimeString();
    //var day = date.getDate();
    //var month = date.getMonth();
    //var year = date.getFullYear();
    //var hour = date.getHour();
    //var Min = date.GetMinute();


    return toReturn;
  }


  Uuidv4() {
    https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}