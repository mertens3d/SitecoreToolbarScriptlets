﻿import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { DocumentJacket } from "../../../../DOMJacket/Document/DocumentJacket";
import { FrameElemJacket } from "../../../../DOMJacket/Elements/FrameElemJacket";
import { IElemJacketWatcherParameters } from "../../../../DOMJacket/Events/ElementJacketMutationEvent/IElemJacketWatcherParameters";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { ElementJacketMutationEvent_Subject } from "../../../../DOMJacket/Events/ElementJacketMutationEvent/ElementJacketMutationEvent_Subject";
import { ElementJacketMutationEvent_Observer } from "../../../../DOMJacket/Events/ElementJacketMutationEvent/ElementJacketMutationEvent_Observer";
import { IElementJacketMutationEvent_Payload } from "../../../../DOMJacket/Events/ElementJacketMutationEvent/IElementJacketMutationEvent_Payload";
import { GenericElemJacket } from "../../../../DOMJacket/Elements/GenericElemJacket";
import { _BaseStateLessScDocProxy } from "../StateLessDocProxies/StateLessDocProxies/_BaseStateLessScDocProxy";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { GenericStateLessFrameProxy } from "../StateLessDocProxies/StateLessFrameProxies/GenericStateLessFrameProxy";
import { IStateLessScFrameProxy } from "../../../../Shared/scripts/Interfaces/Proxies/StateLess/IStateLessFrameProxy";
import { _BaseScDocProxy } from "../Desktop/DesktopProxy/FrameProxies/_BaseScDocProxy";

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
    this.Logger.FuncStart([_BaseScDocProxy.name, this.EnableWatcherForFrames.name], 'on behalf of: ' + this.ScProxyDisciminatorFriendly);
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
        .catch((err) => this.ErrorHand.HandleFatalError([_BaseScDocProxy.name, this.EnableWatcherForFrames.name], err));
    }
    catch (err) {
      this.ErrorHand.HandleFatalError([_BaseScDocProxy.name, this.EnableWatcherForFrames.name], err);
    }

    this.Logger.FuncEnd([_BaseScDocProxy.name, this.EnableWatcherForFrames.name], 'on behalf of: ' + this.ScProxyDisciminatorFriendly);
  }
  CallbackOnDocumentJacketMutationEvent(DocumentJacketMutationEvent_Payload: IElementJacketMutationEvent_Payload) {
    this.Logger.FuncStart(this.CallbackOnDocumentJacketMutationEvent.name);
    if (DocumentJacketMutationEvent_Payload && DocumentJacketMutationEvent_Payload.AddedGenericElemJacket) {
      this.HandleElemJacketAddedToDocument(DocumentJacketMutationEvent_Payload.AddedGenericElemJacket);
    }

    this.Logger.FuncEnd(this.CallbackOnDocumentJacketMutationEvent.name);
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
}