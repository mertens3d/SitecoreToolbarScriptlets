/// <reference path="../../../../../node_modules/web-ext-types/global/index.d.ts" />

import { BrowserTabProxy } from "./BrowserTabProxy";
import { IBaseBrowserProxy } from "../../Interfaces/Agents/IBaseBrowserProxy";
import { _CommonBase } from "../../_CommonCoreBase";
import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";

export class BaseBrowserProxy extends _CommonBase implements IBaseBrowserProxy {
  readonly TypeDiscriminator = TypeDiscriminator.BaseBrowserProxy;

  public ActiveBrowserTabProxy: BrowserTabProxy = null;

  constructor(commonCore: ICommonCore) {
    super(commonCore);
  }

  async UpdateAndWaitForComplete(browserTabProxy: BrowserTabProxy, AbsUrl: string): Promise<void> {
    try {
      await browserTabProxy.UpdateAndWaitForComplete(AbsUrl)

        .catch((err) => this.ErrorHand.ErrorAndThrow([BaseBrowserProxy.name, this.UpdateAndWaitForComplete.name], err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow([BaseBrowserProxy.name, this.UpdateAndWaitForComplete.name], err);
    }
  }

  protected async SetActiveBrowserTab(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await browser.tabs.query({ currentWindow: true, active: true })
        .then((result: browser.tabs.Tab[]) => {
          this.Logger.Log('Tab result received');
          let resultTab = result[0];
          this.ActiveBrowserTabProxy = new BrowserTabProxy(this.CommonCore, resultTab);
        })
        .then(() => resolve())
        .catch((err) => reject(this.ErrorHand.FormatejectMessage([BaseBrowserProxy.name, this.SetActiveBrowserTab.name], err)));
    });
  }
}