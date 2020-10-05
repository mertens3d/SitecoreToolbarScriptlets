import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _HindeCoreBase } from '../../../Shared/scripts/LoggableBase';
import { ContentEditorSFProxy } from './ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { ScDocumentFacade } from "../../Facades/ScDocumentFacade";
import { IStateOfPackageDesigner } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfPackageDesigner";
import { _BaseStateFullProxy } from "./Desktop/DesktopProxy/FrameProxies/_StateProxy";
import { StateFullProxyDisciminator } from "../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { SharedConst } from "../../../Shared/scripts/SharedConst";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { DefaultStateOfPackageDesigner } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfPackageDesigner";
import { CEFrameProxy } from "./Desktop/DesktopProxy/FrameProxies/CEFrameProxy";

export class PackageDesignerSFProxy extends _BaseStateFullProxy<IStateOfPackageDesigner> implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.PackageDesigner;
  private DocumentFacade: ScDocumentFacade;
  Friendly: string;

  constructor(hindeCore: IHindeCore, documentProxy: ScDocumentFacade, friendly: string) {
    super(hindeCore);
    this.Logger.CTORStart(ContentEditorSFProxy.name);
    this.DocumentFacade = documentProxy;
    this.Friendly = friendly;
    this.Logger.CTOREnd(ContentEditorSFProxy.name);
  }

  InstantiateAsyncMembers() {
    this.Logger.FuncStart(this.InstantiateAsyncMembers.name, this.Friendly)
    this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, this.Friendly)
  }

  WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, this.Friendly)
    this.Logger.FuncEnd(this.WireEvents.name, this.Friendly)
  }

  async GetState(): Promise<IStateOfPackageDesigner> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, PackageDesignerSFProxy.name);

      let stateOfPackageDesigner: IStateOfPackageDesigner = new DefaultStateOfPackageDesigner();
      stateOfPackageDesigner.StatusText = this.GetLoadedPackageFileName();

      resolve(stateOfPackageDesigner);

      this.Logger.FuncEnd(this.GetState.name, PackageDesignerSFProxy.name);
    })
  }

  async SetState(stateOfPackageDesigner: IStateOfPackageDesigner): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetState.name, PackageDesignerSFProxy.name);

      //((document.getElementById('AppFrame')).contentDocument).querySelector('[id=InstallerRibbon_Toolbar]').querySelector('[title="Open an existing project"]').click()

      if (stateOfPackageDesigner) {
        if (stateOfPackageDesigner.StatusText.length > 0) {
          let installerRibbonToolbar: HTMLDivElement = null;
          let SelectToOpenProjectFrame: CEFrameProxy = null;
          let FileNameInput: HTMLInputElement = null;
          let OpenProjectOpenButton: HTMLButtonElement = null;

          await this.DocumentFacade.WaitForThenClick([ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.InstallerRibbon_Nav_Package])
            .then(() => this.DocumentFacade.DocumentJacket.WaitForAndReturnFoundElem(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.InstallerRibbon_Toolbar))
            .then((htmlDivElement: HTMLDivElement) => installerRibbonToolbar = htmlDivElement)
            .then(() => this.RecipeBasics.WaitAndReturnFoundFromContainer(installerRibbonToolbar, ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.Open, this.SetState.name))
            .then((htmlElement: HTMLElement) => htmlElement.click())
            .then(() => this.DocumentFacade.DocumentJacket.WaitForIframeElemAndReturnCEFrameProxyWhenReady('[id=scContentIframeId0]', 'select to open project'))
            .then((ceFrameProxy: CEFrameProxy) => SelectToOpenProjectFrame = ceFrameProxy)
            .then(() => {
              FileNameInput = <HTMLInputElement>SelectToOpenProjectFrame.ScDocumentProxy.querySelector('[id=filename]');
              OpenProjectOpenButton = <HTMLButtonElement>SelectToOpenProjectFrame.ScDocumentProxy.querySelector('[id=OK]')
            })
            .then(() => {
              if (FileNameInput && OpenProjectOpenButton) {
                FileNameInput.value = stateOfPackageDesigner.StatusText;
                OpenProjectOpenButton.click();
              }
            })
            .then(() => resolve())
            .catch((err) => reject(this.SetState.name + ' ' + PackageDesignerSFProxy.name + ' | ' + err));
        }
      }

      this.Logger.FuncEnd(this.SetState.name, PackageDesignerSFProxy.name);
    })
  }

  TriggerInboundEventsAsync(): void {
    this.Logger.Log('todo ' + PackageDesignerSFProxy.name);
  }

  //----------------------------------------------------
  private GetLoadedPackageFileName(): string {
    let toReturn: string = '';
    let appFrame: HTMLIFrameElement = <HTMLIFrameElement>this.DocumentFacade.GetElementById('AppFrame');
    if (appFrame) {
      let contentDoc: Document = appFrame.contentDocument;
      if (contentDoc) {
        let target: HTMLElement = contentDoc.getElementById(ContentConst.Const.ElemId.SC.PackageDesigner.StatusText);
        if (target) {
          toReturn = target.innerText;
        }
      }
    }

    //document.getElementById('AppFrame').contentDocument.getElementById('StatusText').innerText

    return toReturn;
  }
}