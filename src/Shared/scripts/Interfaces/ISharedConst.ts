export interface ISharedConst {
  Colors: {
    colorContent: string,
    colorLayout: string,
    colorMediaLibrary: string,
    colorSystem: string,
    colorTemplates: string,
    ConsoleStyles: {
      StyleBgRed: string,
      StyleBgYellow: string,
      StyleEsc: string,
      StyleFgBlue: string,
      StyleFgGreen: string,
      StyleFgMagenta: string,
      StyleFgRed: string,
      StyleFgYellow: string,
      StyleReset: string,
    }
  },
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
      },
      Events: {
        Message: string
      },
    },
    NodeTagName: {
      IFrame: 'IFRAME',
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
      EnableDebugging: boolean,
      LastUsedLogToStorageKey: number,
      LogToStorage: boolean,
      UseCompactCss: boolean,
    }
  },
  QueryStringHeValues: {
    heTemplateManager: string,
  },
  QueryStringKey: {
    XmlControl: string,
  },
  Regex: {
    ContentEditor: RegExp,
    CleanGuid: RegExp,

    NbSp: RegExp,
    QueryStrSeparatorQuest: RegExp,

    Path: {
    },
    PageType: {
      Shell: RegExp,
      Edit: RegExp,
      Normal: RegExp,
      Preview: RegExp,
      XmlControl: RegExp,
      PackageDesigner: RegExp,
      ContentManager: RegExp,
    },
  },

  UrlRelativePrefix: {
    IconCache: string,
    IconShellStandardMedia: string,
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