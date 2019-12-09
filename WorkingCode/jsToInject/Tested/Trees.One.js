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
console.log('OneTree loaded');
var OneTreeManager = /** @class */ (function (_super) {
    __extends(OneTreeManager, _super);
    function OneTreeManager(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(OneTreeManager.name);
        xyyz.debug.FuncEnd(OneTreeManager.name);
        return _this;
    }
    OneTreeManager.prototype.GetFriendlyNameFromNode = function (inputNode) {
        this.Xyyz.debug.FuncStart(this.GetFriendlyNameFromNode.name);
        var toReturn = 'unknown';
        var parentNode = inputNode.parentNode;
        var treeNode = parentNode.querySelector('[id^=Tree_Node_]');
        if (treeNode) {
            toReturn = treeNode.innerText;
        }
        else {
            this.Xyyz.debug.Log('No treeNode');
        }
        this.Xyyz.debug.FuncEnd(this.GetFriendlyNameFromNode.toString + ' ' + toReturn);
        return toReturn;
    };
    OneTreeManager.prototype.WalkNodeRecursive = function (targetNode, depth) {
        var toReturn = [];
        depth = depth - 1;
        if (targetNode) {
            var className = targetNode.className;
            if (className === this.Xyyz.InjectConst.ClassNames.ContentTreeNode) {
                var firstImg = targetNode.querySelector(this.Xyyz.InjectConst.Selector.ContentTreeNodeGlyph);
                if (firstImg) {
                    var srcAttr = firstImg.getAttribute('src');
                    if (srcAttr.indexOf(this.Xyyz.InjectConst.TreeExpandedPng) > -1) {
                        var friendlyName = this.GetFriendlyNameFromNode(firstImg);
                        var newData = { NodeFriendly: friendlyName, NodeId: firstImg.id };
                        toReturn.push(newData);
                    }
                }
            }
            var childNodes = targetNode.children;
            if (childNodes && childNodes.length > 0 && depth > 0) {
                for (var jdx = 0; jdx < childNodes.length; jdx++) {
                    var oneChild = childNodes[jdx];
                    toReturn = toReturn.concat(this.WalkNodeRecursive(oneChild, depth));
                }
            }
        }
        return toReturn;
    };
    OneTreeManager.prototype.GetOneLiveTreeData = function (dataOneCe, targetDoc) {
        this.Xyyz.debug.FuncStart(this.GetOneLiveTreeData.name + 'b idx: ' + dataOneCe.Id);
        this.Xyyz.debug.Log('targetDoc isnull xx: ' + (targetDoc === null));
        var toReturn = [];
        if (targetDoc) {
            this.Xyyz.debug.Log(targetDoc);
            var rootNode = targetDoc.getElementById(this.Xyyz.InjectConst.Selector.RootNodeId);
            if (rootNode) {
                this.Xyyz.debug.Log('rootNode: ' + rootNode.innerHTML);
                var rootParent = rootNode.parentElement;
                toReturn = this.WalkNodeRecursive(rootParent, this.Xyyz.InjectConst.MaxIter);
                this.Xyyz.debug.Log('foundNodes count: ' + toReturn.length);
                //var nodesAsString = JSON.stringify(toReturn);
                //this.Xyyz.debug.Log('toReturn as string: ' + nodesAsString);
            }
            else {
                this.Xyyz.debug.Error(this.GetOneLiveTreeData.name, 'no root node');
            }
        }
        else {
            this.Xyyz.debug.Error(this.GetOneLiveTreeData.name, 'no targetDoc');
        }
        this.Xyyz.debug.FuncEnd(this.GetOneLiveTreeData.name);
        return toReturn;
    };
    return OneTreeManager;
}(ManagerBase));
//# sourceMappingURL=Trees.One.js.map