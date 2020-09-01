import { SharedConst } from "../SharedConst";

export class Guid {
  private static ConstEmptyGuid: string = '00000000-0000-0000-0000-000000000000';
  private static ConstEmptyBracedGuid: string = '{00000000-0000-0000-0000-000000000000}';
  //private ConstAllZeros: string = '00000000000000000000000000000000';

  private static ShortGuidLength: number = 4;
  //AsBracedGuid: string = this.ConstEmptyBracedGuid;
  readonly Type: "Guid";

  readonly StorageType: string = 'Guid';
  readonly Raw: string;
   Flag: string = '';

  constructor(raw: string = null) {

    this.StorageType = 'GuidAsString';
    this.Type = 'Guid';
    if (!raw) {
      this.Raw = Guid.ConstEmptyGuid;
    } else {
      if (Guid.IsValidGuidStr(raw)) {
        this.Raw = this.GuidStrWithDashes(raw);
      } else {
        throw ('Invalid GUID string: ' + raw);
      }
    }
  }

  static FixStorageGuidObjects(obj: any) {


    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {

          this.FixStorageGuidObjects(obj[property]);

        } else {

          if (obj.hasOwnProperty('StorageType') && obj[ 'StorageType'] == 'GuidAsString') {
            console.log('====================== has it')
            try {
              let newGuid = new Guid(obj.Raw);
              obj = newGuid;
              obj.Flag = 'dog';
              
            } catch (ex) {
              console.log('That didnt work: ')
            }
          }
          console.log('property: ' + property + "  value: " + obj[property] + "  type: " + typeof obj[property]);
        }
      }
    }
  }

  private GuidStrWithDashes(val: string): string {
    let toReturn: string = '';
    let withoutDashes: string = val.replace(/-/g, '');

    var parts = [];
    if (withoutDashes.length !== 32) {
      throw (this.GuidStrWithDashes.name + ' - Wrong count wanted: ' + 32 + " got: " + withoutDashes.length + ' (without dashes) ' + withoutDashes);
    }

    parts.push(withoutDashes.slice(0, 8));
    parts.push(withoutDashes.slice(8, 12));
    parts.push(withoutDashes.slice(12, 16));
    parts.push(withoutDashes.slice(16, 20));
    parts.push(withoutDashes.slice(20, 32));

    toReturn = parts.join('-');

    return toReturn;
  }

  AsBracedGuid(): string {
    return '{' + this.Raw + "}";
  }

  ToString(): string {
    return this.Raw;
  }

  static GetEmptyGuid(): Guid {
    return new Guid();
  }

  private getRandomGuidString(): string {
    var toReturn: string;

    var temp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    toReturn = temp.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;

      var v = c == 'x' ? r : (r & 0x3 | 0x8);

      return v.toString(16);
    });

    return toReturn;
  }

  MakeNewRandomGuid(): Guid {
    let randomStr: string = this.getRandomGuidString();
    return this.MakeGuidFromString(randomStr, true);
  }

  static NewRandomGuid(): Guid {
    //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    let newGuid: Guid = new Guid();
    var toReturn: Guid = newGuid.MakeNewRandomGuid();
    return toReturn;
  }

  AsShort(): string {
    var toReturn: string = '{error}';

    toReturn = this.Raw.substr(0, Guid.ShortGuidLength);

    return toReturn;
  }

  FormatJustNumbers(str: string): string {
    return str.replace(SharedConst.Const.Regex.CleanGuid, '');
  }

  static IsValidGuidStr(candidateStr: string): boolean {
    let toReturn: boolean = false;
    let regexGuid: string = '^[\}]?[0-9a-f]{8}[\-]?[0-9a-f]{4}[\-]?[0-9a-f]{4}[\-]?[0-9a-f]{4}[\-]?[0-9a-f]{12}[\}]?$';
    let pattern: RegExp = new RegExp(regexGuid, 'i');

    toReturn = pattern.test(candidateStr);
    return toReturn;
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
    let toReturn: Guid = new Guid(val);

    return toReturn;
  }

  static ParseGuid(val: string, throwOnError: boolean): Guid {
    let newGuid: Guid = new Guid();

    return newGuid.MakeGuidFromString(val, throwOnError);
  }
};