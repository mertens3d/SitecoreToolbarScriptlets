import { IElemJacketWatcherParameters } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/Events/DocumentProxyMutationEvent/IElemJacketWatcherParameters";
import { TypeDiscriminator } from "../../../Shared/scripts/Enums/70 - TypeDiscriminator";
import { HindeSiteEvent_Subject } from "../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { ICommonCore } from "../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { FrameElemJacket } from "../../Elements/FrameElemJacket";
import { GenericElemJacket } from "../../Elements/GenericElemJacket";
import { NativeAddRemoveEvent_Payload } from "./IFrameJacketAddRemoveEvent_Payload";

export class NativeAddRemoveEvent_Subject extends HindeSiteEvent_Subject<NativeAddRemoveEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.FrameJacketAddRemoveEvent_Subject;
  ShowLogActions: boolean = true;
  private ElemJacket: GenericElemJacket;
  private WatcherParams: IElemJacketWatcherParameters;

  constructor(commonCore: ICommonCore, elemJacket: GenericElemJacket, watcherParams: IElemJacketWatcherParameters) {
    super(commonCore);

    this.Logger.CTORStart(NativeAddRemoveEvent_Subject.name);
    if (!elemJacket) {
      this.ErrorHand.HandleFatalError(NativeAddRemoveEvent_Subject.name, 'No target doc');
    }
    this.ElemJacket = elemJacket;
    this.WatcherParams = watcherParams;

    this.InitMutationObserver();
    this.Logger.CTOREnd(NativeAddRemoveEvent_Subject.name);
  }

  private HandleRemovedNodes(removedNodes: NodeList): string[] {
    let removedIframeIds: string[] = [];
    removedNodes.forEach((removedNode: Node) => {
      if (removedNode instanceof HTMLIFrameElement) { //this may not filter correctly
        let htmlIFrameElement: HTMLIFrameElement = <HTMLIFrameElement>removedNode;
        if (htmlIFrameElement) {
          removedIframeIds.push(htmlIFrameElement.id);
        }
      }
    });

    return removedIframeIds;
  }

  private HandleAddedNodes(addedNodes: NodeList): GenericElemJacket[] {
    this.Logger.FuncStart(this.HandleAddedNodes.name);

    let addedElementJackets: GenericElemJacket[] = [];

    addedNodes.forEach((addedNode) => {
      if (addedNode instanceof HTMLElement) {
        let passesFilterTest: boolean = true;
        let addedHtmlElement = <HTMLElement>addedNode;

        if (this.WatcherParams.TagFilter && this.WatcherParams.TagFilter.length > 0) {
          passesFilterTest = (this.WatcherParams.TagFilter.indexOf(addedHtmlElement.tagName) > -1);
        }

        if (passesFilterTest) {
          if (addedHtmlElement instanceof HTMLIFrameElement) {
            addedElementJackets.push(new GenericElemJacket(this.CommonCore, addedHtmlElement));
          }
        }
      }
    });

    this.Logger.FuncEnd(this.HandleAddedNodes.name, addedElementJackets.length);
    return addedElementJackets;
  }

  private CallBackOnNativeMutation(mutations: MutationRecord[]) {
    this.Logger.FuncStart(this.CallBackOnNativeMutation.name);

    if (this.HasObservers()) {
      mutations.forEach((mutation, index) => {
        this.Logger.Log('processing mutation ' + (index + 1) + ':' + mutations.length);
        this.Logger.LogVal('mutation.addedNodes.length ', mutation.addedNodes.length);

        if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
          let nativeDomAddRemoveEvent_Payload: NativeAddRemoveEvent_Payload = {
            AddedElementJacket: null,
            RemovedIFrameId: null,
          };

          if (mutation.addedNodes.length > 0) {
            let addedNodes: GenericElemJacket[] = this.HandleAddedNodes(mutation.addedNodes);
            addedNodes.forEach((addedNode: GenericElemJacket) => {
              nativeDomAddRemoveEvent_Payload.AddedElementJacket = addedNode;
              nativeDomAddRemoveEvent_Payload.RemovedIFrameId = null;
              this.NotifyObserversAsync(nativeDomAddRemoveEvent_Payload);
            });
          }

          if (mutation.removedNodes.length > 0) {
            let removedNodeIds: string[] = this.HandleRemovedNodes(mutation.removedNodes);
            removedNodeIds.forEach((removedNodeId: string) => {
              nativeDomAddRemoveEvent_Payload.AddedElementJacket = null;
              nativeDomAddRemoveEvent_Payload.RemovedIFrameId = removedNodeId;
              this.Logger.LogAsJsonPretty('removed', nativeDomAddRemoveEvent_Payload);
              this.NotifyObserversAsync(nativeDomAddRemoveEvent_Payload);
            });
          }
        }
      });
    }
    else {
      this.Logger.Log('No observers');
    }
    this.Logger.FuncEnd(this.CallBackOnNativeMutation.name);
  }

  private InitMutationObserver() {
    this.Logger.FuncStart(this.InitMutationObserver.name);
    try {
      if (this.ElemJacket) {
        let self = this;
        let mutationObserver = new MutationObserver((mutations: MutationRecord[]) => { self.CallBackOnNativeMutation(mutations); });
        //let desktop: HTMLElement = <HTMLElement> this.NativeDocument.getElementsByTagName(SharedConst.Const.KeyWords.Html.Tags.Body)[0];
        //let desktopElemJacket: ElementJacket = this.DocumentJacket.GetElementById('Desktop');
        if (this.WatcherParams) {
          mutationObserver.observe(this.ElemJacket.NativeElement, { attributes: this.WatcherParams.Attributes, subtree: this.WatcherParams.Subtree, childList: this.WatcherParams.ChildList });
        } else {
          this.ErrorHand.HandleFatalError(this.InitMutationObserver.name, ' no params');
        }
      }
      else {
        this.ErrorHand.HandleFatalError(this.InitMutationObserver.name, 'no AssociatedDoc');
      }
    }
    catch (err) {
      throw (err);
    }
    this.Logger.FuncEnd(this.InitMutationObserver.name);
  }
}