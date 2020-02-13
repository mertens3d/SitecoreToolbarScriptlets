import { PopUpManagerBase } from './PopUpManagerBase';
import { ResultSuccessFail } from '../../../Shared/scripts/Classes/ResultSuccessFail';
import { IterationHelper } from '../../../Shared/scripts/Classes/IterationHelper';
import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
export class BrowserManager extends PopUpManagerBase {
  async CreateNewTab(tabUrl: string) {
    return new Promise(async (resolve, reject) => {
      this.debug().FuncStart(this.CreateNewTab.name, tabUrl);

      let result: ResultSuccessFail = new ResultSuccessFail();

      let newTab: IDataBrowserTab;

      await browser.tabs.create({
        url: tabUrl
      })
        .then((rawTab: browser.tabs.Tab) => { newTab = this.TabMan().MakeTabData(rawTab) })
        .then(() => { this.Helpers().PromiseHelp.TabWaitForReadyStateCompleteNative(newTab.Tab) })
        .then(() => this.MsgMan().WaitForListeningTab(newTab))
        .then(() => result.Succeeded = true)
        .catch((ex) => {
          this.debug().Error(this.CreateNewTab.name, 'fails here ' + ex);
          result.Succeeded = false;
          result.RejectMessage = this.CreateNewTab.name + ' ' + ex.toString();
        });

      if (result.Succeeded) {
        this.debug().FuncEnd(this.CreateNewTab.name, tabUrl);
        resolve(newTab);
      } else {
        this.debug().FuncEnd(this.CreateNewTab.name, tabUrl);
        reject(result.RejectMessage);
      }
    })
  }
}