import { LoggableBase } from '../../Managers/LoggableBase';
import { ContentEditorProxy } from '../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { DesktopProxy } from '../../Proxies/Desktop/DesktopProxy/DesktopProxy';
import { IframeHelper } from '../../Helpers/IframeHelper';
import { IframeProxy } from '../../../../Shared/scripts/Interfaces/Data/IDataOneIframe';
import { IPayload_ContentEditorTreeMutatedEvent } from '../../Proxies/Desktop/DesktopProxy/Events/ContentEditorTreeMutatedEvent/IPayload_ContentEditorTreeMutatedEvent';
import { ContentConst } from '../../../../Shared/scripts/Interfaces/InjectConst';
import { StaticHelpers } from '../../../../Shared/scripts/Classes/StaticHelpers';
import { BufferChar } from '../../../../Shared/scripts/Enums/BufferChar';
import { BufferDirection } from '../../../../Shared/scripts/Enums/BufferDirection';
import { IPayload_DesktopIframeProxyMutated } from '../../Proxies/Desktop/DesktopProxy/Events/Subject_DesktopIframeProxyMutatedEvent/IPayload_DesktopIframeProxyMutatedEvent';

export class DesktopTabButtonAgent extends LoggableBase {
  private __iframeHelper: IframeHelper;
  private CeProxies: ContentEditorProxy[] = [];
  private OwnerDesktopProxy: DesktopProxy;

  constructor(logger: ILoggerAgent, ownerDesktopProxy: DesktopProxy) {
    super(logger);
    this.Logger.InstantiateStart(DesktopTabButtonAgent.name);
    this.OwnerDesktopProxy = ownerDesktopProxy;

    this.EnrollListenerForActiveNodeChange();
    this.Logger.InstantiateEnd(DesktopTabButtonAgent.name);
  }

  private GetIframeHelper(): IframeHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new IframeHelper(this.Logger);
    }
    return this.__iframeHelper;
  }

  GetStartAssociatedStartBarButton(iframeElemId: string): HTMLElement {
    let startBarButtonElemId = ContentConst.Const.Names.Desktop.StartBarApplicationPrefix + iframeElemId;
    let querySelectBtn = '[id=' + startBarButtonElemId + ']';
    let foundStartBarButton: HTMLElement = this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.querySelector(querySelectBtn);
    return foundStartBarButton;
  }

  ChangeStartBarButtonText(targetButton: HTMLElement, text: string, itemIconSource: string, mainIconSrc: string) {
    this.Logger.FuncStart(this.ChangeStartBarButtonText.name);
    this.Logger.LogVal('iconSrc', itemIconSource);
    this.Logger.LogVal('mainIconSrc', mainIconSrc);
    if (targetButton && itemIconSource.length > 0) {
      let containerSpanElement: HTMLElement = targetButton.querySelector('div').querySelector('span');
      //let currentInnerText = containerSpanElement.innerText;
      //let itemIconHtml = currentInnerHtml.replace(currentInnerText, text);

      //let existingIconImage: HTMLImageElement = containerSpanElement.querySelector('img');

      //let currentInnerHtml = containerSpanElement.innerHTML;

      // now the images

      let newItemIconNode = <HTMLImageElement> document.createElement('img');
      newItemIconNode.width = 16;
      newItemIconNode.height = 16;
      newItemIconNode.src = itemIconSource;
      newItemIconNode.border = '0px';
      newItemIconNode.classList.add("scContentTreeNodeIcon");

      let newMainIconNode = <HTMLImageElement>document.createElement('img');
      newMainIconNode.width = 16;
      newMainIconNode.height = 16;
      newMainIconNode.src = mainIconSrc;
      newMainIconNode.style.position = 'relative';
      newMainIconNode.style.left = '-8px';
      newMainIconNode.style.top = '-8px';
      newMainIconNode.style.marginRight = '-4px';


      newMainIconNode.border = '0';
      newMainIconNode.classList.add("scContentTreeNodeIcon");






      //let mainIconHtml: string = '';

      //if (mainIconSrc.length > 0) {
      //  mainIconHtml = '<img src="' + mainIconSrc + '" width = "16" height = "16" class="scContentTreeNodeIcon" alt = "" border = "0" >';
      //}

      containerSpanElement.innerHTML = newMainIconNode.outerHTML + newItemIconNode.outerHTML + text;



      //  let itemImageElement: HTMLImageElement;

      //  if (itemIconSource && itemIconSource.length > 0) {
      //    itemImageElement = <HTMLImageElement>targetButton.querySelector('img');

      //    if (itemImageElement) {
      //      itemImageElement.src = itemIconSource;
      //    }

      //    if (containerSpanElement) {
      //      containerSpanElement.innerHTML = mainIconHtml + itemim

      //    }

      //  }
    }
    this.Logger.FuncEnd(this.ChangeStartBarButtonText.name);
  }

  EnrollListenerForActiveNodeChange(): void {
    try {
      let foundIframes: IframeProxy[] = this.GetIframeHelper().GetHostedIframes(this.OwnerDesktopProxy.GetAssociatedDoc())
      for (var idx = 0; idx < foundIframes.length; idx++) {
        let iframe = foundIframes[idx];
        let foundStartBarButton = this.GetStartAssociatedStartBarButton(iframe.IframeElem.id);
      }
    } catch (err) {
      throw (err);
    }
  }

  CallBackConEdProxyAdded(payload: IPayload_DesktopIframeProxyMutated) {
    this.Logger.FuncStart(this.CallBackConEdProxyAdded.name);

    if (payload) {
      if (this.CeProxies.indexOf(payload.NewCeProxy) < 0) {
        this.CeProxies.push(payload.NewCeProxy);

        let self = this;
        payload.NewCeProxy.AddListenerToActiveNodeChange((payload: IPayload_ContentEditorTreeMutatedEvent) => { self.CallbackTreeNodeChanged(payload) });
      }
    } else {
      this.Logger.ErrorAndThrow(this.CallBackConEdProxyAdded.name, 'Null ceProxy');
    }

    this.Logger.FuncEnd(this.CallBackConEdProxyAdded.name);
  }

  CallbackTreeNodeChanged(payload: IPayload_ContentEditorTreeMutatedEvent) {
    this.Logger.FuncStart(this.CallbackTreeNodeChanged.name);
    // at this point we have a new active node (or some other change event)

    if (payload) {
      this.Logger.LogAsJsonPretty('data', payload);

      this.Logger.LogVal('target Iframe Id', payload.AssociatedIframeElemId);
      let iframeElement: HTMLIFrameElement = <HTMLIFrameElement>this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.getElementById(payload.AssociatedIframeElemId);
      if (iframeElement) {
        if (payload.ActiveNode) {
          let foundStartBarButton = this.GetStartAssociatedStartBarButton(payload.AssociatedIframeElemId);

          let itemIconSrc: string = payload.ActiveNode .GetIconSrc();
          let mainIconSrc: string = payload.ActiveNode.GetMainIconSrc();

          let bufferedString: string = StaticHelpers.BufferString(payload.ActiveNode.GetNodeLinkText(), ContentConst.Const.Numbers.Desktop.MaxToolBarNameChars, BufferChar.space, BufferDirection.right);
          this.ChangeStartBarButtonText(foundStartBarButton, bufferedString, itemIconSrc, mainIconSrc);
        }

        //we need to know what the associated button is
        //we can get that by knowing the id of the CE
      } else {
        this.Logger.ErrorAndContinue(this.CallbackTreeNodeChanged.name, 'Did not find iframe');
      }
    } else {
      this.Logger.ErrorAndThrow(this.CallbackTreeNodeChanged.name, 'Null payload');
    }

    this.Logger.FuncEnd(this.CallbackTreeNodeChanged.name);
  }
}