﻿import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';

export class TabManager extends PopUpManagerBase {
  CurrentTabData: IDataBrowserTab;

  constructor(hub: PopUpHub) {
    super(hub);
    hub.Log.FuncStart(TabManager.name);
    hub.Log.FuncEnd(TabManager.name);
  }

  MakeTabData(rawTab: browser.tabs.Tab): IDataBrowserTab {
    let toReturn: IDataBrowserTab = {
      Tab: rawTab,
      UrlParts: this.Helpers().UrlHelp.MakeUrlParts({ AbsUrl: rawTab.url }),
    }

    return toReturn;
  }

  async Init() {
    this.Log().FuncStart(TabManager.name, this.Init.name);

    await this.GetAssociatedTab()
      .then((tabData: IDataBrowserTab) => {
        this.CurrentTabData = tabData;
        this.CurrentTabData.UrlParts = this.Helpers().UrlHelp.MakeUrlParts({ AbsUrl: tabData.Tab.url });
      }

      );

    //.then((tab: IDataBrowserTab) => this.CurrentTabData = this.SetWindowDataToCurrent(tab, 'tab from init'));

    this.Log().DebugIDataBrowserTab(this.CurrentTabData);

    this.Log().FuncEnd(TabManager.name, this.Init.name);
  }

  async GetAssociatedTab() {
    return new Promise(async (resolve, reject) => {
      this.Log().FuncStart(this.GetAssociatedTab.name);
      var toReturn: IDataBrowserTab;

      await browser.tabs.query({ currentWindow: true, active: true })
        .then(async (tabs) => {
          toReturn = {
            Tab: tabs[0],
            UrlParts: this.Helpers().UrlHelp.MakeUrlParts({ AbsUrl: tabs[0].url })
          }

          this.Log().DebugIDataBrowserTab(toReturn);

          this.Log().FuncEnd(this.GetAssociatedTab.name);
          resolve(toReturn);
        })
        .catch((err) => reject(err));
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