export interface ISharedConst {
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
      Tags: {
        Body: string,
      }
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
      EnableDebugging: boolean,
      LastUsedLogToStorageKey: number,
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
      Default: RegExp
      Edit: RegExp
      Normal: RegExp
      Preview: RegExp
      XmlControl: RegExp
      PackageDesigner: RegExp
    },
  },
  UrlSuffix: {
    Desktop: string,
    Login: string,
    LaunchPad: string,
    CE: string,
    SitecoreShellApplicationsContentEditor: string,
    None: string,
    AboutBlank: string,
  },
}