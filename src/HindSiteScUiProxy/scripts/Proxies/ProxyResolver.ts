import { DocumentJacket } from "../../../DOMJacket/DocumentJacket";
import { StateFullProxyDisciminator } from "../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { ScWindowType } from '../../../Shared/scripts/Enums/5000 - scWindowType';
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _HindeCoreBase } from "../../../Shared/scripts/_HindeCoreBase";
import { ContentEditorSFProxy } from './ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { DesktopSFProxy } from './Desktop/DesktopProxy/DesktopProxy';
import { FallBackProxy } from "./FallBackProxy";
import { LaunchPadProxy } from "./LaunchPadProxy";
import { MediaLibraryProxy } from "./MediaLibraryProxy";
import { PackageDesignerProxy } from "./PackageDesignerProxy/PackageDesignerProxy";
import { TemplateManagerProxy } from "./TemplateManagerProxy";

export class StateFullProxyResolver extends _HindeCoreBase {
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

      ScWindowType.RollManager,
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
      else if (windowType === ScWindowType.AccessViewer) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.Archive) { StateFullProxy = new FallBackProxy(this.HindeCore); }

      else if (windowType === ScWindowType.ContentEditor) { StateFullProxy = new ContentEditorSFProxy(this.HindeCore, documentJacket, 'Solo Content Editor doc'); }

      else if (windowType === ScWindowType.ControlPanel) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.Debug) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.Desktop) { StateFullProxy = new DesktopSFProxy(this.HindeCore, documentJacket); }
      else if (windowType === ScWindowType.DomainManager) { StateFullProxy = new FallBackProxy(this.HindeCore); }

      else if (windowType === ScWindowType.EmailExperienceManager) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.ExperienceAnalytics) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.ExperienceEditor_Edit) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.ExperienceEditor_Normal) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.ExperienceEditor_Preview) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.ExperienceOptimization) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.ExperienceProfile) { StateFullProxy = new FallBackProxy(this.HindeCore); }

      else if (windowType === ScWindowType.FallBack) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.FederatedExperienceManager) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.Forms) { StateFullProxy = new FallBackProxy(this.HindeCore); }

      else if (windowType === ScWindowType.InstallationWizard) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.InstalledLicenses) { StateFullProxy = new FallBackProxy(this.HindeCore); }

      else if (windowType === ScWindowType.KeyboardMap) { StateFullProxy = new FallBackProxy(this.HindeCore); }

      else if (windowType === ScWindowType.Launchpad) { StateFullProxy = new LaunchPadProxy(this.HindeCore); }
      else if (windowType === ScWindowType.LicenseDetails) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.ListManager) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.LoginPage) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.LogViewer) { StateFullProxy = new FallBackProxy(this.HindeCore); }

      else if (windowType === ScWindowType.MarketingControlPanel) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.MarketingAutomation) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.MediaLibrary) { StateFullProxy = new MediaLibraryProxy(this.HindeCore, documentJacket, 'media library'); }

      else if (windowType === ScWindowType.PackageDesigner) { StateFullProxy = new PackageDesignerProxy(this.HindeCore, documentJacket, 'PackageDesigner'); }
      else if (windowType === ScWindowType.PathAnalyzer) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.Publish) { StateFullProxy = new FallBackProxy(this.HindeCore); }

      else if (windowType === ScWindowType.RecycleBin) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.RollManager) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.Run) { StateFullProxy = new FallBackProxy(this.HindeCore); }

      else if (windowType === ScWindowType.ScanForBrokenLinks) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.SecurityEditor) { StateFullProxy = new FallBackProxy(this.HindeCore); }

      else if (windowType === ScWindowType.TemplateManager) { StateFullProxy = new TemplateManagerProxy(this.HindeCore, documentJacket, 'templateManager'); }

      else if (windowType === ScWindowType.UpdateCenter) { StateFullProxy = new FallBackProxy(this.HindeCore); }
      else if (windowType === ScWindowType.UserManager) { StateFullProxy = new FallBackProxy(this.HindeCore); }

      else if (windowType === ScWindowType.Workbox) { StateFullProxy = new FallBackProxy(this.HindeCore); }

      else { this.ErrorHand.ErrorAndThrow(this.StateFullProxyFactory.name, 'unhandled windowType ' + ScWindowType[windowType]); }

      await StateFullProxy.InstantiateAsyncMembers()
        .then(() => StateFullProxy.WireEvents())
        .then(() => resolve(StateFullProxy))
        .catch((err) => reject(this.ErrorHand.FormatejectMessage([StateFullProxyResolver.name, this.StateFullProxyFactory.name], err)))
    });
  }

  ProxyDiscriminatorToScWindowType(proxyDiscriminator: StateFullProxyDisciminator): ScWindowType {
    let toReturn: ScWindowType = ScWindowType.Unknown;

    if (false) { }
    else if (proxyDiscriminator === StateFullProxyDisciminator.ContentEditor) { toReturn = ScWindowType.ContentEditor; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.MediaLibrary) { toReturn = ScWindowType.MediaLibrary; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.PackageDesigner) { toReturn = ScWindowType.PackageDesigner; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.TemplateManager) { toReturn = ScWindowType.TemplateManager; }
    else if (proxyDiscriminator === StateFullProxyDisciminator.Desktop) { this.ErrorHand.ErrorAndThrow(this.ProxyDiscriminatorToScWindowType.name, 'Something has gone wrong'); }

    return toReturn;
  }
}