import { PopUpManagerBase } from './PopUpManagerBase';
import { PromiseResult } from "../../../Shared/scripts/Classes/PromiseResult";
import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { AbsoluteUrl } from '../../../Shared/scripts/Interfaces/AbsoluteUrl';
export class BrowserManager extends PopUpManagerBase {

  async CreateNewTab(tabUrl: AbsoluteUrl) {
    return new Promise(async (resolve, reject) => {
      this.Log().FuncStart(this.CreateNewTab.name, tabUrl.AbsUrl);

      let result: PromiseResult = new PromiseResult(this.CreateNewTab.name, this.Log());

      let newTab: IDataBrowserTab;

      await browser.tabs.create({
        url: tabUrl.AbsUrl
      })
        .then((rawTab: browser.tabs.Tab) => { newTab = this.TabMan().MakeTabData(rawTab) })
        .then(() => { this.Helpers().PromiseHelp.TabWaitForReadyStateCompleteNative(newTab.Tab) })
        .then(() => this.MsgMan().WaitForListeningTab(newTab))
        .then(() => result.MarkSuccessful())
        .catch((ex) => {
          result.MarkFailed(ex);
        });

      if (result.WasSuccessful()) {
        this.Log().FuncEnd(this.CreateNewTab.name, tabUrl.AbsUrl);
        resolve(newTab);
      } else {
        this.Log().FuncEnd(this.CreateNewTab.name, tabUrl.AbsUrl);
        reject(result.RejectMessage);
      }
    })
  }
}