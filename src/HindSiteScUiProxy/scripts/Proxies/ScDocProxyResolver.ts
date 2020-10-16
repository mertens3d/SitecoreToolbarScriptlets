import { DocumentJacket } from "../../../DOMJacket/Document/DocumentJacket";
import { ScDocProxyDisciminator } from "../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { ScWindowType } from '../../../Shared/scripts/Enums/50 - scWindowType';
import { IAPICore } from "../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IBaseScDocProxy, IStateFullDocProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateFullProxy";
import { IStateLessDocProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateLessDocProxy";
import { _APICoreBase } from "../../../Shared/scripts/_APICoreBase";
import { ContentEditorProxy } from './ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { DesktopProxy } from './Desktop/DesktopProxy/DesktopProxy';
import { FallBackProxy } from "./FallBackProxy";
import { LaunchPadProxy } from "./LaunchPadProxy";
import { MarketingControlPanelProxy } from "./MarketingControlPanelProxy";
import { MediaLibraryProxy } from "./MediaLibraryProxy";
import { PackageDesignerDocProxy, InstallerBuildPackageDocProxy } from "./PackageDesignerProxy/PackageDesignerProxy";
import { AccessViewerProxy, ArchiveProxy, DomainManagerProxy, EmailExpeprienceManagerProxy, InstallationWizardProxy, InstallLicensesProxy, KeyBoardMapProxy, LicenseDetailsProxy, LogViewerProxy, RecycleBinProxy, RoleManagerProxy, RunProxy, ScanForBrokenLinksProxy, SecurityEditorProxy, UserManagerProxy, WorkboxProxy } from "./PackageDesignerProxy/RecycleBinProxy";
import { JqueryModalDialogsDocProxy } from "./SupportProxies/JqueryModalDialogsDocProxy";
import { JqueryModalDialogsFrameProxy } from "./SupportProxies/StateLessFrameProxies/JqueryModalDialogsFrameProxy";
import { TemplateManagerProxy } from "./TemplateManagerProxy";

export class ScDocProxyResolver extends _APICoreBase {
    constructor(apiCore: IAPICore) {
        super(apiCore);
    }

    StateLessScWindowTypes(): ScWindowType[] {
        return [
            ScWindowType.JqueryModalDialogs,
            ScWindowType.InstallerBuildPackage,
        ];
    }

    StateFullScWindowTypes(): ScWindowType[] {
        return [
            ScWindowType.AccessViewer,
            ScWindowType.Archive,

            ScWindowType.ContentEditor,
            ScWindowType.ControlPanel,

            ScWindowType.Debug,
            ScWindowType.Desktop,
            ScWindowType.DomainManager,

            ScWindowType.EmailExperienceManager,
            ScWindowType.ExperienceAnalytics,
            ScWindowType.ExperienceEditor_Normal,
            ScWindowType.ExperienceEditor_Preview,
            ScWindowType.ExperienceOptimization,
            ScWindowType.ExperienceProfile,

            ScWindowType.FederatedExperienceManager,
            ScWindowType.Forms,

            ScWindowType.InstallationWizard,
            ScWindowType.InstalledLicenses,

            ScWindowType.KeyboardMap,

            ScWindowType.LicenseDetails,
            ScWindowType.ListManager,
            ScWindowType.LoginPage,
            ScWindowType.LogViewer,

            ScWindowType.MarketingAutomation,
            ScWindowType.MarketingControlPanel,
            ScWindowType.MediaLibrary,

            ScWindowType.PackageDesigner,
            ScWindowType.PathAnalyzer,
            ScWindowType.RecycleBin,

            ScWindowType.RoleManager,
            ScWindowType.Run,

            ScWindowType.ScanForBrokenLinks,
            ScWindowType.SecurityEditor,

            ScWindowType.TemplateManager,

            ScWindowType.UpdateCenter,
            ScWindowType.UserManager,

            ScWindowType.Workbox,
        ];
    }


    private StateLessScDocProxyFactory(windowType: ScWindowType, documentJacket: DocumentJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy): IStateLessDocProxy {
        let stateLessScDocProxy: IStateLessDocProxy = null;

        if (false) { }
        else if (windowType === ScWindowType.JqueryModalDialogs) { stateLessScDocProxy = new JqueryModalDialogsDocProxy(this.ApiCore, documentJacket, jqueryModalDialogsFrameProxy); }
        else if (windowType === ScWindowType.InstallerBuildPackage) { stateLessScDocProxy = new InstallerBuildPackageDocProxy(this.ApiCore, documentJacket); }

        return stateLessScDocProxy;
    }


    private StateFullScDocProxyFactory(windowType: ScWindowType, documentJacket: DocumentJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy): IStateFullDocProxy {
        let stateFullScDocProxy: IStateFullDocProxy = null;

        if (false) { }
        else if (windowType === ScWindowType.AccessViewer) { stateFullScDocProxy = new AccessViewerProxy(this.ApiCore); }
        else if (windowType === ScWindowType.Archive) { stateFullScDocProxy = new ArchiveProxy(this.ApiCore); }
        else if (windowType === ScWindowType.ContentEditor) { stateFullScDocProxy = new ContentEditorProxy(this.ApiCore, documentJacket, 'Solo Content Editor doc'); }
        else if (windowType === ScWindowType.ControlPanel) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.Debug) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.Desktop) { stateFullScDocProxy = new DesktopProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.DomainManager) { stateFullScDocProxy = new DomainManagerProxy(this.ApiCore); }
        else if (windowType === ScWindowType.EmailExperienceManager) { stateFullScDocProxy = new EmailExpeprienceManagerProxy(this.ApiCore); }
        else if (windowType === ScWindowType.ExperienceAnalytics) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.ExperienceEditor_Edit) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.ExperienceEditor_Normal) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.ExperienceEditor_Preview) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.ExperienceOptimization) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.ExperienceProfile) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.FallBack) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.FederatedExperienceManager) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.Forms) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.InstallationWizard) { stateFullScDocProxy = new InstallationWizardProxy(this.ApiCore); }
        else if (windowType === ScWindowType.InstalledLicenses) { stateFullScDocProxy = new InstallLicensesProxy(this.ApiCore); }
        else if (windowType === ScWindowType.KeyboardMap) { stateFullScDocProxy = new KeyBoardMapProxy(this.ApiCore); }
        else if (windowType === ScWindowType.Launchpad) { stateFullScDocProxy = new LaunchPadProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.LicenseDetails) { stateFullScDocProxy = new LicenseDetailsProxy(this.ApiCore); }
        else if (windowType === ScWindowType.ListManager) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.LoginPage) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.LogViewer) { stateFullScDocProxy = new LogViewerProxy(this.ApiCore); }
        else if (windowType === ScWindowType.MarketingControlPanel) { stateFullScDocProxy = new MarketingControlPanelProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.MarketingAutomation) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.MediaLibrary) { stateFullScDocProxy = new MediaLibraryProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.PackageDesigner) { stateFullScDocProxy = new PackageDesignerDocProxy(this.ApiCore, documentJacket, 'PackageDesigner', jqueryModalDialogsFrameProxy); }
        else if (windowType === ScWindowType.PathAnalyzer) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.Publish) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.RecycleBin) { stateFullScDocProxy = new RecycleBinProxy(this.ApiCore); }
        else if (windowType === ScWindowType.RoleManager) { stateFullScDocProxy = new RoleManagerProxy(this.ApiCore); }
        else if (windowType === ScWindowType.Run) { stateFullScDocProxy = new RunProxy(this.ApiCore); }
        else if (windowType === ScWindowType.ScanForBrokenLinks) { stateFullScDocProxy = new ScanForBrokenLinksProxy(this.ApiCore); }
        else if (windowType === ScWindowType.SecurityEditor) { stateFullScDocProxy = new SecurityEditorProxy(this.ApiCore); }
        else if (windowType === ScWindowType.TemplateManager) { stateFullScDocProxy = new TemplateManagerProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.UpdateCenter) { stateFullScDocProxy = new FallBackProxy(this.ApiCore, documentJacket); }
        else if (windowType === ScWindowType.UserManager) { stateFullScDocProxy = new UserManagerProxy(this.ApiCore); }
        else if (windowType === ScWindowType.Workbox) { stateFullScDocProxy = new WorkboxProxy(this.ApiCore); }

        return stateFullScDocProxy;
    }

    ScDocProxyFactory(desiredScWindowType: ScWindowType, documentJacket: DocumentJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy): Promise<IBaseScDocProxy> {
        //return new Promise(async (resolve, reject) => {
        return new Promise(async (resolve, reject) => {
            this.Logger.FuncStart([ScDocProxyResolver.name, this.ScDocProxyFactory.name], ScWindowType[desiredScWindowType]);

            let scDocProxy: IBaseScDocProxy = null;

            if (this.StateFullScWindowTypes().indexOf(desiredScWindowType) > -1) {
                scDocProxy = this.StateFullScDocProxyFactory(desiredScWindowType, documentJacket, jqueryModalDialogsFrameProxy);
            }
            else if (this.StateLessScWindowTypes().indexOf(desiredScWindowType) > -1) {
                scDocProxy = this.StateLessScDocProxyFactory(desiredScWindowType, documentJacket, jqueryModalDialogsFrameProxy);
            }
            else {
                this.ErrorHand.HandleFatalError([ScDocProxyResolver.name, this.ScDocProxyFactory.name], 'unhandled windowType ' + ScWindowType[desiredScWindowType]);
            }

            await scDocProxy.InstantiateAsyncMembers()
                .then(() => scDocProxy.WireEvents())
                .then(() => resolve(scDocProxy))
                .catch((err) => reject(this.ErrorHand.FormatRejectMessage([ScDocProxyResolver.name, this.ScDocProxyFactory.name], err)));

            this.Logger.FuncEnd([ScDocProxyResolver.name, this.ScDocProxyFactory.name], ScWindowType[desiredScWindowType]);
        });
    }

    MapProxyDiscriminatorToScWindowType(proxyDiscriminator: ScDocProxyDisciminator): ScWindowType {
        let toReturn: ScWindowType = ScWindowType.Unknown;

        if (false) { }
        else if (proxyDiscriminator === ScDocProxyDisciminator.AccessViewer) { toReturn = ScWindowType.AccessViewer; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.Archive) { toReturn = ScWindowType.Archive; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.ContentEditor) { toReturn = ScWindowType.ContentEditor; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.Desktop) { this.ErrorHand.HandleFatalError(this.MapProxyDiscriminatorToScWindowType.name, 'Something has gone wrong'); }
        else if (proxyDiscriminator === ScDocProxyDisciminator.DomainManager) { toReturn = ScWindowType.DomainManager; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.InstallationWizard) { toReturn = ScWindowType.InstallationWizard; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.InstalledLicenses) { toReturn = ScWindowType.InstalledLicenses; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.JqueryModalDialogsProxy) { toReturn = ScWindowType.JqueryModalDialogs; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.KeyBoardMap) { toReturn = ScWindowType.KeyboardMap; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.LicenseDetails) { toReturn = ScWindowType.LicenseDetails; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.LogViewer) { toReturn = ScWindowType.LogViewer; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.MarketingControlPanel) { toReturn = ScWindowType.MarketingControlPanel; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.MediaLibrary) { toReturn = ScWindowType.MediaLibrary; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.PackageDesigner) { toReturn = ScWindowType.PackageDesigner; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.RecycleBin) { toReturn = ScWindowType.RecycleBin; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.RoleManager) { toReturn = ScWindowType.RoleManager; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.Run) { toReturn = ScWindowType.Run; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.ScanForBrokenLinks) { toReturn = ScWindowType.ScanForBrokenLinks; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.SecurityEditor) { toReturn = ScWindowType.SecurityEditor; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.TemplateManager) { toReturn = ScWindowType.TemplateManager; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.UserManager) { toReturn = ScWindowType.UserManager; }
        else if (proxyDiscriminator === ScDocProxyDisciminator.Workbox) { toReturn = ScWindowType.Workbox; }
        else { this.ErrorHand.HandleFatalError(this.MapProxyDiscriminatorToScWindowType.name, 'unhandled mapping'); };

        return toReturn;
    }
}
