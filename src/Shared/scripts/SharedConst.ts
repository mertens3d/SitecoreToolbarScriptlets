﻿import { ISharedConst } from "./Interfaces/ISharedConst";

export class SharedConst {
  static Const: ISharedConst = {
    Debug: {
      ForceLoggingEnabled: false,
      SpeedUpAutoSaveIntervalFactor: 3,
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
        }
      }
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
    QueryStringKey: {
      XmlControl: 'xmlcontrol',
    },
    Regex: {
      ContentEditor: /Content.*?Editor/ig,
      CleanGuid: /{|-|}/ig,
      NbSp: /&nbsp;/ig,
      QueryStrSeparatorQuest: /\?/gi,

      PageType: {
        //http://perficient9sc.dev.local/?sc_itemid=%7B9E8CD546-2354-4921-B38C-4A0C864F236B%7D&sc_mode=preview&sc_lang=en&sc_site=website
        Default: /.*default.aspx/ig,
        Edit: /sc_itemid=.*sc_mode=edit/ig,
        Normal: /sc_itemid=.*sc_mode=normal/ig,
        Preview: /sc_itemid=.*sc_mode=preview/ig,
        XmlControl: /.*xmlcontrol=Application/ig,
        PackageDesigner: /.*xmlcontrol=Application&.*Package+Designer/ig,

        ///sitecore/shell/default.aspx?xmlcontrol=Application&hdl=53D315776143455784479FFB65509FF4&he=Package+Designer&ic=apps%2f32x32%2fpackager.png

      },
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