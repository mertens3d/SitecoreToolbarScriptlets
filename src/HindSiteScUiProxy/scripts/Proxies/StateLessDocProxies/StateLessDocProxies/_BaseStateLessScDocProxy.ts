import { DocumentJacket } from "../../../../../DOMJacket/Document/DocumentJacket";
import { FrameElemJacket } from "../../../../../DOMJacket/Elements/FrameElemJacket";
import { GenericElemJacket } from "../../../../../DOMJacket/Elements/GenericElemJacket";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from "../../../../../Shared/scripts/Interfaces/InjectConst";
import { IStateLessDocProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/IStateLessDocProxy";
import { IStateLessScFrameProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/StateLess/IStateLessFrameProxy";
import { SharedConst } from "../../../../../Shared/scripts/SharedConst";
import { DocumentJacketMutationEvent_Observer } from "../../Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/DocumentProxyMutationEvent_Observer";
import { ElementJacketMutationEvent_Subject } from "../../Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/ElementJacketMutationEvent_Subject";
import { IDocumentJacketMutationEvent_Payload } from "../../Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/IDocumentProxyMutationEvent_Payload";
import { IElemJacketWatcherParameters } from "../../Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/IElemJacketWatcherParameters";
import { _BaseScDocProxy } from "../../Desktop/DesktopProxy/FrameProxies/_BaseScDocProxy";
import { GenericStateLessFrameProxy } from "../StateLessFrameProxies/GenericStateLessFrameProxy";

export abstract class _BaseStateLessScDocProxy extends _BaseScDocProxy implements IStateLessDocProxy {
  HostedFrameStatelessFrameProxies: IStateLessScFrameProxy[] = [];
  protected DocumentJacketMutationEvent_Observer: DocumentJacketMutationEvent_Observer;
  ElemJacketMutationEvent_Subject: ElementJacketMutationEvent_Subject;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore, documentJacket);
  }

  async OnFocus(): Promise<any> {
    //empty by default
  }

  protected _BaseInstantiateAsyncMembers() {
    this.DocumentJacketMutationEvent_Observer = new DocumentJacketMutationEvent_Observer(this.ApiCore, this.CallbackOnDocumentJacketMutationEvent.bind(this));
  }

  async InstantiateAsyncMembers() {
    return this._BaseInstantiateAsyncMembers();
  }

  TriggerInboundEventsAsync(): void {
    //empty
  }

  async WireEvents(): Promise<void> {
    return this._BaseWireEvents();
  }

  protected async _BaseWireEvents(): Promise<void> {
    this.Logger.FuncStart([_BaseStateLessScDocProxy.name, this.WireEvents.name]);
    try {
      let bodyElement: FrameElemJacket;
      let watcherParams: IElemJacketWatcherParameters = {
        Attributes: false,
        ChildList: true,
        Friendly: _BaseStateLessScDocProxy.name,
        Subtree: true,
        TagFilter: ['IFRAME']
      };

      await this.DocumentJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.Html.Body)
        .then((elemJacket: FrameElemJacket) => bodyElement = elemJacket)
        .then(() => bodyElement.AddWatcher(watcherParams))
        .then((elemJacketMutationEvent_Subject: ElementJacketMutationEvent_Subject) => this.ElemJacketMutationEvent_Subject = elemJacketMutationEvent_Subject)
        .then(() => this.ElemJacketMutationEvent_Subject.RegisterObserver(this.DocumentJacketMutationEvent_Observer))
        .catch((err) => this.ErrorHand.HandleFatalError([_BaseStateLessScDocProxy.name, this.WireEvents.name], err));
    }
    catch (err) {
      this.ErrorHand.HandleFatalError([_BaseStateLessScDocProxy.name, this.WireEvents.name], err);
    }
    this.Logger.FuncEnd([_BaseStateLessScDocProxy.name, this.WireEvents.name]);
  }

  private async HandleElemJacketAddedToDocument(elemJacket: GenericElemJacket): Promise<void> {
    this.Logger.FuncStart([_BaseStateLessScDocProxy.name, this.HandleElemJacketAddedToDocument.name]);

    if (elemJacket) {
      if (elemJacket.NodeTagName === SharedConst.Const.KeyWords.NodeTagName.IFrame) {
        await FrameElemJacket.FactoryFrameElemJackets(this.ApiCore, [elemJacket])
          .then((frameElemJackets: FrameElemJacket[]) => this.HandleFrameElemJacketAddedToDoc(frameElemJackets[0]))
          .catch((err) => this.ErrorHand.HandleFatalError([_BaseStateLessScDocProxy.name, this.HandleFrameElemJacketAddedToDoc.name], err));
      }
    }
    else {
      this.Logger.Log('No FrameJacket - no action');
    }

    this.Logger.FuncEnd([_BaseStateLessScDocProxy.name, this.HandleElemJacketAddedToDocument.name]);
  }

  private async HandleFrameElemJacketAddedToDoc(frameElemJacket: FrameElemJacket): Promise<void> {
    this.Logger.FuncStart([_BaseStateLessScDocProxy.name, this.CallbackOnDocumentJacketMutationEvent.name]);
    try {
      await GenericStateLessFrameProxy.StateLessFrameProxyFactory(this.ApiCore, frameElemJacket)
        .then((stateLessFrameProxy: IStateLessScFrameProxy) => this.HostedFrameStatelessFrameProxies.push(stateLessFrameProxy))
        .then(() => this.Logger.Log(this.HandleFrameElemJacketAddedToDoc.name + 'step1 Complete'))
        .catch((err) => this.ErrorHand.HandleFatalError(this.HandleElemJacketAddedToDocument.name, err));

      //let targetedFrames: ScWindowType[] = [ScWindowType.InstallerBuildPackage];
    }
    catch (err) {
      this.ErrorHand.HandleFatalError([_BaseStateLessScDocProxy.name, this.HandleFrameElemJacketAddedToDoc.name], err);
    }
    this.Logger.FuncEnd([_BaseStateLessScDocProxy.name, this.CallbackOnDocumentJacketMutationEvent.name]);
  }
  CallbackOnDocumentJacketMutationEvent(DocumentJacketMutationEvent_Payload: IDocumentJacketMutationEvent_Payload) {
    this.Logger.FuncStart(this.CallbackOnDocumentJacketMutationEvent.name);
    if (DocumentJacketMutationEvent_Payload && DocumentJacketMutationEvent_Payload.AddedGenericElemJacket) {
      this.HandleElemJacketAddedToDocument(DocumentJacketMutationEvent_Payload.AddedGenericElemJacket);
    }

    this.Logger.FuncEnd(this.CallbackOnDocumentJacketMutationEvent.name);
  }
}