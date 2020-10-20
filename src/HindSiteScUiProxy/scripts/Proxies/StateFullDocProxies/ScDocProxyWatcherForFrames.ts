import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { IJacketOfType } from "../../../../Shared/scripts/IJacketOfType";
import { FrameElemJacket } from "../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { ElementJacketMutationEvent_Observer } from "../../../../DOMJacket/scripts/Events/ElementJacketMutationEvent/ElementJacketMutationEvent_Observer";
import { ElementJacketMutationEvent_Subject } from "../../../../DOMJacket/scripts/Events/ElementJacketMutationEvent/ElementJacketMutationEvent_Subject";
import { IElementJacketMutationEvent_Payload } from "../../../../DOMJacket/scripts/Events/ElementJacketMutationEvent/IElementJacketMutationEvent_Payload";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IStateLessScFrameProxy } from "../../../../Shared/scripts/Interfaces/Proxies/StateLess/IStateLessFrameProxy";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { GenericStateLessFrameProxy } from "../StateLessDocProxies/StateLessFrameProxies/GenericStateLessFrameProxy";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IElemJacketWatcherParameters } from "../../../../Shared/scripts/IElemJacketWatcherParameters";

export class ScDocProxyWatcherForFrames extends _APICoreBase {
  ScProxyDisciminatorFriendly: string;
  DocumentJacket: DocumentJacket;
  protected ElemJacketMutationEvent_Subject: ElementJacketMutationEvent_Subject;
  protected DocumentJacketMutationEvent_Observer: ElementJacketMutationEvent_Observer;
  HostedFrameStatelessFrameProxies: IStateLessScFrameProxy[] = [];

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket, scProxyDisciminatorFriendly: string) {
    super(apiCore);
    this.DocumentJacket = documentJacket;
    this.ScProxyDisciminatorFriendly = scProxyDisciminatorFriendly;
  }

  public async EnableWatcherForFrames(): Promise<void> {
    this.Logger.FuncStart([ScDocProxyWatcherForFrames.name, this.EnableWatcherForFrames.name], 'on behalf of: ' + this.ScProxyDisciminatorFriendly);
    try {
      let bodyElement: FrameElemJacket;
      let watcherParams: IElemJacketWatcherParameters = {
        Attributes: false,
        ChildList: true,
        OwnerFriendly: this.ScProxyDisciminatorFriendly,
        Subtree: false,
        TagFilter: ['IFRAME']
      };

      this.DocumentJacketMutationEvent_Observer = new ElementJacketMutationEvent_Observer(this.ApiCore, this.CallbackOnDocumentJacketMutationEvent.bind(this));

      await this.DocumentJacket.WaitForGenericElemJacket(ContentConst.Const.Selector.Html.Body)

        .then((elemJacket: FrameElemJacket) => bodyElement = elemJacket)
        .then(() => bodyElement.AddWatcher(watcherParams))
        .then((elemJacketMutationEvent_Subject: ElementJacketMutationEvent_Subject) => this.ElemJacketMutationEvent_Subject = elemJacketMutationEvent_Subject)
        .then(() => this.ElemJacketMutationEvent_Subject.RegisterObserver(this.DocumentJacketMutationEvent_Observer))
        .catch((err) => this.ErrorHand.HandleFatalError([ScDocProxyWatcherForFrames.name, this.EnableWatcherForFrames.name], err));
    }
    catch (err) {
      this.ErrorHand.HandleFatalError([ScDocProxyWatcherForFrames.name, this.EnableWatcherForFrames.name], err);
    }

    this.Logger.FuncEnd([ScDocProxyWatcherForFrames.name, this.EnableWatcherForFrames.name], 'on behalf of: ' + this.ScProxyDisciminatorFriendly);
  }
  CallbackOnDocumentJacketMutationEvent(DocumentJacketMutationEvent_Payload: IElementJacketMutationEvent_Payload) {
    this.Logger.FuncStart(this.CallbackOnDocumentJacketMutationEvent.name);
    if (DocumentJacketMutationEvent_Payload && DocumentJacketMutationEvent_Payload.AddedGenericElemJacket) {
      this.HandleElemJacketAddedToDocument(DocumentJacketMutationEvent_Payload.AddedGenericElemJacket);
    }

    this.Logger.FuncEnd(this.CallbackOnDocumentJacketMutationEvent.name);
  }
  private async HandleElemJacketAddedToDocument(elemJacket: IJacketOfType): Promise<void> {
    this.Logger.FuncStart([ScDocProxyWatcherForFrames.name, this.HandleElemJacketAddedToDocument.name]);

    if (elemJacket) {
      if (elemJacket.NodeTagName === SharedConst.Const.KeyWords.NodeTagName.IFrame) {
        await FrameElemJacket.FactoryFrameElemJackets(this.ApiCore, [elemJacket])
          .then((frameElemJackets: FrameElemJacket[]) => this.HandleFrameElemJacketAddedToDoc(frameElemJackets[0]))
          .catch((err) => this.ErrorHand.HandleFatalError([ScDocProxyWatcherForFrames.name, this.HandleFrameElemJacketAddedToDoc.name], err));
      }
    }
    else {
      this.Logger.Log('No FrameJacket - no action');
    }

    this.Logger.FuncEnd([ScDocProxyWatcherForFrames.name, this.HandleElemJacketAddedToDocument.name]);
  }

  private async HandleFrameElemJacketAddedToDoc(frameElemJacket: FrameElemJacket): Promise<void> {
    this.Logger.FuncStart([ScDocProxyWatcherForFrames.name, this.CallbackOnDocumentJacketMutationEvent.name]);
    try {
      await GenericStateLessFrameProxy.StateLessFrameProxyFactory(this.ApiCore, frameElemJacket)
        .then((stateLessFrameProxy: IStateLessScFrameProxy) => this.HostedFrameStatelessFrameProxies.push(stateLessFrameProxy))
        .then(() => this.Logger.Log(this.HandleFrameElemJacketAddedToDoc.name + 'step1 Complete'))
        .catch((err) => this.ErrorHand.HandleFatalError(this.HandleElemJacketAddedToDocument.name, err));

      //let targetedFrames: ScWindowType[] = [ScWindowType.InstallerBuildPackage];
    }
    catch (err) {
      this.ErrorHand.HandleFatalError([ScDocProxyWatcherForFrames.name, this.HandleFrameElemJacketAddedToDoc.name], err);
    }
    this.Logger.FuncEnd([ScDocProxyWatcherForFrames.name, this.CallbackOnDocumentJacketMutationEvent.name]);
  }
}