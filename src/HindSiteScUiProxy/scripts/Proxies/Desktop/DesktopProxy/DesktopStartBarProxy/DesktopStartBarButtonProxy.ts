import { DocumentJacket } from '../../../../../../DOMJacket/DocumentJacket';
import { ElementJacket } from '../../../../../../DOMJacket/ElementJacket';
import { StaticHelpers } from '../../../../../../Shared/scripts/Classes/StaticHelpers';
import { BufferChar } from '../../../../../../Shared/scripts/Enums/BufferChar';
import { BufferDirection } from '../../../../../../Shared/scripts/Enums/BufferDirection';
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateOfContentTree } from '../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentTree';
import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { SharedConst } from '../../../../../../Shared/scripts/SharedConst';
import { IScContentTreeNodeLineage } from '../../../../../../Shared/scripts/Interfaces/Data/IScContentTreeNodeLineage';
import { IScIcon } from '../../../../../../Shared/scripts/Interfaces/Data/IScIcon';
import { ConResolver } from '../../../ContentEditor/ContentEditorProxy/ContentTreeProxy/ScContentTreeNodeProxy/ConResolver';

export class DesktopStartBarButtonProxy extends _APICoreBase {
  private DocumentJacket: DocumentJacket;
  private ContainerSpanElement: ElementJacket;
  private FoundStartBarButton: ElementJacket;
  private StartBarButtonElemId: string;

  public FrameId: string;
  private ConResolver: ConResolver;

  constructor(apiCore: IAPICore, iframeElemId: string, documentJacket: DocumentJacket, conResolver: ConResolver) {
    super(apiCore);
    this.DocumentJacket = documentJacket;
    this.FrameId = iframeElemId;
    this.ConResolver = conResolver;
    this.InstantiateInstance();
  }

  private InstantiateInstance() {
    this.StartBarButtonElemId = ContentConst.Const.Names.Desktop.StartBarApplicationPrefix + this.FrameId;
  }

  async Instantiate_DestopStartBarButtonProxyAsyncItems(): Promise<void> {
    try {
      let querySelectBtn = '[id=' + this.StartBarButtonElemId + ']';
      this.FoundStartBarButton = this.DocumentJacket.QuerySelector(querySelectBtn);
      await this.FoundStartBarButton.WaitForElement(':scope > div > span', this.Instantiate_DestopStartBarButtonProxyAsyncItems.name)
        .then((containerSpanElement: ElementJacket) => this.ContainerSpanElement = containerSpanElement);
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.Instantiate_DestopStartBarButtonProxyAsyncItems.name, err);
    }
  }

  private AncestorNodeSpan(lineage: IScContentTreeNodeLineage): HTMLSpanElement {
    let htmlSpanElement = <HTMLSpanElement>document.createElement('span');

    let l1text = StaticHelpers.BufferString(lineage.L1Text, 5, BufferChar.space, BufferDirection.right);
    let l2text = StaticHelpers.BufferString(lineage.L2Text, 5, BufferChar.space, BufferDirection.right);

    htmlSpanElement.innerText = l1text + '_/' + l2text + '_';
    htmlSpanElement.style.left = '19px';
    htmlSpanElement.style.position = 'absolute';
    htmlSpanElement.style.top = '0px';
    htmlSpanElement.style.opacity = '0.3';
    htmlSpanElement.style.fontSize = '11px';
    return htmlSpanElement;
  }

  private LxNodeSpan(nodeText: string): HTMLSpanElement {
    let htmlSpanElement = <HTMLSpanElement>document.createElement('span');
    htmlSpanElement.innerText = StaticHelpers.BufferString(nodeText, ContentConst.Const.Numbers.Desktop.MaxToolBarNameChars, BufferChar.space, BufferDirection.right);
    htmlSpanElement.style.left = '15px';
    htmlSpanElement.style.position = 'absolute';
    htmlSpanElement.style.top = '0px';
    return htmlSpanElement;
  }
  private LxNodeImg(iconSource: string): HTMLImageElement {
    let newMainIconNode = <HTMLImageElement>document.createElement('img');
    newMainIconNode.border = '0';
    newMainIconNode.classList.add("scContentTreeNodeIcon");
    newMainIconNode.height = 16;
    newMainIconNode.src = iconSource;
    newMainIconNode.style.left = '0px';
    //newMainIconNode.style.marginRight = '-4px';
    newMainIconNode.style.position = 'absolute';
    newMainIconNode.style.top = '-8px';
    newMainIconNode.width = 16;
    return newMainIconNode;
  }

  private AncestorNodeIcon(itemIconSource: IScIcon): HTMLImageElement {
    let newItemIconNode = <HTMLImageElement>document.createElement('img');
    newItemIconNode.border = '0px';
    newItemIconNode.classList.add("scContentTreeNodeIcon");
    newItemIconNode.height = 16;
    newItemIconNode.src = this.ConResolver.ResolveIconPath(itemIconSource);
    newItemIconNode.style.position = "absolute";
    newItemIconNode.style.opacity = "0.9";
    newItemIconNode.width = 16;
    return newItemIconNode;
  }

  private ProcessColor(icon: string): string {
    let borderColor: string = '';

    if (icon.indexOf('photo_scenery.png') > -1) {
      borderColor = SharedConst.Const.Colors.colorMediaLibrary;
    }
    else if (icon.indexOf('cubes_blue.png') > -1) {
      borderColor = SharedConst.Const.Colors.colorContent;
    } else if (icon.indexOf('windows.png') > -1) {
      borderColor = SharedConst.Const.Colors.colorLayout;
    } else if (icon.indexOf('workstation1.png') > -1) {
      borderColor = SharedConst.Const.Colors.colorSystem;
    } else if (icon.indexOf('form_blue.png') > -1) {
      borderColor = SharedConst.Const.Colors.colorTemplates;
    }

    return borderColor;
  }

  private DrawBorderColor(stateOfContentTree: IStateOfContentTree) {
    let borderColor: string = '';
    borderColor = this.ProcessColor(stateOfContentTree.ActiveNodeShallow.Lineage.L1Icon.IconSuffix);
    if (borderColor.length > 0) {
      this.FoundStartBarButton.NativeElement.style.borderBottomColor = borderColor;
    }
  }

  private BuildLxSpan(stateOfContentTree: IStateOfContentTree): HTMLSpanElement {
    let nodeImage: HTMLImageElement = this.LxNodeImg(this.ConResolver.ResolveIconPath( stateOfContentTree.ActiveNodeShallow.IconSrc));
    let nodeSpan: HTMLSpanElement = this.LxNodeSpan(stateOfContentTree.ActiveNodeShallow.Friendly);

    let toReturn: HTMLSpanElement = <HTMLSpanElement>document.createElement('span');
    toReturn.style.position = 'relative';
    toReturn.style.left = '-8px';
    toReturn.style.top = '8px';
    toReturn.style.marginRight = '-4px';
    toReturn.classList.add("scContentTreeNodeIcon");

    toReturn.appendChild(nodeImage);
    toReturn.appendChild(nodeSpan);

    return toReturn;
  }
  private BuildAncestorSpan(stateOfContentTree: IStateOfContentTree): HTMLSpanElement {
    let nodeImage: HTMLImageElement = this.AncestorNodeIcon(stateOfContentTree.ActiveNodeShallow.Lineage.L1Icon);
    let nodeSpan: HTMLSpanElement = this.AncestorNodeSpan(stateOfContentTree.ActiveNodeShallow.Lineage);

    let toReturn: HTMLSpanElement = <HTMLSpanElement>document.createElement('span');
    toReturn.style.position = 'absolute';
    toReturn.style.top = '-17px';
    toReturn.style.left = '-17px';
    //toReturn.style.opacity = '0.3';
    toReturn.appendChild(nodeImage);
    toReturn.appendChild(nodeSpan);

    return toReturn;
  }

  private DrawTextAndIcons(stateOfContentTree: IStateOfContentTree) {
    let ancestorSpan: HTMLSpanElement = this.BuildAncestorSpan(stateOfContentTree);
    let lxSpan: HTMLSpanElement = this.BuildLxSpan(stateOfContentTree);

    let bothWrapper: HTMLSpanElement = <HTMLSpanElement>document.createElement('span');
    bothWrapper.style.position = "relative";
    bothWrapper.appendChild(ancestorSpan);
    bothWrapper.appendChild(lxSpan);

    if (this.ContainerSpanElement) {
      this.ContainerSpanElement.NativeElement.innerHTML = bothWrapper.outerHTML;
    } else {
      this.ErrorHand.ErrorAndThrow(this.SetStateOfDesktopStartBarButtonAsync.name, 'no container span element');
    }
  }

  SetStateOfDesktopStartBarButtonAsync(stateOfContentTree: IStateOfContentTree): void {
    this.Logger.FuncStart(this.SetStateOfDesktopStartBarButtonAsync.name);
    this.TaskMonitor.AsyncTaskStarted(this.SetStateOfDesktopStartBarButtonAsync.name);
    this.ErrorHand.ThrowIfNullOrUndefined(this.SetStateOfDesktopStartBarButtonAsync.name, [stateOfContentTree]);

    this.Logger.LogAsJsonPretty('stateOfContentTree.ActiveNodeFlat', stateOfContentTree.ActiveNodeShallow);

    if (stateOfContentTree) {
      this.DrawTextAndIcons(stateOfContentTree);
      this.DrawBorderColor(stateOfContentTree);
    } else {
      this.ErrorHand.WarningAndContinue(this.SetStateOfDesktopStartBarButtonAsync.name, 'no tree data');
    }

    this.TaskMonitor.AsyncTaskCompleted(this.SetStateOfDesktopStartBarButtonAsync.name);
    this.Logger.FuncEnd(this.SetStateOfDesktopStartBarButtonAsync.name);
  }
}