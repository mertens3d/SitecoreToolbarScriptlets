import { IGuid } from "../Interfaces/IGuid";
import { HelperBase } from "../Classes/HelperBase";
import { SharedConst } from "../SharedConst";
import { IGuidHelper } from "../Interfaces/IGuidHelper";

export class GuidHelper extends HelperBase implements IGuidHelper {
  ShortGuidLength: number = 4;

  EmptyGuidJustNumbers(): string {
    return '00000000000000000000000000000000'
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
      this.Logger.DebugIGuid(Id);
      this.Logger.LogVal('Length', Id.AsString.length);
      this.Logger.LogVal('ShortLength', this.ShortGuidLength);
    }
    return toReturn;
  }

  FormatJustNumbers(str: string): string {
    return str.replace(SharedConst.Const.Regex.CleanGuid, '');
  }

  FormatAsBracedGuid(str: string): string {
    //https://stackoverflow.com/questions/25131143/javascript-string-to-guid

    var GUID;

    try {
      var parts = [];
      if (str.length !== 32) {
        //str = this.EmptyGuidJustNumbers();
        this.Logger.ErrorAndThrow(this.FormatAsBracedGuid.name, 'Wrong count wanted: ' + 32 + " got: " + str.length);
      }

      parts.push(str.slice(0, 8));
      parts.push(str.slice(8, 12));
      parts.push(str.slice(12, 16));
      parts.push(str.slice(16, 20));
      parts.push(str.slice(20, 32));

      GUID = '{' + parts.join('-') + '}';
    } catch (ex) {
      this.Logger.ErrorAndThrow(this.FormatAsBracedGuid.name, ex);
      
    }
    return GUID;
  }

  ParseGuid(val: string): IGuid {
    let justNumbers = this.FormatJustNumbers(val);
    let guidFormat = this.FormatAsBracedGuid(justNumbers);

    let toReturn: IGuid = {
      AsString: justNumbers,
      AsBracedGuid: guidFormat,
      AsShort: '',
      Type: 'IGuid'
    }

    toReturn.AsShort = this.ShortGuid(toReturn);

    return toReturn
  }
}