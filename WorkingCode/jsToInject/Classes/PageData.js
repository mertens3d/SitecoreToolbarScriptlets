class PageData {
  constructor(openerWindow) {
    xyyz.debug.FuncStart(this.constructor.name);
    if (openerWindow) {
      this.Opener = {};
      this.Opener.Window = openerWindow;
      this.Opener.Document = openerWindow.document;
    } else {
      xyyz.debug.Error(this.constructor.name, 'No Opener Page');
    }
    this.DebugInfo();
    xyyz.debug.FuncEnd(this.constructor.name);
  }
  CurrentOpenerPageState() {
    xyyz.debug.FuncStart(this.CurrentOpenerPageState.name);
    var toReturn = xyyz.InjectConst.PageType.Unknown;
    if (this.Opener.Window) {
      var currentLoc = xyyz.PageData.Opener.Document.location.href;
      xyyz.debug.Log('currentLoc: ' + currentLoc);

      if (currentLoc.indexOf(xyyz.InjectConst.Url.Login) > -1) {
        toReturn = xyyz.InjectConst.PageType.LoginPage;
      }
      else if (currentLoc.indexOf(xyyz.InjectConst.Url.Desktop) > -1) {
        toReturn = xyyz.InjectConst.PageType.Desktop;
      }
      else if (currentLoc.indexOf(xyyz.InjectConst.Url.ContentEditor) > -1) {
        toReturn = xyyz.InjectConst.PageType.ContentEditor;
      }
      else if (currentLoc.indexOf(xyyz.InjectConst.Url.LaunchPad) > -1) {
        toReturn = xyyz.InjectConst.PageType.Launchpad;
      }
      else {
        toReturn = xyyz.InjectConst.PageType.Unknown;
      }
    }

    xyyz.debug.FuncEnd(this.CurrentOpenerPageState.name + ' ' + toReturn);
    return toReturn;
  }
  DebugInfo() {
    xyyz.debug.FuncStart(this.DebugInfo.name);
    xyyz.debug.Log(this.Opener.Window);
    xyyz.debug.Log(this.Opener.Document);
    xyyz.debug.FuncEnd(this.DebugInfo.name);
  }
}