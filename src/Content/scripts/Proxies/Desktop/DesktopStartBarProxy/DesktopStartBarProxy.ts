import { StaticHelpers } from '../../../../../Shared/scripts/Classes/StaticHelpers';
import { BufferChar } from '../../../../../Shared/scripts/Enums/BufferChar';
import { BufferDirection } from '../../../../../Shared/scripts/Enums/BufferDirection';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { FrameProxy } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { IframeHelper } from '../../../Helpers/IframeHelper';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { ContentEditorProxy } from '../../ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { DesktopProxy } from '../DesktopProxy/DesktopProxy';
import { IPayload_ContentEditorTreeMutatedEvent } from '../DesktopProxy/Events/ContentEditorTreeMutatedEvent/IPayload_ContentEditorTreeMutatedEvent';
import { IPayload_DesktopIframeProxyMutated } from '../DesktopProxy/Events/Subject_DesktopIframeProxyMutatedEvent/IPayload_DesktopIframeProxyMutatedEvent';
import { DesktopStartBarButtonProxy } from './DesktopStartBarButtonProxy';

export class DesktopStartBarProxy extends LoggableBase {
  private __iframeHelper: IframeHelper;
  private CeProxies: ContentEditorProxy[] = [];
  private OwnerDesktopProxy: DesktopProxy;
  private SettingsAgent: ISettingsAgent;
  private __statBarElem: HTMLElement;

  constructor(logger: ILoggerAgent, ownerDesktopProxy: DesktopProxy, settingsAgent: ISettingsAgent) {
    super(logger);
    this.SettingsAgent = settingsAgent;
    this.Logger.InstantiateStart(DesktopStartBarProxy.name);
    this.OwnerDesktopProxy = ownerDesktopProxy;

    //this.EnrollListenerForActiveNodeChange();
    this.Logger.InstantiateEnd(DesktopStartBarProxy.name);
  }

  GetAssociatedDoc(): IDataOneDoc {
    return this.OwnerDesktopProxy.GetAssociatedDoc();
  }

  GetStartBarButtonById(targetId: string) {
    return this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.querySelector('[id=' + targetId + ']');
  }

  GetStartBarElement(): HTMLElement {
    if (!this.__statBarElem) {
      this.__statBarElem = this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.querySelector(ContentConst.Const.Selector.SC.Desktop.DtStartBar);
    }

    return this.__statBarElem;
  }

  private GetIframeHelper(): IframeHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new IframeHelper(this.Logger, this.SettingsAgent);
    }
    return this.__iframeHelper;
  }

  GetAssociatedStartBarButton(iframeElemId: string): DesktopStartBarButtonProxy {
    let foundStartBarProxy = new DesktopStartBarButtonProxy(this.Logger, iframeElemId, this);
    return foundStartBarProxy;
  }

  ChangeStartBarButtonText(targetButton:  DesktopStartBarButtonProxy, text: string, itemIconSource: string, mainIconSrc: string) {
    this.Logger.FuncStart(this.ChangeStartBarButtonText.name);
    this.Logger.LogVal('iconSrc', itemIconSource);
    this.Logger.LogVal('mainIconSrc', mainIconSrc);
    if (targetButton && itemIconSource.length > 0) {
      let containerSpanElement: HTMLElement = targetButton.FoundStartBarButton.querySelector('div').querySelector('span');
      //let currentInnerText = containerSpanElement.innerText;
      //let itemIconHtml = currentInnerHtml.replace(currentInnerText, text);

      //let existingIconImage: HTMLImageElement = containerSpanElement.querySelector('img');

      //let currentInnerHtml = containerSpanElement.innerHTML;

      // now the images

      let newItemIconNode = <HTMLImageElement>document.createElement('img');
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

  //EnrollListenerForActiveNodeChange(): void {
  //  try {
  //    await this.GetIframeHelper().GetHostedIframes(this.OwnerDesktopProxy.GetAssociatedDoc())
  //      .then((foundIframes: FrameProxy[]) => {
  //        for (var idx = 0; idx < foundIframes.length; idx++) {
  //          let iframe = foundIframes[idx];
  //        }
  //      })
  //  } catch (err) {
  //    throw (err);
  //  }
  //}

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
      this.Logger.LogVal('target Iframe Id', payload.AssociatedIframeElemId);
      let iframeElement: HTMLIFrameElement = <HTMLIFrameElement>this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.getElementById(payload.AssociatedIframeElemId);
      if (iframeElement) {
        if (payload.ActiveNode) {
          let foundStartBarButton: DesktopStartBarButtonProxy= this.GetAssociatedStartBarButton(payload.AssociatedIframeElemId);

          let itemIconSrc: string = payload.ActiveNode.GetIconSrc();
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