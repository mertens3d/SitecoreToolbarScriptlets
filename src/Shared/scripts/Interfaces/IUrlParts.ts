export interface IGenericUrlParts {
  Anchor: string,
  FilePath: string,
  HasError: boolean,
  HostAndPort: string;
  OriginalRaw: string,
  Parameters: URLSearchParams;
  Protocol: string,
}