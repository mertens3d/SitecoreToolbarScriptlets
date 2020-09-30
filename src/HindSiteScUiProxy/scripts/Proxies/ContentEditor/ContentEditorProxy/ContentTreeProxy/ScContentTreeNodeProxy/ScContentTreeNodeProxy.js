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
exports.ScContentTreeNodeProxy = void 0;
var Guid_1 = require("../../../../../../../Shared/scripts/Helpers/Guid");
var InjectConst_1 = require("../../../../../../../Shared/scripts/Interfaces/InjectConst");
var LoggableBase_1 = require("../../../../../../../Shared/scripts/LoggableBase");
var RecipeBasics_1 = require("../../../../../../../Shared/scripts/Classes/RecipeBasics");
//scContentTreeNode is the name sitecore uses
var ScContentTreeNodeProxy = /** @class */ (function (_super) {
    __extends(ScContentTreeNodeProxy, _super);
    function ScContentTreeNodeProxy(logger, sourceElement, level, siblingIndex, totalSiblings) {
        var _this = _super.call(this, logger) || this;
        _this.StateOfScContentTreeNode = {
            // leave in this order to make it easier to debug when looking at the data in devtools. This is the order it will log out (and maybe store)
            FriendlyTreeNode: '',
            IsExpanded: false,
            IsActive: false,
            Coord: {
                LevelIndex: -1,
                LevelWidth: -1,
                SiblingIndex: -1
            },
            ItemId: null,
            IconSrc: '',
            MainIconSrc: '',
            TreeNodeChildren: [],
        };
        _this.HasBeenHarvested = false;
        if (sourceElement) {
            _this.StateOfScContentTreeNode.Coord.LevelWidth = totalSiblings;
            _this.StateOfScContentTreeNode.Coord.SiblingIndex = siblingIndex;
            _this.StateOfScContentTreeNode.Coord.LevelIndex = level;
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
        _this.RecipeBasics = new RecipeBasics_1.RecipeBasics(_this.Logger);
        return _this;
    }
    ScContentTreeNodeProxy.prototype.Instantiate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                }
                catch (e) {
                }
                return [2 /*return*/];
            });
        });
    };
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.RecipeBasics.WaitAndReturnFoundFromContainer(this.ScContentTreeNodeDivElem, ":scope > img", this.GetGlyphNodeElem.name)
                                        .then(function (htmlElement) {
                                        resolve(htmlElement);
                                    })
                                        .catch(function (err) {
                                        reject(_this.GetGlyphNodeElem.name + ' | ' + err);
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ScContentTreeNodeProxy.prototype.Friendly = function () {
        var toReturn = 'lvl: ' + this.StateOfScContentTreeNode.Coord.LevelIndex + ' Sib idx: ' + this.StateOfScContentTreeNode.Coord.SiblingIndex + ' tot sib: ' + this.StateOfScContentTreeNode.Coord.LevelWidth;
        return toReturn;
    };
    ScContentTreeNodeProxy.prototype.GetLinkNodeElem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.RecipeBasics.WaitAndReturnFoundFromContainer(this.ScContentTreeNodeDivElem, ":scope > a", this.Friendly())
                                        .then(function (htmlAnchorElement) {
                                        resolve(htmlAnchorElement);
                                    })
                                        .catch(function (err) {
                                        reject(_this.GetGlyphNodeElem.name + ' | ' + err);
                                    })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ScContentTreeNodeProxy.prototype.GetStateOfScContentTreeNode = function (includeChildren) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var stateOfChildrenAr;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.GetStateOfScContentTreeNode.name);
                                    stateOfChildrenAr = [];
                                    return [4 /*yield*/, this.HarvestNodeState()
                                            .then(function () {
                                            if (includeChildren) {
                                                _this.Children.forEach(function (child) { return stateOfChildrenAr.push(child.GetStateOfScContentTreeNodeDeep()); });
                                                _this.Logger.LogVal('children promiseAr length ', stateOfChildrenAr.length);
                                            }
                                        })
                                            .then(function () { return Promise.all(stateOfChildrenAr); })
                                            .then(function (result) {
                                            _this.StateOfScContentTreeNode.TreeNodeChildren = [];
                                            result.forEach(function (stateoOfScContentTreeNodeChild) {
                                                if (stateoOfScContentTreeNodeChild.IsActive || stateoOfScContentTreeNodeChild.IsExpanded) {
                                                    _this.StateOfScContentTreeNode.TreeNodeChildren.push(stateoOfScContentTreeNodeChild);
                                                }
                                            });
                                        })
                                            .then(function () { return resolve(_this.StateOfScContentTreeNode); })
                                            .catch(function (err) { return reject(_this.GetStateOfScContentTreeNode.name + ' | ' + err); })];
                                case 1:
                                    _a.sent();
                                    this.Logger.FuncEnd(this.GetStateOfScContentTreeNode.name);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ScContentTreeNodeProxy.prototype.GetStateOfScContentTreeNodeDeep = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.GetStateOfScContentTreeNode(true)
                                        .then(function (stateOfScContentTreeNodeDeep) { return resolve(stateOfScContentTreeNodeDeep); })
                                        .catch(function (err) { return reject(_this.GetStateOfScContentTreeNodeDeep.name + ' | ' + err); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ScContentTreeNodeProxy.prototype.GetStateOfScContentTreeNodeFlat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.GetStateOfScContentTreeNode(false)
                                        .then(function (stateOfScContentTreeNodeDeep) { return resolve(stateOfScContentTreeNodeDeep); })
                                        .catch(function (err) { return reject(_this.GetStateOfScContentTreeNodeDeep.name + ' | ' + err); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ScContentTreeNodeProxy.prototype.HarvestNodeState = function (forceRefreshData) {
        if (forceRefreshData === void 0) { forceRefreshData = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.HarvestNodeState.name, this.Friendly());
                                    if (!(!this.HasBeenHarvested || forceRefreshData)) return [3 /*break*/, 2];
                                    this.glyphElem = null;
                                    this.LinkNodeElem = null;
                                    this.Children = [];
                                    return [4 /*yield*/, this.GetLinkNodeElem()
                                            .then(function (htmlAnchorElement) {
                                            _this.Logger.Log('link found');
                                            _this.LinkNodeElem = htmlAnchorElement;
                                        })
                                            .then(function () { return _this.GetGlyphNodeElem(); })
                                            .then(function (htmlImageElement) {
                                            _this.Logger.Log('glyph found');
                                            _this.glyphElem = htmlImageElement;
                                        })
                                            .then(function () {
                                            _this.Logger.ThrowIfNullOrUndefined(_this.HarvestNodeState.name, [_this.LinkNodeElem, _this.glyphElem]);
                                            _this.StateOfScContentTreeNode.IsActive = _this.QueryIsActive(_this.LinkNodeElem);
                                            _this.StateOfScContentTreeNode.IsExpanded = _this.QueryIsExpanded(_this.glyphElem);
                                            _this.StateOfScContentTreeNode.FriendlyTreeNode = _this.GetNodeLinkText(_this.LinkNodeElem);
                                            _this.StateOfScContentTreeNode.ItemId = _this.GetApparentItemId(_this.glyphElem);
                                            _this.StateOfScContentTreeNode.IconSrc = _this.GetIconSrc();
                                            _this.StateOfScContentTreeNode.MainIconSrc = _this.GetMainIconSrc();
                                        })
                                            .then(function () { return _this.GetChildren(); })
                                            .then(function (children) {
                                            _this.Logger.LogVal('received child count', children.length);
                                            _this.Children = children;
                                        })
                                            //.then(() => this.Logger.LogAsJsonPretty('StateOfScContentTreeNodeProxy', this.StateOfScContentTreeNodeProxy))
                                            .then(function () { return resolve(); })
                                            .catch(function (err) {
                                            _this.Logger.ErrorAndThrow(_this.HarvestNodeState.name, err);
                                        })];
                                case 1:
                                    _a.sent();
                                    this.HasBeenHarvested = true;
                                    this.Logger.FuncStart(this.HarvestNodeState.name, this.Friendly());
                                    _a.label = 2;
                                case 2:
                                    ;
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ScContentTreeNodeProxy.prototype.GetApparentItemId = function (htmlImageElement) {
        var glyphNodeIdSuffix = htmlImageElement.id.replace(InjectConst_1.ContentConst.Const.Names.SC.TreeGlyphPrefix, '');
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
            toReturn = new ScContentTreeNodeProxy(this.Logger, candidate, 0, 0, 1);
        }
        else {
            this.Logger.Log('no candidate found');
        }
        return toReturn;
    };
    //IsSitecoreRootNode(): boolean {
    //  let toReturn: boolean = false;
    //  let apparentId = this.GetApparentItemId();
    //  if (apparentId) {
    //    toReturn = apparentId.Raw === ContentConst.Const.ElemId.sc.SitecoreRootApparentIdRaw;
    //  }
    //  return toReturn;
    //}
    ScContentTreeNodeProxy.prototype.GetChildren = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var toReturn_1 = [];
                var childNodes_1 = _this.ScContentTreeNodeDivElem.querySelectorAll(':scope > div > ' + InjectConst_1.ContentConst.Const.Selector.SC.ContentEditor.ScContentTreeNode); //targetNode.children;
                childNodes_1.forEach(function (childNode, index) {
                    toReturn_1.push(new ScContentTreeNodeProxy(_this.Logger, childNode, _this.StateOfScContentTreeNode.Coord.LevelIndex + 1, index, childNodes_1.length));
                });
                _this.Logger.LogVal(_this.GetChildren.name, toReturn_1.length.toString());
                resolve(toReturn_1);
            }
            catch (err) {
                reject(_this.GetChildren.name + ' | ' + err);
            }
            //let promiseAr: Promise<IStateOfScContentTreeNodeProxy>[];
            //toReturn.forEach((nodeJacket: ScContentTreeNodeProxy) => promiseAr.push(nodeJacket.GetStateOfScContentTreeNode()))
            //Promise.all(promiseAr);
            //.then((results: IScContentTreeNodeJacket))
            //let children: HTMLDivElement = this.ScContentTreeNodeDivElem.querySelector(ContentConst.Const.Selector.SC.ContentEditor.scContentTreeNodeIcon);
        });
    };
    ScContentTreeNodeProxy.prototype.GetMainIconSrc = function () {
        var toReturn;
        var penultimateNode = this;
        var penultimateElem = this.ScContentTreeNodeDivElem.closest('[id=ContentTreeActualSize] > .scContentTreeNode >  div > .scContentTreeNode');
        if (penultimateElem) {
            penultimateNode = new ScContentTreeNodeProxy(this.Logger, penultimateElem, 0, 0, 1);
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
        if (newData.IsActive) {
            var hotTreeNodeId = InjectConst_1.ContentConst.Const.Names.SC.TreeGlyphPrefix + Guid_1.Guid.WithoutDashes(newData.ItemId);
            var hotTreeNode = this.ScContentTreeNodeDivElem.querySelector('[id=' + hotTreeNodeId + ']');
            if (hotTreeNode) {
                var hotTreeNodeProxy = new ScContentTreeNodeProxy(this.Logger, hotTreeNode, 0, 0, 1);
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
    ScContentTreeNodeProxy.prototype.QueryIsActive = function (linkNodeElem) {
        var classList = linkNodeElem.classList;
        this.Logger.LogAsJsonPretty('htmlElement.classList', linkNodeElem.classList);
        var toReturn = classList.contains(InjectConst_1.ContentConst.Const.ClassNames.SC.scContentTreeNodeActive);
        return toReturn;
    };
    ScContentTreeNodeProxy.prototype.ActivateNode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.ActivateNode.name);
                                    return [4 /*yield*/, this.HarvestNodeState()
                                            .then(function () {
                                            _this.Logger.Log('activating node');
                                            _this.LinkNodeElem.click();
                                        })
                                            // check and reset the data
                                            .then(function () { return _this.HarvestNodeState(true); })
                                            .then(function () {
                                            if (!_this.StateOfScContentTreeNode.IsActive) {
                                                _this.Logger.WarningAndContinue(_this.ActivateNode.name, 'Did not work. Trying to activate: ');
                                            }
                                        })
                                            .catch(function (err) { return reject(_this.ActivateNode.name + ' | ' + err); })];
                                case 1:
                                    _a.sent();
                                    this.Logger.FuncEnd(this.ActivateNode.name);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.HarvestNodeState(true)
                                .then(function () {
                                if (!_this.StateOfScContentTreeNode.IsExpanded) {
                                    _this.glyphElem.click();
                                }
                            })
                                .catch(function (err) { return _this.Logger.ErrorAndThrow(_this.ExpandNode.name, err); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        this.Logger.ErrorAndThrow(this.ExpandNode.name, err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ScContentTreeNodeProxy.prototype.GetNodeLinkText = function (htmlElement) {
        return htmlElement.innerText;
    };
    ScContentTreeNodeProxy.prototype.IsContentTreeNode = function () {
        var toReturn = false;
        var className = this.ScContentTreeNodeDivElem.className;
        toReturn = className === InjectConst_1.ContentConst.Const.ClassNames.SC.ContentTreeNode;
        return toReturn;
    };
    ScContentTreeNodeProxy.prototype.QueryIsExpanded = function (glyphHtmlImageElement) {
        var toReturn = false;
        var srcAttr = glyphHtmlImageElement.getAttribute('src');
        if (srcAttr !== null) {
            if (srcAttr.indexOf(InjectConst_1.ContentConst.Const.Names.SC.TreeExpandedPng.sc920) > -1) {
                toReturn = true;
            }
        }
        return toReturn;
    };
    return ScContentTreeNodeProxy;
}(LoggableBase_1.LoggableBase));
exports.ScContentTreeNodeProxy = ScContentTreeNodeProxy;
//# sourceMappingURL=ScContentTreeNodeProxy.js.map