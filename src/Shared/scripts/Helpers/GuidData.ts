import { SharedConst } from "../SharedConst";

export class GuidData {
  private static ConstEmptyGuid: string = '00000000-0000-0000-0000-000000000000';
  readonly Type: "Guid";
  readonly StorageType: string = 'GuidAsString';
  readonly Raw: string; // source of truth

  constructor(raw: string = null) {
    this.StorageType = 'GuidAsString';
    this.Type = 'Guid';
    if (!raw) {
      this.Raw = GuidData.ConstEmptyGuid;
    }
    else {
      if (GuidData.IsValidGuidStr(raw)) {
        this.Raw = this.GuidStrWithDashes(raw);
      }
      else {
        throw ('Invalid GUID string: ' + raw);
      }
    }
  }

  GuidStrWithDashes(val: string): string {
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

  static GetEmptyGuid(): GuidData {
    return new GuidData();
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
}