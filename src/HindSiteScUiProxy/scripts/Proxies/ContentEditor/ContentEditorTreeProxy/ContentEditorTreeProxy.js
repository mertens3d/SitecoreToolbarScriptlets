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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeProxy = void 0;
var IterationDrone_1 = require("../../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone");
var DefaultStateOfTree_1 = require("../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfTree");
var Guid_1 = require("../../../../../Shared/scripts/Helpers/Guid");
var InjectConst_1 = require("../../../../../Shared/scripts/Interfaces/InjectConst");
var LoggableBase_1 = require("../../../Managers/LoggableBase");
var TreeMutationEvent_Subject_1 = require("../../Desktop/DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Subject");
var InitResultTreeProxy_1 = require("../../../../../Shared/scripts/Interfaces/Agents/InitResultTreeProxy");
var ContentEditorTreeNodeProxy_1 = require("../ContentEditorTreeNodeProxy/ContentEditorTreeNodeProxy");
var TreeProxy = /** @class */ (function (_super) {
    __extends(TreeProxy, _super);
    function TreeProxy(logger, associatedDoc, treeContainerElement) {
        var _this = _super.call(this, logger) || this;
        _this.AssociatedDoc = associatedDoc;
        _this.TreeContainerElement = treeContainerElement;
        return _this;
    }
    TreeProxy.prototype.OnReadyInitTreeProxy = function () {
        var initResultTreeProxy = new InitResultTreeProxy_1.InitResultTreeProxy();
        this.TreeMutationEvent_Subject = new TreeMutationEvent_Subject_1.TreeMutationEvent_Subject(this.Logger, this.TreeContainerElement);
        initResultTreeProxy.TreeInitialized = true;
        return initResultTreeProxy;
    };
    TreeProxy.prototype.GetTreeNodeByGlyph = function (targetNode) {
        var toReturn = null;
        if (targetNode && this.TreeContainerElement) {
            var treeGlyphTargetId = InjectConst_1.ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid_1.Guid.WithoutDashes(targetNode.ItemId);
            var foundOnPageTreeGlyph = this.TreeContainerElement.querySelector('[id=' + treeGlyphTargetId + ']');
            if (foundOnPageTreeGlyph) {
                toReturn = new ContentEditorTreeNodeProxy_1.ScContentTreeNodeProxy(this.Logger, foundOnPageTreeGlyph);
            }
        }
        return toReturn;
    };
    TreeProxy.prototype.SetStateOfTree = function (stateOfContentEditor) {
        return __awaiter(this, void 0, void 0, function () {
            var iterHelper, nextNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.SetStateOfTree.name);
                        iterHelper = new IterationDrone_1.IterationDrone(this.Logger, this.SetStateOfTree.name, true);
                        _a.label = 1;
                    case 1:
                        if (!(stateOfContentEditor.StateOfTreeNodes.length > 0 && iterHelper.DecrementAndKeepGoing())) return [3 /*break*/, 3];
                        nextNode = stateOfContentEditor.StateOfTreeNodes.shift();
                        return [4 /*yield*/, this.SetStateOfTreeNode(nextNode)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        this.Logger.FuncEnd(this.SetStateOfTree.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    TreeProxy.prototype.SetStateOfTreeNode = function (dataStateOfTreeNode) {
        return __awaiter(this, void 0, void 0, function () {
            var iterHelper, treeNodeProxy, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.SetStateOfTreeNode.name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        iterHelper = new IterationDrone_1.IterationDrone(this.Logger, this.SetStateOfTreeNode.name, true);
                        treeNodeProxy = null;
                        _a.label = 2;
                    case 2:
                        if (!(!treeNodeProxy && iterHelper.DecrementAndKeepGoing())) return [3 /*break*/, 6];
                        treeNodeProxy = this.GetTreeNodeByGlyph(dataStateOfTreeNode);
                        if (!treeNodeProxy) return [3 /*break*/, 3];
                        treeNodeProxy.SetStateOfTreeNode(dataStateOfTreeNode);
                        return [3 /*break*/, 5];
                    case 3:
                        this.Logger.Log('not Found...waiting: ');
                        return [4 /*yield*/, iterHelper.Wait()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_1 = _a.sent();
                        throw (this.SetStateOfTreeNode.name + ' | ' + err_1);
                    case 8:
                        this.Logger.FuncEnd(this.SetStateOfTreeNode.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    TreeProxy.prototype.WalkNodeRecursive = function (targetNode, depth) {
        var toReturn = [];
        depth = depth - 1;
        if (targetNode) {
            var firstChildGlyphNode = targetNode.querySelector(InjectConst_1.ContentConst.Const.Selector.SC.ContentEditor.ContentTreeNodeGlyph);
            if (firstChildGlyphNode) {
                var treeNodeProxy = new ContentEditorTreeNodeProxy_1.ScContentTreeNodeProxy(this.Logger, firstChildGlyphNode);
                if (treeNodeProxy.IsContentTreeNode()) {
                    if (treeNodeProxy.QueryIsExpanded() || treeNodeProxy.QueryIsActive()) {
                        var newData = treeNodeProxy.GetStateOfScContentTreeNode();
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
    TreeProxy.prototype.GetRootNodeForFrameType = function () {
        var toReturn = this.TreeContainerElement.querySelector(InjectConst_1.ContentConst.Const.Selector.SC.ContentEditor.RootAnchorNode);
        //if (!toReturn) {
        //  toReturn = this.TreeContainerElement.querySelector(ContentConst.Const.Selector.SC.Level2Nodes.MediaLibraryAnchorRootNode);
        //}
        return toReturn;
    };
    TreeProxy.prototype.GetStateOfTree = function () {
        var toReturnOneTreeState = new DefaultStateOfTree_1.DefaultStateOfTree();
        try {
            toReturnOneTreeState.StateOfTreeNodes = this.GetStateOfTreeNodes();
            toReturnOneTreeState.ActiveTreeNodeIndex = null;
            toReturnOneTreeState.ActiveTreeNodeIndex = this.GetActiveNode(toReturnOneTreeState.StateOfTreeNodes);
        }
        catch (err) {
            throw (this.GetStateOfTree.name + ' | ' + err);
        }
        return toReturnOneTreeState;
    };
    TreeProxy.prototype.GetActiveNode = function (allTreeNodeAr) {
        var toReturn = -1;
        if (allTreeNodeAr) {
            for (var idx = 0; idx < allTreeNodeAr.length; idx++) {
                var candidate = allTreeNodeAr[idx];
                if (candidate.IsActive) {
                    toReturn = idx;
                    break;
                }
            }
        }
        else {
            this.Logger.ErrorAndThrow(this.GetActiveNode.name, 'No tree data provided');
        }
        return toReturn;
    };
    TreeProxy.prototype.GetStateOfTreeNodes = function () {
        var toReturn = [];
        if (this.AssociatedDoc) {
            var rootNode = this.GetRootNodeForFrameType();
            if (rootNode) {
                var rootParent = rootNode.parentElement;
                toReturn = this.WalkNodeRecursive(rootParent, InjectConst_1.ContentConst.Const.MaxIter);
            }
            else {
                this.Logger.ErrorAndThrow(this.GetStateOfTreeNodes.name, 'no root node');
            }
        }
        else {
            this.Logger.ErrorAndThrow(this.GetStateOfTreeNodes.name, 'no targetDoc');
        }
        return toReturn;
    };
    return TreeProxy;
}(LoggableBase_1.LoggableBase));
exports.TreeProxy = TreeProxy;
//# sourceMappingURL=ContentEditorTreeProxy.js.map