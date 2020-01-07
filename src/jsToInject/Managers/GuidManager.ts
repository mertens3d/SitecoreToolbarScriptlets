import { Hub } from '../Managers/Hub';
import { ManagerBase } from '../_first/_ManagerBase';

export class GuidManager extends ManagerBase {
  constructor(xyyz: Hub) {
    super(xyyz);
  }
  EmptyGuid(): IGuid {
    return this.ParseGuid(this.Const().GuidEmpty);
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
    if (Id && Id.asString.length > this.Const().Numbers.ShortGuidLength) {
      toReturn = Id.asString.substr(0, this.Const().Numbers.ShortGuidLength);
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