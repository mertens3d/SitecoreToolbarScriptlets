import { LoggableBase } from '../../Managers/LoggableBase';
import { ContentEditorProxy } from '../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { DesktopProxy } from '../../Proxies/Desktop/DesktopProxy/DesktopProxy';
import { IframeHelper } from '../../Helpers/IframeHelper';
import { IframeProxy } from '../../../../Shared/scripts/Interfaces/Data/IDataOneIframe';
import { IPayload__ConEdProxyAddedToDesktop } from '../../Proxies/Desktop/DesktopProxy/Events/ContentEditorProxyAddedToDesktopEvent/IPayloadDesktop__ContentEditorProxyAddedToDesktop';
import { IPayload_ContentEditorTreeMutatedEvent } from '../../Proxies/Desktop/DesktopProxy/Events/ContentEditorTreeMutatedEvent/IPayload_ContentEditorTreeMutatedEvent';

export class CeTabButtonAgent extends LoggableBase {
  private __iframeHelper: IframeHelper;
  private CeProxies: ContentEditorProxy[] = [];
  private OwnerDesktopProxy: DesktopProxy;

  constructor(logger: ILoggerAgent, ownerDesktopProxy: DesktopProxy) {
    super(logger);
    this.Logger.InstantiateStart(CeTabButtonAgent.name);
    this.OwnerDesktopProxy = ownerDesktopProxy;

    this.EnrollListenerForActiveNodeChange();
    this.Logger.InstantiateEnd(CeTabButtonAgent.name);
  }

  //CallBackTreeMutated(conEdProxy: ContentEditorProxy) {
  //  this.Logger.FuncStart(this.CallBackTreeMutated.name);

  //  if (conEdProxy) {
  //  } else {
  //    this.Logger.ErrorAndThrow(this.CallBackTreeMutated.name, 'Null ceProxy');
  //  }

  //  this.Logger.FuncEnd(this.CallBackTreeMutated.name);
  //}

  private GetIframeHelper(): IframeHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new IframeHelper(this.Logger);
    }
    return this.__iframeHelper;
  }

  TreeMutationCallback(mutation: MutationCallback) {
  }

  GetStartAssociatedStartBarButton(iframeElemId: string): HTMLElement {
    this.Logger.FuncStart(this.GetStartAssociatedStartBarButton.name);
    //start bar button is same with prefix added
    let startBarButtonElemId = 'startbar_application_' + iframeElemId;

    let querySelectBtn = '[id=' + startBarButtonElemId + ']';
    this.Logger.LogVal('selector', querySelectBtn);
    let foundStartBarButton: HTMLElement = this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.querySelector(querySelectBtn);

    this.Logger.FuncEnd(this.GetStartAssociatedStartBarButton.name, (foundStartBarButton != null).toString());
    return foundStartBarButton;
  }

  ChangeStartBarButtonText(targetButton: HTMLElement, text: string) {
    this.Logger.FuncStart(this.ChangeStartBarButtonText.name);
    if (targetButton) {
      let currentInnerHtml = targetButton.querySelector('div').querySelector('span').innerHTML;
      let currentInnerText = targetButton.querySelector('div').querySelector('span').innerText;

      let newInnerHtml = currentInnerHtml.replace(currentInnerText, text);

      targetButton.querySelector('div').querySelector('span').innerHTML = newInnerHtml;
      //= document.querySelector('[id=startbar_application_FRAME267787985]').querySelector('div').querySelector('span').innerHTML.replace('Content Editor', 'dog')
    }
    this.Logger.FuncEnd(this.ChangeStartBarButtonText.name);
  }

  async EnrollListenerForActiveNodeChange(): Promise<void> {
    try {
      await this.GetIframeHelper().GetHostedIframes(this.OwnerDesktopProxy.GetAssociatedDoc())
        .then((foundIframes: IframeProxy[]) => {
          for (var idx = 0; idx < foundIframes.length; idx++) {
            let iframe = foundIframes[idx];

            //let tree = new ContentEditorContentTreeHolderProxy(this.Logger, iframe.ContentDoc);
            let foundStartBarButton = this.GetStartAssociatedStartBarButton(iframe.IframeElem.id);
            this.ChangeStartBarButtonText(foundStartBarButton, 'dog');
          }
        });
    } catch (err) {
      throw (err);
    }
  }

  CallBackConEdProxyAdded(payload: IPayload__ConEdProxyAddedToDesktop) {
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
        if (payload.ActiveNode ) {
          let foundStartBarButton = this.GetStartAssociatedStartBarButton(payload.AssociatedIframeElemId);
          this.ChangeStartBarButtonText(foundStartBarButton, payload.ActiveNode .GetFriendlyNameFromNode());
        }

        //we need to know what the associated button is
        //we can get that by knowning the id of the CE
      } else {
        this.Logger.ErrorAndContinue(this.CallbackNodeChanged.name, 'Did not find iframe');
      }
    } else {
      this.Logger.ErrorAndThrow(this.CallbackNodeChanged.name, 'Null payload');
    }

    this.Logger.FuncEnd(this.CallbackNodeChanged.name);
  }
}