﻿export interface ISharedConst {
  Debug: {
    ForceLoggingEnabled: boolean,
    SpeedUpAutoSaveIntervalFactor: number,
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
  KeyWords: {
    Html: {
      beforeend: InsertPosition,
      optgroup: string,
      Checkbox: string,
      Checked: string,
      Input: string,
      Label: string,
      For: string,
      Text: string,
      Number: string,
    },
    Javascript: {
      ReadyStates: {
        Complete: DocumentReadyState
      }
    }
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