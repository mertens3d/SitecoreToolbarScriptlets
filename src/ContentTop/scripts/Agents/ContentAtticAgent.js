"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
exports.ContentAtticAgent = void 0;
var DefaultFriendly_1 = require("../../../Shared/scripts/Classes/Defaults/DefaultFriendly");
var DefaultMetaData_1 = require("../../../Shared/scripts/Classes/Defaults/DefaultMetaData");
var DefaultStateOfSnapshots_1 = require("../../../Shared/scripts/Classes/Defaults/DefaultStateOfSnapshots");
var _50___scWindowType_1 = require("../../../Shared/scripts/Enums/50 - scWindowType");
var SnapShotFlavor_1 = require("../../../Shared/scripts/Enums/SnapShotFlavor");
var InjectConst_1 = require("../../../Shared/scripts/Interfaces/InjectConst");
var _HindeCoreBase_1 = require("../../../Shared/scripts/_HindeCoreBase");
var ContentAtticAgent = /** @class */ (function (_super) {
    __extends(ContentAtticAgent, _super);
    function ContentAtticAgent(repoAgent, hindeCore) {
        var _this = _super.call(this, hindeCore) || this;
        _this.Logger.CTORStart(ContentAtticAgent.name);
        _this.RepoAgent = repoAgent;
        _this.Logger.CTOREnd(ContentAtticAgent.name);
        return _this;
    }
    ContentAtticAgent.prototype.InitContentAtticManager = function (settingAutoSnapshotRetainDays) {
        this.SettingAutoSnapshotRetainDays = settingAutoSnapshotRetainDays;
    };
    ContentAtticAgent.prototype.WriteStateOfSitecoreToStorage = function (stateOfSitecoreWindow) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var storageKey, snapShotAsString;
                        return __generator(this, function (_a) {
                            this.Logger.FuncStart(this.WriteStateOfSitecoreToStorage.name);
                            storageKey = InjectConst_1.ContentConst.Const.Storage.WindowRoot + InjectConst_1.ContentConst.Const.Storage.SnapShotPrefix + stateOfSitecoreWindow.Meta.SessionId + '.' + stateOfSitecoreWindow.Meta.TimeStamp.valueOf();
                            stateOfSitecoreWindow.Meta.StorageKey = storageKey;
                            snapShotAsString = JSON.stringify(stateOfSitecoreWindow);
                            this.RepoAgent.WriteByKey(stateOfSitecoreWindow.Meta.StorageKey, snapShotAsString);
                            this.CleanOutOldAutoSavedData();
                            resolve();
                            this.Logger.FuncEnd(this.WriteStateOfSitecoreToStorage.name);
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    ContentAtticAgent.prototype.GetFromStorageBySnapShotId = function (needleId) {
        this.Logger.FuncStart(this.GetFromStorageBySnapShotId.name, needleId.Raw);
        var DateOneWinStoreMatch = null;
        var foundStorage = this.GetStateOfStorageSnapShots();
        for (var idx = 0; idx < foundStorage.SnapShots.length; idx++) {
            var candidate = foundStorage.SnapShots[idx];
            if (candidate.Meta.SnapshotId.Raw === needleId.Raw) {
                DateOneWinStoreMatch = candidate;
                break;
            }
        }
        if (!DateOneWinStoreMatch) {
            this.ErrorHand.WarningAndContinue(this.GetFromStorageBySnapShotId.name, 'No match found for: ' + needleId.Raw);
        }
        this.Logger.FuncEnd(this.GetFromStorageBySnapShotId.name);
        return DateOneWinStoreMatch;
    };
    ContentAtticAgent.prototype.ValidateStorageData = function (oneRaw) {
        var candidate = JSON.parse(oneRaw.data);
        if (candidate) {
            if (!candidate.Meta) {
                candidate.Meta = new DefaultMetaData_1.DefaultMetaData();
            }
            candidate.Meta.TimeStamp = new Date(candidate.Meta.TimeStamp);
            if (!candidate.Meta.WindowType) {
                candidate.Meta.WindowType = _50___scWindowType_1.ScWindowType.Unknown;
                candidate.Friendly.WindowType = _50___scWindowType_1.ScWindowType[candidate.Meta.WindowType];
            }
            if (!candidate.Friendly) {
                candidate.Friendly = new DefaultFriendly_1.DefaultFriendly();
            }
            if (!candidate.Friendly.NickName) {
                candidate.Friendly.NickName = '';
            }
        }
        else {
            this.ErrorHand.HandleFatalError(this.ValidateStorageData.name, 'Saved data did not import correctly');
        }
        return candidate;
    };
    ContentAtticAgent.prototype.GetAllLocalStorageAsIOneStorageData = function () {
        var prefix = InjectConst_1.ContentConst.Const.Storage.WindowRoot + InjectConst_1.ContentConst.Const.Storage.SnapShotPrefix;
        var result = this.RepoAgent.GetBulkLocalStorageByKeyPrefix(prefix);
        return result;
    };
    ContentAtticAgent.prototype.GetAllStorage = function () {
        var toReturn = [];
        var rawStorageData = this.GetAllLocalStorageAsIOneStorageData();
        if (rawStorageData) {
            for (var idx = 0; idx < rawStorageData.length; idx++) {
                toReturn.push(this.ValidateStorageData(rawStorageData[idx]));
            }
        }
        toReturn.sort(function (a, b) {
            return +b.Meta.TimeStamp - +a.Meta.TimeStamp;
        });
        toReturn = this.FilterOutOldData(toReturn);
        return toReturn;
    };
    ContentAtticAgent.prototype.CleanOneStorageItem = function (candidate, autoCount) {
        var maxAutoSaveDiff = this.SettingAutoSnapshotRetainDays * 24 * 60 * 60 * 1000;
        var deleteFlag = false;
        var now = new Date();
        if (candidate.Meta.Flavor == SnapShotFlavor_1.SnapShotFlavor.Autosave) {
            if (autoCount > InjectConst_1.ContentConst.Const.MaxAutoToSaveCount) {
                this.Logger.LogVal('Delete (max count :' + InjectConst_1.ContentConst.Const.MaxAutoToSaveCount + ')', candidate.Meta.TimeStamp.toString());
                deleteFlag = true;
            }
            autoCount++;
        }
        if (now.getTime() - candidate.Meta.TimeStamp.getTime() > maxAutoSaveDiff) {
            this.Logger.LogVal('Delete (Old : max' + InjectConst_1.ContentConst.Const.DefaultMaxAutoSaveAgeDays + ' days)', candidate.Meta.TimeStamp.toString());
            deleteFlag = true;
        }
        if (deleteFlag) {
            try {
                this.Logger.LogVal('Cleaning old autosave', candidate.Meta.SnapshotId);
                window.localStorage.removeItem(candidate.Meta.StorageKey);
            }
            catch (e) {
                this.ErrorHand.HandleFatalError(this.CleanOutOldAutoSavedData.name, 'unable to delete key: ' + candidate.Meta.SnapshotId);
            }
        }
        return autoCount;
    };
    ContentAtticAgent.prototype.CleanFoundStorage = function (currentWindowStorage) {
        try {
            if (currentWindowStorage) {
                var cacheLength = currentWindowStorage.SnapShots.length;
                var autoCount = 0;
                for (var idx = 0; idx < cacheLength; idx++) {
                    var candidate = currentWindowStorage.SnapShots[idx];
                    autoCount = this.CleanOneStorageItem(candidate, autoCount);
                }
            }
        }
        catch (err) {
            this.ErrorHand.HandleFatalError(this.CleanFoundStorage.name, err);
        }
    };
    ContentAtticAgent.prototype.CleanOutOldAutoSavedData = function () {
        this.Logger.FuncStart(this.CleanOutOldAutoSavedData.name);
        try {
            if (!this.SettingAutoSnapshotRetainDays || this.SettingAutoSnapshotRetainDays < 1) {
                this.SettingAutoSnapshotRetainDays = InjectConst_1.ContentConst.Const.DefaultMaxAutoSaveAgeDays;
            }
            var currentWindowStorage = this.GetStateOfStorageSnapShots();
            this.CleanFoundStorage(currentWindowStorage);
        }
        catch (err) {
            throw (this.CleanOutOldAutoSavedData.name, err);
        }
        this.Logger.FuncEnd(this.CleanOutOldAutoSavedData.name);
    };
    ContentAtticAgent.prototype.GetStateOfStorageSnapShots = function () {
        this.Logger.FuncStart(this.GetStateOfStorageSnapShots.name);
        var stateOfSnapshotStorage = new DefaultStateOfSnapshots_1.DefaultStateOfStorageSnapshots();
        var result = this.GetAllStorage();
        stateOfSnapshotStorage.SnapShots = result;
        stateOfSnapshotStorage.CreationDate = new Date();
        this.UpdateCounts(stateOfSnapshotStorage);
        this.Logger.FuncEnd(this.GetStateOfStorageSnapShots.name);
        return stateOfSnapshotStorage;
    };
    ContentAtticAgent.prototype.UpdateCounts = function (storageAllSnapshots) {
        storageAllSnapshots.FavoriteCount = 0;
        storageAllSnapshots.SnapShotsAutoCount = 0;
        storageAllSnapshots.PlainCount = 0;
        for (var idx = 0; idx < storageAllSnapshots.SnapShots.length; idx++) {
            var candidate = storageAllSnapshots.SnapShots[idx];
            if (candidate.Meta.Flavor === SnapShotFlavor_1.SnapShotFlavor.Autosave) {
                storageAllSnapshots.SnapShotsAutoCount++;
            }
            else if (candidate.Meta.Flavor === SnapShotFlavor_1.SnapShotFlavor.Favorite) {
                storageAllSnapshots.FavoriteCount++;
            }
            else {
                storageAllSnapshots.PlainCount++;
            }
        }
    };
    ContentAtticAgent.prototype.FilterOutOldData = function (data) {
        var toReturn = data;
        return toReturn;
    };
    ContentAtticAgent.prototype.RemoveAndConfirmRemoval = function (storageMatch) {
        this.Logger.LogVal('Key to Delete', storageMatch.Meta.SnapshotId);
        var storageKey = storageMatch.Meta.StorageKey;
        this.RepoAgent.RemoveByKey(storageKey);
        var result = this.RepoAgent.ReadDataOfKey(storageKey);
        if (result) {
            this.ErrorHand.HandleFatalError(this.RemoveAndConfirmRemoval.name, 'Snapshot still exists after deleting');
        }
    };
    ContentAtticAgent.prototype.RemoveSnapshotFromStorageById = function (targetId) {
        return __awaiter(this, void 0, void 0, function () {
            var storageMatch;
            return __generator(this, function (_a) {
                this.Logger.FuncStart(this.RemoveSnapshotFromStorageById.name);
                try {
                    if (targetId) {
                        storageMatch = this.GetFromStorageBySnapShotId(targetId);
                        if (storageMatch) {
                            this.RemoveAndConfirmRemoval(storageMatch);
                        }
                        else {
                            this.ErrorHand.WarningAndContinue(this.RemoveSnapshotFromStorageById.name, 'no storage match');
                        }
                    }
                    else {
                        this.ErrorHand.WarningAndContinue(this.RemoveSnapshotFromStorageById.name, 'no target id');
                    }
                }
                catch (err) {
                    this.ErrorHand.HandleFatalError(this.RemoveSnapshotFromStorageById.name, err);
                }
                this.Logger.FuncEnd(this.RemoveSnapshotFromStorageById.name);
                return [2 /*return*/];
            });
        });
    };
    return ContentAtticAgent;
}(_HindeCoreBase_1._FrontBase));
exports.ContentAtticAgent = ContentAtticAgent;
//# sourceMappingURL=ContentAtticAgent.js.map