//interface Function {
//  name: string;
//}

class PageDataManager extends ManagerBase {
  private __winDataParent: IDataBroswerWindow;
  ChildPage: IDataBroswerWindow;
  SelfWindow: IDataBroswerWindow;

  GetParentWindow(): IDataBroswerWindow {
    return this.__winDataParent;
  }
  OpenNewBrowserWindow(): IDataBroswerWindow {
    this.debug().FuncStart(this.OpenNewBrowserWindow.name);

    var newWindowUrl = this.PageDataMan().__winDataParent.Window.location.href;
    var newWindow: Window = <Window>this.__winDataParent.Window.open(newWindowUrl);
    

    var toReturn: IDataBroswerWindow = {
      Friendly: 'New Tab',
      Window: newWindow,
      WindowType: WindowType.Unknown,
      DataDocSelf: {
        DataWinParent: null,
        Document: newWindow.document,
        HasParentDesktop: false,
        Id: this.GuidMan().NewGuid(),
        IsCEDoc: false,
        ParentDesktop: null
      },

    }

    toReturn.DataDocSelf.DataWinParent = toReturn;

    this.debug().FuncEnd(this.OpenNewBrowserWindow.name + ' : ' + toReturn.DataDocSelf.Id.asString);

    return toReturn;
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
        WindowType: WindowType.Unknown,
        DataDocSelf: {
          DataWinParent: null,
          Document: (<Window>(window.opener)).document,
          HasParentDesktop: false,
          Id: this.GuidMan().NewGuid(),
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

  GetPageTypeOfTargetWindow(targetWindow: Window): WindowType {
    this.debug().FuncStart(this.GetPageTypeOfTargetWindow.name, targetWindow.location.href);
    var toReturn: WindowType;

    var currentLoc = targetWindow.location.href;

    if (currentLoc.indexOf(this.Const().Url.Login) > -1) {
      toReturn = WindowType.LoginPage;
    }
    else if (currentLoc.indexOf(this.Const().Url.Desktop) > -1) {
      toReturn = WindowType.Desktop;
    }
    else if (currentLoc.indexOf(this.Const().Url.ContentEditor) > -1) {
      toReturn = WindowType.ContentEditor;
    }
    else if (currentLoc.indexOf(this.Const().Url.LaunchPad) > -1) {
      toReturn = WindowType.Launchpad;
    }
    else {
      toReturn = WindowType.Unknown;
    }
    this.debug().FuncEnd(this.GetPageTypeOfTargetWindow.name, WindowType[toReturn]);

    return toReturn;
  }

  GetCurrentPageType() {
    this.debug().FuncStart(this.GetCurrentPageType.name);
    var toReturn: WindowType = WindowType.Unknown;
    if (this.__winDataParent && this.__winDataParent && this.__winDataParent.Window && this.__winDataParent.DataDocSelf) {
      return this.GetPageTypeOfTargetWindow(this.__winDataParent.Window);
    }

    this.debug().FuncEnd(this.GetCurrentPageType.name + ' (' + toReturn + ') ' + WindowType[toReturn]);
    return toReturn;
  }
  DebugInfo() {
    this.debug().FuncStart(this.DebugInfo.name);
    this.debug().Log(this.__winDataParent.Window);
    this.debug().Log(this.__winDataParent.DataDocSelf);
    this.debug().FuncEnd(this.DebugInfo.name);
  }
}