import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { ElementDivJacket } from "../../../../DOMJacket/scripts/Elements/ElementDivJacket";
import { DefaultStateOfPackageDesigner } from "../../../../Shared/scripts/Classes/Defaults/DefaultStateOfPackageDesigner";
import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { PromiseFailAction } from "../../../../Shared/scripts/Enums/PromiseFailAction";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IStateFullDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { IStateFullElemProxy } from "../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullElemProxy";
import { IStateOfPackageDesigner } from "../../../../Shared/scripts/Interfaces/StateOf/IStateOfPackageDesigner";
import { _BaseStateFullDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_BaseStateFullDocProxy";
import { InstallerDesignerProxy } from "../StateLessDocProxies/StateLessDocProxies/InstallerDesignerProxy";
import { PackageDesignerInstallerRibbonToolbarElemProxy } from "../StateLessDocProxies/StateLessElemProxies/PackageDesignerInstallerRibbonToolbarProxy";
import { JqueryModalDialogsFrameProxy } from "../StateLessDocProxies/StateLessFrameProxies/JqueryModalDialogsFrameProxy";

export class PackageDesignerDocProxy extends _BaseStateFullDocProxy<IStateOfPackageDesigner> implements IStateFullDocProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.PackageDesigner;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.PackageDesigner];
  packagedesignerInstallerRibbonToolbarElem: PackageDesignerInstallerRibbonToolbarElemProxy = null;
  HostedElemProxies: IStateFullElemProxy[] = [];
  Friendly: string;

  //note; /en/sitecore/shell/Applications/Tools/Installer/Designer gets loaded into this doc

  private JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket, friendly: string, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) {
    super(apiCore, documentJacket);
    this.Logger.CTORStart(PackageDesignerDocProxy.name);

    this.Friendly = friendly;
    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;
    this.ErrorHand.ThrowIfNullOrUndefined([PackageDesignerDocProxy.name], [documentJacket, jqueryModalDialogsFrameProxy]);

    this.Logger.CTOREnd(PackageDesignerDocProxy.name);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart([PackageDesignerDocProxy.name, this.InstantiateAsyncMembers.name], this.Friendly);

    await this.HarvestElements()
      .then(() => this.HarvestRibbonToolbar())
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

  private async HarvestRibbonToolbar(): Promise<void> {
    this.Logger.FuncStart([InstallerDesignerProxy.name, this.HarvestRibbonToolbar.name]);

    await this.DocumentJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.InstallerRibbon_Toolbar, PromiseFailAction.RejectThrow)
      .then((elementDivJacket: ElementDivJacket) => this.packagedesignerInstallerRibbonToolbarElem = new PackageDesignerInstallerRibbonToolbarElemProxy(this.ApiCore, elementDivJacket, this.JqueryModalDialogsFrameProxy))
      .then(() => this.packagedesignerInstallerRibbonToolbarElem.InstantiateAsyncMembers())
      .catch((err: any) => this.ErrorHand.HandleFatalError([InstallerDesignerProxy.name, this.HarvestRibbonToolbar.name], err));

    this.Logger.FuncEnd([InstallerDesignerProxy.name, this.HarvestRibbonToolbar.name]);
  }

  async OpenFile(fileName: string): Promise<void> {
    this.Logger.FuncStart([InstallerDesignerProxy.name, this.OpenFile.name]);
    try {
      this.packagedesignerInstallerRibbonToolbarElem = null;

      if (this.packagedesignerInstallerRibbonToolbarElem) {
        await this.packagedesignerInstallerRibbonToolbarElem.OpenFile(fileName)
          .catch((err: any) => this.ErrorHand.HandleFatalError(this.OpenFile.name, err));
      }
    }
    catch (err: any) {
      this.ErrorHand.HandleFatalError([InstallerDesignerProxy.name, this.OpenFile.name], err);
    }

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