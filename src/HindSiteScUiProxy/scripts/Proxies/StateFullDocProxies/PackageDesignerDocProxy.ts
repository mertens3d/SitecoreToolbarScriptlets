import { DocumentJacket } from "../../../../DOMJacket/Document/DocumentJacket";
import { DefaultStateOfPackageDesigner } from "../../../../Shared/scripts/Classes/Defaults/DefaultStateOfPackageDesigner";
import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { IStateOfPackageDesigner } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfPackageDesigner";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { RecipeBasics } from "../../RecipeBasics";
import { _BaseStateFullDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_BaseStateFullDocProxy";
import { InstallerDesignerProxy } from "../StateLessDocProxies/StateLessDocProxies/InstallerDesignerProxy";
import { JqueryModalDialogsFrameProxy } from "../StateLessDocProxies/StateLessFrameProxies/JqueryModalDialogsFrameProxy";

export class PackageDesignerDocProxy extends _BaseStateFullDocProxy<IStateOfPackageDesigner> implements IStateFullDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.PackageDesigner;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.PackageDesigner];

  Friendly: string;
  private JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket, friendly: string, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) {
    super(apiCore, documentJacket);
    this.Logger.CTORStart(PackageDesignerDocProxy.name);

    this.Friendly = friendly;
    this.RecipeBasics = new RecipeBasics(this.ApiCore);
    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;
    this.ErrorHand.ThrowIfNullOrUndefined([PackageDesignerDocProxy.name], [documentJacket, jqueryModalDialogsFrameProxy]);

    this.Logger.CTOREnd(PackageDesignerDocProxy.name);
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
            .catch((err) => reject(this.ErrorHand.FormatRejectMessage([PackageDesignerDocProxy.name, this.SetState.name], err)));

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