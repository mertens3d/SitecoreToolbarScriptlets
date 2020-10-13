import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { ScWindowType } from '../../../../../../Shared/scripts/Enums/50 - scWindowType';
import { IButtonSelectors } from "./IButtonSelectors";


export class AllStartMenuButtonSelectors {
    static AllWindowTypes: IButtonSelectors[] = [
        {
            ScWindowTypeX: ScWindowType.AccessViewer,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup1.SecurityTools,
            Pop2Selector: ContentConst.Const.Selector.SC.StartMenu.Popup2.AccessViewer,
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.Archive,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup1.AllApplications,

            Pop2Selector: ContentConst.Const.Selector.SC.StartMenu.Popup2.Archive,
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.ContentEditor,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup1.StartMenuLeftOption,

            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.DomainManager,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup2.DomainManager,

            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.InstalledLicenses,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup3.InstalledLicenses,

            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.InstallationWizard,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup2.InstallationWizard,
            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.KeyboardMap,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup2.KeyboardMap,
            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.LicenseDetails,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup3.LicenseDetails,

            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.LogViewer,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup2.LogViewer,

            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.MarketingControlPanel,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup2.MarketingControlPanel,

            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.MediaLibrary,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup1.MediaLibrary,

            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.PackageDesigner,
            // note, we don't have to actually hit the developtmentTools button because the target button already exists. It's just display:none or
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup2.PackageDesignerButton,
            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.Run,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup2.Run,

            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.RoleManager,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup2.RoleManager,

            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.RecycleBin,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup1.RecycleBin,

            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.ScanForBrokenLinks,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup2.ScanForBrokenLinks,
            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.SecurityEditor,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup2.SecurityEditor,
            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.TemplateManager,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup1.TemplateManager,
            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.UserManager,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup2.UserManager,
            Pop2Selector: '',
            Pop3Selector: '',
        },
        {
            ScWindowTypeX: ScWindowType.Workbox,
            Pop1Selector: ContentConst.Const.Selector.SC.StartMenu.Popup2.Workbox,
            Pop2Selector: '',
            Pop3Selector: '',
        },
    ];
}
