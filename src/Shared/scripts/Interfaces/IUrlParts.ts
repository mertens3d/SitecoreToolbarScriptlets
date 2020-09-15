
export interface IGenericUrlParts {
  OriginalRaw: string,
  FilePath: string,
  HostAndPort: string;
  Protocol: string,
  Anchor: string,
  Parameters: URLSearchParams;
  HasError: boolean,
}