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
var _ContentManagerBase_1 = require("../_first/_ContentManagerBase");
var scWindowType_1 = require("../Enums/scWindowType");
var ContentAtticManager = /** @class */ (function (_super) {
    __extends(ContentAtticManager, _super);
    //eventAwesome: CustomEvent<string>;
    function ContentAtticManager(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(ContentAtticManager.name);
        xyyz.debug.FuncEnd(ContentAtticManager.name);
        return _this;
    }
    ContentAtticManager.prototype.Init = function () {
    };
    //functioneventHandler(e) {
    //  console.log('this data is ' + e.detail);
    //}
    ContentAtticManager.prototype.UpdateNickname = function (payload) {
        this.debug().FuncStart(this.UpdateNickname.name);
        if (payload.idOfSelect) {
            var storageMatch = this.GetFromStorageById(payload.idOfSelect);
            if (storageMatch) {
                storageMatch.NickName = payload.NewNickname;
                this.WriteToStorage(storageMatch);
            }
        }
        this.debug().FuncEnd(this.UpdateNickname);
    };
    ContentAtticManager.prototype.ToggleFavorite = function (data) {
        this.debug().FuncStart(this.ToggleFavorite.name);
        if (data.idOfSelect) {
            var storageMatch = this.GetFromStorageById(data.idOfSelect);
            if (storageMatch) {
                storageMatch.IsFavorite = !storageMatch.IsFavorite;
                this.WriteToStorage(storageMatch);
            }
        }
        this.debug().FuncEnd(this.ToggleFavorite.name);
    };
    ContentAtticManager.prototype.WriteToStorage = function (dataOneWindow) {
        this.debug().FuncStart(this.WriteToStorage.name);
        var snapShotAsString = JSON.stringify(dataOneWindow);
        this.debug().Log('snapShotAsString: ' + snapShotAsString);
        window.localStorage.setItem(this.Const().Storage.WindowRoot + this.Const().Storage.SnapShotSuffix + dataOneWindow.Id.asString, snapShotAsString);
        this.debug().FuncEnd(this.WriteToStorage.name);
    };
    ContentAtticManager.prototype.GetFromStorageById = function (needleId) {
        this.debug().FuncStart(this.GetFromStorageById.name, needleId.asString);
        var foundStorage = this.GetAllStorageAsIDataOneWindow();
        var DateOneWinStoreMatch = null;
        if (foundStorage) {
            for (var idx = 0; idx < foundStorage.length; idx++) {
                var candidate = foundStorage[idx];
                if (candidate.Id.asString === needleId.asString) {
                    DateOneWinStoreMatch = candidate;
                    break;
                }
            }
        }
        if (DateOneWinStoreMatch) {
            this.debug().Log('found match', this.Utilites().TimeNicknameFavStr(DateOneWinStoreMatch));
        }
        else {
            this.debug().Error(this.GetFromStorageById.name, 'Match notfound');
        }
        this.debug().FuncEnd(this.GetFromStorageById.name);
        return DateOneWinStoreMatch;
    };
    ContentAtticManager.prototype.DebugSettings = function (toReturn) {
        this.debug().FuncStart(this.DebugSettings.name);
        this.debug().LogVal('Settings', JSON.stringify(toReturn));
        this.debug().FuncEnd(this.DebugSettings.name);
    };
    ContentAtticManager.prototype.__getAllLocalStorageAsIOneStorageData = function () {
        this.debug().FuncStart(this.__getAllLocalStorageAsIOneStorageData.name);
        var toReturn = [];
        for (var idx = 0; idx < window.localStorage.length; idx++) {
            var candidate = {
                data: '',
                key: '',
            };
            candidate.key = window.localStorage.key(idx);
            if (candidate.key.startsWith(this.Const().Storage.WindowRoot + this.Const().Storage.SnapShotSuffix)) {
                candidate.data = window.localStorage.getItem(candidate.key);
                toReturn.push(candidate);
            }
        }
        this.debug().FuncEnd(this.__getAllLocalStorageAsIOneStorageData.name);
        return toReturn;
    };
    ContentAtticManager.prototype.GetAllStorageAsIDataOneWindow = function () {
        this.debug().FuncStart(this.GetAllStorageAsIDataOneWindow.name);
        var toReturn = [];
        var rawStorageData = this.__getAllLocalStorageAsIOneStorageData();
        if (rawStorageData) {
            for (var idx = 0; idx < rawStorageData.length; idx++) {
                var oneRaw = rawStorageData[idx];
                var candidate = JSON.parse(oneRaw.data);
                if (candidate) {
                    candidate.TimeStamp = new Date(candidate.TimeStamp);
                    candidate.Id = this.Xyyz.GuidMan.ParseGuid(candidate.Id.asString);
                    candidate.RawData = oneRaw;
                    if (!candidate.WindowType) {
                        candidate.WindowType = scWindowType_1.scWindowType.Unknown;
                        candidate.WindowFriendly = scWindowType_1.scWindowType[candidate.WindowType];
                    }
                    if (!candidate.NickName) {
                        candidate.NickName = '';
                    }
                    toReturn.push(candidate);
                }
            }
        }
        toReturn.sort(function (a, b) {
            return +b.TimeStamp - +a.TimeStamp;
        });
        this.debug().FuncEnd(this.GetAllStorageAsIDataOneWindow.name);
        return toReturn;
    };
    ContentAtticManager.prototype.RemoveOneFromStorage = function (targetId) {
        this.debug().FuncStart(this.RemoveOneFromStorage.name);
        if (targetId) {
            var storageMatch = this.GetFromStorageById(targetId);
            if (storageMatch) {
                var result = confirm('Remove ?: ' + this.Xyyz.Utilities.TimeNicknameFavStr(storageMatch));
                if (result === true) {
                    window.localStorage.removeItem(storageMatch.RawData.key);
                }
            }
        }
        this.debug().FuncEnd(this.RemoveOneFromStorage.name);
    };
    ContentAtticManager.prototype.GetRawFromStorageById = function (needleId) {
        this.debug().FuncStart(this.GetRawFromStorageById.name, needleId.asString);
        var toReturn = null;
        var foundStorage = this.__getAllLocalStorageAsIOneStorageData();
        if (foundStorage) {
            for (var idx = 0; idx < foundStorage.length; idx++) {
                var candidate = foundStorage[idx];
                //if (candidate.key === needleId) {
                //}
            }
        }
        this.debug().FuncEnd(this.GetRawFromStorageById.name);
        return toReturn;
    };
    return ContentAtticManager;
}(_ContentManagerBase_1.ContentManagerBase));
exports.ContentAtticManager = ContentAtticManager;
//# sourceMappingURL=ContentAtticManager.js.map