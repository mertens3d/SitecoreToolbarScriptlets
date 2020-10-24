import { DocumentJacket } from "../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { FrameJacket } from "../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { IScDocProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IStateOf_ } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { ScDocProxyOfTypeT } from "../../Desktop/DesktopProxy/FrameProxies/ScDocProxyOfTypeT";
import { ScDocProxyResolver } from "../../ScDocProxyResolver";

export class JqueryModalDialogsDocProxy extends ScDocProxyOfTypeT<IStateOf_> implements IScDocProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.JqueryModalDialogsDocProxy;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.JqueryModalDialogsDocProxy];

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore, documentJacket);
  }

  async WireEventsSelf(): Promise<void> {
    try {
      await this.EnableWatcherForFrames()
        .catch((err: any) => this.ErrorHand.HandleFatalError([JqueryModalDialogsDocProxy.name, this.WireEventsSelf.name], err));
    } catch (err: any) {
      this.ErrorHand.HandleFatalError([JqueryModalDialogsDocProxy.name, this.WireEventsSelf.name], err);
    }
  }

  //private async ProcessInboundInstallerBuildPackage(dtFrameProxy: DTFrameProxy): Promise<void> {
  //  this.Logger.FuncStart(this.ProcessInboundInstallerBuildPackage.name);
  //  try {
  //    this.Logger.Log('Installer Build Package opened');
  //    //.catch ((err: any) => this.ErrorHand.ErrorAndThrow(this.ProcessInboundInstallerBuildPackage.name, err));
  //  }
  //  catch (err: any) {
  //    this.ErrorHand.HandleFatalError(this.ProcessInboundInstallerBuildPackage.name, err);
  //  }
  //  this.Logger.FuncEnd(this.ProcessInboundInstallerBuildPackage.name);
  //}

  async OpenFile(fileName: string): Promise<void> {
    try {
      //let scContentIframeId0Proxy: ScContentIframeId0Proxy;

      let id0FrameProxy: IScDocProxy = null;
      let id0FrameJacket: FrameJacket = null;
      let proxyFactory: ScDocProxyResolver = new ScDocProxyResolver(this.ApiCore);

      await this.DocumentJacket.WaitForCompleteNAB_DocumentJacket('jquery jacket')
        .then(() => this.DocumentJacket.GetHostedFirstMatchingFrameElemJacket(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.Id))
        .then((matchingJacket: FrameJacket) => id0FrameJacket = matchingJacket)
        //.then(() => proxyFactory.ScDocProxyFactory(ScWindowType.ScContentProxy, )
        //.then(() => scContentIframeId0Proxy.OpenFile(fileName))
        .catch((err: any) => this.ErrorHand.HandleFatalError(this.OpenFile.name, err));
    }
    catch (err: any) {
      this.ErrorHand.HandleFatalError([JqueryModalDialogsDocProxy.name, this.OpenFile.name], err);
    }
  }
}