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
exports.RecipeChangeNickName = void 0;
var SnapShotFlavor_1 = require("../../../../../Shared/scripts/Enums/SnapShotFlavor");
var __RecipeBase_1 = require("../__RecipeBase/__RecipeBase");
var StaticHelpers_1 = require("../../../../../Shared/scripts/Classes/StaticHelpers");
var RecipeChangeNickName = /** @class */ (function (_super) {
    __extends(RecipeChangeNickName, _super);
    function RecipeChangeNickName(commandData) {
        var _this = _super.call(this, commandData) || this;
        _this.NewNickname = commandData.NewNickName;
        _this.TargetSnapShotId = commandData.TargetSnapShotId;
        _this.AtticAgent = commandData.AtticAgent;
        if (StaticHelpers_1.StaticHelpers.IsNullOrUndefined([_this.NewNickname, _this.TargetSnapShotId, _this.AtticAgent])) {
            _this.Logger.ErrorAndThrow(RecipeChangeNickName.name, 'Null check');
        }
        return _this;
    }
    RecipeChangeNickName.prototype.Execute = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.UpdateNickname()
                    .then(function () { return resolve(); })
                    .catch(function (err) { return reject(err); });
                return [2 /*return*/];
            });
        }); });
    };
    RecipeChangeNickName.prototype.UpdateNickname = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var storageMatch;
            return __generator(this, function (_a) {
                this.Logger.FuncStart(this.UpdateNickname.name);
                if (this.TargetSnapShotId) {
                    if (this.NewNickname) {
                        storageMatch = this.AtticAgent.GetFromStorageBySnapShotId(this.TargetSnapShotId);
                        if (storageMatch) {
                            if ((storageMatch.Meta.Flavor === SnapShotFlavor_1.SnapShotFlavor.Autosave
                                ||
                                    (storageMatch.Meta.Flavor === SnapShotFlavor_1.SnapShotFlavor.Unknown))) {
                                storageMatch.Meta.Flavor = SnapShotFlavor_1.SnapShotFlavor.Manual;
                            }
                            storageMatch.Friendly.NickName = this.NewNickname; // this.CommandData.PayloadData.SnapShotSettings.SnapShotNewNickname;
                        }
                        else {
                            reject(this.UpdateNickname.name + ' - No storage match');
                        }
                        this.AtticAgent.WriteStateOfSitecoreToStorage(storageMatch);
                        resolve();
                    }
                    else {
                        reject(this.UpdateNickname.name + ' - something was missing');
                    }
                }
                else {
                    reject(this.UpdateNickname.name + ' no payload or id');
                }
                this.Logger.FuncEnd(this.UpdateNickname.name);
                return [2 /*return*/];
            });
        }); });
    };
    return RecipeChangeNickName;
}(__RecipeBase_1.__RecipeBase));
exports.RecipeChangeNickName = RecipeChangeNickName;
//# sourceMappingURL=RecipeChangeNickName.js.map