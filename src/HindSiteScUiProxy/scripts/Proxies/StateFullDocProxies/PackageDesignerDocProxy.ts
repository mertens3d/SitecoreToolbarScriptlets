import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { DefaultStateOfPackageDesigner } from "../../../../Shared/scripts/Classes/Defaults/DefaultStateOfPackageDesigner";
import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IScDocProxy } from "../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOfPackageDesigner } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfPackageDesigner";
import { ScDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_BaseStateFullDocProxy";
import { InstallerDesignerProxy } from "../StateLessDocProxies/StateLessDocProxies/InstallerDesignerProxy";

export class PackageDesignerDocProxy extends ScDocProxy<IStateOfPackageDesigner> implements IScDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.PackageDesigner;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.PackageDesigner];

  //note; /en/sitecore/shell/Applications/Tools/Installer/Designer gets loaded into this doc


  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore, documentJacket);
    this.Logger.CTORStart(PackageDesignerDocProxy.name);

    this.ErrorHand.ThrowIfNullOrUndefined([PackageDesignerDocProxy.name], [documentJacket]);

    this.Logger.CTOREnd(PackageDesignerDocProxy.name);
  }

  async InstantiateAsyncMembersSelf(): Promise<void> {
    this.Logger.FuncStart([PackageDesignerDocProxy.name, this.InstantiateAsyncMembersSelf.name], this.Friendly);

    await this.HarvestElements()
      
      .catch((err: any) => this.ErrorHand.HandleFatalError([PackageDesignerDocProxy.name, this.InstantiateAsyncMembersSelf.name], err));
    try {
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembersSelf.name, err);
    }

    this.Logger.FuncEnd([PackageDesignerDocProxy.name, this.InstantiateAsyncMembersSelf.name], this.Friendly);
  }

  private async HarvestElements(): Promise<void> {
    this.Logger.FuncStart([PackageDesignerDocProxy.name, this.HarvestElements.name], this.Friendly);
    try {
    } catch (err: any) {
      this.ErrorHand.HandleFatalError([PackageDesignerDocProxy.name, this.WireEventsSelf.name], err);
    }
    this.Logger.FuncEnd([PackageDesignerDocProxy.name, this.HarvestElements.name], this.Friendly);
  }

  async WireEventsSelf(): Promise<void> {
    this.Logger.FuncStart(this.WireEventsSelf.name, this.Friendly);

    await this.EnableWatcherForFrames()
      .catch((err: any) => this.ErrorHand.HandleFatalError([PackageDesignerDocProxy.name, this.WireEventsSelf.name], err));

    this.Logger.FuncEnd(this.WireEventsSelf.name, this.Friendly);
  }

  async GetStateOfSelf(): Promise<IStateOfPackageDesigner> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfSelf.name, PackageDesignerDocProxy.name);

      let stateOfPackageDesigner: IStateOfPackageDesigner = new DefaultStateOfPackageDesigner();
      stateOfPackageDesigner.StatusText = this.GetLoadedPackageFileName();

      resolve(stateOfPackageDesigner);

      this.Logger.FuncEnd(this.GetStateOfSelf.name, PackageDesignerDocProxy.name);
    });
  }



  async OpenFile(fileName: string): Promise<void> {
    this.Logger.FuncStart([InstallerDesignerProxy.name, this.OpenFile.name]);
    

    this.Logger.FuncEnd([InstallerDesignerProxy.name, this.OpenFile.name]);
  }

  async SetStateSelf(stateOfPackageDesigner: IStateOfPackageDesigner): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateSelf.name, PackageDesignerDocProxy.name);

      if (stateOfPackageDesigner) {
        if (stateOfPackageDesigner.StatusText.length > 0) {
          //let installerDesignerProxy: InstallerDesignerProxy = null;

          //installerDesignerProxy = new InstallerDesignerProxy(this.ApiCore, this.DocumentJacket, this.JqueryModalDialogsFrameProxy);

          //await installerDesignerProxy.InstantiateAsyncMembers()
          await this.OpenFile(stateOfPackageDesigner.StatusText)
            .then(() => resolve())
            .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([PackageDesignerDocProxy.name, this.SetStateSelf.name], err)));

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

      this.Logger.FuncEnd(this.SetStateSelf.name, PackageDesignerDocProxy.name);
    });
  }

  TriggerEventsForInboundSelf(): void {
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