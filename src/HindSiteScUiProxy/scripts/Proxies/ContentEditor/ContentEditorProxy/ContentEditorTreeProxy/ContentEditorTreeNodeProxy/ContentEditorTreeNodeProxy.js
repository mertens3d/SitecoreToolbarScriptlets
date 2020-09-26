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
exports.ScContentTreeNodeProxy = void 0;
var Guid_1 = require("../../../../../../../Shared/scripts/Helpers/Guid");
var InjectConst_1 = require("../../../../../../../Shared/scripts/Interfaces/InjectConst");
var LoggableBase_1 = require("../../../../../../../Shared/scripts/LoggableBase");
var ScContentTreeNodeProxy = /** @class */ (function (_super) {
    __extends(ScContentTreeNodeProxy, _super);
    function ScContentTreeNodeProxy(logger, sourceElement) {
        var _this = _super.call(this, logger) || this;
        if (sourceElement) {
            if (sourceElement.hasAttribute('src')) {
                _this.InferFromImageElement(sourceElement);
            }
            else if (sourceElement.hasAttribute('href')) {
                _this.InferFromAnchorElement(sourceElement);
            }
            else if (sourceElement.classList.contains('scContentTreeNode')) {
                _this.InferFromDivElement(sourceElement);
            }
            else {
                _this.Logger.ErrorAndThrow(ScContentTreeNodeProxy.name, 'invalid source element type: ' + (typeof sourceElement));
            }
        }
        else {
            _this.Logger.ErrorAndThrow(ScContentTreeNodeProxy.name, 'null sourceElement or associatedDoc');
        }
        return _this;
    }
    ScContentTreeNodeProxy.prototype.InferFromDivElement = function (divElement) {
        if (divElement) {
            this.ScContentTreeNodeDivElem = divElement;
        }
    };
    ScContentTreeNodeProxy.prototype.InferFromAnchorElement = function (anchorElement) {
        if (anchorElement) {
            this.ScContentTreeNodeDivElem = anchorElement.parentElement;
        }
    };
    ScContentTreeNodeProxy.prototype.InferFromImageElement = function (imageElement) {
        if (imageElement) {
            this.ScContentTreeNodeDivElem = imageElement.parentElement;
        }
    };
    ScContentTreeNodeProxy.prototype.GetGlyphNodeElem = function () {
        return this.ScContentTreeNodeDivElem.querySelector(":scope > img");
    };
    ScContentTreeNodeProxy.prototype.GetLinkNodeElem = function () {
        return this.ScContentTreeNodeDivElem.querySelector(":scope > a");
    };
    ScContentTreeNodeProxy.prototype.GetStateOfScContentTreeNode = function () {
        var newData = {
            IsExpanded: this.QueryIsExpanded(),
            IsActive: this.QueryIsActive(),
            FriendlyTreeNode: this.GetNodeLinkText(),
            ItemId: this.GetApparentItemId(),
        };
        return newData;
    };
    ScContentTreeNodeProxy.prototype.GetApparentItemId = function () {
        var glyphNodeIdSuffix = this.GetGlyphNodeElem().id.replace(InjectConst_1.ContentConst.Const.Names.SC.TreeGlyphPrefix, '');
        var toReturnGuidData = Guid_1.Guid.ParseGuid(glyphNodeIdSuffix, true);
        return toReturnGuidData;
    };
    ScContentTreeNodeProxy.prototype.GetIconSrc = function () {
        var toReturn;
        //((document.getElementById('Tree_Node_709C05C504394E1A9D4711E824C87B39')).parentElement).querySelector('.scContentTreeNodeIcon').src
        //((document.getElementById('Tree_Node_EB443C0BF923409E85F3E7893C8C30C2')).parentElement).querySelector('.scContentTreeNodeIcon').outerHTML
        var foundElement = this.ScContentTreeNodeDivElem.querySelector(InjectConst_1.ContentConst.Const.Selector.SC.ContentEditor.scContentTreeNodeIcon);
        if (foundElement) {
            toReturn = foundElement.src;
        }
        return toReturn;
    };
    ScContentTreeNodeProxy.prototype.GetParentTreeNode = function () {
        var toReturn = null;
        var candidate = this.ScContentTreeNodeDivElem.closest(InjectConst_1.ContentConst.Const.Selector.SC.ContentEditor.scContentTreeNodeIcon);
        if (candidate) {
            this.Logger.Log('found a candidate');
            toReturn = new ScContentTreeNodeProxy(this.Logger, candidate);
        }
        else {
            this.Logger.Log('no candidate found');
        }
        return toReturn;
    };
    ScContentTreeNodeProxy.prototype.IsSitecoreRootNode = function () {
        var toReturn = false;
        var apparentId = this.GetApparentItemId();
        if (apparentId) {
            toReturn = apparentId.Raw === InjectConst_1.ContentConst.Const.ElemId.sc.SitecoreRootApparentIdRaw;
        }
        return toReturn;
    };
    ScContentTreeNodeProxy.prototype.GetMainIconSrc = function () {
        var toReturn;
        var maxIter = 100;
        var penultimateNode = this;
        var parentNode = this;
        var penultimateElem = this.ScContentTreeNodeDivElem.closest('[id=ContentTreeActualSize] > .scContentTreeNode >  div > .scContentTreeNode');
        if (penultimateElem) {
            penultimateNode = new ScContentTreeNodeProxy(this.Logger, penultimateElem);
        }
        if (penultimateNode !== null) {
            toReturn = penultimateNode.GetIconSrc();
        }
        return toReturn;
    };
    ScContentTreeNodeProxy.prototype.SetStateOfTreeNode = function (newData) {
        if (newData.IsExpanded) {
            this.ExpandNode();
        }
        this.Logger.LogVal('IsActive', newData.IsActive.toString());
        if (newData.IsActive) {
            var hotTreeNodeId = InjectConst_1.ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid_1.Guid.WithoutDashes(newData.ItemId);
            var hotTreeNode = this.ScContentTreeNodeDivElem.querySelector('[id=' + hotTreeNodeId + ']');
            if (hotTreeNode) {
                var hotTreeNodeProxy = new ScContentTreeNodeProxy(this.Logger, hotTreeNode);
                if (hotTreeNodeProxy) {
                    hotTreeNodeProxy.ActivateNode();
                }
                else {
                    this.Logger.ErrorAndContinue(this.SetStateOfTreeNode.name, 'hot tree node not found');
                }
            }
            else {
                this.Logger.WarningAndContinue(this.SetStateOfTreeNode.name, 'No hotTreeNode');
            }
        }
    };
    ScContentTreeNodeProxy.prototype.QueryIsActive = function () {
        var toReturn = false;
        if (this.GetLinkNodeElem()) {
            var classList = this.GetLinkNodeElem().classList;
            if (classList.contains(InjectConst_1.ContentConst.Const.ClassNames.SC.scContentTreeNodeActive)) {
                toReturn = true;
            }
        }
        return toReturn;
    };
    ScContentTreeNodeProxy.prototype.ActivateNode = function () {
        this.Logger.FuncStart(this.ActivateNode.name);
        if (this.GetLinkNodeElem()) {
            this.Logger.Log('clicking it to activate');
            this.GetLinkNodeElem().click();
            // check
            if (!this.QueryIsActive()) {
                this.Logger.WarningAndContinue(this.ActivateNode.name, 'Did not work. Trying to activate: ' + this.GetNodeLinkText());
            }
        }
        else {
            this.Logger.ErrorAndContinue(this.ActivateNode.name, 'No associated Elem');
        }
        this.Logger.FuncEnd(this.ActivateNode.name);
    };
    ScContentTreeNodeProxy.prototype.__collapseNode = function (element) {
        var currentSrc = element.getAttribute('src');
        this.Logger.Log('currentSrc' + currentSrc);
        if (currentSrc.indexOf(InjectConst_1.ContentConst.Const.Names.TreeMenuExpandedPng) > -1) {
            this.Logger.Log('clicking it to collapse');
            element.click();
        }
    };
    ScContentTreeNodeProxy.prototype.ExpandNode = function () {
        this.Logger.FuncStart(this.ExpandNode.name);
        if (!this.QueryIsExpanded()) {
            this.Logger.Log('clicking it to expand');
            this.GetGlyphNodeElem().click();
        }
        else {
            this.Logger.Log('Already expanded');
        }
        this.Logger.FuncEnd(this.ExpandNode.name);
    };
    ScContentTreeNodeProxy.prototype.GetNodeLinkText = function () {
        var toReturn = 'unknown';
        if (this.GetLinkNodeElem()) {
            toReturn = this.GetLinkNodeElem().innerText;
        }
        return toReturn;
    };
    ScContentTreeNodeProxy.prototype.IsContentTreeNode = function () {
        var toReturn = false;
        var className = this.ScContentTreeNodeDivElem.className;
        toReturn = className === InjectConst_1.ContentConst.Const.ClassNames.SC.ContentTreeNode;
        return toReturn;
    };
    ScContentTreeNodeProxy.prototype.QueryIsExpanded = function () {
        var toReturn = false;
        var candidate = this.GetGlyphNodeElem();
        if (candidate) {
            var srcAttr = candidate.getAttribute('src');
            if (srcAttr !== null) {
                if (srcAttr.indexOf(InjectConst_1.ContentConst.Const.Names.SC.TreeExpandedPng.sc920) > -1) {
                    toReturn = true;
                }
            }
            else {
                this.Logger.ErrorAndThrow(this.QueryIsExpanded.name, 'Bad Glyph/ node data');
            }
            return toReturn;
        }
    };
    return ScContentTreeNodeProxy;
}(LoggableBase_1.LoggableBase));
exports.ScContentTreeNodeProxy = ScContentTreeNodeProxy;
//# sourceMappingURL=ContentEditorTreeNodeProxy.js.map