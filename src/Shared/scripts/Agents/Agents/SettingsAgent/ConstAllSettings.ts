import { HindSiteSetting } from "./HindSiteSetting";
import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { SettingType } from "../../../Enums/SettingType";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";
import { SharedConst } from "../../../SharedConst";
import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { Enabled } from "../../../Enums/Enabled";
import { ContentConst } from "../../../Interfaces/InjectConst";

export class ConstAllSettings {
  AllSettings: IHindSiteSetting[] = [
    new HindSiteSetting(
      SettingKey.LastUsedLogToStorageKey,
      SettingType.Number,
      0,
      null,
      0,
      SettingFlavor.ContentAndPopUpStoredInEach,
      'Rolling Prefix key for log to storage',
      Enabled.Enabled,
      false // has ui
    ),
    new HindSiteSetting(
      SettingKey.EnableLogging,
      SettingType.BoolCheckBox,
      true,
      PopConst.Const.Selector.HS.ModulePlaceHolders. CbEnableLogging,
      SharedConst.Const.Settings.Defaults.EnableLogging,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Enable Logging',
      Enabled.Enabled
    ),
    new HindSiteSetting(
      SettingKey.UseCompactCss,
      SettingType.BoolCheckBox,
      false,
      PopConst.Const.Selector.HS.ModulePlaceHolders.SettingUseCompactCss,
      SharedConst.Const.Settings.Defaults.UseCompactCss,
      SettingFlavor.ContentOnly,
      'Use Compact CSS',
      Enabled.Disabled
    ),
    new HindSiteSetting(
      SettingKey.AutoSnapshotBeforeWindowChange,
      SettingType.BoolCheckBox,
      null,
      PopConst.Const.Selector.HS.AutoSnapshotBeforeWindowChange,
      PopConst.Const.Storage.Defaults.bool.AutoSnapshotBeforeWindowChange,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Auto Save Snapshot on HindSite Window Change',
      Enabled.Disabled
    ),
    new HindSiteSetting(
      SettingKey.AutoLogin,
      SettingType.BoolCheckBox,
      null,
      PopConst.Const.Selector.HS.iCBoxdSettingsAutoLogin,
      PopConst.Const.Storage.Defaults.bool.AutoLogin,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Auto Login',
      Enabled.Disabled
    ),
    new HindSiteSetting(
      SettingKey.LgndPopUpLog,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndPopUpLog,
      PopConst.Const.Settings.Defaults.LgndPopUpLog,
      SettingFlavor.PopUp,
      'Pop Up Log',
      Enabled.Enabled
    ),
    new HindSiteSetting(
      SettingKey.LgndForeSite,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndForeSite,
      PopConst.Const.Settings.Defaults.LgndForeSite,
      SettingFlavor.PopUp,
      'Fore&bull;Site',
      Enabled.Enabled
    ),
    new HindSiteSetting(
      SettingKey.LgndHindSite,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndHindSite,
      PopConst.Const.Settings.Defaults.LgndHindSite,
      SettingFlavor.PopUp,
      'Hind&bull;Site',
      Enabled.Enabled
    ),
    new HindSiteSetting(
      SettingKey.LgndSettings,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndSettings,
      PopConst.Const.Settings.Defaults.LgndSettings,
      SettingFlavor.PopUp,
      'Settings',
      Enabled.Enabled
    ),
    new HindSiteSetting(
      SettingKey.LgndMessages,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndMessages,
      PopConst.Const.Settings.Defaults.LgndMessages,
      SettingFlavor.PopUp,
      'Messages',
      Enabled.Enabled
    ),
    new HindSiteSetting(
      SettingKey.LgndPopUpState,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndPopUpState,
      PopConst.Const.Settings.Defaults.LgndPopUpState,
      SettingFlavor.PopUp,
      'Pop Up State',
      Enabled.Enabled
    ),
    new HindSiteSetting(
      SettingKey.LgndContentState,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndContentState,
      PopConst.Const.Settings.Defaults.LgndContentState,
      SettingFlavor.PopUp,
      'Content State',
      Enabled.Enabled
    ),

    new HindSiteSetting(
      SettingKey.LgndBrowserState,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndBrowserState,
      PopConst.Const.Settings.Defaults.LgndBrowserState,
      SettingFlavor.PopUp,
      'Browser State',
      Enabled.Enabled
    ),

    new HindSiteSetting(
      SettingKey.MaxAutoSaveCount,
      SettingType.Number,
      null,
      PopConst.Const.Selector.HS.SettingAutoSaveMaxCount,
      PopConst.Const.Numbers.MaxAutoSaveCount,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Auto Save Max Count',
      Enabled.Disabled
    ),

    new HindSiteSetting(
      SettingKey.AutoSaveIntervalMin,
      SettingType.Number,
      null,
      PopConst.Const.Selector.HS.SettingAutoSaveInterval,
      PopConst.Const.Numbers.AutoSaveIntervalMin,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Auto Save Interval (Min) - 0 to disable',
      Enabled.Enabled
    ),

    new HindSiteSetting(
      SettingKey.DebugKeepDialogOpen,
      SettingType.BoolCheckBox,
      null,
      PopConst.Const.Selector.HS.ModulePlaceHolders.SettingDebugKeepDialogOpen,
      PopConst.Const.Settings.Defaults.DebugKeepDialogOpen,
      SettingFlavor.PopUp,
      '(Debug) Keep Dialog Open',
      Enabled.Enabled
    ),
    new HindSiteSetting(
      SettingKey.AutoSaveRetainDays,
      SettingType.Number,
      null,
      PopConst.Const.Selector.HS.SettingAutoSaveSnapshotRetainDays,
      ContentConst.Const.DefaultMaxAutoSaveAgeDays,
      SettingFlavor.ContentOnly,
       'Days to Retain Auto Snap Shots',
      Enabled.Enabled
    ),
    new HindSiteSetting(
      SettingKey.AutoRenameCeButton,
      SettingType.BoolCheckBox,
      false,
      PopConst.Const.Selector.HS.SettingAutoRenameCeTabButton,
      ContentConst.Const.DefaultAutoRenameCeTabButton,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Auto rename Content Editor tab button to match active node',
      Enabled.Enabled
    )
  ];
}