import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { DTFrameProxy } from "../../FrameProxies/DTFrameProxy";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { INativeIFrameAddedEvent_Payload } from "./INativeIFrameAddedEvent_Payload";

export class NativeIFrameAddedEvent_Subject extends HindeSiteEvent_Subject<INativeIFrameAddedEvent_Payload>  {
  private AssociatedDoc: IDataOneDoc;

  constructor(logger: ILoggerAgent, targetDoc: IDataOneDoc) {
    super(logger, NativeIFrameAddedEvent_Subject.name);

    this.Logger.CTORStart(NativeIFrameAddedEvent_Subject.name);
    if (!targetDoc) {
      this.Logger.ErrorAndThrow(NativeIFrameAddedEvent_Subject.name, 'No target doc');
    }
    this.AssociatedDoc = targetDoc;
    this.InitMutationObserver();
    this.Logger.CTOREnd(NativeIFrameAddedEvent_Subject.name);
  }

  private HandleNativeMutationEvent(mutations: MutationRecord[]) {
    this.Logger.FuncStart(this.HandleNativeMutationEvent.name);
    if (this.HasObservers()) {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          let mutatedElement: HTMLElement = <HTMLElement>(mutation.target);
          let addedDTFrameProxies: DTFrameProxy[] = [];

          mutation.addedNodes.forEach((addedNode) => {
            if (addedNode instanceof HTMLIFrameElement) {
              let dtFrameProxy = new DTFrameProxy(this.Logger, addedNode);
              addedDTFrameProxies.push(dtFrameProxy);
            }
          })

          let desktopMutatedEvent_Payload: INativeIFrameAddedEvent_Payload = {
            MutatedElement: mutatedElement,
            AddedDTFrameProxies: addedDTFrameProxies,
            DTFrameProxyMutationEvent_Payload: null
          }

          this.NotifyObservers(desktopMutatedEvent_Payload);
        }
      });
    } else {
      this.Logger.Log('No observers');
    }
    this.Logger.FuncEnd(this.HandleNativeMutationEvent.name);
  }

  private InitMutationObserver() {
    this.Logger.FuncStart(this.InitMutationObserver.name);

    try {
      if (this.AssociatedDoc) {
        let self = this;

        let mutationObserver = new MutationObserver((mutations: MutationRecord[]) => { self.HandleNativeMutationEvent(mutations); });

        let desktop: HTMLElement = this.AssociatedDoc.ContentDoc.getElementById('Desktop');
        if (desktop) {
          mutationObserver.observe(desktop, { attributes: false, subtree: false, childList: true });
        }
      }
      else {
        this.Logger.ErrorAndThrow(this.InitMutationObserver.name, 'no AssociatedDoc');
      }
    }
    catch (err) {
      throw (err);
    }

    this.Logger.FuncEnd(this.InitMutationObserver.name);
  }
}