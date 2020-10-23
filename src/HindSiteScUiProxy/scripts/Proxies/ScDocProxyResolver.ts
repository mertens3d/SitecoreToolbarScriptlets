import { DocumentJacket } from "../../../DOMJacket/scripts/Document/DocumentJacket";
import { ScWindowTypeResolver } from "../../../Shared/scripts/Agents/UrlAgent/ScWindowTypeResolver";
import { ScProxyDisciminator } from "../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { ScWindowType } from '../../../Shared/scripts/Enums/50 - scWindowType';
import { IAPICore } from "../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IBaseScDocProxy } from "../../../Shared/scripts/Interfaces/Proxies/IBaseScDocProxy";
import { IStateLessDocProxy } from "../../../Shared/scripts/Interfaces/Proxies/IStateLessDocProxy";
import { _APICoreBase } from "../../../Shared/scripts/_APICoreBase";
import { ContentEditorDocProxy } from './ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { DesktopProxy } from './Desktop/DesktopProxy/DesktopProxy';
import { AccessViewerProxy } from "./StateFullDocProxies/AccessViewerProxy";
import { AppToolsInstallerDesignerProxy } from "./StateFullDocProxies/AppToolsInstallerDesignerProxy";
import { ArchiveProxy } from "./StateFullDocProxies/ArchiveProxy";
import { DomainManagerProxy } from "./StateFullDocProxies/DomainManagerProxy";
import { EmailExpeprienceManagerProxy } from "./StateFullDocProxies/EmailExpeprienceManagerProxy";
import { FallBackDocProxy } from "./StateFullDocProxies/FallBackDocProxy";
import { InstallationWizardProxy } from "./StateFullDocProxies/InstallationWizardProxy";
import { InstallLicensesProxy } from "./StateFullDocProxies/InstallLicensesProxy";
import { KeyBoardMapProxy } from "./StateFullDocProxies/KeyBoardMapProxy";
import { LaunchPadProxy } from "./StateFullDocProxies/LaunchPadProxy";
import { LicenseDetailsProxy } from "./StateFullDocProxies/LicenseDetailsProxy";
import { LogViewerProxy } from "./StateFullDocProxies/LogViewerProxy";
import { MarketingControlPanelDocProxy } from "./StateFullDocProxies/MarketingControlPanelProxy";
import { MediaLibraryProxy } from "./StateFullDocProxies/MediaLibraryProxy";
import { PackageDesignerDocProxy } from "./StateFullDocProxies/PackageDesignerDocProxy";
import { RecycleBinProxy } from "./StateFullDocProxies/RecycleBinProxy";
import { RoleManagerProxy } from "./StateFullDocProxies/RoleManagerProxy";
import { RunProxy } from "./StateFullDocProxies/RunProxy";
import { ScanForBrokenLinksProxy } from "./StateFullDocProxies/ScanForBrokenLinksProxy";
import { SecurityEditorDocProxy } from "./StateFullDocProxies/SecurityEditorProxy";
import { TemplateManagerProxy } from "./StateFullDocProxies/TemplateManagerProxy";
import { UserManagerProxy } from "./StateFullDocProxies/UserManagerProxy";
import { WorkboxProxy } from "./StateFullDocProxies/WorkboxProxy";
import { InstallerBuildPackageDocProxy } from "./StateLessDocProxies/StateLessDocProxies/InstallerBuildPackageDocProxy";
import { JqueryModalDialogsDocProxy } from "./StateLessDocProxies/StateLessDocProxies/JqueryModalDialogsDocProxy";
import { JqueryModalDialogsFrameProxy } from "./StateLessDocProxies/StateLessFrameProxies/JqueryModalDialogsFrameProxy";

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
    else if (windowType === ScWindowType.JqueryModalDialogs) { stateLessScDocProxy = new JqueryModalDialogsDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.InstallerBuildPackage) { stateLessScDocProxy = new InstallerBuildPackageDocProxy(this.ApiCore, documentJacket); }

    return stateLessScDocProxy;
  }

  private StateFullScDocProxyFactory(windowType: ScWindowType, documentJacket: DocumentJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy): IBaseScDocProxy {
    let stateFullScDocProxy: IBaseScDocProxy = null;

    if (false) { }
    else if (windowType === ScWindowType.AccessViewer) { stateFullScDocProxy = new AccessViewerProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.AppToolsInstallerDesigner) { stateFullScDocProxy = new AppToolsInstallerDesignerProxy(this.ApiCore, documentJacket, jqueryModalDialogsFrameProxy); }
    else if (windowType === ScWindowType.Archive) { stateFullScDocProxy = new ArchiveProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ContentEditor) { stateFullScDocProxy = new ContentEditorDocProxy(this.ApiCore, documentJacket, 'Solo Content Editor doc'); }
    else if (windowType === ScWindowType.ControlPanel) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.Debug) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.Desktop) { stateFullScDocProxy = new DesktopProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.DomainManager) { stateFullScDocProxy = new DomainManagerProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.EmailExperienceManager) { stateFullScDocProxy = new EmailExpeprienceManagerProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ExperienceAnalytics) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ExperienceEditor_Edit) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ExperienceEditor_Normal) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ExperienceEditor_Preview) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ExperienceOptimization) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ExperienceProfile) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.FallBack) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.FederatedExperienceManager) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.Forms) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.InstallationWizard) { stateFullScDocProxy = new InstallationWizardProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.InstalledLicenses) { stateFullScDocProxy = new InstallLicensesProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.KeyboardMap) { stateFullScDocProxy = new KeyBoardMapProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.Launchpad) { stateFullScDocProxy = new LaunchPadProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.LicenseDetails) { stateFullScDocProxy = new LicenseDetailsProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ListManager) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.LoginPage) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.LogViewer) { stateFullScDocProxy = new LogViewerProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.MarketingControlPanel) { stateFullScDocProxy = new MarketingControlPanelDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.MarketingAutomation) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.MediaLibrary) { stateFullScDocProxy = new MediaLibraryProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.PackageDesigner) { stateFullScDocProxy = new PackageDesignerDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.PathAnalyzer) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.Publish) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.RecycleBin) { stateFullScDocProxy = new RecycleBinProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.RoleManager) { stateFullScDocProxy = new RoleManagerProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.Run) { stateFullScDocProxy = new RunProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ScanForBrokenLinks) { stateFullScDocProxy = new ScanForBrokenLinksProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.SecurityEditor) { stateFullScDocProxy = new SecurityEditorDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.TemplateManager) { stateFullScDocProxy = new TemplateManagerProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.UpdateCenter) { stateFullScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.UserManager) { stateFullScDocProxy = new UserManagerProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.Workbox) { stateFullScDocProxy = new WorkboxProxy(this.ApiCore, documentJacket); }

    return stateFullScDocProxy;
  }

  ScDocProxyFactoryMake(documentJacket: DocumentJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy): Promise<IBaseScDocProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([ScDocProxyResolver.name, this.ScDocProxyFactoryMake.name]);

      let scDocProxy: IBaseScDocProxy = null;

      let windowTypeResolver = new ScWindowTypeResolver(this.CommonCore);
      let desiredScWindowType = windowTypeResolver.GetScWindowType(documentJacket.UrlJacket);

      if (this.StateFullScWindowTypes().indexOf(desiredScWindowType) > -1) {
        scDocProxy = this.StateFullScDocProxyFactory(desiredScWindowType, documentJacket, jqueryModalDialogsFrameProxy);
      }
      else if (this.StateLessScWindowTypes().indexOf(desiredScWindowType) > -1) {
        scDocProxy = this.StateLessScDocProxyFactory(desiredScWindowType, documentJacket, jqueryModalDialogsFrameProxy);
      }
      else {
        this.ErrorHand.HandleFatalError([ScDocProxyResolver.name, this.ScDocProxyFactoryMake.name], 'unhandled windowType ' + ScWindowType[desiredScWindowType]);
      }

      await scDocProxy.InstantiateAsyncMembers()
        .then(() => scDocProxy.WireEvents())
        .then(() => scDocProxy.OnFocus())
        .then(() => resolve(scDocProxy))
        .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([ScDocProxyResolver.name, this.ScDocProxyFactoryMake.name], err)));

      this.Logger.FuncEnd([ScDocProxyResolver.name, this.ScDocProxyFactoryMake.name], ScWindowType[desiredScWindowType]);
    });
  }

  MapProxyDiscriminatorToScWindowType(proxyDiscriminator: ScProxyDisciminator): ScWindowType {
    let toReturn: ScWindowType = ScWindowType.Unknown;

    if (false) { }
    else if (proxyDiscriminator === ScProxyDisciminator.AccessViewer) { toReturn = ScWindowType.AccessViewer; }
    else if (proxyDiscriminator === ScProxyDisciminator.Archive) { toReturn = ScWindowType.Archive; }
    else if (proxyDiscriminator === ScProxyDisciminator.ContentEditor) { toReturn = ScWindowType.ContentEditor; }
    else if (proxyDiscriminator === ScProxyDisciminator.Desktop) { this.ErrorHand.HandleFatalError(this.MapProxyDiscriminatorToScWindowType.name, 'Something has gone wrong'); }
    else if (proxyDiscriminator === ScProxyDisciminator.DomainManager) { toReturn = ScWindowType.DomainManager; }
    else if (proxyDiscriminator === ScProxyDisciminator.InstallationWizard) { toReturn = ScWindowType.InstallationWizard; }
    else if (proxyDiscriminator === ScProxyDisciminator.InstalledLicenses) { toReturn = ScWindowType.InstalledLicenses; }
    else if (proxyDiscriminator === ScProxyDisciminator.JqueryModalDialogsDocProxy) { toReturn = ScWindowType.JqueryModalDialogs; }
    else if (proxyDiscriminator === ScProxyDisciminator.KeyBoardMap) { toReturn = ScWindowType.KeyboardMap; }
    else if (proxyDiscriminator === ScProxyDisciminator.LicenseDetails) { toReturn = ScWindowType.LicenseDetails; }
    else if (proxyDiscriminator === ScProxyDisciminator.LogViewer) { toReturn = ScWindowType.LogViewer; }
    else if (proxyDiscriminator === ScProxyDisciminator.MarketingControlPanel) { toReturn = ScWindowType.MarketingControlPanel; }
    else if (proxyDiscriminator === ScProxyDisciminator.MediaLibrary) { toReturn = ScWindowType.MediaLibrary; }
    else if (proxyDiscriminator === ScProxyDisciminator.PackageDesigner) { toReturn = ScWindowType.PackageDesigner; }
    else if (proxyDiscriminator === ScProxyDisciminator.RecycleBin) { toReturn = ScWindowType.RecycleBin; }
    else if (proxyDiscriminator === ScProxyDisciminator.RoleManager) { toReturn = ScWindowType.RoleManager; }
    else if (proxyDiscriminator === ScProxyDisciminator.Run) { toReturn = ScWindowType.Run; }
    else if (proxyDiscriminator === ScProxyDisciminator.ScanForBrokenLinks) { toReturn = ScWindowType.ScanForBrokenLinks; }
    else if (proxyDiscriminator === ScProxyDisciminator.SecurityEditor) { toReturn = ScWindowType.SecurityEditor; }
    else if (proxyDiscriminator === ScProxyDisciminator.TemplateManager) { toReturn = ScWindowType.TemplateManager; }
    else if (proxyDiscriminator === ScProxyDisciminator.UserManager) { toReturn = ScWindowType.UserManager; }
    else if (proxyDiscriminator === ScProxyDisciminator.Workbox) { toReturn = ScWindowType.Workbox; }
    else if (proxyDiscriminator === ScProxyDisciminator.AppToolsInstallerDesigner) { toReturn = ScWindowType.AppToolsInstallerDesigner; }
    else { this.ErrorHand.HandleFatalError(this.MapProxyDiscriminatorToScWindowType.name, 'unhandled mapping'); };

    return toReturn;
  }
}