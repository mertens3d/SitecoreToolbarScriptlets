/// <reference path="../../../../node_modules/web-ext-types/global/index.d.ts" />

import { IPopUpBrowserProxy } from "../../../Shared/scripts/Interfaces/Proxies/IBrowserProxy";
import { IMessageControllerToContent } from "../../../Shared/scripts/Interfaces/IMessageControllerToContent";
import { IMessageContentToController } from "../../../Shared/scripts/Interfaces/IMessageContentToController";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { _BaseBrowserProxy } from "../../../Content/scripts/Proxies/_BaseBrowserProxy";

export class PopUpBrowserProxy extends _BaseBrowserProxy implements IPopUpBrowserProxy {
  Url: string;
  private BrowserTabId: number;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
  }

  async Init_BrowserProxyAsyncElements(): Promise<void> {
    try {
      this.Logger.FuncStart(this.Init_BrowserProxyAsyncElements.name);

      await this.SetActiveBrowserTab()
        .then(() => {
          this.Url = this.ActiveBrowserTabProxy.url();
          this.BrowserTabId = this.ActiveBrowserTabProxy.Id();
        });
    }
    catch (err) {
      this.ErrorHand.ErrorAndThrow(this.Init_BrowserProxyAsyncElements.name, err);
    }
    this.Logger.FuncEnd(this.Init_BrowserProxyAsyncElements.name);
  }

  SendMessageAsync_BrowserProxy(message: IMessageControllerToContent): Promise<IMessageContentToController> {
    return new Promise(async (resolve, reject) => {
      browser.tabs.sendMessage(this.BrowserTabId, message)
        .then((response: IMessageContentToController) => resolve(response))
        .catch((err) => reject(this.SendMessageAsync_BrowserProxy.name + ' | ' + JSON.stringify(err)));
    });
  }
}