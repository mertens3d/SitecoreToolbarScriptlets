import { StaticHelpers } from '../../../../../Shared/scripts/Classes/StaticHelpers';
import { BufferChar } from '../../../../../Shared/scripts/Enums/BufferChar';
import { BufferDirection } from '../../../../../Shared/scripts/Enums/BufferDirection';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { IDesktopStartBarProxy } from '../../../../../Shared/scripts/Interfaces/Proxies/IDesktopProxy';
import { LoggableBase } from '../../../../../Shared/scripts/LoggableBase';
import { ScContentTreeNodeProxy } from '../../ContentEditor/ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy';

export class DesktopStartBarButtonProxy extends LoggableBase {
  private StartBarButtonElemId: string;
  private OwnerStartBar: IDesktopStartBarProxy;
  FoundStartBarButton: HTMLElement;
  private ScContentTreeNodeProxy: ScContentTreeNodeProxy;

  constructor(logger: ILoggerAgent, iframeElemId: string, ownerStartBar: IDesktopStartBarProxy) {
    super(logger);
    this.OwnerStartBar = ownerStartBar;

    this.StartBarButtonElemId = ContentConst.Const.Names.Desktop.StartBarApplicationPrefix + iframeElemId;
    let querySelectBtn = '[id=' + this.StartBarButtonElemId + ']';
    this.FoundStartBarButton = this.OwnerStartBar.GetAssociatedDoc().ContentDoc.querySelector(querySelectBtn);
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

  Update(targetButton: DesktopStartBarButtonProxy, scContentTreeNodeProxy: ScContentTreeNodeProxy) {
    this.Logger.FuncStart(this.Update.name);

    this.ScContentTreeNodeProxy = scContentTreeNodeProxy;

    let itemIconSource: string = scContentTreeNodeProxy.GetIconSrc();
    let mainIconSrc: string = scContentTreeNodeProxy.GetMainIconSrc();

    let text: string = StaticHelpers.BufferString(scContentTreeNodeProxy.GetNodeLinkText(), ContentConst.Const.Numbers.Desktop.MaxToolBarNameChars, BufferChar.space, BufferDirection.right);

    this.Logger.LogVal('iconSrc', itemIconSource);
    this.Logger.LogVal('mainIconSrc', mainIconSrc);
    if (targetButton && itemIconSource.length > 0) {
      let containerSpanElement: HTMLElement = targetButton.FoundStartBarButton.querySelector('div').querySelector('span');

      let newItemIconNode: HTMLImageElement = this.DesignItemIconNode(itemIconSource)
      let newMainIconNode: HTMLImageElement = this.DesignMainIconNode(mainIconSrc);

      containerSpanElement.innerHTML = newMainIconNode.outerHTML + newItemIconNode.outerHTML + text;
    }
    this.Logger.FuncEnd(this.Update.name);
  }
}