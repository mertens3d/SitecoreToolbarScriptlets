import { PopUpManagerBase } from './PopUpManagerBase';
import { ResultSuccessFail } from '../../../Shared/scripts/Classes/ResultSuccessFail';
import { IterationHelper } from '../../../Shared/scripts/Classes/IterationHelper';
export class BrowserManager extends PopUpManagerBase {

  WaitForTabReady(tab: browser.tabs.Tab) {
    return new Promise(async (resolve, reject) => {
      let iterHelper = new IterationHelper(this.Helpers(), this.WaitForTabReady.name);
      let success: ResultSuccessFail = new ResultSuccessFail();

      while (tab.status !== 'complete' && iterHelper.DecrementAndKeepGoing()) {
        this.debug().LogVal('tab status', tab.status);
        await iterHelper.Wait;
      }

      if (tab.status === 'complete') {
        success.Succeeded = true;

      } else {
        success.Succeeded = false;
        if (iterHelper.IsExhausted) {
          success.FailMessage = iterHelper.IsExhaustedMsg;

        }
      }

      if (success.Succeeded) {
        resolve()
      } else {
        reject(success.FailMessage);
      }
    });
  }

  async CreateNewTab(tabUrl: string) {
    return new Promise(async (resolve, reject) => {
      let success: ResultSuccessFail = new ResultSuccessFail();

      await browser.tabs.create({
        url: tabUrl
      })
        .then((tab) => this.WaitForTabReady(tab))
        .then(() => this.MsgMan().WaitForListeningTab())
        
        .catch((ex) => {
          this.debug().Error(this.CreateNewTab.name, 'fails here ' + ex);

          success.Succeeded = false;
          success.FailMessage = this.CreateNewTab.name + ' ' + ex.toString();
        });
    })
  }
}