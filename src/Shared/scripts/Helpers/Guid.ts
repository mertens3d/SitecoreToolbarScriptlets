import { SharedConst } from "../SharedConst";

export class Guid {
  private ConstEmptyGuid: string = '00000000-0000-0000-0000-000000000000';
  private ConstEmptyBracedGuid: string = '{00000000-0000-0000-0000-000000000000}';
  private ConstAllZeros: string = '00000000000000000000000000000000';

  ShortGuidLength: number = 4;
  AsBracedGuid: string = this.ConstEmptyBracedGuid;
  readonly Type: "Guid";

  private SourceOfTruth: string;

  constructor() {
    this.SourceOfTruth = this.ConstEmptyGuid;
  }

  //EmptyGuidJustNumbers(): string {
  //  return this.ConstAllZeros;
  //}

  ToString(): string {
    return this.SourceOfTruth;
  }

  static GetEmptyGuid(): Guid {
    let toReturn = new Guid();
    return Guid.ParseGuid('00000000-0000-0000-0000-000000000000', true);
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

  MakeNewGuid(): Guid {
    return this.MakeGuidFromString(this.newGuidString(), true);
  }

  static NewGuid(): Guid {
    //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    let newGuid: Guid = new Guid();
    var toReturn: Guid = newGuid.MakeNewGuid();
    return toReturn;
  }

  AsShort(): string {
    var toReturn: string = '{error}';

    toReturn = this.SourceOfTruth.substr(0, this.ShortGuidLength);

    return toReturn;
  }

  FormatJustNumbers(str: string): string {
    return str.replace(SharedConst.Const.Regex.CleanGuid, '');
  }

  //FormatAsBracedGuid(throwOnError: boolean): string {
  //  //https://stackoverflow.com/questions/25131143/javascript-string-to-guid

  //  var GUID;

  //  try {
  //    var parts = [];
  //    if (str.length !== 32 && throwOnError) {
  //      //str = this.EmptyGuidJustNumbers();
  //      throw (this.FormatAsBracedGuid.name + ' - Wrong count wanted: ' + 32 + " got: " + str.length)
  //    }

  //    parts.push(str.slice(0, 8));
  //    parts.push(str.slice(8, 12));
  //    parts.push(str.slice(12, 16));
  //    parts.push(str.slice(16, 20));
  //    parts.push(str.slice(20, 32));

  //    GUID = '{' + parts.join('-') + '}';
  //  } catch (ex) {
  //    throw (this.FormatAsBracedGuid.name + ' ' + ex);
  //  }
  //  return GUID;
  //}

  MakeGuidFromString(val: string, throwOnError: boolean): Guid {

    let toReturn: Guid = new Guid();
    this.SourceOfTruth = val;

    return toReturn;
  }

  static ParseGuid(val: string, throwOnError: boolean): Guid {
    let newGuid: Guid = new Guid();

    return newGuid.MakeGuidFromString(val, throwOnError);
  }
};