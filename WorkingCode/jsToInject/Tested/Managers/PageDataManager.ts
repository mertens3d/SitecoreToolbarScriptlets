﻿//interface Function {
//  name: string;
//}

class PageDataManager extends ManagerBase {


  SetWindowDataToCurrent(window: Window): IDataBroswerWindow{

    var toReturn: IDataBroswerWindow = {
      Friendly: 'New Tab',
      Window: window,
      WindowType: WindowType.Unknown,
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
  OpenNewBrowserWindow(): IDataBroswerWindow {
    this.debug().FuncStart(this.OpenNewBrowserWindow.name);

    var newWindowUrl = this.PageDataMan().__winDataParent.Window.location.href;
    var newWindow: Window = <Window>this.__winDataParent.Window.open(newWindowUrl);
    

    var toReturn = this.SetWindowDataToCurrent(newWindow)

    this.debug().FuncEnd(this.OpenNewBrowserWindow.name + ' : ' + toReturn.DataDocSelf.XyyzId.asString);

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
    else if (currentLoc.toLowerCase().indexOf(this.Const().Url.LaunchPad.toLowerCase()) > -1) {
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
      toReturn = this.GetPageTypeOfTargetWindow(this.__winDataParent.Window);
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