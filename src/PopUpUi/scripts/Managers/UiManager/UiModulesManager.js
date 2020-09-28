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
exports.UiModulesManager = void 0;
var BuildNum_1 = require("../../../../Shared/scripts/AutoBuild/BuildNum");
var StaticHelpers_1 = require("../../../../Shared/scripts/Classes/StaticHelpers");
var PopConst_1 = require("../../../../Shared/scripts/Const/PopConst");
var _2xxx_MenuCommand_1 = require("../../../../Shared/scripts/Enums/2xxx-MenuCommand");
var _3xxx_SettingKey_1 = require("../../../../Shared/scripts/Enums/3xxx-SettingKey");
var ModuleKey_1 = require("../../../../Shared/scripts/Enums/ModuleKey");
var SettingFlavor_1 = require("../../../../Shared/scripts/Enums/SettingFlavor");
var UiHydrationData_1 = require("../../../../Shared/scripts/Interfaces/UiHydrationData");
var LoggableBase_1 = require("../../../../Shared/scripts/LoggableBase");
var SelectSnapUiMutationEvent_ObserverWithCallback_1 = require("../../Events/SelectSnapUiMutationEvent/SelectSnapUiMutationEvent_ObserverWithCallback");
var UiModuleManagerPassThroughEvent_Subject_1 = require("../../Events/UiModuleManagerPassThroughEvent/UiModuleManagerPassThroughEvent_Subject");
var UiSettingBasedModuleMutationEvent_Observer_1 = require("../../Events/UiSettingBasedModuleMutationEvent/UiSettingBasedModuleMutationEvent_Observer");
var ButtonBasedModules_1 = require("../../UiModules/ButtonModules/ButtonBasedModules");
var SelectSnapshotModule_1 = require("../../UiModules/SelectSnapshotModule/SelectSnapshotModule");
var SettingsBasedModules_1 = require("../../UiModules/SettingBasedModules/SettingsBasedModules");
var FeedbackModuleBrowserState_1 = require("../../UiModules/UiFeedbackModules/FeedbackModuleBrowserState");
var FeedbackModuleContentState_1 = require("../../UiModules/UiFeedbackModules/FeedbackModuleContentState");
var FeedbackModuleMessages_1 = require("../../UiModules/UiFeedbackModules/FeedbackModuleMessages");
var FeedbackModuleStateOfPopUp_1 = require("../../UiModules/UiFeedbackModules/FeedbackModuleStateOfPopUp");
var UiFeedbackModuleLog_1 = require("../../UiModules/UiFeedbackModules/UiFeedbackModuleLog");
var UiModulesManager = /** @class */ (function (_super) {
    __extends(UiModulesManager, _super);
    function UiModulesManager(logger, settingsAgent, commandDefinitionBucket, uiCommandsManager, uiVisibilityTestAgent, scUrlagent) {
        var _this = _super.call(this, logger) || this;
        _this.UiModules = [];
        _this.FacetSettingsBasedModules = [];
        _this.Logger.CTORStart(UiModulesManager.name);
        _this.SettingsAgent = settingsAgent;
        _this.CommandDefinitionBucket = commandDefinitionBucket;
        _this.UiVisibilityTestAgent = uiVisibilityTestAgent;
        _this.UiCommandsMan = uiCommandsManager;
        _this.ScUrlAgent = scUrlagent;
        _this.DebuggingEnabled = _this.SettingsAgent.GetByKey(_3xxx_SettingKey_1.SettingKey.EnableDebugging).ValueAsBool();
        if (StaticHelpers_1.StaticHelpers.IsNullOrUndefined([_this.SettingsAgent, _this.CommandDefinitionBucket, _this.UiCommandsMan, _this.UiVisibilityTestAgent, _this.ScUrlAgent])) {
            throw (UiModulesManager.name + ' null at constructor');
        }
        _this.InstantiateModules();
        _this.Logger.CTOREnd(UiModulesManager.name);
        return _this;
    }
    UiModulesManager.prototype.InstantiateModules = function () {
        this.Logger.FuncStart(this.InstantiateModules.name);
        this.FacetModuleSelectSnapShots = new SelectSnapshotModule_1.SelectSnapshotModule(this.Logger, PopConst_1.PopConst.Const.Selector.HS.ModuleContainers.SelStateSnapShot);
        this.UiModules.push(this.FacetModuleSelectSnapShots);
        if (this.DebuggingEnabled) {
            this.UiModules.push(new UiFeedbackModuleLog_1.UiFeedbackModuleLog(this.Logger, PopConst_1.PopConst.Const.Selector.HS.FeedbackLogElement));
            this.UiModules.push(new FeedbackModuleBrowserState_1.FeedbackModuleBrowserState(this.Logger, PopConst_1.PopConst.Const.Selector.HS.FeedbackBrowserState));
            this.UiModules.push(new FeedbackModuleStateOfPopUp_1.FeedbackModuleStateOfPopUp(this.Logger, PopConst_1.PopConst.Const.Selector.HS.FeedbackPopUpState));
            this.UiModules.push(new FeedbackModuleContentState_1.FeedbackModuleContentState(this.Logger, PopConst_1.PopConst.Const.Selector.HS.FeedbackContentState));
            this.UiModules.push(new FeedbackModuleContentState_1.FeedbackModuleContentState(this.Logger, PopConst_1.PopConst.Const.Selector.HS.FeedbackMessages));
        }
        var settingsBaseModules = new SettingsBasedModules_1.SettingsBasedModules(this.Logger, this.SettingsAgent);
        this.FacetSettingsBasedModules = this.FacetSettingsBasedModules.concat(settingsBaseModules.AccordianModules);
        this.FacetSettingsBasedModules = this.FacetSettingsBasedModules.concat(settingsBaseModules.NumberModules);
        this.FacetSettingsBasedModules = this.FacetSettingsBasedModules.concat(settingsBaseModules.CheckBoxModules);
        this.UiModules = this.UiModules.concat(this.FacetSettingsBasedModules);
        var buttonBasedModules = new ButtonBasedModules_1.ButtonBasedModulesBucket(this.Logger, this.CommandDefinitionBucket);
        this.Logger.LogVal('buttonBaseModules ', buttonBasedModules.AllButtonBasedModules.length);
        this.UiModules = this.UiModules.concat(buttonBasedModules.AllButtonBasedModules);
        this.Logger.FuncEnd(this.InstantiateModules.name);
    };
    UiModulesManager.prototype.Init_UiMan = function () {
        var _this = this;
        this.Logger.FuncStart(this.Init_UiMan.name, UiModulesManager.name);
        this.WriteBuildNumToUi();
        if (this.UiModules) {
            this.UiModules.forEach(function (uiModule) {
                if (uiModule) {
                    uiModule.Init_Module();
                    uiModule.BuildHtmlForModule();
                }
                else {
                    _this.Logger.ErrorAndThrow(_this.Init_UiMan.name, 'null module');
                }
            });
        }
        this.UiCommandsMan.Init_ButtonStateManager();
        this.Logger.FuncEnd(this.Init_UiMan.name, UiModulesManager.name);
    };
    UiModulesManager.prototype.GetStateOfModules = function () {
        this.Logger.FuncStart(this.GetStateOfModules.name);
        var wrappedSettings = this.SettingsAgent.GetSettingsByFlavor([SettingFlavor_1.SettingFlavor.ContentAndPopUpStoredInPopUp, SettingFlavor_1.SettingFlavor.ContentOnly]);
        var settingsToSend = [];
        wrappedSettings.forEach(function (wrappedSetting) { return settingsToSend.push(wrappedSetting.HindSiteSetting); });
        var newNickname = "";
        if (this.FacetRenameButton) {
            newNickname = this.FacetRenameButton.GetInputValue();
        }
        var stateOfUiModules = {
            SelectSnapshotId: this.FacetModuleSelectSnapShots.GetSelectSnapshotId(),
            CurrentNicknameValue: '',
            SnapShotNewNickname: newNickname,
        };
        return stateOfUiModules;
    };
    UiModulesManager.prototype.WireEvents_ModulesManager = function () {
        var _this = this;
        this.Logger.FuncStart(this.WireEvents_ModulesManager.name);
        try {
            this.UiModuleManagerMutationEvent_Subject = new UiModuleManagerPassThroughEvent_Subject_1.UiModuleManagerPassThroughEvent_Subject(this.Logger);
            if (this.UiModules) {
                this.UiModules.forEach(function (uiModule) { return uiModule.WireEvents_Module(); });
            }
            if (this.DebuggingEnabled) {
                this.DebuggingFeedbackModuleMessages = new FeedbackModuleMessages_1.DebuggingFeedbackModuleMessages_Observer(this.Logger, PopConst_1.PopConst.Const.Selector.HS.DivOverlayModule);
            }
            this.SelectSnapshotModule_Observer = new SelectSnapUiMutationEvent_ObserverWithCallback_1.SelectSnapUiMutationEvent_ObserverWithCallback(this.Logger, this.OnRefreshUiUIManagerFromSnapShotSelect.bind(this));
            this.UiSettingBasedModuleMutationEvent_Observer = new UiSettingBasedModuleMutationEvent_Observer_1.UiSettingBasedModuleMutationEvent_Observer(this.Logger, this.OnUiSettingBasedModuleMutationEvent.bind(this));
            var moduleSelectSnapShots = this.GetModulesByModuleKey(ModuleKey_1.ModuleKey.SelectSnapShot);
            if (moduleSelectSnapShots && moduleSelectSnapShots.length > 0) {
                var moduleSelectSnapShot = moduleSelectSnapShots[0];
                if (moduleSelectSnapShot) {
                    moduleSelectSnapShot.SelectSnapshotModule_Subject.RegisterObserver(this.SelectSnapshotModule_Observer);
                }
            }
            if (this.FacetSettingsBasedModules) {
                this.FacetSettingsBasedModules.forEach(function (settingBased) {
                    settingBased.UiSettingBasedModuleMutationEvent_Subject.RegisterObserver(_this.UiSettingBasedModuleMutationEvent_Observer);
                });
            }
            this.WireEventsOnCheckBoxes();
        }
        catch (err) {
            this.Logger.ErrorAndThrow(this.WireEvents_ModulesManager.name, err);
        }
        this.Logger.FuncEnd(this.WireEvents_ModulesManager.name);
    };
    UiModulesManager.prototype.OnUiSettingBasedModuleMutationEvent = function (uiModuleMutationEvent_Payload) {
        this.Logger.FuncStart(this.OnUiSettingBasedModuleMutationEvent.name);
        if (this.SettingsAgent) {
            this.SettingsAgent.SetByKey(uiModuleMutationEvent_Payload.HindSiteSetting.SettingKey, uiModuleMutationEvent_Payload.HindSiteSetting.ValueAsObj);
        }
        //if (this.UiModuleManagerMutationEvent_Subject) {
        //  let uiModulePassThroughEvent_Payload: IUiModuleManagerPassThroughEvent_Payload = {
        //    ModuleMutationEvent_Payload: uiModuleMutationEvent_Payload
        //  }
        //  this.Logger.LogAsJsonPretty('uiModulePassThroughEvent_Payload', uiModulePassThroughEvent_Payload);
        //  this.UiModuleManagerMutationEvent_Subject.NotifyObservers(uiModulePassThroughEvent_Payload);
        //}
        this.Logger.FuncEnd(this.OnUiSettingBasedModuleMutationEvent.name);
    };
    UiModulesManager.prototype.WireEventsOnCheckBoxes = function () {
        //this.UiModuleMutationEvent_Observer_CheckBox = new UiModuleMutationEvent_Observer(this.Logger, this.OnUiModuleMutationEvent);
        //let checkboxSettings: HindSiteSettingCheckBoxModule[] = <HindSiteSettingCheckBoxModule[]>this.GetModulesByKey(ModuleKey.CheckBox);
        //if (checkboxSettings) {
        //  checkboxSettings.forEach((checkBoxSetting: HindSiteSettingCheckBoxModule) => {
        //    if (checkBoxSetting.UiElementChangeEvent_Subject) {
        //      checkBoxSetting.UiElementChangeEvent_Subject.RegisterObserver(this.UiModuleMutationEvent_Observer_CheckBox);
        //    }
        //  });
        //}
    };
    UiModulesManager.prototype.FilterUiModulesByMenuCommandKey = function (uiModules, menuCommandKey) {
        var toReturn = null;
        if (uiModules && uiModules.length > 0) {
            for (var _i = 0, uiModules_1 = uiModules; _i < uiModules_1.length; _i++) {
                var uiModule = uiModules_1[_i];
                if (uiModule.GetCommandKey() === menuCommandKey) {
                    toReturn = uiModule;
                    break;
                }
            }
        }
        return toReturn;
    };
    //GetCommandModuleByKey(commandKey: MenuCommandKey): IUiModule {
    //  let allButtonBased: IUiModule[] = this.GetModulesByKey(ModuleKey.TypicalButton);
    //}
    UiModulesManager.prototype.GetFirstModuleByKey = function (moduleKey) {
        var toReturn = null;
        var uiModules = this.GetModulesByModuleKey(moduleKey);
        if (uiModules && uiModules.length > 0) {
            toReturn = uiModules[0];
        }
        return toReturn;
    };
    UiModulesManager.prototype.GetCommandButtonByKey = function (Ping) {
        var uiModules = this.GetModulesByModuleKey(ModuleKey_1.ModuleKey.ButtonTypical);
        var toReturn = null;
        if (uiModules) {
            var typButton = this.FilterUiModulesByMenuCommandKey(uiModules, _2xxx_MenuCommand_1.MenuCommandKey.Ping);
            if (typButton) {
                toReturn = typButton;
            }
        }
        return toReturn;
    };
    UiModulesManager.prototype.GetBaseButtonModules = function () {
        var toReturn = [];
        toReturn = toReturn.concat(this.GetModulesByModuleKey(ModuleKey_1.ModuleKey.ButtonTypical));
        this.FacetRenameButton = this.GetFirstModuleByKey(ModuleKey_1.ModuleKey.ButtonWithInput);
        toReturn = toReturn.concat(this.FacetRenameButton);
        toReturn = toReturn.concat(this.GetModulesByModuleKey(ModuleKey_1.ModuleKey.ButtonCancel));
        toReturn = toReturn.concat(this.GetModulesByModuleKey(ModuleKey_1.ModuleKey.ButtonClose));
        return toReturn;
    };
    UiModulesManager.prototype.GetModulesByModuleKey = function (moduleKey) {
        var toReturn = [];
        if (this.UiModules) {
            for (var idx = 0; idx < this.UiModules.length; idx++) {
                if (this.UiModules[idx].ModuleKey === moduleKey) {
                    toReturn.push(this.UiModules[idx]);
                }
            }
        }
        return toReturn;
    };
    UiModulesManager.prototype.ClosePopUp = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.Logger.FuncStart(_this.ClosePopUp.name);
            try {
                if (_this.DebuggingEnabled) {
                    _this.DebuggingFeedbackModuleMessages.UpdateMsgStatusStack('Command Completed Successfully');
                }
                var setting = _this.SettingsAgent.GetByKey(_3xxx_SettingKey_1.SettingKey.DebugKeepDialogOpen);
                if (!setting.ValueAsBool()) {
                    window.close();
                }
                else {
                    _this.Logger.Log('Window not closed because of setting: ' + setting.FriendlySetting);
                }
                resolve();
            }
            catch (err) {
                reject(_this.ClosePopUp.name + ' ' + err);
            }
            _this.Logger.FuncEnd(_this.ClosePopUp.name);
        });
    };
    UiModulesManager.prototype.WriteBuildNumToUi = function () {
        this.Logger.LogVal('BuiltDateStamp', BuildNum_1.BuiltDateStamp);
        var targetTag = document.querySelector(PopConst_1.PopConst.Const.Selector.HS.BuildStamp);
        if (targetTag) {
            targetTag.innerText = 'build stamp: ' + StaticHelpers_1.StaticHelpers.MakeFriendlyDate(new Date(BuildNum_1.BuiltDateStamp));
        }
        else {
            this.Logger.ErrorAndThrow(this.WriteBuildNumToUi.name, 'No Build Stamp Element Found');
        }
    };
    UiModulesManager.prototype.HydrateUi_UiModulesManager = function (uiHydrationData) {
        this.Logger.FuncStart(this.HydrateUi_UiModulesManager.name);
        this.Logger.LogAsJsonPretty('uiHydrationData.SelectSnapShot', uiHydrationData.SelectSnapShot);
        if (uiHydrationData) {
            if (uiHydrationData.StateOfLiveHindSite) {
                if (this.UiModules) {
                    this.UiModules.forEach(function (uiModule) {
                        uiModule.DoesContainerExist();
                        uiModule.Hydrate(uiHydrationData);
                    });
                }
                this.UiCommandsMan.HydrateUi_UICommandManager(uiHydrationData);
            }
            else {
                this.Logger.ErrorAndThrow(this.HydrateUi_UiModulesManager.name, 'null state');
            }
        }
        this.Logger.FuncEnd(this.HydrateUi_UiModulesManager.name);
    };
    UiModulesManager.prototype.RefreshModuleUis = function () {
        var _this = this;
        this.UiCommandsMan.RefreshUiModuleVisibilityStatus();
        if (this.UiModules) {
            this.UiModules.forEach(function (uiModule) {
                _this.Logger.LogVal('', (uiModule.ContainerUiDivElem !== null).toString());
                uiModule.RefreshUi_Module();
            });
        }
    };
    UiModulesManager.prototype.OnRefreshUiUIManagerFromSnapShotSelect = function (uiData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.Logger.FuncStart(this.OnRefreshUiUIManagerFromSnapShotSelect.name);
                if (this.LastKnownSelectSnapshotId !== uiData.SelectSnapshotId) {
                    this.LastKnownSelectSnapshotId = uiData.SelectSnapshotId;
                    this.UpdateUiCommon();
                }
                this.Logger.FuncEnd(this.OnRefreshUiUIManagerFromSnapShotSelect.name);
                return [2 /*return*/];
            });
        });
    };
    UiModulesManager.prototype.UpdateUiFromContentReply = function (stateOfLiveHindSite, stateOfStorageSnapShots) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.Logger.FuncStart(this.UpdateUiFromContentReply.name);
                //if (StaticHelpers.IsNullOrUndefined(this.LastKnownSelectSnapshotId)) {
                this.LastKnownSelectSnapshotId = this.FacetModuleSelectSnapShots.GetSelectSnapshotId();
                this.LastKnownSelectSnapshotNickname = this.FacetModuleSelectSnapShots.GetSelectSnapshotNickname();
                //}
                this.LastKnownStateOfLiveHindSite = stateOfLiveHindSite;
                this.LastKnownStateOfStorageSnapShots = stateOfStorageSnapShots;
                this.UpdateUiCommon();
                this.Logger.FuncEnd(this.UpdateUiFromContentReply.name);
                return [2 /*return*/];
            });
        });
    };
    UiModulesManager.prototype.UpdateUiCommon = function () {
        if (this.LastKnownStateOfLiveHindSite && this.LastKnownStateOfLiveHindSite.Meta) {
            this.UiVisibilityTestAgent.Hydrate(this.LastKnownStateOfLiveHindSite, this.LastKnownStateOfStorageSnapShots, this.LastKnownStateOfLiveHindSite.Meta.WindowType, this.LastKnownSelectSnapshotId);
            var refreshData = new UiHydrationData_1.UiHydrationData(this.LastKnownStateOfLiveHindSite, this.ScUrlAgent, this.LastKnownStateOfStorageSnapShots, this.LastKnownSelectSnapshotId, this.UiVisibilityTestAgent, this.LastKnownSelectSnapshotNickname);
            this.HydrateUi_UiModulesManager(refreshData);
            this.RefreshModuleUis();
        }
        else {
            this.Logger.ErrorAndThrow(this.UpdateUiFromContentReply.name, 'null state or meta');
        }
    };
    return UiModulesManager;
}(LoggableBase_1.LoggableBase));
exports.UiModulesManager = UiModulesManager;
//# sourceMappingURL=UiModulesManager.js.map