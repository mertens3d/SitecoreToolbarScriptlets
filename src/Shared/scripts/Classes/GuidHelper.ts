import { IGuid } from "../Interfaces/IGuid";

export class GuidHelper {
  ShortGuidLength: 4;
  EmptyGuid(): IGuid {
    return this.ParseGuid('00000000-0000-0000-0000-000000000000');
  }
  NewGuid(): IGuid {
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

  ShortGuid(Id: IGuid): string {
    var toReturn: string = '{error}';
    if (Id && Id.asString.length > this.ShortGuidLength) {
      toReturn = Id.asString.substr(0, this.ShortGuidLength);
    }
    return toReturn;
  }

  ParseGuid(val: string): IGuid {
    let toReturn: IGuid = {
      asString: val,
      asShort: ''
    }

    toReturn.asShort = this.ShortGuid(toReturn);

    return toReturn
  }
}