import { DocumentJacket } from "../../../../DOMJacket/Document/DocumentJacket";
import { FrameElemJacket } from "../../../../DOMJacket/Elements/FrameElemJacket";
import { ScDocProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { ScWindowType } from "../../../../Shared/scripts/Enums/50 - scWindowType";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateLessDocProxy } from "../../../../Shared/scripts/Interfaces/Agents/IStateLessDocProxy";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { DocumentJacketMutationEvent_Observer } from "../Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/DocumentProxyMutationEvent_Observer";
import { ElementJacketMutationEvent_Subject } from "../Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/ElementJacketMutationEvent_Subject";
import { IDocumentJacketMutationEvent_Payload } from "../Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/IDocumentProxyMutationEvent_Payload";
import { IElemJacketWatcherParameters } from "../Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/IElemJacketWatcherParameters";
import { DTFrameProxy, StateLessFrameProxy } from "../Desktop/DesktopProxy/FrameProxies/DTFrameProxy";
import { ScDocProxyResolver } from "../ProxyResolver";
import { ScContentIframeId0Proxy } from "./ScContentIframeId0Proxy";
import { JqueryModalDialogsFrameProxy } from "./StateLessFrameProxies/JqueryModalDialogsFrameProxy";
import { GenericElemJacket } from "../../../../DOMJacket/Elements/GenericElemJacket";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";

export class JqueryModalDialogsDocProxy extends _APICoreBase implements IStateLessDocProxy {
  readonly ScDocProxyDisciminator: ScDocProxyDisciminator = ScDocProxyDisciminator.JqueryModalDialogsProxy;

  readonly ScDocProxyDisciminatorFriendly: string;
  private DocumentJacket: DocumentJacket = null;
  private DocumentJacketMutationEvent_Observer: DocumentJacketMutationEvent_Observer;
  private ElemJacketMutationEvent_Subject: ElementJacketMutationEvent_Subject;
  ParentJqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket, parentJqueryModalDialogsDocFrameProxy: JqueryModalDialogsFrameProxy) {
    super(apiCore);
    this.DocumentJacket = documentJacket;
    this.ParentJqueryModalDialogsFrameProxy = parentJqueryModalDialogsDocFrameProxy;
    this.Instantiate();
  }
    TriggerInboundEventsAsync() {
      //empty
    }

  private Instantiate() {
    this.DocumentJacketMutationEvent_Observer = new DocumentJacketMutationEvent_Observer(this.ApiCore, this.CallbackOnDocumentJacketMutationEvent.bind(this));
  }

  async InstantiateAsyncMembers(): Promise<void> {
    this.Logger.FuncStart([JqueryModalDialogsDocProxy.name, this.InstantiateAsyncMembers.name]);

    this.Logger.FuncStart([JqueryModalDialogsDocProxy.name, this.InstantiateAsyncMembers.name]);
  }

  async WireEvents(): Promise<void> {
    this.Logger.FuncStart([JqueryModalDialogsDocProxy.name, this.WireEvents.name]);
    try {
      let bodyElement: FrameElemJacket;
      let watcherParams: IElemJacketWatcherParameters = {
        Attributes: false,
        ChildList: true,
        Friendly: JqueryModalDialogsDocProxy.name,
        Subtree: true,
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
    this.Logger.FuncEnd([JqueryModalDialogsDocProxy.name, this.WireEvents.name]);
  }

  //--------------------------------------------
  CallbackOnDocumentJacketMutationEvent(DocumentJacketMutationEvent_Payload: IDocumentJacketMutationEvent_Payload) {
    this.Logger.FuncStart(this.CallbackOnDocumentJacketMutationEvent.name);
    if (DocumentJacketMutationEvent_Payload && DocumentJacketMutationEvent_Payload.AddedGenericElemJacket) {
      this.HandleElemJacketAddedToDocument(DocumentJacketMutationEvent_Payload.AddedGenericElemJacket);
    }

    this.Logger.FuncEnd(this.CallbackOnDocumentJacketMutationEvent.name);
  }

  private async HandleFrameElemJacketAddedToDoc(elemJacket: FrameElemJacket): Promise<void> {
    this.Logger.FuncStart([JqueryModalDialogsDocProxy.name, this.CallbackOnDocumentJacketMutationEvent.name]);
    try {
      let stateLessFrameProxy: StateLessFrameProxy = null;
      let jacketWindowType: ScWindowType = ScWindowType.Unknown;

      await elemJacket.WaitForCompleteNABHtmlIframeElement(this.HandleElemJacketAddedToDocument.name)
        .then(() => this.Logger.LogVal('URL', elemJacket.DocumentJacket.UrlJacket.GetOriginalURL()))
        .then(() => stateLessFrameProxy = new StateLessFrameProxy(this.ApiCore, elemJacket))
        .then(() => {
          jacketWindowType = stateLessFrameProxy.GetScWindowType();

          let stateFullProxyFactory: ScDocProxyResolver = new ScDocProxyResolver(this.ApiCore);
          let recognizedWindowtypes: ScWindowType[] = stateFullProxyFactory.StateLessScWindowTypes();

          if (recognizedWindowtypes.indexOf(jacketWindowType) < 0) {
            this.Logger.LogVal('scWindowType', ScWindowType[jacketWindowType]);
            this.ErrorHand.HandleFatalError(this.HandleElemJacketAddedToDocument.name, 'unrecognized window type bbb: ' + ScWindowType[jacketWindowType]);
          }
        })
        .then(() => this.Logger.Log(this.HandleElemJacketAddedToDocument.name + 'step1 Complete'))
        .catch((err) => this.ErrorHand.HandleFatalError(this.HandleElemJacketAddedToDocument.name, err));

      let targetedFrames: ScWindowType[] = [ScWindowType.InstallerBuildPackage];
      if (targetedFrames.indexOf(jacketWindowType) > -1) {
        await elemJacket.WaitForCompleteNABHtmlIframeElement(this.HandleElemJacketAddedToDocument.name)
          .then(() => this.Logger.LogVal('url', elemJacket.GetUrlJacket().GetOriginalURL()))
          .then(() => stateLessFrameProxy = new StateLessFrameProxy(this.ApiCore, elemJacket))
          .then(() => {
            if (jacketWindowType === ScWindowType.InstallerBuildPackage) {
              //this.ProcessInboundInstallerBuildPackage(dtFrameProxy);
              this.Logger.LogImportant('recognized installer build package!');
            }
          })
          .then(() => this.Logger.Log(this.HandleElemJacketAddedToDocument.name + ' step2 Complete'))
          .catch((err) => this.ErrorHand.HandleFatalError(this.HandleElemJacketAddedToDocument.name, err));
      }
    } catch (err) {
      this.ErrorHand.HandleFatalError([JqueryModalDialogsDocProxy.name, this.HandleFrameElemJacketAddedToDoc.name], err);
    }
    this.Logger.FuncEnd([JqueryModalDialogsDocProxy.name, this.CallbackOnDocumentJacketMutationEvent.name]);
  }

  private async HandleElemJacketAddedToDocument(elemJacket: GenericElemJacket): Promise<void> {
    this.Logger.FuncStart([JqueryModalDialogsDocProxy.name, this.HandleElemJacketAddedToDocument.name]);

    if (elemJacket) {
      if (elemJacket.NodeTagName === SharedConst.Const.KeyWords.NodeTagName.IFrame) {
        await FrameElemJacket.FactoryFrameElemJackets(this.ApiCore, [elemJacket])
          .then((frameElemJackets: FrameElemJacket[]) => this.HandleFrameElemJacketAddedToDoc(frameElemJackets[0]))
          .catch((err) => this.ErrorHand.HandleFatalError([JqueryModalDialogsDocProxy.name, this.HandleFrameElemJacketAddedToDoc.name], err));
      }
    }
    else {
      this.Logger.Log('No FrameJacket - no action');
    }

    this.Logger.FuncEnd([JqueryModalDialogsDocProxy.name, this.HandleElemJacketAddedToDocument.name]);
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
        .then(() => this.DocumentJacket.GetHostedFramesFilteredBySelector(ContentConst.Const.Selector.SC.Frames.ScContentIframeId0.Id))
        .then((matchingJackets: FrameElemJacket[]) => {
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