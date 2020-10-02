import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IDataOneDoc } from "../../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { DTFrameProxy } from "../../FrameProxies/DTFrameProxy";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { INativeIFrameAddedEvent_Payload } from "./INativeIFrameAddedEvent_Payload";

export class NativeIFrameAddedEvent_Subject extends HindeSiteEvent_Subject<INativeIFrameAddedEvent_Payload>  {
  private AssociatedDoc: IDataOneDoc;
    HindeCore: IHindeCore;

  constructor(hindeCore: IHindeCore, targetDoc: IDataOneDoc) {
    super(hindeCore, NativeIFrameAddedEvent_Subject.name);
    this.HindeCore = hindeCore;

    this.Logger.CTORStart(NativeIFrameAddedEvent_Subject.name);
    if (!targetDoc) {
      this.ErrorHand.ErrorAndThrow(NativeIFrameAddedEvent_Subject.name, 'No target doc');
    }
    this.AssociatedDoc = targetDoc;
    this.InitMutationObserver();
    this.Logger.CTOREnd(NativeIFrameAddedEvent_Subject.name);
  }

  private CallBackOnNativeMutation(mutations: MutationRecord[]) {
    this.Logger.FuncStart(this.CallBackOnNativeMutation.name);
    if (this.HasObservers()) {
      mutations.forEach((mutation, index) => {
        this.Logger.Log('processing mutation ' + (index + 1) + ':' + mutations.length);
        this.Logger.LogVal('mutation.addedNodes.length ', mutation.addedNodes.length);

        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          let mutatedElement: HTMLElement = <HTMLElement>(mutation.target);
          let addedDTFrameProxies: DTFrameProxy[] = [];

          mutation.addedNodes.forEach((addedNode) => {
            if (addedNode instanceof HTMLIFrameElement) {


              let dtFrameProxy = new DTFrameProxy(this.HindeCore, addedNode);
              addedDTFrameProxies.push(dtFrameProxy);
            }
          })

          if (addedDTFrameProxies.length > 0) {
            this.Logger.LogVal('addedDTFrameProxies.length', addedDTFrameProxies.length);

            let desktopMutatedEvent_Payload: INativeIFrameAddedEvent_Payload = {
              MutatedElement: mutatedElement,
              AddedDTFrameProxies: addedDTFrameProxies,
              DTFrameProxyMutationEvent_Payload: null
            }

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
      if (this.AssociatedDoc) {
        let self = this;

        let mutationObserver = new MutationObserver((mutations: MutationRecord[]) => { self.CallBackOnNativeMutation(mutations); });

        let desktop: HTMLElement = this.AssociatedDoc.ContentDoc.getElementById('Desktop');
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