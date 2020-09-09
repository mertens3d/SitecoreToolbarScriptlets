import { ScWindowType } from "../Enums/scWindowType";

export interface GenericUrlParts {
  OriginalRaw: string,
  FilePath: string,
  HostAndPort: string;
  ScWindowType: ScWindowType,
  Protocol: string,
  Anchor: string,
  Parameters: URLSearchParams;
  HasError: boolean,
}