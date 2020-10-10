import { DocumentJacket } from "../../../../DOMJacket/DocumentJacket";
import { ElementFrameJacket } from "../../../../DOMJacket/ElementFrameJacket";
import { DefaultStateOfPackageDesigner } from "../../../../Shared/scripts/Classes/Defaults/DefaultStateOfPackageDesigner";
import { RecipeBasics } from "../../../../Shared/scripts/Classes/RecipeBasics";
import { StateFullProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IStateOfPackageDesigner } from "../../../../Shared/scripts/Interfaces/Data/States/IStateOfPackageDesigner";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { ContentEditorSFProxy } from '../ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { _BaseStateFullProxy } from "../Desktop/DesktopProxy/FrameProxies/_StateProxy";
import { AppFrameProxy } from "../SupportProxies/AppFrameProxy";

export class PackageDesignerProxy extends _BaseStateFullProxy<IStateOfPackageDesigner> implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.PackageDesigner;
  StateFullProxyDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.PackageDesigner];
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

  async InstantiateAsyncMembers(): Promise<void> {
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

      if (stateOfPackageDesigner) {
        if (stateOfPackageDesigner.StatusText.length > 0) {
          let appFrameProxy: AppFrameProxy = null;
          let parentJacket: DocumentJacket = this.DocumentJacket.GetParentJacket();
          if (!parentJacket) {
            reject(this.GetState + ' - ' + PackageDesignerProxy.name + ' - no parent jacket');
          }

          await this.DocumentJacket.WaitForCompleteNAB_DocumentJacket(this.SetState.name + ' ' + PackageDesignerProxy.name)
            .then(() => this.DocumentJacket.WaitForFirstHostedFrame(ContentConst.Const.Selector.SC.Frames.AppFrame.Id))
            .then((frameJacket: ElementFrameJacket) => this.SupportFrameFactory.MakeAppFrameProxy(frameJacket, parentJacket))
            .then((returnedAppFrameProxy: AppFrameProxy) => appFrameProxy = returnedAppFrameProxy)
            .then(() => appFrameProxy.OpenFile(stateOfPackageDesigner.StatusText))
            .then(() => resolve())
            .catch((err) => reject(this.ErrorHand.FormatejectMessage([PackageDesignerProxy.name, this.SetState.name], err)));
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