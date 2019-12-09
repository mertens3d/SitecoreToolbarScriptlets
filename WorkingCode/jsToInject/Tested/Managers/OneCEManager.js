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
var OneCEManager = /** @class */ (function (_super) {
    __extends(OneCEManager, _super);
    function OneCEManager(xyyz) {
        return _super.call(this, xyyz) || this;
    }
    OneCEManager.prototype.PlantTreesOneCE = function (storageData, targetDoc) {
        this.Xyyz.debug.FuncStart('PlantTreesOneCE');
        var toReturn = false;
        for (var idx = 0; idx < storageData.AllTreeNodeAr.length; idx++) {
            var candidate = storageData.AllTreeNodeAr[idx].NodeId; //.replace(/\u0022/gi, '');
            //candidate = candidate.replace('[', '').replace(']', '');
            this.Xyyz.debug.Log('candidate: ' + candidate);
            var foundOnPage = targetDoc.getElementById(candidate);
            if (foundOnPage) {
                this.Xyyz.debug.Log('foundOnPage');
                var currentSrc = foundOnPage.getAttribute('src');
                this.Xyyz.debug.Log('currentSrc' + currentSrc);
                if (currentSrc.indexOf('treemenu_expanded.png') < 0) {
                    this.Xyyz.debug.Log('clicking it');
                    foundOnPage.click();
                }
            }
        }
        this.Xyyz.debug.FuncEnd('PlantTreesOneCE');
        return toReturn;
    };
    OneCEManager.prototype.SaveStateOneContentEditor = function (id, docElem) {
        this.Xyyz.debug.FuncStart('SaveOneContentEditor');
        this.Xyyz.debug.Log('SaveOneContentEditor');
        ;
        this.Xyyz.debug.Log('docElem is null: ' + (docElem === null));
        ;
        this.Xyyz.debug.Log('docElem is null: ' + (docElem === null));
        ;
        var CeSnapShot = this.Xyyz.OneCEMan.MakeNewData(id);
        CeSnapShot.AllTreeNodeAr = this.Xyyz.OneTreeMan.GetOneLiveTreeData(CeSnapShot, docElem);
        this.Xyyz.OneWindowMan.DrawDebugDataPretty(null);
        this.Xyyz.OneWindowMan.PutCEDataToCurrentSnapShot(CeSnapShot);
        this.Xyyz.debug.FuncEnd('SaveOneContentEditor');
    };
    OneCEManager.prototype.MakeNewData = function (id) {
        this.Xyyz.debug.FuncStart('MakeNewData: ' + id);
        var toReturn = {
            Id: id,
            AllTreeNodeAr: []
        };
        this.Xyyz.debug.FuncEnd('MakeNewData: ' + id);
        return toReturn;
    };
    OneCEManager.prototype.DebugDataOneNode = function (dataOneTreeNode) {
        this.Xyyz.debug.FuncStart('DebugDataOneNode');
        var toReturn = dataOneTreeNode.NodeId + ' ' + dataOneTreeNode.NodeFriendly;
        this.Xyyz.debug.FuncEnd('DebugDataOneNode');
        return toReturn;
    };
    OneCEManager.prototype.GetDebugDataOneCE = function (dataOneCe) {
        this.Xyyz.debug.FuncStart('GetDebugDataOneCE');
        var toReturn = [];
        toReturn.push('------ All Tree Nodes -----');
        for (var idx = 0; idx < dataOneCe.AllTreeNodeAr.length; idx++) {
            this.Xyyz.debug.Log('idx: ' + idx);
            var oneVal = this.DebugDataOneNode(dataOneCe.AllTreeNodeAr[idx]);
            this.Xyyz.debug.Log("oneVal : " + oneVal);
            toReturn.push(oneVal);
        }
        this.Xyyz.debug.FuncEnd(this.GetDebugDataOneCE.name);
        return toReturn;
    };
    return OneCEManager;
}(ManagerBase));
//# sourceMappingURL=OneCEManager.js.map