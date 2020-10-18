import { QueryStrKey } from "../Enums/QueryStrKey";
import { ScWindowType } from "../Enums/50 - scWindowType";
import { IQueryKeyValuePair } from "../Agents/UrlAgent/IQueryKeyValuePair";
import { IScWindowTypeDeterminator } from "../Interfaces/IPageDeterminator";

export class ScWindowTypeDeterminators {
  static regexPathTest_Sitecore_Shell: RegExp = /sitecore\/shell/ig;
  static regexMatchAll: RegExp = /.*/ig;
  static regexMatchApplicationsContentManager: RegExp = /sitecore\/shell\/Applications\/Content.*Manager/ig;

  static XMLControlApplication: IQueryKeyValuePair = {
    Key: QueryStrKey.xmlcontrol,
    ValueMatch: /Application/ig,
  };

  static ScWindowTypeDeterminators: IScWindowTypeDeterminator[] = [
    {
      ///sitecore/shell/default.aspx?xmlcontrol=Application&hdl=14FA8CCA18714BCEBA863F19885346B9&he=Access+Viewer&ic=Apps%2f16x16%2fLock.png
      ConfidenceScore: 0,
      Friendly: "Access View",
      QueryKeyValuePairs: [
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /Access.?Viewer/ig,
        }
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.AccessViewer,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.AccessViewer],
    },

    {
      // /sitecore/shell/default.aspx?xmlcontrol=Application&hdl=53E2330AEB5143C396CC78AA60DD4ECE&he=Archive&ic=apps%2f32x32%2fimportation.png
      ConfidenceScore: 0,
      Friendly: "Archive",
      QueryKeyValuePairs: [
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /Archive/ig,
        }
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.Archive,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.Archive],
    },

    {
      // /en/sitecore/shell/Applications/Content-Editor?ic=Apps%2F48x48%2FPencil.png&he=Content%20Editor&cl=0
      ConfidenceScore: 0,
      Friendly: "Content Editor Hosted",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.he,
          ValueMatch: /Content.*Editor/ig,
        }
      ],
      RegexPathTest: /\/sitecore\/shell\/Applications\/Content-Editor/ig,
      ScWindowType: ScWindowType.ContentEditor,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.ContentEditor],
    },

    {
      ///  sitecore/shell/Applications/Content%20Editor.aspx?sc_bw=1
      ConfidenceScore: 0,
      Friendly: "Content Editor Stand Alone",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.he,
          ValueMatch: /\/sitecore\/shell\/Applications\/Content.*Editor/ig,
        }
      ],
      RegexPathTest: /sitecore\/shell\/Applications\/Content.*Editor/ig,
      ScWindowType: ScWindowType.ContentEditor,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.ContentEditor],
    },

    {
      // /sitecore/shell/Applications/Control%20panel.aspx?sc_bw=1
      ConfidenceScore: 0,
      Friendly: "Control Panel",
      QueryKeyValuePairs: [],
      RegexPathTest: /sitecore\/shell\/Applications\/Control.*20panel/ig,
      ScWindowType: ScWindowType.ControlPanel,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.ControlPanel],
    },

    {
      // - /sitecore/shell/default.aspx
      ConfidenceScore: 0,
      Friendly: "Desktop",
      QueryKeyValuePairs: [],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.Desktop,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.Desktop],
    },

    {
      //  /?sc_debug=1&sc_prof=1&sc_trace=1&sc_ri=1
      ConfidenceScore: 0,
      Friendly: "Debug",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.sc_debug,
          ValueMatch: /1/ig,
        },
      ],
      RegexPathTest: /.*/ig,
      ScWindowType: ScWindowType.Debug,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.Debug],
    },

    {
      // sitecore/shell/default.aspx?xmlcontrol=Application&hdl=034041AE0B5741A0A1C0D7BB0B0E8133&he=Domain+Manager&ic=Apps%2f16x16%2fRoutes.png
      ConfidenceScore: 0,
      Friendly: "Domain Manager",
      QueryKeyValuePairs: [
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /Domain.?Manager/ig,
        }
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.DomainManager,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.DomainManager],
    },

    {
      // /sitecore/shell/client/Applications/ECM/Dashboard
      ConfidenceScore: 0,
      Friendly: "Email Experience Manager",
      QueryKeyValuePairs: [],
      RegexPathTest: /sitecore\/shell\/client\/Applications\/ECM\/Dashboard/ig,
      ScWindowType: ScWindowType.EmailExperienceManager,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.EmailExperienceManager],
    },

    {
      // /sitecore/client/Applications/ExperienceAnalytics/Dashboard/#segment=all&subsite=all&dateFrom=09-07-2020&dateTo=06-10-2020
      ConfidenceScore: 0,
      Friendly: "Experience Analytics",
      QueryKeyValuePairs: [],
      RegexPathTest: /sitecore\/client\/Applications\/ExperienceAnalytics\/Dashboard/ig,
      ScWindowType: ScWindowType.ExperienceAnalytics,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.ExperienceAnalytics],
    },

    {
      // /sitecore/client/Applications/ExperienceProfile/search?text=*
      ConfidenceScore: 0,
      Friendly: "Experience Profile",
      QueryKeyValuePairs: [],
      RegexPathTest: /sitecore\/client\/Applications\/ExperienceProfile/ig,
      ScWindowType: ScWindowType.ExperienceProfile,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.ExperienceProfile],
    },

    {
      // /?sc_mode=edit&sc_site=website
      ConfidenceScore: 0,
      Friendly: "Experience Editor - Edit",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.sc_mode,
          ValueMatch: /edit/ig,
        },
      ],
      RegexPathTest: /.*/ig,
      ScWindowType: ScWindowType.ExperienceEditor_Edit,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.ExperienceEditor_Edit],
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
      // - /sitecore/client/Applications/fxm/DomainDashboard
      ConfidenceScore: 0,
      Friendly: "Federated Experience Manager",
      QueryKeyValuePairs: [],
      RegexPathTest: /\/sitecore\/client\/Applications\/fxm\/DomainDashboard/ig,
      ScWindowType: ScWindowType.FederatedExperienceManager,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.FederatedExperienceManager],
    },

    {
      // - /sitecore/shell/default.aspx?xmlcontrol=Application&hdl=5D2A207829494A2BB4F0DB90E3918B10&he=Installation+Wizard&ic=apps%2f32x32%2fInstall_Wizard.png
      ConfidenceScore: 0,
      Friendly: "Installation Wizard",
      QueryKeyValuePairs: [
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /Installation?.Wizard/ig,
        },
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.InstallationWizard,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.InstallationWizard],
    },

    {
      ///sitecore/shell/default.aspx?xmlcontrol=Installer.BuildPackage&source=C%3a%5cWINDOWS%5cTEMP%5ctmpE956.tmp
      ConfidenceScore: 0,
      Friendly: "Installer Build Package",
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.xmlcontrol,
          ValueMatch: /Installer.?BuildPackage/ig,
        }
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.InstallerBuildPackage,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.InstallerBuildPackage],
    },

    {
      // /sitecore/shell/default.aspx?xmlcontrol=Application&hdl=C3E29B4729B445BBBD746343BFA27AC0&he=Installed+Licenses&ic=apps%2f32x32%2fCertificate.png
      ConfidenceScore: 0,
      Friendly: "Installed Licenses",
      QueryKeyValuePairs: [
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /Installed.?Licenses/ig,
        },
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.InstalledLicenses,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.InstalledLicenses],
    },

    {
      // /sitecore/shell/Controls/JqueryModalDialogs.html
      ConfidenceScore: 0,
      Friendly: "JqueryModalDialogs",
      QueryKeyValuePairs: [],
      RegexPathTest: /sitecore\/shell\/Controls\/JqueryModalDialogs.html/ig,
      ScWindowType: ScWindowType.JqueryModalDialogs,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.JqueryModalDialogs],
    },

    {
      // - /sitecore/shell/default.aspx?xmlcontrol=Application&hdl=8806CDFC1B8F4357AB7B536ACB9BF3E4&he=Keyboard+Map&ic=apps%2f32x32%2fkeyboardmap.png
      ConfidenceScore: 0,
      Friendly: "Keyboard Map",
      QueryKeyValuePairs: [
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /Keyboard.?Map/ig,
        },
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.KeyboardMap,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.KeyboardMap],
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
      // /sitecore/shell/default.aspx?xmlcontrol=Application&hdl=1D2967D3B82B4A33BAD817A9E24C5711&he=License+Details&ic=apps%2f32x32%2fInformations.png
      ConfidenceScore: 0,
      Friendly: "License Details",
      QueryKeyValuePairs: [
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /License.?Details/ig,
        },
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.LicenseDetails,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.LicenseDetails],
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
      // /sitecore/shell/default.aspx?xmlcontrol=Application&hdl=10481BD8CD2044BBB8D2B23818EFAFC1&he=Log+Viewer&ic=apps%2f32x32%2flogviewer.png
      ConfidenceScore: 0,
      Friendly: "Log Viewer",
      QueryKeyValuePairs: [
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /Log.?Viewer/ig,
        }
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.LogViewer,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.LogViewer],
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
      RegexPathTest: ScWindowTypeDeterminators.regexMatchApplicationsContentManager,
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
      RegexPathTest: ScWindowTypeDeterminators.regexMatchApplicationsContentManager,
      ScWindowType: ScWindowType.MediaLibrary,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.MediaLibrary],
    },

    {
      // - /sitecore/shell/default.aspx?xmlcontrol=Application&hdl=477C31C3C2C84771BCA48F151995D37D&he=Package+Designer&ic=apps%2f32x32%2fpackager.png
      ConfidenceScore: 0,
      Friendly: "Package Designer",
      QueryKeyValuePairs: [
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /Package.?Designer/ig
        },
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.PackageDesigner,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.PackageDesigner],
    },

    {
      // /?sc_site=website&sc_mode=preview
      ConfidenceScore: 0,
      Friendly: "Preview",
      RegexPathTest: ScWindowTypeDeterminators.regexMatchAll,
      QueryKeyValuePairs: [
        {
          Key: QueryStrKey.sc_mode,
          ValueMatch: /preview/ig
        }
      ],
      ScWindowType: ScWindowType.ExperienceEditor_Preview,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.ExperienceEditor_Preview],
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
      // - /sitecore/shell/default.aspx?xmlcontrol=Application&hdl=203A972626BF48DCA65064FFD5CB664C&he=Recycle+Bin&ic=Apps%2f48x48%2fRefresh.png
      ConfidenceScore: 0,
      Friendly: "Recycle Bin",
      QueryKeyValuePairs: [
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /Recycle.?Bin/ig,
        }
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.RecycleBin,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.RecycleBin],
    },

    {
      // /sitecore/shell/default.aspx?xmlcontrol=Application&hdl=D8CF27C05E454803B328F7E754A1CA83&he=Run&ic=apps%2f32x32%2frun.png
      ConfidenceScore: 0,
      Friendly: "Run",
      QueryKeyValuePairs: [
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /Run/ig,
        }
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.Run,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.Run],
    },

    {
      // - /sitecore/shell/Applications/Security/Role%20Manager.aspx?sc_bw=1
      // /sitecore/shell/default.aspx?xmlcontrol=Application&hdl=A6EC12E68B4145489394E7DEEC398C3E&he=Role+Manager&ic=Apps%2f16x16%2fAccount.png
      ConfidenceScore: 0,
      Friendly: "Role Manager",
      QueryKeyValuePairs: [
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /Role.?Manager/ig,
        }
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.RoleManager,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.RoleManager],
    },

    {
      // /sitecore/shell/default.aspx?xmlcontrol=Application&hdl=1857DC86F5CA48378585D1C7CCA766DC&he=Scan+for+Broken+Links&ic=apps%2f32x32%2flink_broken.png
      ConfidenceScore: 0,
      Friendly: "Scan for Broken Links",
      QueryKeyValuePairs: [
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /Scan.?for.?Broken.?Links/ig,
        }
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.ScanForBrokenLinks,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.ScanForBrokenLinks],
    },

    {
      ///sitecore/shell/default.aspx?xmlcontrol=Application&hdl=0CEB9550DEB043DEBAAB80763369F5E2&he=Security+Editor&ic=Apps%2f48x48%2fShield.png
      ConfidenceScore: 0,
      Friendly: "Security Editor",
      QueryKeyValuePairs: [
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /Security.?Editor/ig,
        }
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
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
      RegexPathTest: ScWindowTypeDeterminators.regexMatchApplicationsContentManager,
      ScWindowType: ScWindowType.TemplateManager,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.TemplateManager],
    },

    {
      // /sitecore/shell/client/applications/updatecenter/updatesDE308BA9741D%7D&fo&il
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
        ScWindowTypeDeterminators.XMLControlApplication,
        {
          Key: QueryStrKey.he,
          ValueMatch: /User.?Manager/ig,
        }
      ],
      RegexPathTest: ScWindowTypeDeterminators.regexPathTest_Sitecore_Shell,
      ScWindowType: ScWindowType.UserManager,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.UserManager],
    },

    {
      // /sitecore/shell/Applications/Workbox?ic=Apps%2F48x48%2Fworkbox.png&he=Workbox&sc_lang=en
      ConfidenceScore: 0,
      Friendly: "Work Box",
      QueryKeyValuePairs: [],
      RegexPathTest: /sitecore\/shell\/Applications\/Workbox/ig,
      ScWindowType: ScWindowType.Workbox,
      ScWindowTypeFriendly: ScWindowType[ScWindowType.Workbox],
    },
  ];
}