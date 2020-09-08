import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IPayloadDesktop_DomChangedEvent } from "./IPayloadContentEditorDomChanged";
import { GenericEvent_Subject } from "../GenericEvent/GenericEvent_Subject";

export class Subject_DesktopDomChangedEvent extends GenericEvent_Subject<IPayloadDesktop_DomChangedEvent>  {
  private AssociatedDoc: IDataOneDoc;

  constructor(logger: ILoggerAgent, targetDoc: IDataOneDoc) {
    super(logger);

    this.Logger.InstantiateStart(Subject_DesktopDomChangedEvent.name);
    this.AssociatedDoc = targetDoc;
    this.InitMutationObserver();
    this.Logger.InstantiateEnd(Subject_DesktopDomChangedEvent.name);
  }

  private HandleMutationEvent(mutations: MutationRecord[]) {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        this.Logger.LogVal('mutation.type', mutation.type);

        this.Logger.Log('added nodes');

        let mutatedElement: HTMLElement = <HTMLElement>(mutation.target);
        this.Logger.Log('-----> ' + mutatedElement.id);


        let addedIframes: HTMLIFrameElement[] = [];
        mutation.addedNodes.forEach((addedNode) => {
          if (addedNode instanceof HTMLIFrameElement) {
            addedIframes.push(<HTMLIFrameElement> addedNode);
          }
        })


        let message: IPayloadDesktop_DomChangedEvent = {
          MutatedElement: mutatedElement,
          AddedIframes: addedIframes
        }

        this.NotifyObservers(message);
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
        this.Logger.ErrorAndThrow(this.InitMutationObserver.name, 'no TreeHolder Elem');
      }
    }
    catch (err) {
      throw (err);
    }

    this.Logger.FuncEnd(this.InitMutationObserver.name);
  }
}