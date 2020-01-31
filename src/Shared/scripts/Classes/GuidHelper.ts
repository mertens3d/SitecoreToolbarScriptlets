import { IGuid } from "../Interfaces/IGuid";
import { BaseDebug } from "./debug";

export class GuidHelper {
  ShortGuidLength: number = 4;
  private Debug: BaseDebug;

  constructor(debug: BaseDebug) {
    this.Debug = debug;
  }

  EmptyGuid(): IGuid {
    return this.ParseGuid('00000000-0000-0000-0000-000000000000');
  }

  private newGuidString(): string {
    var toReturn: string;

    var temp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    toReturn = temp.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;

      var v = c == 'x' ? r : (r & 0x3 | 0x8);

      return v.toString(16);
    });

    return toReturn;
  }
  NewGuid(): IGuid {
    //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    var toReturn: IGuid = this.ParseGuid(this.newGuidString());
    return toReturn;
  }

  private ShortGuid(Id: IGuid): string {
    var toReturn: string = '{error}';
    if (Id && Id.AsString.length > this.ShortGuidLength) {
      toReturn = Id.AsString.substr(0, this.ShortGuidLength);
    } else {
      this.Debug.DebugIGuid(Id);
      this.Debug.LogVal('Length', Id.AsString.length);
      this.Debug.LogVal('ShortLength', this.ShortGuidLength);
    }
    return toReturn;
  }

  ParseGuid(val: string): IGuid {
    let toReturn: IGuid = {
      AsString: val,
      AsShort: ''
    }

    toReturn.AsShort = this.ShortGuid(toReturn);

    return toReturn
  }
}