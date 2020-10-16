import { DocumentJacket } from "../../../../../DOMJacket/Document/DocumentJacket";
import { ScDocProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateLessDTFrameProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateLessFrameProxy";
import { JqueryModalDialogsDocProxy } from "../JqueryModalDialogsDocProxy";
import { _baseStatelessDTFrameProxy } from "./_baseStatelessFrameProxy";

export class JqueryModalDialogsFrameProxy extends _baseStatelessDTFrameProxy implements IStateLessDTFrameProxy {
  FrameSelectorOnHost: string = "[id=jqueryModalDialogsFrame]";
  readonly StateFullProxyDisciminator: ScDocProxyDisciminator = ScDocProxyDisciminator.JqueryModalDialogsFrameProxy;
  private JqueryModalDialogsDocProxy: JqueryModalDialogsDocProxy;

  constructor(apiCore: IAPICore, hostJacket: DocumentJacket) {
    super(apiCore, hostJacket, null);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    try {
      await this._base_InstantiateAsyncProperties()
        .then(() => this.JqueryModalDialogsDocProxy = new JqueryModalDialogsDocProxy(this.ApiCore, this.FrameJacket.DocumentJacket, this))
        .then(() => this.JqueryModalDialogsDocProxy.InstantiateAsyncMembers())
        .then(() => this.JqueryModalDialogsDocProxy.WireEvents())
        .catch((err) => this.ErrorHand.HandleFatalError([JqueryModalDialogsFrameProxy.name, this.InstantiateAsyncMembers.name], err));
    } catch (e) {
    }
  }

  async OpenFile(fileName: string): Promise<void> {
    this.Logger.FuncStart([JqueryModalDialogsFrameProxy.name, this.OpenFile.name]);
    //this.
    if (this.JqueryModalDialogsDocProxy) {
      this.JqueryModalDialogsDocProxy.OpenFile(fileName);
    }

    //await this.ElementDivJacket.WaitForElement(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.Open, this.OpenFile.name)
    //if (this.HostedDocProxy.ProxyDiscriminator == StateFullProxyDisciminator.InstallerBrowseProxy) {
    //  let installerBrowse: InstallerBrowseProxy = <InstallerBrowseProxy>this.host;
    //}
    this.Logger.FuncEnd([JqueryModalDialogsFrameProxy.name, this.OpenFile.name]);
  }
}