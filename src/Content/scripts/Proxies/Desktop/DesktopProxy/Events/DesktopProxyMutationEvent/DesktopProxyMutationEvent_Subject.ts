import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IDesktopProxyMutationEvent_Payload } from "./IDesktopProxyMutationEvent_Payload";
import { IDTFrameProxy } from "../../../../../../../Shared/scripts/Interfaces/Proxies/IDesktopProxy";
import { DTFrameProxy } from "../../../../DTFrameProxy";
import { IContentBrowserProxy } from "../../../../../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";

export class DesktopProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IDesktopProxyMutationEvent_Payload>  {
  private AssociatedDoc: IDataOneDoc;
  private ContentBrowserProxy: IContentBrowserProxy;

  constructor(logger: ILoggerAgent, targetDoc: IDataOneDoc, contentBrowserProxy: IContentBrowserProxy) {
    super(logger, DesktopProxyMutationEvent_Subject.name);

    this.Logger.InstantiateStart(DesktopProxyMutationEvent_Subject.name);
    if (!targetDoc) {
      this.Logger.ErrorAndThrow(DesktopProxyMutationEvent_Subject.name, 'No target doc');
    }

    this.ContentBrowserProxy = contentBrowserProxy;
    this.AssociatedDoc = targetDoc;
    this.InitMutationObserver();
    this.Logger.InstantiateEnd(DesktopProxyMutationEvent_Subject.name);
  }

  private HandleMutationEvent(mutations: MutationRecord[]) {
    this.Logger.FuncStart(this.HandleMutationEvent.name);
    if (this.HasObservers()) {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          let mutatedElement: HTMLElement = <HTMLElement>(mutation.target);
          let addedDTFrameProxies: IDTFrameProxy[] = [];

          mutation.addedNodes.forEach((addedNode) => {
            if (addedNode instanceof HTMLIFrameElement) {
              let dtFrameProxy = new DTFrameProxy(this.Logger, addedNode, this.ContentBrowserProxy);
              addedDTFrameProxies.push(dtFrameProxy);
            }
          })

          let desktopMutatedEvent_Payload: IDesktopProxyMutationEvent_Payload = {
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
    this.Logger.FuncEnd(this.HandleMutationEvent.name);
  }

  private InitMutationObserver() {
    this.Logger.FuncStart(this.InitMutationObserver.name);

    try {
      if (this.AssociatedDoc) {
        let self = this;

        let observer = new MutationObserver((mutations: MutationRecord[]) => { self.HandleMutationEvent(mutations); });

        let desktop: HTMLElement = this.AssociatedDoc.ContentDoc.getElementById('Desktop');
        if (desktop) {
          observer.observe(desktop, { attributes: false, subtree: false, childList: true });
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