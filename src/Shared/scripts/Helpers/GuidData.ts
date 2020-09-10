import { SharedConst } from "../SharedConst";
import { Guid } from "./Guid";

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
        this.Raw = Guid.GuidStrWithDashes(raw);
      }
      else {
        throw ('Invalid GUID string: ' + raw);
      }
    }
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