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
var PopUpManagerBase_1 = require("./PopUpManagerBase");
var PopUpAtticManager = /** @class */ (function (_super) {
    __extends(PopUpAtticManager, _super);
    function PopUpAtticManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopUpAtticManager.prototype.Init = function () {
        var prefs = this.CurrentSettings().MenuPrefs;
        if (prefs.MenuX && prefs.MenuY) {
            var currentX = window.screenLeft;
            var currentY = window.screenTop;
            var deltaX = Math.abs(prefs.MenuX - currentX);
            var deltaY = Math.abs(prefs.MenuY - currentY);
            window.moveTo(Math.abs(prefs.MenuX), Math.abs(prefs.MenuY));
        }
        if (prefs.MenuWidth && prefs.MenuHeight) {
            if (prefs.MenuHeight < this.PopConst().Numbers.MinMenuHeight) {
                prefs.MenuHeight = this.PopConst().Numbers.MinMenuHeight;
            }
            if (prefs.MenuWidth < this.PopConst().Numbers.MinMenuWidth) {
                prefs.MenuWidth = this.PopConst().Numbers.MinMenuWidth;
            }
            window.resizeTo(Math.abs(prefs.MenuWidth), Math.abs(prefs.MenuHeight));
        }
    };
    PopUpAtticManager.prototype.UpdateMenuCoords = function (menuData) {
        var settings = this.CurrentSettings();
        settings.MenuPrefs = menuData;
        this.StoreSettings(settings);
    };
    PopUpAtticManager.prototype.__drawSettings = function () {
        var toReturn = [];
        var settings = this.CurrentSettings();
        toReturn.push('----- Settings - Accordian ------');
        for (var idx = 0; idx < settings.Accordian.length; idx++) {
            toReturn.push(settings.Accordian[idx].ElemId + ':' + settings.Accordian[idx].isCollapsed.toString());
        }
        return toReturn;
    };
    PopUpAtticManager.prototype.GetDefaultSettings = function () {
        var defaultDebugSettings = {
            KeepDialogOpen: this.PopConst().Storage.DefaultDebugKeepDialogOpen,
            ShowDebugData: this.PopConst().Storage.DefaultShowDebugData,
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
    PopUpAtticManager.prototype.CurrentSettings = function () {
        //this.debug().FuncStart(this.CurrentSettings.name);
        var defaultSettings = this.GetDefaultSettings();
        var toReturn;
        var settingsRaw = window.localStorage.getItem(this.PopConst().Storage.WindowRoot + this.PopConst().Storage.SettingsSuffix);
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
    PopUpAtticManager.prototype.StoreSettings = function (currentSettings) {
        //this.debug().FuncStart(this.StoreSettings.name);
        window.localStorage.setItem(this.PopConst().Storage.WindowRoot + this.PopConst().Storage.SettingsSuffix, JSON.stringify(currentSettings));
        //this.debug().FuncEnd(this.StoreSettings.name);
    };
    PopUpAtticManager.prototype.UpdateAccodianState = function (needleKey, isCollapsed) {
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
    return PopUpAtticManager;
}(PopUpManagerBase_1.PopUpManagerBase));
exports.PopUpAtticManager = PopUpAtticManager;
//# sourceMappingURL=PopUpAtticManager.js.map