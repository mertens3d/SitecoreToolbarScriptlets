import { DocumentJacket } from "../../../DOMJacket/DocumentJacket";
import { StateFullProxyDisciminator } from "../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { ScWindowType } from '../../../Shared/scripts/Enums/50 - scWindowType';
import { IHindSiteScUiAPIRunTimeOptions } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IHindSiteScUiAPIRunTimeOptions";
import { IAPICore } from "../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _APICoreBase } from "../../../Shared/scripts/_APICoreBase";
import { ContentEditorProxy } from './ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { DesktopProxy } from './Desktop/DesktopProxy/DesktopProxy';
import { FallBackProxy } from "./FallBackProxy";
import { LaunchPadProxy } from "./LaunchPadProxy";
import { MarketingControlPanelProxy } from "./MarketingControlPanelProxy";
import { MediaLibraryProxy } from "./MediaLibraryProxy";
import { PackageDesignerProxy } from "./PackageDesignerProxy/PackageDesignerProxy";
import { AccessViewerProxy, ArchiveProxy, DomainManagerProxy, EmailExpeprienceManagerProxy, InstallationWizardProxy, InstallLicensesProxy, KeyBoardMapProxy, LicenseDetailsProxy, LogViewerProxy, RecycleBinProxy, RoleManagerProxy, RunProxy, ScanForBrokenLinksProxy, SecurityEditorProxy, UserManagerProxy, WorkboxProxy } from "./PackageDesignerProxy/RecycleBinProxy";
import { TemplateManagerProxy } from "./TemplateManagerProxy";

export class StateFullProxyResolver extends _APICoreBase {
  constructor(apiCore: IAPICore) {
    super(apiCore);
  }

  RecognizedWindowTypes(): ScWindowType[] {
    return [
      ScWindowType.AccessViewer,
      ScWindowType.Archive,

      ScWindowType.ContentEditor,
      ScWindowType.ControlPanel,

      ScWindowType.Debug,
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

  StateFullProxyFactory(windowType: ScWindowType, documentJacket: DocumentJacket): Promise<IStateFullProxy> {
    return new Promise(async (resolve, reject) => {
      let StateFullProxy: IStateFullProxy = null;

      if (false) {
      }
      else if (windowType === ScWindowType.AccessViewer) { StateFullProxy = new AccessViewerProxy(this.ApiCore); }
      else if (windowType === ScWindowType.Archive) { StateFullProxy = new ArchiveProxy(this.ApiCore); }

      else if (windowType === ScWindowType.ContentEditor) { StateFullProxy = new ContentEditorProxy(this.ApiCore, documentJacket, 'Solo Content Editor doc'); }

      else if (windowType === ScWindowType.ControlPanel) { StateFullProxy = new FallBackProxy(this.ApiCore); }
      else if (windowType === ScWindowType.Debug) { StateFullProxy = new FallBackProxy(this.ApiCore); }
      else if (windowType === ScWindowType.Desktop) { StateFullProxy = new DesktopProxy(this.ApiCore, documentJacket); }
      else if (windowType === ScWindowType.DomainManager) { StateFullProxy = new DomainManagerProxy(this.ApiCore); }

      else if (windowType === ScWindowType.EmailExperienceManager) { StateFullProxy = new EmailExpeprienceManagerProxy(this.ApiCore); }
      else if (windowType === ScWindowType.ExperienceAnalytics) { StateFullProxy = new FallBackProxy(this.ApiCore); }
      else if (windowType === ScWindowType.ExperienceEditor_Edit) { StateFullProxy = new FallBackProxy(this.ApiCore); }
      else if (windowType === ScWindowType.ExperienceEditor_Normal) { StateFullProxy = new FallBackProxy(this.ApiCore); }
      else if (windowType === ScWindowType.ExperienceEditor_Preview) { StateFullProxy = new FallBackProxy(this.ApiCore); }
      else if (windowType === ScWindowType.ExperienceOptimization) { StateFullProxy = new FallBackProxy(this.ApiCore); }
      else if (windowType === ScWindowType.ExperienceProfile) { StateFullProxy = new FallBackProxy(this.ApiCore); }

      else if (windowType === ScWindowType.FallBack) { StateFullProxy = new FallBackProxy(this.ApiCore); }
      else if (windowType === ScWindowType.FederatedExperienceManager) { StateFullProxy = new FallBackProxy(this.ApiCore); }
      else if (windowType === ScWindowType.Forms) { StateFullProxy = new FallBackProxy(this.ApiCore); }

      else if (windowType === ScWindowType.InstallationWizard) { StateFullProxy = new InstallationWizardProxy(this.ApiCore); }
      else if (windowType === ScWindowType.InstalledLicenses) { StateFullProxy = new InstallLicensesProxy(this.ApiCore); }

      else if (windowType === ScWindowType.KeyboardMap) { StateFullProxy = new KeyBoardMapProxy(this.ApiCore); }

      else if (windowType === ScWindowType.Launchpad) { StateFullProxy = new LaunchPadProxy(this.ApiCore); }
      else if (windowType === ScWindowType.LicenseDetails) { StateFullProxy = new LicenseDetailsProxy(this.ApiCore); }
      else if (windowType === ScWindowType.ListManager) { StateFullProxy = new FallBackProxy(this.ApiCore); }
      else if (windowType === ScWindowType.LoginPage) { StateFullProxy = new FallBackProxy(this.ApiCore); }
      else if (windowType === ScWindowType.LogViewer) { StateFullProxy = new LogViewerProxy(this.ApiCore); }

      else if (windowType === ScWindowType.MarketingControlPanel) { StateFullProxy = new MarketingControlPanelProxy(this.ApiCore, documentJacket); }
      else if (windowType === ScWindowType.MarketingAutomation) { StateFullProxy = new FallBackProxy(this.ApiCore); }
      else if (windowType === ScWindowType.MediaLibrary) { StateFullProxy = new MediaLibraryProxy(this.ApiCore, documentJacket); }

      else if (windowType === ScWindowType.PackageDesigner) { StateFullProxy = new PackageDesignerProxy(this.ApiCore, documentJacket, 'PackageDesigner'); }
      else if (windowType === ScWindowType.PathAnalyzer) { StateFullProxy = new FallBackProxy(this.ApiCore); }
      else if (windowType === ScWindowType.Publish) { StateFullProxy = new FallBackProxy(this.ApiCore); }

      else if (windowType === ScWindowType.RecycleBin) { StateFullProxy = new RecycleBinProxy(this.ApiCore); }
      else if (windowType === ScWindowType.RoleManager) { StateFullProxy = new RoleManagerProxy(this.ApiCore); }
      else if (windowType === ScWindowType.Run) { StateFullProxy = new RunProxy(this.ApiCore); }

      else if (windowType === ScWindowType.ScanForBrokenLinks) { StateFullProxy = new ScanForBrokenLinksProxy(this.ApiCore); }
      else if (windowType === ScWindowType.SecurityEditor) { StateFullProxy = new SecurityEditorProxy(this.ApiCore); }

      else if (windowType === ScWindowType.TemplateManager) { StateFullProxy = new TemplateManagerProxy(this.ApiCore, documentJacket); }

      else if (windowType === ScWindowType.UpdateCenter) { StateFullProxy = new FallBackProxy(this.ApiCore); }
      else if (windowType === ScWindowType.UserManager) { StateFullProxy = new UserManagerProxy(this.ApiCore); }

      else if (windowType === ScWindowType.Workbox) { StateFullProxy = new WorkboxProxy(this.ApiCore); }

      else { this.ErrorHand.ErrorAndThrow(this.StateFullProxyFactory.name, 'unhandled windowType ' + ScWindowType[windowType]); }

      await StateFullProxy.InstantiateAsyncMembers()
        .then(() => StateFullProxy.WireEvents())
        .then(() => resolve(StateFullProxy))
        .catch((err) => reject(this.ErrorHand.FormatejectMessage([StateFullProxyResolver.name, this.StateFullProxyFactory.name], err)))
    });
  }

  MapProxyDiscriminatorToScWindowType(proxyDiscriminator: StateFullProxyDisciminator): ScWindowType {
    let toReturn: ScWindowType = ScWindowType.Unknown;

    if (false) { }
    else if (proxyDiscriminator === StateFullProxyDisciminator.AccessViewer) { toReturn = ScWindowType.AccessViewer; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.Archive) { toReturn = ScWindowType.Archive; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.ContentEditor) { toReturn = ScWindowType.ContentEditor; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.Desktop) { this.ErrorHand.ErrorAndThrow(this.MapProxyDiscriminatorToScWindowType.name, 'Something has gone wrong'); }
    else if (proxyDiscriminator === StateFullProxyDisciminator.DomainManager) { toReturn = ScWindowType.DomainManager; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.InstallationWizard) { toReturn = ScWindowType.InstallationWizard; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.InstalledLicenses) { toReturn = ScWindowType.InstalledLicenses; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.KeyBoardMap) { toReturn = ScWindowType.KeyboardMap; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.LicenseDetails) { toReturn = ScWindowType.LicenseDetails; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.LogViewer) { toReturn = ScWindowType.LogViewer; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.MarketingControlPanel) { toReturn = ScWindowType.MarketingControlPanel; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.MediaLibrary) { toReturn = ScWindowType.MediaLibrary; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.PackageDesigner) { toReturn = ScWindowType.PackageDesigner; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.RecycleBin) { toReturn = ScWindowType.RecycleBin; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.RoleManager) { toReturn = ScWindowType.RoleManager; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.Run) { toReturn = ScWindowType.Run; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.ScanForBrokenLinks) { toReturn = ScWindowType.ScanForBrokenLinks; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.SecurityEditor) { toReturn = ScWindowType.SecurityEditor; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.TemplateManager) { toReturn = ScWindowType.TemplateManager; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.UserManager) { toReturn = ScWindowType.UserManager; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.Workbox) { toReturn = ScWindowType.Workbox; }
    else { this.ErrorHand.ErrorAndThrow(this.MapProxyDiscriminatorToScWindowType.name, 'unhandled mapping') };

    return toReturn;
  }
}