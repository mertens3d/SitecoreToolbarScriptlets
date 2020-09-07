import { LoggableBase } from '../../Managers/LoggableBase';
import { ContentEditorProxy } from '../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy';

export class CeTabButtonAgent extends LoggableBase {
  private CeProxies: ContentEditorProxy[] = [];

  NotifyNewCeProxy(ceProxy: ContentEditorProxy) {
    if (this.CeProxies.indexOf(ceProxy) < 0) {
      this.CeProxies.push(ceProxy);


      let self = this;
      ceProxy.AddListenerToActiveNodeChange((data) => { self.CallbackNodeChanged(data) });
    }
  }
  CallbackNodeChanged(data: any) {
    console.log('dddddddddddd');
    console.log(JSON.stringify(data));
  }
}