import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IallAgents";

export class TabManager extends PopUpManagerBase {
  CurrentTabData: IDataBrowserTab;

  constructor(hub: PopUpHub, allAgents: IAllAgents) {
    super(hub, allAgents);
    this.AllAgents.Logger.InstantiateStart(TabManager.name);
    this.AllAgents.Logger.InstantiateEnd(TabManager.name);
  }

  MakeTabData(rawTab: browser.tabs.Tab): IDataBrowserTab {
    let toReturn: IDataBrowserTab = {
      Tab: rawTab,
      UrlParts: this.AllAgents.HelperAgent.UrlHelp.MakeUrlParts({ AbsUrl: rawTab.url }),
    }

    return toReturn;
  }

  async InitTabManager() {
    this.AllAgents.Logger.FuncStart(TabManager.name, this.InitTabManager.name);

    await this.GetAssociatedTab()
      .then((tabData: IDataBrowserTab) => {
        this.CurrentTabData = tabData;
        //this.CurrentTabData.UrlParts = this.AllAgents.HelperAgent.UrlHelp.MakeUrlParts({ AbsUrl: tabData.Tab.url });
      }

      );

    this.AllAgents.Logger.FuncEnd(TabManager.name, this.InitTabManager.name);
  }

  async GetAssociatedTab() {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.GetAssociatedTab.name);
      var toReturn: IDataBrowserTab;

      await browser.tabs.query({ currentWindow: true, active: true })
        .then(async (tabs) => {
          toReturn = {
            Tab: tabs[0],
            UrlParts: this.AllAgents.HelperAgent.UrlHelp.MakeUrlParts({ AbsUrl: tabs[0].url })
          }

          this.AllAgents.Logger.LogAsJsonPretty('toReturn', toReturn);

          resolve(toReturn);
        })
        .catch((err) => reject(err));

      this.AllAgents.Logger.FuncEnd(this.GetAssociatedTab.name);
    });
  }

  //todo - put back?
  //private async __getNewTargetWindowAsync(newWindowUrl: string): Promise<IDataBrowserTab> {
  //  return new Promise((resolve) => {
  //    this.debug().FuncStart(this.__getNewTargetWindowAsync.name);
  //    //var newWindowUrl = this.PageMan().__winDataParent.Window.location.href;
  //    this.debug().LogVal('newWindowUrl', newWindowUrl);
  //    var newWindow: Window = <Window>this.CurrentTabData.Window.open(newWindowUrl);
  //    var self = this;
  //    newWindow.addEventListener('load', () => {
  //      var toReturn: IDataBrowserTab = self.SetWindowDataToCurrent(newWindow, 'newly spawned window');
  //      resolve(toReturn);
  //    });
  //    this.debug().FuncEnd(this.__getNewTargetWindowAsync.name);
  //  });
  //}

  //todo - put back?
  //async GetTargetWindowAsync(useOrigWindow: boolean, windowType: scWindowType): Promise<IDataBrowserTab> {
  //  this.debug().FuncStart(this.GetTargetWindowAsync.name);
  //  useOrigWindow = true;
  //  var targetTab: IDataBrowserTab;

  //  if (useOrigWindow) {
  //    this.debug().Log('target window is self');
  //    targetTab = this.CurrentTabData;
  //  }
  //  else {
  //    this.debug().Log('target window is new');
  //    let newWindowUrl = this.__getUrlForWindowType(windowType);
  //    await this.__getNewTargetWindowAsync(newWindowUrl)
  //      .then((data) => targetTab = data);
  //  }

  //  this.debug().FuncEnd(this.GetTargetWindowAsync.name);//, 'child window id: ' + targetTab.DataDocSelf.DocId.AsShort);
  //  return targetTab;
  //}
}