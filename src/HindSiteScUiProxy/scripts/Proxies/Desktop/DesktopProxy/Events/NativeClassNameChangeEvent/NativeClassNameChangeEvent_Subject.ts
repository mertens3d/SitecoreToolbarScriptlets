import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ScContentTreeNodeProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentEditorTreeProxy/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";
import { ITreeProxyMutationEvent_Payload } from "../TreeMutationEvent/ITreeMutationEvent_Payload";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IStateOfScContentTreeNodeProxy } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfScContentTreeNode";
import { TreeMutationEvent_Subject } from "../TreeMutationEvent/TreeMutationEvent_Subject";
import { INativeClassNameChangeEvent_Payload } from "./INativeClassNameChangeEvent_Payload";

export class NativeClassNameChangeEvent_Subject extends HindeSiteEvent_Subject<INativeClassNameChangeEvent_Payload> {
  private TreeElement: any;
  constructor(logger: ILoggerAgent, treeElement: HTMLElement) {
    super(logger, NativeClassNameChangeEvent_Subject.name);
    this.TreeElement = treeElement;
    this.InitTreeMutationEvent_Observer();
  }

  private InitTreeMutationEvent_Observer() {
    try {
      if (this.TreeElement) {
        let self = this;
        let observer = new MutationObserver((mutations: MutationRecord[]) => self.OnNativeMutationEvent(mutations));

        observer.observe(this.TreeElement, { attributes: true, subtree: true, childList: true });
      }
    }
    catch (err) {
      throw (this.InitTreeMutationEvent_Observer.name + ' | ' + err);
    }
  }

  private MakeScContentTreeNodeProxy(mutation: MutationRecord): ScContentTreeNodeProxy {
    let candidateNode: ScContentTreeNodeProxy = null;
    let mutatedAnchorElement: HTMLAnchorElement = <HTMLAnchorElement>(mutation.target);
    candidateNode = new ScContentTreeNodeProxy(this.Logger, mutatedAnchorElement, 0,0,1);
    return candidateNode;
  }

  private OnNativeMutationEvent(mutationRecords: MutationRecord[]) {
    mutationRecords.forEach(async (mutationRecord: MutationRecord, index: number) => {
      if (mutationRecord.attributeName === 'class') {
        let anchorTest: HTMLAnchorElement = <HTMLAnchorElement>(mutationRecord.target);
        if (anchorTest) {
          let scContentTreeNodeProxy: ScContentTreeNodeProxy = this.MakeScContentTreeNodeProxy(mutationRecord);
          if (scContentTreeNodeProxy) {
            let payload: INativeClassNameChangeEvent_Payload = {
              ActiveNode: null,
              MutatedElement: null,
              OwnerContentEditorProxy: null,
              StateOfContentEditorTreeProxy: null,
              MutatedNodeStateOfScContentTreeNodeProxy: null
            }

            await scContentTreeNodeProxy.GetStateOfScContentTreeNode()
              .then((stateOfScContentTreeNodeProxy: IStateOfScContentTreeNodeProxy) => {
                this.Logger.LogVal(this.OnNativeMutationEvent.name, stateOfScContentTreeNodeProxy.FriendlyTreeNode);

                if (stateOfScContentTreeNodeProxy.IsActive) {
                  let treeMutationEvent_Payload: ITreeProxyMutationEvent_Payload = {
                    //OwnerContentEditorProxy: null,
                    StateOfContentEditorTreeProxy: null,
                    //MutatedElement: <HTMLElement>(mutationRecord.target),
                    //ActiveNode: scContentTreeNodeProxy,
                    //StateOfScContentTreeNodeProxy: stateOfScContentTreeNodeProxy
                  };
                  this.Logger.Log('node is active ' + stateOfScContentTreeNodeProxy.FriendlyTreeNode)

                  payload.MutatedNodeStateOfScContentTreeNodeProxy = stateOfScContentTreeNodeProxy

                  this.NotifyObservers(payload);

                } else {
                  this.Logger.Log('node not active ' + stateOfScContentTreeNodeProxy.FriendlyTreeNode)
                }
              });
          }
        }
      }
    });
  }
}