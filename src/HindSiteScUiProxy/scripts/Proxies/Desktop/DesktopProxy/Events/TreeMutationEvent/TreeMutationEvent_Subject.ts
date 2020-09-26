import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ScContentTreeNodeProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentEditorTreeProxy/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";
import { ITreeMutationEvent_Payload } from "./ITreeMutationEvent_Payload";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";

export class TreeMutationEvent_Subject extends HindeSiteEvent_Subject<ITreeMutationEvent_Payload> {
  private TreeElement: any;

  constructor(logger: ILoggerAgent, treeElement: HTMLElement) {
    super(logger, TreeMutationEvent_Subject.name);

    this.TreeElement = treeElement;
    this.InitTreeMutationEvent_Observer();
  }

  private InitTreeMutationEvent_Observer() {
    try {
      if (this.TreeElement) {
        let self = this;
        let observer = new MutationObserver((mutations: MutationRecord[]) => self.OnTreeMutationEvent_TreeMutationEvent_Subject(mutations));

        observer.observe(this.TreeElement, { attributes: true, subtree: true, childList: true });
      }
    } catch (err) {
      throw (this.InitTreeMutationEvent_Observer.name + ' | ' + err);
    }
  }

  private MakeScContentTreeNodeProxy(mutation: MutationRecord): ScContentTreeNodeProxy {
    let candidateNode: ScContentTreeNodeProxy = null;
    let mutatedAnchorElement: HTMLAnchorElement = <HTMLAnchorElement>(mutation.target);
    candidateNode = new ScContentTreeNodeProxy(this.Logger, mutatedAnchorElement);
    return candidateNode;
  }

  private OnTreeMutationEvent_TreeMutationEvent_Subject(mutationRecords: MutationRecord[]) {
    mutationRecords.forEach((mutationRecord: MutationRecord, index: number) => {
      if (mutationRecord.attributeName === 'class') {
        let anchorTest: HTMLAnchorElement = <HTMLAnchorElement>(mutationRecord.target);
        if (anchorTest) {
          let scContentTreeNodeProxy: ScContentTreeNodeProxy = this.MakeScContentTreeNodeProxy(mutationRecord);

          if (scContentTreeNodeProxy) {
            if (scContentTreeNodeProxy.QueryIsActive()) {
              let treeMutationEvent_Payload: ITreeMutationEvent_Payload = {
                OwnerContentEditorProxy: null, //todo
                StateOfTree: null, // todo
                MutatedElement: <HTMLElement>(mutationRecord.target),
                ActiveNode: scContentTreeNodeProxy,
              }

              this.NotifyObservers(treeMutationEvent_Payload);
            }
          }
        }
      }
    });
  }
}