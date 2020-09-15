import { SharedConst } from "../SharedConst";
import { Guid } from "./Guid";

export class GuidData {
  private static ConstEmptyGuid: string = '00000000-0000-0000-0000-000000000000';
  readonly Raw: string; 

  constructor(raw: string = null) {
    if (!raw) {
      this.Raw = GuidData.ConstEmptyGuid;
    }
    else {
      if (Guid.IsValidGuidStr(raw)) {
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

  
}