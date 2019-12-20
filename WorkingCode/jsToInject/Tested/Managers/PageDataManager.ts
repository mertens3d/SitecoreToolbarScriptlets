//interface Function {
//  name: string;
//}

class PageDataManager extends ManagerBase {
  async GetTargetWindowAsync(useSelf: boolean, windowType: scWindowType): Promise<IDataBroswerWindow> {
    this.debug().FuncStart(this.GetTargetWindowAsync.name);
    var targetWindow: IDataBroswerWindow;

    if (useSelf) {
      this.debug().Log('target window is self');
      targetWindow = this.GetParentWindow();
    } else {
      this.debug().Log('target window is new');

      let newWindowUrl = this.GetUrlForWindowType(windowType)

      await this.__getNewTargetWindowAsync(newWindowUrl)
        .then((data) => targetWindow = data);
    }

    this.debug().FuncEnd(this.GetTargetWindowAsync.name, 'child window id: ' + targetWindow.DataDocSelf.XyyzId.asShort);

    return targetWindow;
  }

  private async __getNewTargetWindowAsync(newWindowUrl: string): Promise<IDataBroswerWindow> {
    return new Promise((resolve) => {
      this.debug().FuncStart(this.__getNewTargetWindowAsync.name);

      //var newWindowUrl = this.PageDataMan().__winDataParent.Window.location.href;
      this.debug().LogVal('newWindowUrl', newWindowUrl);

      var newWindow: Window = <Window>this.__winDataParent.Window.open(newWindowUrl);
      var self = this;
      newWindow.addEventListener('load', () => {
        var toReturn: IDataBroswerWindow = self.SetWindowDataToCurrent(newWindow);
        resolve(toReturn);
      });
      this.debug().FuncEnd(this.__getNewTargetWindowAsync.name);
    });
  }
  SetWindowDataToCurrent(window: Window): IDataBroswerWindow {
    var toReturn: IDataBroswerWindow = {
      Friendly: 'New Tab',
      Window: window,
      WindowType: scWindowType.Unknown,
      DataDocSelf: {
        DataWinParent: null,
        Document: window.document,
        HasParentDesktop: false,
        XyyzId: this.GuidMan().NewGuid(),
        IsCEDoc: false,
        ParentDesktop: null
      },
    }

    toReturn.DataDocSelf.DataWinParent = toReturn;
    return toReturn;
  }

  private __winDataParent: IDataBroswerWindow;
  ChildPage: IDataBroswerWindow;
  SelfWindow: IDataBroswerWindow;

  GetParentWindow(): IDataBroswerWindow {
    return this.__winDataParent;
  }

  constructor(xyyz: Hub) {
    super(xyyz);
    this.debug().CtorName(this.constructor.name);
  }

  Init() {
    this.debug().FuncStart(this.Init.name);

    if (window.opener) {
      this.__winDataParent = {
        Window: window.opener,
        Friendly: 'Parent Window',
        WindowType: scWindowType.Unknown,
        DataDocSelf: {
          DataWinParent: null,
          Document: (<Window>(window.opener)).document,
          HasParentDesktop: false,
          XyyzId: this.GuidMan().NewGuid(),
          IsCEDoc: false,
          ParentDesktop: null,
        }
      }

      this.__winDataParent.DataDocSelf.DataWinParent = this.__winDataParent
    } else {
      this.debug().Error(this.constructor.name, 'No Opener Page');
    }

    this.UiMan().SetParentInfo(this.__winDataParent);
    console.log('PageData C');
    this.DebugInfo();
    this.debug().FuncEnd(this.Init.name);
  }

  GetPageTypeOfTargetWindow(targetWindow: Window): scWindowType {
    this.debug().FuncStart(this.GetPageTypeOfTargetWindow.name, targetWindow.location.href);
    var toReturn: scWindowType;

    var currentLoc = targetWindow.location.href;

    if (currentLoc.indexOf(this.Const().UrlSuffix.Login) > -1) {
      toReturn = scWindowType.LoginPage;
    }
    else if (currentLoc.toLowerCase().indexOf(this.Const().UrlSuffix.Desktop.toLowerCase()) > -1) {
      this.debug().Log('Testing for Desktop editor');
      this.debug().Log('currentLoc.toLowerCase()' + currentLoc.toLowerCase());
      this.debug().Log('this.Const().Url.Desktop.toLowerCase()' + this.Const().UrlSuffix.Desktop.toLowerCase());
      toReturn = scWindowType.Desktop;
    }
    else if (new RegExp(this.Const().Regex.ContentEditor).test(currentLoc)) {
      toReturn = scWindowType.ContentEditor;
    }
    else if (currentLoc.toLowerCase().indexOf(this.Const().UrlSuffix.LaunchPad.toLowerCase()) > -1) {
      toReturn = scWindowType.Launchpad;
    }
    else {
      toReturn = scWindowType.Unknown;
    }
    this.debug().FuncEnd(this.GetPageTypeOfTargetWindow.name, scWindowType[toReturn]);

    return toReturn;
  }

  GetUrlForWindowType(windowType: scWindowType): string {
    var toReturn: string;
    var hostName = this.__winDataParent.DataDocSelf.Document.location.origin;

    switch (windowType) {
      case scWindowType.ContentEditor:
        toReturn = hostName + this.Const().UrlSuffix.CE;
        break;
      case scWindowType.Desktop:
        toReturn = hostName + this.Const().UrlSuffix.Desktop;
        break;
      default:
        toReturn = hostName;
        this.debug().Error(this.GetUrlForWindowType.name, 'unaccounted for window type');
        break;
    }

    return toReturn;
  }

  GetCurrentPageType() {
    this.debug().FuncStart(this.GetCurrentPageType.name);
    var toReturn: scWindowType = scWindowType.Unknown;

    if (this.__winDataParent && this.__winDataParent && this.__winDataParent.Window && this.__winDataParent.DataDocSelf) {
      toReturn = this.GetPageTypeOfTargetWindow(this.__winDataParent.Window);
    }

    this.debug().FuncEnd(this.GetCurrentPageType.name + ' (' + toReturn + ') ' + scWindowType[toReturn]);
    return toReturn;
  }
  DebugInfo() {
    this.debug().FuncStart(this.DebugInfo.name);
    this.debug().Log(this.__winDataParent.Window);
    this.debug().Log(this.__winDataParent.DataDocSelf);
    this.debug().FuncEnd(this.DebugInfo.name);
  }
}