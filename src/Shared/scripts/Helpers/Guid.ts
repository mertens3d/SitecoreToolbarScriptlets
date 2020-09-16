import { GuidData } from "./GuidData";

export class Guid {

  private static ShortGuidLength: number = 4;

  static NewRandomGuid(): GuidData {
    //https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    let guidData: GuidData = new GuidData();

    //var toReturn: GuidData = newGuid.MakeNewRandomGuid();

    let newGuid = new Guid();
    let randomStr: string = newGuid.GetRandomGuidString();

    let toReturn = new GuidData(randomStr);
    return toReturn;
  }

  static IsValidGuidStr(candidateStr: string): boolean {
    let toReturn: boolean = false;
    let regexGuid: string = '^[\}]?[0-9a-f]{8}[\-]?[0-9a-f]{4}[\-]?[0-9a-f]{4}[\-]?[0-9a-f]{4}[\-]?[0-9a-f]{12}[\}]?$';
    let pattern: RegExp = new RegExp(regexGuid, 'i');

    toReturn = pattern.test(candidateStr);
    return toReturn;
  }

  static AsShort(guidData: GuidData): string {
    var toReturn: string = '{error}';

    toReturn = guidData.Raw.substr(0, Guid.ShortGuidLength);

    return toReturn;
  }

  static WithoutDashes(guiddata: GuidData) {
    let withoutDashes: string = guiddata.Raw.replace(/-/g, '');
    return withoutDashes;
  }

  static ParseGuid(val: string, throwOnError: boolean): GuidData {
    //let newGuid: GuidData = new GuidData();
    return new GuidData(val);
    //return newGuid.MakeGuidFromString(val, throwOnError);
  }

  MakeNewRandomGuid(): GuidData {
    let randomStr: string = this.GetRandomGuidString();
    return new GuidData(randomStr);
  }

  static GuidStrWithDashes(val: string): string {
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

  GetRandomGuidString(): string {
    var toReturn: string;

    var temp = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    toReturn = temp.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;

      var v = c == 'x' ? r : (r & 0x3 | 0x8);

      return v.toString(16);
    });

    return toReturn;
  }

  MakeGuidFromString(val: string, throwOnError: boolean): GuidData {
    let toReturn: GuidData = new GuidData(val);

    return toReturn;
  }
}