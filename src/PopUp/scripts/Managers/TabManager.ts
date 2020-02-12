import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';

export class TabManager extends PopUpManagerBase {
  CurrentTabData: IDataBrowserTab;

  constructor(hub: PopUpHub) {
    super(hub);
    hub.debug.FuncStart(TabManager.name);
    hub.debug.FuncEnd(TabManager.name);
  }

  async Init() {

    await this.GetAssociatedTab()
      .then((tab: browser.tabs.Tab) => this.CurrentTabData = this.SetWindowDataToCurrent(tab, 'tab from init'));

  }

  async GetAssociatedTab() {
    return new Promise(async (resolve, reject) => {
      await browser.tabs.query({ currentWindow: true, active: true })
        .then((tabs) => {
          var curTab: browser.tabs.Tab = tabs[0];
          resolve(curTab);
        })
        .catch((err) => reject(err));
    });
  }

  private __urlVsRegex(regexPattern: RegExp, url: string) {
    return new RegExp(regexPattern).test(url);
  }

  SetWindowDataToCurrent(tab: browser.tabs.Tab, nickname: string): IDataBrowserTab {
    var toReturn: IDataBrowserTab = {
      Friendly: 'New Tab',
      Tab: tab,
      //Window: window,
      ScWindowType: scWindowType.Unknown,
      //DataDocSelf: {
      //  ParentDoc: null,
      //  Document: window.document,
      //  HasParentDesktop: false,
      //  DocId: this.Helpers().GuidHelp.NewGuid(),
      //  IsCEDoc: false,
      //  ParentDesktop: null,
      //  Nickname: nickname
      //},
    };
    //toReturn.DataDocSelf.ParentDoc = toReturn.DataDocSelf;
    return toReturn;
  }
  private async __getNewTargetWindowAsync(newWindowUrl: string): Promise<IDataBrowserTab> {
    return new Promise((resolve) => {
      this.debug().FuncStart(this.__getNewTargetWindowAsync.name);
      //var newWindowUrl = this.PageMan().__winDataParent.Window.location.href;
      this.debug().LogVal('newWindowUrl', newWindowUrl);
      var newWindow: Window = <Window>this.CurrentTabData.Window.open(newWindowUrl);
      var self = this;
      newWindow.addEventListener('load', () => {
        var toReturn: IDataBrowserTab = self.SetWindowDataToCurrent(newWindow, 'newly spawned window');
        resolve(toReturn);
      });
      this.debug().FuncEnd(this.__getNewTargetWindowAsync.name);
    });
  }
  private __getUrlForWindowType(windowType: scWindowType): string {
    var toReturn: string;
    //this.debug().NotNullCheck('this.__winDataParent.DataDocSelf.Document', this.CurrentTabData.DataDocSelf.Document);
    var hostName = '';//this.CurrentTabData.Tab.url;// this.CurrentTabData.DataDocSelf.Document.location.origin;
    switch (windowType) {
      case scWindowType.ContentEditor:
        toReturn = hostName + this.Const().UrlSuffix.CE;
        break;
      case scWindowType.Desktop:
        toReturn = hostName + this.Const().UrlSuffix.Desktop;
        break;
      case scWindowType.Edit:
        toReturn = hostName + this.Const().UrlSuffix.None;
        break;
      case scWindowType.Preview:
        toReturn = hostName + this.Const().UrlSuffix.None;
        break;
      case scWindowType.Normal:
        toReturn = hostName + this.Const().UrlSuffix.None;
        break;
      default:
        toReturn = hostName;
        this.debug().Error(this.__getUrlForWindowType.name, 'unaccounted for window type');
        break;
    }
    return toReturn;
  }
  async GetTargetWindowAsync(useOrigWindow: boolean, windowType: scWindowType): Promise<IDataBrowserTab> {
    this.debug().FuncStart(this.GetTargetWindowAsync.name);
    useOrigWindow = true;
    var targetTab: IDataBrowserTab;
    if (useOrigWindow) {
      this.debug().Log('target window is self');
      targetTab = this.CurrentTabData;
    }
    else {
      this.debug().Log('target window is new');
      let newWindowUrl = this.__getUrlForWindowType(windowType);
      await this.__getNewTargetWindowAsync(newWindowUrl)
        .then((data) => targetTab = data);
    }
    this.debug().FuncEnd(this.GetTargetWindowAsync.name);//, 'child window id: ' + targetTab.DataDocSelf.DocId.AsShort);
    return targetTab;
  }
  async CalcPageType(): Promise<scWindowType> {
    this.debug().FuncStart(this.CalcPageType.name);
    var toReturn: scWindowType = scWindowType.Unknown;
    let currentLocHref = this.TabMan().CurrentTabData.Tab.url;
    this.debug().LogVal('current url', currentLocHref);
    if (currentLocHref.indexOf(this.Const().UrlSuffix.Login) > -1) {
      toReturn = scWindowType.LoginPage;
    }
    else if (new RegExp(this.Const().Regex.ContentEditor).test(currentLocHref)) {
      toReturn = scWindowType.ContentEditor;
    }
    else if (currentLocHref.toLowerCase().indexOf(this.Const().UrlSuffix.LaunchPad.toLowerCase()) > -1) {
      toReturn = scWindowType.Launchpad;
    }
    else if (this.__urlVsRegex(this.Const().Regex.PageType.Desktop, currentLocHref)) {
      toReturn = scWindowType.Desktop;
    }
    else if (this.__urlVsRegex(this.Const().Regex.PageType.Preview, currentLocHref)) {
      toReturn = scWindowType.Preview;
    }
    else if (this.__urlVsRegex(this.Const().Regex.PageType.Edit, currentLocHref)) {
      toReturn = scWindowType.Edit;
    }
    else if (this.__urlVsRegex(this.Const().Regex.PageType.Normal, currentLocHref)) {
      toReturn = scWindowType.Normal;
    }
    else {
      toReturn = scWindowType.Unknown;
    }
    this.debug().FuncEnd(this.CalcPageType.name, scWindowType[toReturn]);
    return toReturn;
  }
  async GetCurrentPageType(): Promise<scWindowType> {
    this.debug().FuncStart(this.GetCurrentPageType.name);
    var toReturn: scWindowType = scWindowType.Unknown;
    //if (this.__winDataParent && this.__winDataParent && this.__winDataParent.Window && this.__winDataParent.DataDocSelf) {
    await this.CalcPageType()
      .then((result) => toReturn = result);
    //}
    this.debug().FuncEnd(this.GetCurrentPageType.name + ' (' + toReturn + ') ' + scWindowType[toReturn]);
    return toReturn;
  }
}