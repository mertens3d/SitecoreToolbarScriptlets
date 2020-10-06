import { DocumentJacket } from '../../../../../../DOMJacket/DocumentJacket';
import { ElementJacket } from '../../../../../../DOMJacket/ElementJacket';
import { StaticHelpers } from '../../../../../../Shared/scripts/Classes/StaticHelpers';
import { BufferChar } from '../../../../../../Shared/scripts/Enums/BufferChar';
import { BufferDirection } from '../../../../../../Shared/scripts/Enums/BufferDirection';
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateOfContentTree } from '../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree';
import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { _HindeCoreBase } from '../../../../../../Shared/scripts/LoggableBase';

export class DesktopStartBarButtonProxy extends _HindeCoreBase {
  private DocumentJacket: DocumentJacket;
  private ContainerSpanElement: ElementJacket;
  private FoundStartBarButton: ElementJacket;
  private StartBarButtonElemId: string;

  public FrameId: string;

  constructor(hindeCore: IHindeCore, iframeElemId: string, documentJacket: DocumentJacket) {
    super(hindeCore);
    this.DocumentJacket = documentJacket;
    this.FrameId = iframeElemId;
  }

  async Instantiate_DestopStartBarButtonProxy(): Promise<void> {
    try {
      this.StartBarButtonElemId = ContentConst.Const.Names.Desktop.StartBarApplicationPrefix + this.FrameId;
      let querySelectBtn = '[id=' + this.StartBarButtonElemId + ']';
      this.FoundStartBarButton = this.DocumentJacket.QuerySelector(querySelectBtn);

      await this.FoundStartBarButton.WaitAndReturnFoundElemJacketFromElemJacket(':scope > div > span', this.Instantiate_DestopStartBarButtonProxy.name)
        .then((containerSpanElement: ElementJacket) => this.ContainerSpanElement = containerSpanElement);
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.Instantiate_DestopStartBarButtonProxy.name, err);
    }
  }

  //make the td bottom border color
  //media - cyan
  // content - blue
  //package designer - white
  private RootNodeText(mainIconSrc: string): HTMLImageElement {
    //upper span
    // position: absolute;
    // top: 0;
    // left: 12px;
    // opacity: 0.3;
    /// this has just been copied, the numbers are not correct
    let htmlElement = <HTMLImageElement>document.createElement('span');
    htmlElement.style.position = 'absolute';
    htmlElement.style.top = '0px';
    htmlElement.style.left = '12px';
    htmlElement.style.opacity = '0.5';
    htmlElement.innerText = '';
    return htmlElement;
  }

  private MainNodeText(mainIconSrc: string): HTMLImageElement {
    let htmlElement = <HTMLImageElement>document.createElement('span');
    htmlElement.style.position = 'absolute';
    htmlElement.style.top = '0px';
    htmlElement.style.left = '12px';
    htmlElement.style.opacity = '0.5';
    htmlElement.innerText = '';
    return htmlElement;
  }
  private MainNodeIcon(mainIconSrc: string): HTMLImageElement {
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

  //make the parent span to all of this position relative

  // then icon
  //    position: absolute;
  // left: 7px;
  // top: 15px;

  //the text
  //position: absolute;
  //top: 13px;
  //left: 21px;
  //wrapped in a span

  private RootNodeIcon(itemIconSource: string): HTMLImageElement {
    //upper image
    //position: relative;
    //left: -8px;
    //top: -8px;
    //margin-right: -4px;
    //opacity: 0.3;
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
      let rootNodeText: HTMLImageElement = this.RootNodeText(itemIconSource)
      let rootNodeIcon: HTMLImageElement = this.RootNodeIcon(itemIconSource)

      let mainNodeIcon: HTMLImageElement = this.MainNodeIcon(mainIconSrc);
      let mainNodeText: HTMLImageElement = this.MainNodeText(mainIconSrc);

      if (this.ContainerSpanElement) {
        this.ContainerSpanElement.NativeElement.innerHTML = mainNodeIcon.outerHTML + mainNodeText.outerHTML + rootNodeIcon.outerHTML + text;
      } else {
        this.ErrorHand.ErrorAndThrow(this.SetStateOfDesktopStartBarButtonAsync.name, 'no container span element');
      }

      let borderColor: string = '';

      let colorMediaLibrary = 'chocolate';
      let colorContent = 'cyan';
      let colorLayout = 'lightsteelblue';
      let colorSystem = 'lightgreen';
      let colorTemplates = 'white';

      if (mainIconSrc.indexOf('photo_scenery.png') > 0) {
        borderColor = colorMediaLibrary;
      }
      else if (mainIconSrc.indexOf('cubes_blue.png') > 0) {
        borderColor = colorContent;
      } else if (mainIconSrc.indexOf('windows.png') > 0) {
        borderColor = colorLayout;
      } else if (mainIconSrc.indexOf('workstation1.png') > 0) {
        borderColor = colorSystem;
      } else if (mainIconSrc.indexOf('form_blue.png') > 0) {
        borderColor = colorTemplates;
      }
      if (borderColor.length > 0) {

        this.FoundStartBarButton.NativeElement.style.borderBottomColor = borderColor;
      }

    } else {
      this.ErrorHand.WarningAndContinue(this.SetStateOfDesktopStartBarButtonAsync.name, 'no icon source');
    }

    this.TaskMonitor.AsyncTaskCompleted(this.SetStateOfDesktopStartBarButtonAsync.name);
    this.Logger.FuncEnd(this.SetStateOfDesktopStartBarButtonAsync.name);
  }
}