import { FrameElemJacket } from "../../../../../DOMJacket/Elements/FrameElemJacket";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IStateLessScFrameProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/StateLess/IStateLessFrameProxy";
import { JqueryModalDialogsDocProxy } from "../StateLessDocProxies/JqueryModalDialogsDocProxy";
import { _baseStatelessFrameProxyOfType } from "./_baseStatelessFrameProxyOfType";

export class JqueryModalDialogsFrameProxy extends _baseStatelessFrameProxyOfType<JqueryModalDialogsDocProxy> implements IStateLessScFrameProxy {
  FrameElemJacket: FrameElemJacket;
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.JqueryModalDialogsFrameProxy;
  readonly ScProxyDisciminatorFriendly: string = ScProxyDisciminator[ScProxyDisciminator.JqueryModalDialogsFrameProxy];

  FrameSelectorOnHost: string = "[id=jqueryModalDialogsFrame]";
  readonly StateFullProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.JqueryModalDialogsFrameProxy;

  //constructor(apiCore: IAPICore, hostJacket: DocumentJacket) {
  //  super(apiCore, hostJacket, null);
  //}

  //async InstantiateAsyncMembers(): Promise<void> {
  //  try {
  //    //await this._base_InstantiateAsyncProperties()
  //    //  .then(() => this.JqueryModalDialogsDocProxy = new JqueryModalDialogsDocProxy(this.ApiCore, this.FrameJacket.DocumentJacket, this))
  //    //  .then(() => this.JqueryModalDialogsDocProxy.InstantiateAsyncMembers())
  //    //  .then(() => this.JqueryModalDialogsDocProxy.WireEvents())
  //    //  .catch((err) => this.ErrorHand.HandleFatalError([JqueryModalDialogsFrameProxy.name, this.InstantiateAsyncMembers.name], err));
  //  } catch (e) {
  //  }
  //}

  TriggerInboundEventsAsync() {
    // empty
  }
  WireEvents() {
    // empty
  }

  async PackageDesignerOpenFile(fileName: string): Promise<void> {
    this.Logger.FuncStart([JqueryModalDialogsFrameProxy.name, this.PackageDesignerOpenFile.name]);
    //this.

  //  let installerBuildPackage: InstallerBuildPackageDocProxy = this.

  //    if(this.JqueryModalDialogsDocProxy) {
  //      this.JqueryModalDialogsDocProxy.OpenFile(fileName);
  //}

    //await this.ElementDivJacket.WaitForElement(ContentConst.Const.Selector.SC.PackageDesigner.Ribbon.Open, this.OpenFile.name)
    //if (this.HostedDocProxy.ProxyDiscriminator == StateFullProxyDisciminator.InstallerBrowseProxy) {
    //  let installerBrowse: InstallerBrowseProxy = <InstallerBrowseProxy>this.host;
    //}
    this.Logger.FuncEnd([JqueryModalDialogsFrameProxy.name, this.PackageDesignerOpenFile.name]);
  }
}