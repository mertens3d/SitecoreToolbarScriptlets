import { PopUpManagerBase } from './PopUpManagerBase';
import { PopUpHub } from './PopUpHub';
import { LocationManager } from './LocationManager';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { IDataBrowserWindow } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';

export class PageManagerPopUp extends PopUpManagerBase {
  private __winDataParent: IDataBrowserWindow;

  constructor(hub: PopUpHub) {
    super(hub);
    hub.debug.FuncStart(LocationManager.name);
    hub.debug.FuncEnd(LocationManager.name);
  }

  private __urlVsRegex(regexPattern: RegExp, url: string) {
    return new RegExp(regexPattern).test(url);
  }

  SetWindowDataToCurrent(window: Window, nickname: string): IDataBrowserWindow {
    var toReturn: IDataBrowserWindow = {
      Friendly: 'New Tab',
      Window: window,
      WindowType: scWindowType.Unknown,
      DataDocSelf: {
        ParentDoc: null,
        Document: window.document,
        HasParentDesktop: false,
        DocId: this.Helpers().GuidHelp. NewGuid(),
        IsCEDoc: false,
        ParentDesktop: null,
        Nickname: nickname
      },
    }

    toReturn.DataDocSelf.ParentDoc = toReturn.DataDocSelf;
    return toReturn;
  }
  private async __getNewTargetWindowAsync(newWindowUrl: string): Promise<IDataBrowserWindow> {
    return new Promise((resolve) => {
      this.debug().FuncStart(this.__getNewTargetWindowAsync.name);

      //var newWindowUrl = this.PageMan().__winDataParent.Window.location.href;
      this.debug().LogVal('newWindowUrl', newWindowUrl);

      var newWindow: Window = <Window>this.__winDataParent.Window.open(newWindowUrl);
      var self = this;
      newWindow.addEventListener('load', () => {
        var toReturn: IDataBrowserWindow = self.SetWindowDataToCurrent(newWindow, 'newly spawned window');
        resolve(toReturn);
      });
      this.debug().FuncEnd(this.__getNewTargetWindowAsync.name);
    });
  }
  private __getUrlForWindowType(windowType: scWindowType): string {
    var toReturn: string;

    this.debug().NotNullCheck('this.__winDataParent.DataDocSelf.Document', this.__winDataParent.DataDocSelf.Document);

    var hostName = this.__winDataParent.DataDocSelf.Document.location.origin;

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

  TopLevelWindow(): IDataBrowserWindow {
    return this.__winDataParent;
  }

  async GetTargetWindowAsync(useOrigWindow: boolean, windowType: scWindowType): Promise<IDataBrowserWindow> {
    this.debug().FuncStart(this.GetTargetWindowAsync.name);
    useOrigWindow = true;

    var targetWindow: IDataBrowserWindow;

    if (useOrigWindow) {
      this.debug().Log('target window is self');
      targetWindow = this.TopLevelWindow();
    } else {
      this.debug().Log('target window is new');

      let newWindowUrl = this.__getUrlForWindowType(windowType)

      await this.__getNewTargetWindowAsync(newWindowUrl)
        .then((data) => targetWindow = data);
    }

    this.debug().FuncEnd(this.GetTargetWindowAsync.name, 'child window id: ' + targetWindow.DataDocSelf.DocId.AsShort);

    return targetWindow;
  }
  GetPageTypeOfTargetWindow(targetWindow: Window): scWindowType {
    this.debug().FuncStart(this.GetPageTypeOfTargetWindow.name, targetWindow.location.href);
    var toReturn: scWindowType;

    var currentLoc = targetWindow.location.href;

    if (currentLoc.indexOf(this.Const().UrlSuffix.Login) > -1) {
      toReturn = scWindowType.LoginPage;
    }
    else if (new RegExp(this.Const().Regex.ContentEditor).test(currentLoc)) {
      toReturn = scWindowType.ContentEditor;
    }
    else if (currentLoc.toLowerCase().indexOf(this.Const().UrlSuffix.LaunchPad.toLowerCase()) > -1) {
      toReturn = scWindowType.Launchpad;
    }
    else if (this.__urlVsRegex(this.Const().Regex.PageType.Desktop, currentLoc)) {
      toReturn = scWindowType.Desktop
    }
    else if (this.__urlVsRegex(this.Const().Regex.PageType.Preview, currentLoc)) {
      toReturn = scWindowType.Preview
    }
    else if (this.__urlVsRegex(this.Const().Regex.PageType.Edit, currentLoc)) {
      toReturn = scWindowType.Edit
    }
    else if (this.__urlVsRegex(this.Const().Regex.PageType.Normal, currentLoc)) {
      toReturn = scWindowType.Normal
    }

    else {
      toReturn = scWindowType.Unknown;
    }
    this.debug().FuncEnd(this.GetPageTypeOfTargetWindow.name, scWindowType[toReturn]);

    return toReturn;
  }
  GetCurrentPageType(): scWindowType {
    this.debug().FuncStart(this.GetCurrentPageType.name);
    var toReturn: scWindowType = scWindowType.Unknown;

    if (this.__winDataParent && this.__winDataParent && this.__winDataParent.Window && this.__winDataParent.DataDocSelf) {
      toReturn = this.GetPageTypeOfTargetWindow(this.__winDataParent.Window);
    }

    this.debug().FuncEnd(this.GetCurrentPageType.name + ' (' + toReturn + ') ' + scWindowType[toReturn]);
    return toReturn;
  }
}