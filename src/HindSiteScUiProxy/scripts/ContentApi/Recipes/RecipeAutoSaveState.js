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
exports.RecipeAutoSaveState = void 0;
var SnapShotFlavor_1 = require("../../../../Shared/scripts/Enums/SnapShotFlavor");
var LoggableBase_1 = require("../../Managers/LoggableBase");
var RecipeAutoSaveState = /** @class */ (function (_super) {
    __extends(RecipeAutoSaveState, _super);
    function RecipeAutoSaveState(logger, scUiProxy, atticAgent) {
        var _this = _super.call(this, logger) || this;
        _this.ScUiProxy = scUiProxy;
        _this.AtticAgent = atticAgent;
        return _this;
    }
    RecipeAutoSaveState.prototype.ExecuteAsync = function (windowStatePrior) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            this.ScUiProxy.GetStateOfSitecoreWindow(SnapShotFlavor_1.SnapShotFlavor.Autosave)
                                .then(function (windowStateNew) {
                                if (!_this.AreStateOfSitecoreWindowsEqual(windowStateNew, windowStatePrior)) {
                                    _this.Logger.Log('states are different, save snap shot');
                                    _this.AtticAgent.WriteStateOfSitecoreToStorage(windowStateNew);
                                }
                                else {
                                    _this.Logger.Log('states are same, no save');
                                }
                                resolve(windowStateNew);
                            })
                                .catch(function (err) { return reject(err); });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    RecipeAutoSaveState.prototype.AreStateOfContentTreeNodesEqual = function (stateOfTreeNodeA, stateOfTreeNodeB) {
        var toReturn = true;
        toReturn = toReturn && (((stateOfTreeNodeA === null) === (stateOfTreeNodeB === null)));
        if (stateOfTreeNodeA !== null) {
            toReturn = toReturn && (stateOfTreeNodeA.ItemId.Raw === stateOfTreeNodeB.ItemId.Raw);
            toReturn = toReturn && (stateOfTreeNodeA.IsActive === stateOfTreeNodeB.IsActive);
            toReturn = toReturn && (stateOfTreeNodeA.IsExpanded === stateOfTreeNodeB.IsExpanded);
        }
        this.Logger.LogVal(this.AreStateOfContentTreeNodesEqual.name, toReturn);
        return toReturn;
    };
    RecipeAutoSaveState.prototype.AreStatesOfTreeEqual = function (stateOfTreeA, stateOfTreeB) {
        var toReturn = true;
        toReturn = toReturn && (((stateOfTreeA === null) === (stateOfTreeB === null)));
        if (stateOfTreeA) {
            toReturn = toReturn && (stateOfTreeA.ActiveTreeNodeIndex === stateOfTreeB.ActiveTreeNodeIndex);
            for (var idx = 0; idx < stateOfTreeA.StateOfTreeNodes.length; idx++) {
                toReturn = toReturn && this.AreStateOfContentTreeNodesEqual(stateOfTreeA.StateOfTreeNodes[idx], stateOfTreeB.StateOfTreeNodes[idx]);
            }
        }
        this.Logger.LogVal(this.AreStatesOfTreeEqual.name, toReturn);
        return toReturn;
    };
    RecipeAutoSaveState.prototype.AreStatesOfContentEditorEqual = function (stateOfContentEditorA, stateOfContentEditorB) {
        var toReturn = true;
        toReturn = toReturn && (((stateOfContentEditorA === null) === (stateOfContentEditorB === null)));
        if (stateOfContentEditorA) {
            toReturn = toReturn && this.AreStatesOfTreeEqual(stateOfContentEditorA.StateOfTree, stateOfContentEditorB.StateOfTree);
        }
        this.Logger.LogVal(this.AreStatesOfContentEditorEqual.name, toReturn);
        return toReturn;
    };
    RecipeAutoSaveState.prototype.AreStatesOfFrameEqual = function (stateOfFrameA, stateOfFrameB) {
        var toReturn = true;
        toReturn = toReturn && (((stateOfFrameA === null) === (stateOfFrameB === null)));
        if (stateOfFrameA) {
            toReturn = toReturn && (stateOfFrameA.ZIndex === stateOfFrameB.ZIndex);
            toReturn = toReturn && this.AreStatesOfContentEditorEqual(stateOfFrameA.StateOfContentEditor, stateOfFrameB.StateOfContentEditor);
        }
        this.Logger.LogVal(this.AreStatesOfFrameEqual.name, toReturn);
        return toReturn;
    };
    RecipeAutoSaveState.prototype.AreStateOfSitecoreWindowsEqual = function (stateOfSitecoreWindowA, stateOfSitecoreWindowB) {
        this.Logger.FuncStart(this.AreDataSitecoreWindowStatesEqual.name);
        var toReturn = true;
        toReturn = toReturn && (((stateOfSitecoreWindowA === null) === (stateOfSitecoreWindowB === null)));
        toReturn = toReturn && this.AreDataSitecoreWindowStatesEqual(stateOfSitecoreWindowA.ScWindowStates, stateOfSitecoreWindowB.ScWindowStates);
        this.Logger.LogVal(this.AreStateOfSitecoreWindowsEqual.name, toReturn);
        this.Logger.FuncEnd(this.AreDataSitecoreWindowStatesEqual.name);
        return toReturn;
    };
    RecipeAutoSaveState.prototype.AreDataSitecoreWindowStatesEqual = function (stateOfSitecoreWindowA, stateOfSitecoreWindowB) {
        var toReturn = true;
        toReturn = toReturn && (((stateOfSitecoreWindowA === null) === (stateOfSitecoreWindowB === null)));
        if (stateOfSitecoreWindowA !== null) {
            toReturn = toReturn && this.AreStateOfDesktopTheSame(stateOfSitecoreWindowA.StateOfDesktop, stateOfSitecoreWindowB.StateOfDesktop);
            toReturn = toReturn && this.AreStatesOfContentEditorEqual(stateOfSitecoreWindowA.StateOfContentEditor, stateOfSitecoreWindowB.StateOfContentEditor);
        }
        this.Logger.LogVal(this.AreDataSitecoreWindowStatesEqual.name, toReturn);
        return toReturn;
    };
    RecipeAutoSaveState.prototype.AreStateOfDesktopTheSame = function (stateOfDesktopA, stateOfDesktopB) {
        var toReturn = true;
        //todo - this is a crude comparison and will not cover cases of different order
        toReturn = stateOfDesktopA.IndexOfActiveFrame === stateOfDesktopB.IndexOfActiveFrame;
        toReturn = toReturn && (stateOfDesktopA.StateOfDTFrames.length === stateOfDesktopB.StateOfDTFrames.length);
        if (toReturn && stateOfDesktopA.StateOfDTFrames.length > 0) {
            for (var idx = 0; idx < length; idx++) {
                toReturn = toReturn && this.AreStatesOfFrameEqual(stateOfDesktopA.StateOfDTFrames[idx], stateOfDesktopB.StateOfDTFrames[idx]);
            }
        }
        return toReturn;
    };
    return RecipeAutoSaveState;
}(LoggableBase_1.LoggableBase));
exports.RecipeAutoSaveState = RecipeAutoSaveState;
//# sourceMappingURL=RecipeAutoSaveState.js.map