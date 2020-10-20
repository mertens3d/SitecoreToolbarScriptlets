import { TypeDiscriminator } from "../../../../Shared/scripts/Enums/70 - TypeDiscriminator";
import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { ICommonCore } from "../../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IJacketOfType } from "../../../../Shared/scripts/IJacketOfType";
import { INativeClassNameChangeEvent_Payload } from "./INativeClassNameChangeEvent_Payload";

export class NativeClassNameChangeEvent_Subject extends HindeSiteEvent_Subject<INativeClassNameChangeEvent_Payload> {
  readonly Friendly_Subject = NativeClassNameChangeEvent_Subject.name;
  readonly TypeDiscriminator = TypeDiscriminator.NativeClassNameChangeEvent_Subject;

  ShowLogActions: boolean = true;
  private TreeElement: HTMLElement;
  constructor(commonCore: ICommonCore, treeElementJacket: IJacketOfType) {
    super(commonCore);
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
      this.ErrorHand.HandleFatalError (this.InitTreeMutationEvent_Observer.name , err);
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