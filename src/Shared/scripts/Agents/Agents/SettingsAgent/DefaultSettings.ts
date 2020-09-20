import { HindSiteSetting } from "./HindSiteSetting";
import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { SettingType } from "../../../Enums/SettingType";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";
import { SharedConst } from "../../../SharedConst";
import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { UiEnableState, UiPresence } from "../../../Enums/Enabled";
import { ContentConst } from "../../../Interfaces/InjectConst";
import { ModuleKey } from "../../../Enums/ModuleKey";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { LoggableBase } from "../../../../../Content/scripts/Managers/LoggableBase";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";

export class DefaultSettings extends LoggableBase {
 private SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent) {
    super(logger);
    this.SettingsAgent = settingsAgent;
  }

  GetDefaultSettings(): IHindSiteSetting[] {
  
    let toReturn: IHindSiteSetting[] = [
  
      new HindSiteSetting(
        this.Logger,
        SettingKey.LastUsedLogToStorageKey,
        SettingType.Number,
        null,
        SharedConst.Const.Settings.Defaults.EnableLogging,
        SettingFlavor.ContentAndPopUpStoredInEach,
        'Rolling Prefix key for log to storage',
        UiEnableState.Enabled,
        UiPresence.HasNoUi,
        ModuleKey.Unknown,
        this.SettingsAgent,

      ),
      new HindSiteSetting(
        this.Logger,
        SettingKey.EnableLogging,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.ModulePlaceHolders.CbEnableLogging,
        SharedConst.Const.Settings.Defaults.EnableLogging,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Enable Logging',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,
        this.SettingsAgent,
      ),
      new HindSiteSetting(
        this.Logger,
        SettingKey.UseCompactCss,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.ModulePlaceHolders.SettingUseCompactCss,
        SharedConst.Const.Settings.Defaults.UseCompactCss,
        SettingFlavor.ContentOnly,
        'Use Compact CSS',
        UiEnableState.Disabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,
        this.SettingsAgent,
      ),
      new HindSiteSetting(
        this.Logger,
        SettingKey.AutoSnapshotBeforeWindowChange,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.AutoSnapshotBeforeWindowChange,
        PopConst.Const.Storage.Defaults.bool.AutoSnapshotBeforeWindowChange,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto Save Snapshot on HindSite Window Change',
        UiEnableState.Disabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,
        this.SettingsAgent,
      ),
      new HindSiteSetting(
        this.Logger,
        SettingKey.AutoLogin,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.iCBoxdSettingsAutoLogin,
        PopConst.Const.Storage.Defaults.bool.AutoLogin,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto Login',
        UiEnableState.Disabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,
        this.SettingsAgent,
      ),
      new HindSiteSetting(
        this.Logger,
        SettingKey.LgndPopUpLog,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModulePlaceHolders.LgndPopUpLog,
        PopConst.Const.Settings.Defaults.LgndPopUpLog,
        SettingFlavor.PopUp,
        'Pop Up Log',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,
        this.SettingsAgent,
      ),
      new HindSiteSetting(
        this.Logger,
        SettingKey.LgndForeSite,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModulePlaceHolders.LgndForeSite,
        PopConst.Const.Settings.Defaults.LgndForeSite,
        SettingFlavor.PopUp,
        'Fore&bull;Site',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,
        this.SettingsAgent,
      ),
      new HindSiteSetting(
        this.Logger,
        SettingKey.LgndHindSite,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModulePlaceHolders.LgndHindSite,
        PopConst.Const.Settings.Defaults.LgndHindSite,
        SettingFlavor.PopUp,
        'Hind&bull;Site',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,
        this.SettingsAgent,
      ),
      new HindSiteSetting(
        this.Logger,
        SettingKey.LgndSettings,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModulePlaceHolders.LgndSettings,
        PopConst.Const.Settings.Defaults.LgndSettings,
        SettingFlavor.PopUp,
        'Settings',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,
        this.SettingsAgent,
      ),
      new HindSiteSetting(
        this.Logger,
        SettingKey.LgndMessages,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModulePlaceHolders.LgndMessages,
        PopConst.Const.Settings.Defaults.LgndMessages,
        SettingFlavor.PopUp,
        'Messages',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,
        this.SettingsAgent,
      ),
      new HindSiteSetting(
        this.Logger,
        SettingKey.LgndPopUpState,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModulePlaceHolders.LgndPopUpState,
        PopConst.Const.Settings.Defaults.LgndPopUpState,
        SettingFlavor.PopUp,
        'Pop Up State',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,
        this.SettingsAgent,
      ),
      new HindSiteSetting(
        this.Logger,
        SettingKey.LgndContentState,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModulePlaceHolders.LgndContentState,
        PopConst.Const.Settings.Defaults.LgndContentState,
        SettingFlavor.PopUp,
        'Content State',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,
        this.SettingsAgent,
      ),

      new HindSiteSetting(
        this.Logger,
        SettingKey.LgndBrowserState,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModulePlaceHolders.LgndBrowserState,
        PopConst.Const.Settings.Defaults.LgndBrowserState,
        SettingFlavor.PopUp,
        'Browser State',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,
        this.SettingsAgent,
      ),

      new HindSiteSetting(
        this.Logger,
        SettingKey.MaxAutoSaveCount,
        SettingType.Number,
        PopConst.Const.Selector.HS.SettingAutoSaveMaxCount,
        PopConst.Const.Numbers.MaxAutoSaveCount,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto Save Max Count',
        UiEnableState.Disabled,
        UiPresence.HasUi,
        ModuleKey.Number,
        this.SettingsAgent,
      ),

      new HindSiteSetting(
        this.Logger,
        SettingKey.AutoSaveIntervalMin,
        SettingType.Number,
        PopConst.Const.Selector.HS.SettingAutoSaveInterval,
        PopConst.Const.Numbers.AutoSaveIntervalMin,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto Save Interval (Min) - 0 to disable',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Number,
        this.SettingsAgent,
      ),

      new HindSiteSetting(
        this.Logger,
        SettingKey.DebugKeepDialogOpen,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.ModulePlaceHolders.SettingDebugKeepDialogOpen,
        PopConst.Const.Settings.Defaults.DebugKeepDialogOpen,
        SettingFlavor.PopUp,
        '(Debug) Keep Dialog Open',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,
        this.SettingsAgent,
      ),
      new HindSiteSetting(
        this.Logger,
        SettingKey.AutoSaveRetainDays,
        SettingType.Number,
        PopConst.Const.Selector.HS.SettingAutoSaveSnapshotRetainDays,
        ContentConst.Const.DefaultMaxAutoSaveAgeDays,
        SettingFlavor.ContentOnly,
        'Days to Retain Auto Snap Shots',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Number,
        this.SettingsAgent,
      ),
      new HindSiteSetting(
        this.Logger,
        SettingKey.AutoRenameCeButton,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.SettingAutoRenameCeTabButton,
        ContentConst.Const.DefaultAutoRenameCeTabButton,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto rename Content Editor tab button to match active node',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,
        this.SettingsAgent,
      )
    ];

    return toReturn;
  }
}