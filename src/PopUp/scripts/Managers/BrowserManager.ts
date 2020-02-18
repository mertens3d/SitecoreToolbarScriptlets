import { PopUpManagerBase } from './PopUpManagerBase';
import { ResultSuccessFail } from '../../../Shared/scripts/Classes/ResultSuccessFail';
import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { AbsoluteUrl } from '../../../Shared/scripts/Interfaces/AbsoluteUrl';
export class BrowserManager extends PopUpManagerBase {

  async CreateNewTab(tabUrl: AbsoluteUrl) {
    return new Promise(async (resolve, reject) => {
      this.Log().FuncStart(this.CreateNewTab.name, tabUrl.AbsUrl);

      let result: ResultSuccessFail = new ResultSuccessFail();

      let newTab: IDataBrowserTab;

      await browser.tabs.create({
        url: tabUrl.AbsUrl
      })
        .then((rawTab: browser.tabs.Tab) => { newTab = this.TabMan().MakeTabData(rawTab) })
        .then(() => { this.Helpers().PromiseHelp.TabWaitForReadyStateCompleteNative(newTab.Tab) })
        .then(() => this.MsgMan().WaitForListeningTab(newTab))
        .then(() => result.Succeeded = true)
        .catch((ex) => {
          this.Log().Error(this.CreateNewTab.name, 'fails here ' + ex);
          result.Succeeded = false;
          result.RejectMessage = this.CreateNewTab.name + ' ' + ex.toString();
        });

      if (result.Succeeded) {
        this.Log().FuncEnd(this.CreateNewTab.name, tabUrl.AbsUrl);
        resolve(newTab);
      } else {
        this.Log().FuncEnd(this.CreateNewTab.name, tabUrl.AbsUrl);
        reject(result.RejectMessage);
      }
    })
  }
}