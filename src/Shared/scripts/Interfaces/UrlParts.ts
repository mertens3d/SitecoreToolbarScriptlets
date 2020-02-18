import { scWindowType } from "../Enums/scWindowType";
import { OneParamPair } from "./OneParamPair";


export interface UrlParts {
  OriginalRaw: string,
  FilePath: string,
  HostAndPort: string;
  ScWindowType: scWindowType,
  Protocol: string,
  Anchor: string,
  Parameters: OneParamPair[],
  HasError: boolean,
}