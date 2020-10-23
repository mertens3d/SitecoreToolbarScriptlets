import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { DefaultStateOfPackageDesigner } from "../../../../Shared/scripts/Classes/Defaults/DefaultStateOfPackageDesigner";
import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IBaseScDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/IBaseScDocProxy";
import { IStateOfPackageDesigner } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfPackageDesigner";
import { _BaseStateFullDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_BaseStateFullDocProxy";
import { InstallerDesignerProxy } from "../StateLessDocProxies/StateLessDocProxies/InstallerDesignerProxy";

export class PackageDesignerDocProxy extends _BaseStateFullDocProxy<IStateOfPackageDesigner> implements IBaseScDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.PackageDesigner;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.PackageDesigner];

  //note; /en/sitecore/shell/Applications/Tools/Installer/Designer gets loaded into this doc


  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore, documentJacket);
    this.Logger.CTORStart(PackageDesignerDocProxy.name);

    this.ErrorHand.ThrowIfNullOrUndefined([PackageDesignerDocProxy.name], [documentJacket]);

    this.Logger.CTOREnd(PackageDesignerDocProxy.name);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart([PackageDesignerDocProxy.name, this.InstantiateAsyncMembers.name], this.Friendly);

    await this.HarvestElements()
      
      .catch((err: any) => this.ErrorHand.HandleFatalError([PackageDesignerDocProxy.name, this.InstantiateAsyncMembers.name], err));
    try {
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err);
    }

    this.Logger.FuncEnd([PackageDesignerDocProxy.name, this.InstantiateAsyncMembers.name], this.Friendly);
  }

  private async HarvestElements(): Promise<void> {
    this.Logger.FuncStart([PackageDesignerDocProxy.name, this.HarvestElements.name], this.Friendly);
    try {
    } catch (err: any) {
      this.ErrorHand.HandleFatalError([PackageDesignerDocProxy.name, this.WireEvents.name], err);
    }
    this.Logger.FuncEnd([PackageDesignerDocProxy.name, this.HarvestElements.name], this.Friendly);
  }

  async WireEvents(): Promise<void> {
    this.Logger.FuncStart(this.WireEvents.name, this.Friendly);

    await this.EnableWatcherForFrames()
      .catch((err: any) => this.ErrorHand.HandleFatalError([PackageDesignerDocProxy.name, this.WireEvents.name], err));

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



  async OpenFile(fileName: string): Promise<void> {
    this.Logger.FuncStart([InstallerDesignerProxy.name, this.OpenFile.name]);
    

    this.Logger.FuncEnd([InstallerDesignerProxy.name, this.OpenFile.name]);
  }

  async SetState(stateOfPackageDesigner: IStateOfPackageDesigner): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetState.name, PackageDesignerDocProxy.name);

      if (stateOfPackageDesigner) {
        if (stateOfPackageDesigner.StatusText.length > 0) {
          //let installerDesignerProxy: InstallerDesignerProxy = null;

          //installerDesignerProxy = new InstallerDesignerProxy(this.ApiCore, this.DocumentJacket, this.JqueryModalDialogsFrameProxy);

          //await installerDesignerProxy.InstantiateAsyncMembers()
          await this.OpenFile(stateOfPackageDesigner.StatusText)
            .then(() => resolve())
            .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([PackageDesignerDocProxy.name, this.SetState.name], err)));

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
          //  .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([PackageDesignerDocProxy.name, this.SetState.name], err)));
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