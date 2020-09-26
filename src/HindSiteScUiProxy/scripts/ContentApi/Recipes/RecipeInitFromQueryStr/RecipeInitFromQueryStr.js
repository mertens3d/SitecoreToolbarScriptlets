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
exports.RecipeInitFromQueryStr = void 0;
var RecipeBasics_1 = require("../../../../../Shared/scripts/Classes/RecipeBasics");
var QueryStrKey_1 = require("../../../../../Shared/scripts/Enums/QueryStrKey");
var Guid_1 = require("../../../../../Shared/scripts/Helpers/Guid");
var GuidData_1 = require("../../../../../Shared/scripts/Helpers/GuidData");
var LoggableBase_1 = require("../../../Managers/LoggableBase");
var RecipeInitFromQueryStr = /** @class */ (function (_super) {
    __extends(RecipeInitFromQueryStr, _super);
    function RecipeInitFromQueryStr(logger, scUrlAgent, atticAgent, topLevelDoc, scWinRecipeParts, oneDesktopMan, contentEditorProxy) {
        var _this = _super.call(this, logger) || this;
        _this.ScUrlAgent = scUrlAgent;
        _this.RecipeBasics = new RecipeBasics_1.RecipeBasics(_this.Logger);
        _this.AtticAgent = atticAgent;
        _this.TopLevelDoc = topLevelDoc;
        _this.ScWinRecipeParts = scWinRecipeParts;
        _this.OneDesktopMan = oneDesktopMan;
        _this.OneCeAgent = contentEditorProxy;
        return _this;
    }
    RecipeInitFromQueryStr.prototype.Execute = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.InitFromQueryString()
                            .then(function () { return resolve(); })
                            .catch(function (err) { return reject(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    RecipeInitFromQueryStr.prototype.InitFromQueryString = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var qsValue, targetGuid, dataOneWindowStorage;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.Logger.FuncStart(this.InitFromQueryString.name);
                                    if (!this.ScUrlAgent.QueryStringHasKey(QueryStrKey_1.QueryStrKey.hsTargetSs)) return [3 /*break*/, 8];
                                    qsValue = (this.ScUrlAgent.GetQueryStringValueByKey(QueryStrKey_1.QueryStrKey.hsTargetSs));
                                    if (!Guid_1.Guid.IsValidGuidStr(qsValue)) return [3 /*break*/, 6];
                                    targetGuid = Guid_1.Guid.ParseGuid(qsValue, false);
                                    if (!(targetGuid && targetGuid !== GuidData_1.GuidData.GetEmptyGuid())) return [3 /*break*/, 4];
                                    this.Logger.LogVal("targetGuid", targetGuid.Raw);
                                    if (!this.TopLevelDoc) return [3 /*break*/, 2];
                                    dataOneWindowStorage = this.AtticAgent.GetFromStorageBySnapShotId(targetGuid);
                                    return [4 /*yield*/, this.RecipeBasics.WaitForReadyNABDocument(this.TopLevelDoc)
                                            .then(function () { return _this.ScWinRecipeParts.RestoreStateToTargetDoc(_this.TopLevelDoc, dataOneWindowStorage, _this.OneDesktopMan, _this.OneCeAgent); })
                                            .then(function () { return resolve(); })
                                            .catch(function (err) { return reject(_this.InitFromQueryString.name + ' | ' + err); })];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    reject(this.InitFromQueryString.name + ' no targetDoc');
                                    _a.label = 3;
                                case 3: return [3 /*break*/, 5];
                                case 4:
                                    reject('Either no snapshot provided or an illegal one was found');
                                    _a.label = 5;
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    this.Logger.Log('guid is not a valid guid');
                                    _a.label = 7;
                                case 7: return [3 /*break*/, 9];
                                case 8:
                                    this.Logger.Log('Does not have qs target');
                                    resolve();
                                    _a.label = 9;
                                case 9:
                                    this.Logger.FuncEnd(this.InitFromQueryString.name);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return RecipeInitFromQueryStr;
}(LoggableBase_1.LoggableBase));
exports.RecipeInitFromQueryStr = RecipeInitFromQueryStr;
//# sourceMappingURL=RecipeInitFromQueryStr.js.map