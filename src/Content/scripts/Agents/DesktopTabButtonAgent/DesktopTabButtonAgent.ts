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

  ChangeStartBarButtonText(targetButton: HTMLElement, text: string) {
    this.Logger.FuncStart(this.ChangeStartBarButtonText.name);
    if (targetButton) {
      let currentInnerHtml = targetButton.querySelector('div').querySelector('span').innerHTML;
      let currentInnerText = targetButton.querySelector('div').querySelector('span').innerText;
      let newInnerHtml = currentInnerHtml.replace(currentInnerText, text);
      targetButton.querySelector('div').querySelector('span').innerHTML = newInnerHtml;
    }
    this.Logger.FuncEnd(this.ChangeStartBarButtonText.name);
  }

  async EnrollListenerForActiveNodeChange(): Promise<void> {
    try {
      await this.GetIframeHelper().GetHostedIframes(this.OwnerDesktopProxy.GetAssociatedDoc())
        .then((foundIframes: IframeProxy[]) => {
          for (var idx = 0; idx < foundIframes.length; idx++) {
            let iframe = foundIframes[idx];
            let foundStartBarButton = this.GetStartAssociatedStartBarButton(iframe.IframeElem.id);
            this.ChangeStartBarButtonText(foundStartBarButton, 'dog');
          }
        });
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
        payload.NewCeProxy.AddListenerToActiveNodeChange((payload: IPayload_ContentEditorTreeMutatedEvent) => { self.CallbackNodeChanged(payload) });
      }
    } else {
      this.Logger.ErrorAndThrow(this.CallBackConEdProxyAdded.name, 'Null ceProxy');
    }

    this.Logger.FuncEnd(this.CallBackConEdProxyAdded.name);
  }

  CallbackNodeChanged(payload: IPayload_ContentEditorTreeMutatedEvent) {
    this.Logger.FuncStart(this.CallbackNodeChanged.name);
    // at this point we have a new active node (or some other change event)

    if (payload) {
      this.Logger.LogAsJsonPretty('data', payload);

      this.Logger.LogVal('target Iframe Id', payload.AssociatedIframeElemId);
      let iframeElement: HTMLIFrameElement = <HTMLIFrameElement>this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.getElementById(payload.AssociatedIframeElemId);
      if (iframeElement) {
        if (payload.ActiveNode) {
          let foundStartBarButton = this.GetStartAssociatedStartBarButton(payload.AssociatedIframeElemId);
          let bufferedString: string = StaticHelpers.BufferString(payload.ActiveNode.GetFriendlyNameFromNode(), ContentConst.Const.Numbers.Desktop.MaxToolBarNameChars, BufferChar.space, BufferDirection.right);
          this.ChangeStartBarButtonText(foundStartBarButton, bufferedString);
        }

        //we need to know what the associated button is
        //we can get that by knowing the id of the CE
      } else {
        this.Logger.ErrorAndContinue(this.CallbackNodeChanged.name, 'Did not find iframe');
      }
    } else {
      this.Logger.ErrorAndThrow(this.CallbackNodeChanged.name, 'Null payload');
    }

    this.Logger.FuncEnd(this.CallbackNodeChanged.name);
  }
}