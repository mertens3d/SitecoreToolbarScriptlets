import { DocumentJacket } from "../../../../DOMJacket/Document/DocumentJacket";
import { ElementFrameJacket } from "../../../../DOMJacket/Elements/ElementFrameJacket";
import { StateFullProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { ScWindowType } from "../../../../Shared/scripts/Enums/50 - scWindowType";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateLessDocProxy } from "../../../../Shared/scripts/Interfaces/Agents/IStateLessDocProxy";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { DocumentJacketMutationEvent_Observer } from "../Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/DocumentProxyMutationEvent_Observer";
import { IDocumentJacketMutationEvent_Payload } from "../Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/IDocumentProxyMutationEvent_Payload";
import { DTFrameProxy } from "../Desktop/DesktopProxy/FrameProxies/DTFrameProxy";
import { StateFullProxyResolver } from "../ProxyResolver";
import { ScContentIframeId0Proxy } from "./ScContentIframeId0Proxy";

export class JqueryModalDialogsDocProxy extends _APICoreBase implements IStateLessDocProxy {
  readonly StateFullProxyDisciminator: StateFullProxyDisciminator = StateFullProxyDisciminator.JqueryModalDialogsProxy
  readonly StateFullProxyDisciminatorFriendly: string;
  private DocumentJacket: DocumentJacket = null;
  private DocumentJacketMutationEvent_Observer: DocumentJacketMutationEvent_Observer;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore);
    this.DocumentJacket = documentJacket;
    this.Instantiate();
  }

  private Instantiate() {
    this.DocumentJacketMutationEvent_Observer = new DocumentJacketMutationEvent_Observer(this.ApiCore, this.CallbackOnDocumentJacketMutationEvent.bind(this));
  }

  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart([JqueryModalDialogsDocProxy.name, this.InstantiateAsyncMembers.name]);

    this.Logger.FuncStart([JqueryModalDialogsDocProxy.name, this.InstantiateAsyncMembers.name]);
  }
  async WireEvents() {
    this.DocumentJacket.DocumentJacketMutationEvent_Subject.RegisterObserver(this.DocumentJacketMutationEvent_Observer);
  }

  TriggerInboundEventsAsync() {
    //empty
  }

  async GetState(): Promise<void> {
    //empty
  }

  async SetState(state: any): Promise<void> {
    // empty
  }

  //--------------------------------------------

  CallbackOnDocumentJacketMutationEvent(DocumentJacketMutationEvent_Payload: IDocumentJacketMutationEvent_Payload) {
    this.Logger.FuncStart(this.CallbackOnDocumentJacketMutationEvent.name);
    if (DocumentJacketMutationEvent_Payload && DocumentJacketMutationEvent_Payload.AddedFrameJacket) {
      this.HandleFrameJacketAddedToDocument(DocumentJacketMutationEvent_Payload.AddedFrameJacket);
    }

    this.Logger.FuncEnd(this.CallbackOnDocumentJacketMutationEvent.name);
  }

  private async HandleFrameJacketAddedToDocument(frameJacket: ElementFrameJacket): Promise<void> {
    this.Logger.FuncStart(this.HandleFrameJacketAddedToDocument.name);

    if (frameJacket) {
      let dtFrameProxy: DTFrameProxy = null;
      let jacketWindowType: ScWindowType = ScWindowType.Unknown;

      await frameJacket.WaitForCompleteNABHtmlIframeElement(this.HandleFrameJacketAddedToDocument.name)
        .then(() => this.Logger.LogVal('URL', frameJacket.DocumentJacket.UrlJacket.GetOriginalURL()))
        .then(() => dtFrameProxy = new DTFrameProxy(this.ApiCore, frameJacket, null))
        .then(() => dtFrameProxy.InstantiateAsyncMembers())
        .then(() => dtFrameProxy.WireEvents())
        .then(() => {
          jacketWindowType = dtFrameProxy.GetScWindowType();

          let stateFullProxyFactory: StateFullProxyResolver = new StateFullProxyResolver(this.ApiCore);
          let recognizedWindowtypes: ScWindowType[] = stateFullProxyFactory.RecognizedWindowTypes();

          if (recognizedWindowtypes.indexOf(jacketWindowType) < 0) {
            this.Logger.LogVal('scWindowType', ScWindowType[jacketWindowType]);
            this.ErrorHand.HandleFatalError(this.HandleFrameJacketAddedToDocument.name, 'unrecognized window type: ' + ScWindowType[jacketWindowType]);
          }
        })
        .then(() => this.Logger.Log(this.HandleFrameJacketAddedToDocument.name + 'step1 Complete'))
        .catch((err) => this.ErrorHand.HandleFatalError(this.HandleFrameJacketAddedToDocument.name, err));

      let targetedFrames: ScWindowType[] = [ScWindowType.InstallerBuildPackage];
      if (targetedFrames.indexOf(jacketWindowType) > -1) {
        await frameJacket.WaitForCompleteNABHtmlIframeElement(this.HandleFrameJacketAddedToDocument.name)
          .then(() => this.Logger.LogVal('url', frameJacket.GetUrlJacket().GetOriginalURL()))
          .then(() => dtFrameProxy = new DTFrameProxy(this.ApiCore, frameJacket, null))
          .then(() => dtFrameProxy.InstantiateAsyncMembers())
          .then(() => dtFrameProxy.WireEvents())
          .then(() => dtFrameProxy.TriggerEventsForInbound())
          //.then(() => {
          //  if (jacketWindowType === ScWindowType.InstallerBuildPackage) {
          //    this.ProcessInboundInstallerBuildPackage(dtFrameProxy);
          //  }
          //})
          .then(() => this.Logger.Log(this.HandleFrameJacketAddedToDocument.name + 'step2 Complete'))
          .catch((err) => this.ErrorHand.HandleFatalError(this.HandleFrameJacketAddedToDocument.name, err));
      }
    }
    else {
      this.Logger.Log('No FrameJacket - no action');
    }

    this.Logger.FuncEnd(this.HandleFrameJacketAddedToDocument.name);
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
      let scContentIframeId0Proxy: ScContentIframeId0Proxy;

      await this.DocumentJacket.WaitForCompleteNAB_DocumentJacket('jquery jacket')
        .then(() => {
          let matchingJackets: ElementFrameJacket[] = this.DocumentJacket.GetHostedFramesFilteredBySelector(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.Id);

          if (matchingJackets && matchingJackets.length > 0) {
            scContentIframeId0Proxy = new ScContentIframeId0Proxy(this.ApiCore, matchingJackets[0]);
            this.Logger.LogImportant('scContentIframeId0FrameJacket frame found');
          }
          else {
            this.ErrorHand.HandleFatalError([JqueryModalDialogsDocProxy.name, this.OpenFile.name], 'no matching jackets');
          }
        })
        .then(() => scContentIframeId0Proxy.OpenFile(fileName))
        .catch((err) => this.ErrorHand.HandleFatalError(this.OpenFile.name, err));
    }
    catch (err) {
      this.ErrorHand.HandleFatalError([JqueryModalDialogsDocProxy.name, this.OpenFile.name], err);
    }
  }
}