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
console.log('ManyTrees loaded');
var OneDesktopManager = /** @class */ (function (_super) {
    __extends(OneDesktopManager, _super);
    function OneDesktopManager(xyyz) {
        var _this = this;
        xyyz.debug.FuncStart(OneDesktopManager.name);
        _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncEnd(OneDesktopManager.name);
        return _this;
    }
    OneDesktopManager.prototype.GetNewIframeData = function (index, docElem, iframe) {
        var toReturn = {
            Index: index,
            DocElem: docElem,
            IframeElem: iframe
        };
        return toReturn;
    };
    OneDesktopManager.prototype.GetAllLiveIframeData = function (targetDoc) {
        this.Xyyz.debug.FuncStart(this.GetAllLiveIframeData.name);
        var toReturn = [];
        var iframeAr = targetDoc.querySelectorAll('iframe[src*=content]');
        if (iframeAr) {
            this.Xyyz.debug.Log('iframeAr: ' + iframeAr.length);
            for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
                this.Xyyz.debug.Log('pushing: ' + ifrIdx);
                toReturn.push(this.GetNewIframeData(ifrIdx, null, iframeAr[ifrIdx]));
            }
        }
        this.Xyyz.debug.FuncEnd(this.GetAllLiveIframeData.name + ' ' + toReturn.length);
        return toReturn;
    };
    OneDesktopManager.prototype.PlantTheTrees = function (targetDoc, treeIdx) {
        this.Xyyz.debug.FuncStart('PlantTheTrees');
        this.Xyyz.debug.Log('s) LookAtExistingData: ' + treeIdx);
        var foundInStorage = null; //todo   this.Xyyz.StorageMan.GetTreeData(treeIdx);
        if (foundInStorage) {
            this.Xyyz.debug.Log('foundInStorage: ' + foundInStorage);
            var fromStorageAr = foundInStorage.split(',');
            if (fromStorageAr) {
                this.Xyyz.debug.Log('foundAr: ' + fromStorageAr.length + ' ' + fromStorageAr);
                var allData = this.GetAllLiveIframeData(targetDoc)[treeIdx];
            }
        }
        this.Xyyz.debug.FuncEnd('PlantTheTrees');
    };
    OneDesktopManager.prototype.SaveOneDesktop = function () {
        this.Xyyz.debug.FuncStart(this.SaveOneDesktop.name);
        ;
        this.Xyyz.debug.FuncStart('SaveOneDesktop');
        ;
        var livingIframeAr = this.GetAllLiveIframeData(this.Xyyz.PageData.WinData.Opener.Document);
        if (livingIframeAr && livingIframeAr.length > 0) {
            for (var iframeIdx = 0; iframeIdx < livingIframeAr.length; iframeIdx++) {
                this.Xyyz.debug.Log('iframeIdx: ' + iframeIdx);
                var targetIframeObj = livingIframeAr[iframeIdx];
                this.Xyyz.debug.Log('targetIframe: ' + JSON.stringify(targetIframeObj));
                this.Xyyz.OneCEManager.SaveOneContentEditor(iframeIdx, targetIframeObj.DocElem);
            }
        }
        this.Xyyz.debug.Log('done gathering tree data');
        this.Xyyz.OneWindowManager.DrawDebugDataPretty(null);
        this.Xyyz.debug.FuncEnd(this.SaveOneDesktop.name);
    };
    return OneDesktopManager;
}(ManagerBase));
;
//# sourceMappingURL=DesktopManager.js.map