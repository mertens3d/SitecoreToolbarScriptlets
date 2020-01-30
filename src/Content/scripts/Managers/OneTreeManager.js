"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var _ContentManagerBase_1 = require("../_first/_ContentManagerBase");
var OneTreeManager = /** @class */ (function (_super) {
    __extends(OneTreeManager, _super);
    function OneTreeManager(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(OneTreeManager.name);
        xyyz.debug.FuncEnd(OneTreeManager.name);
        return _this;
    }
    OneTreeManager.prototype.GetFriendlyNameFromNode = function (inputNode) {
        this.debug().FuncStart(this.GetFriendlyNameFromNode.name);
        var toReturn = 'unknown';
        var parentNode = inputNode.parentNode;
        var treeNode = parentNode.querySelector(this.Const().Selector.SC.IdStartsWithTreeNode); // [id^=Tree_Node_]');
        if (treeNode) {
            toReturn = treeNode.innerText;
        }
        else {
            this.debug().Log('No treeNode');
        }
        this.debug().FuncEnd(this.GetFriendlyNameFromNode.name, toReturn);
        return toReturn;
    };
    OneTreeManager.prototype.__isActive = function (targetNode) {
        var toReturn = false;
        var firstNodeActiveTest = targetNode.querySelector(this.Const().Selector.SC.IdStartsWithTreeNode);
        if (firstNodeActiveTest) {
            var className = firstNodeActiveTest.className;
            if (className.indexOf(this.Const().ClassNames.SC.scContentTreeNodeActive) > -1) {
                toReturn = true;
                this.debug().Log('** isActive ' + targetNode.innerText);
            }
        }
        //this.debug().Log(className);
        //this.debug().Log(this.Const().ClassNames.SC.scContentTreeNodeActive);
        return toReturn;
    };
    OneTreeManager.prototype.__isExpanded = function (firstImg) {
        var toReturn = false;
        if (firstImg) {
            var srcAttr = firstImg.getAttribute('src');
            if (srcAttr.indexOf(this.Const().Names.SC.TreeExpandedPng.sc920) > -1) {
                //this.debug().Log('is Expanded');
                toReturn = true;
            }
            return toReturn;
        }
    };
    OneTreeManager.prototype.__isContentTreeNode = function (targetNode) {
        var toReturn = false;
        var className = targetNode.className;
        if (className === this.Const().ClassNames.ContentTreeNode) {
            //this.debug().Log('is Content Node');
            toReturn = true;
        }
        return toReturn;
    };
    OneTreeManager.prototype.WalkNodeRecursive = function (targetNode, depth) {
        var toReturn = [];
        depth = depth - 1;
        if (targetNode) {
            var firstImg = targetNode.querySelector(this.Const().Selector.SC.ContentTreeNodeGlyph);
            if (this.__isContentTreeNode(targetNode)) {
                var newData = {
                    IsExpanded: this.__isExpanded(firstImg),
                    IsActive: this.__isActive(targetNode),
                    NodeFriendly: '',
                    NodeId: null
                };
                if (newData.IsExpanded || newData.IsActive) {
                    this.debug().LogVal('isExpanded', newData.IsExpanded.toString());
                    this.debug().LogVal('isActive', newData.IsActive.toString());
                    newData.NodeFriendly = this.GetFriendlyNameFromNode(firstImg);
                    this.debug().LogVal('friendlyName', newData.NodeFriendly);
                    this.debug().LogVal('id', firstImg.id);
                    var apparentId = firstImg.id.replace(this.Const().Names.SC.TreeGlyphPrefix, '');
                    newData.NodeId = this.Xyyz.GuidMan.ParseGuid(apparentId);
                    toReturn.push(newData);
                }
            }
            var childNodes = targetNode.children; //  querySelectorAll('.' + this.Const().ClassNames.ContentTreeNode);
            if (childNodes && childNodes.length > 0 && depth > 0) {
                for (var jdx = 0; jdx < childNodes.length; jdx++) {
                    var oneChild = childNodes[jdx];
                    toReturn = toReturn.concat(this.WalkNodeRecursive(oneChild, depth));
                }
            }
        }
        return toReturn;
    };
    OneTreeManager.prototype.GetOneLiveTreeData = function (targetDoc) {
        this.debug().FuncStart(this.GetOneLiveTreeData.name);
        this.debug().Log('targetDoc isnull: ' + (targetDoc === null));
        var toReturn = [];
        if (targetDoc) {
            //this.debug().Log(targetDoc);
            var rootNode = targetDoc.Document.getElementById(this.Const().ElemId.sc.SitecoreRootNodeId);
            if (rootNode) {
                this.debug().Log('rootNode: ' + rootNode.innerHTML);
                var rootParent = rootNode.parentElement;
                toReturn = this.WalkNodeRecursive(rootParent, this.Const().MaxIter);
                this.debug().Log('foundNodes count: ' + toReturn.length);
                //var nodesAsString = JSON.stringify(toReturn);
                //this.debug().Log('toReturn as string: ' + nodesAsString);
            }
            else {
                this.debug().Error(this.GetOneLiveTreeData.name, 'no root node');
            }
        }
        else {
            this.debug().Error(this.GetOneLiveTreeData.name, 'no targetDoc');
        }
        this.debug().FuncEnd(this.GetOneLiveTreeData.name);
        return toReturn;
    };
    return OneTreeManager;
}(_ContentManagerBase_1.ContentManagerBase));
exports.OneTreeManager = OneTreeManager;
//# sourceMappingURL=OneTreeManager.js.map