import { PopUpManagerBase } from '../PopUpManagerBase';
import { IDataBrowserTab } from '../../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { AbsoluteUrl } from '../../../../Shared/scripts/Interfaces/AbsoluteUrl';
export class BrowserManager extends PopUpManagerBase {

  async CreateNewTab(tabUrl: AbsoluteUrl) {
    return new Promise <IDataBrowserTab>(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.CreateNewTab.name, tabUrl.AbsUrl);

      //let result: PromiseResult = new PromiseResult(this.CreateNewTab.name, this.AllAgents.Logger);

      //let newTab: IDataBrowserTab;

      //this.UiMan().MessageFeedbackModule.UpdateMsgStatusStack('Opening new tab');

      await browser.tabs.create({ url: tabUrl.AbsUrl })
        .then(() => resolve())
        .catch((err) => reject(err));

        //.then((rawTab: browser.tabs.Tab) => { newTab = this.TabMan().MakeTabData(rawTab) })
        //.then(() => {
        //  this.UiMan().MessageFeedbackModule.UpdateMsgStatusStack('Waiting for Tab Ready State ');
        //  this.AllAgents.HelperAgent.PromisesBasic.TabWaitForReadyStateCompleteNative(newTab.Tab)
        //})
        //.then(() => {
        //  this.UiMan().MessageFeedbackModule.UpdateMsgStatusStack('Waiting for Tab Listening ');
        //  this.MsgMan().WaitForListeningTab(newTab);
        //})
        //.then(() => result.MarkSuccessful())
        //.catch((ex) => {
        //  result.MarkFailed(ex);
        //});

      //if (result.WasSuccessful()) {
      //  this.AllAgents.Logger.FuncEnd(this.CreateNewTab.name, tabUrl.AbsUrl);
      //  resolve(newTab);
      //} else {
      //  this.AllAgents.Logger.FuncEnd(this.CreateNewTab.name, tabUrl.AbsUrl);
      //  reject(result.RejectReasons);
      //}
    })
  }


}