import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { _HindeCoreBase } from "../../../../../../Shared/scripts/_HindeCoreBase";
import { ScWindowType } from '../../../../../../Shared/scripts/Enums/50 - scWindowType';
import { IButtonSelectors } from "./IButtonSelectors";
export class StartMenuButtonResolver extends _HindeCoreBase {
  static AllWindowTypes: IButtonSelectors[] = [

    {
      ScWindowTypeX: ScWindowType.AccessViewer,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup1.SecurityTools,
      Pop2Selector: ContentConst.Const.Selector.SC.Popup2.AccessViewer,
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.Archive,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup1.AllApplications,

      Pop2Selector: ContentConst.Const.Selector.SC.Popup2.Archive,
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.ContentEditor,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup1.StartMenuLeftOption,

      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.DomainManager,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup2.DomainManager,

      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.InstalledLicenses,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup3.InstalledLicenses, //ContentConst.Const.Selector.SC.Popup1.ReportingTools,

      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.InstallationWizard,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup2.InstallationWizard, //ContentConst.Const.Selector.SC.Popup1.DevelopmentTools,
      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.KeyboardMap,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup2.KeyboardMap, //ContentConst.Const.Selector.SC.Popup1.DevelopmentTools,
      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.LicenseDetails,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup3.LicenseDetails,

      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.LogViewer,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup2.LogViewer,

      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.MarketingControlPanel,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup2.MarketingControlPanel,

      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.MediaLibrary,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup1.MediaLibrary,

      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.PackageDesigner,
      // note, we don't have to actually hit the developtmentTools button because the target button already exists. It's just display:none or
      Pop1Selector: ContentConst.Const.Selector.SC.Popup2.PackageDesignerButton, //ContentConst.Const.Selector.SC.Popup1.DevelopmentTools,
      Pop2Selector: '', /// can't use TR....it's not guaranteed to be the first one. If powershell tools are installed it won't be
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.Run,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup2.Run,

      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.RoleManager,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup2.RoleManager,

      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.RecycleBin,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup1.RecycleBin,

      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.ScanForBrokenLinks,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup2.ScanForBrokenLinks,
      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.SecurityEditor,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup2.SecurityEditor,
      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.TemplateManager,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup1.TemplateManager,
      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.UserManager,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup2.UserManager,
      Pop2Selector: '',
      Pop3Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.Workbox,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup2.Workbox,
      Pop2Selector: '',
      Pop3Selector: '',
    },
  ];

  GetButtonSelectors(scWindowType: ScWindowType): IButtonSelectors {
    //let toReturn: IButtonSelectors = {
    //  Pop1Selector: null,
    //  Pop1Selector: null,
    //  Pop2Selector: null
    //};

    let allWindowTypes: IButtonSelectors[] = StartMenuButtonResolver.AllWindowTypes;
    let toReturn: IButtonSelectors = null;

    allWindowTypes.forEach((selectorSet: IButtonSelectors) => {
      if (selectorSet.ScWindowTypeX === scWindowType) {
        toReturn = selectorSet;
      }
    })

    if (!toReturn) {
      toReturn = {
        Pop1Selector: '',
        Pop2Selector: '',
        Pop3Selector: '',
        ScWindowTypeX: ScWindowType.Unknown,
      }
    }

    return toReturn;
  }
}