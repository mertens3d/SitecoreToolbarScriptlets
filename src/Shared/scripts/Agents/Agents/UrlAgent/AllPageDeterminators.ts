import { QueryStrKey } from "../../../Enums/QueryStrKey";
import { ScWindowType } from "../../../Enums/5000 - scWindowType";
import { IPageDeterminator } from "./IPageDeterminator";

export class AllPageDeterminators {
  static regexPathTest_Sitecore_Shell: RegExp = /sitecore\/shell/ig;
  static regexMatchAll: RegExp = /.*/ig;
  static regexMatchApplicationsContentManager: RegExp = /sitecore\/shell\/Applications\/Content.*Manager/ig;

  static ScPages: IPageDeterminator[] = [

    {
      ///sitecore/shell/default.aspx?xmlcontrol=Application&hdl=14FA8CCA18714BCEBA863F19885346B9&he=Access+Viewer&ic=Apps%2f16x16%2fLock.png
      ConfidenceScore: 0,
      Friendly: "Access View",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.xmlcontrol,
          ValueMatch: /Application/ig,
        },
        {
          Key: QueryStrKey.he,
          ValueMatch: /Access.?Viewer/ig,
        }
      ],
      RegexPathTest: AllPageDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.AccessViewer,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.AccessViewer],
    },
    {
      ConfidenceScore: 0,
      Friendly: "Content Editor",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.he,
          ValueMatch: /Content.*Editor/ig,
        }
      ],
      RegexPathTest: /sitecore\/shell\/Applications\/Content.*Editor/ig,
      ScWindowType: ScWindowType.ContentEditor,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.ContentEditor],
    },
    {
      // - /sitecore/shell/default.aspx
      ConfidenceScore: 0,
      Friendly: "Desktop",
      QueryKeyValuePairs: [],
      RegexPathTest: AllPageDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.Desktop,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.Desktop],
    },

    {
      //https://sc10learnsc.dev.local/sitecore/shell/default.aspx?xmlcontrol=Application&hdl=034041AE0B5741A0A1C0D7BB0B0E8133&he=Domain+Manager&ic=Apps%2f16x16%2fRoutes.png
      ConfidenceScore: 0,
      Friendly: "Domain Manager",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.xmlcontrol,
          ValueMatch: /Application/ig,
        },
        {
          Key: QueryStrKey.he,
          ValueMatch: /Domain.?Manager/ig,
        }
      ],
      RegexPathTest: AllPageDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.DomainManager,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.DomainManager],
    },
    {
      // - /sitecore/shell/default.aspx
      ConfidenceScore: 0,
      Friendly: "FallBack",
      QueryKeyValuePairs: [],
      RegexPathTest: /sitecore\//ig,
      ScWindowType: ScWindowType.FallBack,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.FallBack],
    },
    {
      // /sitecore/client/Applications/Launchpad?sc_lang=en#dateFrom=07-07-2020&dateTo=07-10-2020
      ConfidenceScore: 0,
      Friendly: "Launchpad",
      QueryKeyValuePairs: [],
      RegexPathTest: /sitecore\/client\/Applications\/Launchpad/ig,
      ScWindowType: ScWindowType.Launchpad,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.Launchpad],
    },
    {
      ConfidenceScore: 0,
      Friendly: "Login",
      QueryKeyValuePairs: [],
      RegexPathTest: /sitecore\/login/ig,
      ScWindowType: ScWindowType.LoginPage,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.LoginPage],
    },
    {
      // - /sitecore/shell/Applications/Content%20Manager/default.aspx?he=Marketing+Control+Panel&pa=0&ic=People%2f16x16%2fmegaphone.png&ro=%7b33CFB9CA-F565-4D5B-B88A-7CDFE29A6D71%7d&mo=templateworkspace
      ConfidenceScore: 0,
      Friendly: "Marketing Control Panel",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.he,
          ValueMatch: /Marketing.?Control.?Panel/ig,
        }
      ],
      RegexPathTest: AllPageDeterminators.regexMatchApplicationsContentManager,
      ScWindowType: ScWindowType.MarketingControlPanel,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.MarketingControlPanel],
    },
    {
      // - /sitecore/shell/Applications/Content%20Manager/default.aspx?he=Media+Library&pa=1&ic=Applications%2f16x16%2fphoto_scenery.png&mo=media&ro=%7b3D6658D8-A0BF-4E75-B3E2-D050FABCF4E1%7d
      ConfidenceScore: 0,
      Friendly: "Media Library",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.he,
          ValueMatch: /Media.?Library/ig,
        }
      ],
      RegexPathTest: AllPageDeterminators.regexMatchApplicationsContentManager,
      ScWindowType: ScWindowType.MediaLibrary,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.MediaLibrary],
    },
    {
      // - /sitecore/shell/default.aspx?xmlcontrol=Application&hdl=477C31C3C2C84771BCA48F151995D37D&he=Package+Designer&ic=apps%2f32x32%2fpackager.png
      ConfidenceScore: 0,
      Friendly: "Package Designer",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.he,
          ValueMatch: /Package.?Designer/ig
        },
        {
          Key: QueryStrKey.xmlcontrol,
          ValueMatch: /Application/ig
        }
      ],
      RegexPathTest: AllPageDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.PackageDesigner,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.PackageDesigner],
    },

    {
      // /?sc_site=website&sc_mode=preview
      ConfidenceScore: 0,
      Friendly: "Preview",
      RegexPathTest: AllPageDeterminators.regexMatchAll,
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.sc_mode,
          ValueMatch: /preview/ig
        }
      ],
      ScWindowType: ScWindowType.Preview,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.Preview],
    },
    {
      // - /sitecore/shell/Applications/Publish.aspx
      ConfidenceScore: 0,
      Friendly: "Publish",
      QueryKeyValuePairs: [],
      RegexPathTest: /sitecore\/shell\/Applications\/Publish/ig,
      ScWindowType: ScWindowType.Publish,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.Publish],
    },
    {
      // - https://sc10learnsc.dev.local/sitecore/shell/Applications/Security/Role%20Manager.aspx?sc_bw=1
      // https://sc10learnsc.dev.local/sitecore/shell/default.aspx?xmlcontrol=Application&hdl=A6EC12E68B4145489394E7DEEC398C3E&he=Role+Manager&ic=Apps%2f16x16%2fAccount.png
      ConfidenceScore: 0,
      Friendly: "Role Manager",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.xmlcontrol,
          ValueMatch: /Application/ig,
        },
        {
          Key: QueryStrKey.he,
          ValueMatch: /Role.?Manager/ig,
        }
      ],
      RegexPathTest: AllPageDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.RollManager,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.RollManager],
    },

    {
      ///sitecore/shell/default.aspx?xmlcontrol=Application&hdl=0CEB9550DEB043DEBAAB80763369F5E2&he=Security+Editor&ic=Apps%2f48x48%2fShield.png
      ConfidenceScore: 0,
      Friendly: "Security Editor",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.xmlcontrol,
          ValueMatch: /Application/ig,
        },
        {
          Key: QueryStrKey.he,
          ValueMatch: /Security.?Editor/ig,
        }

      ],
      RegexPathTest: AllPageDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.SecurityEditor,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.SecurityEditor],
    },
    {
      // - /sitecore/shell/Applications/Content%20Manager/default.aspx?he=Template%20Manager&pa=0&mo=templateworkspace&ic=Software%2F16x16%2Fcomponents.png&ro=%7B3C1715FE-6A13-4FCF-845F-DE308BA9741D%7D&fo&il
      ///en/sitecore/shell/Applications/Templates/Template-Manager?ic=Apps%2F48x48%2FNewspaper.png&he=Template%20Manager
      // /sitecore/shell/Applications/Content%20Manager/default.aspx?he=Template%20Manager&pa=0&mo=templateworkspace&ic=Software%2F16x16%2Fcomponents.png&ro=%7B3C1715FE-6A13-4FCF-845F-DE308BA9741D%7D&fo&il
      ConfidenceScore: 0,
      Friendly: "Template Manager",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.he,
          ValueMatch: /Template.*Manager/ig,
        }, {
          Key: QueryStrKey.mo,
          ValueMatch: /templateworkspace/ig,
        }
      ],
      RegexPathTest: AllPageDeterminators.regexMatchApplicationsContentManager,
      ScWindowType: ScWindowType.TemplateManager,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.TemplateManager],
    },
    {
      //https://sc10learnsc.dev.local/sitecore/shell/client/applications/updatecenter/updatesDE308BA9741D%7D&fo&il
      ConfidenceScore: 0,
      Friendly: "Update Center",
      QueryKeyValuePairs: [],
      RegexPathTest: /sitecore\/shell\/client\/applications\/updatecenter\/updates/ig,
      ScWindowType: ScWindowType.FallBack,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.FallBack],
    },
    {
      ////sitecore/shell/default.aspx?xmlcontrol=Application&hdl=64D9EB1972E54974A814440C20DEC57A&he=User+Manager&ic=Apps%2f32x32%2fuser+(1).png
      ConfidenceScore: 0,
      Friendly: "User Manager",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.xmlcontrol,
          ValueMatch: /Application/ig,
        },
        {
          Key: QueryStrKey.he,
          ValueMatch: /User.?Manager/ig,
        }
      ],
      RegexPathTest: AllPageDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.UserManager,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.UserManager],
    },
    

  ];
}