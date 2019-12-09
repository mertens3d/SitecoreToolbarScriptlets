//interface Function {
//  name: string;
//}

class PageData extends ManagerBase {
  WinData: WindowData;

  constructor(window: Window, xyyz: Hub) {
    super(xyyz);
    this.Start();
  }

  Start() {
    this.Xyyz.debug.FuncStartName(this.constructor.name + ' ' + this.Start.name);
    console.log('PageData B');
    if (window.opener) {
      this.WinData = new WindowData(this.Xyyz);

      this.WinData.Opener.Window = window.opener;
      this.WinData.Opener.Document = window.opener.document;
    } else {
      this.Xyyz.debug.Error(this.constructor.name, 'No Opener Page');
    }
    console.log('PageData C');
    this.DebugInfo();
    this.Xyyz.debug.FuncEndName(this.constructor.name);
  }

  GetCurrentPageType() {
    this.Xyyz.debug.FuncStartName(this.GetCurrentPageType.name);
    var toReturn: PageType = PageType.Unknown;
    if (this.WinData && this.WinData.Opener && this.WinData.Opener.Window && this.WinData.Opener.Document) {
      var currentLoc = this.WinData.Opener.Window.location.href;
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
    }

    this.Xyyz.debug.FuncEndName(this.GetCurrentPageType.name + ' ' + toReturn);
    return toReturn;
  }
  DebugInfo() {
    this.Xyyz.debug.FuncStartName(this.DebugInfo.name);
    this.Xyyz.debug.Log(this.WinData.Opener.Window);
    this.Xyyz.debug.Log(this.WinData.Opener.Document);
    this.Xyyz.debug.FuncEndName(this.DebugInfo.name);
  }
}