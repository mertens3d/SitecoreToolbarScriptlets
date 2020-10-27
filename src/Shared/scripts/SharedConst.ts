import { ISharedConst } from "./Interfaces/ISharedConst";

export class SharedConst {
  static Const: ISharedConst = {
    Colors: {
      colorContent: 'cyan',
      colorLayout: 'lightsteelblue',
      colorMediaLibrary: 'chocolate',
      colorSystem: 'lightgreen',
      colorTemplates: 'white',
      ConsoleStyles: {
        StyleBgYellow: "[43m",
        StyleBgRed: "[41m",
        StyleEsc: "\x1b",
        StyleFgBlue: "[34m",
        StyleFgGreen: "[32m",
        StyleFgMagenta: "[35m",
        StyleFgRed: "[31m",
        StyleFgYellow: "[33m",
        StyleReset: "[0m",
      }
    },
    Debug: {
      ForceLoggingEnabled: true,
      SpeedUpAutoSaveIntervalFactor: 1,
    },
    IterHelper: {
      GrowthPerIteration: 0.5,

      MaxCount: {
        Default: 10,
        OverridePublishing: 15,
      },
      Timeouts: {
        Max: 3000,
        Default: 100,
      },
    },
    KeyWords: {
    
      Html: {
        Tags: {
          Body: 'body',
        },
        beforeend: 'beforeend',
        optgroup: 'optgroup',
        Checkbox: 'checkbox',
        Checked: 'checked',
        Input: 'input',
        Label: 'label',
        For: 'for',
        Text: 'text',
        Number: 'number',
      },
      Javascript: {
        ReadyStates: {
          Complete: "complete"
        },
        Events: {
          Message: "message",
        },
      },
      NodeTagName: {
        IFrame: 'IFRAME',
      },
    },
    Logger: {
      MinTimeDiffMs: 100
    },
    ObjDiscriminator: {
      //DataOneTreeNode: 'IDataOneTreeNode',
    },
    Settings: {
      Defaults: {
        EnableDebugging: false,
        LogToStorage: false,
        UseCompactCss: false,
        LastUsedLogToStorageKey: 0
      }
    },
    QueryStringHeValues: {
      heTemplateManager: "template%20manager",
    },
    QueryStringKey: {
      XmlControl: 'xmlcontrol',
    },
    Regex: {
      ContentEditor: /Content.*?Editor/ig,
      CleanGuid: /{|-|}/ig,
      NbSp: /&nbsp;/ig,
      QueryStrSeparatorQuest: /\?/gi,

      Path: {
        PackageDesigner: /\/sitecore\/shell/ig,
      },

      PageType: {
        //http://perficient9sc.dev.local/?sc_itemid=%7B9E8CD546-2354-4921-B38C-4A0C864F236B%7D&sc_mode=preview&sc_lang=en&sc_site=website
        Shell: /\/sitecore\/shell/ig, // don't do default.aspx, some servers don't deliver that...actually don't server default.aspx...i think i'll need to test against 'shell;
        Edit: /sc_itemid=.*sc_mode=edit/ig,
        Normal: /sc_itemid=.*sc_mode=normal/ig,
        Preview: /sc_itemid=.*sc_mode=preview/ig,
        XmlControl: /.*xmlcontrol=Application/ig,
        PackageDesigner: /.*xmlcontrol=Application&.*Package+Designer/ig,
        //TemplateManager: /sitecore\/shell\/Applications\/Templates\/Template-Manager/ig, //- note this appears to redirect to Content%20Manager/default.aspx
        //he=Template % 20Manager
        ContentManager: /\/sitecore\/shell\/Applications\/Content%20Manager/ig,

        ///sitecore/shell/default.aspx?xmlcontrol=Application&hdl=53D315776143455784479FFB65509FF4&he=Package+Designer&ic=apps%2f32x32%2fpackager.png
      },
    },

    UrlRelativePrefix: {
      IconCache: '/temp/iconcache/',
      IconShellStandardMedia: '/sitecore/shell/themes/standard/~/media/',
      IconCacheSoftware16x16: '/temp/iconcache/software/16x16/',
      IconCacheApplications16x16: '/temp/iconcache/applications/16x16/',
      IconCachePeople16x16: '/temp/iconcache/people/16x16/',
    },
    UrlSuffix: {
      Desktop: '/sitecore/shell/default.aspx',
      Login: '/sitecore/login',
      LaunchPad: '/client/applications/launchpad',
      CE: '/sitecore/shell/Applications/Content Editor.aspx?sc_bw=1',
      SitecoreShellApplicationsContentEditor: 'sitecore/shell/Applications/Content-Editor',
      None: '/',
      AboutBlank: 'about:blank',
    },
  }
}