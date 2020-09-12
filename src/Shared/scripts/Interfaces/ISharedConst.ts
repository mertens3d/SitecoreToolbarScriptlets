﻿export interface ISharedConst {
  Debug: {
    ForceLoggingEnabled: boolean
  },
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
  Logger: {
    MinTimeDiffMs: number
  },
  ObjDiscriminator: {
    //DataOneTreeNode: string,
  },
  Settings: {
    Defaults: {
      EnableLogging: boolean,
      LogToStorage: boolean,
      UseCompactCss: boolean,
    }
  },
  Regex: {
    ContentEditor: RegExp,
    CleanGuid: RegExp,

    NbSp: RegExp,
    QueryStrSeparatorQuest: RegExp,
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
    AboutBlank: string,
  },
}