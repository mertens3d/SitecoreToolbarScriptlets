//interface Function {
//  name: string;
//}

class PageData extends ManagerBase {
  WinDataParent: WindowData;
  ChildPage: IWindowData;

  constructor(window: Window, xyyz: Hub) {
    super(xyyz);
    this.Start();
  }

  Start() {
    this.Xyyz.debug.FuncStartName(this.constructor.name + ' ' + this.Start.name);
    console.log('PageData B');
    if (window.opener) {
      this.WinDataParent = new WindowData(this.Xyyz);

      this.WinDataParent.Opener.Window = window.opener;
      this.WinDataParent.Opener.Document = window.opener.document;
    } else {
      this.Xyyz.debug.Error(this.constructor.name, 'No Opener Page');
    }
    console.log('PageData C');
    this.DebugInfo();
    this.Xyyz.debug.FuncEndName(this.constructor.name);
  }

  GetPageTypeOfTargetWindow(targetWindow: Window): PageType {
    this.Xyyz.debug.FuncStartName(this.GetPageTypeOfTargetWindow.name);
    var toReturn: PageType;

    var currentLoc = targetWindow.location.href;
    this.Xyyz.debug.Log('currentLoc: ' + currentLoc);

    if (currentLoc.indexOf(this.Xyyz.Const.Url.Login) > -1) {
      toReturn = PageType.LoginPage;
    }
    else if (currentLoc.indexOf(this.Xyyz.Const.Url.Desktop) > -1) {
      toReturn = PageType.Desktop;
    }
    else if (currentLoc.indexOf(this.Xyyz.Const.Url.ContentEditor) > -1) {
      toReturn = PageType.ContentEditor;
    }
    else if (currentLoc.indexOf(this.Xyyz.Const.Url.LaunchPad) > -1) {
      toReturn = PageType.Launchpad;
    }
    else {
      toReturn = PageType.Unknown;
    }
    this.Xyyz.debug.FuncEndName(this.GetPageTypeOfTargetWindow.name);

    return toReturn;
  }

  GetCurrentPageType() {
    this.Xyyz.debug.FuncStartName(this.GetCurrentPageType.name);
    var toReturn: PageType = PageType.Unknown;
    if (this.WinDataParent && this.WinDataParent.Opener && this.WinDataParent.Opener.Window && this.WinDataParent.Opener.Document) {
      return this.GetPageTypeOfTargetWindow(this.WinDataParent.Opener.Window);
    }

    this.Xyyz.debug.FuncEndName(this.GetCurrentPageType.name + ' (' + toReturn + ') ' + PageType[toReturn]);
    return toReturn;
  }
  DebugInfo() {
    this.Xyyz.debug.FuncStartName(this.DebugInfo.name);
    this.Xyyz.debug.Log(this.WinDataParent.Opener.Window);
    this.Xyyz.debug.Log(this.WinDataParent.Opener.Document);
    this.Xyyz.debug.FuncEndName(this.DebugInfo.name);
  }
}