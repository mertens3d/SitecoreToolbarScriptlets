import { DocumentJacket } from "../../../DOMJacket/DocumentJacket";
import { DefaultStateOfPackageDesigner } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfPackageDesigner";
import { StateFullProxyDisciminator } from "../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfPackageDesigner } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfPackageDesigner";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { ContentEditorSFProxy } from './ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { CEFrameProxy } from "./Desktop/DesktopProxy/FrameProxies/CEFrameProxy";
import { _BaseStateFullProxy } from "./Desktop/DesktopProxy/FrameProxies/_StateProxy";
import { FrameJacket } from "../../../DOMJacket/FrameJacket";
import { RecipeBasics } from "../../../Shared/scripts/Classes/RecipeBasics";
import { PromiseFailAction } from "../../../Shared/scripts/Enums/PromiseFailAction";
import { ElementJacket } from "../../../DOMJacket/ElementJacket";
import { ElementDivJacket } from "../../../DOMJacket/ElementDivJacket";
import { SharedConst } from "../../../Shared/scripts/SharedConst";

export class PackageDesignerProxy extends _BaseStateFullProxy<IStateOfPackageDesigner> implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.PackageDesigner;
  private DocumentJacket: DocumentJacket;
  Friendly: string;

  constructor(hindeCore: IHindeCore, documentJacket: DocumentJacket, friendly: string) {
    super(hindeCore);
    this.Logger.CTORStart(ContentEditorSFProxy.name);
    this.DocumentJacket = documentJacket;
    this.Friendly = friendly;
    this.RecipeBasics = new RecipeBasics(this.HindeCore);
    this.Logger.CTOREnd(ContentEditorSFProxy.name);
  }

  InstantiateAsyncMembers() {
    this.Logger.FuncStart(this.InstantiateAsyncMembers.name, this.Friendly);
    this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, this.Friendly);
  }

  WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, this.Friendly);
    this.Logger.FuncEnd(this.WireEvents.name, this.Friendly);
  }

  async GetState(): Promise<IStateOfPackageDesigner> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, PackageDesignerProxy.name);

      let stateOfPackageDesigner: IStateOfPackageDesigner = new DefaultStateOfPackageDesigner();
      stateOfPackageDesigner.StatusText = this.GetLoadedPackageFileName();

      resolve(stateOfPackageDesigner);

      this.Logger.FuncEnd(this.GetState.name, PackageDesignerProxy.name);
    });
  }

  async SetState(stateOfPackageDesigner: IStateOfPackageDesigner): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetState.name, PackageDesignerProxy.name);

      //((document.getElementById('AppFrame')).contentDocument).querySelector('[id=InstallerRibbon_Toolbar]').querySelector('[title="Open an existing project"]').click()
      if (stateOfPackageDesigner) {
        if (stateOfPackageDesigner.StatusText.length > 0) {
          let installerRibbonToolbar: ElementDivJacket = null;
          let SelectToOpenProjectFrame: CEFrameProxy = null;
          let FileNameInput: ElementJacket = null;
          let OpenProjectOpenButton: ElementJacket = null;
          let AppFrame: HTMLIFrameElement = null;
          let AppframeJacket: FrameJacket;
          let jqueryInHOme: HTMLIFrameElement;
          let parentJacket: DocumentJacket = this.DocumentJacket.GetParentJacket();
          if (!parentJacket) {
            reject(this.GetState + ' - ' + PackageDesignerProxy.name + ' - no parent jacket');
          }
          let jqueryFrameJacket: FrameJacket = null;
          let scContentIframeId0FrameJacket: FrameJacket = null;

          await this.DocumentJacket.WaitForCompleteNAB_DocumentJacket(this.SetState.name + ' ' + PackageDesignerProxy.name)
            .then(() => this.DocumentJacket.WaitForAndReturnFoundElemJacketFromDoc(ContentConst.Const.Selector.SC.Frames.AppFrame))
            .then((elemJacket: ElementJacket) => this.Logger.LogImportant('found AppFrame'))
            .then(() => {
              AppframeJacket = this.DocumentJacket.GetHostedFramesFilteredBySelectorFirst(ContentConst.Const.Selector.SC.Frames.AppFrame);
              if (!AppframeJacket) { reject('no app frame jacket'); }
            })
            .then(() => AppframeJacket.WaitForCompleteNABHtmlIframeElement('AppFrameJacket'))
            .then(() => AppframeJacket.DocumentJacket.WaitForAndReturnFoundElemJacketFromDoc(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.InstallerRibbon_Toolbar, PromiseFailAction.RejectThrow))
            .then((htmlDivElement: ElementDivJacket) => installerRibbonToolbar = htmlDivElement)
            .then(() => installerRibbonToolbar.WaitAndReturnFoundElemJacketFromElemJacket(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.Open, this.SetState.name))
            .then((elemJacket: ElementJacket) => elemJacket.NativeElement.click())
            .then(() => {
              let matchingJackets: FrameJacket[] = parentJacket.GetHostedFramesFilteredBySelector(ContentConst.Const.Selector.SC.Frames.JqueryModalDialogsFrame)
              if (matchingJackets && matchingJackets.length > 0) {
                jqueryFrameJacket = matchingJackets[0];
                this.Logger.LogImportant('jquery frame found');
              }
              else {
                reject('no matching jacket');
              }
            })
            .then(() => jqueryFrameJacket.WaitForCompleteNABHtmlIframeElement('jquery jacket'))
            .then(() => {
              let matchingJackets: FrameJacket[] = jqueryFrameJacket.DocumentJacket.GetHostedFramesFilteredBySelector(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0)
             
              if (matchingJackets && matchingJackets.length > 0) {
                scContentIframeId0FrameJacket = matchingJackets[0];
                this.Logger.LogImportant('scContentIframeId0FrameJacket frame found');
              }
              else {
                reject('no matching jacket');
              }
            })
            .then(() => scContentIframeId0FrameJacket.WaitForCompleteNABHtmlIframeElement('scContentIframeId0'))
            .then(() => scContentIframeId0FrameJacket.DocumentJacket.WaitForAndReturnFoundElemJacketFromDoc('[id=Filename]'))
            .then((fileNameElemJacket: ElementJacket) => FileNameInput = fileNameElemJacket)
            .then(() => {
              this.Logger.LogImportant('filename jacket found')
              OpenProjectOpenButton = scContentIframeId0FrameJacket.DocumentJacket.QuerySelector('[id=OK]');
              if (!FileNameInput || !OpenProjectOpenButton) {
                reject('missing buttons');
              }
            })
            .then(() => {
              if (FileNameInput && OpenProjectOpenButton) {
                (<HTMLInputElement>FileNameInput.NativeElement).value = stateOfPackageDesigner.StatusText;
                OpenProjectOpenButton.NativeElement.click();
              }
            })
            .then(() => resolve())
            .catch((err) => reject(this.SetState.name + ' ' + PackageDesignerProxy.name + ' | ' + err));
        }
      }

      this.Logger.FuncEnd(this.SetState.name, PackageDesignerProxy.name);
    });
  }

  TriggerInboundEventsAsync(): void {
    this.Logger.Log('todo ' + PackageDesignerProxy.name);
  }

  //----------------------------------------------------

  private GetLoadedPackageFileName(): string {
    let toReturn: string = '';
    let appFrame: HTMLIFrameElement = <HTMLIFrameElement>this.DocumentJacket.GetElementById('AppFrame').NativeElement;
    if (appFrame) {
      let contentDoc: Document = appFrame.contentDocument;
      if (contentDoc) {
        let target: HTMLElement = contentDoc.getElementById(ContentConst.Const.ElemId.SC.PackageDesigner.StatusText);
        if (target) {
          toReturn = target.innerText;
        }
      }
    }
    return toReturn;
  }
}