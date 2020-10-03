import { RecipeBasics } from '../../../../../../Shared/scripts/Classes/RecipeBasics';
import { StaticHelpers } from '../../../../../../Shared/scripts/Classes/StaticHelpers';
import { BufferChar } from '../../../../../../Shared/scripts/Enums/BufferChar';
import { BufferDirection } from '../../../../../../Shared/scripts/Enums/BufferDirection';
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ScDocumentProxy } from "../../../ScDocumentProxy";
import { IStateOfContentTree } from '../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree';
import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { _HindeCoreBase } from '../../../../../../Shared/scripts/LoggableBase';

export class DesktopStartBarButtonProxy extends _HindeCoreBase {
  private AssociatedDoc: ScDocumentProxy;
  private ContainerSpanElement: HTMLElement;
  private FoundStartBarButton: HTMLElement;
  private RecipeBasics: RecipeBasics;
  private StartBarButtonElemId: string;

  public FrameId: string;

  constructor(hindeCore: IHindeCore, iframeElemId: string, associatedDoc: ScDocumentProxy) {
    super(hindeCore);
    this.AssociatedDoc = associatedDoc;
    this.FrameId = iframeElemId;

    this.RecipeBasics = new RecipeBasics(this.HindeCore);
  }

  async Instantiate_DestopStartBarButtonProxy(): Promise<void> {
    try {
      this.StartBarButtonElemId = ContentConst.Const.Names.Desktop.StartBarApplicationPrefix + this.FrameId;
      let querySelectBtn = '[id=' + this.StartBarButtonElemId + ']';
      this.FoundStartBarButton = this.AssociatedDoc.querySelector(querySelectBtn);

      await this.RecipeBasics.WaitAndReturnFoundFromContainer(this.FoundStartBarButton, ':scope > div > span', this.Instantiate_DestopStartBarButtonProxy.name)
        .then((containerSpanElement: HTMLElement) => this.ContainerSpanElement = containerSpanElement);
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.Instantiate_DestopStartBarButtonProxy.name, err);
    }
  }

  private DesignMainIconNode(mainIconSrc: string): HTMLImageElement {
    let newMainIconNode = <HTMLImageElement>document.createElement('img');
    newMainIconNode.width = 16;
    newMainIconNode.height = 16;
    newMainIconNode.src = mainIconSrc;
    newMainIconNode.style.position = 'relative';
    newMainIconNode.style.left = '-8px';
    newMainIconNode.style.top = '-8px';
    newMainIconNode.style.marginRight = '-4px';
    newMainIconNode.style.opacity = '0.5';
    newMainIconNode.border = '0';
    newMainIconNode.classList.add("scContentTreeNodeIcon");
    return newMainIconNode;
  }

  private DesignItemIconNode(itemIconSource: string): HTMLImageElement {
    let newItemIconNode = <HTMLImageElement>document.createElement('img');
    newItemIconNode.width = 16;
    newItemIconNode.height = 16;
    newItemIconNode.src = itemIconSource;
    newItemIconNode.border = '0px';
    newItemIconNode.classList.add("scContentTreeNodeIcon");
    return newItemIconNode;
  }

  SetStateOfDesktopStartBarButtonAsync(stateOfContentTree: IStateOfContentTree): void {
    this.Logger.FuncStart(this.SetStateOfDesktopStartBarButtonAsync.name);
    this.TaskMonitor.AsyncTaskStarted(this.SetStateOfDesktopStartBarButtonAsync.name);

    this.ErrorHand.ThrowIfNullOrUndefined(this.SetStateOfDesktopStartBarButtonAsync.name, [stateOfContentTree]);

    let itemIconSource: string = stateOfContentTree.ActiveNodeFlat.IconSrc;
    let mainIconSrc: string = stateOfContentTree.ActiveNodeFlat.MainIconSrc;

    let text: string = StaticHelpers.BufferString(stateOfContentTree.ActiveNodeFlat.Friendly, ContentConst.Const.Numbers.Desktop.MaxToolBarNameChars, BufferChar.space, BufferDirection.right);

    if (itemIconSource.length > 0) {
      let newItemIconNode: HTMLImageElement = this.DesignItemIconNode(itemIconSource)
      let newMainIconNode: HTMLImageElement = this.DesignMainIconNode(mainIconSrc);

      if (this.ContainerSpanElement) {
        this.ContainerSpanElement.innerHTML = newMainIconNode.outerHTML + newItemIconNode.outerHTML + text;
      } else {
        this.ErrorHand.ErrorAndThrow(this.SetStateOfDesktopStartBarButtonAsync.name, 'no container span element');
      }
    } else {
      this.ErrorHand.WarningAndContinue(this.SetStateOfDesktopStartBarButtonAsync.name, 'no icon source');
    }

    this.TaskMonitor.AsyncTaskCompleted(this.SetStateOfDesktopStartBarButtonAsync.name);
    this.Logger.FuncEnd(this.SetStateOfDesktopStartBarButtonAsync.name);
  }
}