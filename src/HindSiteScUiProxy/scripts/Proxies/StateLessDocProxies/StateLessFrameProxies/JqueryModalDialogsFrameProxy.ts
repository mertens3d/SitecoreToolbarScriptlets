import { FrameJacket } from "../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IScFrameProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
import { IStateOfDTFrame } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOfDTFrame";
import { BaseScFrameProxy } from "../../Desktop/DesktopProxy/FrameProxies/BaseFrameProxy";

export class JqueryModalDialogsFrameProxy extends BaseScFrameProxy<IStateOfDTFrame> implements IScFrameProxy {
  FrameElemJacket: FrameJacket;
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.JqueryModalDialogsFrameProxy;
  readonly ScProxyDisciminatorFriendly: string = ScProxyDisciminator[ScProxyDisciminator.JqueryModalDialogsFrameProxy];

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
  //    //  .catch((err: any) => this.ErrorHand.HandleFatalError([JqueryModalDialogsFrameProxy.name, this.InstantiateAsyncMembers.name], err));
  //  } catch (e) {
  //  }
  //}


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