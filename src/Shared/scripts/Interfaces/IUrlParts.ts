import { IOneParamPair } from "./IOneParamPair";

export interface IGenericUrlParts {
  Anchor: string,
  FilePath: string,
  HasError: boolean,
  HostAndPort: string;
  OriginalRaw: string,
  UrlSearchParameters: URLSearchParams;
  Protocol: string,
}