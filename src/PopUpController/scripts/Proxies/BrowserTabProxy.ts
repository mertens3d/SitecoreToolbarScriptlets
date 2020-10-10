/// <reference path="../../../../node_modules/web-ext-types/global/index.d.ts" />

import { _HindeCoreBase } from "../../../Shared/scripts/_HindeCoreBase";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IterationDrone } from "../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";

export class BrowserTabProxy extends _HindeCoreBase {
  private NativeBrowserTab: browser.tabs.Tab;

  constructor(hindeCore: IHindeCore, nativeBrowserTab: browser.tabs.Tab) {
    super(hindeCore);
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
    } catch (err) {
      this.ErrorHand.ErrorAndThrow([BrowserTabProxy.name, this.UpdateAndWaitForComplete.name], err);
    }
  }

  TabWaitForReadyStateCompleteNative(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let iterHelper = new IterationDrone(this.HindeCore, this.TabWaitForReadyStateCompleteNative.name, true);

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