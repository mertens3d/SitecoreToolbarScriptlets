import { IContentBrowserProxy, IBrowserTab } from "../../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";
import { LoggableBase } from "../../../../Shared/scripts/LoggableBase";
import { MsgContentToController } from "../../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { IMessageControllerToContent } from "../../../../Shared/scripts/Interfaces/IStateOfController";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";

export class BrowserTabProxy extends LoggableBase implements IBrowserTab {
  private TargetTab: browser.tabs.tab;

  constructor(logger: ILoggerAgent, targetTab: browser.tabs.tab) {
    super(logger);
    this.TargetTab = targetTab;
  }
  status() {
    return this.TargetTab.status
  }
}

export class ContentBrowserProxy extends LoggableBase implements IContentBrowserProxy {
  BrowserTabsUpdate(absUrl: string): Promise<IBrowserTab> {
    return new Promise((resolve, reject) => {
      let toReturn: IBrowserTab;

      await browser.tabs.query({ currentWindow: true, active: true })
        .then((result: browser.tabs.Tab[]) => {
          let targetTab: browser.tabs.Tab = result[0];
          browser.tabs.update(targetTab.id, { url: absUrl });
          toReturn = new BrowserTabProxy(this.Logger, targetTab);
          resolve(toReturn);
        });

      reject(this.BrowserTabsUpdate.name);
    });
  }

  AddListener(callback: (request: IMessageControllerToContent) => Promise<MsgContentToController>) {
    browser.runtime.onMessage.addListener((request: IMessageControllerToContent) => callback(request));
  }
}