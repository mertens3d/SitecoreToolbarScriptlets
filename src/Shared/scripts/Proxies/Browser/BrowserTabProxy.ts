/// <reference path="../../../../../node_modules/web-ext-types/global/index.d.ts" />

import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { IterationDrone } from "../../Agents/Drones/IterationDrone/IterationDrone";
import { _CommonBase } from "../../_CommonCoreBase";

export class BrowserTabProxy extends _CommonBase {
  private NativeBrowserTab: browser.tabs.Tab;

  constructor(commonCore: ICommonCore, nativeBrowserTab: browser.tabs.Tab) {
    super(commonCore);
    this.NativeBrowserTab = nativeBrowserTab;
  }

  Id(): number {
    return this.NativeBrowserTab.id;
  }

  url(): string {
    return this.NativeBrowserTab.url;
  }

  async UpdateAndWaitForComplete(AbsUrl: string): Promise<void> {
    try {
      browser.tabs.update(this.NativeBrowserTab.id, { url: AbsUrl })

        .then(() => this.TabWaitForReadyStateCompleteNative())
    } catch (err: any) {
      this.ErrorHand.HandleFatalError([BrowserTabProxy.name, this.UpdateAndWaitForComplete.name], err);
    }
  }

  TabWaitForReadyStateCompleteNative(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let iterHelper = new IterationDrone(this.CommonCore, this.TabWaitForReadyStateCompleteNative.name, true);

      while (this.NativeBrowserTab.status !== 'complete' && iterHelper.DecrementAndKeepGoing()) {
        this.Logger.LogVal('tab status', this.NativeBrowserTab.status);
        await iterHelper.Wait;
      }

      if (this.NativeBrowserTab.status === 'complete') {
        resolve();
      }
      else {
        if (iterHelper.IsExhausted) {
          reject(iterHelper.IsExhaustedMsg);
        }
        else {
          reject('unknown reason');
        }
      }
    });
  }
}