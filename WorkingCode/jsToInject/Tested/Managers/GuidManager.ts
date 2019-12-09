class GuidManager extends ManagerBase {
    
  constructor(xyyz: Hub) {
    super(xyyz);
  }
  EmptyGuid(): IGuid{
    return this.ParseGuid(this.Xyyz.Const.GuidEmpty);
  }
  Uuidv4(): IGuid {

    var toReturn: IGuid;
    //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    var temp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      var toReturn = v.toString(16);


      return toReturn;
    });

    toReturn = this.ParseGuid(temp);
    return toReturn;
  }
  ParseGuid(val: string): IGuid {
    let toReturn: IGuid = {
      Value: val
    }
    return toReturn
  }
}