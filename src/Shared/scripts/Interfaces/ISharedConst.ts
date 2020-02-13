export interface ISharedConst {
  IterHelper: {
    GrowthPerIteration: number,
    MaxCount: {
      OverridePublishing: number,
      Default: number,
    },
    Timeouts: {
      Max: number,
      Default: number,
    },
  },
  Regex: {
    ContentEditor: RegExp,
    NbSp: RegExp,
    PageType: {
      Desktop: RegExp
      Edit: RegExp
      Normal: RegExp
      Preview: RegExp
    },
  },
  UrlSuffix: {
    Desktop: string,
    Login: string,
    LaunchPad: string,
    CE: string,
    None: string,
  },
}