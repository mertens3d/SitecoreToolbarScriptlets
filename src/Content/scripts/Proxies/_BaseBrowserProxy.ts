/// <reference path="../../../../node_modules/web-ext-types/global/index.d.ts" />

import { BrowserTabProxy } from "../../../PopUpController/scripts/Proxies/BrowserTabProxy";
import { IBaseBrowserProxy } from "../../../Shared/scripts/Interfaces/Agents/IBaseBrowserProxy";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { _HindeCoreBase } from "../../../Shared/scripts/_HindeCoreBase";

export abstract class _BaseBrowserProxy extends _HindeCoreBase implements IBaseBrowserProxy {
 public ActiveBrowserTabProxy: BrowserTabProxy = null;

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);

  }

  async UpdateAndWaitForComplete(browserTabProxy: BrowserTabProxy, AbsUrl: string): Promise<void> {
    try {
      await browserTabProxy.UpdateAndWaitForComplete(AbsUrl)
      
        .catch((err) => this.ErrorHand.ErrorAndThrow([_BaseBrowserProxy.name, this.UpdateAndWaitForComplete.name], err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow([_BaseBrowserProxy.name, this.UpdateAndWaitForComplete.name], err);
    }
  }

  protected async SetActiveBrowserTab(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await browser.tabs.query({ currentWindow: true, active: true })
        .then((result: browser.tabs.Tab[]) => {
          this.Logger.Log('Tab result received');
          let resultTab = result[0];
          this.ActiveBrowserTabProxy = new BrowserTabProxy(this.HindeCore, resultTab);
        })
        .then(() => resolve())
        .catch((err) => reject(this.ErrorHand.FormatejectMessage([_BaseBrowserProxy.name, this.SetActiveBrowserTab.name], err)));
    });
  }
}