import { GenericEvent_Subject } from "../GenericEvent/GenericEvent_Subject";
import { ITreeMutatedEvent_Payload } from "./IPayload_ContentEditorTreeMutatedEvent";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ScContentTreeNodeProxy } from "../../../../ContentEditor/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";
import { IDataOneDoc } from "../../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";

export class Subject_ContentEditorTreeMutatedEvent extends GenericEvent_Subject<ITreeMutatedEvent_Payload> {
  private TreeElement: any;
  private HostIframeId: string;
  private  HostDoc: IDataOneDoc;

  constructor(logger: ILoggerAgent, treeElement: HTMLElement, hostIframeId: string, host: IDataOneDoc) {
    super(logger);

    this.Logger.InstantiateStart(Subject_ContentEditorTreeMutatedEvent.name);
    this.TreeElement = treeElement;
    this.HostIframeId = hostIframeId;
    this.HostDoc = host;
    this.Logger.LogVal('this.HostIframeId', this.HostIframeId);

    this.InitMutationObserver();

    this.Logger.InstantiateEnd(Subject_ContentEditorTreeMutatedEvent.name);
  }
  private InitMutationObserver() {
    this.Logger.FuncStart(this.InitMutationObserver.name);

    try {
      if (this.TreeElement) {
        let self = this;
        let observer = new MutationObserver((mutations: MutationRecord[]) => { self.HandleMutationEvent(mutations) });

        observer.observe(this.TreeElement, { attributes: true, subtree: true, childList: true });
      }
    } catch (err) {
      throw (err);
    }

    this.Logger.FuncEnd(this.InitMutationObserver.name);
  }

  private GetMutatedNode(mutation: MutationRecord): ScContentTreeNodeProxy {
    let candidateNode: ScContentTreeNodeProxy = null;
    if (mutation.attributeName === 'class') {
      let mutatedAnchorElement: HTMLAnchorElement = <HTMLAnchorElement>(mutation.target);
      if (mutatedAnchorElement) {
        this.Logger.Log(mutatedAnchorElement.classList.toString());
        this.Logger.Log(mutatedAnchorElement.id);

        this.Logger.Log('mutated');
        candidateNode = new ScContentTreeNodeProxy(this.Logger, this.HostDoc,  mutatedAnchorElement);
        this.Logger.Log((<HTMLElement>mutation.target).innerText);
      }
    }
    return candidateNode;
  }

  private HandleMutationEvent(mutations: MutationRecord[]) {
    mutations.forEach((mutation) => {
      let candidateNode: ScContentTreeNodeProxy = this.GetMutatedNode(mutation);

      if (candidateNode) {
        if (candidateNode.QueryIsActive()) {
          let payload: ITreeMutatedEvent_Payload = {
            MutatedElement: <HTMLElement>(mutation.target),
            ActiveNode: candidateNode,
            AssociatedIframeElemId: this.HostIframeId
          }
          this.NotifyObservers(payload);
        }
      }
    });
  }
}