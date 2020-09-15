import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { ScContentTreeNodeProxy } from "../../../../ContentEditor/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy";
import { HindeSiteEvent_Subject } from "../_HindSiteEvent/HindeSiteEvent_Subject";
import { ITreeMutationEvent_Payload } from "./ITreeMutationEvent_Payload";

export class TreeMutationEvent_Subject extends HindeSiteEvent_Subject<ITreeMutationEvent_Payload> {
  private TreeElement: any;
  private HostIframeId: string;

  constructor(logger: ILoggerAgent, treeElement: HTMLElement, hostIframeId: string, host: IDataOneDoc) {
    super(logger, TreeMutationEvent_Subject.name);

    this.Logger.InstantiateStart(TreeMutationEvent_Subject.name);
    this.TreeElement = treeElement;
    this.HostIframeId = hostIframeId;
    this.Logger.LogVal('this.HostIframeId', this.HostIframeId);

    this.InitTreeMutationEvent_Observer();

    this.Logger.InstantiateEnd(TreeMutationEvent_Subject.name);
  }

  private InitTreeMutationEvent_Observer() {
    this.Logger.FuncStart(this.InitTreeMutationEvent_Observer.name);

    try {
      if (this.TreeElement) {
        let self = this;
        let observer = new MutationObserver((mutations: MutationRecord[]) => self.OnTreeMutationEvent_TreeMutationEvent_Subject(mutations));

        observer.observe(this.TreeElement, { attributes: true, subtree: true, childList: true });
      }
    } catch (err) {
      throw (this.InitTreeMutationEvent_Observer.name + ' | ' + err);
    }

    this.Logger.FuncEnd(this.InitTreeMutationEvent_Observer.name);
  }

  private MakeScContentTreeNodeProxy(mutation: MutationRecord): ScContentTreeNodeProxy {
    this.Logger.FuncStart(this.MakeScContentTreeNodeProxy.name);

    let candidateNode: ScContentTreeNodeProxy = null;

    let mutatedAnchorElement: HTMLAnchorElement = <HTMLAnchorElement>(mutation.target);

    candidateNode = new ScContentTreeNodeProxy(this.Logger, mutatedAnchorElement);
    this.Logger.Log('innerText : ' + (<HTMLElement>mutation.target).innerText);

    this.Logger.FuncEnd(this.MakeScContentTreeNodeProxy.name);
    return candidateNode;
  }

  private OnTreeMutationEvent_TreeMutationEvent_Subject(mutationRecords: MutationRecord[]) {
    this.Logger.FuncStart(this.OnTreeMutationEvent_TreeMutationEvent_Subject.name, 'mutationRecord count: ' + mutationRecords.length);

    mutationRecords.forEach((mutationRecord: MutationRecord, index: number) => {
      if (mutationRecord.attributeName === 'class') {
        let anchorTest: HTMLAnchorElement = <HTMLAnchorElement>(mutationRecord.target);
        if (anchorTest) {
          this.Logger.Log(index + ':' + mutationRecords.length + '  - passes the class and anchor test');
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

    this.Logger.FuncEnd(this.OnTreeMutationEvent_TreeMutationEvent_Subject.name);
  }
}