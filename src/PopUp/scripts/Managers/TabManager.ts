import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { IDataBrowserTab } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { SharedConst } from '../../../Shared/scripts/SharedConst';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';

export class TabManager extends PopUpManagerBase {
  
  CurrentTabData: IDataBrowserTab;

  constructor(hub: PopUpHub) {
    super(hub);
    hub.debug.FuncStart(TabManager.name);
    hub.debug.FuncEnd(TabManager.name);
  }

  MakeTabData(rawTab: browser.tabs.Tab): IDataBrowserTab {

    let toReturn: IDataBrowserTab = {
      ScWindowType: scWindowType.Unknown,
      Tab: rawTab,
      UrlParts: {
        FullUrl: '',
        Hostname: '',
        QueryString: ''
      }
    }

    return toReturn;

  }

  async Init() {
    this.debug().FuncStart(TabManager.name, this.Init.name);

    await this.GetAssociatedTab()
      .then((tabData: IDataBrowserTab) => {


        this.CurrentTabData = tabData;
        this.CurrentTabData.UrlParts = StaticHelpers.MakeUrlParts(tabData.Tab.url);
      }


    );
    
      //.then((tab: IDataBrowserTab) => this.CurrentTabData = this.SetWindowDataToCurrent(tab, 'tab from init'));

    this.debug().DebugIDataBrowserTab(this.CurrentTabData);

    this.debug().FuncEnd(TabManager.name, this.Init.name);
  }

  async GetAssociatedTab() {
    return new Promise(async (resolve, reject) => {
      this.debug().FuncStart(this.GetAssociatedTab.name);
      var toReturn: IDataBrowserTab;

      await browser.tabs.query({ currentWindow: true, active: true })
        .then(async (tabs) => {
           toReturn = {
            ScWindowType: scWindowType.Unknown,
             Tab: tabs[0],
             UrlParts: StaticHelpers.MakeUrlParts(tabs[0].url)
          }

          toReturn.ScWindowType = this.Helpers().UtilityHelp.CalcPageTypeFromHref(toReturn.Tab.url);

          this.debug().DebugIDataBrowserTab(toReturn);

          this.debug().FuncEnd(this.GetAssociatedTab.name);
          resolve(toReturn);
        })
        .catch((err) => reject(err));
    });
  }



  SetWindowDataToCurrent(tab: browser.tabs.Tab, nickname: string): IDataBrowserTab {
    var toReturn: IDataBrowserTab = {
      Tab: tab,
      //Window: window,
      ScWindowType: scWindowType.Unknown,
      UrlParts: {
        FullUrl: '',
        Hostname: '',
        QueryString:''
      }
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


  private __getUrlForWindowType(windowType: scWindowType): string {
    var toReturn: string;
    //this.debug().NotNullCheck('this.__winDataParent.DataDocSelf.Document', this.CurrentTabData.DataDocSelf.Document);
    var hostName = '';//this.CurrentTabData.Tab.url;// this.CurrentTabData.DataDocSelf.Document.location.origin;
    switch (windowType) {
      case scWindowType.ContentEditor:
        toReturn = hostName + SharedConst.SharedConst.UrlSuffix.CE;
        break;
      case scWindowType.Desktop:
        toReturn = hostName + SharedConst.SharedConst.UrlSuffix.Desktop;
        break;
      case scWindowType.Edit:
        toReturn = hostName + SharedConst.SharedConst.UrlSuffix.None;
        break;
      case scWindowType.Preview:
        toReturn = hostName + SharedConst.SharedConst.UrlSuffix.None;
        break;
      case scWindowType.Normal:
        toReturn = hostName + SharedConst.SharedConst.UrlSuffix.None;
        break;
      default:
        toReturn = hostName;
        this.debug().Error(this.__getUrlForWindowType.name, 'unaccounted for window type');
        break;
    }
    return toReturn;
  }

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