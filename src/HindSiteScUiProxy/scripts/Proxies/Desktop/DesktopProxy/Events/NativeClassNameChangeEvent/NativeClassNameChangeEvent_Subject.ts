import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateOfScContentTreeNodeFlat } from "../../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfScContentTreeNodeFlat";
import { ScContentTreeNodeProxy } from "../../../../ContentEditor/ContentEditorProxy/ContentTreeProxy/ScContentTreeNodeProxy/ScContentTreeNodeProxy";
import { INativeClassNameChangeEvent_Payload } from "./INativeClassNameChangeEvent_Payload";
import { ContentConst } from "../../../../../../../Shared/scripts/Interfaces/InjectConst";

export class NativeClassNameChangeEvent_Subject extends HindeSiteEvent_Subject<INativeClassNameChangeEvent_Payload> {
  private TreeElement: any;
  constructor(hindeCore: IHindeCore, treeElement: HTMLElement) {
    super(hindeCore, NativeClassNameChangeEvent_Subject.name);
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

  //private MakeScContentTreeNodeProxy(mutation: MutationRecord): ScContentTreeNodeProxy {
  //  this.Logger.FuncStart(this.MakeScContentTreeNodeProxy.name);
  //  let candidateNode: ScContentTreeNodeProxy = null;
  //  let mutatedAnchorElement: HTMLAnchorElement = <HTMLAnchorElement>(mutation.target);
  //  candidateNode = new ScContentTreeNodeProxy(this.HindeCore, mutatedAnchorElement, 0, 0, 1);
  //  this.Logger.FuncEnd(this.MakeScContentTreeNodeProxy.name);
  //  return candidateNode;
  //}

  private OnNativeMutationEvent(mutationRecords: MutationRecord[]) {
    mutationRecords.forEach(async (mutationRecord: MutationRecord, index: number) => {
      if (mutationRecord.attributeName === 'class') {
        let anchorTest: HTMLAnchorElement = <HTMLAnchorElement>(mutationRecord.target);
        if (anchorTest) {
          if (anchorTest.classList.contains(ContentConst.Const.ClassNames.SC.scContentTreeNodeActive)) {
            this.NotifyObserversAsync(null);
          }
          //let scContentTreeNodeProxy: ScContentTreeNodeProxy = this.MakeScContentTreeNodeProxy(mutationRecord);
          //          if (scContentTreeNodeProxy) {
          //  let payload: INativeClassNameChangeEvent_Payload = {
          //    ActiveNode: null,
          //    MutatedElement: null,
          //    OwnerContentEditorProxy: null,
          //    StateOfContentEditorTreeProxy: null,
          //    MutatedNodeStateOfScContentTreeNodeFlat: null
          //  }

          //  await scContentTreeNodeProxy.GetStateOfScContentTreeNodeFlat()
          //    .then((stateOfContentTreeNodeFlat: IStateOfScContentTreeNodeFlat) => {
          //      this.Logger.LogVal(this.OnNativeMutationEvent.name, stateOfContentTreeNodeFlat.FriendlyTreeNode);

          //      if (stateOfContentTreeNodeFlat.IsActive) {
          //        //let treeMutationEvent_Payload: ContentTreeProxyMutationEvent_Payload = {
          //        //  StateOfContentTree: null,
          //        //};
          //        this.Logger.Log('node is active ' + stateOfContentTreeNodeFlat.FriendlyTreeNode)

          //        payload.MutatedNodeStateOfScContentTreeNodeFlat = stateOfContentTreeNodeFlat

          //        this.NotifyObserversAsync(payload);
          //      } else {
          //        this.Logger.Log('node not active ' + stateOfContentTreeNodeFlat.FriendlyTreeNode)
          //      }
          //    });
          //}
        }
      }
    });
  }
}