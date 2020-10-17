import { DocumentJacket } from "../../../../../DOMJacket/Document/DocumentJacket";
import { ElementDivJacket } from "../../../../../DOMJacket/Elements/ElementDivJacket";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { PromiseFailAction } from "../../../../../Shared/scripts/Enums/PromiseFailAction";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateLessDocProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/IStateLessDocProxy";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { PackageDesignerInstallerRibbonToolbarElemProxy } from "../StateLessElemProxies/PackageDesignerInstallerRibbonToolbarProxy";
import { JqueryModalDialogsFrameProxy } from "../StateLessFrameProxies/JqueryModalDialogsFrameProxy";
import { _BaseStateLessScDocProxy } from "./_BaseStateLessScDocProxy";

//old AppFrameProxy
export class InstallerDesignerProxy extends _BaseStateLessScDocProxy implements IStateLessDocProxy {
  FrameSelectorOnHost: string = ContentConst.Const.Selector.SC.Frames.AppFrame.Id;
  ScProxyDisciminator: ScProxyDisciminator;
  ScProxyDisciminatorFriendly: any;

  private JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;

  constructor(apiCore: IAPICore, hostDocJacket: DocumentJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) {
    super(apiCore, hostDocJacket);
    this.Logger.CTORStart(InstallerDesignerProxy.name);

    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;

    this.Logger.CTOREnd(InstallerDesignerProxy.name);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart([InstallerDesignerProxy.name, this.InstantiateAsyncMembers.name]);
    try {
      //await this._base_InstantiateAsyncProperties()
      //  .catch((err) => this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err));
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err);
    }
    this.Logger.FuncEnd([InstallerDesignerProxy.name, this.InstantiateAsyncMembers.name]);
  }

  async OpenFile(fileName: string): Promise<void> {
    this.Logger.FuncStart([InstallerDesignerProxy.name, this.OpenFile.name]);
    try {
      let toolbarProxy: PackageDesignerInstallerRibbonToolbarElemProxy = null;

      await this.DocumentJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.InstallerRibbon_Toolbar, PromiseFailAction.RejectThrow)
        .then((elementDivJacket: ElementDivJacket) => toolbarProxy = new PackageDesignerInstallerRibbonToolbarElemProxy(this.ApiCore, elementDivJacket, this.JqueryModalDialogsFrameProxy))
        .then(() => toolbarProxy.OpenFile(fileName))
        .catch((err) => this.ErrorHand.HandleFatalError(this.OpenFile.name, err));
    }
    catch (err) {
      this.ErrorHand.HandleFatalError([InstallerDesignerProxy.name, this.OpenFile.name], err);
    }

    this.Logger.FuncEnd([InstallerDesignerProxy.name, this.OpenFile.name]);
  }
}