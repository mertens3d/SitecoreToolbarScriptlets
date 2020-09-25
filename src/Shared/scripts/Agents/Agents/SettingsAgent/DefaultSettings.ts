import { HindSiteSetting } from "./HindSiteSetting";
import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { SettingType } from "../../../Enums/SettingType";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { PopConst } from "../../../../../PopUpUi/scripts/Classes/PopConst";
import { SharedConst } from "../../../SharedConst";
import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { UiEnableState } from "../../../Enums/Enabled";
import { UiPresence } from "../../../Enums/UiPresence";
import { ContentConst } from "../../../Interfaces/InjectConst";
import { ModuleKey } from "../../../Enums/ModuleKey";
import { ISettingsAgent } from "../../../Interfaces/Agents/ISettingsAgent";
import { LoggableBase } from "../../../LoggableBase";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";
import { HindSiteSettingWrapper } from "./HindSiteSettingWrapper";
import { HindSiteSettingForNumbers } from "./HindSiteSettingForNumbers";

export class DefaultSettings extends LoggableBase {

  constructor(logger: ILoggerAgent) {
    super(logger);
  }

  GetDefaultSettingsWrapper(): HindSiteSettingWrapper[] {
    let rawData: IHindSiteSetting[] = [

      new HindSiteSetting(

        SettingKey.LastUsedLogToStorageKey,
        SettingType.Number,
        null,
        SharedConst.Const.Settings.Defaults.EnableLogging,
        SettingFlavor.ContentAndPopUpStoredInEach,
        'Rolling Prefix key for log to storage',
        UiEnableState.Enabled,
        UiPresence.HasNoUi,
        ModuleKey.Unknown,

      ),
      new HindSiteSetting(

        SettingKey.EnableLogging,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.ModuleContainers.CbEnableLogging,
        SharedConst.Const.Settings.Defaults.EnableLogging,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Enable Logging',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,

      ),
      new HindSiteSetting(

        SettingKey.UseCompactCss,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.ModuleContainers.SettingUseCompactCss,
        SharedConst.Const.Settings.Defaults.UseCompactCss,
        SettingFlavor.ContentOnly,
        'Use Compact CSS',
        UiEnableState.Disabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,

      ),
      new HindSiteSetting(

        SettingKey.AutoSnapshotBeforeWindowChange,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.AutoSnapshotBeforeWindowChange,
        PopConst.Const.Storage.Defaults.bool.AutoSnapshotBeforeWindowChange,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto Save Snapshot on HindSite Window Change',
        UiEnableState.Disabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,

      ),
      new HindSiteSetting(

        SettingKey.AutoLogin,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.iCBoxdSettingsAutoLogin,
        PopConst.Const.Storage.Defaults.bool.AutoLogin,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto Login',
        UiEnableState.Disabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,

      ),
      new HindSiteSetting(

        SettingKey.LgndPopUpLog,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModuleContainers.LgndPopUpLog,
        PopConst.Const.Settings.Defaults.LgndPopUpLog,
        SettingFlavor.PopUp,
        'Pop Up Log',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,

      ),
      new HindSiteSetting(

        SettingKey.LgndForeSite,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModuleContainers.LgndForeSite,
        PopConst.Const.Settings.Defaults.LgndForeSite,
        SettingFlavor.PopUp,
        'Fore&bull;Site',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,

      ),
      new HindSiteSetting(

        SettingKey.LgndHindSite,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModuleContainers.LgndHindSite,
        PopConst.Const.Settings.Defaults.LgndHindSite,
        SettingFlavor.PopUp,
        'Hind&bull;Site',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,

      ),
      new HindSiteSetting(

        SettingKey.LgndSettings,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModuleContainers.LgndSettings,
        PopConst.Const.Settings.Defaults.LgndSettings,
        SettingFlavor.PopUp,
        'Settings',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,

      ),
      new HindSiteSetting(

        SettingKey.LgndMessages,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModuleContainers.LgndMessages,
        PopConst.Const.Settings.Defaults.LgndMessages,
        SettingFlavor.PopUp,
        'Messages',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,

      ),
      new HindSiteSetting(

        SettingKey.LgndPopUpState,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModuleContainers.LgndPopUpState,
        PopConst.Const.Settings.Defaults.LgndPopUpState,
        SettingFlavor.PopUp,
        'Pop Up State',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,

      ),
      new HindSiteSetting(
        SettingKey.LgndPopUpDebug,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModuleContainers.LgndPopUpDebug,
        PopConst.Const.Settings.Defaults.LgndPopUpState,
        SettingFlavor.PopUp,
        'Debugging',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,
      ),
      new HindSiteSetting(

        SettingKey.LgndContentState,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModuleContainers.LgndContentState,
        PopConst.Const.Settings.Defaults.LgndContentState,
        SettingFlavor.PopUp,
        'Content State',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,

      ),

      new HindSiteSetting(

        SettingKey.LgndBrowserState,
        SettingType.Accordion,
        PopConst.Const.Selector.HS.ModuleContainers.LgndBrowserState,
        PopConst.Const.Settings.Defaults.LgndBrowserState,
        SettingFlavor.PopUp,
        'Browser State',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Accordion,

      ),

      new HindSiteSettingForNumbers(

        SettingKey.MaxAutoSaveCount,
        SettingType.Number,
        PopConst.Const.Selector.HS.SettingAutoSaveMaxCount,
        PopConst.Const.Numbers.MaxAutoSaveCount,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto Save Max Count',
        UiEnableState.Disabled,
        UiPresence.HasUi,
        ModuleKey.Number,
        1,
        100
      ),

      new HindSiteSettingForNumbers(

        SettingKey.AutoSaveIntervalMin,
        SettingType.Number,
        PopConst.Const.Selector.HS.SettingAutoSaveInterval,
        PopConst.Const.Numbers.AutoSaveIntervalMin,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto Save Interval (Min) - 0 to disable',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Number,
        0,
        100

      ),

      new HindSiteSetting(

        SettingKey.DebugKeepDialogOpen,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.ModuleContainers.SettingDebugKeepDialogOpen,
        PopConst.Const.Settings.Defaults.DebugKeepDialogOpen,
        SettingFlavor.PopUp,
        'Keep Dialog Open',
        UiEnableState.Disabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,

      ),
      new HindSiteSettingForNumbers(

        SettingKey.AutoSaveRetainDays,
        SettingType.Number,
        PopConst.Const.Selector.HS.SettingAutoSaveSnapshotRetainDays,
        ContentConst.Const.DefaultMaxAutoSaveAgeDays,
        SettingFlavor.ContentOnly,
        'Days to Retain Auto Snap Shots',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Number,
        0,
        100,
      ),
      new HindSiteSetting(

        SettingKey.AutoRenameCeButton,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.SettingAutoRenameCeTabButton,
        ContentConst.Const.DefaultAutoRenameCeTabButton,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto rename Content Editor tab button to match active node',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,

      ),
    ];

    let toReturn: HindSiteSettingWrapper[] = [];

    rawData.forEach((settingValue: HindSiteSetting) => {
      toReturn.push(new HindSiteSettingWrapper(this.Logger,  settingValue));
    })

    return toReturn;
  }
}