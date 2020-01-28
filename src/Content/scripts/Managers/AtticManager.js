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
var _ManagerBase_1 = require("../_first/_ManagerBase");
var scWindowType_1 = require("../Enums/scWindowType");
var AtticManager = /** @class */ (function (_super) {
    __extends(AtticManager, _super);
    function AtticManager(xyyz) {
        var _this = _super.call(this, xyyz) || this;
        xyyz.debug.FuncStart(AtticManager.name);
        xyyz.debug.FuncEnd(AtticManager.name);
        return _this;
    }
    AtticManager.prototype.Init = function () {
        this.eventAwesome = new CustomEvent('awesome', { detail: 'some detail' });
    };
    //functioneventHandler(e) {
    //  console.log('this data is ' + e.detail);
    //}
    AtticManager.prototype.UpdateMenuCoords = function (menuData) {
        var settings = this.CurrentSettings();
        settings.MenuPrefs = menuData;
        this.StoreSettings(settings);
    };
    AtticManager.prototype.UpdateNickname = function (self) {
        self.debug().FuncStart(self.UpdateNickname.name);
        var targetId = self.UiMan().GetIdOfSelectWindowSnapshot();
        if (targetId) {
            var storageMatch = self.GetFromStorageById(targetId);
            if (storageMatch) {
                var newNickname = self.UiMan().GetValueInNickname();
                storageMatch.NickName = newNickname;
                self.WriteToStorage(storageMatch);
            }
        }
        self.debug().FuncEnd(self.UpdateNickname);
    };
    AtticManager.prototype.ToggleFavorite = function () {
        this.debug().FuncStart(this.ToggleFavorite.name);
        var targetId = this.UiMan().GetIdOfSelectWindowSnapshot();
        if (targetId) {
            var storageMatch = this.GetFromStorageById(targetId);
            if (storageMatch) {
                storageMatch.IsFavorite = !storageMatch.IsFavorite;
                this.WriteToStorage(storageMatch);
            }
        }
        this.debug().FuncEnd(this.ToggleFavorite.name);
    };
    AtticManager.prototype.DrawDebugDataPretty = function (source) {
        this.debug().FuncStart(this.DrawDebugDataPretty.name, 'source not null: ' + this.debug().IsNullOrUndefined(source));
        var allDebugData = this.__buildDebugDataPretty(source);
        allDebugData = allDebugData.concat(this.__drawSettings());
        for (var ldx = 0; ldx < allDebugData.length; ldx++) {
            this.Xyyz.FeedbackMan.WriteLine(allDebugData[ldx]);
        }
        this.debug().FuncEnd(this.DrawDebugDataPretty.name);
    };
    AtticManager.prototype.__drawSettings = function () {
        var toReturn = [];
        var settings = this.CurrentSettings();
        toReturn.push('----- Settings - Accordian ------');
        for (var idx = 0; idx < settings.Accordian.length; idx++) {
            toReturn.push(settings.Accordian[idx].ElemId + ':' + settings.Accordian[idx].isCollapsed.toString());
        }
        return toReturn;
    };
    AtticManager.prototype.__buildDebugDataPretty = function (dataOneWindow) {
        this.debug().FuncStart(this.__buildDebugDataPretty.name, 'data not null? ' + this.debug().IsNullOrUndefined(dataOneWindow));
        var toReturn = [];
        if (dataOneWindow) {
            toReturn.push('------ One Window Snap Shot Start -----');
            toReturn.push('Id: ' + dataOneWindow.Id);
            toReturn.push('TimeStamp: ' + dataOneWindow.TimeStamp);
            toReturn.push('CE Count: ' + dataOneWindow.AllCEAr.length);
            toReturn.push('Type: ' + scWindowType_1.scWindowType[dataOneWindow.WindowType]);
            toReturn.push('Nickname: ' + dataOneWindow.NickName);
            for (var jdx = 0; jdx < dataOneWindow.AllCEAr.length; jdx++) {
                toReturn.push('\t------ One CE Start -----');
                var dataOneCE = dataOneWindow.AllCEAr[jdx];
                toReturn.push('\tId: ' + dataOneCE.Id.asString);
                var allCeDebugDataAr = this.Xyyz.OneCEMan.GetDebugDataOneCE(dataOneCE);
                for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
                    toReturn.push('\t\t' + allCeDebugDataAr[kdx]);
                }
                toReturn.push('\t------ One CE End -----');
            }
            toReturn.push('------ One Window Snap Shot End -----');
            this.debug().FuncEnd(this.__buildDebugDataPretty.name);
        }
        else {
            this.debug().Error(this.__buildDebugDataPretty.name, 'missing data');
        }
        return toReturn;
    };
    AtticManager.prototype.__drawStorageRaw = function (ourData) {
        this.debug().FuncStart('DrawStorageRaw');
        for (var idx = 0; idx < ourData.length; idx++) {
            this.debug().Log('key: \t' + ourData[idx].key);
            this.debug().Log('data: \t' + ourData[idx].data);
            this.debug().Log('------------');
        }
        this.debug().FuncEnd('DrawStorageRaw');
    };
    AtticManager.prototype.__drawStoragePretty = function (ourData) {
        this.debug().FuncStart(this.__drawStoragePretty.name);
        this.Xyyz.FeedbackMan.ClearTextArea();
        for (var idx = 0; idx < ourData.length; idx++) {
            this.debug().Log('key: \t' + ourData[idx].key);
            var parsed = JSON.parse(ourData[idx].data);
            if (parsed) {
                this.DrawDebugDataPretty(parsed);
                this.debug().Log('------------');
            }
        }
        this.debug().FuncEnd(this.__drawStoragePretty.name);
    };
    AtticManager.prototype.UpdateAccodianState = function (needleKey, isCollapsed) {
        this.debug().FuncStart(this.UpdateAccodianState.name, needleKey + ' ' + isCollapsed);
        var settings = this.CurrentSettings();
        var accordianPairs = settings.Accordian;
        var found = null;
        for (var idx = 0; idx < accordianPairs.length; idx++) {
            var candidate = accordianPairs[idx];
            if (candidate.ElemId === needleKey) {
                found = true;
                candidate.isCollapsed = isCollapsed;
                break;
            }
        }
        if (!found) {
            var newSetting = {
                ElemId: needleKey,
                isCollapsed: isCollapsed
            };
            accordianPairs.push(newSetting);
        }
        this.StoreSettings(settings);
        this.debug().FuncStart(this.UpdateAccodianState.name);
    };
    AtticManager.prototype.StoreSettings = function (currentSettings) {
        //this.debug().FuncStart(this.StoreSettings.name);
        window.localStorage.setItem(this.Const().Storage.WindowRoot + this.Const().Storage.SettingsSuffix, JSON.stringify(currentSettings));
        //this.debug().FuncEnd(this.StoreSettings.name);
    };
    AtticManager.prototype.GetDefaultSettings = function () {
        var defaultDebugSettings = {
            KeepDialogOpen: this.Const().Storage.DefaultDebugKeepDialogOpen,
            ShowDebugData: this.Const().Storage.ShowDebugData,
        };
        var defaultMenuPrefs = {
            MenuHeight: null,
            MenuWidth: null,
            MenuX: null,
            MenuY: null
        };
        var toReturn = {
            DebugSettings: defaultDebugSettings,
            Accordian: [],
            MenuPrefs: defaultMenuPrefs
        };
        return toReturn;
    };
    AtticManager.prototype.CurrentSettings = function () {
        //this.debug().FuncStart(this.CurrentSettings.name);
        var defaultSettings = this.GetDefaultSettings();
        var toReturn;
        var settingsRaw = window.localStorage.getItem(this.Const().Storage.WindowRoot + this.Const().Storage.SettingsSuffix);
        //this.debug().LogVal('settingsRaw', settingsRaw);
        if (settingsRaw) {
            toReturn = JSON.parse(settingsRaw);
        }
        if (!toReturn) {
            toReturn = defaultSettings;
        }
        this.debug().NotNullCheck('toReturn', toReturn);
        if (!toReturn.DebugSettings) {
            toReturn.DebugSettings = defaultSettings.DebugSettings;
        }
        if (!toReturn.DebugSettings.KeepDialogOpen) {
            toReturn.DebugSettings.KeepDialogOpen = defaultSettings.DebugSettings.KeepDialogOpen;
        }
        if (!toReturn.DebugSettings.ShowDebugData) {
            toReturn.DebugSettings.ShowDebugData = defaultSettings.DebugSettings.ShowDebugData;
        }
        if (!toReturn.Accordian) {
            toReturn.Accordian = [];
        }
        if (!toReturn.MenuPrefs) {
            toReturn.MenuPrefs = defaultSettings.MenuPrefs;
        }
        //this.DebugSettings(toReturn);
        //this.debug().FuncEnd(this.CurrentSettings.name);
        return toReturn;
    };
    AtticManager.prototype.DebugSettings = function (toReturn) {
        this.debug().FuncStart(this.DebugSettings.name);
        this.debug().LogVal('Settings', JSON.stringify(toReturn));
        this.debug().FuncEnd(this.DebugSettings.name);
    };
    AtticManager.prototype.__getAllLocalStorageAsIOneStorageData = function () {
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
    AtticManager.prototype.WriteToStorage = function (dataOneWindow) {
        this.debug().FuncStart(this.WriteToStorage.name);
        var snapShotAsString = JSON.stringify(dataOneWindow);
        this.debug().Log('snapShotAsString: ' + snapShotAsString);
        window.localStorage.setItem(this.Const().Storage.WindowRoot + this.Const().Storage.SnapShotSuffix + dataOneWindow.Id.asString, snapShotAsString);
        this.UiMan().RefreshUi();
        this.debug().FuncEnd(this.WriteToStorage.name);
    };
    AtticManager.prototype.GetAllStorageAsIDataOneWindow = function () {
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
    AtticManager.prototype.RemoveOneFromStorage = function () {
        this.debug().FuncStart(this.RemoveOneFromStorage.name);
        var targetId = this.UiMan().GetIdOfSelectWindowSnapshot();
        if (targetId) {
            var storageMatch = this.GetFromStorageById(targetId);
            if (storageMatch) {
                var result = confirm('Remove ?: ' + this.Xyyz.Utilities.TimeNicknameFavStr(storageMatch));
                if (result === true) {
                    window.localStorage.removeItem(storageMatch.RawData.key);
                }
            }
        }
        this.UiMan().RefreshUi();
        this.debug().FuncEnd(this.RemoveOneFromStorage.name);
    };
    AtticManager.prototype.DrawStorage = function () {
        this.debug().FuncStart('DrawStorage');
        try {
            var ourData = this.__getAllLocalStorageAsIOneStorageData();
            if (ourData) {
                this.__drawStorageRaw(ourData);
                this.__drawStoragePretty(ourData);
            }
        }
        catch (e) {
            this.Xyyz.debug.Error(this.DrawStorage.name, e.message);
        }
        this.debug().FuncEnd('DrawStorage');
    };
    AtticManager.prototype.GetRawFromStorageById = function (needleId) {
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
    AtticManager.prototype.GetFromStorageById = function (needleId) {
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
    return AtticManager;
}(_ManagerBase_1.ContentManagerBase));
exports.AtticManager = AtticManager;
//# sourceMappingURL=AtticManager.js.map