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
exports.ContentTreeProxy = void 0;
var IterationDrone_1 = require("../../../../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone");
var RecipeBasics_1 = require("../../../../../../Shared/scripts/Classes/RecipeBasics");
var Guid_1 = require("../../../../../../Shared/scripts/Helpers/Guid");
var InitResultTreeProxy_1 = require("../../../../../../Shared/scripts/Interfaces/Agents/InitResultTreeProxy");
var LoggableBase_1 = require("../../../../../../Shared/scripts/LoggableBase");
var NativeClassNameChangeEvent_Subject_1 = require("../../../Desktop/DesktopProxy/Events/NativeClassNameChangeEvent/NativeClassNameChangeEvent_Subject");
var NativeClassNameChangeEvent_Observer_1 = require("../../../Desktop/DesktopProxy/Events/TreeMutationEvent/NativeClassNameChangeEvent_Observer");
var TreeMutationEvent_Subject_1 = require("../../../Desktop/DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Subject");
var ScContentTreeNodeProxy_1 = require("./ScContentTreeNodeProxy/ScContentTreeNodeProxy");
var InjectConst_1 = require("../../../../../../Shared/scripts/Interfaces/InjectConst");
var DefaultStateOfContentTree_1 = require("../../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfContentTree");
//implements ContentTreeProxy
//ContentTree is the name Sitecore uses
var ContentTreeProxy = /** @class */ (function (_super) {
    __extends(ContentTreeProxy, _super);
    function ContentTreeProxy(logger, associatedDoc, treeContainerElement) {
        var _this = _super.call(this, logger) || this;
        _this.Logger.ThrowIfNullOrUndefined(ContentTreeProxy.name, [associatedDoc, treeContainerElement]);
        _this.AssociatedDoc = associatedDoc;
        _this.TreeContainerElement = treeContainerElement;
        _this.RecipeBasics = new RecipeBasics_1.RecipeBasics(_this.Logger);
        return _this;
    }
    ContentTreeProxy.prototype.Instantiate_TreeProxy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.Instantiate_TreeProxy.name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.GetRootNodeForFrameType()
                                .then(function (htmlElement) {
                                _this.rootTreeNodeHtmlElement = htmlElement;
                                _this.initReportTreeProxy = new InitResultTreeProxy_1.InitReportTreeProxy();
                                _this.initReportTreeProxy.TreeInstantiated = true;
                                _this.TreeMutationEvent_Subject = new TreeMutationEvent_Subject_1.TreeMutationEvent_Subject(_this.Logger, _this.TreeContainerElement);
                                _this.NativeClassNameChangeEvent_Subject = new NativeClassNameChangeEvent_Subject_1.NativeClassNameChangeEvent_Subject(_this.Logger, _this.TreeContainerElement);
                                _this.NativeClassNameChangeEvent_Observer = new NativeClassNameChangeEvent_Observer_1.NativeClassNameChangeEvent_Observer(_this.Logger, _this.CallBackOnNativeClassNameChangeEventAsync.bind(_this));
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.Logger.ErrorAndThrow(this.Instantiate_TreeProxy.name, err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.Logger.FuncEnd(this.Instantiate_TreeProxy.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    ContentTreeProxy.prototype.WireEvents_TreeProxy = function () {
        this.Logger.FuncStart(this.WireEvents_TreeProxy.name);
        this.NativeClassNameChangeEvent_Subject.RegisterObserver(this.NativeClassNameChangeEvent_Observer);
        this.initReportTreeProxy.EventsWired = true;
        this.Logger.FuncEnd(this.WireEvents_TreeProxy.name);
    };
    ContentTreeProxy.prototype.CallBackOnNativeClassNameChangeEventAsync = function (notUsed) {
        var _this = this;
        this.Logger.FuncStart(this.CallBackOnNativeClassNameChangeEventAsync.name);
        if (this.TreeMutationEvent_Subject) {
            //let stateOfContentTreeNodeDeep: IStateOfScContentTreeNodeDeep = this.GetStateOfContentTreeNodeDeep();
            this.GetStateOfContentTree()
                .then(function (stateOfContentTree) {
                var TreeMutationEvent_Payload = {
                    StateOfContentTree: stateOfContentTree
                };
                _this.TreeMutationEvent_Subject.NotifyObserversAsync(TreeMutationEvent_Payload);
            })
                .then(function () { return _this.Logger.Log(_this.CallBackOnNativeClassNameChangeEventAsync.name + ' completed'); })
                .catch(function (err) { return _this.Logger.ErrorAndThrow(_this.CallBackOnNativeClassNameChangeEventAsync.name, err); });
        }
        this.Logger.FuncEnd(this.CallBackOnNativeClassNameChangeEventAsync.name);
    };
    ContentTreeProxy.prototype.TriggerActiveNodeChangeEvent = function () {
        this.Logger.FuncStart(this.TriggerActiveNodeChangeEvent.name);
        this.CallBackOnNativeClassNameChangeEventAsync(null);
        this.Logger.FuncEnd(this.TriggerActiveNodeChangeEvent.name);
    };
    ContentTreeProxy.prototype.GetTreeNodeByGlyph = function (targetNode) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var scContentTreeNodeProxy, treeGlyphTargetId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scContentTreeNodeProxy = null;
                        if (!(targetNode && this.TreeContainerElement)) return [3 /*break*/, 2];
                        treeGlyphTargetId = InjectConst_1.ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid_1.Guid.WithoutDashes(targetNode.ItemId);
                        return [4 /*yield*/, this.RecipeBasics.WaitAndReturnFoundFromContainer(this.TreeContainerElement, '[id=' + treeGlyphTargetId + ']', this.GetTreeNodeByGlyph.name + ' ' + treeGlyphTargetId)
                                .then(function (htmlElement) { return scContentTreeNodeProxy = new ScContentTreeNodeProxy_1.ScContentTreeNodeProxy(_this.Logger, htmlElement, targetNode.Coord.LevelIndex, targetNode.Coord.SiblingIndex, targetNode.Coord.LevelWidth); })
                                .then(function () { return scContentTreeNodeProxy.Instantiate(); })
                                .then(function () { return resolve(scContentTreeNodeProxy); })
                                .catch(function (err) { return reject(_this.GetTreeNodeByGlyph.name + ' | ' + err); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    ContentTreeProxy.prototype.SetStateOfNodeRecursive = function (currentNodeData, depth) {
        return __awaiter(this, void 0, void 0, function () {
            var maxIterDepth, targetScContentTreeNodeProxy_1, promisesAr_1, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.SetStateOfNodeRecursive.name, currentNodeData.Friendly);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        maxIterDepth = 200;
                        targetScContentTreeNodeProxy_1 = null;
                        promisesAr_1 = [];
                        if (depth > maxIterDepth) {
                            this.Logger.ErrorAndThrow(this.SetStateOfNodeRecursive.name, 'Iteration check - max depth exceed. Something is probably wrong');
                        }
                        if (!(depth < maxIterDepth && currentNodeData)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.GetTreeNodeByGlyph(currentNodeData)
                                .then(function (scContentTreeNodeProxy) {
                                targetScContentTreeNodeProxy_1 = scContentTreeNodeProxy;
                            })
                                .then(function () { return targetScContentTreeNodeProxy_1.SetStateOfTreeNode(currentNodeData, depth); })
                                .then(function () {
                                //let treeNodeProxy: ScContentTreeNodeProxy =
                                if (currentNodeData.NodeChildren.length > 0) {
                                    currentNodeData.NodeChildren.forEach(function (nodeChild) {
                                        return promisesAr_1.push(_this.SetStateOfNodeRecursive(nodeChild, depth + 1));
                                    });
                                }
                            })
                                .then(function () { return Promise.all(promisesAr_1); })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        this.Logger.ErrorAndThrow(this.SetStateOfNodeRecursive.name, err_2);
                        return [3 /*break*/, 5];
                    case 5:
                        this.Logger.FuncEnd(this.SetStateOfNodeRecursive.name, currentNodeData.Friendly);
                        return [2 /*return*/];
                }
            });
        });
    };
    ContentTreeProxy.prototype.SetStateOfContentTree = function (currentNodeData) {
        return __awaiter(this, void 0, void 0, function () {
            var iterHelper, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.SetStateOfContentTree.name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.TreeMutationEvent_Subject.DisableNotifications();
                        iterHelper = new IterationDrone_1.IterationDrone(this.Logger, this.SetStateOfContentTree.name, true);
                        return [4 /*yield*/, this.SetStateOfNodeRecursive(currentNodeData, 0)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        this.Logger.ErrorAndThrow(this.SetStateOfContentTree.name, err_3);
                        return [3 /*break*/, 4];
                    case 4:
                        this.TreeMutationEvent_Subject.EnableNotifications();
                        this.Logger.FuncEnd(this.SetStateOfContentTree.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    //async SetStateOfTreeNode_TreeProxy(dataStateOfTreeNode: IStateOfScContentTreeNodeDeep): Promise<void> {
    //  this.Logger.FuncStart(this.SetStateOfTreeNode_TreeProxy.name, dataStateOfTreeNode.Friendly);
    //  try {
    //    var iterHelper = new IterationDrone(this.Logger, this.SetStateOfTreeNode_TreeProxy.name, true);
    //    let treeNodeProxy: ScContentTreeNodeProxy = null;
    //    this.TreeMutationEvent_Subject.DisableNotifications();
    //    while (!treeNodeProxy && iterHelper.DecrementAndKeepGoing()) {
    //      treeNodeProxy = this.GetTreeNodeByGlyph(dataStateOfTreeNode);
    //      if (treeNodeProxy) {
    //        treeNodeProxy.SetStateOfTreeNode(dataStateOfTreeNode, 0);
    //      } else {
    //        await iterHelper.Wait();
    //      }
    //    }
    //  } catch (err) {
    //    throw (this.SetStateOfTreeNode_TreeProxy.name + ' | ' + err);
    //  }
    //  this.TreeMutationEvent_Subject.EnableNotifications();
    //  this.Logger.FuncEnd(this.SetStateOfTreeNode_TreeProxy.name, dataStateOfTreeNode.Friendly);
    //}
    //WalkNodeRecursive(targetNode: HTMLElement, depth: number, itemIndex: number, siblingCount: number): Promise<IStateOfScContentTreeNodeDeep[]> {
    //  return new Promise(async (resolve, reject) => {
    //    let friendly: string = 'depth: ' + depth + ' index: ' + (itemIndex + 1) + ' of: ' + siblingCount + ' total siblings';
    //    this.Logger.FuncStart(this.WalkNodeRecursive.name, friendly);
    //    if (targetNode.id) {
    //      this.Logger.Log('targetNode.id', targetNode.id);
    //    }
    //    var toReturn: IStateOfScContentTreeNodeDeep[] = [];
    //    depth = depth - 1;
    //    let treeNodeProxy: ScContentTreeNodeProxy = null;
    //    let stateOftreeNodeProxy: IStateOfScContentTreeNodeDeep = null;
    //    let childNodePromisesAr: Promise<IStateOfScContentTreeNodeDeep[]>[] = [];
    //    if (targetNode) {
    //      await this.RecipeBasics.WaitAndReturnFoundFromContainer(targetNode, ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeNodeGlyph, this.WalkNodeRecursive.name)
    //        .then(async (firstChildGlyphNode: HTMLImageElement) => treeNodeProxy = new ScContentTreeNodeProxy(this.Logger, firstChildGlyphNode, depth, itemIndex, siblingCount))
    //        .then(() => treeNodeProxy.GetStateOfScContentTreeNodeDeep())
    //        .then((stateOfContentTreeNodeProxy: IStateOfScContentTreeNodeDeep) => stateOftreeNodeProxy = stateOfContentTreeNodeProxy)
    //        .then(() => {
    //          if (treeNodeProxy.IsContentTreeNode()) {
    //            if (stateOftreeNodeProxy.IsExpanded || stateOftreeNodeProxy.IsActive) {
    //              this.Logger.LogVal(this.WalkNodeRecursive.name, stateOftreeNodeProxy.FriendlyTreeNode);
    //              toReturn.push(stateOftreeNodeProxy);
    //            }
    //          }
    //        })
    //        .then(() => {
    //          let childNodes = targetNode.querySelectorAll(ContentConst.Const.Selector.SC.ContentEditor.scContentTreeNodeIcon); //targetNode.children;
    //          childNodePromisesAr = [];
    //          childNodes.forEach((oneChild: HTMLElement, index) => childNodePromisesAr.push(this.WalkNodeRecursive(oneChild, depth, index, childNodes.length)));
    //        })
    //        .then(() => Promise.all(childNodePromisesAr))
    //        .then((values: IStateOfScContentTreeNodeDeep[][]) => values.forEach((value: IStateOfScContentTreeNodeDeep[]) => toReturn = toReturn.concat(value)))
    //        .then(() => resolve(toReturn))
    //        .catch((err) => reject(this.WalkNodeRecursive.name + ' | ' + err));
    //    }
    //    this.Logger.FuncEnd(this.WalkNodeRecursive.name, friendly)
    //  });
    //}
    ContentTreeProxy.prototype.GetRootNodeForFrameType = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_4, toReturn;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.RecipeBasics.WaitForAndReturnFoundElem(this.AssociatedDoc, InjectConst_1.ContentConst.Const.Selector.SC.ContentEditor.RootAnchorNode)
                                .then(function (htmlElement) { return _this.rootTreeNodeHtmlElement = htmlElement; })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        this.Logger.ErrorAndThrow(this.GetRootNodeForFrameType.name, err_4);
                        return [3 /*break*/, 3];
                    case 3:
                        toReturn = this.TreeContainerElement.querySelector(InjectConst_1.ContentConst.Const.Selector.SC.ContentEditor.RootAnchorNode);
                        return [2 /*return*/, toReturn];
                }
            });
        });
    };
    ContentTreeProxy.prototype.GetActiveTreeNodeFromAncestorNode = function (stateOfScContentTreeNodeDeep) {
        var _this = this;
        this.Logger.FuncStart(this.GetActiveTreeNodeFromAncestorNode.name);
        var foundNode = null;
        if (stateOfScContentTreeNodeDeep.IsActive) {
            foundNode = stateOfScContentTreeNodeDeep;
        }
        else {
            stateOfScContentTreeNodeDeep.NodeChildren.forEach(function (child) {
                var candidate = _this.GetActiveTreeNodeFromAncestorNode(child);
                if (candidate !== null) {
                    foundNode = candidate;
                }
            });
        }
        this.Logger.FuncEnd(this.GetActiveTreeNodeFromAncestorNode.name, (foundNode !== null).toString());
        return foundNode;
    };
    ContentTreeProxy.prototype.GetStateOfContentTree = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var stateOfContentTree;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.GetStateOfContentTree.name);
                        stateOfContentTree = new DefaultStateOfContentTree_1.DefaultStateOfContentTree();
                        return [4 /*yield*/, this.GetStateOfContentTreeNodeDeep()
                                .then(function (result) { return stateOfContentTree.StateOfScContentTreeNodeDeep = result; })
                                .then(function () {
                                var activeNodeFlat = _this.GetActiveTreeNodeFromAncestorNode(stateOfContentTree.StateOfScContentTreeNodeDeep);
                                if (activeNodeFlat) {
                                    //stateOfContentTree.ActiveNodeCoord = activeNodeFlat.Coord;
                                    stateOfContentTree.ActiveNodeFlat = activeNodeFlat;
                                }
                                //this.Logger.LogAsJsonPretty('stateOfTreeProxy', stateOfContentTree);
                            })
                                .then(function () { return resolve(stateOfContentTree); })
                                .catch(function (err) { return reject(_this.GetStateOfContentTree.name + ' | ' + err); })];
                    case 1:
                        _a.sent();
                        this.Logger.FuncEnd(this.GetStateOfContentTree.name);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    //GetActiveNode(allTreeNodeAr: IStateOfScContentTreeNodeDeep[]) {
    //  let toReturn: number = -1;
    //  if (allTreeNodeAr) {
    //    for (var idx = 0; idx < allTreeNodeAr.length; idx++) {
    //      let candidate: IStateOfScContentTreeNodeDeep = allTreeNodeAr[idx];
    //      if (candidate.IsActive) {
    //        toReturn = idx;
    //        break;
    //      }
    //    }
    //  } else {
    //    this.Logger.ErrorAndThrow(this.GetActiveNode.name, 'No tree data provided');
    //  }
    //  return toReturn;
    //}
    ContentTreeProxy.prototype.GetTreeNodeProxy = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var rootParent;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.AssociatedDoc) return [3 /*break*/, 4];
                        if (!this.rootTreeNodeHtmlElement) return [3 /*break*/, 2];
                        rootParent = this.rootTreeNodeHtmlElement.parentElement;
                        return [4 /*yield*/, this.RecipeBasics.WaitAndReturnFoundFromContainer(rootParent, InjectConst_1.ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeNodeGlyph, this.GetStateOfContentTreeNodeDeep.name)
                                .then(function (firstChildGlyphNode) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this._treeNodeProxy = new ScContentTreeNodeProxy_1.ScContentTreeNodeProxy(this.Logger, firstChildGlyphNode, 0, 0, 1);
                                            return [4 /*yield*/, this._treeNodeProxy.Instantiate()];
                                        case 1:
                                            _a.sent();
                                            if (this._treeNodeProxy) {
                                                this.Logger.Log('root found');
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.Logger.ErrorAndThrow(this.GetStateOfContentTreeNodeDeep.name, 'no root node');
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        this.Logger.ErrorAndThrow(this.GetStateOfContentTreeNodeDeep.name, 'no targetDoc');
                        _a.label = 5;
                    case 5:
                        //}
                        resolve(this._treeNodeProxy);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ContentTreeProxy.prototype.GetStateOfContentTreeNodeDeep = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.GetStateOfContentTreeNodeDeep.name);
                        return [4 /*yield*/, this.GetTreeNodeProxy()
                                .then(function (scContentTreeNodeProxy) { return scContentTreeNodeProxy.GetStateOfScContentTreeNodeDeep(); })
                                .then(function (stateOfScContentTreeNodeProxy) {
                                resolve(stateOfScContentTreeNodeProxy);
                            })
                                .catch(function (err) { return reject(_this.GetStateOfContentTreeNodeDeep.name + ' | ' + err); })];
                    case 1:
                        _a.sent();
                        this.Logger.FuncEnd(this.GetStateOfContentTreeNodeDeep.name);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return ContentTreeProxy;
}(LoggableBase_1.LoggableBase));
exports.ContentTreeProxy = ContentTreeProxy;
//# sourceMappingURL=ContentTreeProxy.js.map