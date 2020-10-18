import { DocumentJacket } from "../../../../../DOMJacket/Document/DocumentJacket";
import { FrameElemJacket } from "../../../../../DOMJacket/Elements/FrameElemJacket";
import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { ScWindowType } from "../../../../../Shared/scripts/Enums/50 - scWindowType";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { IStateLessDocProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/IStateLessDocProxy";
import { IStateLessScFrameProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/StateLess/IStateLessFrameProxy";
import { ElementJacketMutationEvent_Subject } from "../../Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/ElementJacketMutationEvent_Subject";
import { IElemJacketWatcherParameters } from "../../Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/IElemJacketWatcherParameters";
import { ScDocProxyResolver } from "../../ScDocProxyResolver";
import { _BaseStateLessScDocProxy } from "./_BaseStateLessScDocProxy";

export class JqueryModalDialogsDocProxy extends _BaseStateLessScDocProxy implements IStateLessDocProxy {
  readonly ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.JqueryModalDialogsDocProxy;
  readonly ScProxyDisciminatorFriendly: string;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore, documentJacket);
  }

  //--------------------------------------------

  private GetHostedFrameProxyByScWindowType(scWindowType: ScWindowType): IStateLessScFrameProxy {
    let stateLessFrameProxyToReturn: IStateLessScFrameProxy = null;

    //this.HostedFrameProxies.forEach((stateLessFrameProxy: StateLessFrameProxy) => {
    //  if (stateLessFrameProxy.HostedDocProxy. GetHostedDocScWindowType() === scWindowType) {
    //    stateLessFrameProxyToReturn = stateLessFrameProxy;
    //  }
    //})

    return stateLessFrameProxyToReturn;
  }

  async WireEvents(): Promise<void> {
    this._BaseWireEvents();
    this.WireWatcher();
  }

  private async  WireWatcher(): Promise<void> {
    this.Logger.FuncStart([JqueryModalDialogsDocProxy.name, this.WireWatcher.name]);
    try {
      let bodyElement: FrameElemJacket;
      let watcherParams: IElemJacketWatcherParameters = {
        Attributes: false,
        ChildList: true,
        OwnerFriendly: JqueryModalDialogsDocProxy.name,
        Subtree: false,
        TagFilter: ['IFRAME']
      };

      await this.DocumentJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.Html.Body)
        .then((elemJacket: FrameElemJacket) => bodyElement = elemJacket)
        .then(() => bodyElement.AddWatcher(watcherParams))
        .then((elemJacketMutationEvent_Subject: ElementJacketMutationEvent_Subject) => this.ElemJacketMutationEvent_Subject = elemJacketMutationEvent_Subject)
        .then(() => this.ElemJacketMutationEvent_Subject.RegisterObserver(this.DocumentJacketMutationEvent_Observer))
        .catch((err) => this.ErrorHand.HandleFatalError([JqueryModalDialogsDocProxy.name, this.WireEvents.name], err));
    }
    catch (err) {
      this.ErrorHand.HandleFatalError([JqueryModalDialogsDocProxy.name, this.WireEvents.name], err);
    }


    this.Logger.FuncEnd([JqueryModalDialogsDocProxy.name, this.WireWatcher.name]);
  }

  //private async ProcessInboundInstallerBuildPackage(dtFrameProxy: DTFrameProxy): Promise<void> {
  //  this.Logger.FuncStart(this.ProcessInboundInstallerBuildPackage.name);
  //  try {
  //    this.Logger.Log('Installer Build Package opened');
  //    //.catch ((err) => this.ErrorHand.ErrorAndThrow(this.ProcessInboundInstallerBuildPackage.name, err));
  //  }
  //  catch (err) {
  //    this.ErrorHand.HandleFatalError(this.ProcessInboundInstallerBuildPackage.name, err);
  //  }
  //  this.Logger.FuncEnd(this.ProcessInboundInstallerBuildPackage.name);
  //}

  async OpenFile(fileName: string): Promise<void> {
    try {
      //let scContentIframeId0Proxy: ScContentIframeId0Proxy;

      let id0FrameProxy: IStateLessDocProxy = null;
      let id0FrameJacket: FrameElemJacket = null;
      let proxyFactory: ScDocProxyResolver = new ScDocProxyResolver(this.ApiCore);

      await this.DocumentJacket.WaitForCompleteNAB_DocumentJacket('jquery jacket')
        .then(() => this.DocumentJacket.GetHostedFirstMatchingFrameElemJacket(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.Id))
        .then((matchingJacket: FrameElemJacket) => id0FrameJacket = matchingJacket)
        //.then(() => proxyFactory.ScDocProxyFactory(ScWindowType.ScContentProxy, )
        //.then(() => scContentIframeId0Proxy.OpenFile(fileName))
        .catch((err) => this.ErrorHand.HandleFatalError(this.OpenFile.name, err));
    }
    catch (err) {
      this.ErrorHand.HandleFatalError([JqueryModalDialogsDocProxy.name, this.OpenFile.name], err);
    }
  }
}