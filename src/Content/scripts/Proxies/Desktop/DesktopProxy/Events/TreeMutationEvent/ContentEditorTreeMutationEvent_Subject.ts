import { GenericEvent_Subject } from "../GenericEvent/GenericEvent_Subject";
import { ITreeMutationEvent_Payload } from "./ITreeMutationEvent_Payload";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ScContentTreeNodeProxy } from "../../../../ContentEditor/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";
import { IDataOneDoc } from "../../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";

export class ContentEditorTreeMutationEvent_Subject extends GenericEvent_Subject<ITreeMutationEvent_Payload> {
  private TreeElement: any;
  private HostIframeId: string;

  constructor(logger: ILoggerAgent, treeElement: HTMLElement, hostIframeId: string, host: IDataOneDoc) {
    super(logger, ContentEditorTreeMutationEvent_Subject.name);

    this.Logger.InstantiateStart(ContentEditorTreeMutationEvent_Subject.name);
    this.TreeElement = treeElement;
    this.HostIframeId = hostIframeId;
    this.Logger.LogVal('this.HostIframeId', this.HostIframeId);

    this.InitMutationObserver();

    this.Logger.InstantiateEnd(ContentEditorTreeMutationEvent_Subject.name);
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
        candidateNode = new ScContentTreeNodeProxy(this.Logger, mutatedAnchorElement, mutatedAnchorElement);
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
          let treeMutationEvent_Payload: ITreeMutationEvent_Payload = {
            StateOfTree: null, // todo
            MutatedElement: <HTMLElement>(mutation.target),
            ActiveNode: candidateNode,
            AssociatedIframeElemId: this.HostIframeId
          }
          this.NotifyObservers(treeMutationEvent_Payload);
        }
      }
    });
  }
}