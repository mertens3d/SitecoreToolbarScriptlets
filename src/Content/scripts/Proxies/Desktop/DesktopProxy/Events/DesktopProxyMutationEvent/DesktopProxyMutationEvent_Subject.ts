import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { CEFrameProxy } from "../../../../../../../Shared/scripts/Interfaces/Data/Proxies/FrameProxyForContentEditor";
import { HindeSiteEvent_Subject } from "../_HindSiteEvent/HindeSiteEvent_Subject";
import { IDesktopProxyMutationEvent_Payload } from "./IDesktopProxyMutationEvent_Payload";

export class DesktopProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IDesktopProxyMutationEvent_Payload>  {
  private AssociatedDoc: IDataOneDoc;

  constructor(logger: ILoggerAgent, targetDoc: IDataOneDoc) {
    super(logger, DesktopProxyMutationEvent_Subject.name);

    this.Logger.InstantiateStart(DesktopProxyMutationEvent_Subject.name);
    if (!targetDoc) {
      this.Logger.ErrorAndThrow(DesktopProxyMutationEvent_Subject.name, 'No target doc');
    }
    this.AssociatedDoc = targetDoc;
    this.InitMutationObserver();
    this.Logger.InstantiateEnd(DesktopProxyMutationEvent_Subject.name);
  }

  private HandleMutationEvent(mutations: MutationRecord[]) {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        this.Logger.LogVal('mutation.type', mutation.type);

        this.Logger.Log('added nodes');

        let mutatedElement: HTMLElement = <HTMLElement>(mutation.target);
        this.Logger.Log('-----> ' + mutatedElement.id);

        let addedFrameProxies: CEFrameProxy[] = [];

        mutation.addedNodes.forEach((addedNode) => {
          if (addedNode instanceof HTMLIFrameElement) {

            let frameProxy = new CEFrameProxy(this.Logger, addedNode, 'todo', null);
            addedFrameProxies.push(frameProxy);
          }
        })

        let desktopMutatedEvent_Payload: IDesktopProxyMutationEvent_Payload = {
          MutatedElement: mutatedElement,
          AddedCEFrameProxies: addedFrameProxies,
          FrameProxyMutationEvent_Payload: null
        }

        this.NotifyObservers(desktopMutatedEvent_Payload);
      }
    });
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