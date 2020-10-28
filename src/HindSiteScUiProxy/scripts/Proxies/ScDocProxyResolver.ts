import { DocumentJacket } from "../../../DOMJacket/scripts/Document/DocumentJacket";
import { ScWindowTypeResolver } from "../../../Shared/scripts/Agents/UrlAgent/ScWindowTypeResolver";
import { ScProxyDisciminator } from "../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { ScWindowType } from '../../../Shared/scripts/Enums/50 - scWindowType';
import { IAPICore } from "../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IScDocProxy } from "../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IScFrameProxy } from "../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
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

export class ScDocProxyResolver extends _APICoreBase {
  constructor(apiCore: IAPICore) {
    super(apiCore);
  }

  ScWindowTypes(): ScWindowType[] {
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

      ScWindowType.FallBack,
      ScWindowType.FederatedExperienceManager,
      ScWindowType.Forms,

      ScWindowType.InstallationWizard,
      ScWindowType.InstalledLicenses,

      ScWindowType.KeyboardMap,

      ScWindowType.Launchpad,
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


      ScWindowType.JqueryModalDialogs,
      ScWindowType.InstallerBuildPackage,
    ];
  }

  private ScDocProxyFactory(windowType: ScWindowType, documentJacket: DocumentJacket, jqueryModalDialogsFrameProxy: IScFrameProxy): IScDocProxy {
    let ScDocProxy: IScDocProxy = null;

    if (false) { }
    else if (windowType === ScWindowType.AccessViewer) { ScDocProxy = new AccessViewerProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.AppToolsInstallerDesigner) { ScDocProxy = new AppToolsInstallerDesignerProxy(this.ApiCore, documentJacket, jqueryModalDialogsFrameProxy); }
    else if (windowType === ScWindowType.Archive) { ScDocProxy = new ArchiveProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ContentEditor) { ScDocProxy = new ContentEditorDocProxy(this.ApiCore, documentJacket, 'Solo Content Editor doc'); }
    else if (windowType === ScWindowType.ControlPanel) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.Debug) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.Desktop) { ScDocProxy = new DesktopProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.DomainManager) { ScDocProxy = new DomainManagerProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.EmailExperienceManager) { ScDocProxy = new EmailExpeprienceManagerProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ExperienceAnalytics) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ExperienceEditor_Edit) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ExperienceEditor_Normal) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ExperienceEditor_Preview) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ExperienceOptimization) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ExperienceProfile) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.FallBack) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.FederatedExperienceManager) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.Forms) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.InstallationWizard) { ScDocProxy = new InstallationWizardProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.InstalledLicenses) { ScDocProxy = new InstallLicensesProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.KeyboardMap) { ScDocProxy = new KeyBoardMapProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.Launchpad) { ScDocProxy = new LaunchPadProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.LicenseDetails) { ScDocProxy = new LicenseDetailsProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ListManager) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.LoginPage) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.LogViewer) { ScDocProxy = new LogViewerProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.MarketingControlPanel) { ScDocProxy = new MarketingControlPanelDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.MarketingAutomation) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.MediaLibrary) { ScDocProxy = new MediaLibraryProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.PackageDesigner) { ScDocProxy = new PackageDesignerDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.PathAnalyzer) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.Publish) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.RecycleBin) { ScDocProxy = new RecycleBinProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.RoleManager) { ScDocProxy = new RoleManagerProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.Run) { ScDocProxy = new RunProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.ScanForBrokenLinks) { ScDocProxy = new ScanForBrokenLinksProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.SecurityEditor) { ScDocProxy = new SecurityEditorDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.TemplateManager) { ScDocProxy = new TemplateManagerProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.UpdateCenter) { ScDocProxy = new FallBackDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.UserManager) { ScDocProxy = new UserManagerProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.Workbox) { ScDocProxy = new WorkboxProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.JqueryModalDialogs) { ScDocProxy = new JqueryModalDialogsDocProxy(this.ApiCore, documentJacket); }
    else if (windowType === ScWindowType.InstallerBuildPackage) { ScDocProxy = new InstallerBuildPackageDocProxy(this.ApiCore, documentJacket); }

    return ScDocProxy;
  }

  ScDocProxyFactoryMake(documentJacket: DocumentJacket, jqueryModalDialogsFrameProxy: IScFrameProxy): Promise<IScDocProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([ScDocProxyResolver.name, this.ScDocProxyFactoryMake.name], documentJacket.UrlJacket.GetUrlParts().FilePath);

      let scDocProxy: IScDocProxy = null;

      let windowTypeResolver = new ScWindowTypeResolver(this.CommonCore);
      let detectedWindowType = windowTypeResolver.GetScWindowType(documentJacket.UrlJacket);

      if (this.ScWindowTypes().indexOf(detectedWindowType) > -1) {
        scDocProxy = this.ScDocProxyFactory(detectedWindowType, documentJacket, jqueryModalDialogsFrameProxy);
      }
      else {
        this.ErrorHand.HandleFatalError([ScDocProxyResolver.name, this.ScDocProxyFactoryMake.name], 'unhandled windowType ' + ScWindowType[detectedWindowType]);
      }

      resolve(scDocProxy);

      //await scDocProxy.InstantiateAwaitElementsTop()
      //  .then(() => scDocProxy.WireEvents())
      //  .then(() => scDocProxy.OnFocus())
      //  .then(() => resolve(scDocProxy))
      //  .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([ScDocProxyResolver.name, this.ScDocProxyFactoryMake.name], err)));

      this.Logger.FuncEnd([ScDocProxyResolver.name, this.ScDocProxyFactoryMake.name], ScWindowType[detectedWindowType] + ' ' +  documentJacket.UrlJacket.GetUrlParts().FilePath);
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
    else { this.ErrorHand.HandleFatalError(this.MapProxyDiscriminatorToScWindowType.name, 'unhandled mapping ' + ScProxyDisciminator[proxyDiscriminator]); };

    return toReturn;
  }
}