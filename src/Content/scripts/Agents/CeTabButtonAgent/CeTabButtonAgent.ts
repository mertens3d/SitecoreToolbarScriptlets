import { LoggableBase } from '../../Managers/LoggableBase';
import { ContentEditorProxy } from '../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { DesktopProxy } from '../../Proxies/Desktop/DesktopProxy/DesktopProxy';
import { IframeHelper } from '../../Helpers/IframeHelper';
import { IframeProxy } from '../../../../Shared/scripts/Interfaces/Data/IDataOneIframe';

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

  CallBackTreeMutated(ceProxy: ContentEditorProxy) {
    this.Logger.FuncStart(this.CallBackTreeMutated.name);

    if (this.CeProxies.indexOf(ceProxy) < 0) {
      this.CeProxies.push(ceProxy);

      let self = this;
      ceProxy.AddListenerToActiveNodeChange((data) => { self.CallbackNodeChanged(data) });
    }

    this.Logger.FuncEnd(this.CallBackTreeMutated.name);
  }

  private GetIframeHelper(): IframeHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new IframeHelper(this.Logger);
    }
    return this.__iframeHelper;
  }

  TreeMutationCallback(mutation: MutationCallback) {

  }

  async EnrollListenerForActiveNodeChange(): Promise<void> {
    try {
      await this.GetIframeHelper().GetHostedIframes(this.OwnerDesktopProxy.GetAssociatedDoc())
        .then((foundIframes: IframeProxy[]) => {
          for (var idx = 0; idx < foundIframes.length; idx++) {
            let iframe = foundIframes[idx];
            let iframeElemId = iframe.IframeElem.id;

            //let tree = new ContentEditorContentTreeHolderProxy(this.Logger, iframe.ContentDoc);

            //start bar button is same with prefix added
            let startBarButtonElemId = 'startbar_application_' + iframeElemId;

            let querySelectBtn = '[id=' + startBarButtonElemId + ']';
            let foundStartBarButton = this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.querySelector(querySelectBtn);
            if (foundStartBarButton) {
              let currentInnerHtml = document.querySelector(querySelectBtn).querySelector('div').querySelector('span').innerHTML;
              let currentInnerText = document.querySelector(querySelectBtn).querySelector('div').querySelector('span').innerText;

              let newInnerHtml = currentInnerHtml.replace(currentInnerText, 'dog');

              document.querySelector(querySelectBtn).querySelector('div').querySelector('span').innerHTML = newInnerHtml;
              //= document.querySelector('[id=startbar_application_FRAME267787985]').querySelector('div').querySelector('span').innerHTML.replace('Content Editor', 'dog')
            }
          }
        });
    } catch (err) {
      throw (err);
    }
  }


  CallbackNodeChanged(data: any) {
    this.Logger.FuncStart(this.CallbackNodeChanged.name);
    this.Logger.LogAsJsonPretty('data', data);
    this.Logger.FuncEnd(this.CallbackNodeChanged.name);
  }
}