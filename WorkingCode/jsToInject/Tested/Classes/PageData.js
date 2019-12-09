//interface Function {
//  name: string;
//}
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PageData = /** @class */ (function (_super) {
    __extends(PageData, _super);
    function PageData(window, xyyz) {
        var _this = _super.call(this, xyyz) || this;
        _this.Start();
        return _this;
    }
    PageData.prototype.Start = function () {
        this.Xyyz.debug.FuncStart(this.constructor.name + ' ' + this.Start.name);
        console.log('PageData B');
        if (window.opener) {
            this.WinData = new WindowData(this.Xyyz);
            this.WinData.Opener.Window = window.opener;
            this.WinData.Opener.Document = window.opener.document;
        }
        else {
            this.Xyyz.debug.Error(this.constructor.name, 'No Opener Page');
        }
        console.log('PageData C');
        this.DebugInfo();
        this.Xyyz.debug.FuncEnd(this.constructor.name);
    };
    PageData.prototype.CurrentOpenerPageState = function () {
        this.Xyyz.debug.FuncStart(this.CurrentOpenerPageState.name);
        var toReturn = PageType.Unknown;
        if (this.WinData && this.WinData.Opener && this.WinData.Opener.Window && this.WinData.Opener.Document) {
            var currentLoc = this.WinData.Opener.Window.location.href;
            this.Xyyz.debug.Log('currentLoc: ' + currentLoc);
            if (currentLoc.indexOf(this.Xyyz.InjectConst.Url.Login) > -1) {
                toReturn = PageType.LoginPage;
            }
            else if (currentLoc.indexOf(this.Xyyz.InjectConst.Url.Desktop) > -1) {
                toReturn = PageType.Desktop;
            }
            else if (currentLoc.indexOf(this.Xyyz.InjectConst.Url.ContentEditor) > -1) {
                toReturn = PageType.ContentEditor;
            }
            else if (currentLoc.indexOf(this.Xyyz.InjectConst.Url.LaunchPad) > -1) {
                toReturn = PageType.Launchpad;
            }
            else {
                toReturn = PageType.Unknown;
            }
        }
        this.Xyyz.debug.FuncEnd(this.CurrentOpenerPageState.name + ' ' + toReturn);
        return toReturn;
    };
    PageData.prototype.DebugInfo = function () {
        this.Xyyz.debug.FuncStart(this.DebugInfo.name);
        this.Xyyz.debug.Log(this.WinData.Opener.Window);
        this.Xyyz.debug.Log(this.WinData.Opener.Document);
        this.Xyyz.debug.FuncEnd(this.DebugInfo.name);
    };
    return PageData;
}(SpokeBase));
//# sourceMappingURL=PageData.js.map