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
exports.ContentEditorProxy = void 0;
var DefaultStateOfContentEditor_1 = require("../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfContentEditor");
var RecipeBasics_1 = require("../../../../../Shared/scripts/Classes/RecipeBasics");
var Guid_1 = require("../../../../../Shared/scripts/Helpers/Guid");
var InjectConst_1 = require("../../../../../Shared/scripts/Interfaces/InjectConst");
var SharedConst_1 = require("../../../../../Shared/scripts/SharedConst");
var LoggableBase_1 = require("../../../Managers/LoggableBase");
var TreeMutationEvent_Observer_1 = require("../../Desktop/DesktopProxy/Events/TreeMutationEvent/TreeMutationEvent_Observer");
var ContentEditorTreeProxy_1 = require("../ContentEditorTreeProxy/ContentEditorTreeProxy");
var ContentEditorProxyMutationEvent_Subject_1 = require("../../Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Subject");
var InitResultContentEditorProxy_1 = require("../../../../../Shared/scripts/Interfaces/Agents/InitResultContentEditorProxy");
var ContentEditorProxy = /** @class */ (function (_super) {
    __extends(ContentEditorProxy, _super);
    function ContentEditorProxy(associatedDoc, logger) {
        var _this = _super.call(this, logger) || this;
        _this.AssociatedHindsiteId = Guid_1.Guid.NewRandomGuid();
        _this.AssociatedDoc = associatedDoc;
        _this.ValidateAssociatedDocContentEditor();
        return _this;
    }
    ContentEditorProxy.prototype.OnReadyInitContentEditorProxy = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var initResultContentEditorProxy, recipeBasic;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        initResultContentEditorProxy = new InitResultContentEditorProxy_1.InitResultContentEditorProxy();
                        recipeBasic = new RecipeBasics_1.RecipeBasics(this.Logger);
                        return [4 /*yield*/, recipeBasic.WaitForReadyNABDocument(this.AssociatedDoc)
                                .then(function () {
                                _this.ChildTreeProxy = new ContentEditorTreeProxy_1.TreeProxy(_this.Logger, _this.AssociatedDoc, _this.GetTreeContainer());
                                initResultContentEditorProxy.InitResultTreeProxy = _this.ChildTreeProxy.OnReadyInitTreeProxy();
                                _this.ContentEditorProxyMutationEvent_Subject = new ContentEditorProxyMutationEvent_Subject_1.ContentEditorProxyMutationEvent_Subject(_this.Logger);
                                _this.TreeMutationEvent_Observer = new TreeMutationEvent_Observer_1.TreeMutationEvent_Observer(_this.Logger, _this);
                                if (_this.ChildTreeProxy) {
                                    _this.ChildTreeProxy.TreeMutationEvent_Subject.RegisterObserver(_this.TreeMutationEvent_Observer);
                                }
                                else {
                                    _this.Logger.ErrorAndThrow(_this.OnReadyInitContentEditorProxy.name, 'no child tree found');
                                }
                                initResultContentEditorProxy.ContentEditorProxyInitialized = true;
                            })
                                .then(function () { return resolve(initResultContentEditorProxy); })
                                .catch(function (err) { return reject(_this.OnReadyInitContentEditorProxy.name + ' | ' + err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ContentEditorProxy.prototype.GetTreeContainer = function () {
        return this.AssociatedDoc.ContentDoc.querySelector(InjectConst_1.ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeContainer);
    };
    ContentEditorProxy.prototype.ContentEditorProxyOnTreeMutationEvent = function (payload) {
        var contentEditorProxyMutationEvent_Payload = {
            AddedIframes: [],
            MutatedElement: null,
            TreeMutation: payload,
            ContentEditorProxy: this
        };
        if (this.ContentEditorProxyMutationEvent_Subject) {
            this.ContentEditorProxyMutationEvent_Subject.NotifyObservers(contentEditorProxyMutationEvent_Payload);
        }
    };
    ContentEditorProxy.prototype.GetStateOfContentEditor = function () {
        {
            var toReturnStateOfContentEditor = new DefaultStateOfContentEditor_1.DefaultStateOfContentEditor();
            toReturnStateOfContentEditor.StateOfTree = this.ChildTreeProxy.GetStateOfTree();
            return toReturnStateOfContentEditor;
        }
    };
    ContentEditorProxy.prototype.ValidateAssociatedDocContentEditor = function () {
        if (!this.AssociatedDoc) {
            this.Logger.ErrorAndThrow(this.ValidateAssociatedDocContentEditor.name, 'No doc provided');
        }
        else if (!this.AssociatedDoc.ContentDoc) {
            this.Logger.ErrorAndThrow(this.ValidateAssociatedDocContentEditor.name, 'No content doc');
        }
        else if (!this.AssociatedDoc.ContentDoc.URL) {
            this.Logger.ErrorAndThrow(this.ValidateAssociatedDocContentEditor.name, 'No URL');
        }
        else if (this.AssociatedDoc.ContentDoc.URL === SharedConst_1.SharedConst.Const.UrlSuffix.AboutBlank) {
            this.Logger.ErrorAndThrow(this.ValidateAssociatedDocContentEditor.name, SharedConst_1.SharedConst.Const.UrlSuffix.AboutBlank + ' not allowed');
        }
    };
    ContentEditorProxy.prototype.WaitForReadyContentEditor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var recipeBasics, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.Logger.FuncStart(this.WaitForReadyContentEditor.name);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        recipeBasics = new RecipeBasics_1.RecipeBasics(this.Logger);
                        return [4 /*yield*/, recipeBasics.WaitForReadyNABDocument(this.AssociatedDoc)
                                .catch(function (err) { return _this.Logger.ErrorAndThrow(_this.WaitForReadyContentEditor.name, err); })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        this.Logger.FuncEnd(this.WaitForReadyContentEditor.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    ContentEditorProxy.prototype.RegisterObserverForTreeMutation = function (treeMutationEvent_Observer) {
        this.Logger.FuncStart(this.RegisterObserverForTreeMutation.name);
        if (this.ChildTreeProxy) {
            treeMutationEvent_Observer.SetAssociatedContentEditorProxy(this);
            this.ChildTreeProxy.TreeMutationEvent_Subject.RegisterObserver(treeMutationEvent_Observer);
        }
        else {
            this.Logger.WarningAndContinue(this.RegisterObserverForTreeMutation.name, 'no associated tree proxy');
        }
        this.Logger.FuncEnd(this.RegisterObserverForTreeMutation.name);
    };
    ContentEditorProxy.prototype.SetCompactCss = function () {
        this.Logger.FuncStart(this.SetCompactCss.name, Guid_1.Guid.AsShort(this.AssociatedDoc.DocId));
        //  browser.tabs.insertCSS(ass integer tabId, object details, function callback);
        this.Logger.FuncStart(this.SetCompactCss.name, Guid_1.Guid.AsShort(this.AssociatedDoc.DocId));
    };
    ContentEditorProxy.prototype.SetStateOfContentEditor = function (dataToRestore) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.SetStateOfContentEditor.name, Guid_1.Guid.AsShort(this.AssociatedDoc.DocId));
                                    this.Logger.Log('Node Count in storage data: ' + dataToRestore.StateOfTree.StateOfTreeNodes.length);
                                    return [4 /*yield*/, this.ChildTreeProxy.SetStateOfTree(dataToRestore.StateOfTree)
                                            .then(function () { return resolve(true); })
                                            .catch(function (err) { return reject(_this.SetStateOfContentEditor.name + " " + err); })];
                                case 1:
                                    _a.sent();
                                    this.Logger.FuncEnd(this.SetStateOfContentEditor.name);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ContentEditorProxy.prototype.GetActiveNode = function (allTreeNodeAr) {
        this.Logger.FuncStart(this.GetActiveNode.name);
        var toReturn = null;
        if (allTreeNodeAr) {
            for (var idx = 0; idx < allTreeNodeAr.length; idx++) {
                var candidate = allTreeNodeAr[idx];
                if (candidate.IsActive) {
                    toReturn = candidate;
                    break;
                }
            }
        }
        else {
            this.Logger.ErrorAndThrow(this.GetActiveNode.name, 'No tree data provided');
        }
        this.Logger.FuncEnd(this.GetActiveNode.name, toReturn.FriendlyTreeNode);
        return toReturn;
    };
    return ContentEditorProxy;
}(LoggableBase_1.LoggableBase));
exports.ContentEditorProxy = ContentEditorProxy;
//# sourceMappingURL=ContentEditorProxy.js.map