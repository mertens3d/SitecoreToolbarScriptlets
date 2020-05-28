import { PopUpManagerBase } from './PopUpManagerBase';
import { PromiseResult } from "../../../Shared/scripts/Classes/PromiseResult";
import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { AbsoluteUrl } from '../../../Shared/scripts/Interfaces/AbsoluteUrl';
export class BrowserManager extends PopUpManagerBase {

  async CreateNewTab(tabUrl: AbsoluteUrl) {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.CreateNewTab.name, tabUrl.AbsUrl);

      let result: PromiseResult = new PromiseResult(this.CreateNewTab.name, this.AllAgents.Logger);

      let newTab: IDataBrowserTab;

      this.UiMan().UpdateMsgStatusStack('Opening new tab');

      await browser.tabs.create({
        url: tabUrl.AbsUrl
      })
        .then((rawTab: browser.tabs.Tab) => { newTab = this.TabMan().MakeTabData(rawTab) })
        .then(() => {
          this.UiMan().UpdateMsgStatusStack('Waiting for Tab Ready State ');
          this.Helpers().PromiseHelp.TabWaitForReadyStateCompleteNative(newTab.Tab)
        })
        .then(() => {
          this.UiMan().UpdateMsgStatusStack('Waiting for Tab Listening ');
          this.MsgMan().WaitForListeningTab(newTab);
        })
        .then(() => result.MarkSuccessful())
        .catch((ex) => {
          result.MarkFailed(ex);
        });

      if (result.WasSuccessful()) {
        this.AllAgents.Logger.FuncEnd(this.CreateNewTab.name, tabUrl.AbsUrl);
        resolve(newTab);
      } else {
        this.AllAgents.Logger.FuncEnd(this.CreateNewTab.name, tabUrl.AbsUrl);
        reject(result.RejectReasons);
      }
    })
  }
}