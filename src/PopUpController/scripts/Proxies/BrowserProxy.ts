import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { IPopUpBrowserProxy } from "../../../Shared/scripts/Interfaces/Proxies/IBrowserProxy";
import { IMessageControllerToContent } from "../../../Shared/scripts/Interfaces/IStateOfController";
import { IMessageContentToController } from "../../../Shared/scripts/Interfaces/IMsgPayload";

export class PopUpBrowserProxy extends LoggableBase implements IPopUpBrowserProxy {
  Url: string;
  private resultTab: browser.tabs.Tab;
  private BrowserTabId: number;

  async Init_BrowserProxy(): Promise<void> {
    try {
      this.Logger.FuncStart(this.Init_BrowserProxy.name);

      await browser.tabs.query({ currentWindow: true, active: true })
        .then((result: browser.tabs.Tab[]) => {
          this.Logger.Log('Tab result received');
          this.resultTab = result[0];
          this.Url = this.resultTab.url;
          this.BrowserTabId = this.resultTab.id;
        })
    }

    catch (err) {
      this.Logger.ErrorAndThrow(this.Init_BrowserProxy.name, err);
    }
    this.Logger.FuncEnd(this.Init_BrowserProxy.name);
  }

  SendMessageAsync_BrowserProxy(message: IMessageControllerToContent): Promise<IMessageContentToController> {
    return new Promise(async ( resolve, reject) => {
      //await browser.tabs.query({ currentWindow: true, active: true })
      //  .then((result: browser.tabs.Tab[]) => { targetTab = result[0]; })
      //  .catch((err) => reject(err));

      //this.Logger.LogVal('Tab Id', targetTab.id);
      browser.tabs.sendMessage(this.BrowserTabId, message)
        .then((response: IMessageContentToController) => resolve(response))
        .catch((err) => reject(this.SendMessageAsync_BrowserProxy.name + ' | ' + JSON.stringify( err)))
    })
  }
}