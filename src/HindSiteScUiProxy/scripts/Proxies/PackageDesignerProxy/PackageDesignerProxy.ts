import { DocumentJacket } from "../../../../DOMJacket/Document/DocumentJacket";
import { DefaultStateOfPackageDesigner } from "../../../../Shared/scripts/Classes/Defaults/DefaultStateOfPackageDesigner";
import { ScDocProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullDocProxy } from "../../../../Shared/scripts/Interfaces/Agents/IStateFullProxy";
import { IStateLessDocProxy } from "../../../../Shared/scripts/Interfaces/Agents/IStateLessDocProxy";
import { IStateOfPackageDesigner } from "../../../../Shared/scripts/Interfaces/Data/States/IStateOfPackageDesigner";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { RecipeBasics } from "../../RecipeBasics";
import { ContentEditorProxy } from '../ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { _BaseStateFullDocProxy, _BaseStateLessScDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_StateProxy";
import { InstallerDesignerProxy } from "../SupportProxies/StateLessFrameProxies/InstallerDesignerProxy";
import { JqueryModalDialogsFrameProxy } from "../SupportProxies/StateLessFrameProxies/JqueryModalDialogsFrameProxy";

export class InstallerBuildPackageDocProxy extends _BaseStateLessScDocProxy implements IStateLessDocProxy {
    ScDocProxyDisciminator: ScDocProxyDisciminator;
    ScDocProxyDisciminatorFriendly: any;


  async InstantiateAsyncMembers() {
        //empty
    }
    TriggerInboundEventsAsync(): void {
        //empty
    }
    WireEvents() {
        //empty
    }


}

export class PackageDesignerDocProxy extends _BaseStateFullDocProxy<IStateOfPackageDesigner> implements IStateFullDocProxy {
  readonly ScDocProxyDisciminator = ScDocProxyDisciminator.PackageDesigner;
  readonly ScDocProxyDisciminatorFriendly = ScDocProxyDisciminator[ScDocProxyDisciminator.PackageDesigner];
  
  Friendly: string;
  private JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket, friendly: string, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) {
    super(apiCore, documentJacket);
    this.Logger.CTORStart(ContentEditorProxy.name);
    this.Friendly = friendly;
    this.RecipeBasics = new RecipeBasics(this.ApiCore);
    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;

    this.ErrorHand.ThrowIfNullOrUndefined([PackageDesignerDocProxy.name], [documentJacket, jqueryModalDialogsFrameProxy]);

    this.Logger.CTOREnd(ContentEditorProxy.name);
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
      this.Logger.FuncStart(this.GetState.name, PackageDesignerDocProxy.name);

      let stateOfPackageDesigner: IStateOfPackageDesigner = new DefaultStateOfPackageDesigner();
      stateOfPackageDesigner.StatusText = this.GetLoadedPackageFileName();

      resolve(stateOfPackageDesigner);

      this.Logger.FuncEnd(this.GetState.name, PackageDesignerDocProxy.name);
    });
  }

  async SetState(stateOfPackageDesigner: IStateOfPackageDesigner): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetState.name, PackageDesignerDocProxy.name);

      if (stateOfPackageDesigner) {
        if (stateOfPackageDesigner.StatusText.length > 0) {
          let installerDesignerProxy: InstallerDesignerProxy = null;

          installerDesignerProxy = new InstallerDesignerProxy(this.ApiCore, this.DocumentJacket, this.JqueryModalDialogsFrameProxy);

          await installerDesignerProxy.InstantiateAsyncMembers()
            .then(() => installerDesignerProxy.OpenFile(stateOfPackageDesigner.StatusText))
            .then(() => resolve())
            .catch((err) => this.ErrorHand.FormatRejectMessage([PackageDesignerDocProxy.name, this.SetState.name], err));

          //let parentJacket: DocumentJacket = this.DocumentJacket.GetParentJacket();
          //if (!parentJacket) {
          //  reject(this.GetState + ' - ' + PackageDesignerDocProxy.name + ' - no parent jacket');
          //}

          //await this.DocumentJacket.WaitForCompleteNAB_DocumentJacket(this.SetState.name + ' ' + PackageDesignerDocProxy.name)
          //  .then(() => this.DocumentJacket.WaitForFirstHostedFrame(ContentConst.Const.Selector.SC.Frames.AppFrame.Id))
          //  .then((frameJacket: ElementFrameJacket) => this.SupportFrameFactory.MakeAppFrameProxy(parentJacket))
          //  .then((returnedAppFrameProxy: AppFrameProxy) => appFrameProxy = returnedAppFrameProxy)
          //  .then(() => appFrameProxy.OpenFile(stateOfPackageDesigner.StatusText, this.JqueryModalDialogsProxy))
          //  .then(() => resolve())
          //  .catch((err) => reject(this.ErrorHand.FormatRejectMessage([PackageDesignerDocProxy.name, this.SetState.name], err)));
        }
      }

      this.Logger.FuncEnd(this.SetState.name, PackageDesignerDocProxy.name);
    });
  }

  TriggerInboundEventsAsync(): void {
    this.Logger.Log('todo ' + PackageDesignerDocProxy.name);
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