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
var _ContentManagerBase_1 = require("../_first/_ContentManagerBase");
var IterationHelper_1 = require("../Classes/IterationHelper");
var OneCEManager = /** @class */ (function (_super) {
    __extends(OneCEManager, _super);
    function OneCEManager(xyyz) {
        return _super.call(this, xyyz) || this;
    }
    OneCEManager.prototype.WaitForNode = function (needleId, targetDoc, currentIteration, timeout, callbackOnComplete) {
        this.debug().FuncStart(this.WaitForNode.name, 'looking for guid: iter: ' + currentIteration + ' ' + needleId.asString + ' on ' + targetDoc.DocId.asShort);
        currentIteration--;
        var foundOnPage = targetDoc.Document.getElementById(needleId.asString);
        if (foundOnPage) {
            this.debug().Log('foundOnPage. Triggering callback on complete');
            this.__expandNode(foundOnPage);
            callbackOnComplete(foundOnPage);
        }
        else {
            if (currentIteration > 0) {
                this.debug().Log('not found on page...setting timeout: ' + timeout);
                var self = this;
                setTimeout(function () {
                    currentIteration = currentIteration - 1;
                    self.WaitForNode(needleId, targetDoc, currentIteration, timeout, callbackOnComplete);
                }, timeout);
            }
            else {
                this.debug().Log('Not Found. Triggering callback on complete');
                callbackOnComplete(null);
            }
        }
        this.debug().FuncEnd(this.WaitForNode.name);
    };
    OneCEManager.prototype.__activateNode = function (hotTreeNode) {
        this.debug().FuncStart(this.__activateNode.name);
        //var currentSrc = hotTreeNode.getAttribute('src');
        //this.debug().Log('currentSrc' + currentSrc);
        //if (currentSrc.indexOf(this.Const().Names.TreeMenuExpandedPng) < 0) {
        this.debug().Log('clicking it');
        hotTreeNode.click();
        //}
        this.debug().FuncEnd(this.__activateNode.name);
    };
    OneCEManager.prototype.__expandNode = function (foundOnPage) {
        this.debug().FuncStart(this.__expandNode.name);
        var currentSrc = foundOnPage.getAttribute('src');
        this.debug().Log('currentSrc' + currentSrc);
        if (currentSrc.indexOf(this.Const().Names.TreeMenuExpandedPng) < 0) {
            this.debug().Log('clicking it');
            foundOnPage.click();
        }
        this.debug().FuncEnd(this.__expandNode.name);
    };
    OneCEManager.prototype.__collapseNode = function (element) {
        var currentSrc = element.getAttribute('src');
        this.debug().Log('currentSrc' + currentSrc);
        if (currentSrc.indexOf(this.Const().Names.TreeMenuExpandedPng) > -1) {
            this.debug().Log('clicking it');
            element.click();
        }
    };
    OneCEManager.prototype.__collapseRootNode = function (targetCEDoc) {
        var rootElem = targetCEDoc.Document.getElementById(this.Const().ElemId.sc.SitecoreRootGlyphId);
        if (rootElem) {
            this.__collapseNode(rootElem);
        }
        else {
            this.debug().Error(this.__collapseRootNode.name, 'Root glyph not found ' + this.Const().ElemId.sc.SitecoreRootGlyphId);
        }
    };
    OneCEManager.prototype.WaitForAndRestoreOneNode = function (nextNode, dataOneDocTarget) {
        return __awaiter(this, void 0, void 0, function () {
            var treeGlyphTargetId, iterHelper, foundOnPageTreeGlyph, hotTreeNodeId, hotTreeNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.WaitForAndRestoreOneNode.name, dataOneDocTarget.DocId.asShort);
                        treeGlyphTargetId = this.Const().Names.SC.TreeGlyphPrefix + nextNode.NodeId.asString;
                        this.debug().Log('looking for: ' + treeGlyphTargetId + ' ' + nextNode.NodeFriendly + ' in ' + dataOneDocTarget.DocId.asShort);
                        this.debug().Log('document not null ' + (dataOneDocTarget.Document != null));
                        iterHelper = new IterationHelper_1.IterationHelper(this.Xyyz, this.WaitForAndRestoreOneNode.name);
                        foundOnPageTreeGlyph = null;
                        _a.label = 1;
                    case 1:
                        if (!(!foundOnPageTreeGlyph && iterHelper.DecrementAndKeepGoing())) return [3 /*break*/, 5];
                        this.debug().Log('looking for: *' + treeGlyphTargetId + '* ' + nextNode.NodeFriendly + ' in *' + dataOneDocTarget.DocId.asShort + '*');
                        foundOnPageTreeGlyph = dataOneDocTarget.Document.getElementById(treeGlyphTargetId);
                        if (!foundOnPageTreeGlyph) return [3 /*break*/, 2];
                        //this.debug().Log('Found it: ');
                        if (nextNode.IsExpanded) {
                            this.__expandNode(foundOnPageTreeGlyph);
                        }
                        if (nextNode.IsActive) {
                            hotTreeNodeId = this.Const().Names.SC.TreeNodePrefix + nextNode.NodeId.asString;
                            hotTreeNode = dataOneDocTarget.Document.getElementById(hotTreeNodeId);
                            if (hotTreeNode) {
                                this.__activateNode(hotTreeNode);
                            }
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        this.debug().Log('not Found...waiting: ');
                        return [4 /*yield*/, iterHelper.Wait()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 1];
                    case 5:
                        this.debug().FuncEnd(this.WaitForAndRestoreOneNode.name, dataOneDocTarget.DocId.asShort);
                        return [2 /*return*/];
                }
            });
        });
    };
    OneCEManager.prototype.WaitForAndRestoreManyAllNodes = function (storageData, dataOneDocTarget, iterHelper) {
        if (iterHelper === void 0) { iterHelper = null; }
        return __awaiter(this, void 0, void 0, function () {
            var nextNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.WaitForAndRestoreManyAllNodes.name, dataOneDocTarget.DocId.asShort);
                        if (!iterHelper) {
                            iterHelper = new IterationHelper_1.IterationHelper(this.Xyyz, this.WaitForAndRestoreManyAllNodes.name);
                        }
                        _a.label = 1;
                    case 1:
                        if (!(storageData.AllTreeNodeAr.length > 0 && iterHelper.DecrementAndKeepGoing())) return [3 /*break*/, 3];
                        nextNode = storageData.AllTreeNodeAr.shift();
                        return [4 /*yield*/, this.WaitForAndRestoreOneNode(nextNode, dataOneDocTarget)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        this.debug().FuncEnd(this.WaitForAndRestoreManyAllNodes.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    OneCEManager.prototype.RestoreCEStateAsync = function (dataToRestore, dataOneDocTarget) {
        return __awaiter(this, void 0, void 0, function () {
            var toReturn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.debug().FuncStart(this.RestoreCEStateAsync.name, dataOneDocTarget.DocId.asShort);
                        toReturn = false;
                        this.debug().Log('Node Count in storage data: ' + dataToRestore.AllTreeNodeAr.length);
                        return [4 /*yield*/, this.WaitForAndRestoreManyAllNodes(dataToRestore, dataOneDocTarget)];
                    case 1:
                        _a.sent();
                        this.debug().FuncEnd(this.RestoreCEStateAsync.name);
                        return [2 /*return*/, toReturn];
                }
            });
        });
    };
    OneCEManager.prototype.SaveStateOneContentEditor = function (id, dataOneDoc) {
        this.debug().FuncStart('SaveOneContentEditor');
        this.debug().Log('SaveOneContentEditor');
        ;
        this.debug().Log('docElem is null: ' + (dataOneDoc === null));
        ;
        var CeSnapShot = this.Xyyz.OneCEMan.MakeNewData(id);
        CeSnapShot.AllTreeNodeAr = this.Xyyz.OneTreeMan.GetOneLiveTreeData(dataOneDoc);
        this.Xyyz.OneWindowMan.PutCEDataToCurrentSnapShot(CeSnapShot);
        this.debug().FuncEnd('SaveOneContentEditor');
    };
    OneCEManager.prototype.MakeNewData = function (id) {
        this.debug().FuncStart('MakeNewData: ' + id);
        var toReturn = {
            Id: id,
            AllTreeNodeAr: []
        };
        this.debug().FuncEnd('MakeNewData: ' + id);
        return toReturn;
    };
    return OneCEManager;
}(_ContentManagerBase_1.ContentManagerBase));
exports.OneCEManager = OneCEManager;
//# sourceMappingURL=OneCEManager.js.map