import { scWindowType } from "../Enums/scWindowType";

export interface GenericUrlParts {
  OriginalRaw: string,
  FilePath: string,
  HostAndPort: string;
  ScWindowType: scWindowType,
  Protocol: string,
  Anchor: string,
  Parameters: URLSearchParams;
  HasError: boolean,
}