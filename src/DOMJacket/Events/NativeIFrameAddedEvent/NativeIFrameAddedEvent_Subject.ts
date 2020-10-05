import { HindeSiteEvent_Subject } from "../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { FrameJacket } from "../../FrameJacket";
import { IFrameJacketAddRemoveEvent_Payload } from "./INativeIFrameAddedEvent_Payload";
import { DocumentJacket } from "../../DocumentJacket";

export class FrameJacketAddRemoveEvent_Subject extends HindeSiteEvent_Subject<IFrameJacketAddRemoveEvent_Payload>  {
  private DocumentJacket: DocumentJacket;
  private HindeCore: IHindeCore;

  constructor(hindeCore: IHindeCore, documentJacket: DocumentJacket) {
    super(hindeCore, FrameJacketAddRemoveEvent_Subject.name);
    this.HindeCore = hindeCore;

    this.Logger.CTORStart(FrameJacketAddRemoveEvent_Subject.name);
    if (!documentJacket) {
      this.ErrorHand.ErrorAndThrow(FrameJacketAddRemoveEvent_Subject.name, 'No target doc');
    }
    this.DocumentJacket = documentJacket;
    this.InitMutationObserver();
    this.Logger.CTOREnd(FrameJacketAddRemoveEvent_Subject.name);
  }

  private HandleRemovedNodes(removedNodes: NodeList): string[] {
    let removedIframeIds: string[] = [];
    removedNodes.forEach((removedNode: Node) => {
      removedIframeIds.push((<HTMLIFrameElement>removedNode).id);
    });

    return removedIframeIds;
  }

  private HandleAddedNodes(addedNodes: NodeList): FrameJacket[] {
    this.Logger.FuncStart(this.HandleAddedNodes.name);
    let addedNativeFrameProxies: FrameJacket[] = [];
    addedNodes.forEach((addedNode) => {
      if (addedNode instanceof HTMLIFrameElement) {
        let nativeIframeProxy = new FrameJacket(this.HindeCore, addedNode);
        addedNativeFrameProxies.push(nativeIframeProxy);
      }
    });
    this.Logger.FuncEnd(this.HandleAddedNodes.name, addedNativeFrameProxies.length);
    return addedNativeFrameProxies;
  }

  private CallBackOnNativeMutation(mutations: MutationRecord[]) {
    this.Logger.FuncStart(this.CallBackOnNativeMutation.name);

    if (this.HasObservers()) {
      mutations.forEach((mutation, index) => {
        this.Logger.Log('processing mutation ' + (index + 1) + ':' + mutations.length);
        this.Logger.LogVal('mutation.addedNodes.length ', mutation.addedNodes.length);

        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          let mutatedElement: HTMLElement = <HTMLElement>(mutation.target);

          let desktopMutatedEvent_Payload: IFrameJacketAddRemoveEvent_Payload = {
            AddedFrameJacket: null,
            RemovedIFrameId: null,
          }

          let addedNodes: FrameJacket[] = this.HandleAddedNodes(mutation.addedNodes);
          let removedNodeIds: string[] = this.HandleRemovedNodes(mutation.removedNodes);

          addedNodes.forEach((addedNode: FrameJacket) => {
            desktopMutatedEvent_Payload.AddedFrameJacket = addedNode;
            desktopMutatedEvent_Payload.RemovedIFrameId = null;
            this.NotifyObserversAsync(desktopMutatedEvent_Payload);
          })

          removedNodeIds.forEach((removedNodeId: string) => {
            desktopMutatedEvent_Payload.AddedFrameJacket = null;
            desktopMutatedEvent_Payload.RemovedIFrameId = removedNodeId;
            this.NotifyObserversAsync(desktopMutatedEvent_Payload);
          })
        }
      });
    } else {
      this.Logger.Log('No observers');
    }
    this.Logger.FuncEnd(this.CallBackOnNativeMutation.name);
  }

  private InitMutationObserver() {
    this.Logger.FuncStart(this.InitMutationObserver.name);
    try {
      if (this.DocumentJacket) {
        let self = this;
        let mutationObserver = new MutationObserver((mutations: MutationRecord[]) => { self.CallBackOnNativeMutation(mutations); });
        //let desktop: HTMLElement = <HTMLElement> this.NativeDocument.getElementsByTagName(SharedConst.Const.KeyWords.Html.Tags.Body)[0];
        let desktop: HTMLElement = <HTMLElement>this.DocumentJacket.getElementById('Desktop');
        if (desktop) {
          mutationObserver.observe(desktop, { attributes: false, subtree: false, childList: true });
        }
      }
      else {
        this.ErrorHand.ErrorAndThrow(this.InitMutationObserver.name, 'no AssociatedDoc');
      }
    }
    catch (err) {
      throw (err);
    }
    this.Logger.FuncEnd(this.InitMutationObserver.name);
  }
}