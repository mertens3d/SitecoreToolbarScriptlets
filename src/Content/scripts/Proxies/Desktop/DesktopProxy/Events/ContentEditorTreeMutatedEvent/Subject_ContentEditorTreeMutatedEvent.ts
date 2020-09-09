import { GenericEvent_Subject } from "../GenericEvent/GenericEvent_Subject";
import { IPayload_ContentEditorTreeMutatedEvent } from "./IPayload_ContentEditorTreeMutatedEvent";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ContentEditorTreeNodeProxy } from "../../../../ContentEditor/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";

export class Subject_ContentEditorTreeMutatedEvent extends GenericEvent_Subject<IPayload_ContentEditorTreeMutatedEvent> {
  private TreeElement: any;
  private  HostIframeId: string;

  constructor(logger: ILoggerAgent, treeElement: HTMLElement, hostIframeId: string) {
    super(logger);

    this.Logger.InstantiateStart(Subject_ContentEditorTreeMutatedEvent.name);
    this.TreeElement = treeElement;
    this.HostIframeId = hostIframeId;
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

        //this.SelfElem.addEventListener('click', (evt) => { alert((<HTMLElement>evt.target).innerText) });
        //use MutationObserver
      }
    } catch (err) {
      throw (err);
    }

    this.Logger.FuncEnd(this.InitMutationObserver.name);
  }

  private GetMutatedNode(mutation: MutationRecord): ContentEditorTreeNodeProxy {
    let candidateNode: ContentEditorTreeNodeProxy = null;
    if (mutation.attributeName === 'class') {
      let mutatedElement: HTMLElement = <HTMLElement>(mutation.target);
      this.Logger.Log(mutatedElement.classList.toString());
      this.Logger.Log(mutatedElement.id);

      this.Logger.Log('mutated');
      let parent: HTMLElement = mutatedElement.parentElement;
      if (parent) {
        candidateNode = new ContentEditorTreeNodeProxy(this.Logger, parent);
        this.Logger.Log((<HTMLElement>mutation.target).innerText);
      } else {
        this.Logger.WarningAndContinue(this.GetMutatedNode.name, 'no parent found for ' + mutatedElement.id);
      }
    }
    return candidateNode;
  }

  private HandleMutationEvent(mutations: MutationRecord[]) {
    this.Logger.FuncStart(this.HandleMutationEvent.name);

    mutations.forEach((mutation) => {
      let candidateNode: ContentEditorTreeNodeProxy = this.GetMutatedNode(mutation);

      if (candidateNode) {
        if (candidateNode.__isActive()) {
          let payload: IPayload_ContentEditorTreeMutatedEvent = {
            MutatedElement: <HTMLElement>(mutation.target),
            ActiveNode: candidateNode,
            AssociatedIframeElemId: this.HostIframeId
          }
          this.NotifyObservers(payload);
        }
      }
    });

    this.Logger.FuncEnd(this.HandleMutationEvent.name);
  }
}