import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { _HindeCoreBase } from "../../../../../../Shared/scripts/_HindeCoreBase";
import { ScWindowType } from '../../../../../../Shared/scripts/Enums/5000 - ScWindowType';
import { IButtonSelectors } from "./IButtonSelectors";
export class StartMenuButtonResolver extends _HindeCoreBase {

  static AllWindowTypes: IButtonSelectors[] = [

    {
      ScWindowTypeX: ScWindowType.AccessViewer,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.SecurityTools,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.Archive,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.Popup2.Archive,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.ContentEditor,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.StartMenuLeftOption,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.DomainManager,
      L1Selector: ContentConst.Const.Selector.SC.Popup2.DomainManager,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.InstalledLicenses,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.ReportingTools,
      Pop1Selector: '',
      Pop2Selector: '',
      Pop3Selector: ContentConst.Const.Selector.SC.Popup3.InstalledLicenses,
      
    },
    {
      ScWindowTypeX: ScWindowType.InstallationWizard,
      L1Selector: ContentConst.Const.Selector.SC.Popup2.InstallationWizard,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.KeyboardMap,
      L1Selector: ContentConst.Const.Selector.SC.Popup2.KeyboardMap,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.LicenseDetails,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.LicenseDetails,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.LogViewer,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.LogViewer,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.MarketingControlPanel,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.MarketingControlPanel,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.MediaLibrary,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.MediaLibrary,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.PackageDesigner,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.DevelopmentTools,
      Pop1Selector: ContentConst.Const.Selector.SC.Popup1.PackageDesignerButton, /// can't use TR....it's not guaranteed to be the first one. If powershell tools are installed it won't be
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.Run,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.Run,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.RoleManager,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.RoleManager,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.RecycleBin,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.RecycleBin,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.ScanForBrokenLinks,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.ScanForBrokenLinks,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.SecurityEditor,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.SecurityEditor,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.TemplateManager,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.TemplateManager,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.UserManager,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.UserManager,
      Pop1Selector: '',
      Pop2Selector: '',
    },
    {
      ScWindowTypeX: ScWindowType.Workbox,
      L1Selector: ContentConst.Const.Selector.SC.Popup1.Workbox,
      Pop1Selector: '',
      Pop2Selector: '',
    },
  ];



  GetButtonSelectors(scWindowType: ScWindowType): IButtonSelectors {
    //let toReturn: IButtonSelectors = {
    //  L1Selector: null,
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
        L1Selector: '',
        Pop1Selector: '',
        Pop2Selector: '',
        ScWindowTypeX: ScWindowType.Unknown
      }
    }

    return toReturn;
  }
}