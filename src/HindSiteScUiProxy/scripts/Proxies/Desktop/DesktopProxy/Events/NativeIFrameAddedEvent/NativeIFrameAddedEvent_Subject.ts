import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { NativeIframeProxy } from "../../../../NativeScIframeProxy";
import { INativeIFrameAddRemoveEvent_Payload } from "./INativeIFrameAddedEvent_Payload";

export class NativeIFrameAddRemoveEvent_Subject extends HindeSiteEvent_Subject<INativeIFrameAddRemoveEvent_Payload>  {
  private NativeDocument: Document;
  private HindeCore: IHindeCore;

  constructor(hindeCore: IHindeCore, document: Document) {
    super(hindeCore, NativeIFrameAddRemoveEvent_Subject.name);
    this.HindeCore = hindeCore;

    this.Logger.CTORStart(NativeIFrameAddRemoveEvent_Subject.name);
    if (!document) {
      this.ErrorHand.ErrorAndThrow(NativeIFrameAddRemoveEvent_Subject.name, 'No target doc');
    }
    this.NativeDocument = document;
    this.InitMutationObserver();
    this.Logger.CTOREnd(NativeIFrameAddRemoveEvent_Subject.name);
  }

  private HandleRemovedNodes(removedNodes: NodeList): string[] {
    let removedIframeIds: string[] = [];
    removedNodes.forEach((removedNode: Node) => {
      removedIframeIds.push((<HTMLIFrameElement>removedNode).id);
    });

    return removedIframeIds;
  }

  private HandleAddedNodes(addedNodes: NodeList): NativeIframeProxy[] {
    this.Logger.FuncStart(this.HandleAddedNodes.name);
    let addedNativeFrameProxies: NativeIframeProxy[] = [];
    addedNodes.forEach((addedNode) => {
      if (addedNode instanceof HTMLIFrameElement) {
        let nativeIframeProxy = new NativeIframeProxy(this.HindeCore, addedNode);
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

          let desktopMutatedEvent_Payload: INativeIFrameAddRemoveEvent_Payload = {
            AddedNativeIFrameProxies: [],
            RemovedIFrameIds: [],
          }

          desktopMutatedEvent_Payload.AddedNativeIFrameProxies = this.HandleAddedNodes(mutation.addedNodes);
          desktopMutatedEvent_Payload.RemovedIFrameIds = this.HandleRemovedNodes(mutation.removedNodes);

          if (desktopMutatedEvent_Payload.AddedNativeIFrameProxies.length > 0) {
            this.Logger.LogVal('addedDTFrameProxies.length', desktopMutatedEvent_Payload.AddedNativeIFrameProxies.length);

            this.NotifyObserversAsync(desktopMutatedEvent_Payload);
          } else {
            this.Logger.Log('no notification, no DTFrameProxy added');
          }
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
      if (this.NativeDocument) {
        let self = this;
        let mutationObserver = new MutationObserver((mutations: MutationRecord[]) => { self.CallBackOnNativeMutation(mutations); });
        //let desktop: HTMLElement = <HTMLElement> this.NativeDocument.getElementsByTagName(SharedConst.Const.KeyWords.Html.Tags.Body)[0];
        let desktop: HTMLElement = <HTMLElement>this.NativeDocument.getElementById('Desktop');
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