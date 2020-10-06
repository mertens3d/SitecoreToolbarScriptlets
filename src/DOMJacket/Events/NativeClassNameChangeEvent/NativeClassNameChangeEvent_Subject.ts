import { HindeSiteEvent_Subject } from "../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { ElementJacket } from "../../ElementJacket";
import { INativeClassNameChangeEvent_Payload } from "./INativeClassNameChangeEvent_Payload";

export class NativeClassNameChangeEvent_Subject extends HindeSiteEvent_Subject<INativeClassNameChangeEvent_Payload> {
  ShowLogActions: boolean = true;
  private TreeElement: HTMLElement;
  constructor(hindeCore: IHindeCore, treeElementJacket: ElementJacket) {
    super(hindeCore, NativeClassNameChangeEvent_Subject.name);
    this.TreeElement = treeElementJacket.NativeElement;
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

  private OnNativeMutationEvent(mutationRecords: MutationRecord[]) {
    mutationRecords.forEach(async (mutationRecord: MutationRecord, index: number) => {
      if (mutationRecord.attributeName === 'class') {
        let anchorTest: HTMLAnchorElement = <HTMLAnchorElement>(mutationRecord.target);
        if (anchorTest) {
          if (anchorTest.classList.contains(ContentConst.Const.ClassNames.SC.scContentTreeNodeActive)) {
            this.NotifyObserversAsync(null);
          }
        }
      }
    });
  }
}